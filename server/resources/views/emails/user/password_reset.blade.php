@extends('layouts.email')

@section('title')
    Réinitialisation de mot de passe
@endsection

@section('content')
    <div class="col-12">
        <h2>Bonjour {{ $data['user']->username }} !</h2>
        <p>Vous recevez cet email car vous avez demandé une réinitialisation de votre mot de passse.</p>
        <div class="alert alert-danger d-flex align-items-center" role="alert">
            <div class="flex-shrink-0">
              <i class="fa fa-fw fa-info-circle"></i>
            </div>
            <div class="flex-grow-1 ms-3">
              <p class="mb-0">
                Si ce n'est pas le cas, cliquez <a href="#">ici</a>.
              </p>
            </div>
          </div>
        <p></p>
    </div>
    <div class="col-md-auto text-center">
        <a href="{{ config('app.client_url') . '/password_reset?token=' . $data['token'] }}" class="btn btn-primary me-1 mb-3"><i class="fa fa-sync-alt"></i> Réinitialiser mon mot de passe</a>
    </div>
    <div class="col-12">
        <p>Lien expirant au bout d'une heure.</p>
    </div>
@endsection