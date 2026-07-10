// Бургер-меню
document.addEventListener('DOMContentLoaded', function() {
  const burger = document.getElementById('burger');
  const navMenu = document.querySelector('.nav-menu');
  
  burger.addEventListener('click', function() {
    navMenu.classList.toggle('active');
  });

  // Закрываем меню при клике на ссылку (для мобильных)
  document.querySelectorAll('.nav-menu a').forEach(link => {
    link.addEventListener('click', () => {
      navMenu.classList.remove('active');
    });
  });

  // Плавный скролл к якорям
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  // Динамическая загрузка фото из папки img
  const galleryGrid = document.getElementById('galleryGrid');
  // Если вы хотите автоматически подгружать изображения, укажите их имена в массиве
  // либо используйте перебор, но проще всего прописать вручную в HTML,
  // потому что JS не может читать файловую систему на клиенте.
  // Поэтому предлагаю просто вставить нужные картинки в HTML вручную или через JS список.
  // Для удобства я создам массив с именами файлов (вы их потом замените).
  const images = [
    '1.jpg', '2.jpg', '3.jpg', '4.jpg', '5.jpg', '6.jpg'
  ];
  // Проверим, есть ли изображения в галерее, если нет – добавим заглушки
  if (galleryGrid.children.length === 0) {
    images.forEach(imgName => {
      const img = document.createElement('img');
      img.src = `img/${imgName}`;
      img.alt = 'Мебель';
      img.onerror = function() {
        this.style.display = 'none'; // скрываем, если файла нет
      };
      galleryGrid.appendChild(img);
    });
  }

  // Отправка формы (Formspree)
  const form = document.getElementById('orderForm');
  const status = document.getElementById('formStatus');
  if (form) {
    form.addEventListener('submit', function(e) {
      e.preventDefault();
      const data = new FormData(form);
      fetch(form.action, {
        method: 'POST',
        body: data,
        headers: { 'Accept': 'application/json' }
      })
      .then(response => {
        if (response.ok) {
          status.innerHTML = '✅ Заявка отправлена! Мы свяжемся с вами.';
          form.reset();
        } else {
          status.innerHTML = '❌ Ошибка при отправке. Попробуйте позже.';
        }
      })
      .catch(() => {
        status.innerHTML = '❌ Ошибка сети. Проверьте соединение.';
      });
    });
  }
  // Отправка формы "Заказать каталог"
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
// ===== ЛАЙТБОКС ДЛЯ ФОТО (РАБОТАЕТ НА ВСЕХ УСТРОЙСТВАХ) =====
document.addEventListener('DOMContentLoaded', function() {
    const overlay = document.getElementById('lightboxOverlay');
    const lightboxImg = document.getElementById('lightboxImage');
    const galleryGrid = document.getElementById('galleryGrid');

    if (!overlay || !lightboxImg || !galleryGrid) {
        console.warn('Элементы лайтбокса не найдены');
        return;
    }

    // Обработчик клика по всей галерее (делегирование)
    galleryGrid.addEventListener('click', function(e) {
        // Находим ближайший тег img внутри кликнутого элемента
        const img = e.target.closest('img');
        if (!img) return; // если клик не по картинке — выходим

        // Проверяем, что картинка загружена
        if (!img.src) return;

        // Устанавливаем src в модальное окно
        lightboxImg.src = img.src;
        lightboxImg.alt = img.alt || 'Фото мебели';

        // Показываем лайтбокс
        overlay.classList.add('active');
        document.body.style.overflow = 'hidden'; // запрещаем скролл фона
    });

    // Закрытие по клику на фон (на само затемнение)
    overlay.addEventListener('click', function(e) {
        // Если клик был по самому оверлею, а не по картинке
        if (e.target === overlay) {
            closeLightbox();
        }
    });

    // Закрытие по клавише ESC
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && overlay.classList.contains('active')) {
            closeLightbox();
        }
    });

    // Функция закрытия лайтбокса
    function closeLightbox() {
        overlay.classList.remove('active');
        document.body.style.overflow = '';
        lightboxImg.src = '';
    }

    // Если есть кнопка закрытия, можно добавить (по желанию)
    // Но в данном случае закрытие работает по клику на фон
});
});
