(function() {
    'use strict';

    Lampa.Listener.follow('full', function(e) {
        if (e.type == 'complite') {
			setTimeout(function(){
				$('#app > div.head > div > div.head__logo-icon').append("<img src='http://bylampa.online/img/logo-icon.svg'>");
			},10);
	   }
    })
})();
