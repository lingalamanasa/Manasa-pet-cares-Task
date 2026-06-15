// ===== STACKLY PET CARE - Main JavaScript =====

// --- Navbar Scroll Effect ---
window.addEventListener('scroll', function() {
  var navbar = document.querySelector('.navbar');
  if (navbar) {
    navbar.classList.toggle('scrolled', window.scrollY > 50);
  }
});

// --- Hamburger Menu Toggle ---
function toggleMenu() {
  var hamburger = document.querySelector('.hamburger');
  var navLinks = document.querySelector('.nav-links');
  var overlay = document.querySelector('.nav-overlay');

  if (hamburger && navLinks) {
    hamburger.classList.toggle('active');
    navLinks.classList.toggle('active');
    if (overlay) overlay.classList.toggle('active');
    document.body.style.overflow = navLinks.classList.contains('active') ? 'hidden' : '';
  }
}

// Close menu on overlay click
document.addEventListener('click', function(e) {
  if (e.target.classList.contains('nav-overlay')) {
    toggleMenu();
  }
});

// Close menu on nav link click (mobile)
document.addEventListener('DOMContentLoaded', function() {
  document.querySelectorAll('.nav-links a').forEach(function(link) {
    link.addEventListener('click', function() {
      var navLinks = document.querySelector('.nav-links');
      if (navLinks && navLinks.classList.contains('active')) {
        toggleMenu();
      }
    });
  });
});

// --- Profile Dropdown ---
function toggleDropdown() {
  var menu = document.querySelector('.dropdown-menu');
  if (menu) {
    menu.classList.toggle('show');
  }
}

// Close dropdown on outside click
document.addEventListener('click', function(e) {
  var dropdown = document.querySelector('.profile-dropdown');
  var menu = document.querySelector('.dropdown-menu');
  if (dropdown && menu && !dropdown.contains(e.target)) {
    menu.classList.remove('show');
  }
});

// --- Counter Animation ---
function animateCounters() {
  var counters = document.querySelectorAll('.counter');
  counters.forEach(function(counter) {
    var target = parseInt(counter.getAttribute('data-target'));
    var suffix = counter.getAttribute('data-suffix') || '';
    var duration = 2000;
    var step = target / (duration / 16);
    var current = 0;

    function update() {
      current += step;
      if (current < target) {
        counter.textContent = Math.floor(current) + suffix;
        requestAnimationFrame(update);
      } else {
        counter.textContent = target + suffix;
      }
    }

    update();
  });
}

