import React, { useState } from 'react';
import { ColorPalette, normalizeColors } from '../types';
import { Sliders, RefreshCw, Palette, ChevronDown, ChevronUp, Layers, Type, AppWindow, Sparkles } from 'lucide-react';

interface ColorControlsProps {
  colors: ColorPalette;
  onChange: (colors: ColorPalette) => void;
}

const PALETTE_TEMPLATES = [
  {
    name: 'Vanilla Cream',
    colors: {
      primaryBg: '#FDFBF7',
      secondaryBg: '#F5ECE1',
      tertiaryBg: '#E8DEC9',
      textColor: '#3A3530',
      bodyTextColor: '#3A3530',
      headingColor: '#1F1B18',
      titleColor: '#1F1B18',
      subheadingColor: '#5C544E',
      smallTextColor: '#7C736C',
      primaryButtonBg: '#8C6F56',
      primaryButtonText: '#FDFBF7',
      secondaryButtonBg: '#E8D8C8',
      secondaryButtonText: '#3A3530',
      dividerColor: '#DFD1C1',
      linkColor: '#8C6F56',
      carouselActiveDotColor: '#8C6F56',
      navBg: '#FDFBF7',
      navText: '#1F1B18',
      compStyle1Bg: '#8C6F56',
      compStyle1Text: '#FDFBF7',
      compStyle2Bg: '#F5ECE1',
      compStyle2Text: '#3A3530',
      compStyle3Bg: '#E8D8C8',
      compStyle3Text: '#1F1B18',
    },
  },
  {
    name: 'Deep Forest',
    colors: {
      primaryBg: '#FAFBF9',
      secondaryBg: '#EFF3F0',
      tertiaryBg: '#DFE7E2',
      textColor: '#2E3A31',
      bodyTextColor: '#2E3A31',
      headingColor: '#17221A',
      titleColor: '#17221A',
      subheadingColor: '#394A3D',
      smallTextColor: '#5A6C5F',
      primaryButtonBg: '#355243',
      primaryButtonText: '#FAFBF9',
      secondaryButtonBg: '#DCE4DF',
      secondaryButtonText: '#2E3A31',
      dividerColor: '#CAD5CF',
      linkColor: '#355243',
      carouselActiveDotColor: '#355243',
      navBg: '#FAFBF9',
      navText: '#17221A',
      compStyle1Bg: '#355243',
      compStyle1Text: '#FAFBF9',
      compStyle2Bg: '#EFF3F0',
      compStyle2Text: '#2E3A31',
      compStyle3Bg: '#DCE4DF',
      compStyle3Text: '#17221A',
    },
  },
  {
    name: 'Cozy Terracotta',
    colors: {
      primaryBg: '#FFF9F6',
      secondaryBg: '#FCEFE9',
      tertiaryBg: '#F9DED3',
      textColor: '#422B24',
      bodyTextColor: '#422B24',
      headingColor: '#903A1F',
      titleColor: '#903A1F',
      subheadingColor: '#A34E35',
      smallTextColor: '#735952',
      primaryButtonBg: '#C2593F',
      primaryButtonText: '#FFF9F6',
      secondaryButtonBg: '#F3D2C6',
      secondaryButtonText: '#422B24',
      dividerColor: '#E6C1B3',
      linkColor: '#C2593F',
      carouselActiveDotColor: '#C2593F',
      navBg: '#FFF9F6',
      navText: '#903A1F',
      compStyle1Bg: '#C2593F',
      compStyle1Text: '#FFF9F6',
      compStyle2Bg: '#FCEFE9',
      compStyle2Text: '#422B24',
      compStyle3Bg: '#F3D2C6',
      compStyle3Text: '#903A1F',
    },
  },
  {
    name: 'Modern Charcoal',
    colors: {
      primaryBg: '#F9FAFB',
      secondaryBg: '#F3F4F6',
      tertiaryBg: '#E5E7EB',
      textColor: '#1F2937',
      bodyTextColor: '#1F2937',
      headingColor: '#111827',
      titleColor: '#111827',
      subheadingColor: '#4B5563',
      smallTextColor: '#9CA3AF',
      primaryButtonBg: '#1F2937',
      primaryButtonText: '#FFFFFF',
      secondaryButtonBg: '#E5E7EB',
      secondaryButtonText: '#1F2937',
      dividerColor: '#D1D5DB',
      linkColor: '#1F2937',
      carouselActiveDotColor: '#1F2937',
      navBg: '#111827',
      navText: '#FFFFFF',
      compStyle1Bg: '#1F2937',
      compStyle1Text: '#FFFFFF',
      compStyle2Bg: '#F3F4F6',
      compStyle2Text: '#1F2937',
      compStyle3Bg: '#E5E7EB',
      compStyle3Text: '#111827',
    },
  },
  {
    name: 'Cosmic Indigo',
    colors: {
      primaryBg: '#090B10',
      secondaryBg: '#111421',
      tertiaryBg: '#1B2032',
      textColor: '#9EABB8',
      bodyTextColor: '#9EABB8',
      headingColor: '#F3F4F6',
      titleColor: '#F3F4F6',
      subheadingColor: '#A5B4FC',
      smallTextColor: '#64748B',
      primaryButtonBg: '#6366F1',
      primaryButtonText: '#FFFFFF',
      secondaryButtonBg: '#1F243B',
      secondaryButtonText: '#F3F4F6',
      dividerColor: '#262D4A',
      linkColor: '#818CF8',
      carouselActiveDotColor: '#6366F1',
      navBg: '#090B10',
      navText: '#6366F1',
      compStyle1Bg: '#6366F1',
      compStyle1Text: '#FFFFFF',
      compStyle2Bg: '#111421',
      compStyle2Text: '#9EABB8',
      compStyle3Bg: '#1F243B',
      compStyle3Text: '#F3F4F6',
    },
  },
];

