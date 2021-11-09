<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Controllers\SearchController;
use App\Models\Post;
use Illuminate\Http\Request;

class PostController extends Controller
{
    public function all(Request $request)
    {
        $search = new SearchController($request, Post::query());

        $search->addWhere('title', 'LIKE', $search->getSearch() . '%');

        return response()->json($search->getResults(), 200);
    }
}
