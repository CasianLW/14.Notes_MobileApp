<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;

class AuthController extends Controller
{
    public function register(Request $request)
{
    $validator = Validator::make($request->all(), [
        'name' => 'required|string|max:255',
        'email' => 'required|string|email|max:255',
        'password' => 'required|string|min:8',
    ]);

    if ($validator->fails()) {
        // if email already exists, return a 409
        if (User::where('email', $request->email)->exists()) {
            return response()->json(['error' => ['email' => ['The email has already been taken.']]], 409);
        }

        return response()->json(['error' => $validator->errors()], 422);
    }

    $user = User::create([
        'name' => $request->name,
        'email' => $request->email,
        'password' => Hash::make($request->password),
    ]);

    $token = $user->createToken('authToken')->plainTextToken;

    return response()->json(['user' => $user, 'token' => $token], 200); 
}


    public function login(Request $request)
{
    $credentials = $request->only('email', 'password');

    if (!Auth::attempt($credentials)) {
        return response()->json(['error' => 'Email ou mot de passe incorrects'], 401);
    }

    // Retrieve the authenticated user instance from the User model
    $user = User::find(Auth::id());
    
    // Generate the authentication token
    $token = $user->createToken('authToken')->plainTextToken;

    return response()->json(['user' => $user, 'token' => $token]);
}

public function logout(Request $request)
{
    if(!$request->user()){
        return response()->json(['error' => 'Non-authenticated user'], 401);
    }
    
    $request->user()->currentAccessToken()->delete();

    return response()->json(['message' => 'Deconnexion réussie !']);
}

}
