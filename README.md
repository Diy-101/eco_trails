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
