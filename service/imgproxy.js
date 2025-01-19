(function(plugin) {
    plugin.id = "selective-proxy";
    plugin.version = "1.0.0";
    plugin.name = "Image Proxy Plugin";

    plugin.init = function() {
        // Прокси-домен
        const proxyUrl = "https://cors.fenixx04412.workers.dev/";

        // Адрес, который нужно проксировать
        const targetUrl = "https://kinopoiskapiunofficial.tech/images/";

        // Функция для добавления прокси только к определенным URL
        function addProxy(url) {
            if (url.startsWith(targetUrl)) { // Проверяем, начинается ли URL с нужного адреса
                if (!url.startsWith(proxyUrl)) { // Исключаем уже проксированные URL
                    return proxyUrl + url;
                }
            }
            return url; // Возвращаем оригинальный URL, если он не соответствует targetUrl
        }

        // Перехват запросов к изображениям
        Lampa.Listener.follow('image', function(event) {
            if (event.url) {
                event.url = addProxy(event.url);
                console.log(`Обработанный URL изображения: ${event.url}`);
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
