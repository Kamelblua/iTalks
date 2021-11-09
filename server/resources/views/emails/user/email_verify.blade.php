@extends('layouts.email')

@section('title')
    Vérification de l'adresse mail
@endsection

@section('content')
    <div class="col-12">
        <h2>Bienvenue sur iTalks, {{ $data['user']->username }} !</h2>
        <p>Vous recevez cet email car vous devez confirmer votre adresse mail.</p>
    </div>
    <div class="col-md-auto text-center">
        <a href="{{ config('app.client_url') . '/verify_email?token=' . $data['token'] }}" class="btn btn-primary me-1 mb-3"><i class="fa fa-sync-alt"></i> Confirmer mon adresse mail</a>
    </div>
    <div class="col-12">
        <p>Lien expirant au bout d'une heure.</p>
    </div>
@endsection