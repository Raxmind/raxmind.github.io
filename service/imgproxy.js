(function () {
    'use strict';

    // Прокси-домен
    var proxyUrl = "https://cors.fenixx04412.workers.dev/";

    // Домены, которые нужно проксировать
    var targetDomains = ["kinopoiskapiunofficial.tech", "st.kp.yandex.net", "avatars.mds.yandex.net"];

    // Функция для добавления прокси только к картинкам с конкретных адресов
    function addProxy(url) {
        for (var i = 0; i < targetDomains.length; i++) {
            if (url.indexOf(targetDomains[i]) !== -1) {
                if (/https?:\/\//.test(url) && url.match(/\.(jpg|png)$/)) {
                    return proxyUrl + encodeURIComponent(url);
                }
            }
        }
        return url; // Оставляем остальные URL без изменений
    }

    // Перехват запросов к изображениям
    Lampa.Listener.follow('image', function (event) {
        if (event && event.url) {
            var originalUrl = event.url;
            var proxiedUrl = addProxy(originalUrl);
            if (originalUrl !== proxiedUrl) {
                event.url = proxiedUrl;
                console.log("Обработано изображение:", originalUrl, "->", event.url);
            }
        }
    });
})();
