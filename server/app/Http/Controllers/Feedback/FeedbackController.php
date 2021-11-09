<?php

namespace App\Http\Controllers\Feedback;

use App\Http\Controllers\Admin\LogController;
use App\Http\Controllers\Auth\TokenController;
use App\Http\Controllers\Controller;
use App\Models\Comment;
use App\Models\Feedback;
use App\Models\Post;
use App\Models\Status;
use App\Models\User;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\DB;

class FeedbackController extends Controller
{
    /**
     * vote
     *
     * @param Request $request
     * @param int $id
     * @return JsonResponse
     */
    public function vote(Request $request, int $id)
    {

        $validator = Validator::make($request->all(), [
            'type' => ['required', 'regex:/(^post$)|(^comment$)/'],
            'positive' => ['required', 'boolean']
        ], [
            'type.regex' => 'Le type de vote doit être "post" ou "comment".'
        ]);

        if ($validator->fails()) {
            return response()->json([
                'errors' => $validator->errors()
            ], 400);
        }

        $token = TokenController::parseToken($request->cookie('token'));
        $user = User::find($token['uid']);

        $entity = DB::table(request('type') . 's')->find($id);

        $feedback = Feedback::where('user_id', $user->id)->where('entity_id', $entity->id)->where('type', request('type'))->first();

        if ($feedback && $feedback->positive === request('positive')) {
            $feedback->delete();

            return response()->json([
                'message' => 'Vote retiré.'
            ], 201);
        }

        if ($feedback && $feedback->positive !== request('positive')) {
            $feedback->positive = !$feedback->positive;
            $feedback->save();
            LogController::log("Le " . request('type') . " vient d'être voté par " . TokenController::getUserCurrent($request)->username . ".");
            return response()->json([
                'message' => ucfirst(request('type')) . " voté avec succès."
            ], 201);
        }

        $feedback = new Feedback();
        $feedback->user_id = $user->id;
        $feedback->entity_id = $entity->id;
        $feedback->positive = request('positive');
        $feedback->type = request('type');

        if ($feedback->save()) {
            LogController::log("Le " . request('type') . " vient d'être voté par " . TokenController::getUserCurrent($request)->username . ".");
            return response()->json([
                'message' => ucfirst(request('type')) . " voté avec succès."
            ], 201);
        }

        return response()->json([
            'message' => '500: Une erreur s\'est produite, veuillez réessayer.'
        ], 500);
    }

    /**
     * vote post
     *
     * @param Request $request
     * @return JsonResponse
     */
    public function voted_posts(Request $request)
    {
        $token = TokenController::parseToken($request->cookie('token'));
        $user = User::find($token['uid']);

        $post_feedbacks = $user->voted_posts;
        $voted_posts = [];

        foreach ($post_feedbacks as $feedback) {
            $post = Post::find($feedback->entity_id);
            $post->vote = $feedback->positive;
            $voted_posts[] = $post;
        }

        return response()->json([
            'posts' => $voted_posts
        ]);
    }

    /**
     * vote comment
     *
     * @param Request $request
     * @return JsonResponse
     */
    public function voted_comments(Request $request)
    {
        $token = TokenController::parseToken($request->cookie('token'));
        $user = User::find($token['uid']);

        $comment_feedbacks = $user->voted_comments;
        $voted_comments = [];

        foreach ($comment_feedbacks as $feedback) {
            $comment = Comment::find($feedback->entity_id);
            $comment->vote = $feedback->positive;
            $voted_comments[] = $comment;
        }

        return response()->json([
            'comments' => $voted_comments
        ]);
    }

    /**
     * Return the vote for the given id
     *
     * @param Request $request
     * @param string $type
     * @param int $id
     * @return JsonResponse
     */
    public function get(Request $request, string $type, int $id)
    {
        $entity = DB::table($type . "s")->find($id);

        if (!$entity) {
            return response()->json([
                'message' => 'L\'entité recherchée n\'existe pas.',
            ], 404);
        }

        $votes = Feedback::where('entity_id', $entity->id)->get();

        return response()->json([
            'votes' => $votes,
        ], 201);
    }
}