export default function ColorControls({ colors, onChange }: ColorControlsProps) {
  // Collapsible sections state
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({
    backgrounds: true,
    typography: true,
    components: true,
    interactive: true,
    fallbacks: false,
  });

  const toggleSection = (key: string) => {
    setExpandedSections((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const updateField = (key: keyof ColorPalette, value: string) => {
    onChange({
      ...colors,
      [key]: value,
    });
  };

  const handleRandomize = () => {
    const randomHex = () =>
      '#' +
      Math.floor(Math.random() * 16777215)
        .toString(16)
        .padStart(6, '0');

    const primaryBg = '#FAFBFD';
    const secondaryBg = '#EFF3F8';
    const tertiaryBg = '#E2E8F0';
    const textColor = '#1E293B';
    const accent = randomHex();
    
    onChange(normalizeColors({
      primaryBg,
      secondaryBg,
      tertiaryBg,
      textColor,
      bodyTextColor: textColor,
      headingColor: accent,
      titleColor: accent,
      subheadingColor: accent,
      smallTextColor: '#64748B',
      primaryButtonBg: accent,
      primaryButtonText: '#FFFFFF',
      secondaryButtonBg: '#E2E8F0',
      secondaryButtonText: textColor,
      dividerColor: '#CBD5E1',
      linkColor: accent,
      carouselActiveDotColor: accent,
      navBg: primaryBg,
      navText: accent,
      compStyle1Bg: accent,
      compStyle1Text: '#FFFFFF',
      compStyle2Bg: secondaryBg,
      compStyle2Text: textColor,
      compStyle3Bg: tertiaryBg,
      compStyle3Text: '#1E293B',
    }));
  };

  const handleApplyPreset = (presetColors: Partial<ColorPalette>) => {
    onChange(normalizeColors(presetColors));
  };

  // Color fields configuration divided into precise Google Sites theme tabs
  const groups = [
    {
      id: 'backgrounds',
      title: 'Page Background Variations',
      icon: <Layers className="w-4 h-4 text-emerald-600" />,
      desc: 'Google Sites offers three section style variations (Styles 1, 2, and 3) to break up layout visual hierarchy.',
      fields: [
        { key: 'primaryBg' as keyof ColorPalette, label: 'Style 1 (Primary BG)', desc: 'Main page canvas backdrop (typically light/off-white)' },
        { key: 'secondaryBg' as keyof ColorPalette, label: 'Style 2 (Secondary BG)', desc: 'Tinted backdrop for alternating segment focus' },
        { key: 'tertiaryBg' as keyof ColorPalette, label: 'Style 3 (Tertiary BG)', desc: 'High contrast style for emphasis bands' },
      ],
    },
    {
      id: 'typography',
      title: 'Typography Text Colors',
      icon: <Type className="w-4 h-4 text-sky-600" />,
      desc: 'Separate colors mapped precisely to Google Sites headings, titles, subheadings, normal body, and small text.',
      fields: [
        { key: 'titleColor' as keyof ColorPalette, label: 'Title Text Color', desc: 'Hero headlines and primary sub-pages top titles' },
        { key: 'headingColor' as keyof ColorPalette, label: 'Heading Text Color', desc: 'Main block labels and core segment titles' },
        { key: 'subheadingColor' as keyof ColorPalette, label: 'Subheading Text Color', desc: 'Secondary metadata titles and tier notes' },
        { key: 'bodyTextColor' as keyof ColorPalette, label: 'Normal Text Color', desc: 'Standard readable description paragraphs and copy text' },
        { key: 'smallTextColor' as keyof ColorPalette, label: 'Small Text Color', desc: 'Captions, fine prints, footnotes, and tags' },
      ],
    },
    {
      id: 'components',
      title: 'Component Color Styles',
      icon: <AppWindow className="w-4 h-4 text-purple-600" />,
      desc: 'Styles for custom site elements. Google offers 3 beautiful component style layouts (Style 1: Filled, Style 2: Neutral, Style 3: Bordered/Outline).',
      fields: [
        { key: 'compStyle1Bg' as keyof ColorPalette, label: 'Component Style 1 BG', desc: 'Solid filled buttons or major spotlight rows' },
        { key: 'compStyle1Text' as keyof ColorPalette, label: 'Component Style 1 Text', desc: 'Inside font color for Style 1 components' },
        { key: 'compStyle2Bg' as keyof ColorPalette, label: 'Component Style 2 BG', desc: 'Neutral container panels or bento card highlights' },
        { key: 'compStyle2Text' as keyof ColorPalette, label: 'Component Style 2 Text', desc: 'Inside font color for Style 2 components' },
        { key: 'compStyle3Bg' as keyof ColorPalette, label: 'Component Style 3 BG', desc: 'Outline / secondary content boxes backplate' },
        { key: 'compStyle3Text' as keyof ColorPalette, label: 'Component Style 3 Text', desc: 'Inside font color for Style 3 components' },
      ],
    },
    {
      id: 'interactive',
      title: 'Interactive Details',
      icon: <Sparkles className="w-4 h-4 text-amber-600" />,
      desc: 'Colors mapping to active controls, dividers, custom hyperlink states, and image slider dots.',
      fields: [
        { key: 'linkColor' as keyof ColorPalette, label: 'Hyperlink Color', desc: 'Interactive anchor texts and clickable action texts' },
        { key: 'dividerColor' as keyof ColorPalette, label: 'Divider & Separator Line', desc: 'Grid boundaries and block borders' },
        { key: 'carouselActiveDotColor' as keyof ColorPalette, label: 'Carousel Active Dot', desc: 'Active slide indicator color for image sliders' },
      ],
    },
    {
      id: 'fallbacks',
      title: 'Legacy Global Fallbacks',
      icon: <Sliders className="w-4 h-4 text-gray-500" />,
      desc: 'Shared variables used for template headers, default button backplates, and backwards compatibility.',
      fields: [
        { key: 'navBg' as keyof ColorPalette, label: 'Navigation BG', desc: 'Main navigation header background bar' },
        { key: 'navText' as keyof ColorPalette, label: 'Navigation Link Font', desc: 'Site title and sub-pages menu items' },
        { key: 'primaryButtonBg' as keyof ColorPalette, label: 'Legacy Primary Button BG', desc: 'Fallback primary button solid color' },
        { key: 'primaryButtonText' as keyof ColorPalette, label: 'Legacy Primary Button Text', desc: 'Fallback text color on primary button' },
      ],
    },
  ];

  return (
    <div className="space-y-6" id="color-controls-panel">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-[10px] uppercase tracking-widest font-bold text-gray-400 mb-0.5">Google Sites Custom Themes</h3>
          <p className="text-xs text-[#413A36] font-serif italic">Build a fully customized Google Sites native color mapping.</p>
        </div>
        <button
          onClick={handleRandomize}
          className="p-1 px-3 border border-black text-[10px] font-mono uppercase tracking-wider text-[#1A1A1A] hover:bg-[#1A1A1A] hover:text-white transition duration-205 rounded-none focus:outline-none flex items-center gap-1.5 cursor-pointer"
          title="Generate matching colors"
          id="btn-random-colors"
        >
          <RefreshCw className="w-3 h-3" />
          <span>Surprise Me</span>
        </button>
      </div>

      {/* Preset Library Quick Apply */}
      <div className="bg-[#FDFCFB] p-3 rounded-none border border-[#E5E2DE]">
        <span className="text-[10px] uppercase tracking-wider font-bold text-gray-400 block mb-2">
          Theme Library Colors
        </span>
        <div className="flex flex-wrap gap-2">
          {PALETTE_TEMPLATES.map((palette) => (
            <button
              key={palette.name}
              onClick={() => handleApplyPreset(palette.colors)}
              className="flex items-center gap-1.5 text-[10px] font-mono uppercase bg-white border border-[#E5E2DE] hover:border-black rounded-none p-1.5 px-2.5 text-[#1A1A1A] transition focus:outline-none cursor-pointer"
              id={`preset-${palette.name.toLowerCase().replace(/\s+/g, '-')}`}
            >
              <span
                className="w-2.5 h-2.5 rounded-full border border-[#E5E2DE] inline-block"
                style={{ backgroundColor: palette.colors.primaryButtonBg }}
              />
              {palette.name}
            </button>
          ))}
        </div>
      </div>

      {/* Color Groups Acordion */}
      <div className="space-y-4 max-h-[50vh] overflow-y-auto pr-1.5 custom-scrollbar">
        {groups.map((group) => {
          const isExpanded = !!expandedSections[group.id];
          return (
            <div key={group.id} className="border border-[#E5E2DE] bg-[#FCFBF9] rounded-none">
              <button
                type="button"
                onClick={() => toggleSection(group.id)}
                className="w-full flex items-center justify-between p-3.5 text-left border-b border-[#E5E2DE] hover:bg-[#FAF9F6] transition focus:outline-none"
              >
                <div className="flex items-center gap-2.5">
                  {group.icon}
                  <span className="text-xs font-serif font-bold italic text-slate-900 uppercase tracking-wide">
                    {group.title}
                  </span>
                </div>
                {isExpanded ? <ChevronUp className="w-4 h-4 text-slate-400" /> : <ChevronDown className="w-4 h-4 text-slate-400" />}
              </button>

              {isExpanded && (
                <div className="p-4 bg-white space-y-4">
                  <p className="text-[10px] text-slate-500 leading-normal">{group.desc}</p>
                  <div className="space-y-4 pt-1">
                    {group.fields.map((field) => (
                      <div key={field.key} className="space-y-1.5 pb-3 border-b border-[#F2EFEA] last:border-b-0 last:pb-0">
                        <div className="flex items-center justify-between">
                          <label className="text-xs font-serif font-bold italic text-slate-850" htmlFor={`color-${field.key}`}>
                            {field.label}
                          </label>
                          <div className="flex items-center gap-1.5">
                            <span className="text-[10px] font-mono text-slate-450 uppercase">{colors[field.key] || '#'}</span>
                            <input
                              type="text"
                              value={colors[field.key] || ''}
                              onChange={(e) => updateField(field.key, e.target.value)}
                              className="w-16 h-6 text-[10px] font-mono bg-white border border-[#E5E2DE] rounded-none px-1 text-center font-medium focus:outline-none focus:border-black text-slate-700"
                              placeholder="#000000"
                              id={`text-input-color-${field.key}`}
                            />
                          </div>
                        </div>
                        
                        <div className="flex items-center gap-3">
                          <div className="relative w-9 h-7 rounded-none border border-[#E5E2DE] overflow-hidden shrink-0">
                            <input
                              id={`color-${field.key}`}
                              type="color"
                              value={(colors[field.key] && colors[field.key].startsWith('#') && colors[field.key].length === 7) ? colors[field.key] : '#cccccc'}
                              onChange={(e) => updateField(field.key, e.target.value)}
                              className="absolute inset-0 w-[200%] h-[200%] -translate-x-[25%] -translate-y-[25%] cursor-pointer border-0 p-0"
                            />
                          </div>
                          <p className="text-[10px] text-slate-400 font-sans tracking-tight leading-tight">{field.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
