// ===== БУРГЕР-МЕНЮ =====
document.addEventListener('DOMContentLoaded', function() {
    const burger = document.getElementById('burger');
    const navMenu = document.querySelector('.nav-menu');
    if (burger && navMenu) {
        burger.addEventListener('click', function() {
            navMenu.classList.toggle('active');
        });

        // Закрываем меню при клике на ссылку (для мобильных)
        document.querySelectorAll('.nav-menu a').forEach(link => {
            link.addEventListener('click', function() {
                navMenu.classList.remove('active');
            });
        });
    }
});

// ===== ПЛАВНЫЙ СКРОЛЛ =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    });
});

// ===== ОТПРАВКА ФОРМЫ "ОСТАВИТЬ ЗАЯВКУ" =====
const orderForm = document.getElementById('orderForm');
const orderStatus = document.getElementById('formStatus');
if (orderForm) {
    orderForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const data = new FormData(orderForm);
        fetch(orderForm.action, {
            method: 'POST',
            body: data,
            headers: { 'Accept': 'application/json' }
        })
        .then(response => {
            if (response.ok) {
                orderStatus.innerHTML = '✅ Заявка отправлена! Мы свяжемся с вами.';
                orderForm.reset();
            } else {
                orderStatus.innerHTML = '❌ Ошибка при отправке. Попробуйте позже.';
            }
        })
        .catch(() => {
            orderStatus.innerHTML = '❌ Ошибка сети. Проверьте соединение.';
        });
    });
}

// ===== ОТПРАВКА ФОРМЫ "ЗАКАЗАТЬ КАТАЛОГ" =====
const catalogForm = document.getElementById('catalogForm');
const catalogStatus = document.getElementById('catalogStatus');
if (catalogForm) {
    catalogForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const data = new FormData(catalogForm);
        fetch(catalogForm.action, {
            method: 'POST',
            body: data,
            headers: { 'Accept': 'application/json' }
        })
        .then(response => {
            if (response.ok) {
                catalogStatus.innerHTML = '✅ Заявка на каталог отправлена! Мы свяжемся с вами.';
                catalogForm.reset();
            } else {
                catalogStatus.innerHTML = '❌ Ошибка при отправке. Попробуйте позже.';
            }
        })
        .catch(() => {
            catalogStatus.innerHTML = '❌ Ошибка сети. Проверьте соединение.';
        });
    });
}

// ===== ЛАЙТБОКС (ОТКРЫТИЕ ФОТО НА ВЕСЬ ЭКРАН) =====
// Эти функции объявлены глобально, чтобы их можно было вызывать из HTML (onclick)
function openLightbox(src, alt) {
    var overlay = document.getElementById('lightboxOverlay');
    var img = document.getElementById('lightboxImage');
    if (!overlay || !img) return;
    img.src = src;
    img.alt = alt || 'Фото мебели';
    overlay.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeLightbox(e) {
    if (e && e.target !== e.currentTarget) return;
    var overlay = document.getElementById('lightboxOverlay');
    if (!overlay) return;
    overlay.classList.remove('active');
    document.body.style.overflow = '';
    var img = document.getElementById('lightboxImage');
    if (img) img.src = '';
}

// Закрытие по клавише ESC
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        var overlay = document.getElementById('lightboxOverlay');
        if (overlay && overlay.classList.contains('active')) {
            closeLightbox(e);
        }
    }
});

