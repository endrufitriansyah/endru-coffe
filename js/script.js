/**
 * Script Interaktif Web LARASA Coffee (Kombinasi Nama: endru_)
 * Fitur: Mobile Hamburger Toggle, Form Validation & Submission, Smooth Active Navigation
 */
document.addEventListener('DOMContentLoaded', function () {
    // 1. Mobile Menu Toggle
    const mobileToggle = document.getElementById('endru_mobile_toggle');
    const navLinks = document.getElementById('endru_nav_links');

    if (mobileToggle && navLinks) {
        mobileToggle.addEventListener('click', function () {
            navLinks.classList.toggle('endru_mobile_open');
        });

        // Close mobile menu on link click
        navLinks.querySelectorAll('.endru_nav_link').forEach(link => {
            link.addEventListener('click', function () {
                navLinks.classList.remove('endru_mobile_open');
            });
        });
    }

    // 2. Contact Form Interactive Submission & Validation
    const contactForm = document.getElementById('endru_contact_form');
    const alertSuccess = document.getElementById('endru_alert_success');

    if (contactForm) {
        contactForm.addEventListener('submit', function (e) {
            e.preventDefault();

            const name = document.getElementById('endru_name').value.trim();
            const email = document.getElementById('endru_email').value.trim();
            const phone = document.getElementById('endru_phone').value.trim();
            const message = document.getElementById('endru_message').value.trim();

            if (!name || !email || !message) {
                alert('Silakan lengkapi nama, email, dan pesan Anda.');
                return;
            }

            // Simulasi Pengiriman Pesan
            if (alertSuccess) {
                alertSuccess.style.display = 'block';
                alertSuccess.textContent = `Terima kasih, ${name}! Pesan Anda telah berhasil terkirim kepada pemilik LARASA Coffee.`;
            }

            // Reset form input
            contactForm.reset();

            // Auto-hide alert after 6 seconds
            setTimeout(function () {
                if (alertSuccess) {
                    alertSuccess.style.display = 'none';
                }
            }, 6000);
        });
    }
});
