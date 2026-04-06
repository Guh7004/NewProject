document.addEventListener('DOMContentLoaded', () => {
    const loadingScreen = document.getElementById('loading-screen');

    setTimeout(() => {
        loadingScreen.classList.add('hidden');
    }, 3000);
});





    // Carousel Auto-rotation (6 seconds)
    const productCarousel = document.getElementById('productCarousel');
    const carousel = new bootstrap.Carousel(productCarousel, {
        interval: 6000,
        pause: 'hover'
    });

    // Keyboard Navigation (Arrow keys)
    document.addEventListener('keydown', (event) => {
        if (event.key === 'ArrowLeft') {
            carousel.prev();
        } else if (event.key === 'ArrowRight') {
            carousel.next();
        }
    });

    // Smooth entry animations (fade-in, slide-up) - using Bootstrap's utilities and custom CSS
    // This is largely handled by CSS classes and Bootstrap's built-in transitions.
    // For more complex animations, a dedicated animation library or more intricate JS would be needed.
    // For now, we'll ensure elements have initial hidden states and then reveal them.

    // Example: Fade-in for hero title
    const heroTitle = document.querySelector('#hero h2');
    heroTitle.style.opacity = 0;
    heroTitle.style.transform = 'translateY(20px)';

    setTimeout(() => {
        heroTitle.style.transition = 'opacity 1s ease-out, transform 1s ease-out';
        heroTitle.style.opacity = 1;
        heroTitle.style.transform = 'translateY(0)';
    }, 500);

    // Example: Slide-up for product cards (can be applied to carousel items)
    const carouselItems = document.querySelectorAll('#productCarousel .carousel-item');
    carouselItems.forEach((item, index) => {
        item.style.opacity = 0;
        item.style.transform = 'translateY(50px)';
        setTimeout(() => {
            item.style.transition = 'opacity 0.8s ease-out, transform 0.8s ease-out';
            item.style.opacity = 1;
            item.style.transform = 'translateY(0)';
        }, 800 + (index * 200)); // Staggered animation
    });

    // Ripple effect for buttons (requires a small CSS addition and potentially a JS library for full effect)
    // For simplicity, we'll add a basic visual feedback on click via CSS for now.
    // A full ripple effect would involve creating dynamic elements on click.

    // Hover effects on product cards (already handled in CSS)

    // Accessibility (alt texts, ARIA labels) - largely handled in HTML structure.
    // Ensure all images have alt text and interactive elements have appropriate ARIA labels.




