<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Auth\TokenController;
use App\Http\Controllers\Controller;

use App\Http\Controllers\SearchController;
use App\Models\Status;
use App\Models\UserBadge;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Validator;

use App\Models\Badge;
use App\Models\Resource;

class BadgeController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return JsonResponse
     */
    public function all(Request $request)
    {
        $search = new SearchController($request, Badge::query());

        $search->addWhere('name', 'LIKE', $search->getSearch() . '%');

        return response()->json($search->getResults(), 201);
    }

    /**
     * Return the badge for the given id
     *
     * @param int $id
     * @return JsonResponse
     */
    public function get($id)
    {
        $badge = Badge::find($id);

        if (!$badge) {
            return response()->json([
                'message' => 'Le badge n\'a pas été trouvé.',
            ], 404);
        }

        return response()->json([
            'badge' => $badge,
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
            'name' => 'required|min:3|max:20|unique:badges,name',
            'description' => 'required|min:5|max:50',
            'status' => 'required|exists:statuses,name',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'errors' => $validator->errors()
            ], 400);
        }

        if ($request->hasFile('image')) {
            $file_extention = $request->file('image')->getClientOriginalExtension();
            if (!in_array($file_extention, ['jpeg', 'jpg', 'png', 'gif'])) {
                return response()->json([
                    'errors' => [
                        'image' => 'L\'extension du fichier n\'est pas accepté. (' . $file_extention . ')'
                    ]
                ], 400);
            }
        }

        $badge = new Badge();

        $status = Status::where('name', request('status'))->first();

        $badge->name = trim(request('name'));
        $badge->description = trim(request('description'));
        $badge->status_id = $status->id;

        if ($badge->save()) {

            LogController::log("Le badge " . $badge->name . " vient d'être ajouté par " . TokenController::getUserCurrent($request)->username . ".");

            if ($request->hasFile('image')) {
                $this->storeImage($request->file('image'), $badge);
            }

            return response()->json([
                'message' => 'Le badge a été créé avec succès!'
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
            'name' => 'nullable|min:3|max:20',
            'description' => 'nullable|min:5|max50',
            'status' => 'exists:statuses,name',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'errors' => $validator->errors()
            ], 400);
        }

        $badge = Badge::find($id);

        if (!$badge) {
            return response()->json([
                'message' => 'Le badge n\'a pas été trouvé.',
            ], 404);
        }

        $customExistsName = Badge::where('name', request('name'))->first();

        if (request('name') !== $badge->name && $customExistsName) {
            return response()->json([
                'errors' => [
                    'name' => 'Ce nom est déjà utilisé.'
                ]
            ], 400);
        }

        $badge->name = request('name') ?? $badge->name;
        $badge->description = request('description') ?? $badge->description;
        $status = Status::where('name', request('status'))->first();
        $badge->status_id = $status->id;
        $update = $badge->save();

        if ($update) {
            LogController::log("Le badge " . $badge->name . " vient d'être mis à jour par " . TokenController::getUserCurrent($request)->username . ".");
            return response()->json([
                'message' => 'Badge mis à jour avec succès!',
                'badge' => $badge
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
        $badge = Badge::find($id);

        if (!$badge) {
            return response()->json([
                'message' => 'Badge non trouvé.'
            ], 404);
        }

        $image_delete = $this->deleteImageInner($badge);

        if (!$image_delete) {
            return response()->json([
                'message' => '500: Une erreur s\'est produite, veuillez réessayer.'
            ], 500);
        }

        $user = UserBadge::where('badge_id', $badge->id)->first();

        if ($user) {
            return response()->json([
                'message' => 'Le badge est lié à un ou plusieurs utilisateur.'
            ], 404);
        }

        $delete = $badge->delete();

        if ($delete) {
            LogController::log("Le badge " . $badge->name . "vient d'être supprimé par " . TokenController::getUserCurrent($request)->username . ".");
            return response()->json([
                'message' => 'Badge supprimé avec succès!'
            ], 201);
        }

        return response()->json([
            'message' => '500: Une erreur s\'est produite, veuillez réessayer.'
        ], 500);
    }

    public function updateImage(Request $request, $id)
    {
        $badge = Badge::find($id);

        if ($badge && $request->hasFile('image')) {
            $file_extention = $request->file('image')->getClientOriginalExtension();
            if (!in_array($file_extention, ['jpeg', 'jpg', 'png', 'gif', 'svg'])) {
                return response()->json([
                    'errors' => [
                        'image' => 'L\'extension du fichier n\'est pas accepté. (' . $file_extention . ')'
                    ]
                ], 400);
            }

            $image_delete = $this->deleteImageInner($badge);

            if (!$image_delete) {
                return response()->json([
                    'message' => '500: Une erreur s\'est produite, veuillez réessayer.'
                ], 500);
            }

            $this->storeImage($request->file('image'), $badge);

            LogController::log("L'image du badge " . $badge->name . " vient d'être mis à jour par " . TokenController::getUserCurrent($request)->username . ".");

            return response()->json([
                'message' => 'L\'image a été modifiée avec succès!',
                'badge' => $badge
            ], 201);
        }

        return response()->json([
            'message' => 'Le badge n\'a pas été trouvé.',
        ], 404);
    }

    public function deleteImageOuter(Request $request, $id)
    {
        $badge = Badge::find($id);
        $badge_image_resource = Resource::find($badge->image_resource_id);

        if (File::exists(public_path('/storage/images/badges/' . $badge->id . '/' . $badge_image_resource->name)) && $badge_image_resource) {
            File::delete(public_path('/storage/images/badges/' . $badge->id . '/' . $badge_image_resource->name));
            $delete = $badge_image_resource->delete();

            if (!$delete) {
                return response()->json([
                    'message' => '500: Erreur serveur. Impossible de supprimer la resource (introuvable ou inexistante).'
                ], 500);
            }

            $badge->image_resource_id = null;
            $badge->save();

            LogController::log("L'image du badge " . $badge->name . " vient d'être supprimé par " . TokenController::getUserCurrent($request)->username . ".");

            return response()->json([
                'message' => 'L\'image a été supprimée avec succés!'
            ], 201);
        }

        return response()->json([
            'message' => '500: Erreur serveur. Impossible de supprimer la resource (introuvable ou inexistante).'
        ], 500);
    }

    private function deleteImageInner($badge)
    {
        $badge_image_resource = Resource::find($badge->image_resource_id);

        if ($badge_image_resource && File::exists(public_path('/storage/images/badges/' . $badge->id . '/' . $badge_image_resource->name))) {
            File::delete(public_path('/storage/images/badges/' . $badge->id . '/' . $badge_image_resource->name));
            return $badge_image_resource->delete();
        }

        return true;
    }

    private function storeImage($file, $badge)
    {
        $file_extention = $file->getClientOriginalExtension();
        $filename = 'image.' . $file_extention;
        $badge =  Badge::find($badge->id);

        $base_path = public_path('/storage/images/badges/');

        $badge_path = $base_path . $badge->id;

        if (!File::isDirectory($badge_path)) {
            File::makeDirectory($badge_path, 0777, true, true);
        }

        $file->storeAs('badges/' . $badge->id, 'image.' . $file_extention, 'local');

        $resource = new Resource();
        $resource->link = config('app.url') . ':' . config('app.port') . '/api/image/badge/' . $badge->id . '/' . $filename;
        $resource->name = $filename;
        $resource->status_id = 1;
        $resource->save();

        $badge->image_resource_id = $resource->id;
        $badge->save();
    }
}
