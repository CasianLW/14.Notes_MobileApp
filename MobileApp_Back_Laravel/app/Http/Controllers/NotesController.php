<?php

namespace App\Http\Controllers;

use App\Models\Note;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;
use Symfony\Component\HttpKernel\Exception\HttpException;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;

class NotesController extends Controller
{
    public function show($id)
{
    $user = Auth::user();
    $note = Note::find($id); // Use find to get note regardless of the user
    // $note = Note::where('id', $id)->where('user_id', $user->id)->first();

    if (!$note) {
        throw new NotFoundHttpException('Note not found.');
    } else if ($note->user_id !== $user->id) {
        throw new HttpException(403, 'Unauthorized access to the note.');
    }
    
    return $note;
    // throw new NotFoundHttpException('Note not found.');

    // if (!$note && $user) {
    //     // abort(404, 'Note not found.');
    //     return response()->json(['error' => 'Note introuvable :('], 404);
    // }

    // return response()->json(['error' => 'Accés note non autorisé !'], 404);
}
    public function index()
    {
        $user = Auth::user();
        $notes = Note::where('user_id', $user->id)->orderBy('created_at', 'desc')->get();

        if ($notes->isEmpty()) {
            return response()->json([], 200); // Return an empty array if there are no notes
        }

        // return response()->json(['notes' => $notes->toArray()]);
        // return $notes->toArray();
        return response()->json($notes->toArray(), 200);


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

        // return $note;
        // return response()->json(['note' => $note], 201);
        return response()->json($note, 201);
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
        $note = Note::find($id); // Use find to get note regardless of the user

        // $note = Note::where('id', $id)->where('user_id', $user->id)->first();

        if (!$note) {
            throw new NotFoundHttpException('Note not found.');
        } else if ($note->user_id !== $user->id) {
            throw new HttpException(403, 'Unauthorized access to the note.');
        }
    
        $note->content = $request->input('content');
        $note->save();
        
        return $note;
        // throw new NotFoundHttpException('Note not found.');

        // return response()->json(['error' => 'Note introuvable :('], 403);
    }

    public function destroy($id)
    {
        $user = Auth::user();
        $note = Note::find($id); // Use find to get note regardless of the user

        // $note = Note::where('id', $id)->where('user_id', $user->id)->first();



        if (!$note) {
            throw new NotFoundHttpException('Note not found.');
        } else if ($note->user_id !== $user->id) {
            throw new HttpException(403, 'Unauthorized access to the note.');
        }
        
        $note->delete();
        return response()->json(['message' => 'Note deleted!'], 204);

        // if ($note) {
        //     $note->delete();
        //     return response()->json(['message' => 'Note supprimée !'], 204);

        // }

        // throw new NotFoundHttpException('Note not found.');


        // if (!$note && $user) {
        //     abort(404, 'Note not found.');
        // }
    
        // abort(403, 'Unauthorized access to the note.');
        // if (!$note && $user) {
        //     // abort(404, 'Note not found.');
        //     return response()->json(['error' => 'Note introuvable :('], 404);
        // }
    

        // return response()->json(['error' => 'Note introuvable :('], 403);
    }
    //  protected function exceptionHandler($exception)
    // {
    //     if ($exception instanceof HttpException) {
    //         $statusCode = $exception->getStatusCode();
    //         return response()->json(['error' => $exception->getMessage()], $statusCode);
    //     }

    //     return parent::exceptionHandler($exception);
    // }
}
