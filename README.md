# iTalks

## Description du projet

iTalks est une plateforme d'échange d'avis et de conseil sur des produits allant de l'éléctroménager aux produits de beauté en passant par les fournitures de bureau.

## Lancer le projet en local

### Cloner le projet

Via ssh [(comment configurer sa clé SSH)](https://docs.github.com/en/github/authenticating-to-github/connecting-to-github-with-ssh/generating-a-new-ssh-key-and-adding-it-to-the-ssh-agent)

```
$ git clone git@github.com:AClain/italks.git
```

Via https

```
$ git clone https://github.com/AClain/italks.git
```

### Modifier les variables d'environnement

- Modifier les variables d'environnements

Variables d'environnement importantes à modifier/ajouter dans /client :
_(ce fichier n'étant pas présent lors de la première copie du repo, il vous faudra faire une copie de /client/.env.example)_

```
REACT_APP_SERVER_URL=http://localhost:8000

REACT_APP_MIX_PUSHER_APP_KEY=12345
REACT_APP_MIX_PUSHER_APP_CLUSTER=mt1
```

Variables d'environnement importantes à modifier dans /server
_(ce fichier n'étant pas présent lors de la première copie du repo, il vous faudra faire une copie de /server/.env.example)_

```
APP_PORT=8000
SERVER_PORT=8000
CLIENT_URL=http://localhost:3000

DB_HOST=localhost
DB_PORT=3306
DB_DATABASE=italks
DB_USERNAME=root
DB_PASSWORD=

BROADCAST_DRIVER=pusher
CACHE_DRIVER=file
QUEUE_CONNECTION=sync
SESSION_DRIVER=file
SESSION_LIFETIME=120

MAIL_MAILER=smtp
MAIL_HOST=localhost
MAIL_PORT=1025
MAIL_USERNAME=null
MAIL_PASSWORD=null
MAIL_ENCRYPTION=null
MAIL_FROM_ADDRESS=no-reply@italks.com

PUSHER_APP_ID=12345
PUSHER_APP_KEY=12345
PUSHER_APP_SECRET=12345
PUSHER_APP_CLUSTER=mt1

JWT_SECRET=IpZHKZADOFqgY64ap7tiIvOlGXqyKgjsas2FYDQu1O8=
```

- Côté serveur (Laravel)

Installer les dépendances :

```
$ cd server
$ composer install
// Commande requise deux fois d$u à certains packects
$ composer install
```

Générer une clé secrète :

```
$ php artisan key:generate
Application key set successfully.
```

Créer le lien symbolique pour le dossier `storage` :

```
$ php artisan storage:link
The links have been created.
```

Effectuer les migrations :

```
$ php artisan migrate:fresh
Dropped all tables successfully.
Migration table created successfully.
Migrating: ...
Migrated: ...
```

- Côté client (React)

```
$ yarn
[1/4] Resolving packages...
[2/4] Fetching packages...
[3/4] Linking dependencies...
[4/4] Building fresh packages...
Done in XX.XXs
$ yarn start
yarn run vX.XX.XX
react-scripts start
Starting the development server...
```

- Configuration de Maildev [(installer Docker)](https://docs.docker.com/get-docker/)

```
$ docker pull djfarrelly/maildev
$ docker run -p 1080:80 -p 1025:25 djfarrelly/maildev
```

- Lancer le serveur websocket

```
$ cd server
$ php artisan websocket:serve
```

- Accéder aux services

Accéder au client : localhost:3000
Accéder à l'api : localhost:8000/api
Accèder au serveur mail : localhost:1080
