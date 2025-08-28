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
    const searchBar = document.querySelector('.search-bar');
    let originalContent = {};

    if (searchIcon) {
        searchIcon.addEventListener('click', function(e) {
            e.preventDefault();
            searchContainer.classList.toggle('active');
            if (searchContainer.classList.contains('active')) {
                searchBar.focus();
            } else {
                // Restore original content when search is closed
                for (const key in originalContent) {
                    const element = document.querySelector(`[data-search-id='${key}']`);
                    if (element) {
                        element.innerHTML = originalContent[key];
                    }
                }
                originalContent = {};
            }
        });
    }

    if (searchBar) {
        searchBar.addEventListener('keyup', function(e) {
            if (e.key === 'Enter') {
                // Restore original content before new search
                for (const key in originalContent) {
                    const element = document.querySelector(`[data-search-id='${key}']`);
                    if (element) {
                        element.innerHTML = originalContent[key];
                    }
                }
                originalContent = {};

                const searchTerm = searchBar.value.trim();
                if (searchTerm) {
                    const textElements = document.querySelectorAll('body *:not(script):not(style)');
                    let found = false;
                    let searchId = 0;
                    for (const element of textElements) {
                        const regex = new RegExp(searchTerm, 'gi');
                        if (element.children.length === 0 && element.textContent.match(regex)) {
                            if (!element.hasAttribute('data-search-id')) {
                                element.setAttribute('data-search-id', searchId);
                                originalContent[searchId] = element.innerHTML;
                                searchId++;
                            }
                            element.innerHTML = element.innerHTML.replace(regex, `<span class="highlight">document.addEventListener('DOMContentLoaded', function() {
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
    const searchBar = document.querySelector('.search-bar');

    if (searchIcon) {
        searchIcon.addEventListener('click', function(e) {
            e.preventDefault();
            searchContainer.classList.toggle('active');
            if (searchContainer.classList.contains('active')) {
                searchBar.focus();
            }
        });
    }

    if (searchBar) {
        searchBar.addEventListener('keyup', function(e) {
            if (e.key === 'Enter') {
                const searchTerm = searchBar.value.trim().toLowerCase();
                if (searchTerm) {
                    const textElements = document.querySelectorAll('body *:not(script):not(style)');
                    let found = false;
                    for (const element of textElements) {
                        if (element.textContent.toLowerCase().includes(searchTerm)) {
                            element.scrollIntoView({ behavior: 'smooth', block: 'center' });
                            found = true;
                            break;
                        }
                    }
                    if (!found) {
                        alert('找不到符合的文字');
                    }
                }
            }
        });
    }

    // --- Cart Icon Logic ---
    const cartIcon = document.querySelector('.cart-icon');
    if (cartIcon) {
        cartIcon.addEventListener('click', function(e) {
            e.preventDefault();
            window.open('https://app.huaxidigit.com/AppWf/OrderApp?Shop=D5FF2B8139714AF1', '_blank');
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

    // --- Back to Top Button --- //
    const backToTopButton = document.getElementById("backToTopBtn");

    if (backToTopButton) {
        window.onscroll = function() {
            scrollFunction();
        };

        function scrollFunction() {
            if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
                backToTopButton.style.display = "block";
            } else {
                backToTopButton.style.display = "none";
            }
        }

        backToTopButton.addEventListener('click', function() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // --- Set background images for carousel cells ---
    const carouselCells = document.querySelectorAll('.carousel-cell');
    carouselCells.forEach(cell => {
        const backgroundUrl = cell.getAttribute('data-background');
        if (backgroundUrl) {
            cell.style.backgroundImage = `url(${backgroundUrl})`;
        }
    });
});</span>`);
                            if (!found) {
                                element.scrollIntoView({ behavior: 'smooth', block: 'center' });
                                found = true;
                            }
                        }
                    }
                    if (!found) {
                        alert('找不到符合的文字');
                    }
                }
            }
        });
    }

    // --- Cart Icon Logic ---
    const cartIcon = document.querySelector('.cart-icon');
    if (cartIcon) {
        cartIcon.addEventListener('click', function(e) {
            e.preventDefault();
            window.open('https://app.huaxidigit.com/AppWf/OrderApp?Shop=D5FF2B8139714AF1', '_blank');
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

    // --- Back to Top Button --- //
    const backToTopButton = document.getElementById("backToTopBtn");

    if (backToTopButton) {
        window.onscroll = function() {
            scrollFunction();
        };

        function scrollFunction() {
            if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
                backToTopButton.style.display = "block";
            } else {
                backToTopButton.style.display = "none";
            }
        }

        backToTopButton.addEventListener('click', function() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // --- Set background images for carousel cells ---
    const carouselCells = document.querySelectorAll('.carousel-cell');
    carouselCells.forEach(cell => {
        const backgroundUrl = cell.getAttribute('data-background');
        if (backgroundUrl) {
            cell.style.backgroundImage = `url(${backgroundUrl})`;
        }
    });
});