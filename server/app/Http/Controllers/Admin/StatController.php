<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Badge;
use App\Models\Category;
use App\Models\Comment;
use App\Models\Message;
use App\Models\Post;
use App\Models\Resource;
use App\Models\Role;
use App\Models\Status;
use App\Models\User;
use Illuminate\Http\Request;

class StatController extends Controller
{
    public function all()
    {
        $users = User::all()->count();
        $posts = Post::all()->count();
        $categories = Category::all()->count();
        $badges = Badge::all()->count();
        $statuses = Status::all()->count();
        $resources = Resource::all()->count();
        $roles = Role::all()->count();
        $comments = Comment::all()->count();
        $sent_messages = Message::all()->count();

        return response()->json([
            "users" => $users,
            "posts" => $posts,
            "categories" => $categories,
            "badges" => $badges,
            "statuses" => $statuses,
            "resources" => $resources,
            "roles" => $roles,
            "comments" => $comments,
            "sent_messages" => $sent_messages,
        ]);
    }
}