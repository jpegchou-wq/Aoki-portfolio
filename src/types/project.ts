import type { MediaItem } from '@/components/media/MediaEmbed';

export interface DetailContent {
  intro?: string;
  role?: string;
  highlights?: string[];
  process?: string[];
}

export interface LocalizedProjectContent {
  title: string;
  description: string;
  detail?: DetailContent;
}

export interface ProjectData {
  id: string;
  category: string;
  en: LocalizedProjectContent;
  cn: LocalizedProjectContent;
  thumbnail: string;
  link?: string;
  github?: string;
  technologies: string[];
  media?: MediaItem[];
}
