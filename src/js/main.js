
    var navigation;

    if ( document.querySelector ) {
        navigation = new Navigation( document.querySelector('.main-navigation') );

        navigation.addTrigger( document.querySelector('.main-header-show-navigation') );
    }

