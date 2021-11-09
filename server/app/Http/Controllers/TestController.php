<?php

namespace App\Http\Controllers;

use App\Events\RealTimeMessage;
use App\Models\User;
use Illuminate\Http\Request;

class TestController extends Controller
{
    public function index()
    {
        event(new RealTimeMessage(User::find(1)));
    }
}
