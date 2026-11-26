/**
 * Script Interaktif Web LARASA Coffee (Kombinasi Nama: endru_)
 * Fitur: Menu Mobile, Validasi Form & Pengiriman Formspree (AJAX)
 */
document.addEventListener('DOMContentLoaded', function () {
    // 1. Toggle Menu Mobile
    const endru_mobileToggle = document.getElementById('endru_mobile_toggle');
    const endru_navLinks = document.getElementById('endru_nav_links');

    if (endru_mobileToggle && endru_navLinks) {
        endru_mobileToggle.addEventListener('click', function () {
            endru_navLinks.classList.toggle('endru_mobile_open');
        });

        // Tutup menu mobile saat tautan diklik
        endru_navLinks.querySelectorAll('.endru_nav_link').forEach(link => {
            link.addEventListener('click', function () {
                endru_navLinks.classList.remove('endru_mobile_open');
            });
        });
    }

    // 2. Pengiriman Form Kontak via Formspree (AJAX)
    const endru_contactForm = document.getElementById('endru_contact_form');
    const endru_alertSuccess = document.getElementById('endru_alert_success');
    const endru_submitBtn = document.getElementById('endru_btn_submit');

    if (endru_contactForm) {
        endru_contactForm.addEventListener('submit', async function (e) {
            e.preventDefault();

            const nameInput = document.getElementById('endru_name');
            const emailInput = document.getElementById('endru_email');
            const messageInput = document.getElementById('endru_message');

            const name = nameInput ? nameInput.value.trim() : '';
            const email = emailInput ? emailInput.value.trim() : '';
            const message = messageInput ? messageInput.value.trim() : '';

            if (!name || !email || !message) {
                alert('Silakan lengkapi nama, email, dan pesan Anda.');
                return;
            }

            // Tombol loading state
            const originalBtnContent = endru_submitBtn ? endru_submitBtn.innerHTML : '';
            if (endru_submitBtn) {
                endru_submitBtn.disabled = true;
                endru_submitBtn.innerHTML = '<span>Mengirim Pesan...</span>';
            }

            try {
                const formData = new FormData(endru_contactForm);
                const response = await fetch('https://formspree.io/f/xkjrkvkq', {
                    method: 'POST',
                    body: formData,
                    headers: {
                        'Accept': 'application/json'
                    }
                });

                if (response.ok) {
                    if (endru_alertSuccess) {
                        endru_alertSuccess.style.display = 'block';
                        endru_alertSuccess.style.backgroundColor = 'rgba(74, 124, 89, 0.15)';
                        endru_alertSuccess.style.color = 'var(--color-espresso)';
                        endru_alertSuccess.style.border = '1px solid var(--color-coffee-brown)';
                        endru_alertSuccess.textContent = `Terima kasih, ${name}! Pesan Anda telah berhasil terkirim langsung ke email pemilik LARASA Coffee.`;
                    }
                    endru_contactForm.reset();
                } else {
                    const data = await response.json();
                    const errorMsg = data && data.errors ? data.errors.map(err => err.message).join(', ') : 'Terjadi kendala saat mengirim pesan.';
                    alert('Gagal mengirim pesan: ' + errorMsg);
                }
            } catch (error) {
                console.error('Error pengiriman pesan:', error);
                alert('Terjadi kesalahan jaringan. Silakan periksa koneksi internet Anda atau coba lagi.');
            } finally {
                if (endru_submitBtn) {
                    endru_submitBtn.disabled = false;
                    endru_submitBtn.innerHTML = originalBtnContent;
                }
                // Sembunyikan notifikasi otomatis setelah 7 detik
                setTimeout(function () {
                    if (endru_alertSuccess) {
                        endru_alertSuccess.style.display = 'none';
                    }
                }, 7000);
            }
        });
    }
});
