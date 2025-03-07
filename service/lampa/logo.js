(function () {
    'use strict';
	Lampa.Listener.follow('app',(e)=>{
		if(e.type == 'ready'){
			setTimeout(function(){
				$(".head__logo-icon").html("<img src=http://lampa.mx/img/logo-icon.svg>");
				$(".head__logo-cap").remove();
				$(".head__logo-halloween").remove();
			},10);
        }
    });
})();
