# Экотропы Ленинградской области

React + TypeScript + Tailwind CSS проект для сайта об экотропах Ленинградской области.

## Быстрый старт

1. Установите зависимости:
```bash
npm install
```

2. Запустите dev-сервер:
```bash
npm run dev
```

3. Откройте браузер по адресу, который покажет Vite (обычно http://localhost:5173)

## Сборка для продакшена

```bash
npm run build
```

Собранные файлы будут в папке `dist/`

## Деплой на GitHub Pages

Проект настроен для автоматического деплоя на GitHub Pages через GitHub Actions.

### Настройка

1. Убедитесь, что в репозитории включен GitHub Pages:
   - Перейдите в Settings → Pages
   - В разделе "Source" выберите "GitHub Actions"

2. Workflow автоматически запустится при:
   - Push в ветку `main` или `master`
   - Ручном запуске через Actions → Deploy to GitHub Pages → Run workflow

3. После успешного деплоя сайт будет доступен по адресу:
   - `https://<username>.github.io/<repository-name>/` (для обычных репозиториев)
   - `https://<username>.github.io/` (для репозиториев вида `username.github.io`)

### Локальная проверка билда

Для проверки билда перед деплоем:

**Для обычного репозитория (не username.github.io):**
```bash
# Замените REPOSITORY_NAME на имя вашего репозитория
VITE_BASE_URL=/REPOSITORY_NAME/ npm run build
npm run preview
```

**Для репозитория username.github.io:**
```bash
npm run build
npm run preview
```

**Важно:** При локальном тестировании убедитесь, что `VITE_BASE_URL` соответствует пути вашего репозитория на GitHub Pages. Это необходимо для корректной работы всех путей к ресурсам.

## Структура проекта

```
src/
├── components/      # React компоненты
│   ├── Hero.tsx
│   ├── ConceptSection.tsx
│   ├── MapSection.tsx
│   ├── RoutesSection.tsx
│   ├── CTARandom.tsx
│   ├── CTACompanion.tsx
│   ├── TrailModal.tsx
│   └── Footer.tsx
├── data/           # Данные маршрутов
│   └── trails.ts
├── types/          # TypeScript типы
│   └── index.ts
├── App.tsx         # Главный компонент
├── main.tsx        # Точка входа
└── index.css       # Глобальные стили и Tailwind
```

## Технологии

- **React 18** - UI библиотека
- **TypeScript** - типизация
- **Tailwind CSS** - стилизация
- **Vite** - сборщик и dev-сервер
- **Leaflet** - карты
- **React Leaflet** - React обёртка для Leaflet

## Особенности

- ✅ Полностью переписан на React + TypeScript
- ✅ Все стили переведены на Tailwind CSS
- ✅ Адаптивный дизайн для мобильных устройств
- ✅ Интерактивная карта с маркерами маршрутов
- ✅ Модальные окна с информацией о маршрутах
- ✅ Параллакс эффекты
- ✅ Плавные анимации и переходы

## Примечания

- Все изображения должны находиться в корне проекта (там же, где index.html)
- Для работы карты необходим интернет (используется OpenStreetMap)
