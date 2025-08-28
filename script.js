document.addEventListener('DOMContentLoaded', function() {
  const cards = document.querySelectorAll('.card');
  
  // Add click animation
  cards.forEach(card => {
    card.addEventListener('click', function() {
      // Create ripple effect
      const ripple = document.createElement('div');
      ripple.classList.add('ripple');
      
      const rect = card.getBoundingClientRect();
      const size = Math.max(rect.width, rect.height);
      const x = event.clientX - rect.left - size / 2;
      const y = event.clientY - rect.top - size / 2;
      
      ripple.style.width = ripple.style.height = size + 'px';
      ripple.style.left = x + 'px';
      ripple.style.top = y + 'px';
      
      card.appendChild(ripple);
      
      // Remove ripple after animation
      setTimeout(() => {
        ripple.remove();
      }, 600);
      
      // Add click scale effect
      card.style.transform = 'scale(0.95)';
      setTimeout(() => {
        card.style.transform = '';
      }, 150);
    });
    
    // Add mouse move parallax effect
    card.addEventListener('mousemove', function(e) {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      
      const rotateX = (y - centerY) / 10;
      const rotateY = (centerX - x) / 10;
      
      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-10px) scale(1.02)`;
    });
    
    card.addEventListener('mouseleave', function() {
      card.style.transform = '';
    });
  });
  
  // Add floating particles
  function createParticle() {
    const particle = document.createElement('div');
    particle.classList.add('particle');
    
    particle.style.cssText = `
      position: fixed;
      width: 4px;
      height: 4px;
      background: rgba(100, 255, 218, 0.6);
      border-radius: 50%;
      pointer-events: none;
      z-index: -1;
      left: ${Math.random() * window.innerWidth}px;
      top: ${window.innerHeight + 10}px;
      animation: floatUp ${3 + Math.random() * 4}s linear forwards;
    `;
    
    document.body.appendChild(particle);
    
    setTimeout(() => {
      particle.remove();
    }, 7000);
  }
  
  // Create particles periodically
  setInterval(createParticle, 300);
  
  // Add CSS for particles
  const style = document.createElement('style');
  style.textContent = `
    @keyframes floatUp {
      to {
        transform: translateY(-${window.innerHeight + 100}px) rotate(360deg);
        opacity: 0;
      }
    }
    
    .ripple {
      position: absolute;
      border-radius: 50%;
      background: rgba(255, 255, 255, 0.3);
      transform: scale(0);
      animation: rippleEffect 0.6s linear;
      pointer-events: none;
    }
    
    @keyframes rippleEffect {
      to {
        transform: scale(2);
        opacity: 0;
      }
    }
  `;
  document.head.appendChild(style);
  
  // Add intersection observer for scroll animations
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }
    });
  }, {
    threshold: 0.1
  });
  
  cards.forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(50px)';
    card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(card);
  });
});

// Add smooth scrolling
document.documentElement.style.scrollBehavior = 'smooth';

// Add window resize handler
window.addEventListener('resize', () => {
  // Recalculate card positions if needed
  const cards = document.querySelectorAll('.card');
  cards.forEach(card => {
    card.style.transform = '';
  });
});
