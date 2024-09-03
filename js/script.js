let back = document.querySelector('.back');
let forward = document.querySelector('.forward');
let box = document.querySelector('.box');
let block = document.querySelector('.block');
let dots = document.querySelector('.dots');
let spans = document.querySelectorAll('.box span');
let degs = 0;
let currentIndex = 0;
let interv = setInterval(AutoScroll, 3000);

for (let i = 0; i < spans.length; i++) {
    let dot = document.createElement('div');
    dot.classList.add('dot');
    dot.setAttribute('data-index', i);
    dots.appendChild(dot);
}
let dotElements = document.querySelectorAll('.dot');
dotElements[currentIndex].classList.add('active');
function AutoScroll() {
    degs -= 45;
    currentIndex = (currentIndex + 1) % spans.length;
    updateCarousel();
}
function updateCarousel() {
    box.style.transform = `perspective(1000px) rotateY(${degs}deg)`;
    dotElements.forEach(dot => dot.classList.remove('active'));
    dotElements[currentIndex].classList.add('active');
}
forward.addEventListener('click', () => {
    degs -= 45;
    currentIndex = (currentIndex + 1) % spans.length;
    updateCarousel();
});
back.addEventListener('click', () => {
    degs += 45;
    currentIndex = (currentIndex - 1 + spans.length) % spans.length;
    updateCarousel();
});
dotElements.forEach(dot => {
    dot.addEventListener('click', (e) => {
        clearInterval(interv); // Stop auto-scrolling when a dot is clicked
        currentIndex = parseInt(e.target.getAttribute('data-index'));
        degs = -45 * currentIndex;
        updateCarousel();
        interv = setInterval(AutoScroll, 3000); // Restart auto-scrolling
    });
});
box.addEventListener('mouseenter', () => {
    clearInterval(interv);
});
block.addEventListener('mouseleave', () => {
    interv = setInterval(AutoScroll, 3000);
});
window.addEventListener('load', () => {
    interv;
});
let startX = 0;
let startY = 0;
let distance = 0;
box.addEventListener('touchstart', handleTouchStart);
box.addEventListener('touchmove', handleTouchMove);
function handleTouchStart(e) {
    startX = e.touches[0].clientX;
    startY = e.touches[0].clientY;
}
function handleTouchMove(e) {
    if (!startX || !startY) return;

    let currentX = e.touches[0].clientX;

    distance = startX - currentX;

    if (Math.abs(distance) > 50) {
        if (distance > 0) {
            // Swiped left
            forward.click();
        } else {
            // Swiped right
            back.click();
        }

        startX = 0;
        startY = 0;
        distance = 0;
    }
}