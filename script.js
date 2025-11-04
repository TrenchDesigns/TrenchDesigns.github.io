// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
  // Mobile Menu Toggle
  const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
  const mobileMenu = document.querySelector('.mobile-menu');
  const mobileDropdowns = document.querySelectorAll('.mobile-dropdown');

  // Toggle mobile menu visibility
  mobileMenuToggle.addEventListener('click', function() {
    mobileMenu.classList.toggle('active');
    document.body.classList.toggle('menu-open');
  });

  // Handle mobile dropdown menus
  mobileDropdowns.forEach(dropdown => {
    const link = dropdown.querySelector('a');
    link.addEventListener('click', function(e) {
      e.preventDefault();
      dropdown.querySelector('ul').classList.toggle('active');
      link.querySelector('i').classList.toggle('fa-caret-up');
    });
  });

  // Close mobile menu when clicking outside
  document.addEventListener('click', function(e) {
    if (!mobileMenu.contains(e.target) && !mobileMenuToggle.contains(e.target)) {
      mobileMenu.classList.remove('active');
      document.body.classList.remove('menu-open');
    }
  });

  // Desktop Dropdown Menus
  const dropdowns = document.querySelectorAll('.dropdown');
  dropdowns.forEach(dropdown => {
    dropdown.addEventListener('mouseenter', function() {
      this.querySelector('.dropdown-menu').style.display = 'block';
    });
    dropdown.addEventListener('mouseleave', function() {
      this.querySelector('.dropdown-menu').style.display = 'none';
    });
  });

  // Booking Form Validation
  const bookingForm = document.querySelector('.booking-form');
  if (bookingForm) {
    bookingForm.addEventListener('submit', function(e) {
      const postCode = document.getElementById('post_code').value.trim();
      const wasteType = document.getElementById('waste_type').value;

      if (!postCode || !wasteType) {
        e.preventDefault();
        alert('Please enter your postcode/suburb and select a waste type.');
      }
    });
  }

  // Smooth Scrolling for Anchor Links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      const targetId = this.getAttribute('href');
      if (targetId !== '#') {
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
          window.scrollTo({
            top: targetElement.offsetTop - 80,
            behavior: 'smooth'
          });
        }
      }
    });
  });

  // Lazy Loading for Images (if needed)
  if ('loading' in HTMLImageElement.prototype) {
    // Native lazy loading is supported
    const lazyImages = document.querySelectorAll('img[loading="lazy"]');
    lazyImages.forEach(img => {
      img.src = img.dataset.src;
    });
  } else {
    // Fallback for browsers that don't support native lazy loading
    const lazyLoadObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target;
          img.src = img.dataset.src;
          observer.unobserve(img);
        }
      });
    });

    document.querySelectorAll('img[loading="lazy"]').forEach(img => {
      lazyLoadObserver.observe(img);
    });
  }

  // Add additional CSS classes for mobile/desktop detection
  function checkScreenSize() {
    if (window.innerWidth <= 768) {
      document.body.classList.add('mobile-view');
      document.body.classList.remove('desktop-view');
    } else {
      document.body.classList.add('desktop-view');
      document.body.classList.remove('mobile-view');
    }
  }

  // Run on load and resize
  checkScreenSize();
  window.addEventListener('resize', checkScreenSize);
});