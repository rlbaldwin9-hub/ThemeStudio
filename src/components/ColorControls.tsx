import React from 'react';
import { ColorPalette } from '../types';
import { Sliders, RefreshCw, Palette } from 'lucide-react';

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
      textColor: '#3A3530',
      headingColor: '#1F1B18',
      primaryButtonBg: '#8C6F56',
      primaryButtonText: '#FDFBF7',
      secondaryButtonBg: '#E8D8C8',
      secondaryButtonText: '#3A3530',
      dividerColor: '#DFD1C1',
      navBg: '#FDFBF7',
      navText: '#1F1B18',
    },
  },
  {
    name: 'Deep Forest',
    colors: {
      primaryBg: '#FAFBF9',
      secondaryBg: '#EFF3F0',
      textColor: '#2E3A31',
      headingColor: '#17221A',
      primaryButtonBg: '#355243',
      primaryButtonText: '#FAFBF9',
      secondaryButtonBg: '#DCE4DF',
      secondaryButtonText: '#2E3A31',
      dividerColor: '#CAD5CF',
      navBg: '#FAFBF9',
      navText: '#17221A',
    },
  },
  {
    name: 'Cozy Terracotta',
    colors: {
      primaryBg: '#FFF9F6',
      secondaryBg: '#FCEFE9',
      textColor: '#422B24',
      headingColor: '#903A1F',
      primaryButtonBg: '#C2593F',
      primaryButtonText: '#FFF9F6',
      secondaryButtonBg: '#F3D2C6',
      secondaryButtonText: '#422B24',
      dividerColor: '#E6C1B3',
      navBg: '#FFF9F6',
      navText: '#903A1F',
    },
  },
  {
    name: 'Modern Charcoal',
    colors: {
      primaryBg: '#F9FAFB',
      secondaryBg: '#F3F4F6',
      textColor: '#1F2937',
      headingColor: '#111827',
      primaryButtonBg: '#1F2937',
      primaryButtonText: '#FFFFFF',
      secondaryButtonBg: '#E5E7EB',
      secondaryButtonText: '#1F2937',
      dividerColor: '#D1D5DB',
      navBg: '#111827',
      navText: '#FFFFFF',
    },
  },
  {
    name: 'Cosmic Indigo',
    colors: {
      primaryBg: '#090B10',
      secondaryBg: '#111421',
      textColor: '#9EABB8',
      headingColor: '#F3F4F6',
      primaryButtonBg: '#6366F1',
      primaryButtonText: '#FFFFFF',
      secondaryButtonBg: '#1F243B',
      secondaryButtonText: '#F3F4F6',
      dividerColor: '#262D4A',
      navBg: '#090B10',
      navText: '#6366F1',
    },
  },
];

export default function ColorControls({ colors, onChange }: ColorControlsProps) {
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

    const primaryBg = '#FAFBFD'; // Base soft
    const secondaryBg = '#EFF3F8';
    const textColor = '#1E293B';
    const headingColor = randomHex();
    const primaryButtonBg = headingColor; // anchor
    const primaryButtonText = '#FFFFFF';
    const secondaryButtonBg = '#E2E8F0';
    const secondaryButtonText = textColor;
    const dividerColor = '#CBD5E1';
    const navBg = primaryBg;
    const navText = headingColor;

    onChange({
      primaryBg,
      secondaryBg,
      textColor,
      headingColor,
      primaryButtonBg,
      primaryButtonText,
      secondaryButtonBg,
      secondaryButtonText,
      dividerColor,
      navBg,
      navText,
    });
  };

  const colorFields: { key: keyof ColorPalette; label: string; desc: string }[] = [
    { key: 'primaryBg', label: 'Primary Background', desc: 'Main canvas layout backdrops' },
    { key: 'secondaryBg', label: 'Secondary Background', desc: 'Slightly darker alternate rows' },
    { key: 'textColor', label: 'Body Text Color', desc: 'Readability color for descriptions' },
    { key: 'headingColor', label: 'Headings & Titles', desc: 'Major content title font colors' },
    { key: 'primaryButtonBg', label: 'Primary Button BG', desc: 'Major Call-To-Action background' },
    { key: 'primaryButtonText', label: 'Primary Button Text', desc: 'Inside text color of CTA button' },
    { key: 'secondaryButtonBg', label: 'Secondary Button BG', desc: 'Secondary action buttons' },
    { key: 'secondaryButtonText', label: 'Secondary Button Text', desc: 'Text for secondary buttons' },
    { key: 'dividerColor', label: 'Dividers & Lines', desc: 'Grid lines and section divisions' },
    { key: 'navBg', label: 'Navigation BG', desc: 'Main title menu background bar' },
    { key: 'navText', label: 'Navigation Text', desc: 'Site title and links font color' },
  ];

  return (
    <div className="space-y-6" id="color-controls-panel">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-[10px] uppercase tracking-widest font-bold text-gray-400 mb-0.5">Custom Color Palette</h3>
          <p className="text-xs text-[#413A36] font-serif italic">Pick precisely mapped colors for your theme.</p>
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

      <div className="bg-[#FDFCFB] p-3 rounded-none border border-[#E5E2DE]">
        <span className="text-[10px] uppercase tracking-wider font-bold text-gray-400 block mb-2">
          Color Presets
        </span>
        <div className="flex flex-wrap gap-2">
          {PALETTE_TEMPLATES.map((palette) => (
            <button
              key={palette.name}
              onClick={() => onChange(palette.colors)}
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

      <div className="space-y-4 max-h-[50vh] overflow-y-auto pr-1.5 custom-scrollbar">
        {colorFields.map((field) => (
          <div key={field.key} className="space-y-1.5 pb-3 border-b border-[#E5E2DE] last:border-b-0">
            <div className="flex items-center justify-between">
              <label className="text-xs font-serif font-bold italic text-slate-800" htmlFor={`color-${field.key}`}>
                {field.label}
              </label>
              <div className="flex items-center gap-1.5">
                <span className="text-[10px] font-mono text-slate-450 uppercase">{colors[field.key]}</span>
                <input
                  type="text"
                  value={colors[field.key]}
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
                  value={colors[field.key].startsWith('#') && colors[field.key].length === 7 ? colors[field.key] : '#cccccc'}
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
  );
}
