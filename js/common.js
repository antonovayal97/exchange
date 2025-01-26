document.addEventListener("DOMContentLoaded",(event) => {
    const html = document.querySelector("html");
    const body = document.querySelector("body");
    const header = document.querySelector("header");


    function initTelegramWebApp()
    {
        let telegramTest = document.querySelector("#telegramTest");
        telegramTest.innerText = JSON.stringify(window.Telegram.WebApp.initDataUnsafe, null, 4);

        fetch("http://telegrambot24.tw1.ru/auth/telegram", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(window.Telegram.WebApp.initDataUnsafe),
        })
            .then(response => response.json())
            .then(data => telegramTest.innerText = JSON.stringify(data, null, 4))
            .catch(error => telegramTest.innerText = JSON.stringify(error, null, 4));
    }
    function checkTheme()
    {
        var theme_controllers = document.querySelectorAll(".theme-controller");

        if(window.Telegram.WebApp.colorScheme == "light")
        {
            html.dataset.theme = "light";
            theme_controllers.forEach((controller) => {
                controller.value = "dark";
            })
            return;
        }
        html.dataset.theme = "dark";

        theme_controllers.forEach((controller) => {
            controller.value = "light";
        })
    }
    function focusOut()
    {
        document.addEventListener('click', (event) => {
            const tags = ['INPUT', 'TEXTAREA']
            const focused = document.activeElement
            console.log(focused.tagName)
          
            if (focused && focused !== event.target && tags.includes(focused.tagName)) {
              focused.blur()
            }
          })
    }



    function initMasks()
    {
        var exchangeInput = document.querySelector("#exchangeInput");
        if(exchangeInput)
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
    }
    function initBottomTabs()
    {
        var navLinks = document.querySelectorAll(".nav-link");
        navLinks.forEach((link) => {
            link.addEventListener("click", (event) => {
                navLinks.forEach((subLink) => {
                    subLink.classList.remove("active");
                });
                Telegram.WebApp.HapticFeedback.impactOccurred("medium");
                link.classList.add("active");
            })
        })
    }
    function reInit()
    {
        initMasks();
    }
    function init()
    {
        initTelegramWebApp();
        checkTheme();
        initBottomTabs();
        initMasks();
        focusOut();
        document.addEventListener('htmx:afterRequest', reInit);
        document.addEventListener('htmx:configRequest', function (event){
            if (event.detail && event.detail.elt) {
                const trigger = event.detail.elt; // Элемент, вызвавший запрос
                if (trigger.classList.contains('active')) {
                  // Отменяем HTMX запрос
                  event.preventDefault();
                }
              }
        });
    }

    init();
});
