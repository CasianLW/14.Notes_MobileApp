<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Models\Note;
use Illuminate\Support\Facades\DB;

class ResetController extends Controller
{
    public function reset()
    {
        User::truncate();
        Note::truncate();
        DB::table('personal_access_tokens')->truncate();

        return response(null, 204);
    }
}