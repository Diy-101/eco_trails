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
}

export interface ConceptCard {
  title: string;
  description: string;
  icon: string;
}
