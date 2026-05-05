import type { MediaItem } from '@/components/media/MediaEmbed';
import type { DetailContent } from '@/types/project';

export interface LocalizedLabContent {
  title: string;
  description: string;
  detail?: DetailContent;
}

export interface LabData {
  id: string;
  en: LocalizedLabContent;
  cn: LocalizedLabContent;
  thumbnail: string;
  technologies: string[];
  media?: MediaItem[];
}