// Trigger counter animation when stats section is in view
function observeCounters() {
  var statsSection = document.querySelector('.stats-section');
  if (!statsSection) return;

  var observer = new IntersectionObserver(function(entries) {
    entries.forEach(function(entry) {
      if (entry.isIntersecting) {
        animateCounters();
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.3 });

  observer.observe(statsSection);
}

document.addEventListener('DOMContentLoaded', observeCounters);

// --- Tab Switching ---
function switchTab(tabId) {
  // Deactivate all tabs
  document.querySelectorAll('.tab-btn').forEach(function(btn) {
    btn.classList.remove('active');
  });
  document.querySelectorAll('.tab-content').forEach(function(content) {
    content.classList.remove('active');
  });

  // Activate selected tab
  var tabBtn = document.querySelector('[data-tab="' + tabId + '"]');
  var tabContent = document.getElementById(tabId);
  if (tabBtn) tabBtn.classList.add('active');
  if (tabContent) tabContent.classList.add('active');
}

// --- FAQ Accordion ---
function toggleFaq(el) {
  var item = el.closest('.faq-item');
  var isOpen = item.classList.contains('active');

  // Close all
  document.querySelectorAll('.faq-item').forEach(function(faq) {
    faq.classList.remove('active');
  });

  // Open clicked (if it was closed)
  if (!isOpen) {
    item.classList.add('active');
  }
}

// --- Login Redirect ---
function handleLogin(e) {
  e.preventDefault();
  var role = document.getElementById('role').value;
  var fullnameEl = document.getElementById('fullname');
  var fullname = fullnameEl ? fullnameEl.value.trim() : '';
  var email = document.getElementById('email').value;
  var password = document.getElementById('password').value;

  if (!role || role === 'Select Role') {
    showAlert('Please select a role');
    return;
  }
  if (fullnameEl && !fullname) {
    showAlert('Please enter your full name');
    return;
  }
  if (!email) {
    showAlert('Please enter your email');
    return;
  }
  if (!password) {
    showAlert('Please enter your password');
    return;
  }

  // Store user info — use full name if provided, else email prefix
  sessionStorage.setItem('userRole', role);
  sessionStorage.setItem('userName', fullname || email.split('@')[0]);

  if (role === 'admin') {
    window.location.href = 'admin-dashboard.html';
  } else {
    window.location.href = 'user-dashboard.html';
  }
}

// --- Register Handler ---
function handleRegister(e) {
  e.preventDefault();
  var role = document.getElementById('role').value;
  var name = document.getElementById('fullname').value;
  var email = document.getElementById('email').value;
  var password = document.getElementById('password').value;
  var confirm = document.getElementById('confirm-password').value;

  if (!role || role === 'Select Role') {
    showAlert('Please select a role');
    return;
  }
  if (!name) {
    showAlert('Please enter your full name');
    return;
  }
  if (!email) {
    showAlert('Please enter your email');
    return;
  }
  if (!password) {
    showAlert('Please enter a password');
    return;
  }
  if (password !== confirm) {
    showAlert('Passwords do not match');
    return;
  }

  showAlert('Account created successfully! Redirecting to login...');
  setTimeout(function() {
    window.location.href = 'login.html';
  }, 1500);
}

// --- Password Toggle ---
function togglePassword(inputId) {
  var input = document.getElementById(inputId);
  var icon = input.nextElementSibling ? input.nextElementSibling.querySelector('i') : null;
  if (!icon) {
    icon = input.parentElement.querySelector('.toggle-pw i');
  }

  if (input.type === 'password') {
    input.type = 'text';
    if (icon) icon.className = 'bi bi-eye-slash';
  } else {
    input.type = 'password';
    if (icon) icon.className = 'bi bi-eye';
  }
}

// --- Alert Helper ---
function showAlert(message) {
  // Remove existing alerts
  var existing = document.querySelector('.custom-alert');
  if (existing) existing.remove();

  var alert = document.createElement('div');
  alert.className = 'custom-alert';
  alert.innerHTML = '<i class="bi bi-info-circle"></i> ' + message;
  alert.style.cssText = 'position:fixed;top:20px;left:50%;transform:translateX(-50%);padding:14px 28px;background:linear-gradient(135deg,#00b894,#00a389);color:#fff;border-radius:12px;z-index:9999;font-family:Outfit,sans-serif;font-size:0.95rem;display:flex;align-items:center;gap:10px;box-shadow:0 10px 30px rgba(0,184,148,0.3);animation:slideDown 0.3s ease';

  document.body.appendChild(alert);

  setTimeout(function() {
    alert.style.opacity = '0';
    alert.style.transform = 'translateX(-50%) translateY(-20px)';
    alert.style.transition = 'all 0.3s ease';
    setTimeout(function() { alert.remove(); }, 300);
  }, 3000);
}

// --- Shop Category Filter ---
function filterProducts(category) {
  document.querySelectorAll('.menu-filter-btn').forEach(function(btn) {
    btn.classList.remove('active');
  });
  event.target.classList.add('active');

  document.querySelectorAll('.menu-card').forEach(function(card) {
    if (category === 'all' || card.getAttribute('data-category') === category) {
      card.style.display = 'block';
      card.style.animation = 'fadeIn 0.4s ease';
    } else {
      card.style.display = 'none';
    }
  });
}

// --- Logout ---
function handleLogout() {
  sessionStorage.clear();
  window.location.href = 'login.html';
}

// --- Contact Form ---
function handleContact(e) {
  e.preventDefault();
  showAlert('Thank you! Your message has been sent successfully.');
  e.target.reset();
}

// --- Newsletter ---
function handleNewsletter(e) {
  e.preventDefault();
  showAlert('Subscribed successfully! Check your inbox for updates.');
  e.target.reset();
}

// --- Add to Cart ---
function addToCart(productName) {
  showAlert(productName + ' added to cart!');
}

// --- Scroll Animation (fade in on scroll) ---
document.addEventListener('DOMContentLoaded', function() {
  var observerOptions = { threshold: 0.1, rootMargin: '0px 0px -50px 0px' };

  var fadeObserver = new IntersectionObserver(function(entries) {
    entries.forEach(function(entry) {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
        fadeObserver.unobserve(entry.target);
      }
    });
  }, observerOptions);

  document.querySelectorAll('.fade-up').forEach(function(el) {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    fadeObserver.observe(el);
  });
});
