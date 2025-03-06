(function () {
    'use strict';
	Lampa.Listener.follow('app',(e)=>{
        if(e.type == 'ready'){
			setTimeout(function(){
				$(".head__logo-icon").html("<div class=head__logo-icon><img src=http://lampa.mx/img/logo-icon.svg></div>");
				$(".open--profile").remove();
				$(".open--feed").remove();
				$(".open--premium").remove();
				$(".open--notice").remove();
				$("[data-action=feed]").eq(0).remove();
				$("[data-action=myperson]").eq(0).remove();
				$("[data-action=anime]").eq(0).remove();
				$("[data-action=subscribes]").eq(0).remove();
				$("[data-action=timetable]").eq(0).remove();
				$("[data-action=console]").eq(0).remove();
			},10);
        }
    });
})();
