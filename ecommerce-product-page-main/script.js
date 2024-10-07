const shoeDetails = {
    brand: 'Sneaker Company',
    title: 'Fall Limited Edition Sneakers',
    desc: 'These low-profile sneakers are your perfect casual wear companion. Featuring a durable rubber outer sole, they\'ll withstand everything the weather can offer.',
    discountPrice: '$125.00',
    discountPercent: '50%',
    price: '$250.00',
    images: [
        'images/image-product-1.jpg',
        'images/image-product-2.jpg',
        'images/image-product-3.jpg',
        'images/image-product-4.jpg'
    ],
    imagesThumbnail: [
        'images/image-product-1-thumbnail.jpg',
        'images/image-product-2-thumbnail.jpg',
        'images/image-product-3-thumbnail.jpg',
        'images/image-product-4-thumbnail.jpg'
    ]

}

const menu = document.querySelector('.navigation__menu');
const menuIcon = document.querySelector('.navigation__menu-icon');
const nav = document.querySelector('.navigation');
const navList = document.querySelector('.navigation__list');

const imgList = document.querySelectorAll('.images__img');
const mainImage = document.querySelector('.slider__image');
const overlayImg = document.querySelectorAll('.overlay-img');
const prevBtn = document.querySelector('.arrow-left');
const nextBtn = document.querySelector('.arrow-right');

const popup = document.querySelector('#popup');
const popupImgList = document.querySelectorAll('.popup-images__img');
const popupMainImage = document.querySelector('.popup-slider__image');
const popupPrev = document.querySelector('#popup-prev');
const popupNext = document.querySelector('#popup-next');

const productBrand = document.querySelector('.product__brand');
const productTitle = document.querySelector('.product__title');
const productDesc = document.querySelector('.product__desc');
const productDiscountPrice = document.querySelector('.product__price-new'); 
const productPrice = document.querySelector('.product__price-old');
const productDiscountPercent = document.querySelector('.product__discount');

const cart = document.querySelector('.header__cart');

const increaseCount = document.querySelector('#increase-count');
const decreaseCount = document.querySelector('#decrease-count');
const counterNumber = document.querySelector('.counter__number');

const addToCartBtn = document.querySelector('#add-to-cart-id');
const bubble = document.querySelector('.header__cart-bubble');

const init = function() {
    mainImage.src = shoeDetails.images[0];
    productBrand.textContent = shoeDetails.brand;
    productTitle.textContent = shoeDetails.title;
    productDesc.textContent = shoeDetails.desc;
    productDiscountPrice.textContent = shoeDetails.discountPrice;
    productDiscountPercent.textContent = shoeDetails.discountPercent;
    productPrice.textContent = shoeDetails.price;
    for (let i = 0; i < imgList.length; i++) {
        imgList[i].src = shoeDetails.imagesThumbnail[i];
        overlayImg[i].classList.remove('active');
    }
}



init();

menu.addEventListener('click', () => {
    nav.classList.toggle('open')
    menuIcon.src = nav.classList.contains('open') ? 'images/icon-close.svg' : 'images/icon-menu.svg'
})

mainImage.addEventListener('click', function() {
    popupMainImage.src = mainImage.src;

    for(let i = 0; i < popupImgList.length; i++) {
        popupImgList[i].src = shoeDetails.imagesThumbnail[i];
    }
})

overlayImg.forEach(img => {
    img.addEventListener('click', (e) => {
        overlayImg.forEach(img => img.classList.remove('active'));
        e.target.classList.add('active');
    })
})



for (let i = 0; i < imgList.length; i++) {
    imgList[i].src = shoeDetails.imagesThumbnail[i]
    popupImgList[i].src = shoeDetails.imagesThumbnail[i]

    mainImage.addEventListener('click', () => {
        popupMainImage.src = mainImage.src
    })

    overlayImg.forEach(overlay => overlay.classList.remove('active'));

    overlayImg[i].addEventListener('click', () => {
        mainImage.src = shoeDetails.images[i]
        popupMainImage.src = shoeDetails.images[i]
        overlayImg[i].classList.add('active');
    })


    prevBtn.addEventListener('click', () => {
        i -= 1;
        if (i < 0) i = shoeDetails.images.length - 1;
        mainImage.src = shoeDetails.images[i];
        popupMainImage.src = shoeDetails.images[i];
    })

    nextBtn.addEventListener('click', () => {
        i += 1;
        if (i > shoeDetails.images.length - 1) i = 0;
        mainImage.src = shoeDetails.images[i];
        popupMainImage.src = shoeDetails.images[i];
    })

    popupPrev.addEventListener('click', () => {
        i -= 1;
        if (i < 0) i = shoeDetails.images.length - 1;
        mainImage.src = shoeDetails.images[i];
        popupMainImage.src = shoeDetails.images[i];
    })

    popupNext.addEventListener('click', () => {
        i += 1;
        if (i > shoeDetails.images.length - 1) i = 0;
        mainImage.src = shoeDetails.images[i];
        popupMainImage.src = shoeDetails.images[i];
    })
}

let count = 0;
decreaseCount.addEventListener('click', () => {
    if(count <= 0) return;
    count -= 1;
    counterNumber.innerHTML = count;
})

increaseCount.addEventListener('click', () => {
    count += 1;
    counterNumber.innerHTML = count;
})

cart.addEventListener('click', () => {
    const cartCont = document.querySelector('.header__cart-container');
    cartCont.classList.toggle('open');
})

addToCartBtn.addEventListener('click', () => {
    if(count === 0) count = 1;
    const html = `
    <div class="header__cart-prod">
        <div class="header__cart-img-box">
            <img src="${shoeDetails.imagesThumbnail[0]}" alt="" class="header__cart-img">
        </div>
        <p class="header__cart-text">
            ${shoeDetails.title}
            ${shoeDetails.discountPrice} x ${count} <strong>$${((shoeDetails.discountPrice.slice(1))*count)}.00</strong>
        </p>
    </div>

    <button class="cart-btn">Checkout</button>
    `;
    document.querySelector('.header__cart-content').innerHTML = html;
    
    bubble.style.opacity = 1;
    bubble.innerHTML = count;
})


