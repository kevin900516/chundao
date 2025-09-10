document.addEventListener('DOMContentLoaded', function() {
    console.log("春稻藝術坊 script loaded.");

    // --- Loader Logic ---
    const loader = document.getElementById('loader-wrapper');
    window.addEventListener('load', function() {
        setTimeout(function() {
            loader.classList.add('hidden');
        }, 1500); // 延遲1.5秒，確保動畫完整播放
    });

    // --- Flickity Carousel Logic ---
    var mainElem = document.querySelector('.main-carousel');
    if (mainElem) {
        new Flickity( mainElem, {
            // options
            cellAlign: 'left',
            contain: true,
            wrapAround: true,
            autoPlay: 3000
        });
    }

    var newsElem = document.querySelector('.news-carousel');
    if (newsElem) {
        new Flickity( newsElem, {
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
    const searchContainer = document.querySelector('header .search-container');
    const searchBar = document.querySelector('.search-bar');
    const mainContent = document.querySelector('main');
    let originalContent = mainContent.innerHTML;

    if (searchIcon) {
        searchIcon.addEventListener('click', function(e) {
            e.preventDefault();
            searchContainer.classList.toggle('active');
            if (searchContainer.classList.contains('active')) {
                searchBar.focus();
            } else {
                mainContent.innerHTML = originalContent;
            }
        });
    }

    function highlight() {
        const searchTerm = searchBar.value.trim();
        
        // Remove previous highlights
        const highlightedElements = mainContent.querySelectorAll('.highlight');
        highlightedElements.forEach(el => {
            const parent = el.parentNode;
            parent.replaceChild(document.createTextNode(el.textContent), el);
            parent.normalize();
        });

        if (searchTerm === "") {
            return; // Exit if search term is empty
        }

        const regex = new RegExp(searchTerm, 'gi');
        let firstMatch = null;

        function traverseAndHighlight(node) {
            if (node.nodeType === 3) { // Text node
                const match = node.nodeValue.match(regex);
                if (match) {
                    const span = document.createElement('span');
                    span.innerHTML = node.nodeValue.replace(regex, `<span class="highlight">$&</span>`);
                    
                    const fragment = document.createDocumentFragment();
                    while (span.firstChild) {
                        fragment.appendChild(span.firstChild);
                    }
                    
                    node.parentNode.replaceChild(fragment, node);

                    if (!firstMatch) {
                        firstMatch = mainContent.querySelector('.highlight');
                    }
                }
            } else if (node.nodeType === 1 && node.nodeName !== 'SCRIPT' && node.nodeName !== 'STYLE') { // Element node
                Array.from(node.childNodes).forEach(traverseAndHighlight);
            }
        }

        traverseAndHighlight(mainContent);

        if (firstMatch) {
            firstMatch.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
    }

    if (searchBar && mainContent) {
        searchBar.addEventListener('input', highlight);
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

    // --- Mobile Category Dropdown Logic ---
    const categoryDropdownToggle = document.querySelector('.category-dropdown-toggle');
    const categoryDropdownMenu = document.querySelector('.category-dropdown-menu');

    if (categoryDropdownToggle && categoryDropdownMenu) {
        categoryDropdownToggle.addEventListener('click', function() {
            if (categoryDropdownMenu.style.display === 'block') {
                categoryDropdownMenu.style.display = 'none';
            } else {
                categoryDropdownMenu.style.display = 'block';
            }
        });
    }
});
