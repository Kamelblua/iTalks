<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Auth\TokenController;
use App\Http\Controllers\Controller;
use App\Http\Controllers\SearchController;
use App\Models\Log;
use App\Models\User;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class LogController extends Controller {

    /**
     * Display a listing of the resource.
     *
     * @return JsonResponse
     */
    public function index(Request $request)
    {
        $search = new SearchController($request, Log::query());

        $Log = $search->addWhere('name', 'LIKE', '%' . $search->getSearch() . '%');

        return response()->json($Log>getResults(), 201);
    }

    /**
     * Create a new log
     *
     * @param string $message
     * @return JsonResponse
     */
    public static function log(string $message)
    {
        Log::create(['text' => $message]);
    }

}
