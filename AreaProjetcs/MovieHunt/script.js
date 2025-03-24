
    const carousel = document.querySelector(".carousel");
    const prevBtn = document.getElementById("prevBtn");
    const nextBtn = document.getElementById("nextBtn");
    let scrollPosition = 0;
    const cardWidth = 210; // Largura do card + margem
    const visibleCards = 4;

    nextBtn.addEventListener("click", () => {
        if (scrollPosition < carousel.scrollWidth - (cardWidth * visibleCards)) {
            scrollPosition += cardWidth * visibleCards;
            carousel.scrollTo({ left: scrollPosition, behavior: "smooth" });
        }
    });

    prevBtn.addEventListener("click", () => {
        if (scrollPosition > 0) {
            scrollPosition -= cardWidth * visibleCards;
            carousel.scrollTo({ left: scrollPosition, behavior: "smooth" });
        }
    });

    const carousel1 = document.querySelector(".carousel1");
    const prevBtn1 = document.getElementById("prevBtn1");
    const nextBtn1 = document.getElementById("nextBtn1");
    
    if (carousel1 && prevBtn1 && nextBtn1) { // Verifica se os elementos existem
        const cardWidth1 = 210; // Largura do card + margem
        const visibleCards1 = 4;
    
        nextBtn1.addEventListener("click", () => {
            const maxScroll = carousel1.scrollWidth - carousel1.clientWidth;
            let newScrollPosition = carousel1.scrollLeft + (cardWidth1 * visibleCards1);
            
            if (newScrollPosition > maxScroll) newScrollPosition = maxScroll; // Evita ultrapassar o limite
            carousel1.scrollTo({ left: newScrollPosition, behavior: "smooth" });
        });
    
        prevBtn1.addEventListener("click", () => {
            let newScrollPosition = carousel1.scrollLeft - (cardWidth1 * visibleCards1);
            
            if (newScrollPosition < 0) newScrollPosition = 0; // Evita valores negativos
            carousel1.scrollTo({ left: newScrollPosition, behavior: "smooth" });
        });
    }    

