<?php

namespace App\Http\Controllers\Category;

use App\Http\Controllers\Auth\TokenController;
use App\Http\Controllers\Controller;
use App\Http\Controllers\Post\PostController;
use App\Http\Controllers\SearchController;
use App\Models\Category;
use App\Models\Post;
use App\Models\User;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Http\Request;

class CategoryController extends Controller
{
    public function all(Request $request)
    {
        return response()->json(Category::all());
    }

    public function get(Request $request, string $name)
    {
        $category = Category::where('name', $name)->firstOrFail();
        $token = TokenController::parseToken($request->cookie('token'));
        $user = User::find($token['uid']);

        $posts = Post::whereHas('categories_relation', function (Builder $query) use ($category) {
            $query->where('name', $category->name);
        })->latest();

        $search = new SearchController($request, $posts);

        $postsWithFeedback = PostController::addFeedbacksToPosts($search->get(), $user->id);

        $search->replaceItems($postsWithFeedback);

        return response()->json($search->getResults());
    }
}