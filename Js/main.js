/** Start Shopping Bag **/

document.addEventListener('DOMContentLoaded', function() {
    let packets = document.querySelectorAll('.our-products .packet');
    let bag = document.querySelector('.bag');
    let numberOrder = document.querySelector('.bag .number-Order');
    let sendButton;

    let storedNumber = localStorage.getItem('orderNumber');

    if (storedNumber) {
        numberOrder.textContent = storedNumber;
    }

    function updateCartCount() {
        let totalCount = 0;

        packets.forEach(packet => {
            const dataDescription = packet.dataset.description;
            const storedDescription = localStorage.getItem(`packet_${dataDescription}`);
            if (storedDescription) {
                totalCount++;
            }
        });

        numberOrder.textContent = totalCount;
        localStorage.setItem('orderNumber', totalCount);

        if (sendButton) {
            if (totalCount > 0) {
                sendButton.style.display = 'inline-block';
            } else {
                sendButton.style.display = 'none';
            }
        }
    }

    function addToCart(dataDescription, dataPrice) {
        const storedDescription = localStorage.getItem(`packet_${dataDescription}`);
        if (!storedDescription) {
            localStorage.setItem(`packet_${dataDescription}`, JSON.stringify({ description: dataDescription, price: dataPrice }));
            updateCartCount();
        }
    }

    function deleteFromCart(dataDescription) {
        const storedDescription = localStorage.getItem(`packet_${dataDescription}`);
        if (storedDescription) {
            localStorage.removeItem(`packet_${dataDescription}`);
            updateCartCount();
        }
    }

    bag.addEventListener('click', () => {
        if (sendButton) {
            sendButton.remove();
        }

        let overlay = document.createElement('div');
        overlay.classList = 'overlay';
        document.body.appendChild(overlay);

        let popupBox = document.createElement('div');
        popupBox.classList = 'popupBox';

        let imgHeading = document.createElement('h3');
        imgHeading.classList = 'header-img';
        imgHeading.appendChild(document.createTextNode('سلة التسوق'));
        popupBox.appendChild(imgHeading);

        let containerBag = document.createElement('div');
        containerBag.classList = 'container-bag';

        let hasDescriptions = false;

        packets.forEach(packet => {
            const dataDescription = packet.dataset.description;
            const storedDescription = localStorage.getItem(`packet_${dataDescription}`);

            if (storedDescription) {
                const parsedDescription = JSON.parse(storedDescription);
                let descriptionElement = document.createElement('p');
                descriptionElement.textContent = parsedDescription.description;

                let deleteIcon = document.createElement('span');
                deleteIcon.classList = 'delete-icon';
                deleteIcon.innerHTML = '-';
                deleteIcon.addEventListener('click', () => {
                    deleteFromCart(dataDescription);
                    containerBag.removeChild(descriptionElement);
                    containerBag.removeChild(deleteIcon);
                    updateCartCount();
                });

                containerBag.appendChild(descriptionElement);
                containerBag.appendChild(deleteIcon);

                hasDescriptions = true;
            }
        });

        if (!hasDescriptions) {
            let noItemsMessage = document.createElement('p');
            noItemsMessage.textContent = 'لا يوجد شيء في السلة';
            containerBag.appendChild(noItemsMessage);
        }

        popupBox.appendChild(containerBag);

        let closeButton = document.createElement('span');
        closeButton.appendChild(document.createTextNode('X'));
        closeButton.classList = 'close-button';
        popupBox.appendChild(closeButton);

        sendButton = document.createElement('span');
        sendButton.classList = 'sendButton';
        sendButton.appendChild(document.createTextNode('ارسل الطلب'));
        popupBox.appendChild(sendButton);

        if (!hasDescriptions || sendButton.style.display === 'none') {
            sendButton.style.display = 'none';
        }

        sendButton.addEventListener('click', () => {
            let orderMessage = 'أريد طلب الأصناف التالية:\n\n';

            packets.forEach(packet => {
                const dataDescription = packet.dataset.description;
                const storedDescription = localStorage.getItem(`packet_${dataDescription}`);

                if (storedDescription) {
                    const parsedDescription = JSON.parse(storedDescription);
                    orderMessage += `${parsedDescription.description}\n`;
                }
            });

            const phoneNumber = '905510987184';
            const whatsappLink = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(orderMessage)}`;

            window.open(whatsappLink, '_blank');

            localStorage.clear();
            updateCartCount();
            sendButton.style.display = 'none';
        });

        overlay.appendChild(popupBox);
    });

    packets.forEach(packet => {
        const dataDescription = packet.dataset.description;
        const dataPrice = packet.dataset.price;
        packet.addEventListener('click', () => {
            addToCart(dataDescription, dataPrice);
        });
    });
});


/** End Shopping Bag **/

/** Start Over Top **/

let overTop = document.querySelector('.overTop');

overTop.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

window.addEventListener('scroll', () => {
    if(window.scrollY > 200) {
        overTop.style.opacity = '1';
    } else {
        overTop.style.opacity = '0';
    }
});

/** End Over Top **/

/** Start Loading Page **/

setTimeout(function () {

    let loadingPage = document.querySelector('.loading-page');

    if(loadingPage) {
        loadingPage.classList.add('hidden')
    }
    loadingPage.classList.add('z-index');
    document.querySelector('.line-linkes').classList.add('go-to-right');
    
    document.querySelector('.box-title').classList.add('opacity');

    document.querySelector('header .container').classList.add('go-to-button');
}, 1500);

/** End Loading Page **/

/** Start Moving To Section For Linkes **/

const allLinks = document.querySelectorAll('.linkes a');
const allBullets = document.querySelectorAll('.nav-bullets .bullet');

function scrollToSomeWhere(elements) {
    elements.forEach(el => {
        el.addEventListener('click', (e) => {
            e.preventDefault();
            const section = e.target.dataset.section;
            document.querySelector(e.target.dataset.section).scrollIntoView({
                behavior: 'smooth',
            });
        });
    });
};

scrollToSomeWhere(allLinks);
scrollToSomeWhere(allBullets);

/** End Moving To Section For Linkes **/

/** Start Search Input **/

let inputSearch = document.querySelector('.search input');

function hidePlaceholder() {

    inputSearch.onfocus = function () {
        this.setAttribute('data-place', this.getAttribute('placeholder'));

        this.setAttribute('placeholder', ' ');
    }

    inputSearch.onblur = function () {
        this.setAttribute('placeholder', this.getAttribute("data-place"));

        this.setAttribute('data-place', ' ');
    }

}

hidePlaceholder();

/** End Search Input **/

/** Start Go To Top (Images About Us) **/

let imagesAbout = document.querySelector('.images-about');
let Products = document.querySelector('.our-products .container');

window.onscroll = function () {
    // Images OffsetTop
    let offsetTop = imagesAbout.offsetTop;

    // Images Outer Height
    let imagesAboutOuterHeight = imagesAbout.offsetHeight;

    // Window Height
    let windowHeight = this.innerHeight;

    // Window ScrollTop
    let windowScrolTop = this.pageYOffset;

    if (windowScrolTop > (offsetTop + imagesAboutOuterHeight - windowHeight - 100)) {
        imagesAbout.classList.add('go-to-top');
    }

    if (windowScrolTop > (offsetTop + imagesAboutOuterHeight - windowHeight + 500)) {
        Products.classList.add('show');
    }
}


/** End Go To Top (Images About Us) **/

/** Start Product Images **/

let productsImages = document.querySelectorAll('.product-box img');

productsImages.forEach(img => {
    img.addEventListener('click', function () {
        
        // Create Popup Overlay
        let overlay = document.createElement('div');
        overlay.classList = 'overlay';
        document.body.appendChild(overlay);

        // Create Popup Box
        let popupBox = document.createElement('div');
        popupBox.classList = 'popupBoX';

        if(img.alt !== ' ') {
            let imgHeading = document.createElement('h3');
            imgHeading.classList = 'header-img'
            imgHeading.appendChild(document.createTextNode(img.alt));
            popupBox.appendChild(imgHeading);
        }

        // Images Div Section
        let popupImage = document.createElement('img');
        popupImage.src = img.src;
        popupImage.style.width = '300px';
        popupImage.style.height = '200px';
        popupBox.appendChild(popupImage);

        // Close Button Section
        let closeButton = document.createElement('span');
        closeButton.appendChild(document.createTextNode('X'));
        closeButton.classList = 'close-button';
        popupBox.appendChild(closeButton);

        overlay.appendChild(popupBox);

    });
});

// Close Popup
document.addEventListener('click', e => {
    if(e.target.className == 'close-button') {
        e.target.parentElement.remove();

        document.querySelector('.overlay').remove();
    }
});

/** End Product Images **/