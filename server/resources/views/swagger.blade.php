<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <title>Swagger UI</title>
    <link rel="stylesheet" href="{{ asset('/css/swagger-ui.css') }}">
    <style>
        html {
            box-sizing: border-box;
            overflow: -moz-scrollbars-vertical;
            overflow-y: scroll;
        }

        *,
        *:before,
        *:after {
            box-sizing: inherit;
        }

        body {
            margin: 0;
            background: #fafafa;
        }

    </style>
</head>

<body>
    <div id="swagger-ui"></div>
    <script src="{{ asset('js/swagger-ui-standalone-preset.js') }}"></script>
    <script src="{{ asset('js/swagger-ui-bundle.js') }}"></script>
    <script>
        window.onload = function() {
            // Begin Swagger UI call region
            console.log(window.location);
            const ui = SwaggerUIBundle({
                url: window.location.origin +
                    "/swagger/get",
                dom_id: '#swagger-ui',
                deepLinking: true,
                presets: [
                    SwaggerUIBundle.presets.apis,
                    SwaggerUIStandalonePreset
                ],
                layout: "StandaloneLayout"
            })
            // End Swagger UI call region
            window.ui = ui
        }
    </script>
</body>

</html>
