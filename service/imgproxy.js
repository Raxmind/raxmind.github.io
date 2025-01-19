(function(plugin) {
    plugin.id = "kinopoisk-proxy";
    plugin.version = "1.0.0";
    plugin.name = "Kinopoisk Image Proxy Plugin";

    plugin.init = function() {
        // Прокси-домен
        const proxyUrl = "https://cors.fenixx04412.workers.dev/";

        // Адрес, который нужно проксировать
        const targetUrl = "https://kinopoiskapiunofficial.tech/images/";

        // Функция для добавления прокси только к картинкам с конкретного адреса
        function addProxy(url) {
            if (url.startsWith(targetUrl)) { // Проверяем, начинается ли URL с нужного адреса
                return proxyUrl + url; // Добавляем прокси-домен перед исходным URL
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

        Lampa.Noty.show(`${plugin.name} успешно загружен!`);
    };

    // Запуск плагина
    plugin.start = function() {
        plugin.init();
    };

    plugin.start();
})(this.plugin = this.plugin || {});
