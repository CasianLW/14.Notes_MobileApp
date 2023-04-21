<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

// Gestion auth
use App\Http\Controllers\AuthController;

// Route pour l'inscription
Route::post('/register', [AuthController::class, 'register']);

// Route pour la connexion
Route::post('/login', [AuthController::class, 'login']);

// Route pour la déconnexion
Route::middleware('auth:sanctum')->post('/logout', [AuthController::class, 'logout']);




// Gestion Notes
use App\Http\Controllers\NotesController;

// Route pour récupérer les notes
Route::middleware('auth:sanctum')->get('/notes', [NotesController::class, 'index']);

// Route pour créer une nouvelle note
Route::middleware('auth:sanctum')->post('/notes', [NotesController::class, 'store']);

// Route pour supprimer une note
Route::middleware('auth:sanctum')->delete('/notes/{id}', [NotesController::class, 'destroy']);





// middelware
Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});
