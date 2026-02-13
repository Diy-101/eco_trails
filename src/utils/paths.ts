/**
 * Утилита для получения правильных путей к статическим ресурсам
 * с учетом base URL для GitHub Pages
 */
export const getAssetPath = (path: string): string => {
  // Убираем начальный слеш, если есть
  const cleanPath = path.startsWith('/') ? path.slice(1) : path
  // Добавляем base URL из Vite
  return `${import.meta.env.BASE_URL}${cleanPath}`
}
