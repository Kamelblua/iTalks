<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Auth\TokenController;
use App\Http\Controllers\Controller;
use App\Http\Controllers\SearchController;
use App\Models\PostCategory;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use App\Models\Category;
use App\Models\Status;

class CategoryController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return JsonResponse
     */
    public function all(Request $request)
    {
        $search = new SearchController($request, Category::query());

        $search->addWhere('name', 'LIKE', $search->getSearch() . '%');

        return response()->json($search->getResults(), 200);
    }

    /**
     * Return the category for the given id
     *
     * @param int $id
     * @return JsonResponse
     */
    public function get($id)
    {
        $category = Category::find($id);

        if (!$category) {
            return response()->json([
                'message' => 'La catégorie n\'a pas été trouvé.',
            ], 404);
        }

        return response()->json([
            'category' => $category,
        ], 201);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param Request $request
     * @return JsonResponse
     */
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required|min:3|max:20|unique:categories,name',
            'status' => 'required|exists:statuses,name',
            'color' => ['required', 'regex:/^(#){1}[a-fA-F1-9]{3}|(#){1}[a-fA-F1-9]{6}$/'],
            'description' => 'required|max:255|'
        ]);

        if ($validator->fails()) {
            return response()->json([
                'errors' => $validator->errors()
            ], 400);
        }

        $category = new Category();

        $status = Status::where('name', request('status'))->first();

        $category->name = trim(request('name'));
        $category->status_id = $status->id;
        $category->color = request('color');
        $category->description = request('description');

        if ($category->save()) {
            LogController::log("La catégorie " . $category->name . " vient d'être ajouté par " . TokenController::getUserCurrent($request)->username . ".");
            return response()->json([
                'message' => 'La catégorie a été créé avec succès!'
            ], 201);
        }

        return response()->json([
            'message' => '500: Une erreur s\'est produite, veuillez réessayer.'
        ], 500);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param Request $request
     * @param  int  $id
     * @return JsonResponse
     */
    public function update(Request $request, $id)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required|min:3|max:20|unique:categories,name',
            'status' => 'required|exists:statuses,name',
            'color' => ['required', 'regex:/^(#){1}[a-fA-F1-9]{3}|(#){1}[a-fA-F1-9]{6}$/'],
            'description' => 'required|max:255|'
        ]);

        if ($validator->fails()) {
            return response()->json([
                'errors' => $validator->errors()
            ], 400);
        }

        $category = Category::find($id);

        if (!$category) {
            return response()->json([
                'message' => 'La catégorie n\'a pas été trouvé.',
            ], 404);
        }

        $customExistsName = Category::where('name', request('name'))->first();

        if (request('name') !== $category->name && $customExistsName) {
            return response()->json([
                'errors' => [
                    'name' => 'Ce nom est déjà utilisé.'
                ]
            ], 400);
        }

        $status = Status::where('name', request('status'))->first();

        $category->name = trim(request('name')) ?? $category->name;
        $category->status_id = $status->id ?? $category->status_id;
        $category->color = request('color') ?? $category->color;
        $category->description = request('description') ?? $category->description;

        $update = $category->save();

        LogController::log("La catégorie " . $category->name . " vient d'être mise à jour par " . TokenController::getUserCurrent($request)->username . ".");

        if ($update) {
            return response()->json([
                'message' => 'La catégorie mis à jour avec succès!',
                'category' => $category
            ], 201);
        }

        return response()->json([
            'message' => '500: Une erreur s\'est produite, veuillez réessayer.'
        ], 500);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return JsonResponse
     */
    public function destroy(Request $request, $id)
    {
        $category = Category::find($id);

        if (!$category) {
            return response()->json([
                'message' => 'La catégorie n\'a pas été trouvé.'
            ], 404);
        }

        $postCategory = PostCategory::where('category_id', $category->id)->first();

        if ($postCategory) {
            return response()->json([
                'message' => 'La catégorie est lié à un ou plusieurs post.'
            ], 404);
        }

        $delete = $category->delete();

        LogController::log("La catégorie " . $category->name . " vient d'être supprimé par " . TokenController::getUserCurrent($request)->username . ".");

        if ($delete) {
            return response()->json([
                'message' => 'La catégorie a été supprimé avec succès!'
            ], 201);
        }

        return response()->json([
            'message' => '500: Une erreur s\'est produite, veuillez réessayer.'
        ], 500);
    }
}
