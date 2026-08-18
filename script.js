document.addEventListener('DOMContentLoaded', () => {
  const hero = document.querySelector('.hero');
  const heroCopy = document.querySelector('.hero-copy');
  const reservationBox = document.querySelector('.reservation-box');
  const revealItems = document.querySelectorAll('.reveal');
  const navLinks = document.querySelectorAll('.main-nav a');
  const forms = document.querySelectorAll('.reservation-form, .contact-form');
      
  if (hero) {
    hero.classList.add('is-ready');
  }
      
  if (heroCopy) {
    heroCopy.classList.add('is-ready');
  }
      
  if (reservationBox) {
    reservationBox.classList.add('is-ready');
  }
  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.18 });
      
  revealItems.forEach((item) => observer.observe(item));
      
  const currentPath = window.location.pathname.split('/').pop() || 'index.html';
  navLinks.forEach((link) => {
    const href = link.getAttribute('href');
    if (!href) return;
        
    if (currentPath === 'index.html' && href === 'index.html') {
      link.classList.add('active');
    } else if (currentPath === href) {
      link.classList.add('active');
    }
  });
      
  forms.forEach((form) => {
    const feedback = document.createElement('p');
    feedback.className = 'form-message';
    form.appendChild(feedback);
    form.addEventListener('submit', (event) => {
      event.preventDefault();
      const button = form.querySelector('button');
      const originalText = button?.textContent || 'Envoyer';
          
      if (button) {
        button.textContent = 'Traitement...';
        button.disabled = true;
      }
          
      feedback.textContent = 'Merci ! Votre demande a bien été enregistrée.';
      feedback.classList.add('success');
          
      setTimeout(() => {
        if (button) {
          button.textContent = originalText;
          button.disabled = false;
        }
          
        feedback.textContent = '';
        feedback.classList.remove('success');
        form.reset();
      }, 2200);
    });
  });
});
