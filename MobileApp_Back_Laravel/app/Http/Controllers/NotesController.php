<?php

namespace App\Http\Controllers;

use App\Models\Note;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class NotesController extends Controller
{
    public function index()
    {
        $user = Auth::user();
        $notes = Note::where('user_id', $user->id)->orderBy('created_at', 'desc')->get();

        return response()->json(['notes' => $notes]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'content' => 'required|string',
        ]);

        $user = Auth::user();

        $note = new Note();
        $note->content = $request->content;
        $note->user_id = $user->id;
        $note->save();

        return response()->json(['note' => $note]);
    }

    public function destroy($id)
    {
        $user = Auth::user();
        $note = Note::where('id', $id)->where('user_id', $user->id)->first();

        if ($note) {
            $note->delete();
            return response()->json(['message' => 'Note supprimée !']);
        }

        return response()->json(['error' => 'Note introuvable :('], 404);
    }
}