//===============================
//! dragging and scrolling images
//===============================

const carousel = document.querySelector('.carousel');
firstImage = carousel.querySelectorAll('img')[0];
const arrowIcons = document.querySelectorAll('.wrapper i');
let isDragStart = false,
    isDragging = false,
    prevPageX, prevScrollLeft, positionDiff;



//* showing and hiding prev/next icon according to carousel scroll left value
const showHideIcons = () => {
    let scrollWidth = carousel.scrollWidth - carousel.clientWidth; // getting max scrollable width
    arrowIcons[0].style.display = carousel.scrollLeft == 0 ? "none" : "block";
    arrowIcons[1].style.display = carousel.scrollLeft == scrollWidth ? "none" : "block";
}


//* Adding click event to each icon.
arrowIcons.forEach(icon => {
    icon.addEventListener('click', () => {
        let firstImgWidth = firstImg.clientWidth + 10; // getting first img width & adding 10 margin value
        // if clicked icon is left, reduce width value from the carousel scroll left. Else, add to it.
        carousel.scrollLeft += icon.id == "left" ? -firstImgWidth : firstImgWidth;
    })
})


const autoSlide = () => {
    // if there is no image left to scroll then return from here
    if (carousel.scrollLeft - (carousel.scrollWidth - carousel.clientWidth) > -1 || carousel.scrollLeft <= 0) return;
    positionDiff = Math.abs(positionDiff); // making positionDiff value to positive
    let firstImgWidth = firstImg.clientWidth + 10;
    // getting difference value that needs to add or reduce from carousel left to take middle img center
    let valDifference = firstImgWidth - positionDiff;
    if (carousel.scrollLeft > prevScrollLeft) { // if user is scrolling to the right
        return carousel.scrollLeft += positionDiff > firstImgWidth / 3 ? valDifference : -positionDiff;
    }
    // if user is scrolling to the left
    carousel.scrollLeft -= positionDiff > firstImgWidth / 3 ? valDifference : -positionDiff;
}


//* Updating global variable values on mouse down event.
const dragStart = (e) => {
    isDragStart = true;
    prevPageX = e.pageX;
    prevScrollLeft = carousel.scrollLeft;
    // scrollLeft gives the number of pixel an element's content is scrolled horizontally.
}


//* Scrolling images/carousel to left according to mouse pointer.
const dragging = (e) => {
    if (!isDragStart) return;
    e.preventDefault();
    // Preventing it's default behavier. Now, img wont be dragged.
    isDragging = true;
    carousel.classList.add("dragging");
    positionDiff = (e.pageX || e.touches[0].pageX) - prevPageX;
    carousel.scrollLeft = prevScrollLeft - positionDiff;
    // pageX returns the horizontal coordinate of mouse pointer.
    // scrollLeft sets or returns the number of pixel an element's content is scrolled horizontally.
    showHideIcons();
}


const dragStop = () => {
    isDragStart = false;
    carousel.classList.remove("dragging");
    if(!isDragging) return;
    isDragging = false;
    autoSlide();
}


carousel.addEventListener('mousedown', dragStart);
carousel.addEventListener("touchstart", dragStart);

carousel.addEventListener('mousemove', dragging);
carousel.addEventListener("touchmove", dragging);

carousel.addEventListener('mouseup', dragStop);
carousel.addEventListener("touchend", dragStop);