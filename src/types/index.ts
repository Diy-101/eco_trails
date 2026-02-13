export interface Trail {
  name: string;
  subtitle?: string;
  image: string;
  icon?: string;
  filterType?: 'look' | 'listen' | 'taste' | 'touch' | 'feel';
  description: string; // Короткое описание для карточки
  fullDescription?: string; // Полное описание для модального окна
  points: string[];
  distance: string;
  timing: string;
  audioUrl?: string;
  coords?: [number, number];
  difficulty?: 'easy' | 'medium' | 'hard';
  ageGroup?: 'family' | 'adults' | 'seniors' | 'all'; // Для фильтра по возрасту
  distanceFromCity?: number; // Расстояние от СПб в км
  distanceCategory?: 'near' | 'medium' | 'far'; // Категория отдаленности
}

export interface ConceptCard {
  title: string;
  description: string;
  icon: string;
}
