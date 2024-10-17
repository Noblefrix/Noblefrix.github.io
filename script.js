const scrollContainer = document.querySelector('.scrollcontent');
const items = document.querySelectorAll('.content');
const itemWidth = 400; // Width of one item
const gap = 30; // Margin-right between items
const scrollAmount = itemWidth + gap; // Total scroll amount per click

// Debounce function
const debounce = (mainFunction, delay) => {
    let timer;
    return function (...args) {
        clearTimeout(timer);
        timer = setTimeout(() => {
            mainFunction(...args);
        }, delay);
    };
};

// Scroll functions
function scrollLeft() {
    scrollContainer.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
    updateBlurredItems();
}

function scrollRight() {
    scrollContainer.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    updateBlurredItems();
}

// Debounced versions of the scroll functions
const scrollLeftCustom = debounce(scrollLeft, 100);
const scrollRightCustom = debounce(scrollRight, 100);

// Event listeners for buttons (replace with your button selectors)
document.querySelector('.scroll-left-button').addEventListener('click', scrollLeftCustom);
document.querySelector('.scroll-right-button').addEventListener('click', scrollRightCustom);

// Update blurred state on scroll
scrollContainer.addEventListener('scroll', updateBlurredItems);

// Update blurred items based on scroll position
function updateBlurredItems() {
    const scrollPosition = scrollContainer.scrollLeft;
    const scrollContainerWidth = scrollContainer.clientWidth;
    const centerPosition = scrollPosition + (scrollContainerWidth / 2);

    items.forEach((item, index) => {
        const itemStart = index * (itemWidth + gap);
        const itemEnd = itemStart + itemWidth;

        if (centerPosition >= itemStart && centerPosition < itemEnd) {
            item.classList.add('centered');
            item.classList.remove('blurred');
        } else {
            item.classList.add('blurred');
            item.classList.remove('centered');
        }
    });
}

// Initialize the blurred state
updateBlurredItems();
