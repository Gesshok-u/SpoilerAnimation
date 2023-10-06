// Отримуємо масив елементів 
const menuLinksWrappers = document.querySelectorAll('[data-line-effect]');
// Якщо є елементи, запускаємо функцію
menuLinksWrappers.length ? menuEffect() : null;

// Основна функція
function menuEffect () {
    // Перебір елементів та пошук пунктів меню
    menuLinksWrappers.forEach(menuLinksWrapper => {
        const menuLinks = menuLinksWrapper.querySelectorAll('a');
        // Отримуємо швидкість ефекту (ms)
        const effectSpeed = menuLinksWrapper.dataset.lineEffect ? menuLinksWrapper.dataset.lineEffect : 200;
        // Якщо є пункти меню, запускаємо функцію
        menuLinks.length ? menuEffectItem (menuLinks, effectSpeed) : null;
    });

    function menuEffectItem(menuLinks, effectSpeed) {
        // Перелік констант зі стилями різних станів
        const effectTransition = `transition: transform ${effectSpeed}ms ease;`;
        const effectHover = `transform: translate3d(0px, 0%, 0px);`;
        const effectTop = `transform: translate3d(0px, -100%, 0px);`;
        const effectBottom = `transform: translate3d(0px, 100%, 0px);`;

        // Перебір улументів та додавання HTML-коду для роботи ефекту
        menuLinks.forEach(menuLink => {
            menuLink.insertAdjacentHTML('beforeend', `
            <span style="transform: translate3d(0px, 100%, 0px);" class="hover">
                <span style="transform: translate3d(0px, -100%, 0px);" class="hover_text">
                    ${menuLink.textContent}
                </span>
            </span>
            `);
            // При виникненні подій наведення та переведення курсору викликаємо функцію menuLinkActions
            menuLink.onmouseenter = menuLink.onmouseleave = menuLinkActions;
        });

        // Функія подій курсору
        function menuLinkActions(e) {
            // Константи елементів
            const menuLink = e.target;
            const menuLinkItem = menuLink.querySelector('.hover');
            const menuLinkText = menuLink.querySelector('.hover_text');

            // Отримання половини висоти елементу 
            const menuLinkHeight = menuLink.offsetHeight / 2;
            // Отримання позиції курсору при взаємодії з елементом
            const menuLinkPos = e.pageY -(menuLink.getBoundingClientRect().top + scrollY);

            // При наведенні курсору
            if (e.type === 'mouseenter') {
                // В залежності від позиції курсору додаємо певні стилі
                menuLinkItem.style.cssText = menuLinkPos > menuLinkHeight ? effectBottom : effectTop;
                menuLinkText.style.cssText = menuLinkPos > menuLinkHeight ? effectTop : effectBottom;
                // З певною затримкою змінюємо стилі та відображаємо ефект
                setTimeout(() => {
                    menuLinkItem.style.cssText = effectHover + effectTransition;
                    menuLinkText.style.cssText = effectHover + effectTransition;
                }, 5);
            }

            // При наведенні курсору
            if (e.type === 'mouseleave') {
                // В залежності від позиції курсору додаємо певні стилі
                menuLinkItem.style.cssText = menuLinkPos > menuLinkHeight ? effectBottom + effectTransition : effectTop + effectTransition;
                menuLinkText.style.cssText = menuLinkPos > menuLinkHeight ? effectTop + effectTransition : effectBottom + effectTransition;
            }
        }
    }
}