<?php

namespace App\Http\Controllers\Comment;

use App\Http\Controllers\Admin\LogController;
use App\Http\Controllers\Auth\TokenController;
use App\Http\Controllers\Controller;
use App\Models\Comment;
use App\Models\Post;
use App\Models\Status;
use App\Models\User;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Validator;

class CommentController extends Controller
{
    /**
     * Display a listing of the comment.
     *
     * @return JsonResponse
     */
    public function index()
    {
        $comments = Comment::all();

        return response()->json([
            'comments' => $comments,
        ], 201);
    }

    /**
     * Display a selected comment.
     *
     * @param int $id
     * @return JsonResponse
     */
    public function get(int $id)
    {
        $comment = Comment::find($id);

        if (!$comment) {
            return response()->json([
                'message' => 'Le commentaire n\'a pas été trouvé.',
            ], 404);
        }

        return response()->json([
            'comment' => $comment,
        ], 201);
    }

    /**
     * Display a selected comment.
     *
     * @param int $id
     * @return JsonResponse
     */
    public function getChildren(int $id)
    {
        $comment = Comment::find($id);

        if (!$comment) {
            return response()->json([
                'message' => 'Le commentaire n\'a pas été trouvé.',
            ], 404);
        }

        $childrens = Comment::where('parent_id', $comment->id)->get();

        return response()->json($childrens, 201);
    }

    /**
     * Store a newly created comment.
     *
     * @param Request $request
     * @param int $postId
     * @return JsonResponse
     */
    public function store(Request $request, int $postId)
    {
        $validator = Validator::make($request->all(), [
            'text' => 'required|max:1000',
            'parent' => 'nullable|exists:comments,id'
        ]);

        if ($validator->fails()) {
            return response()->json([
                'errors' => $validator->errors()
            ], 400);
        }

        $comment = new Comment();

        $token = TokenController::parseToken($request->cookie('token'));
        $status = Status::where('name', 'actif')->first();
        $post = Post::find($postId);
        $parent = Comment::where('id', request('parent'))->first();

        $comment->text = request('text');
        $comment->user_id = $token["uid"];
        $comment->status_id = $status->id;
        $comment->post_id = $post->id;
        if (isset($parent)) {
            $comment->parent_id = $parent ? $parent->id : null;
        }
        $save = $comment->save();

        $post = Post::find($comment->post_id);

        if ($save) {
            LogController::log("L'utilisateur " . TokenController::getUserCurrent($request)->username . " vient de commenté sur le post " . $post->title . ".");
            return response()->json([
                'message' => 'Commentaire ajouté avec succès!'
            ], 201);
        }

        return response()->json([
            'message' => '500: Une erreur s\'est produite, veuillez réessayer.'
        ], 500);
    }

    /**
     * Update the specified comment.
     *
     * @param Request $request
     * @param  int  $id
     * @return JsonResponse
     */
    public function update(Request $request, int $id)
    {
        $validator = Validator::make($request->all(), [
            'text' => 'required|max:1000'
        ]);

        if ($validator->fails()) {
            return response()->json([
                'errors' => $validator->errors()
            ], 400);
        }

        $comment = Comment::find($id);
        if (!$comment) {
            return response()->json([
                'message' => 'Le commentaire n\'a pas été trouvé.',
            ], 404);
        }

        $comment = Comment::find($id);
        if (!$comment) {
            return response()->json([
                'message' => 'Le commentaire n\'a pas été trouvé.',
            ], 404);
        }

        $comment->text = request('text');
        $comment->is_edited = true;

        $post = Post::find($comment->post_id);

        if ($comment->save()) {
            LogController::log("L'utilisateur " . TokenController::getUserCurrent($request)->username . " vient de mettre à jour son commentaire sur le post " . $post->title . ".");
            return response()->json([
                'message' => 'Commentaire mis à jour avec succès!',
                'comment' => $comment
            ], 201);
        }

        return response()->json([
            'message' => '500: Une erreur s\'est produite, veuillez réessayer.'
        ], 500);
    }

    /**
     * Remove the specified comment.
     *
     * @param Request $request
     * @param int $id
     * @return JsonResponse
     */
    public function destroy(Request $request, int $id)
    {
        $comment = Comment::find($id);
        if (!$comment) {
            return response()->json([
                'message' => 'Le commentaire n\'a pas été trouvé.',
            ], 404);
        }

        $status = Status::where('name', 'supprimé')->first();

        $comment->status_id = $status->id;

        $post = Post::find($comment->post_id);

        if ($comment->save()) {
            LogController::log("L'utilisateur " . TokenController::getUserCurrent($request)->username . " vient de supprimé son commentaire sur le post " . $post->title . ".");
            return response()->json([
                'message' => 'Commentaire supprimé avec succès!',
            ], 201);
        }

        return response()->json([
            'message' => '500: Une erreur s\'est produite, veuillez réessayer.'
        ], 500);
    }
}