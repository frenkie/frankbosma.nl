
    var navigation;
    var gallery;

    if ( document.querySelector ) {

        navigation = new Navigation( document.querySelector('.main-navigation') );

        navigation.addTrigger( document.querySelector('.main-header-show-navigation') );
        navigation.addTrigger( document.querySelector('.main-content-hitrect') );

        if ( document.querySelector('.gallery') ) {

            window.addEventListener('load', function () {
                gallery = new Gallery( document.querySelector('.gallery'), ['gallery-image', 'grid-image'] );
            });
        }
    }

