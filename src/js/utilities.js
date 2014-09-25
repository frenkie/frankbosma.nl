var addEvent = (function () {

     if ( document.attachEvent ) {
         return function ( elem, event, handler ) {
             elem.attachEvent( 'on'+ event, handler );
         };
     } else if ( document.addEventListener ) {
         return function ( elem, event, handler ) {
             elem.addEventListener( event, handler );
         };
     } else {
         return function (){};
     }

 })();