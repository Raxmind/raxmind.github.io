(function () {
    'use strict';
	Lampa.Listener.follow('app',(e)=>{
		if(e.type == 'ready'){
			setTimeout(function(){
				$(".head__logo-icon").html("<img src=http://lampa.mx/img/logo-icon.svg>");
				$(".head__logo-cap").remove();
				$(".head__logo-halloween").remove();
				$(".open--broadcast").remove();
				$("[data-action=anime]").eq(0).remove();
				$("[data-action=timetable]").eq(0).remove();
				$("[data-action=console]").eq(0).remove();
				$("#app .full-start__status:contains('Онгоинг')").html("В процессе");
			},10);
        }
    });
})();
