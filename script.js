const scrollContainer = document.querySelector('.scrollcontent');
const items = document.querySelectorAll('.content');
const gap = 30; // Margin-right between items
let itemWidth; // Width of one item
const totalItems = items.length;
let isScrolling = false; // Track scrolling state

// Function to calculate itemWidth based on screen size
function calculateItemWidth() {
    const containerWidth = scrollContainer.clientWidth; // Get the current width of the scroll container
    itemWidth = (containerWidth / 3) - gap; // Assuming you want 3 items visible; adjust this as necessary
}

// Call the function initially to set itemWidth
calculateItemWidth();

// Scroll left function
function scrollLeftCustom() {
    if (isScrolling) return; // Prevent additional scrolls while scrolling
    isScrolling = true; // Set scrolling state

    const scrollPosition = scrollContainer.scrollLeft;
    const scrollAmount = itemWidth + gap; // Total scroll amount per click

    // Prevent scrolling beyond the left edge
    if (scrollPosition > 0) {
        scrollContainer.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
    }

    updateBlurredItems();
    setTimeout(() => {
        isScrolling = false; // Reset scrolling state after scrolling duration
    }, 300); // Adjust this timeout based on your scrolling duration
}

// Scroll right function
function scrollRightCustom() {
    if (isScrolling) return; // Prevent additional scrolls while scrolling
    isScrolling = true; // Set scrolling state

    const scrollPosition = scrollContainer.scrollLeft;
    const scrollAmount = itemWidth + gap; // Total scroll amount per click
    const maxScrollLeft = (totalItems * itemWidth) + (totalItems - 1) * gap - scrollContainer.clientWidth;

    // Prevent scrolling beyond the right edge
    if (scrollPosition < maxScrollLeft) {
        scrollContainer.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }

    updateBlurredItems();
    setTimeout(() => {
        isScrolling = false; // Reset scrolling state after scrolling duration
    }, 300); // Adjust this timeout based on your scrolling duration
}

// Update blurred items based on scroll position
function updateBlurredItems() {
    const scrollPosition = scrollContainer.scrollLeft; // Current scroll position
    const scrollContainerWidth = scrollContainer.clientWidth; // Width of the scroll container
    const centerPosition = scrollPosition + (scrollContainerWidth / 2); // Center of the scroll container

    items.forEach((item, index) => {
        const itemStart = index * (itemWidth + gap);
        const itemEnd = itemStart + itemWidth;

        // Check if the center of the scroll container overlaps with the item
        if (centerPosition >= itemStart && centerPosition < itemEnd) {
            item.classList.add('centered'); // Center the currently centered item
            item.classList.remove('blurred'); // Remove blur from the centered item
        } else {
            item.classList.add('blurred'); // Blur all other items
            item.classList.remove('centered'); // Remove centered class from non-centered items
        }
    });
}

// Event listener for scroll
scrollContainer.addEventListener('scroll', updateBlurredItems);

// Initialize the blurred state
updateBlurredItems();

// Add event listener for window resize to recalculate itemWidth
window.addEventListener('resize', () => {
    calculateItemWidth(); // Recalculate item width on resize
    updateBlurredItems(); // Update blurred items based on new width
});
