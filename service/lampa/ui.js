(function(){
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
			},10);
        }
});

	Lampa.Listener.follow('full', function(e){
		if (e.type == 'complite'){
			setTimeout(function(){
				$(".full-start__status").remove();
				//$(".full-start__status",Lampa.Activity.active().activity.render()).css({'display':'none'});
				//$('.full-start__status').html($('.full-start__status').html().replace('Онгоинг','Не завершено').replace('Выпущенный','Выпущено'));
				//$(".full-start__status",Lampa.Activity.active().activity.render()).html($('.full-start__status').html().replace('Онгоинг','Не завершено').replace('Выпущенный','Выпущено'));
			},10);
	}
})

})();
