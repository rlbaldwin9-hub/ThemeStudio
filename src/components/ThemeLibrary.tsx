import React, { useState, useEffect } from 'react';
import { SavedTheme, ColorPalette, TypographySettings, Section } from '../types';
import { FolderHeart, Plus, Save, Trash2, FolderOpen, RefreshCcw } from 'lucide-react';

interface ThemeLibraryProps {
  colors: ColorPalette;
  typography: TypographySettings;
  sections: Section[];
  headerTitle: string;
  headerCtaText: string;
  headerCtaUrl: string;
  onLoadTheme: (
    colors: ColorPalette, 
    typography: TypographySettings, 
    sections: Section[],
    headerTitle?: string,
    headerCtaText?: string,
    headerCtaUrl?: string
  ) => void;
}

export default function ThemeLibrary({ 
  colors, 
  typography, 
  sections, 
  headerTitle,
  headerCtaText,
  headerCtaUrl,
  onLoadTheme 
}: ThemeLibraryProps) {
  const [themeName, setThemeName] = useState('');
  const [savedThemes, setSavedThemes] = useState<SavedTheme[]>([]);

  useEffect(() => {
    const loaded = localStorage.getItem('google_sites_themes');
    if (loaded) {
      try {
        setSavedThemes(JSON.parse(loaded));
      } catch (e) {
        console.error('Failed to parse saved themes', e);
      }
    }
  }, []);

  const saveThemesToStorage = (themes: SavedTheme[]) => {
    localStorage.setItem('google_sites_themes', JSON.stringify(themes));
    setSavedThemes(themes);
  };

  const handleSaveCurrent = (e: React.FormEvent) => {
    e.preventDefault();
    if (!themeName.trim()) return;

    const newTheme: SavedTheme = {
      id: `theme-${Date.now()}`,
      name: themeName.trim(),
      colors: JSON.parse(JSON.stringify(colors)),
      typography: JSON.parse(JSON.stringify(typography)),
      sections: JSON.parse(JSON.stringify(sections)),
      headerTitle,
      headerCtaText,
      headerCtaUrl,
      createdAt: new Date().toLocaleDateString(undefined, {
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      }),
    };

    const updated = [newTheme, ...savedThemes];
    saveThemesToStorage(updated);
    setThemeName('');
  };

  const handleDeleteTheme = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    const updated = savedThemes.filter((t) => t.id !== id);
    saveThemesToStorage(updated);
  };

  const handleLoadTheme = (theme: SavedTheme) => {
    onLoadTheme(
      theme.colors, 
      theme.typography, 
      theme.sections,
      theme.headerTitle,
      theme.headerCtaText,
      theme.headerCtaUrl
    );
  };

  return (
    <div className="space-y-6" id="theme-library-panel">
      <div>
        <h3 className="text-[10px] uppercase tracking-widest font-bold text-gray-400 mb-0.5">Saved Themes & Library</h3>
        <p className="text-xs text-[#413A36] font-serif italic">Persist custom layout grids for future Site projects.</p>
      </div>

      {/* Save Theme Form */}
      <form onSubmit={handleSaveCurrent} className="p-4 bg-[#FDFCFB] rounded-none border border-[#E5E2DE] space-y-3">
        <label htmlFor="theme-name-input" className="text-[10px] uppercase font-mono text-slate-450 tracking-wider block">
          Save Current Design Setup
        </label>
        <div className="flex gap-2">
          <input
            id="theme-name-input"
            type="text"
            required
            value={themeName}
            onChange={(e) => setThemeName(e.target.value)}
            placeholder="e.g. Vintage Pink Agency"
            className="flex-1 text-xs bg-white border border-[#E5E2DE] rounded-none p-1.5 focus:outline-none focus:border-black text-[#1A1A1A] font-medium"
          />
          <button
            type="submit"
            className="p-1.5 px-3 border border-black hover:bg-[#1A1A1A] hover:text-white transition duration-200 uppercase text-[10px] font-mono tracking-wider text-[#1A1A1A] bg-transparent rounded-none flex items-center gap-1.5 cursor-pointer focus:outline-none"
            id="btn-save-theme"
          >
            <Save className="w-3.5 h-3.5" />
            <span>Save Theme</span>
          </button>
        </div>
      </form>

      {/* Library Checklist */}
      <div className="space-y-3">
        <span className="text-xs font-serif font-bold italic text-slate-800 flex items-center gap-1.5 select-none">
          <FolderHeart className="w-3.5 h-3.5 text-slate-450" />
          My Theme Workspace ({savedThemes.length})
        </span>

        {savedThemes.length === 0 ? (
          <div className="p-6 text-center border border-dashed border-[#E5E2DE] rounded-none bg-white">
            <FolderOpen className="w-8 h-8 text-slate-300 mx-auto mb-2" />
            <p className="text-xs text-slate-500 font-medium">Your library is currently empty.</p>
            <p className="text-[10px] text-slate-400 mt-1 max-w-[180px] mx-auto">
              Assign a name above and click Save Theme to save your active styling.
            </p>
          </div>
        ) : (
          <div className="space-y-2 max-h-[30vh] overflow-y-auto pr-1 custom-scrollbar">
            {savedThemes.map((theme) => (
              <div
                key={theme.id}
                onClick={() => handleLoadTheme(theme)}
                className="group p-2.5 bg-white border border-[#E5E2DE] hover:border-black rounded-none flex items-center justify-between cursor-pointer transition shadow-xs hover:shadow-xs"
                id={`saved-theme-item-${theme.id}`}
              >
                <div className="max-w-[75%] select-none">
                  <span className="text-xs font-serif font-bold italic text-slate-800 group-hover:text-black block truncate">
                    {theme.name}
                  </span>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-[8px] font-mono text-slate-400 uppercase tracking-wider">{theme.createdAt}</span>
                    <span className="text-[8px] text-slate-300 font-bold">•</span>
                    <span className="text-[8px] font-mono text-slate-400 uppercase tracking-wider">{theme.sections.length} Rows</span>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  {/* Colors mini dots map preview */}
                  <div className="flex gap-0.5">
                    <span
                      className="w-2 h-2 rounded-full border border-[#E5E2DE]"
                      style={{ backgroundColor: theme.colors.primaryBg }}
                    />
                    <span
                      className="w-2 h-2 rounded-full border border-[#E5E2DE]"
                      style={{ backgroundColor: theme.colors.textColor }}
                    />
                    <span
                      className="w-2 h-2 rounded-full border border-[#E5E2DE]"
                      style={{ backgroundColor: theme.colors.primaryButtonBg }}
                    />
                  </div>
                  <button
                    onClick={(e) => handleDeleteTheme(theme.id, e)}
                    className="p-1 rounded-none text-slate-400 hover:text-rose-600 hover:bg-slate-50 transition"
                    title="Delete Theme"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
