// Rating System
document.addEventListener('DOMContentLoaded', function() {
    const ratingContainers = document.querySelectorAll('.rating-container');
    
    ratingContainers.forEach(container => {
        const stars = container.querySelectorAll('.fa-star');
        const ratingText = container.querySelector('.rating-text');
        const restaurant = container.getAttribute('data-restaurant');
        
        // Load saved rating from localStorage
        const savedRating = localStorage.getItem(`rating-${restaurant}`);
        if (savedRating) {
            highlightStars(stars, savedRating);
            ratingText.textContent = `Rating Anda: ${savedRating}/5`;
        }
        
        stars.forEach(star => {
            star.addEventListener('click', function() {
                const value = this.getAttribute('data-value');
                highlightStars(stars, value);
                
                // Save rating to localStorage
                localStorage.setItem(`rating-${restaurant}`, value);
                ratingText.textContent = `Rating Anda: ${value}/5`;
                
                // Show thank you message
                showThankYouMessage(container, restaurant);
            });
            
            star.addEventListener('mouseover', function() {
                const value = this.getAttribute('data-value');
                highlightStars(stars, value, false);
            });
            
            star.addEventListener('mouseout', function() {
                const savedRating = localStorage.getItem(`rating-${restaurant}`);
                if (savedRating) {
                    highlightStars(stars, savedRating);
                } else {
                    stars.forEach(s => s.classList.remove('active'));
                }
            });
        });
    });
    
    function highlightStars(stars, upToValue, permanent = true) {
        stars.forEach(star => {
            const value = star.getAttribute('data-value');
            if (value <= upToValue) {
                star.classList.add('active');
                if (permanent) {
                    star.style.color = '#ffc107';
                } else {
                    star.style.color = '#ffc107';
                    star.style.opacity = '0.7';
                }
            } else {
                star.classList.remove('active');
                star.style.color = '#ccc';
                star.style.opacity = '1';
            }
        });
    }
    
    function showThankYouMessage(container, restaurant) {
        const existingMessage = container.querySelector('.thank-you-message');
        if (existingMessage) {
            existingMessage.remove();
        }
        
        const message = document.createElement('div');
        message.className = 'thank-you-message';
        message.style.color = '#4CAF50';
        message.style.marginTop = '10px';
        message.style.fontWeight = 'bold';
        message.textContent = `Terima kasih telah memberi rating untuk ${restaurant}!`;
        
        container.appendChild(message);
        
        setTimeout(() => {
            message.style.opacity = '0';
            setTimeout(() => {
                message.remove();
            }, 500);
        }, 3000);
    }
    
    // Smooth scrolling for navigation
    document.querySelectorAll('.a-navbar').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId.startsWith('http')) return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 100,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Image hover effect
    const images = document.querySelectorAll('.img1');
    images.forEach(img => {
        img.addEventListener('mouseover', function() {
            this.style.transform = 'scale(1.02)';
            this.style.transition = 'transform 0.3s ease';
        });
        
        img.addEventListener('mouseout', function() {
            this.style.transform = 'scale(1)';
        });
    });
});