var Navigation = function ( navigationNode ) {
    this.container = document.querySelector('body');
    this.node = navigationNode;

    this.bindEvents();
};

Navigation.prototype = {

    addTrigger : function ( triggerNode ) {
        addEvent( triggerNode, 'click', this.handleTrigger.bind( this ) );
    },

    bindEvents : function () {
        addEvent( document, 'click', this.handleContainerClick.bind( this ) );
        addEvent( this.node, 'click', this.handleNodeClick.bind( this ) );
    },

    handleContainerClick : function () {

        if ( this.isVisible() ) {
            this.hideNavigation();
        }
    },

    handleNodeClick : function ( e ) {
        e.stopPropagation();
    },

    handleTrigger : function ( e ) {

        e.stopPropagation();

        if ( this.isVisible() ) {
            this.hideNavigation();

        } else {
            this.showNavigation();
        }
    },

    hideNavigation : function () {
        this.container.className = this.container.className.replace( 'navigation-visible', '' );
        this.node.className = this.node.className.replace( 'navigation-visible', '' );
    },

    isVisible : function () {
        return  /navigation-visible/.test( this.node.className );
    },

    showNavigation : function () {
        this.container.className = this.container.className +' navigation-visible';
        this.node.className = this.node.className +' navigation-visible';
    }
};