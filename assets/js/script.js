document.addEventListener('DOMContentLoaded', function() {
    console.log("春稻藝術坊 script loaded.");

    // --- Flickity Carousel Logic ---
    var mainElem = document.querySelector('.main-carousel');
    if (mainElem) {
        var mainFlkty = new Flickity( mainElem, {
            // options
            cellAlign: 'left',
            contain: true,
            wrapAround: true,
            autoPlay: 3000
        });
    }

    var newsElem = document.querySelector('.news-carousel');
    if (newsElem) {
        var newsFlkty = new Flickity( newsElem, {
            // options
            cellAlign: 'left',
            contain: true,
            wrapAround: true,
            autoPlay: 3000
        });
    }

    // --- AOS Initialization ---
    if (typeof AOS !== 'undefined') {
        AOS.init();
    }

    // --- Search Bar Logic ---
    const searchIcon = document.querySelector('.search-icon');
    const searchContainer = document.querySelector('.search-container');

    if (searchIcon) {
        searchIcon.addEventListener('click', function(e) {
            e.preventDefault();
            searchContainer.classList.toggle('active');
        });
    }

    // --- Cart Overlay Logic ---
    const cartIcon = document.querySelector('.cart-icon');
    const cartOverlay = document.querySelector('.cart-overlay');
    const closeCartBtn = document.querySelector('.close-cart-btn');

    if (cartIcon) {
        cartIcon.addEventListener('click', function(e) {
            e.preventDefault();
            cartOverlay.classList.add('active');
        });
    }

    if (closeCartBtn) {
        closeCartBtn.addEventListener('click', function() {
            cartOverlay.classList.remove('active');
        });
    }

    // --- Hamburger Menu Logic ---
    const hamburgerMenu = document.querySelector('.hamburger-menu');
    const mobileNavOverlay = document.querySelector('.mobile-nav-overlay');
    const closeBtn = document.querySelector('.close-btn');

    if (hamburgerMenu) {
        hamburgerMenu.addEventListener('click', function() {
            mobileNavOverlay.style.width = '300px';
        });
    }

    if (closeBtn) {
        closeBtn.addEventListener('click', function() {
            mobileNavOverlay.style.width = '0';
        });
    }

    // --- Accordion Logic ---
    const accordionItems = document.querySelectorAll('.accordion-item');

    accordionItems.forEach(item => {
        const button = item.querySelector('.accordion-button');
        const content = item.querySelector('.accordion-content');
        const icon = button.querySelector('.icon');

        button.addEventListener('click', () => {
            const isExpanded = content.style.maxHeight && content.style.maxHeight !== '0px';

            // Close all other accordions
            accordionItems.forEach(otherItem => {
                if (otherItem !== item) {
                    otherItem.querySelector('.accordion-content').style.maxHeight = '0';
                    otherItem.querySelector('.accordion-button .icon').textContent = '+';
                }
            });

            // Toggle the clicked accordion
            if (isExpanded) {
                content.style.maxHeight = '0';
                icon.textContent = '+';
            } else {
                content.style.maxHeight = content.scrollHeight + 'px';
                icon.textContent = '-';
            }
        });
    });
});
