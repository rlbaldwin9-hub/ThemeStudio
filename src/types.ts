export interface ColorPalette {
  primaryBg: string;
  secondaryBg: string;
  tertiaryBg?: string;
  textColor: string; // Normal body text fallback
  bodyTextColor?: string; // Separate Normal Text color
  headingColor: string; // Heading fallback
  titleColor?: string; // Separate Title color
  subheadingColor?: string; // Separate Subheading color
  smallTextColor?: string; // Separate Small Text color
  primaryButtonBg: string;
  primaryButtonText: string;
  secondaryButtonBg: string;
  secondaryButtonText: string;
  dividerColor: string;
  linkColor?: string; // Custom Link color
  carouselActiveDotColor?: string; // Carousel Active Dot
  navBg: string;
  navText: string;
  // Components: 3 color styles/variations
  compStyle1Bg?: string;
  compStyle1Text?: string;
  compStyle2Bg?: string;
  compStyle2Text?: string;
  compStyle3Bg?: string;
  compStyle3Text?: string;
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
  subheading?: FontConfig;
  body: FontConfig; // Normal text
  smallText?: FontConfig;
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

export function normalizeColors(colors: Partial<ColorPalette> | undefined): ColorPalette {
  const fallback: ColorPalette = {
    primaryBg: '#FFFFFF',
    secondaryBg: '#F3F4F6',
    tertiaryBg: '#E5E7EB',
    textColor: '#1F2937',
    bodyTextColor: '#1F2937',
    headingColor: '#111827',
    titleColor: '#111827',
    subheadingColor: '#374151',
    smallTextColor: '#6B7280',
    primaryButtonBg: '#3B82F6',
    primaryButtonText: '#FFFFFF',
    secondaryButtonBg: '#F3F4F6',
    secondaryButtonText: '#1F2937',
    dividerColor: '#E5E7EB',
    linkColor: '#3B82F6',
    carouselActiveDotColor: '#3B82F6',
    navBg: '#FFFFFF',
    navText: '#111827',
    compStyle1Bg: '#3B82F6',
    compStyle1Text: '#FFFFFF',
    compStyle2Bg: '#F3F4F6',
    compStyle2Text: '#1F2937',
    compStyle3Bg: '#FFFFFF',
    compStyle3Text: '#1F2937',
  };

  if (!colors) return fallback;

  return {
    primaryBg: colors.primaryBg || fallback.primaryBg,
    secondaryBg: colors.secondaryBg || fallback.secondaryBg,
    tertiaryBg: colors.tertiaryBg || colors.secondaryBg || fallback.tertiaryBg,
    textColor: colors.textColor || fallback.textColor,
    bodyTextColor: colors.bodyTextColor || colors.textColor || fallback.bodyTextColor,
    headingColor: colors.headingColor || fallback.headingColor,
    titleColor: colors.titleColor || colors.headingColor || fallback.titleColor,
    subheadingColor: colors.subheadingColor || colors.headingColor || fallback.subheadingColor,
    smallTextColor: colors.smallTextColor || colors.textColor || fallback.smallTextColor,
    primaryButtonBg: colors.primaryButtonBg || fallback.primaryButtonBg,
    primaryButtonText: colors.primaryButtonText || fallback.primaryButtonText,
    secondaryButtonBg: colors.secondaryButtonBg || fallback.secondaryButtonBg,
    secondaryButtonText: colors.secondaryButtonText || fallback.secondaryButtonText,
    dividerColor: colors.dividerColor || fallback.dividerColor,
    linkColor: colors.linkColor || colors.primaryButtonBg || fallback.linkColor,
    carouselActiveDotColor: colors.carouselActiveDotColor || colors.primaryButtonBg || fallback.carouselActiveDotColor,
    navBg: colors.navBg || fallback.navBg,
    navText: colors.navText || fallback.navText,
    compStyle1Bg: colors.compStyle1Bg || colors.primaryButtonBg || fallback.compStyle1Bg,
    compStyle1Text: colors.compStyle1Text || colors.primaryButtonText || fallback.compStyle1Text,
    compStyle2Bg: colors.compStyle2Bg || colors.secondaryBg || fallback.compStyle2Bg,
    compStyle2Text: colors.compStyle2Text || colors.headingColor || fallback.compStyle2Text,
    compStyle3Bg: colors.compStyle3Bg || colors.primaryBg || fallback.compStyle3Bg,
    compStyle3Text: colors.compStyle3Text || colors.textColor || fallback.compStyle3Text,
  };
}

export function normalizeTypography(settings: Partial<TypographySettings> | undefined): TypographySettings {
  const fallbackFamily = 'Inter';
  const fallbackTitle: FontConfig = { family: 'Playfair Display', weight: '700', size: '48px', letterSpacing: '-0.02em' };
  const fallbackHeading: FontConfig = { family: 'Playfair Display', weight: '600', size: '24px', letterSpacing: '-0.01em' };
  const fallbackSubheading: FontConfig = { family: 'Playfair Display', weight: '500', size: '18px', letterSpacing: '-0.01em' };
  const fallbackBody: FontConfig = { family: fallbackFamily, weight: '400', size: '14px', letterSpacing: '0' };
  const fallbackSmallText: FontConfig = { family: fallbackFamily, weight: '400', size: '11px', letterSpacing: '0.01em' };

  if (!settings) {
    return {
      title: fallbackTitle,
      heading: fallbackHeading,
      subheading: fallbackSubheading,
      body: fallbackBody,
      smallText: fallbackSmallText,
    };
  }

  const title = settings.title || fallbackTitle;
  const heading = settings.heading || fallbackHeading;
  const body = settings.body || fallbackBody;

  return {
    title: {
      family: title.family || fallbackTitle.family,
      weight: title.weight || fallbackTitle.weight,
      size: title.size || fallbackTitle.size,
      letterSpacing: title.letterSpacing || fallbackTitle.letterSpacing,
      color: title.color,
    },
    heading: {
      family: heading.family || fallbackHeading.family,
      weight: heading.weight || fallbackHeading.weight,
      size: heading.size || fallbackHeading.size,
      letterSpacing: heading.letterSpacing || fallbackHeading.letterSpacing,
      color: heading.color,
    },
    subheading: settings.subheading || {
      family: heading.family || fallbackSubheading.family,
      weight: '500',
      size: '18px',
      letterSpacing: heading.letterSpacing || '0',
      color: heading.color,
    },
    body: {
      family: body.family || fallbackBody.family,
      weight: body.weight || fallbackBody.weight,
      size: body.size || fallbackBody.size,
      letterSpacing: body.letterSpacing || fallbackBody.letterSpacing,
      color: body.color,
    },
    smallText: settings.smallText || {
      family: body.family || fallbackSmallText.family,
      weight: '400',
      size: '11px',
      letterSpacing: '0.01em',
      color: body.color,
    },
  };
}

