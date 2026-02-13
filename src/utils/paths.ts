/**
 * Утилита для получения правильных путей к статическим ресурсам
 * с учетом base URL для GitHub Pages
 */
export const getAssetPath = (path: string): string => {
  if (!path) return ''
  
  // Убираем начальный слеш, если есть
  const cleanPath = path.startsWith('/') ? path.slice(1) : path
  
  // Получаем base URL из Vite (по умолчанию '/')
  const baseUrl = import.meta.env?.BASE_URL || '/'
  
  // Убираем завершающий слеш из baseUrl, если есть
  const normalizedBase = baseUrl.endsWith('/') ? baseUrl.slice(0, -1) : baseUrl
  
  // Возвращаем путь с base URL
  return `${normalizedBase}/${cleanPath}`
}
