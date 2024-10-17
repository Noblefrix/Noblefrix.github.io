const scrollContainer = document.querySelector('.scrollcontent');
const items = document.querySelectorAll('.content');
const itemWidth = 400; // Width of one item
const gap = 30; // Margin-right between items
const scrollAmount = itemWidth + gap; // Total scroll amount per click

function scrollLeftCustom() {
    scrollContainer.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
    updateBlurredItems();
}

function scrollRightCustom() {
    scrollContainer.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    updateBlurredItems();
}

scrollContainer.addEventListener('scroll', updateBlurredItems);

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

// Initialize the blurred state
updateBlurredItems();
