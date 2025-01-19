(function(plugin) {
    plugin.id = "selective-proxy";
    plugin.version = "1.0.0";
    plugin.name = "Image Proxy Plugin";

    plugin.init = function() {
        // Прокси-домен
        const proxyUrl = "https://cors.fenixx04412.workers.dev/";

        // Домен, который нужно проксировать
        const targetDomain = "kinopoiskapiunofficial.tech";

        // Функция для добавления прокси только к определенным URL
        function addProxy(url) {
            if (url.includes(targetDomain)) {
                if (!url.startsWith(proxyUrl)) {
                    return proxyUrl + url;
                }
            }
            return url; // Возвращаем оригинальный URL, если он не совпадает с targetDomain
        }

        // Перехват запросов к изображениям
        Lampa.Listener.follow('image', function(event) {
            if (event.url) {
                event.url = addProxy(event.url);
                console.log(`Изображение проксировано: ${event.url}`);
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