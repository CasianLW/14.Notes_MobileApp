<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Models\Note;
use Illuminate\Support\Facades\DB;

class ResetController extends Controller
{
    public function reset()
    {
        DB::statement('SET FOREIGN_KEY_CHECKS=0;');
        Note::truncate();
        User::truncate();
        DB::table('personal_access_tokens')->truncate();
        DB::statement('SET FOREIGN_KEY_CHECKS=1;');

        return response(null, 204);
    }
}
