(function() {
    'use strict';

        // Прокси-домен
        const proxyUrl = "https://cors.fenixx04412.workers.dev/";

        // Домены, которые нужно проксировать
	const targetDomains = ["kinopoiskapiunofficial.tech", "st.kp.yandex.net", "avatars.mds.yandex.net"];

        // Функция для добавления прокси только к картинкам с конкретных адресов
        function addProxy(url) {
            if (url.includes(targetDomains)) {
		if (url.startsWith(targetDomains) && (url.endsWith('.jpg') || url.endsWith('.png'))) {
    		return proxyUrl + url;
	}
		}
            return url; // Оставляем остальные URL без изменений
        }

        // Перехват запросов к изображениям
        Lampa.Listener.follow('image', function(event) {
            if (event.url) {
                const originalUrl = event.url;
                event.url = addProxy(event.url); // Проксируем, если нужно
                console.log(`Обработано изображение: ${originalUrl} -> ${event.url}`);
            }
        });

})();
