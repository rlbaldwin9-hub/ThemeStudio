import React, { useState } from 'react';
import { ColorPalette, TypographySettings, Section } from '../types';
import { 
  FileCode, Terminal, HelpCircle, Copy, Check, Download, 
  Settings, BookOpen, Layers, CheckCircle2 
} from 'lucide-react';

interface ExportPanelProps {
  colors: ColorPalette;
  typography: TypographySettings;
  sections: Section[];
}

const normalizeUrl = (url: string | undefined): string => {
  if (!url) return '#';
  const trimmed = url.trim();
  if (trimmed === '' || trimmed === '#') return '#';
  
  if (
    /^(https?:)?\/\//i.test(trimmed) || 
    trimmed.startsWith('#') || 
    trimmed.startsWith('/') || 
    trimmed.startsWith('mailto:') || 
    trimmed.startsWith('tel:')
  ) {
    return trimmed;
  }
  
  if (trimmed.includes('.') && !trimmed.includes(' ')) {
    return `https://${trimmed}`;
  }
  
  return trimmed;
};

const getLinkTarget = (url: string | undefined): string => {
  if (!url) return '_self';
  const norm = normalizeUrl(url);
  if (norm.startsWith('#')) return '_self';
  return '_blank';
};

export default function ExportPanel({ colors, typography, sections }: ExportPanelProps) {
  const [activeTab, setActiveTab] = useState<'json' | 'css' | 'html-embed' | 'html-full' | 'guide'>('json');
  const [selectedEmbedSecId, setSelectedEmbedSecId] = useState<string>(sections[0]?.id || '');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const [selectedFullPageSecIds, setSelectedFullPageSecIds] = useState<string[] | null>(null);
  const [pageHeightMode, setPageHeightMode] = useState<'scroll-container' | 'fill-screen' | 'natural' | 'fixed-height'>('scroll-container');
  const [customPixelHeight, setCustomPixelHeight] = useState<number>(1800);
  const [scrollbarMode, setScrollbarMode] = useState<'styled-show' | 'hide'>('styled-show');

  // Get active sections representing the custom rows in order
  const activeSectionsAll = sections.filter(s => !s.hidden);

  // Resolve actual selected row IDs
  const resolvedSelectedIds = selectedFullPageSecIds !== null
    ? selectedFullPageSecIds.filter(id => activeSectionsAll.some(s => s.id === id))
    : activeSectionsAll.map(s => s.id);

  // Helper to estimate total pixel height based on currently selected blocks
  const estimatedHeight = (() => {
    const selectedSecs = sections.filter(s => !s.hidden && resolvedSelectedIds.includes(s.id));
    if (selectedSecs.length === 0) return 800;
    
    return selectedSecs.reduce((sum, sec) => {
      let h = 500; // baseline height estimate
      if (sec.type === 'hero') {
        h = sec.subtitle ? 650 : 500;
      }
      else if (sec.type === 'features') {
        const rowCount = Math.ceil((sec.items?.length || 3) / 3);
        h = 240 + rowCount * 220;
      }
      else if (sec.type === 'split') {
        h = 600;
      }
      else if (sec.type === 'two-col') {
        const rowCount = Math.ceil((sec.items?.length || 2) / 2);
        h = 240 + rowCount * 240;
      }
      else if (sec.type === 'bento') {
        h = 750;
      }
      else if (sec.type === 'faq') {
        h = 220 + (sec.items?.length || 3) * 110;
      }
      else if (sec.type === 'testimonials') {
        h = 500;
      }
      else if (sec.type === 'pricing') {
        h = 600;
      }
      else if (sec.type === 'link-in-bio') {
        h = 550;
      }
      else if (sec.type === 'footer') {
        h = 250;
      }
      return sum + h;
    }, 100); // 100px base padding
  })();

  // Trigger brief copied checkmark animation
  const handleCopyText = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => {
      setCopiedId(null);
    }, 2000);
  };

  // 1. Google Sites custom theme JSON properties scheme
  const themeJsonSchema = {
    metadata: {
      name: "Custom Theme Creator Studio Theme",
      version: "2.0",
      description: "Custom Google Sites Theme Package"
    },
    colors: {
      themeColors: [
        { id: "color-1", name: "Primary Brand Accent", hex: colors.primaryButtonBg },
        { id: "color-2", name: "Secondary Contrast", hex: colors.secondaryButtonBg },
        { id: "color-3", name: "Headings Tone", hex: colors.headingColor }
      ],
      backgrounds: {
        primary: colors.primaryBg,
        secondary: colors.secondaryBg,
        navigation: colors.navBg
      },
      text: {
        body: colors.textColor,
        nav: colors.navText
      }
    },
    textStyles: {
      title: {
        fontFamily: typography.title.family,
        fontWeight: typography.title.weight,
        fontSize: typography.title.size,
        letterSpacing: typography.title.letterSpacing
      },
      headings: {
        fontFamily: typography.heading.family,
        fontWeight: typography.heading.weight,
        fontSize: typography.heading.size,
        letterSpacing: typography.heading.letterSpacing
      },
      body: {
        fontFamily: typography.body.family,
        fontWeight: typography.body.weight,
        fontSize: typography.body.size,
        letterSpacing: typography.body.letterSpacing
      }
    },
    components: {
      buttons: {
        primary: {
          backgroundColor: colors.primaryButtonBg,
          color: colors.primaryButtonText,
          borderRadius: "8px"
        },
        secondary: {
          backgroundColor: colors.secondaryButtonBg,
          color: colors.secondaryButtonText,
          borderRadius: "8px"
        }
      },
      divider: {
        color: colors.dividerColor
      }
    }
  };

  const jsonString = JSON.stringify(themeJsonSchema, null, 2);

  // 2. CSS variables representation
  const cssVariablesString = `:root {
  /* Google Sites Custom Theme Root Properties */
  --gs-primary-bg: ${colors.primaryBg};
  --gs-secondary-bg: ${colors.secondaryBg};
  --gs-text-color: ${colors.textColor};
  --gs-heading-color: ${colors.headingColor};
  
  --gs-primary-btn-bg: ${colors.primaryButtonBg};
  --gs-primary-btn-text: ${colors.primaryButtonText};
  --gs-secondary-btn-bg: ${colors.secondaryButtonBg};
  --gs-secondary-btn-text: ${colors.secondaryButtonText};
  
  --gs-divider-color: ${colors.dividerColor};
  --gs-nav-bg: ${colors.navBg};
  --gs-nav-text: ${colors.navText};
  
  /* Font Family Mappings */
  --gs-font-title: "${typography.title.family}", sans-serif;
  --gs-font-heading: "${typography.heading.family}", sans-serif;
  --gs-font-body: "${typography.body.family}", sans-serif;
}`;

  // 3. HTML Embed compiler
  const compileSectionEmbedCode = (sec: Section) => {
    if (!sec) return '<!-- No rows placed. Build your sections first in the Sidebar! -->';

    const fontsToLoad = Array.from(new Set([
      typography.title.family,
      typography.heading.family,
      typography.body.family
    ])).map(f => f.replace(/\s+/g, '+')).join('&family=');

    let sectionInnerHtml = '';

    // compile child assets html dynamically
    if (sec.type === 'hero') {
      sectionInnerHtml = `
  <div class="hero-container">
    <h1 class="hero-title">${sec.title}</h1>
    ${sec.subtitle ? `<p class="hero-subtitle">${sec.subtitle}</p>` : ''}
    ${sec.content ? `<p class="hero-body">${sec.content}</p>` : ''}
    ${sec.ctaText ? `<a href="${normalizeUrl(sec.ctaUrl)}" class="cta-button" target="${getLinkTarget(sec.ctaUrl)}">${sec.ctaText}</a>` : ''}
  </div>`;
    } else if (sec.type === 'features') {
      const itemsHtml = sec.items?.map(item => `
      <div class="feature-card">
        <div class="custom-badge-icon">✓</div>
        <h3 class="feature-title">${item.title}</h3>
        <p class="feature-desc">${item.description}</p>
      </div>`).join('') || '';

      sectionInnerHtml = `
  <div class="center-banner">
    <h2 class="section-heading">${sec.title}</h2>
    ${sec.subtitle ? `<p class="section-lead">${sec.subtitle}</p>` : ''}
  </div>
  <div class="grid-layout-3">
    ${itemsHtml}
  </div>`;
    } else if (sec.type === 'split') {
      sectionInnerHtml = `
  <div class="split-wrapper ${sec.imagePosition === 'left' ? 'reverse-flow' : ''}">
    <div class="split-content">
      <h2 class="section-heading">${sec.title}</h2>
      ${sec.subtitle ? `<div class="p-accent">${sec.subtitle}</div>` : ''}
      <p class="body-paragraphs">${sec.content || ''}</p>
      ${sec.ctaText ? `<a href="${normalizeUrl(sec.ctaUrl)}" class="cta-button" target="${getLinkTarget(sec.ctaUrl)}">${sec.ctaText}</a>` : ''}
    </div>
    <div class="split-image-holder">
      <img src="${sec.imageUrl || 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=800&q=80'}" class="image-media" alt="Featured Media" />
    </div>
  </div>`;
    } else if (sec.type === 'two-col') {
      const colHtml = sec.items?.map(it => `
      <div class="two-col-box">
        <h3 class="feature-title" style="display:inline-block; margin-bottom:8px;">${it.title}</h3>
        <p class="feature-desc">${it.description}</p>
      </div>`).join('') || '';

      sectionInnerHtml = `
  <div class="center-banner">
    <h2 class="section-heading">${sec.title}</h2>
    ${sec.subtitle ? `<p class="section-lead">${sec.subtitle}</p>` : ''}
  </div>
  <div class="grid-layout-2">
    ${colHtml}
  </div>`;
    } else if (sec.type === 'bento') {
      const itemsHtml = sec.items?.map((it, idx) => `
      <div class="bento-box ${idx === 0 ? 'bento-grid-wide' : ''}">
        <div>
          ${it.tag ? `<span class="tag-badge">${it.tag}</span>` : ''}
          <h3 class="bento-title">${it.title}</h3>
          <p class="feature-desc">${it.description}</p>
        </div>
      </div>`).join('') || '';

      sectionInnerHtml = `
  <div class="center-banner">
    <h2 class="section-heading">${sec.title}</h2>
    ${sec.subtitle ? `<p class="section-lead">${sec.subtitle}</p>` : ''}
  </div>
  <div class="grid-layout-3">
    ${itemsHtml}
  </div>`;
    } else if (sec.type === 'faq') {
      const itemsHtml = sec.items?.map(it => `
      <div class="faq-row">
        <div class="faq-q">❓ ${it.title}</div>
        <div class="faq-a">${it.description}</div>
      </div>`).join('') || '';

      sectionInnerHtml = `
  <div class="center-banner" style="max-width: 600px; margin: 0 auto 32px auto;">
    <h2 class="section-heading">${sec.title}</h2>
    ${sec.subtitle ? `<p class="section-lead">${sec.subtitle}</p>` : ''}
  </div>
  <div class="list-holder">
    ${itemsHtml}
  </div>`;
    } else if (sec.type === 'testimonials') {
      const itemsHtml = sec.items?.map(it => `
      <div class="faq-row" style="border-radius:16px;">
        <div style="color:#fbbf24; font-size:16px; margin-bottom:8px;">★★★★★</div>
        <p class="testimonial-text">"${it.description}"</p>
        <div style="border-top:1px solid ${colors.dividerColor}; padding-top:8px; margin-top:12px; display:flex; justify-content:space-between; font-weight:bold; font-size:11px;">
          <span>${it.title}</span>
          <span style="opacity:0.6;">${it.tag || 'Client'}</span>
        </div>
      </div>`).join('') || '';

      sectionInnerHtml = `
  <div class="center-banner">
    <h2 class="section-heading">${sec.title}</h2>
    ${sec.subtitle ? `<p class="section-lead">${sec.subtitle}</p>` : ''}
  </div>
  <div class="grid-layout-2">
    ${itemsHtml}
  </div>`;
    } else if (sec.type === 'link-in-bio') {
      const itemsHtml = sec.items?.map(it => `
    <a href="${normalizeUrl(it.url)}" class="link-bio-row" target="${getLinkTarget(it.url)}">
      <div>
        <span class="bio-title">${it.title}</span>
        <span class="bio-desc">${it.description}</span>
      </div>
      <div class="bio-arrow">➔</div>
    </a>`).join('') || '';

      sectionInnerHtml = `
  <div class="center-banner" style="max-width:440px; margin:0 auto 24px auto;">
    <h3 class="section-heading">${sec.title}</h3>
    ${sec.subtitle ? `<p class="section-lead">${sec.subtitle}</p>` : ''}
  </div>
  <div class="bio-list">
    ${itemsHtml}
  </div>`;
    } else if (sec.type === 'pricing') {
      const itemsHtml = sec.items?.map(it => `
      <div class="pricing-tier ${it.tag ? 'tier-highlighted' : ''}">
        ${it.tag ? `<div class="highlight-badge">${it.tag}</div>` : ''}
        <h3 class="bento-title">${it.title}</h3>
        <p class="feature-desc" style="margin-bottom:16px;">${it.description}</p>
        <div class="price-container">
          <span class="price-val">${it.price}</span>
          <span class="price-sub">/ standard fee</span>
        </div>
        <button class="pricing-btn ${it.tag ? 'primary-tier-btn' : ''}">${it.ctaText || 'Purchase'}</button>
      </div>`).join('') || '';

      sectionInnerHtml = `
  <div class="center-banner">
    <h2 class="section-heading">${sec.title}</h2>
    ${sec.subtitle ? `<p class="section-lead">${sec.subtitle}</p>` : ''}
  </div>
  <div class="grid-layout-2" style="max-width: 680px; margin: 0 auto;">
    ${itemsHtml}
  </div>`;
    } else if (sec.type === 'footer') {
      const itemsHtml = sec.items?.map(it => `
      <div>
        <span class="foot-header">${it.title}</span>
        <a href="${normalizeUrl(it.url)}" class="foot-guide-item" target="${getLinkTarget(it.url)}">${it.description}</a>
      </div>`).join('') || '';

      sectionInnerHtml = `
  <div class="footer-layout">
    <div>
      <span class="footer-title">✦ ${sec.title}</span>
      <p class="footer-credit">${sec.subtitle || ''}</p>
    </div>
    <div class="footer-columns">
      ${itemsHtml}
    </div>
  </div>`;
    }

    return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Google Sites Custom Layout Embed Block</title>
  
  <!-- Dynmically loading the selected Google Font Family -->
  <link href="https://fonts.googleapis.com/css2?family=${fontsToLoad}&display=swap" rel="stylesheet">
  
  <style>
    /* Absolute Theme Reset and Isolation */
    *, *::before, *::after {
      box-sizing: border-box;
      margin: 0;
      padding: 0;
    }
    
    html, body {
      font-family: "${typography.body.family}", sans-serif;
      font-size: ${typography.body.size};
      color: ${colors.textColor};
      background-color: ${colors.primaryBg};
      line-height: 1.5;
      -webkit-font-smoothing: antialiased;
    }

    /* Core Utility Classes mapped from designer properties */
    .outer-section {
      width: 100%;
      padding: 48px 20px;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
    }

    .hero-container {
      text-align: center;
      max-width: 800px;
      margin: 0 auto;
    }

    .hero-title {
      font-family: "${typography.title.family}", sans-serif;
      font-weight: ${typography.title.weight};
      font-size: ${typography.title.size};
      color: ${colors.headingColor};
      letter-spacing: ${typography.title.letterSpacing};
      line-height: 1.15;
      margin-bottom: 16px;
    }

    .hero-subtitle {
      font-size: 1.1rem;
      opacity: 0.85;
      margin-bottom: 24px;
      max-width: 600px;
      margin-left: auto;
      margin-right: auto;
    }

    .hero-body {
      font-size: 0.9rem;
      opacity: 0.65;
      margin-bottom: 24px;
    }

    .section-heading {
      font-family: "${typography.heading.family}", sans-serif;
      font-weight: ${typography.heading.weight};
      font-size: ${typography.heading.size};
      color: ${colors.headingColor};
      letter-spacing: ${typography.heading.letterSpacing};
      line-height: 1.25;
      margin-bottom: 12px;
    }

    .section-lead {
      font-size: 0.95rem;
      opacity: 0.75;
      margin-bottom: 32px;
    }

    .center-banner {
      text-align: center;
      margin-bottom: 32px;
    }

    /* Column Symmetrical Layouts */
    .grid-layout-3 {
      display: grid;
      grid-template-columns: repeat(1, minmax(0, 1fr));
      gap: 20px;
      width: 100%;
      max-width: 960px;
    }

    .grid-layout-2 {
      display: grid;
      grid-template-columns: repeat(1, minmax(0, 1fr));
      gap: 20px;
      width: 100%;
      max-width: 960px;
    }

    @media (min-width: 640px) {
      .grid-layout-3 {
        grid-template-columns: repeat(3, minmax(0, 1fr));
      }
      .grid-layout-2 {
        grid-template-columns: repeat(2, minmax(0, 1fr));
      }
    }

    .feature-card {
      background-color: ${colors.primaryBg};
      border: 1px solid ${colors.dividerColor};
      padding: 24px;
      border-radius: 12px;
      transition: border-color 0.2s ease;
    }

    .custom-badge-icon {
      width: 32px;
      height: 32px;
      background-color: ${colors.secondaryBg};
      color: ${colors.primaryButtonBg};
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-weight: bold;
      font-size: 14px;
      margin-bottom: 16px;
    }

    .feature-title {
      font-family: "${typography.heading.family}", sans-serif;
      font-size: 1.1rem;
      font-weight: 700;
      color: ${colors.headingColor};
      margin-bottom: 8px;
    }

    .feature-desc {
      font-size: 0.85rem;
      opacity: 0.8;
      line-height: 1.5;
    }

    /* Asymmetric Split Columns */
    .split-wrapper {
      display: flex;
      flex-direction: column;
      gap: 32px;
      max-width: 960px;
      align-items: center;
    }

    @media (min-width: 768px) {
      .split-wrapper {
        flex-direction: row;
      }
      .reverse-flow {
        flex-direction: row-reverse;
      }
      .split-content, .split-image-holder {
        flex: 1;
      }
    }

    .split-content {
      display: flex;
      flex-direction: column;
      gap: 12px;
    }

    .p-accent {
      color: ${colors.primaryButtonBg};
      font-weight: bold;
      font-size: 0.9rem;
      text-transform: uppercase;
      letter-spacing: 0.05em;
    }

    .body-paragraphs {
      font-size: 0.95rem;
      opacity: 0.8;
      line-height: 1.6;
    }

    .split-image-holder {
      width: 100%;
    }

    .image-media {
      width: 100%;
      height: 320px;
      object-fit: cover;
      border-radius: 16px;
      border: 1px solid ${colors.dividerColor};
      box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05);
    }

    .two-col-box {
      background-color: ${colors.primaryBg};
      border: 1px solid ${colors.dividerColor};
      padding: 24px;
      border-radius: 16px;
    }

    /* Bento visual structures */
    .bento-box {
      background-color: ${colors.primaryBg};
      border: 1px solid ${colors.dividerColor};
      padding: 24px;
      border-radius: 16px;
      min-height: 160px;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
    }

    @media (min-width: 640px) {
      .bento-grid-wide {
        grid-column: span 2;
        background-color: ${colors.secondaryBg};
      }
    }

    .bento-title {
      font-family: "${typography.heading.family}", sans-serif;
      font-size: 1.15rem;
      font-weight: 700;
      color: ${colors.headingColor};
      margin-bottom: 6px;
    }

    .tag-badge {
      background-color: ${colors.primaryButtonBg};
      color: ${colors.primaryButtonText};
      font-size: 9px;
      font-weight: bold;
      padding: 4px 10px;
      border-radius: 20px;
      display: inline-block;
      margin-bottom: 12px;
      text-transform: uppercase;
    }

    /* FAQs details cards list */
    .list-holder {
      width: 100%;
      max-width: 680px;
      display: flex;
      flex-direction: column;
      gap: 12px;
    }

    .faq-row {
      background-color: ${colors.primaryBg};
      border: 1px solid ${colors.dividerColor};
      border-radius: 12px;
      padding: 16px 20px;
      text-align: left;
    }

    .faq-q {
      font-family: "${typography.heading.family}", sans-serif;
      font-weight: 700;
      font-size: 0.95rem;
      color: ${colors.headingColor};
      margin-bottom: 6px;
    }

    .faq-a {
      font-size: 0.85rem;
      opacity: 0.8;
      border-top: 1px solid ${colors.dividerColor};
      padding-top: 8px;
      margin-top: 8px;
    }

    /* CTA buttons layout */
    .cta-button {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      background-color: ${colors.primaryButtonBg};
      color: ${colors.primaryButtonText};
      text-decoration: none;
      font-weight: bold;
      font-size: 0.9rem;
      padding: 12px 28px;
      border-radius: 6px;
      box-shadow: 0 1px 3px rgba(0,0,0,0.05);
      border: none;
      cursor: pointer;
      width: fit-content;
      transition: opacity 0.2s;
    }

    .cta-button:hover {
      opacity: 0.93;
    }

    /* Bio links options style */
    .bio-list {
      display: flex;
      flex-direction: column;
      gap: 10px;
      width: 100%;
      max-width: 440px;
      margin: 0 auto;
    }

    .link-bio-row {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 14px 20px;
      background-color: ${colors.primaryBg};
      border: 1px solid ${colors.dividerColor};
      border-radius: 12px;
      text-decoration: none;
      box-shadow: 0 1px 2px rgba(0,0,0,0.02);
      transition: transform 0.2s ease, border-color 0.2s ease;
    }

    .link-bio-row:hover {
      transform: translateY(-1px);
      border-color: ${colors.primaryButtonBg};
    }

    .bio-title {
      font-family: "${typography.heading.family}", sans-serif;
      font-size: 0.9rem;
      font-weight: bold;
      color: ${colors.headingColor};
      display: block;
    }

    .bio-desc {
      font-size: 10px;
      opacity: 0.75;
      display: block;
      margin-top: 2px;
    }

    .bio-arrow {
      font-size: 12px;
      color: ${colors.primaryButtonBg};
    }

    /* Pricing Plans structures */
    .pricing-tier {
      background-color: ${colors.primaryBg};
      border: 1px solid ${colors.dividerColor};
      border-radius: 16px;
      padding: 24px;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      position: relative;
    }

    .tier-highlighted {
      box-shadow: 0 0 0 2px ${colors.primaryButtonBg};
    }

    .highlight-badge {
      position: absolute;
      top: -12px;
      left: 20px;
      background-color: ${colors.primaryButtonBg};
      color: ${colors.primaryButtonText};
      font-size: 9px;
      font-weight: bold;
      padding: 4px 12px;
      border-radius: 12px;
      text-transform: uppercase;
    }

    .price-container {
      display: flex;
      align-items: baseline;
      margin-bottom: 20px;
    }

    .price-val {
      font-family: "${typography.heading.family}", sans-serif;
      font-size: 1.8rem;
      font-weight: 800;
      color: ${colors.headingColor};
    }

    .price-sub {
      font-size: 10px;
      opacity: 0.6;
      margin-left: 6px;
    }

    .pricing-btn {
      width: 100%;
      padding: 10px;
      border-radius: 8px;
      font-size: 0.85rem;
      font-weight: bold;
      border: none;
      background-color: ${colors.secondaryButtonBg};
      color: ${colors.secondaryButtonText};
      cursor: pointer;
    }

    .primary-tier-btn {
      background-color: ${colors.primaryButtonBg};
      color: ${colors.primaryButtonText};
    }

    /* Footer layouts styling */
    .footer-layout {
      border-top: 1px solid ${colors.dividerColor};
      padding-top: 32px;
      width: 100%;
      max-width: 960px;
      display: grid;
      grid-template-columns: 1fr;
      gap: 24px;
    }

    @media (min-width: 768px) {
      .footer-layout {
        grid-template-columns: 1fr 2fr;
      }
    }

    .footer-title {
      font-family: "${typography.heading.family}", sans-serif;
      font-weight: bold;
      font-size: 1rem;
      color: ${colors.headingColor};
    }

    .footer-credit {
      font-size: 10px;
      opacity: 0.7;
    }

    .footer-columns {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 16px;
    }

    .foot-header {
      font-size: 9px;
      font-weight: bold;
      text-transform: uppercase;
      letter-spacing: 0.05em;
      opacity: 0.6;
      display: block;
      margin-bottom: 6px;
    }

    .foot-guide-item {
      font-size: 0.85rem;
      font-weight: bold;
      color: ${colors.primaryButtonBg};
      text-decoration: none;
    }

    .foot-guide-item:hover {
      text-decoration: underline;
    }
  </style>
