document.addEventListener("DOMContentLoaded",(event) => {
    const body = document.querySelector("body");
    const header = document.querySelector("header");

    
    function checkActiveTab()
    {
        // Убираем класс active со всех ссылок
        document.querySelectorAll('.nav-link').forEach(link => link.classList.remove('active'));
        
        // Находим ссылку, которая соответствует текущему URL
        const currentLink = Array.from(document.querySelectorAll('.nav-link'))
        .find(link => link.getAttribute('href') === window.location.pathname);

        // Добавляем класс active для текущей ссылки
        if (currentLink) {
        currentLink.classList.add('active');
        }
    }

    function initMasks()
    {
        IMask(
            document.getElementById('exchangeInput'),
            {
              mask: Number,
              min: 1,
              max: 100000000,
              thousandsSeparator: ' '
            }
          )
    }

    function init()
    {
        checkActiveTab();
        initMasks();
        document.addEventListener('htmx:afterRequest', checkActiveTab);
    }

    init();
});
