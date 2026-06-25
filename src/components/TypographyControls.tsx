import React from 'react';
import { TypographySettings, FontConfig, ColorPalette } from '../types';
import { GOOGLE_FONTS_LIST } from '../presets';
import { Type, HelpCircle } from 'lucide-react';

interface TypographyControlsProps {
  settings: TypographySettings;
  onChange: (settings: TypographySettings) => void;
  colors?: ColorPalette;
}

export default function TypographyControls({ settings, onChange, colors }: TypographyControlsProps) {
  const updateFontConfig = (target: keyof TypographySettings, field: keyof FontConfig, value: string) => {
    onChange({
      ...settings,
      [target]: {
        ...settings[target],
        [field]: value,
      },
    });
  };

  const sectionsList: { key: keyof TypographySettings; label: string; desc: string }[] = [
    { key: 'title', label: 'Page Title', desc: 'Main title banner text and key header landing text.' },
    { key: 'heading', label: 'Heading', desc: 'Main title for sections, large module labels.' },
    { key: 'subheading', label: 'Subheading', desc: 'Slightly smaller label text for secondary cards and headers.' },
    { key: 'body', label: 'Normal Text', desc: 'Main descriptions, paragraphs, lists, and navigation.' },
    { key: 'smallText', label: 'Small Text', desc: 'Fine print, footer credits, item captions, and tags.' },
  ];

  const getNormalizePxValue = (sizeStr: string, key: keyof TypographySettings): string => {
    const fallback = 
      key === 'title' ? '48px' : 
      key === 'heading' ? '24px' : 
      key === 'subheading' ? '18px' : 
      key === 'body' ? '14px' : '11px';
    if (!sizeStr) return fallback;
    const match = sizeStr.match(/^([\d.]+)(.*)$/);
    if (!match) return sizeStr;
    const num = parseFloat(match[1]);
    const unit = match[2].trim() || 'px';
    if (unit === 'rem' || unit === 'em') {
      return `${Math.round(num * 16)}px`;
    }
    return `${Math.round(num)}px`;
  };

  const getFontSizeOptions = (key: keyof TypographySettings) => {
    const all = [
      '8px', '9px', '10px', '11px', '12px', '13px', '14px', '15px', '16px', '17px', '18px', '20px', '22px', '24px', '26px', '28px', '30px', '32px', '36px', '40px', '44px', '48px', '52px', '56px', '60px', '64px', '72px', '80px', '96px'
    ];
    if (key === 'title') {
      return all.filter(sz => parseInt(sz) >= 18);
    }
    if (key === 'heading') {
      return all.filter(sz => parseInt(sz) >= 14);
    }
    return all;
  };

  const getFallbackColor = (key: keyof TypographySettings): string => {
    if (key === 'title') return colors?.titleColor || colors?.headingColor || '#1F1B18';
    if (key === 'heading') return colors?.headingColor || '#1F1B18';
    if (key === 'subheading') return colors?.subheadingColor || colors?.headingColor || '#5C544E';
    if (key === 'body') return colors?.bodyTextColor || colors?.textColor || '#3A3530';
    if (key === 'smallText') return colors?.smallTextColor || colors?.textColor || '#7C736C';
    return '#000000';
  };

  return (
    <div className="space-y-6" id="typography-controls-panel">
      <div>
        <h3 className="text-[10px] uppercase tracking-widest font-bold text-gray-400 mb-0.5">Typography Scales</h3>
        <p className="text-xs text-[#413A36] font-serif italic">Pick font styles linked directly to Google Fonts library.</p>
      </div>

      <div className="space-y-5 max-h-[55vh] overflow-y-auto pr-1.5 custom-scrollbar">
        {sectionsList.map(({ key, label, desc }) => {
          const font = settings[key];
          if (!font) return null;
          const fallbackColor = getFallbackColor(key);

          return (
            <div key={key} className="p-4 bg-[#FDFCFB] rounded-none border border-[#E5E2DE] space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-xs font-serif font-bold italic text-slate-800 uppercase tracking-widest">{label}</h4>
                  <p className="text-[10px] text-slate-400 font-normal leading-tight mt-0.5">{desc}</p>
                </div>
                <Type className="w-3.5 h-3.5 text-slate-400" />
              </div>

              <div className="grid grid-cols-2 gap-2">
                {/* Font Family Selection */}
                <div className="col-span-2 space-y-1">
                  <label className="text-[10px] font-mono text-slate-400 uppercase tracking-wider" htmlFor={`font-family-${key}`}>
                    Font Family
                  </label>
                  <select
                    id={`font-family-${key}`}
                    value={font.family}
                    onChange={(e) => updateFontConfig(key, 'family', e.target.value)}
                    className="w-full text-xs bg-white border border-[#E5E2DE] rounded-none p-1.5 focus:outline-none focus:border-black text-[#1A1A1A] transition cursor-pointer"
                  >
                    {GOOGLE_FONTS_LIST.map((fName) => (
                      <option key={fName} value={fName}>
                        {fName}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Font Weight Selection */}
                <div className="space-y-1">
                  <label className="text-[10px] font-mono text-slate-400 uppercase tracking-wider" htmlFor={`font-weight-${key}`}>
                    Weight
                  </label>
                  <select
                    id={`font-weight-${key}`}
                    value={font.weight}
                    onChange={(e) => updateFontConfig(key, 'weight', e.target.value)}
                    className="w-full text-xs bg-white border border-[#E5E2DE] rounded-none p-1.5 focus:outline-none focus:border-black text-[#1A1A1A] transition cursor-pointer"
                  >
                    <option value="300">Light (300)</option>
                    <option value="400">Regular (400)</option>
                    <option value="500">Medium (500)</option>
                    <option value="600">Semibold (600)</option>
                    <option value="700">Bold (700)</option>
                    <option value="800">Extra Bold (800)</option>
                  </select>
                </div>

                {/* Font Size Selection */}
                <div className="space-y-1">
                  <label className="text-[10px] font-mono text-slate-400 uppercase tracking-wider" htmlFor={`font-size-${key}`}>
                    Base Size
                  </label>
                  <select
                    id={`font-size-${key}`}
                    value={getNormalizePxValue(font.size, key)}
                    onChange={(e) => updateFontConfig(key, 'size', e.target.value)}
                    className="w-full text-xs bg-white border border-[#E5E2DE] rounded-none p-1.5 focus:outline-none focus:border-black text-[#1A1A1A] transition cursor-pointer font-mono"
                  >
                    {getFontSizeOptions(key).map((sz) => (
                      <option key={sz} value={sz}>
                        {sz}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Font Letter Spacing Selection */}
                <div className="col-span-2 space-y-1">
                  <label className="text-[10px] font-mono text-slate-400 uppercase tracking-wider" htmlFor={`font-spacing-${key}`}>
                    Letter Spacing
                  </label>
                  <select
                    id={`font-spacing-${key}`}
                    value={font.letterSpacing}
                    onChange={(e) => updateFontConfig(key, 'letterSpacing', e.target.value)}
                    className="w-full text-xs bg-white border border-[#E5E2DE] rounded-none p-1.5 focus:outline-none focus:border-black text-[#1A1A1A] transition cursor-pointer"
                  >
                    <option value="-0.05em">Tight (-0.05em)</option>
                    <option value="-0.02em">Snug (-0.02em)</option>
                    <option value="0">Normal (0)</option>
                    <option value="0.02em">Relaxed (+0.02em)</option>
                    <option value="0.05em">Wide (+0.05em)</option>
                    <option value="0.1em">Loose (+0.1em)</option>
                  </select>
                </div>

                {/* Font Color Selection */}
                <div className="col-span-2 space-y-1 pt-2 border-t border-[#F2EFEA]">
                  <div className="flex items-center justify-between">
                    <label className="text-[10px] font-mono text-slate-400 uppercase tracking-wider" htmlFor={`font-color-${key}`}>
                      Font Color
                    </label>
                    <div className="flex items-center gap-1.5">
                      <span className="text-[9px] font-mono font-bold text-slate-500 uppercase bg-slate-50 px-1 py-0.5 border border-slate-100 font-mono">
                        {font.color ? font.color : 'Theme Default'}
                      </span>
                      {font.color && (
                        <button
                          type="button"
                          onClick={() => updateFontConfig(key, 'color', '')}
                          className="text-[9px] uppercase font-mono font-bold text-red-500 hover:text-black transition"
                          title="Reset to default theme color"
                        >
                          Reset
                        </button>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="relative w-9 h-7 rounded-none border border-[#E5E2DE] overflow-hidden shrink-0">
                      <input
                        id={`font-color-picker-${key}`}
                        type="color"
                        value={font.color || fallbackColor}
                        onChange={(e) => updateFontConfig(key, 'color', e.target.value)}
                        className="absolute inset-0 w-[200%] h-[200%] -translate-x-[25%] -translate-y-[25%] cursor-pointer border-0 p-0"
                      />
                    </div>
                    <input
                      id={`font-color-${key}`}
                      type="text"
                      placeholder="e.g. #000000 or empty template style"
                      value={font.color || ''}
                      onChange={(e) => updateFontConfig(key, 'color', e.target.value)}
                      className="flex-1 text-xs bg-white border border-[#E5E2DE] rounded-none p-1.5 focus:outline-none focus:border-black text-[#1A1A1A] font-mono"
                    />
                  </div>
                </div>
              </div>

              {/* Instant font rendering preview line */}
              <div 
                className="mt-2 p-2 bg-white rounded-none border border-[#E5E2DE] text-center flex items-center justify-center min-h-[44px] select-none text-xs"
                style={{
                  fontFamily: `"${font.family}", sans-serif`,
                  fontWeight: font.weight,
                  letterSpacing: font.letterSpacing,
                  color: font.color || fallbackColor
                }}
              >
                Sample Text Preview
              </div>
            </div>
          );
        })}
      </div>

      <div className="p-3.5 bg-[#FAF9F6] rounded-none border border-[#E5E2DE] flex gap-2">
        <HelpCircle className="w-4 h-4 text-gray-400 shrink-0 mt-0.5" />
        <p className="text-[10px] text-slate-500 leading-normal">
          <strong className="font-serif italic font-bold text-[#1A1A1A] uppercase tracking-wider block mb-0.5">Design Guideline</strong>
          Google Sites enforces Page Title, Heading, Subheading, Normal Text, and Small Text styles. When custom themes are built in Sites, these font maps will line up directly with your custom text settings panel options!
        </p>
      </div>
    </div>
  );
}
