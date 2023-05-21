<?php

namespace App\Http\Controllers;

use App\Models\Note;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;

class NotesController extends Controller
{
    public function show($id)
{
    $user = Auth::user();
    $note = Note::where('id', $id)->where('user_id', $user->id)->first();

    if ($note) {
        return $note;
        // return response()->json(['note' => $note], 200);

    }

    return response()->json(['error' => 'Note introuvable :('], 404);
}
    public function index()
    {
        $user = Auth::user();
        $notes = Note::where('user_id', $user->id)->orderBy('created_at', 'desc')->get();

        if ($notes->isEmpty()) {
            return response()->json([], 200); // Return an empty array if there are no notes
        }

        return response()->json(['notes' => $notes->toArray()]);
    }

    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'content' => 'required|string',
        ]);

        if ($validator->fails()) {
            return response()->json(['error' => $validator->errors()], 422);
        }

        $user = Auth::user();

        $note = new Note();
        $note->content = $request->input('content');
        $note->user_id = $user->id;
        $note->save();

        $note->refresh();

        return $note;
        // return response()->json(['note' => $note], 201);
    }

    
    public function update(Request $request, $id)
    {
        $validator = Validator::make($request->all(), [
            'content' => 'required|string',
        ]);

        if ($validator->fails()) {
            return response()->json(['error' => $validator->errors()], 422);
        }

        $user = Auth::user();
        $note = Note::where('id', $id)->where('user_id', $user->id)->first();

        if ($note) {
            $note->content = $request->input('content');
            $note->save();
            return $note;

            // return response()->json(['note' => $note], 200);
        }

        return response()->json(['error' => 'Note introuvable :('], 403);
    }

    public function destroy($id)
    {
        $user = Auth::user();
        $note = Note::where('id', $id)->where('user_id', $user->id)->first();

        if ($note) {
            $note->delete();
            return response()->json(['message' => 'Note supprimée !'], 204);

        }

        return response()->json(['error' => 'Note introuvable :('], 403);
    }
}
