<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Auth\TokenController;
use App\Http\Controllers\SearchController;
use App\Models\Resource;
use App\Models\Role;
use App\Models\Status;
use App\Models\User;

use Illuminate\Http\Request;

use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\File;

use App\Http\Controllers\Controller;
use Illuminate\Http\UploadedFile;

class UserController extends Controller
{
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'username' => 'required|min:3|max:25|unique:users,username',
            'email' => 'required|email|unique:users,email',
            'role' => 'required|exists:roles,name',
            'status' => 'required|exists:statuses,name',
            'password' => 'required|min:3|max:30',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'errors' => $validator->errors()
            ], 400);
        }

        if ($request->hasFile('avatar')) {
            $file_extention = $request->file('avatar')->getClientOriginalExtension();
            if (!in_array($file_extention, ['jpeg', 'jpg', 'png', 'gif'])) {
                return response()->json([
                    'errors' => [
                        'avatar' => 'L\'extension du fichier n\'est pas accepté. (' . $file_extention . ')'
                    ]
                ], 400);
            }
        }

        $role = Role::where('name', request('role'))->first();
        $status = Status::where('name', request('status'))->first();

        $user = new User();
        $user->username = trim(request('username'));
        $user->email = strtolower(request('email'));
        $user->role_id = $role->id;
        $user->status_id = $status->id;
        $user->password = Hash::make(request('password'));
        $save = $user->save();

        LogController::log("L'utilisateur " . $user->username . " vient d'être ajouté par " . TokenController::getUserCurrent($request)->username . ".");

        if ($save) {
            if ($request->hasFile('avatar')) {
                $this->storeAvatar($request->file('avatar'), $user);
            }

            return response()->json([
                'message' => 'Utilisateur enregistré avec succès!'
            ], 201);
        } else {
            return response()->json([
                'message' => '500: Une erreur s\'est produite, veuillez réessayer.'
            ], 500);
        }
    }

    public function all(Request $request)
    {
        $search = new SearchController($request, User::query());

        $search->addWhere('username', 'LIKE', $search->getSearch() . '%');

        return response()->json($search->getResults(), 201);
    }

    public function update(Request $request, string $username)
    {
        $validator = Validator::make($request->all(), [
            'username' => 'min:3|max:25',
            'email' => 'email',
            'role' => 'exists:roles,name',
            'status' => 'exists:statuses,name',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'errors' => $validator->errors()
            ], 400);
        }

        $user = User::where('username', $username)->first();

        $customExistsUsername = User::where('username', request('username'))->first();
        $customExistsEmail = User::where('email', request('email'))->first();

        if (request('username') !== $user->username && $customExistsUsername) {
            return response()->json([
                'errors' => [
                    'username' => 'La valeur du champ nom d\'utilisateur est déjà utilisée.'
                ]
            ], 400);
        } else if (request('email') !== $user->email && $customExistsEmail) {
            return response()->json([
                'errors' => [
                    'email' => 'La valeur du champ adresse email est déjà utilisée.'
                ]
            ], 400);
        }

        $role = Role::where('name', request('role'))->first();
        $status = Status::where('name', request('status'))->first();

        $user->username = request('username') ? request('username') : $user->username;
        $user->email = request('email') ? request('email') : $user->email;
        $user->role_id = $role ? $role->id : $user->role_id;
        $user->status_id = $status ? $status->id : $user->status_id;
        $user->password = request('password') ? Hash::make(request('password')) : $user->password;
        $update = $user->save();

        LogController::log("L'utilisateur " . $user->username . " vient d'être mise à jour par " . TokenController::getUserCurrent($request)->username . ".");

        if ($update) {
            return response()->json([
                'message' => 'Utilisateur mis à jour avec succès!',
                'user' => $user
            ], 201);
        } else {
            return response()->json([
                'message' => '500: Une erreur s\'est produite, veuillez réessayer.'
            ], 500);
        }
    }

    public function get(int $id)
    {
        $user = User::find($id);

        if ($user) {
            return response()->json([
                'user' => $user,
            ], 201);
        }
    }

    public function getByUsername(string $username)
    {
        $user = User::where('username', $username)->first();

        if ($user) {
            return response()->json([
                'user' => $user,
            ], 201);
        }

        return response()->json([
            'message' => "Utilisateur non trouvé.",
        ], 404);
    }

    public function destroy(Request $request, int $id)
    {
        $user = User::find($id);

        $this->deleteAvatarInner($user);

        $status = Status::where('name', 'supprimé')->first();

        $user->status_id = $status->id;

        if ($user->save()) {
            LogController::log("L'utilisateur " . $user->username . " vient d'être supprimé par " . TokenController::getUserCurrent($request)->username . ".");
            return response()->json([
                'message' => 'Utilisateur supprimé avec succès!'
            ], 201);
        } else {
            return response()->json([
                'message' => '500: Une erreur s\'est produite, veuillez réessayer.'
            ], 500);
        }
    }

    private function storeAvatar(UploadedFile $file, User $user)
    {
        $file_extention = $file->getClientOriginalExtension();
        $filename = 'avatar.' . $file_extention;

        $base_path = public_path('/storage/images/users/');

        $user_path = $base_path . $user->id;

        if (!File::isDirectory($user_path)) {
            File::makeDirectory($user_path, 0777, true, true);
        }

        $file->storeAs('users/' . $user->id, 'avatar.' . $file_extention, 'local');

        $status = Status::where('name', 'actif')->first();

        $avatar = new Resource();
        $avatar->link = config('app.url') . config('app.port') . '/api/image/user/' . $user->id . '/' . $filename;
        $avatar->name = $filename;
        $avatar->status_id = $status->id;
        $avatar->save();

        $user->resource_id = $avatar->id;
        $user->save();
    }

    public function updateAvatar(Request $request, string $username)
    {
        $user = User::where('username', $username)->first();

        if ($user && $request->hasFile('avatar')) {
            $file_extention = $request->file('avatar')->getClientOriginalExtension();
            if (!in_array($file_extention, ['jpeg', 'jpg', 'png', 'gif'])) {
                return response()->json([
                    'errors' => [
                        'avatar' => 'L\'extension du fichier n\'est pas accepté. (' . $file_extention . ')'
                    ]
                ], 400);
            }

            $this->deleteAvatarInner($user);

            $this->storeAvatar($request->file('avatar'), $user);

            LogController::log("L'avatar de l'utilisateur  " . $user->username . " vient d'être mise à jour par " . TokenController::getUserCurrent($request)->username . ".");

            return response()->json([
                'message' => 'L\'avatar a été modifié avec succès!',
                'user' => $user
            ], 201);
        }

        return response()->json([
            'message' => '500: Erreur serveur. Impossible de mettre à jour la resource.'
        ], 500);
    }

    public function deleteAvatarOuter(Request $request, string $username)
    {
        $user = User::where('username', $username)->first();
        $user_avatar_resource = Resource::find($user->resource_id);

        if ($user_avatar_resource) {
            if (File::exists(public_path('/storage/images/users/' . $user->id . '/' . $user_avatar_resource->name)) && $user_avatar_resource) {
                File::delete(public_path('/storage/images/users/' . $user->id . '/' . $user_avatar_resource->name));
                $delete = $user_avatar_resource->delete();

                if (!$delete) {
                    return response()->json([
                        'message' => '500: Erreur serveur. Impossible de supprimer la resource (introuvable ou inexistante).'
                    ], 500);
                }

                $user->resource_id = null;
                $user->save();

                LogController::log("L'avatar de l'utilisateur  " . $user->username . " vient d'être supprimé par " . TokenController::getUserCurrent($request)->username . ".");


                return response()->json([
                    'message' => 'L\'image de l\'utilisateur a été supprimée avec succés!'
                ], 201);
            } else if (stripos($user_avatar_resource->link, 'placeholder')) {
                $user->resource_id = null;
                $user->save();

                return response()->json([
                    'message' => 'L\'image de l\'utilisateur a été supprimée avec succés!'
                ], 201);
            }
        }

        return response()->json([
            'message' => '500: Erreur serveur. Impossible de supprimer la resource (introuvable ou inexistante).'
        ], 500);
    }

    private function deleteAvatarInner(User $user)
    {
        $user_avatar_resource = Resource::where('id', $user->resource_id)->first();

        if ($user_avatar_resource && File::exists(public_path('/storage/images/users/' . $user->id . '/' . $user_avatar_resource->name))) {
            File::delete(public_path('/storage/images/users/' . $user->id . '/' . $user_avatar_resource->name));
            return $user_avatar_resource->delete();
        }

        return false;
    }
}
