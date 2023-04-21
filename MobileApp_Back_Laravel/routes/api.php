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
use App\Http\Controllers\NotesController;

// Route pour l'inscription
Route::post('/register', [AuthController::class, 'register']);

// Route pour la connexion
Route::post('/login', [AuthController::class, 'login']);

// Routes protégées par le middleware 'auth:sanctum'
Route::middleware('auth:sanctum')->group(function () {
    // Route pour la déconnexion
    Route::post('/logout', [AuthController::class, 'logout']);

    // Route pour récupérer les notes
    Route::get('/notes', [NotesController::class, 'index']);

    // Route pour créer une nouvelle note
    Route::post('/notes', [NotesController::class, 'store']);

    // Route pour supprimer une note
    Route::delete('/notes/{id}', [NotesController::class, 'destroy']);

    // Route pour modifier une note
    Route::put('/notes/{id}', [NotesController::class, 'update']);

    // Route pour récupérer l'utilisateur actuellement authentifié
    Route::get('/user', function (Request $request) {
        return $request->user();
    });
});