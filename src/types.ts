export interface ColorPalette {
  primaryBg: string;
  secondaryBg: string;
  textColor: string;
  headingColor: string;
  primaryButtonBg: string;
  primaryButtonText: string;
  secondaryButtonBg: string;
  secondaryButtonText: string;
  dividerColor: string;
  navBg: string;
  navText: string;
}

export interface FontConfig {
  family: string;
  weight: string;
  size: string;
  letterSpacing: string;
  color?: string;
}

export interface TypographySettings {
  title: FontConfig;
  heading: FontConfig;
  body: FontConfig;
}

export type SectionType =
  | 'hero'
  | 'split'
  | 'two-col'
  | 'bento'
  | 'faq'
  | 'features'
  | 'testimonials'
  | 'link-in-bio'
  | 'pricing'
  | 'footer';

export interface Section {
  id: string;
  type: SectionType;
  title: string;
  targetPage?: string;
  hidden?: boolean;
  subtitle?: string;
  content?: string;
  ctaText?: string;
  ctaUrl?: string;
  imageUrl?: string;
  imagePosition?: 'left' | 'right';
  bannerOpacity?: number;
  items?: Array<{
    id: string;
    title: string;
    description: string;
    tag?: string;
    icon?: string;
    price?: string;
    ctaText?: string;
    url?: string;
  }>;
}

export interface SavedTheme {
  id: string;
  name: string;
  colors: ColorPalette;
  typography: TypographySettings;
  sections: Section[];
  createdAt: string;
  headerTitle?: string;
  headerCtaText?: string;
  headerCtaUrl?: string;
}

export type ViewportMode = 'desktop' | 'tablet' | 'mobile';

export const APP_VERSION = "3.1";

