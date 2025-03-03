(function () {
    'use strict';
	Lampa.Listener.follow('app',(e)=>{
        if(e.type == 'ready'){
			setTimeout(function(){
				$(".head__body > .head__logo-icon",Lampa.Activity.active().activity.render()).empty().append("<img src="http://lampa.mx/img/logo-icon.svg">");
				$(".open--profile").remove();
				$(".open--feed").remove();
				$(".open--premium").remove();
				$(".open--notice").remove();
				$("[data-action=mytorrents]").eq(0).remove();
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
