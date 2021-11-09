<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Auth\TokenController;
use App\Http\Controllers\Controller;

use App\Http\Controllers\SearchController;
use App\Models\User;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

use Illuminate\Support\Facades\Validator;

use App\Models\Role;
use App\Models\Status;

class RoleController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return JsonResponse
     */
    public function all(Request $request)
    {
        $search = new SearchController($request, Role::query());

        $search->addWhere('name', 'LIKE',  $search->getSearch() . '%');

        return response()->json($search->getResults(), 201);
    }

    /**
     * Return the role for the given id
     *
     * @param int $id
     * @return JsonResponse
     */
    public function get($id)
    {
        $role = Role::find($id);

        if (!$role) {
            return response()->json([
                'message' => 'Le role n\'a pas été trouvé.',
            ], 404);
        }

        return response()->json([
            'role' => $role,
        ], 201);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return JsonResponse
     */
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required|min:3|max:20|unique:roles,name',
            'status' => 'required|exists:statuses,name',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'errors' => $validator->errors()
            ], 400);
        }

        $role = new Role();

        $status = Status::where('name', request('status'))->first();

        $role->name = trim(request('name'));
        $role->status_id = $status->id;
        $save = $role->save();

        if ($save) {
            LogController::log("Le rôle " . $role->name . " vient d'être ajouté par " . TokenController::getUserCurrent($request)->username . ".");
            return response()->json([
                'message' => 'Le role a été créé avec succès!'
            ], 201);
        }

        return response()->json([
            'message' => '500: Une erreur s\'est produite, veuillez réessayer.'
        ], 500);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return JsonResponse
     */
    public function update(Request $request, $id)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'nullable|min:3|max:20'
        ]);

        if ($validator->fails()) {
            return response()->json([
                'errors' => $validator->errors()
            ], 400);
        }

        $role = Role::find($id);

        if (!$role) {
            return response()->json([
                'message' => 'Le role n\'a pas été trouvé.',
            ], 404);
        }

        $customExistsName = Role::where('name', request('name'))->first();

        if (request('name') !== $role->name && $customExistsName) {
            return response()->json([
                'errors' => [
                    'name' => 'Ce nom est déjà utilisé.'
                ]
            ], 400);
        }

        $role->name = request('name') ?? $role->name;
        $update = $role->save();

        if ($update) {
            LogController::log("Le rôle " . $role->name . " vient d'être mise à jour par " . TokenController::getUserCurrent($request)->username . ".");
            return response()->json([
                'message' => 'Role mis à jour avec succès!',
                'role' => $role
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
        $role = Role::find($id);


        if (!$role) {
            return response()->json([
                'message' => 'Le role n\'a pas été trouvé.'
            ], 404);
        }

        $user = User::where('role_id', $role->id)->first();

        if ($user) {
            return response()->json([
                'message' => 'Le rôle est lié à un ou plusieurs utilisateur.'
            ], 404);
        }

        $delete = $role->delete();

        if ($delete) {
            LogController::log("Le rôle " . $role->name . " vient d'être supprimé par " . TokenController::getUserCurrent($request)->username . ".");
            return response()->json([
                'message' => 'Role supprimé avec succès!'
            ], 201);
        }

        return response()->json([
            'message' => '500: Une erreur s\'est produite, veuillez réessayer.'
        ], 500);
    }
}