document.addEventListener("DOMContentLoaded",(event) => {
    const body = document.querySelector("body");
    const header = document.querySelector("header");


    function focusOut()
    {
        document.addEventListener('click', function (e) {
            const input = document.querySelector('input'); // Убедитесь, что ваш инпут правильно выбран
            if (input && !input.contains(e.target)) {
                input.blur(); // Снимает фокус с инпута
                console.log("focusOut");
            }
        });
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
    function initBottomTabs()
    {
        var navLinks = document.querySelectorAll(".nav-link");
        navLinks.forEach((link) => {
            link.addEventListener("click", (event) => {
                navLinks.forEach((subLink) => {
                    subLink.classList.remove("active");
                });
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
    }

    init();
});
