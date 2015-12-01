<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="csrf-token" content="{!! csrf_token() !!}">
    <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=yes">

    <title>Larafreek</title>

    <link href="https://fonts.googleapis.com/css?family=Lato:300,600" rel="stylesheet" type="text/css">
    <link rel="stylesheet" href="{!! webpack('css', 'app') !!}">

    <script src="https://cdnjs.cloudflare.com/ajax/libs/wow/1.1.2/wow.min.js"></script>
</head>
<body>
    <div class="container">
        <div class="content wow fadeInUp">
            <div class="title">Laravel 5</div>
        </div>

        {{-- de module en stylesheet voor de photoswipe plugin worden alleen geladen indien nodig --}}
        {{-- de html template wordt toegevoegd aan de body en de stylesheet wordt toegevoegd in de HEAD --}}
        <div class="js-gallery">
            @foreach(range(1, 2) as $i)
                <figure>
                    <a href="//placehold.it/1000x666&text=foto{{$i}}" data-size="1000x666">
                        <img class="img-responsive" width="200" height="133" alt="" src="//placehold.it/200x133&text=foto{{$i}}">
                    </a>
                    <figcaption class="item-caption">Foto {{$i}}</figcaption>
                </figure>
            @endforeach
        </div><!-- /.gallery -->
    </div>

    <!-- Javascripts -->
    <script src="{!! webpack('js', 'vendor') !!}"></script>
    <script src="{!! webpack('js', 'app') !!}"></script>
</body>
</html>