</head>
<body>
  
  <div class="outer-section">
    ${sectionInnerHtml}
  </div>

</body>
</html>`;
  };

  const compileFullPageEmbedCode = () => {
    const activeSections = sections.filter(s => !s.hidden && resolvedSelectedIds.includes(s.id));
    if (activeSections.length === 0) {
      return `<!-- No rows selected to embed! -->
<!-- Please pick which layout blocks you want in your Page Code from the custom row builder panel below. -->`;
    }

    const fontsToLoad = Array.from(new Set([
      typography.title.family,
      typography.heading.family,
      typography.body.family
    ])).map(f => f.replace(/\s+/g, '+')).join('&family=');

    // Generate HTML for each active section
    const activeSectionsHtml = activeSections.map((sec) => {
      let sectionInnerHtml = '';

      if (sec.type === 'hero') {
        const hasCustomBg = sec.imageUrl && sec.imageUrl.trim() !== '';
        if (hasCustomBg) {
          sectionInnerHtml = `
  <div class="hero-banner-visual" style="background-image: linear-gradient(rgba(0,0,0,${((100 - (sec.bannerOpacity ?? 96)) / 100).toFixed(2)}), rgba(0,0,0,${((100 - (sec.bannerOpacity ?? 96)) / 100).toFixed(2)})), url('${sec.imageUrl}');">
    <div class="hero-container" style="background-color: rgba(255, 255, 255, ${(sec.bannerOpacity ?? 96) / 100}); padding: 40px; border-radius: 8px; border: 1px solid ${colors.dividerColor}; box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);">
      <h1 class="hero-title">${sec.title}</h1>
      ${sec.subtitle ? `<p class="hero-subtitle">${sec.subtitle}</p>` : ''}
      ${sec.content ? `<p class="hero-body">${sec.content}</p>` : ''}
      ${sec.ctaText ? `<a href="${normalizeUrl(sec.ctaUrl)}" class="cta-button" target="${getLinkTarget(sec.ctaUrl)}">${sec.ctaText}</a>` : ''}
    </div>
  </div>`;
        } else {
          sectionInnerHtml = `
  <div class="hero-container">
    <h1 class="hero-title">${sec.title}</h1>
    ${sec.subtitle ? `<p class="hero-subtitle">${sec.subtitle}</p>` : ''}
    ${sec.content ? `<p class="hero-body">${sec.content}</p>` : ''}
    ${sec.ctaText ? `<a href="${normalizeUrl(sec.ctaUrl)}" class="cta-button" target="${getLinkTarget(sec.ctaUrl)}">${sec.ctaText}</a>` : ''}
  </div>`;
        }
      } else if (sec.type === 'features') {
        const itemsHtml = sec.items?.map(item => `
      <div class="feature-card">
        <div class="custom-badge-icon">✓</div>
        <h3 class="feature-title">${item.title}</h3>
        <p class="feature-desc">${item.description}</p>
      </div>`).join('') || '';

        sectionInnerHtml = `
  <div class="center-banner">
    <h2 class="section-heading">${sec.title}</h2>
    ${sec.subtitle ? `<p class="section-lead">${sec.subtitle}</p>` : ''}
  </div>
  <div class="grid-layout-3">
    ${itemsHtml}
  </div>`;
      } else if (sec.type === 'split') {
        sectionInnerHtml = `
  <div class="split-wrapper ${sec.imagePosition === 'left' ? 'reverse-flow' : ''}">
    <div class="split-content">
      <h2 class="section-heading">${sec.title}</h2>
      ${sec.subtitle ? `<div class="p-accent">${sec.subtitle}</div>` : ''}
      <p class="body-paragraphs">${sec.content || ''}</p>
      ${sec.ctaText ? `<a href="${normalizeUrl(sec.ctaUrl)}" class="cta-button" target="${getLinkTarget(sec.ctaUrl)}">${sec.ctaText}</a>` : ''}
    </div>
    <div class="split-image-holder">
      <img src="${sec.imageUrl || 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=800&q=80'}" class="image-media" alt="Featured Media" />
    </div>
  </div>`;
      } else if (sec.type === 'two-col') {
        const colHtml = sec.items?.map(it => `
      <div class="two-col-box">
        <h3 class="feature-title" style="display:inline-block; margin-bottom:8px;">${it.title}</h3>
        <p class="feature-desc">${it.description}</p>
      </div>`).join('') || '';

        sectionInnerHtml = `
  <div class="center-banner">
    <h2 class="section-heading">${sec.title}</h2>
    ${sec.subtitle ? `<p class="section-lead">${sec.subtitle}</p>` : ''}
  </div>
  <div class="grid-layout-2">
    ${colHtml}
  </div>`;
      } else if (sec.type === 'bento') {
        const itemsHtml = sec.items?.map((it, idx) => `
      <div class="bento-box ${idx === 0 ? 'bento-grid-wide' : ''}">
        <div>
          ${it.tag ? `<span class="tag-badge">${it.tag}</span>` : ''}
          <h3 class="bento-title">${it.title}</h3>
          <p class="feature-desc">${it.description}</p>
        </div>
      </div>`).join('') || '';

        sectionInnerHtml = `
  <div class="center-banner">
    <h2 class="section-heading">${sec.title}</h2>
    ${sec.subtitle ? `<p class="section-lead">${sec.subtitle}</p>` : ''}
  </div>
  <div class="grid-layout-3">
    ${itemsHtml}
  </div>`;
      } else if (sec.type === 'faq') {
        const itemsHtml = sec.items?.map(it => `
      <div class="faq-row">
        <div class="faq-q">❓ ${it.title}</div>
        <div class="faq-a">${it.description}</div>
      </div>`).join('') || '';

        sectionInnerHtml = `
  <div class="center-banner" style="max-width: 600px; margin: 0 auto 32px auto;">
    <h2 class="section-heading">${sec.title}</h2>
    ${sec.subtitle ? `<p class="section-lead">${sec.subtitle}</p>` : ''}
  </div>
  <div class="list-holder">
    ${itemsHtml}
  </div>`;
      } else if (sec.type === 'testimonials') {
        const itemsHtml = sec.items?.map(it => `
      <div class="faq-row" style="border-radius:16px;">
        <div style="color:#fbbf24; font-size:16px; margin-bottom:8px;">★★★★★</div>
        <p class="testimonial-text">"${it.description}"</p>
        <div style="border-top:1px solid ${colors.dividerColor}; padding-top:8px; margin-top:12px; display:flex; justify-content:space-between; font-weight:bold; font-size:11px;">
          <span>${it.title}</span>
          <span style="opacity:0.6;">${it.tag || 'Client'}</span>
        </div>
      </div>`).join('') || '';

        sectionInnerHtml = `
  <div class="center-banner">
    <h2 class="section-heading">${sec.title}</h2>
    ${sec.subtitle ? `<p class="section-lead">${sec.subtitle}</p>` : ''}
  </div>
  <div class="grid-layout-2">
    ${itemsHtml}
  </div>`;
      } else if (sec.type === 'link-in-bio') {
        const itemsHtml = sec.items?.map(it => `
    <a href="${normalizeUrl(it.url)}" class="link-bio-row" target="${getLinkTarget(it.url)}">
      <div>
        <span class="bio-title">${it.title}</span>
        <span class="bio-desc">${it.description}</span>
      </div>
      <div class="bio-arrow">➔</div>
    </a>`).join('') || '';

        sectionInnerHtml = `
  <div class="center-banner" style="max-width:440px; margin:0 auto 24px auto;">
    <h3 class="section-heading">${sec.title}</h3>
    ${sec.subtitle ? `<p class="section-lead">${sec.subtitle}</p>` : ''}
  </div>
  <div class="bio-list">
    ${itemsHtml}
  </div>`;
      } else if (sec.type === 'pricing') {
        const itemsHtml = sec.items?.map(it => `
      <div class="pricing-tier ${it.tag ? 'tier-highlighted' : ''}">
        ${it.tag ? `<div class="highlight-badge">${it.tag}</div>` : ''}
        <h3 class="bento-title">${it.title}</h3>
        <p class="feature-desc" style="margin-bottom:16px;">${it.description}</p>
        <div class="price-container">
          <span class="price-val">${it.price}</span>
          <span class="price-sub">/ standard fee</span>
        </div>
        <button class="pricing-btn ${it.tag ? 'primary-tier-btn' : ''}">${it.ctaText || 'Purchase'}</button>
      </div>`).join('') || '';

        sectionInnerHtml = `
  <div class="center-banner">
    <h2 class="section-heading">${sec.title}</h2>
    ${sec.subtitle ? `<p class="section-lead">${sec.subtitle}</p>` : ''}
  </div>
  <div class="grid-layout-2" style="max-width: 680px; margin: 0 auto;">
    ${itemsHtml}
  </div>`;
      } else if (sec.type === 'footer') {
        const itemsHtml = sec.items?.map(it => `
      <div>
        <span class="foot-header">${it.title}</span>
        <a href="${normalizeUrl(it.url)}" class="foot-guide-item" target="${getLinkTarget(it.url)}">${it.description}</a>
      </div>`).join('') || '';

        sectionInnerHtml = `
  <div class="footer-layout">
    <div>
      <span class="footer-title">✦ ${sec.title}</span>
      <p class="footer-credit">${sec.subtitle || ''}</p>
    </div>
    <div class="footer-columns">
      ${itemsHtml}
    </div>
  </div>`;
      }

      return `
  <!-- Section ${sec.type.toUpperCase()}: ${sec.title} -->
  <section class="outer-section sec-${sec.type}" id="section-${sec.id}">
    ${sectionInnerHtml}
  </section>`;
    }).join('\n');

    return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Google Sites Custom Full Page Embed Code</title>
  
  <!-- Dynamically loading the selected Google Font Family -->
  <link href="https://fonts.googleapis.com/css2?family=${fontsToLoad}&display=swap" rel="stylesheet">
  
  <style>
    /* Absolute Theme Reset and Isolation */
    *, *::before, *::after {
      box-sizing: border-box;
      margin: 0;
      padding: 0;
    }
    
    html {
      height: ${pageHeightMode === 'scroll-container' ? '100%' : (pageHeightMode === 'fill-screen' ? '100%' : 'auto')};
      max-height: ${pageHeightMode === 'scroll-container' ? '100%' : 'none'};
      overflow: ${pageHeightMode === 'scroll-container' ? 'hidden' : (scrollbarMode === 'hide' ? 'hidden' : 'auto')} !important;
    }
    
    body {
      font-family: "${typography.body.family}", sans-serif;
      font-size: ${typography.body.size};
      color: ${colors.textColor};
      background-color: ${colors.primaryBg};
      line-height: 1.5;
      -webkit-font-smoothing: antialiased;
      margin: 0;
      padding: 0;
      display: flex;
      flex-direction: column;
      ${pageHeightMode === 'scroll-container' ? `
      height: 100%;
      max-height: 100%;
      overflow-y: ${scrollbarMode === 'hide' ? 'hidden' : 'auto'} !important;
      overflow-x: hidden;
      ` : pageHeightMode === 'fill-screen' ? `
      min-height: 100vh;
      overflow-y: ${scrollbarMode === 'hide' ? 'hidden' : 'auto'} !important;
      ` : pageHeightMode === 'fixed-height' ? `
      height: ${customPixelHeight}px;
      min-height: ${customPixelHeight}px;
      overflow-y: ${scrollbarMode === 'hide' ? 'hidden' : 'auto'} !important;
      ` : `
      min-height: 100%;
      height: auto;
      overflow-y: ${scrollbarMode === 'hide' ? 'hidden' : 'auto'} !important;
      `}
    }

    /* Cross-browser scrollbar fallback */
    html, body {
      scrollbar-width: ${scrollbarMode === 'hide' ? 'none' : 'thin'} !important;
      scrollbar-color: ${colors.primaryButtonBg} ${colors.secondaryBg} !important;
    }

    /* Force styling of custom scrollbar within the Google Sites embed iframe */
    ${scrollbarMode === 'styled-show' ? `
    ::-webkit-scrollbar {
      width: 10px;
      height: 10px;
    }
    ::-webkit-scrollbar-track {
      background: ${colors.secondaryBg};
    }
    ::-webkit-scrollbar-thumb {
      background-color: ${colors.primaryButtonBg};
      border-radius: 6px;
      border: 2px solid ${colors.secondaryBg};
    }
    ::-webkit-scrollbar-thumb:hover {
      background-color: ${colors.headingColor};
    }
    ` : `
    ::-webkit-scrollbar {
      display: none;
      width: 0px;
      background: transparent;
    }
    `}

    /* Full-screen aesthetic row-by-row structure */
    .outer-section {
      width: 100%;
      padding: 60px 20px;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      border-bottom: 1px solid ${colors.dividerColor};
    }

    /* Alternate section backgrounds slightly to create rich pacing */
    .sec-hero {
      background-color: ${colors.primaryBg};
    }
    .sec-features {
      background-color: ${colors.secondaryBg};
    }
    .sec-bento {
      background-color: ${colors.secondaryBg};
    }
    .sec-split {
      background-color: ${colors.primaryBg};
    }
    .sec-two-col {
      background-color: ${colors.primaryBg};
    }
    .sec-faq {
      background-color: ${colors.secondaryBg};
    }
    .sec-testimonials {
      background-color: ${colors.primaryBg};
    }
    .sec-link-in-bio {
      background-color: ${colors.primaryBg};
    }
    .sec-pricing {
      background-color: ${colors.secondaryBg};
    }
    .sec-footer {
      background-color: ${colors.primaryBg};
      border-bottom: none;
      padding: 48px 20px;
    }

    /* Core Utility Classes mapped from designer properties */
    .hero-container {
      text-align: center;
      max-width: 800px;
      margin: 0 auto;
    }

    .hero-banner-visual {
      width: 100%;
      background-size: cover;
      background-position: center;
      min-height: 480px;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 40px 20px;
      border-radius: 12px;
      margin: 0 auto;
      max-width: 1100px;
    }

    .hero-title {
      font-family: "${typography.title.family}", sans-serif;
      font-weight: ${typography.title.weight};
      font-size: ${typography.title.size};
      color: ${colors.headingColor};
      letter-spacing: ${typography.title.letterSpacing};
      line-height: 1.15;
      margin-bottom: 16px;
    }

    .hero-subtitle {
      font-size: 1.1rem;
      opacity: 0.85;
      margin-bottom: 24px;
      max-width: 600px;
      margin-left: auto;
      margin-right: auto;
    }

    .hero-body {
      font-size: 0.9rem;
      opacity: 0.65;
      margin-bottom: 24px;
    }

    .section-heading {
      font-family: "${typography.heading.family}", sans-serif;
      font-weight: ${typography.heading.weight};
      font-size: ${typography.heading.size};
      color: ${colors.headingColor};
      letter-spacing: ${typography.heading.letterSpacing};
      line-height: 1.25;
      margin-bottom: 12px;
    }

    .section-lead {
      font-size: 0.95rem;
      opacity: 0.75;
      margin-bottom: 32px;
    }

    .center-banner {
      text-align: center;
      margin-bottom: 32px;
    }

    /* Column Symmetrical Layouts */
    .grid-layout-3 {
      display: grid;
      grid-template-columns: repeat(1, minmax(0, 1fr));
      gap: 20px;
      width: 100%;
      max-width: 960px;
    }

    .grid-layout-2 {
      display: grid;
      grid-template-columns: repeat(1, minmax(0, 1fr));
      gap: 20px;
      width: 100%;
      max-width: 960px;
    }

    @media (min-width: 640px) {
      .grid-layout-3 {
        grid-template-columns: repeat(3, minmax(0, 1fr));
      }
      .grid-layout-2 {
        grid-template-columns: repeat(2, minmax(0, 1fr));
      }
    }

    .feature-card {
      background-color: ${colors.primaryBg};
      border: 1px solid ${colors.dividerColor};
      padding: 24px;
      border-radius: 12px;
      transition: border-color 0.2s ease;
    }

    .custom-badge-icon {
      width: 32px;
      height: 32px;
      background-color: ${colors.secondaryBg};
      color: ${colors.primaryButtonBg};
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-weight: bold;
      font-size: 14px;
      margin-bottom: 16px;
    }

    .feature-title {
      font-family: "${typography.heading.family}", sans-serif;
      font-size: 1.1rem;
      font-weight: 700;
      color: ${colors.headingColor};
      margin-bottom: 8px;
    }

    .feature-desc {
      font-size: 0.85rem;
      opacity: 0.8;
      line-height: 1.5;
    }

    /* Asymmetric Split Columns */
    .split-wrapper {
      display: flex;
      flex-direction: column;
      gap: 32px;
      max-width: 960px;
      align-items: center;
    }

    @media (min-width: 768px) {
      .split-wrapper {
        flex-direction: row;
      }
      .reverse-flow {
        flex-direction: row-reverse;
      }
      .split-content, .split-image-holder {
        flex: 1;
      }
    }

    .split-content {
      display: flex;
      flex-direction: column;
      gap: 12px;
    }

    .p-accent {
      color: ${colors.primaryButtonBg};
      font-weight: bold;
      font-size: 0.9rem;
      text-transform: uppercase;
      letter-spacing: 0.05em;
    }

    .body-paragraphs {
      font-size: 0.95rem;
      opacity: 0.8;
      line-height: 1.6;
    }

    .split-image-holder {
      width: 100%;
    }

    .image-media {
      width: 100%;
      height: 320px;
      object-fit: cover;
      border-radius: 16px;
      border: 1px solid ${colors.dividerColor};
      box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05);
    }

    .two-col-box {
      background-color: ${colors.primaryBg};
      border: 1px solid ${colors.dividerColor};
      padding: 24px;
      border-radius: 16px;
    }

    /* Bento visual structures */
    .bento-box {
      background-color: ${colors.primaryBg};
      border: 1px solid ${colors.dividerColor};
      padding: 24px;
      border-radius: 16px;
      min-height: 160px;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
    }

    @media (min-width: 640px) {
      .bento-grid-wide {
        grid-column: span 2;
        background-color: ${colors.secondaryBg};
      }
    }

    .bento-title {
      font-family: "${typography.heading.family}", sans-serif;
      font-size: 1.15rem;
      font-weight: 700;
      color: ${colors.headingColor};
      margin-bottom: 6px;
    }

    .tag-badge {
      background-color: ${colors.primaryButtonBg};
      color: ${colors.primaryButtonText};
      font-size: 9px;
      font-weight: bold;
      padding: 4px 10px;
      border-radius: 20px;
      display: inline-block;
      margin-bottom: 12px;
      text-transform: uppercase;
    }

    /* FAQs details cards list */
    .list-holder {
      width: 100%;
      max-width: 680px;
      display: flex;
      flex-direction: column;
      gap: 12px;
    }

    .faq-row {
      background-color: ${colors.primaryBg};
      border: 1px solid ${colors.dividerColor};
      border-radius: 12px;
      padding: 16px 20px;
      text-align: left;
    }

    .faq-q {
      font-family: "${typography.heading.family}", sans-serif;
      font-weight: 700;
      font-size: 0.95rem;
      color: ${colors.headingColor};
      margin-bottom: 6px;
    }

    .faq-a {
      font-size: 0.85rem;
      opacity: 0.8;
      border-top: 1px solid ${colors.dividerColor};
      padding-top: 8px;
      margin-top: 8px;
    }

    /* CTA buttons layout */
    .cta-button {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      background-color: ${colors.primaryButtonBg};
      color: ${colors.primaryButtonText};
      text-decoration: none;
      font-weight: bold;
      font-size: 0.9rem;
      padding: 12px 28px;
      border-radius: 6px;
      box-shadow: 0 1px 3px rgba(0,0,0,0.05);
      border: none;
      cursor: pointer;
      width: fit-content;
      transition: opacity 0.2s;
    }

    .cta-button:hover {
      opacity: 0.93;
    }

    /* Bio links options style */
    .bio-list {
      display: flex;
      flex-direction: column;
      gap: 10px;
      width: 100%;
      max-width: 440px;
      margin: 0 auto;
    }

    .link-bio-row {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 14px 20px;
      background-color: ${colors.primaryBg};
      border: 1px solid ${colors.dividerColor};
      border-radius: 12px;
      text-decoration: none;
      box-shadow: 0 1px 2px rgba(0,0,0,0.02);
      transition: transform 0.2s ease, border-color 0.2s ease;
    }

    .link-bio-row:hover {
      transform: translateY(-1px);
      border-color: ${colors.primaryButtonBg};
    }

    .bio-title {
      font-family: "${typography.heading.family}", sans-serif;
      font-size: 0.9rem;
      font-weight: bold;
      color: ${colors.headingColor};
      display: block;
    }

    .bio-desc {
      font-size: 10px;
      opacity: 0.75;
      display: block;
      margin-top: 2px;
    }

    .bio-arrow {
      font-size: 12px;
      color: ${colors.primaryButtonBg};
    }

    /* Pricing Plans structures */
    .pricing-tier {
      background-color: ${colors.primaryBg};
      border: 1px solid ${colors.dividerColor};
      border-radius: 16px;
      padding: 24px;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      position: relative;
    }

    .tier-highlighted {
      box-shadow: 0 0 0 2px ${colors.primaryButtonBg};
    }

    .highlight-badge {
      position: absolute;
      top: -12px;
      left: 20px;
      background-color: ${colors.primaryButtonBg};
      color: ${colors.primaryButtonText};
      font-size: 9px;
      font-weight: bold;
      padding: 4px 12px;
      border-radius: 12px;
      text-transform: uppercase;
    }

    .price-container {
      display: flex;
      align-items: baseline;
      margin-bottom: 20px;
    }

    .price-val {
      font-family: "${typography.heading.family}", sans-serif;
      font-size: 1.8rem;
      font-weight: 800;
      color: ${colors.headingColor};
    }

    .price-sub {
      font-size: 10px;
      opacity: 0.6;
      margin-left: 6px;
    }

    .pricing-btn {
      width: 100%;
      padding: 10px;
      border-radius: 8px;
      font-size: 0.85rem;
      font-weight: bold;
      border: none;
      background-color: ${colors.secondaryButtonBg};
      color: ${colors.secondaryButtonText};
      cursor: pointer;
    }

    .primary-tier-btn {
      background-color: ${colors.primaryButtonBg};
      color: ${colors.primaryButtonText};
    }

    /* Footer layouts styling */
    .footer-layout {
      padding-top: 10px;
      width: 100%;
      max-width: 960px;
      display: grid;
      grid-template-columns: 1fr;
      gap: 24px;
    }

    @media (min-width: 768px) {
      .footer-layout {
        grid-template-columns: 1fr 2fr;
      }
    }

    .footer-title {
      font-family: "${typography.heading.family}", sans-serif;
      font-weight: bold;
      font-size: 1rem;
      color: ${colors.headingColor};
    }

    .footer-credit {
      font-size: 10px;
      opacity: 0.7;
    }

    .footer-columns {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 16px;
    }

    .foot-header {
      font-size: 9px;
      font-weight: bold;
      text-transform: uppercase;
      letter-spacing: 0.05em;
      opacity: 0.6;
      display: block;
      margin-bottom: 6px;
    }

    .foot-guide-item {
      font-size: 0.85rem;
      font-weight: bold;
      color: ${colors.primaryButtonBg};
      text-decoration: none;
    }

    .foot-guide-item:hover {
      text-decoration: underline;
    }
  </style>
</head>
<body>
  ${activeSectionsHtml}
</body>
</html>`;
  };

  const selectedEmbedSec = sections.find(s => s.id === selectedEmbedSecId) || sections[0];
  const compiledEmbedCode = selectedEmbedSec ? compileSectionEmbedCode(selectedEmbedSec) : '';

  // File Download simulation triggers
  const triggerDownloadObj = (fileName: string, content: string) => {
    const mimeType = fileName.endsWith('.json') ? 'application/json' : 'text/html';
    const blob = new Blob([content], { type: mimeType + ';charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', fileName);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-md p-5 mt-6" id="export-panel">
      {/* Exporter Section Title */}
      <div className="flex flex-col md:flex-row md:items-center justify-between pb-4 border-b border-slate-100 mb-4 gap-2">
        <h2 className="text-md font-bold text-slate-800 flex items-center gap-2">
          <FileCode className="w-5 h-5 text-indigo-600" />
          Google Sites Theme Export Panel
        </h2>

        {/* View tab switches */}
        <div className="flex gap-1.5 bg-slate-550/5 p-1 rounded-lg border border-slate-200">
          <button
            onClick={() => setActiveTab('json')}
            className={`p-1 px-3 text-xs rounded font-bold transition flex items-center gap-1 cursor-pointer focus:outline-none ${activeTab === 'json' ? 'bg-indigo-600 text-white' : 'text-slate-600 hover:bg-slate-100'}`}
            id="tab-export-json"
          >
            <Settings className="w-3.5 h-3.5" />
            Sites JSON Theme
          </button>
          <button
            onClick={() => setActiveTab('css')}
            className={`p-1 px-3 text-xs rounded font-bold transition flex items-center gap-1 cursor-pointer focus:outline-none ${activeTab === 'css' ? 'bg-indigo-600 text-white' : 'text-slate-600 hover:bg-slate-100'}`}
            id="tab-export-css"
          >
            <Terminal className="w-3.5 h-3.5" />
            CSS Variables
          </button>
          <button
            onClick={() => setActiveTab('html-embed')}
            className={`p-1 px-3 text-xs rounded font-bold transition flex items-center gap-1 cursor-pointer focus:outline-none ${activeTab === 'html-embed' ? 'bg-indigo-600 text-white' : 'text-slate-600 hover:bg-slate-100'}`}
            id="tab-export-embed"
          >
            <Layers className="w-3.5 h-3.5" />
            Embed Elements
          </button>
          <button
            onClick={() => setActiveTab('html-full')}
            className={`p-1 px-3 text-xs rounded font-bold transition flex items-center gap-1 cursor-pointer focus:outline-none ${activeTab === 'html-full' ? 'bg-indigo-600 text-white' : 'text-slate-600 hover:bg-slate-100'}`}
            id="tab-export-embed-full"
          >
            <Layers className="w-3.5 h-3.5 text-emerald-500" />
            Full Page Embed
          </button>
          <button
            onClick={() => setActiveTab('guide')}
            className={`p-1 px-3 text-xs rounded font-bold transition flex items-center gap-1 cursor-pointer focus:outline-none ${activeTab === 'guide' ? 'bg-indigo-600 text-white' : 'text-slate-600 hover:bg-slate-100'}`}
            id="tab-export-guide"
          >
            <BookOpen className="w-3.5 h-3.5" />
            Implementation Guide
          </button>
        </div>
      </div>

      {/* Exporter content compartments layout */}
      {activeTab === 'json' && (
        <div className="space-y-3 animation-fade-in text-left">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-xs font-bold text-slate-700">Google Sites Theme JSON Properties</h3>
              <p className="text-[11px] text-slate-400">Map this structured data package inside Custom Theme properties lists on your editor.</p>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => handleCopyText('json', jsonString)}
                className="p-1 px-3 border border-slate-200 hover:border-slate-350 bg-slate-50 rounded text-xs font-semibold text-slate-700 flex items-center gap-1.5 focus:outline-none"
                id="btn-copy-json"
              >
                {copiedId === 'json' ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
                {copiedId === 'json' ? 'Copied' : 'Copy Theme'}
              </button>
              <button
                onClick={() => triggerDownloadObj('google-sites-custom-theme.json', jsonString)}
                className="p-1 px-3 bg-indigo-600 hover:bg-indigo-700 rounded text-xs font-bold text-white flex items-center gap-1.5 focus:outline-none cursor-pointer"
                id="btn-download-json"
              >
                <Download className="w-3.5 h-3.5" />
                Download JSON
              </button>
            </div>
          </div>
          <pre className="bg-slate-900 border border-slate-950 p-4 rounded-xl text-[11px] font-mono text-indigo-200 overflow-x-auto max-h-[350px]">
            {jsonString}
          </pre>
        </div>
      )}

      {activeTab === 'css' && (
        <div className="space-y-3 animation-fade-in text-left">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-xs font-bold text-slate-700">Custom CSS Palette Variables</h3>
              <p className="text-[11px] text-slate-400">Perfect matching styling tokens for custom layout integration stylesheets.</p>
            </div>
            <button
              onClick={() => handleCopyText('css', cssVariablesString)}
              className="p-1 px-3 border border-slate-200 hover:border-slate-350 bg-slate-50 rounded text-xs font-semibold text-slate-700 flex items-center gap-1.5 focus:outline-none"
              id="btn-copy-css"
            >
              {copiedId === 'css' ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
              {copiedId === 'css' ? 'Copied' : 'Copy Stylesheet'}
            </button>
          </div>
          <pre className="bg-slate-900 border border-slate-950 p-4 rounded-xl text-[11px] font-mono text-amber-250 overflow-x-auto max-h-[350px]">
            {cssVariablesString}
          </pre>
        </div>
      )}

      {activeTab === 'html-embed' && (
        <div className="space-y-4 animation-fade-in text-left">
          <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="space-y-0.5">
              <span className="text-[10px] uppercase font-extrabold text-slate-400 tracking-wider">Select Component Layer to Embed</span>
              <div className="flex items-center gap-2">
                <select
                  value={selectedEmbedSecId}
                  onChange={(e) => setSelectedEmbedSecId(e.target.value)}
                  className="bg-white border border-slate-250 rounded p-1 px-2.5 text-xs font-bold text-slate-700 outline-none"
                  id="select-embed-row"
                >
                  {sections.map((s, idx) => (
                    <option key={s.id} value={s.id}>
                      {idx + 1}. {s.title || 'Untitled Section'} ({s.type})
                    </option>
                  ))}
                </select>
                {sections.length === 0 && (
                  <span className="text-[10px] text-rose-500 font-bold uppercase">No rows created</span>
                )}
              </div>
            </div>

            <button
              disabled={sections.length === 0}
              onClick={() => handleCopyText('embed', compiledEmbedCode)}
              className="p-1.5 px-3 bg-indigo-600 hover:bg-indigo-700 disabled:opacity-40 disabled:pointer-events-none rounded text-xs font-bold text-white flex items-center gap-1.5 focus:outline-none cursor-pointer self-start sm:self-center"
              id="btn-copy-embed-code"
            >
              {copiedId === 'embed' ? <Check className="w-3.5 h-3.5 text-white" /> : <Copy className="w-3.5 h-3.5" />}
              {copiedId === 'embed' ? 'Copied HTML!' : 'Copy Embed Code'}
            </button>
          </div>

          <p className="text-[11px] text-slate-500 italic block">
            <strong>Usage instructions:</strong> In your Google Sites editor, select <strong>Insert</strong> (right tab) &gt; click <strong>Embed</strong> &gt; open the <strong>Embed Code</strong> tab &gt; paste this compiled code &gt; drag container frame handles to stretch full-width.
          </p>

          <pre className="bg-slate-900 border border-slate-950 p-4 rounded-xl text-[11px] font-mono text-emerald-250 overflow-x-auto max-h-[300px]">
            {compiledEmbedCode}
          </pre>
        </div>
      )}

      {activeTab === 'html-full' && (
        <div className="space-y-4 animation-fade-in text-left">
          <div className="p-3.5 bg-emerald-50/50 border border-emerald-150 rounded-xl flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="space-y-0.5">
              <span className="text-[10px] uppercase font-extrabold text-emerald-700 tracking-wider flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                Full Page Sub-Page Compiler
              </span>
              <h4 className="text-xs font-bold text-slate-800">Export Chosen Row Elements ({resolvedSelectedIds.length} blocks compiled)</h4>
              <p className="text-[11.5px] text-slate-500">Perfect for rendering entire seamless custom landing/sub-pages within a Google Sites full page EMBED iframe frame.</p>
            </div>

            <div className="flex flex-wrap gap-2 shrink-0">
              <button
                disabled={resolvedSelectedIds.length === 0}
                onClick={() => handleCopyText('fullpage', compileFullPageEmbedCode())}
                className="p-1.5 px-3 border border-slate-200 hover:border-slate-350 bg-white font-bold rounded text-xs text-slate-700 flex items-center gap-1.5 focus:outline-none cursor-pointer disabled:opacity-40"
                id="btn-copy-fullpage-code"
              >
                {copiedId === 'fullpage' ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                {copiedId === 'fullpage' ? 'Copied Full HTML!' : 'Copy Page Code'}
              </button>
              <button
                disabled={resolvedSelectedIds.length === 0}
                onClick={() => triggerDownloadObj('google-sites-embed-page.html', compileFullPageEmbedCode())}
                className="p-1.5 px-3 bg-indigo-600 hover:bg-indigo-700 disabled:opacity-40 disabled:pointer-events-none rounded text-xs font-bold text-white flex items-center gap-1.5 focus:outline-none cursor-pointer"
                id="btn-download-fullpage"
              >
                <Download className="w-3.5 h-3.5" />
                Download Sub-Page HTML
              </button>
            </div>
          </div>

          {/* Google Sites Scroll Limitation Note */}
          <div className="p-3.5 bg-amber-50 border border-amber-200 rounded-xl flex items-start gap-2.5 text-amber-900 shadow-xs">
            <span className="text-base select-none mt-0.5" role="img" aria-label="warning">💡</span>
            <div className="space-y-0.5">
              <h5 className="text-[11.5px] font-extrabold text-amber-950 uppercase tracking-wide">Google Sites Editor & Preview Note</h5>
              <p className="text-[11.5px] text-amber-800 leading-normal">
                The **Google Sites sandbox preview window (unpublished editor view after saving)** is known to restrict custom scrolling height, hiding some of your deeper elements inside the draft browser framework. This is a standard Google security sandboxing behavior. **Rest assured: once you Publish your Google Site, the entire compiled page scrolls perfectly and renders flawlessly.**
              </p>
            </div>
          </div>

          {/* Sizing & Viewport Heights Controls */}
          <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 space-y-3">
            <div>
              <span className="text-[10px] font-extrabold uppercase text-slate-500 tracking-wider">📏 Custom Height & Screen Fitting Settings</span>
              <h5 className="font-bold text-slate-800 text-xs">Prevent Google Sites Content Truncation</h5>
              <p className="text-[11px] text-slate-500">Google Sites embeds default to limited heights and hide standard scrollbars if the iframe is longer than the browser slot. Force a set pixel canvas size or auto-scaling screen to ensure all blocks render beautifully.</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 pt-1">
              <div className="bg-white border border-slate-200 rounded-lg p-3 space-y-2 lg:col-span-6">
                <span className="text-[10.5px] font-bold text-slate-700 block">Height Scaling Mode</span>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={() => setPageHeightMode('scroll-container')}
                    type="button"
                    className={`py-1.5 px-3 rounded text-[11.5px] font-bold transition focus:outline-none cursor-pointer border flex flex-col items-center justify-center text-center gap-0.5 ${pageHeightMode === 'scroll-container' ? 'bg-indigo-600 text-white border-indigo-600 shadow-sm' : 'bg-slate-50 hover:bg-slate-100 text-slate-700 border-slate-200'}`}
                    title="Wraps page in an inner-canvas scrollbox. Resolves Google Sites' strict cutoff bugs perfectly!"
                  >
                    <span>🚀 Scroll Viewport</span>
                    <span className={`text-[9px] font-normal ${pageHeightMode === 'scroll-container' ? 'text-indigo-100' : 'text-slate-550'}`}>(Fix Cuts / Recommended)</span>
                  </button>
                  <button
                    onClick={() => setPageHeightMode('natural')}
                    type="button"
                    className={`py-1.5 px-3 rounded text-[11.5px] font-bold transition focus:outline-none cursor-pointer border flex flex-col items-center justify-center text-center gap-0.5 ${pageHeightMode === 'natural' ? 'bg-indigo-600 text-white border-indigo-600 shadow-sm' : 'bg-slate-50 hover:bg-slate-100 text-slate-700 border-slate-200'}`}
                  >
                    <span>Auto Natural Flow</span>
                    <span className={`text-[9px] font-normal ${pageHeightMode === 'natural' ? 'text-indigo-100' : 'text-slate-550'}`}>(No restrictions)</span>
                  </button>
                  <button
                    onClick={() => setPageHeightMode('fill-screen')}
                    type="button"
                    className={`py-1.5 px-3 rounded text-[11.5px] font-bold transition focus:outline-none cursor-pointer border flex flex-col items-center justify-center text-center gap-0.5 ${pageHeightMode === 'fill-screen' ? 'bg-indigo-600 text-white border-indigo-600 shadow-sm' : 'bg-slate-50 hover:bg-slate-100 text-slate-700 border-slate-200'}`}
                  >
                    <span>Fill Viewport</span>
                    <span className={`text-[9px] font-normal ${pageHeightMode === 'fill-screen' ? 'text-indigo-100' : 'text-slate-550'}`}>(100vh window height)</span>
                  </button>
                  <button
                    onClick={() => setPageHeightMode('fixed-height')}
                    type="button"
                    className={`py-1.5 px-3 rounded text-[11.5px] font-bold transition focus:outline-none cursor-pointer border flex flex-col items-center justify-center text-center gap-0.5 ${pageHeightMode === 'fixed-height' ? 'bg-indigo-600 text-white border-indigo-600 shadow-sm' : 'bg-slate-50 hover:bg-slate-100 text-slate-700 border-slate-200'}`}
                  >
                    <span>Fixed Canvas Size</span>
                    <span className={`text-[9px] font-normal ${pageHeightMode === 'fixed-height' ? 'text-indigo-100' : 'text-slate-550'}`}>(Drag custom pixels slider)</span>
                  </button>
                </div>
              </div>

              <div className={`bg-white border border-slate-200 rounded-lg p-3 space-y-2 lg:col-span-3 transition-opacity ${pageHeightMode === 'fixed-height' ? 'opacity-100' : 'opacity-40 pointer-events-none'}`}>
                <div className="flex justify-between items-center">
                  <span className="text-[10.5px] font-bold text-slate-700">Set Custom Height</span>
                  <span className="text-[10.5px] font-mono font-bold text-indigo-600 bg-indigo-50 px-1.5 py-0.5 rounded border border-indigo-100">{customPixelHeight}px</span>
                </div>
                
                <div className="flex items-center gap-2">
                  <input
                    type="range"
                    min={800}
                    max={12000}
                    step={100}
                    value={customPixelHeight}
                    disabled={pageHeightMode !== 'fixed-height'}
                    onChange={(e) => setCustomPixelHeight(Number(e.target.value))}
                    className="w-full accent-indigo-600 h-1.5 bg-slate-100 rounded-lg appearance-none cursor-pointer"
                  />
                </div>

                <div className="flex justify-between text-[8px] text-slate-400 font-bold">
                  <span>800px (Compact)</span>
                  <span>12,000px (Tall Canvas)</span>
                </div>
              </div>

              <div className="bg-white border border-slate-200 rounded-lg p-3 space-y-2 lg:col-span-3">
                <span className="text-[10.5px] font-bold text-slate-700 block">Iframe Scrollbars (Forced)</span>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={() => setScrollbarMode('styled-show')}
                    type="button"
                    className={`py-1.5 px-2 rounded text-[11px] font-bold transition focus:outline-none cursor-pointer border ${scrollbarMode === 'styled-show' ? 'bg-indigo-600 text-white border-indigo-600' : 'bg-slate-50 hover:bg-slate-100 text-slate-700 border-slate-200'}`}
                  >
                    Show Scrollbars
                  </button>
                  <button
                    onClick={() => setScrollbarMode('hide')}
                    type="button"
                    className={`py-1.5 px-2 rounded text-[11px] font-bold transition focus:outline-none cursor-pointer border ${scrollbarMode === 'hide' ? 'bg-indigo-600 text-white border-indigo-600' : 'bg-slate-50 hover:bg-slate-100 text-slate-700 border-slate-200'}`}
                  >
                    Hide Scrollbars
                  </button>
                </div>
              </div>
            </div>

            {/* Google Sites Sizing Optimizer block */}
            <div className="bg-slate-100/85 border border-slate-200/90 rounded-lg p-3 flex flex-col md:flex-row md:items-center justify-between gap-3 text-left">
              <div className="space-y-0.5">
                <span className="text-[9px] font-black uppercase text-indigo-700 tracking-wider">🔬 Google Sites Resizer Optimizer</span>
                <div className="flex flex-wrap items-center gap-1.5">
                  <span className="text-xs font-bold text-slate-800">Selected Layout Height Estimate:</span>
                  <span className="text-xs font-mono font-black text-indigo-700 bg-white border border-indigo-150 px-1.5 py-0.5 rounded shadow-xs">{estimatedHeight}px</span>
                </div>
                <p className="text-[10.5px] text-slate-500 leading-relaxed max-w-xl">
                  Your active layout elements run deep. For an elegant **scrollbar-free render** within Google Sites, select **Fixed Canvas Size** mode and click the apply button. Then in your Google Sites editor, simply pull the bottom iframe resizing handle down until all elements fit perfectly.
                </p>
              </div>
              <button
                onClick={() => {
                  setPageHeightMode('fixed-height');
                  setCustomPixelHeight(estimatedHeight);
                }}
                type="button"
                className="px-3.5 py-2 bg-indigo-600 hover:bg-indigo-700 hover:shadow-xs text-white rounded text-xs font-extrabold focus:outline-none cursor-pointer transition shrink-0 border border-indigo-700"
              >
                Apply Height: {estimatedHeight}px
              </button>
            </div>

            {pageHeightMode === 'fixed-height' && (
              <div className="flex flex-wrap gap-1 bg-indigo-50/40 p-2 rounded border border-indigo-100/60 items-center">
                <span className="text-[10px] font-bold text-indigo-700 mr-2">💡 Quick height templates:</span>
                {[
                  { label: "1800px (Recommended)", val: 1800 },
                  { label: "3000px (Tall)", val: 3000 },
                  { label: "4500px (Extra Tall)", val: 4500 },
                  { label: "6500px (Long Landing)", val: 6500 },
                  { label: "8500px (Deep Page)", val: 8500 },
                  { label: "11000px (Max Height)", val: 11000 }
                ].map(item => (
                  <button
                    key={item.label}
                    onClick={() => setCustomPixelHeight(item.val)}
                    disabled={pageHeightMode !== 'fixed-height'}
                    type="button"
                    className="px-2 py-0.5 bg-white hover:bg-slate-100 border border-slate-200 text-slate-600 rounded text-[9px] font-bold focus:outline-none cursor-pointer transition"
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Core Feature: Sub-Page Interactive Selector Grid */}
          <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 space-y-3">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-200/60 pb-2">
              <div>
                <span className="text-[10px] font-extrabold uppercase text-slate-500 tracking-wider">🛠️ Interactive Layout Builder</span>
                <h5 className="font-bold text-slate-800 text-xs">Choose Blocks to Add</h5>
              </div>
              <div className="flex flex-wrap gap-1.5 shrink-0">
                <button
                  onClick={() => setSelectedFullPageSecIds(activeSectionsAll.map(s => s.id))}
                  className="px-2.5 py-1 bg-white hover:bg-slate-100 border border-slate-200 text-slate-700 rounded text-[10px] font-bold focus:outline-none cursor-pointer transition"
                >
                  Select All
                </button>
                <button
                  onClick={() => setSelectedFullPageSecIds([])}
                  className="px-2.5 py-1 bg-white hover:bg-slate-100 border border-slate-200 text-slate-700 rounded text-[10px] font-bold focus:outline-none cursor-pointer transition"
                >
                  Deselect All
                </button>
                <button
                  onClick={() => setSelectedFullPageSecIds(activeSectionsAll.filter(s => s.type !== 'hero').map(s => s.id))}
                  className="px-2.5 py-1 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 rounded text-[10px] font-bold focus:outline-none cursor-pointer transition"
                >
                  ✨ Sub-Page (No Hero)
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 max-h-[220px] overflow-y-auto pr-1">
              {activeSectionsAll.map((sec, idx) => {
                const isSelected = resolvedSelectedIds.includes(sec.id);
                return (
                  <div
                    key={sec.id}
                    onClick={() => {
                      if (isSelected) {
                        setSelectedFullPageSecIds(resolvedSelectedIds.filter(id => id !== sec.id));
                      } else {
                        setSelectedFullPageSecIds([...resolvedSelectedIds, sec.id]);
                      }
                    }}
                    className={`p-2.5 border rounded-lg cursor-pointer transition flex items-center gap-3 select-none ${isSelected ? 'bg-indigo-50/50 border-indigo-300 ring-1 ring-indigo-400/10' : 'bg-white border-slate-200 hover:border-slate-350 hover:bg-slate-50/40'}`}
                  >
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        checked={isSelected}
                        onChange={() => {}} // Swallowed: Click container handles toggle
                        className="h-3.5 w-3.5 accent-indigo-600 rounded cursor-pointer"
                      />
                    </div>
                    <div className="space-y-0.5 leading-tight min-w-0">
                      <div className="flex items-center gap-1.5 flex-wrap">
                        <span className="text-[10px] font-bold px-1.5 py-0.2 bg-slate-100 text-slate-600 rounded uppercase tracking-wider">
                          Row {idx + 1}
                        </span>
                        <span className="text-[9px] font-bold text-indigo-600 lowercase bg-indigo-50/50 px-1 py-0.2 rounded-sm border border-indigo-100/50">
                          {sec.type}
                        </span>
                      </div>
                      <h6 className="text-[11.5px] font-bold text-slate-800 truncate" title={sec.title}>
                        {sec.title || `Untitled ${sec.type}`}
                      </h6>
                    </div>
                  </div>
                );
              })}
              {activeSectionsAll.length === 0 && (
                <div className="col-span-full text-center py-6 text-slate-500 bg-white border border-dashed border-slate-200 rounded-lg">
                  No active blocks available. Add or enable rows in the sidebar to start designing your sub-page templates!
                </div>
              )}
            </div>
          </div>

          <div className="text-[11px] text-slate-600 leading-relaxed bg-slate-50 p-3.5 border border-slate-200/80 rounded-xl space-y-1">
            <h5 className="font-bold text-indigo-700 mb-1 flex items-center gap-1">
              <span>🚀</span> Beginners Guide: How to deploy this sub-page in Google Sites
            </h5>
            <ol className="list-decimal pl-4 space-y-1 text-slate-600">
              <li>In Google Sites editor, open the <strong>Pages</strong> tab in the right panel and click the <strong>"+"</strong> button at the bottom.</li>
              <li>Hover and select the <strong>"Full page embed"</strong> option (symbolised by developer brackets <code>&lt;/&gt;</code>).</li>
              <li>Name your custom sub-page (e.g., <em>"Our Services"</em> or <em>"Contact Us"</em>) and click <strong>Done</strong>.</li>
              <li>On the new blank page, click the blue <strong>"Add Embed"</strong> button in the middle &gt; open the <strong>"Embed Code"</strong> tab.</li>
              <li>Paste the compiled page code from below (click <strong>Copy Page Code</strong> or open your downloaded file) and hit <strong>Next &gt; Insert</strong>!</li>
            </ol>
          </div>

          <pre className="bg-slate-900 border border-slate-950 p-4 rounded-xl text-[11px] font-mono text-emerald-250 overflow-x-auto max-h-[350px]">
            {compileFullPageEmbedCode()}
          </pre>
        </div>
      )}

      {activeTab === 'guide' && (
        <div className="space-y-4 text-slate-700 text-xs animation-fade-in text-left">
          <div className="bg-emerald-50 border border-emerald-150 p-3 rounded-xl flex gap-2">
            <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
            <div>
              <h4 className="text-xs font-bold text-emerald-800">Ready to Deploy Style Guidelines</h4>
              <p className="text-[11px] text-emerald-700">Follow these concrete checklists to bring this theme fully into your Google Sites dashboard.</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2 p-3.5 bg-slate-50 border border-slate-150 rounded-xl">
              <span className="text-[10px] font-extrabold text-indigo-600 uppercase tracking-wider block">Phase 1: Setting up Custom Theme</span>
              <ul className="space-y-2 text-[11px] text-slate-600 relative">
                <li className="flex gap-1.5">
                  <span className="text-indigo-600 font-bold">1.</span>
                  <span>Open your target dashboard in <strong>Google Sites</strong>.</span>
                </li>
                <li className="flex gap-1.5">
                  <span className="text-indigo-600 font-bold">2.</span>
                  <span>Choose the <strong>Themes</strong> panel on the top-right options sidebar drawer.</span>
                </li>
                <li className="flex gap-1.5">
                  <span className="text-indigo-600 font-bold">3.</span>
                  <span>Click the <strong>Plus (+) Custom Theme</strong> icon to begin.</span>
                </li>
                <li className="flex gap-1.5">
                  <span className="text-indigo-600 font-bold">4.</span>
                  <span>Set a Name, then copy the <strong>Primary Brand</strong> hex code ({colors.primaryButtonBg}) and <strong>Background</strong> hex code ({colors.primaryBg}) from our colors sidebar into the palette fields.</span>
                </li>
              </ul>
            </div>

            <div className="space-y-2 p-3.5 bg-slate-50 border border-slate-150 rounded-xl">
              <span className="text-[10px] font-extrabold text-indigo-600 uppercase tracking-wider block">Phase 2: Applying Textures & Fonts</span>
              <ul className="space-y-2 text-[11px] text-slate-600 relative">
                <li className="flex gap-1.5">
                  <span className="text-indigo-600 font-bold">1.</span>
                  <span>Choose the <strong>Google Fonts list</strong> and pick <strong>{typography.title.family}</strong> for your Title scales, and <strong>{typography.body.family}</strong> for body paragraphs.</span>
                </li>
                <li className="flex gap-1.5">
                  <span className="text-indigo-600 font-bold">2.</span>
                  <span>Click the Create button. In the sidebar customization panel, navigate to <strong>Spacing & Typography</strong> settings to fine-tune.</span>
                </li>
                <li className="flex gap-1.5">
                  <span className="text-indigo-600 font-bold">3.</span>
                  <span>For gorgeous customizable layout segments (like faqs, bento showcases, links lists, split banners), toggle the <strong>Embed Elements</strong> tab above, copy the code box, and insert anywhere using Google Sites Embed feature card.</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
