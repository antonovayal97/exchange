document.addEventListener("DOMContentLoaded",(event) => {
    const body = document.querySelector("body");
    const header = document.querySelector("header");


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
