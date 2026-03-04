# Nordline Studio — статический сайт

Одностраничный проект на чистом `HTML/CSS/JavaScript` без фреймворков.

## Быстрый запуск

### 1) Через VS Code Live Server

1. Установите расширение **Live Server** (если не установлено).
2. Откройте проект в VS Code.
3. Кликните правой кнопкой по `index.html`.
4. Выберите **Open with Live Server**.

### 2) Через Node static server

```bash
npx serve .
```

или

```bash
npx http-server .
```

Откройте URL, который покажет сервер (обычно `http://localhost:3000` или `http://127.0.0.1:8080`).

## Про file://

Проект использует `fetch` для отправки формы, поэтому открывать через `file://` не рекомендуется.
Запускайте через статический сервер (`Live Server`, `npx serve .`, `npx http-server .`), чтобы форма работала корректно.

## Структура

- `index.html`
- `privacy.html`
- `styles.css`
- `script.js`
- `assets/`
- `assets/icons/`
- `assets/images/`
- `assets/fonts/`

## Что уже проверено в реализации

- Мобильное меню: open/close, lock body scroll, overlay click, `Escape`, focus trap, ARIA.
- Якоря и fixed-header offset: корректный скролл к секциям.
- Scroll spy: активный пункт меню обновляется при прокрутке.
- Reveal on scroll: `IntersectionObserver`, fallback и `prefers-reduced-motion`.
- FAQ: плавное раскрытие, ARIA, повторный клик закрывает.
- Карусель: prev/next, dots, swipe, стрелки клавиатуры, safe-режим при `< 2` слайдах.
- Форма: валидация, inline ошибки, `aria-live`, реальная отправка через FormSubmit, disabled-кнопка, toast.

> Важно: при первой отправке FormSubmit пришлёт письмо активации на целевой email. Подтвердите активацию, иначе заявки не будут доставляться.
- Кнопка «Наверх»: появляется после прокрутки и плавно скроллит вверх.

## Ручной QA-чеклист

- [ ] меню (desktop/mobile) работает без багов
- [ ] якоря + offset (секции не прячутся под header)
- [ ] карусель (кнопки, dots, swipe, стрелки)
- [ ] FAQ (открытие/закрытие, плавность, ARIA)
- [ ] форма (ошибки, success, disabled при отправке)
- [ ] `prefers-reduced-motion` (анимации упрощены)
- [ ] адаптив на 360px / 768px / 1024px / 1440px
- [ ] Lighthouse (цель: > 90 в ключевых категориях)

## Как прогнать Lighthouse

1. Запустите сайт локально через Live Server или `npx serve .`.
2. Откройте страницу в Chrome.
3. DevTools → **Lighthouse**.
4. Выберите режим **Navigation**, устройство **Mobile** (потом повторите для Desktop).
5. Отметьте категории: Performance, Accessibility, Best Practices, SEO.
6. Нажмите **Analyze page load**.
