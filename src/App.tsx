import React, { useState, useEffect } from 'react';
import { ColorPalette, TypographySettings, Section, ViewportMode, APP_VERSION, normalizeColors, normalizeTypography } from './types';
import { PRESET_THEMES, INITIAL_SECTIONS } from './presets';
import ColorControls from './components/ColorControls';
import TypographyControls from './components/TypographyControls';
import LayoutControls from './components/LayoutControls';
import ThemeLibrary from './components/ThemeLibrary';
import PreviewCanvas from './components/PreviewCanvas';
import ExportPanel from './components/ExportPanel';
import SidebarGenerator from './components/SidebarGenerator';
import { 
  Palette, Type, Layers, FolderHeart, Sparkles, HelpCircle, 
  RotateCcw, ExternalLink, Moon, Sun, ArrowUpRight,
  ChevronDown, ChevronUp
} from 'lucide-react';

export default function App() {
  // State variables coordinating the active canvas properties
  const [colors, setColors] = useState<ColorPalette>(normalizeColors(PRESET_THEMES[0].colors));
  const [typography, setTypography] = useState<TypographySettings>(normalizeTypography(PRESET_THEMES[0].typography));
  const [sections, setSections] = useState<Section[]>(INITIAL_SECTIONS);
  const [activeSidebarTab, setActiveSidebarTab] = useState<'presets' | 'colors' | 'fonts' | 'sections' | 'library' | 'sidebar'>('presets');
  const [viewportMode, setViewportMode] = useState<ViewportMode>('desktop');

  // Custom persistent Header navigation states
  const [headerTitle, setHeaderTitle] = useState<string>('RLB Designs Theme Studio');
  const [headerCtaText, setHeaderCtaText] = useState<string>('Discover');
  const [headerCtaUrl, setHeaderCtaUrl] = useState<string>('#');

  // Custom persistent site comparator states
  const [comparisonUrl, setComparisonUrl] = useState<string>('');
  const [showComparison, setShowComparison] = useState<boolean>(false);

  // Fold/unfold state for Preset categories inside the sidebar to save vertical slot height
  const [expandedCategories, setExpandedCategories] = useState<Record<string, boolean>>({
    'Clean Professional Themes': false,
    'Custom Designs': false,
    'Shopping/Store': false
  });

  // Load custom values from local save initially if they exist
  useEffect(() => {
    const cachedColors = localStorage.getItem('gsites_designer_colors');
    const cachedTypography = localStorage.getItem('gsites_designer_typography');
    const cachedSections = localStorage.getItem('gsites_designer_sections');
    const cachedHeaderTitle = localStorage.getItem('gsites_designer_headerTitle');
    const cachedHeaderCtaText = localStorage.getItem('gsites_designer_headerCtaText');
    const cachedHeaderCtaUrl = localStorage.getItem('gsites_designer_headerCtaUrl');
    const cachedComparisonUrl = localStorage.getItem('gsites_designer_comparisonUrl');
    const cachedShowComparison = localStorage.getItem('gsites_designer_showComparison');

    if (cachedColors) {
      try { setColors(normalizeColors(JSON.parse(cachedColors))); } catch (e) {}
    }
    if (cachedTypography) {
      try { setTypography(normalizeTypography(JSON.parse(cachedTypography))); } catch (e) {}
    }
    if (cachedSections) {
      try { setSections(JSON.parse(cachedSections)); } catch (e) {}
    }
    if (cachedHeaderTitle) {
      setHeaderTitle(cachedHeaderTitle);
    }
    if (cachedHeaderCtaText) {
      setHeaderCtaText(cachedHeaderCtaText);
    }
    if (cachedHeaderCtaUrl) {
      setHeaderCtaUrl(cachedHeaderCtaUrl);
    }
    if (cachedComparisonUrl) {
      setComparisonUrl(cachedComparisonUrl);
    }
    if (cachedShowComparison) {
      setShowComparison(cachedShowComparison === 'true');
    }
  }, []);

  // Update localStorage as the user tweaks sliders/colors to prevent lost effort
  useEffect(() => {
    localStorage.setItem('gsites_designer_colors', JSON.stringify(colors));
  }, [colors]);

  useEffect(() => {
    localStorage.setItem('gsites_designer_typography', JSON.stringify(typography));
  }, [typography]);

  useEffect(() => {
    localStorage.setItem('gsites_designer_sections', JSON.stringify(sections));
  }, [sections]);

  useEffect(() => {
    localStorage.setItem('gsites_designer_headerTitle', headerTitle);
  }, [headerTitle]);

  useEffect(() => {
    localStorage.setItem('gsites_designer_headerCtaText', headerCtaText);
  }, [headerCtaText]);

  useEffect(() => {
    localStorage.setItem('gsites_designer_headerCtaUrl', headerCtaUrl);
  }, [headerCtaUrl]);

  useEffect(() => {
    localStorage.setItem('gsites_designer_comparisonUrl', comparisonUrl);
  }, [comparisonUrl]);

  useEffect(() => {
    localStorage.setItem('gsites_designer_showComparison', String(showComparison));
  }, [showComparison]);

  // Load selected preset or saved theme profile
  const handleLoadThemeProfile = (
    newColors: ColorPalette,
    newTypography: TypographySettings,
    newSections?: Section[]
  ) => {
    setColors(normalizeColors(newColors));
    setTypography(normalizeTypography(newTypography));
    if (newSections) {
      setSections(newSections);
    } else {
      setSections(INITIAL_SECTIONS);
    }
  };

  // Re-establish original default starter configurations
  const handleResetToDefault = () => {
    if (window.confirm('Are you sure you want to reset current styling and sections to the Warm Editorial preset starter?')) {
      setColors(normalizeColors(PRESET_THEMES[0].colors));
      setTypography(normalizeTypography(PRESET_THEMES[0].typography));
      setSections(INITIAL_SECTIONS);
      setActiveSidebarTab('presets');
    }
  };

  return (
    <div className="min-h-screen bg-[#F0EFEE] flex flex-col font-sans text-[#1A1A1A] selection:bg-[#D8D3CD] selection:text-[#1A1A1A]" id="main-app-shell">
      {/* Top Banner Navigation */}
      <header className="bg-white border-b border-[#E5E2DE] p-4 sticky top-0 z-50 shrink-0">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          
          {/* Logo Brand Header Block */}
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-[#1A1A1A] rounded-none flex items-center justify-center text-white font-serif italic text-lg leading-none select-none">
              S
            </div>
            <div className="h-4 w-[1px] bg-[#E5E2DE]"></div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-sm font-serif italic font-bold tracking-tight text-[#1A1A1A] text-lg">RLB Designs Theme Studio</h1>
                <span className="text-[9px] uppercase tracking-widest text-slate-400 bg-slate-50 px-1.5 py-0.5 border border-slate-100 font-mono">v{APP_VERSION}</span>
              </div>
              <p className="text-[9px] uppercase tracking-widest text-[#413A36] -mt-0.5">Google Sites Customizer</p>
            </div>
          </div>

          {/* Quick Toolbar */}
          <div className="flex items-center gap-4">

            <button
              onClick={handleResetToDefault}
              className="px-4 py-1.5 text-[10px] font-mono uppercase tracking-widest border border-[#1A1A1A] text-[#1A1A1A] hover:bg-[#1A1A1A] hover:text-white transition duration-250 cursor-pointer focus:outline-none rounded-none"
              title="Restore starter configurations"
              id="btn-global-reset"
            >
              <span>Reset Canvas</span>
            </button>
          </div>

        </div>
      </header>

      {/* Main Designer Grid Workspace Layout */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-4 lg:p-7 grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* Sidebar Controls Column (Desktop: 4 cols, expanded to 12 when editing Sidebar) */}
        <section className={`${activeSidebarTab === 'sidebar' ? 'lg:col-span-12' : 'lg:col-span-4'} bg-white border border-[#E5E2DE] rounded-none shadow-xs overflow-hidden flex flex-col shrink-0 transition-all duration-300`} id="sidebar-layout-column">
          
          {/* Tabs header selector buttons */}
          <div className="grid grid-cols-6 border-b border-[#E5E2DE] bg-white">
            <button
              onClick={() => setActiveSidebarTab('presets')}
              className={`py-3 text-[10px] uppercase tracking-wider font-bold transition duration-150 cursor-pointer focus:outline-none ${activeSidebarTab === 'presets' ? 'border-b-2 border-black text-black' : 'text-gray-400 hover:text-gray-600 font-medium'}`}
              title="Theme Style Presets"
              id="tab-sidebar-presets"
            >
              <span>Presets</span>
            </button>
            <button
              onClick={() => setActiveSidebarTab('colors')}
              className={`py-3 text-[10px] uppercase tracking-wider font-bold transition duration-150 cursor-pointer focus:outline-none ${activeSidebarTab === 'colors' ? 'border-b-2 border-black text-black' : 'text-gray-400 hover:text-gray-600 font-medium'}`}
              title="Site Colors & Palettes"
              id="tab-sidebar-colors"
            >
              <span>Colors</span>
            </button>
            <button
              onClick={() => setActiveSidebarTab('fonts')}
              className={`py-3 text-[10px] uppercase tracking-wider font-bold transition duration-150 cursor-pointer focus:outline-none ${activeSidebarTab === 'fonts' ? 'border-b-2 border-black text-black' : 'text-gray-400 hover:text-gray-600 font-medium'}`}
              title="Google Font Families"
              id="tab-sidebar-fonts"
            >
              <span>Fonts</span>
            </button>
            <button
              onClick={() => setActiveSidebarTab('sections')}
              className={`py-3 text-[10px] uppercase tracking-wider font-bold transition duration-150 cursor-pointer focus:outline-none ${activeSidebarTab === 'sections' ? 'border-b-2 border-black text-black' : 'text-gray-400 hover:text-gray-600 font-medium'}`}
              title="Layout Blocks Library"
              id="tab-sidebar-sections"
            >
              <span>Layouts</span>
            </button>
            <button
              onClick={() => setActiveSidebarTab('library')}
              className={`py-3 text-[10px] uppercase tracking-wider font-bold transition duration-150 cursor-pointer focus:outline-none ${activeSidebarTab === 'library' ? 'border-b-2 border-black text-black' : 'text-gray-400 hover:text-gray-600 font-medium'}`}
              title="Saved Themes Workspace"
              id="tab-sidebar-library"
            >
              <span>Library</span>
            </button>
            <button
              onClick={() => setActiveSidebarTab('sidebar')}
              className={`py-3 text-[10px] uppercase tracking-wider font-bold transition duration-150 cursor-pointer focus:outline-none ${activeSidebarTab === 'sidebar' ? 'border-b-2 border-black text-black' : 'text-gray-400 hover:text-gray-600 font-medium'}`}
              title="Google Sites Sidebar Generator"
              id="tab-sidebar-sidebar"
            >
              <span>Sidebar</span>
            </button>
          </div>

          {/* Active Sidebar Tab Contents rendered dynamically */}
          <div className="p-5">
            {activeSidebarTab === 'presets' && (
              <div className="space-y-4 text-left animation-fade-in" id="presets-panel">
                <div>
                  <h3 className="text-[10px] uppercase tracking-widest font-bold text-gray-400 mb-0.5">Theme Style Presets</h3>
                  <p className="text-xs text-[#413A36] font-serif italic mb-4">Pick beautiful initial visual profiles ready out-of-the-box.</p>
                </div>

                <div className="space-y-4 max-h-[58vh] overflow-y-auto pr-1 custom-scrollbar">
                  {/* Category: Clean Professional Themes */}
                  <div className="space-y-2">
                    <button
                      onClick={() => setExpandedCategories(prev => ({ ...prev, 'Clean Professional Themes': !prev['Clean Professional Themes'] }))}
                      className="w-full text-left flex items-center justify-between text-[9px] font-mono font-bold tracking-widest text-[#8B6A4F] uppercase bg-[#F3ECE0] px-2 py-1.5 border border-[#E6DAD0] focus:outline-none cursor-pointer hover:bg-[#ebdcc7] transition"
                    >
                      <span>Clean Professional Themes</span>
                      {expandedCategories['Clean Professional Themes'] ? <ChevronUp className="w-3.5 h-3.5 text-[#8B6A4F]" /> : <ChevronDown className="w-3.5 h-3.5 text-[#8B6A4F]" />}
                    </button>
                    {expandedCategories['Clean Professional Themes'] && (
                      <div className="grid grid-cols-1 gap-2 border-l border-[#E6DAD0] pl-2 py-1">
                        {PRESET_THEMES.filter(p => p.category === 'Clean Professional Themes').map((preset) => {
                          const isSelected = preset.colors.primaryButtonBg === colors.primaryButtonBg && preset.typography.title.family === typography.title.family;
                          
                          return (
                            <button
                              key={preset.id}
                              onClick={() => handleLoadThemeProfile(preset.colors, preset.typography, preset.sections)}
                              className={`p-3 border rounded-none text-left transition relative ${isSelected ? 'border-[#1A1A1A] bg-[#FAF9F6] ring-1 ring-[#1A1A1A]' : 'border-[#E5E2DE] hover:border-gray-400 bg-white'}`}
                              id={`btn-load-preset-${preset.id}`}
                            >
                              {isSelected && (
                                <span className="absolute top-2 right-2 text-[8px] uppercase tracking-widest text-[#1A1A1A] bg-[#D8D3CD] px-1.5 py-0.5 font-bold">
                                  Active
                                </span>
                              )}
                              <h4 className="text-xs font-serif font-bold italic text-[#1A1A1A] uppercase tracking-wider">{preset.name}</h4>
                              <p className="text-[10px] text-gray-400 font-normal leading-normal mt-1 mb-2.5 line-clamp-2">{preset.description}</p>
                              
                              {/* Mini visual elements preview bars */}
                              <div className="flex items-center justify-between border-t border-[#E5E2DE] pt-2 text-[10px] text-slate-500">
                                <span className="font-mono text-[9px] text-[#413A36]">
                                  {preset.typography.title.family} / {preset.typography.body.family}
                                </span>
                                <div className="flex gap-1.5">
                                  <span 
                                    className="w-3 h-3 rounded-full border border-[#E5E2DE] shadow-xs" 
                                    style={{ backgroundColor: preset.colors.primaryBg }}
                                    title="Primary BG Color"
                                  />
                                  <span 
                                    className="w-3 h-3 rounded-full border border-[#E5E2DE] shadow-xs" 
                                    style={{ backgroundColor: preset.colors.primaryButtonBg }}
                                    title="CTA Button BG Color"
                                  />
                                  <span 
                                    className="w-3 h-3 rounded-full border border-[#E5E2DE] shadow-xs" 
                                    style={{ backgroundColor: preset.colors.textColor }}
                                    title="Body Text Color"
                                  />
                                </div>
                              </div>
                            </button>
                          );
                        })}
                      </div>
                    )}
                  </div>

                  {/* Category: Custom Designs */}
                  <div className="space-y-2">
                    <button
                      onClick={() => setExpandedCategories(prev => ({ ...prev, 'Custom Designs': !prev['Custom Designs'] }))}
                      className="w-full text-left flex items-center justify-between text-[9px] font-mono font-bold tracking-widest text-[#E07A5F] uppercase bg-[#FAF7F5] px-2 py-1.5 border border-[#EAE1DA] focus:outline-none cursor-pointer hover:bg-[#f1ded2] transition"
                    >
                      <span>Custom Designs</span>
                      {expandedCategories['Custom Designs'] ? <ChevronUp className="w-3.5 h-3.5 text-[#E07A5F]" /> : <ChevronDown className="w-3.5 h-3.5 text-[#E07A5F]" />}
                    </button>
                    {expandedCategories['Custom Designs'] && (
                      <div className="grid grid-cols-1 gap-2 border-l border-[#EAE1DA] pl-2 py-1">
                        {PRESET_THEMES.filter(p => p.category === 'Custom Designs').map((preset) => {
                          const isSelected = preset.colors.primaryButtonBg === colors.primaryButtonBg && preset.typography.title.family === typography.title.family;
                          
                          return (
                            <button
                              key={preset.id}
                              onClick={() => handleLoadThemeProfile(preset.colors, preset.typography, preset.sections)}
                              className={`p-3 border rounded-none text-left transition relative ${isSelected ? 'border-[#1A1A1A] bg-[#FAF9F6] ring-1 ring-[#1A1A1A]' : 'border-[#E5E2DE] hover:border-gray-400 bg-white'}`}
                              id={`btn-load-preset-${preset.id}`}
                            >
                              {isSelected && (
                                <span className="absolute top-2 right-2 text-[8px] uppercase tracking-widest text-[#1A1A1A] bg-[#D8D3CD] px-1.5 py-0.5 font-bold">
                                  Active
                                </span>
                              )}
                              <h4 className="text-xs font-serif font-bold italic text-[#1A1A1A] uppercase tracking-wider">{preset.name}</h4>
                              <p className="text-[10px] text-gray-400 font-normal leading-normal mt-1 mb-2.5 line-clamp-2">{preset.description}</p>
                              
                              {/* Mini visual elements preview bars */}
                              <div className="flex items-center justify-between border-t border-[#E5E2DE] pt-2 text-[10px] text-slate-500">
                                <span className="font-mono text-[9px] text-[#413A36]">
                                  {preset.typography.title.family} / {preset.typography.body.family}
                                </span>
                                <div className="flex gap-1.5">
                                  <span 
                                    className="w-3 h-3 rounded-full border border-[#E5E2DE] shadow-xs" 
                                    style={{ backgroundColor: preset.colors.primaryBg }}
                                    title="Primary BG Color"
                                  />
                                  <span 
                                    className="w-3 h-3 rounded-full border border-[#E5E2DE] shadow-xs" 
                                    style={{ backgroundColor: preset.colors.primaryButtonBg }}
                                    title="CTA Button BG Color"
                                  />
                                  <span 
                                    className="w-3 h-3 rounded-full border border-[#E5E2DE] shadow-xs" 
                                    style={{ backgroundColor: preset.colors.textColor }}
                                    title="Body Text Color"
                                  />
                                </div>
                              </div>
                            </button>
                          );
                        })}
                      </div>
                    )}
                  </div>

                  {/* Category: Shopping/Store */}
                  <div className="space-y-2">
                    <button
                      onClick={() => setExpandedCategories(prev => ({ ...prev, 'Shopping/Store': !prev['Shopping/Store'] }))}
                      className="w-full text-left flex items-center justify-between text-[9px] font-mono font-bold tracking-widest text-[#2B4C7E] uppercase bg-[#EAEFF8] px-2 py-1.5 border border-[#CCD7E8] focus:outline-none cursor-pointer hover:bg-[#d9e3f3] transition"
                    >
                      <span>Shopping/Store</span>
                      {expandedCategories['Shopping/Store'] ? <ChevronUp className="w-3.5 h-3.5 text-[#2B4C7E]" /> : <ChevronDown className="w-3.5 h-3.5 text-[#2B4C7E]" />}
                    </button>
                    {expandedCategories['Shopping/Store'] && (
                      <div className="grid grid-cols-1 gap-2 border-l border-[#CCD7E8] pl-2 py-1">
                        {PRESET_THEMES.filter(p => p.category === 'Shopping/Store').map((preset) => {
                          const isSelected = preset.colors.primaryButtonBg === colors.primaryButtonBg && preset.typography.title.family === typography.title.family;
                          
                          return (
                            <button
                              key={preset.id}
                              onClick={() => handleLoadThemeProfile(preset.colors, preset.typography, preset.sections)}
                              className={`p-3 border rounded-none text-left transition relative ${isSelected ? 'border-[#1A1A1A] bg-[#FAF9F6] ring-1 ring-[#1A1A1A]' : 'border-[#E5E2DE] hover:border-gray-400 bg-white'}`}
                              id={`btn-load-preset-${preset.id}`}
                            >
                              {isSelected && (
                                <span className="absolute top-2 right-2 text-[8px] uppercase tracking-widest text-[#1A1A1A] bg-[#D8D3CD] px-1.5 py-0.5 font-bold">
                                  Active
                                </span>
                              )}
                              <h4 className="text-xs font-serif font-bold italic text-[#1A1A1A] uppercase tracking-wider">{preset.name}</h4>
                              <p className="text-[10px] text-gray-400 font-normal leading-normal mt-1 mb-2.5 line-clamp-2">{preset.description}</p>
                              
                              {/* Mini visual elements preview bars */}
                              <div className="flex items-center justify-between border-t border-[#E5E2DE] pt-2 text-[10px] text-slate-500">
                                <span className="font-mono text-[9px] text-[#413A36]">
                                  {preset.typography.title.family} / {preset.typography.body.family}
                                </span>
                                <div className="flex gap-1.5">
                                  <span 
                                    className="w-3 h-3 rounded-full border border-[#E5E2DE] shadow-xs" 
                                    style={{ backgroundColor: preset.colors.primaryBg }}
                                    title="Primary BG Color"
                                  />
                                  <span 
                                    className="w-3 h-3 rounded-full border border-[#E5E2DE] shadow-xs" 
                                    style={{ backgroundColor: preset.colors.primaryButtonBg }}
                                    title="CTA Button BG Color"
                                  />
                                  <span 
                                    className="w-3 h-3 rounded-full border border-[#E5E2DE] shadow-xs" 
                                    style={{ backgroundColor: preset.colors.textColor }}
                                    title="Body Text Color"
                                  />
                                </div>
                              </div>
                            </button>
                          );
                        })}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}

            {activeSidebarTab === 'colors' && (
              <ColorControls colors={colors} onChange={setColors} />
            )}

            {activeSidebarTab === 'fonts' && (
              <TypographyControls settings={typography} onChange={setTypography} colors={colors} />
            )}

            {activeSidebarTab === 'sections' && (
              <LayoutControls 
                sections={sections} 
                onChange={setSections} 
                colors={colors}
                headerTitle={headerTitle}
                setHeaderTitle={setHeaderTitle}
                headerCtaText={headerCtaText}
                setHeaderCtaText={setHeaderCtaText}
                headerCtaUrl={headerCtaUrl}
                setHeaderCtaUrl={setHeaderCtaUrl}
                comparisonUrl={comparisonUrl}
                setComparisonUrl={setComparisonUrl}
                showComparison={showComparison}
                setShowComparison={setShowComparison}
              />
            )}

            {activeSidebarTab === 'library' && (
              <ThemeLibrary 
                colors={colors} 
                typography={typography} 
                sections={sections} 
                headerTitle={headerTitle}
                headerCtaText={headerCtaText}
                headerCtaUrl={headerCtaUrl}
                onLoadTheme={(col, typo, sec, hTitle, hCtaText, hCtaUrl) => {
                  handleLoadThemeProfile(col, typo, sec);
                  if (hTitle !== undefined) setHeaderTitle(hTitle);
                  if (hCtaText !== undefined) setHeaderCtaText(hCtaText);
                  if (hCtaUrl !== undefined) setHeaderCtaUrl(hCtaUrl);
                }} 
              />
            )}

            {activeSidebarTab === 'sidebar' && (
              <SidebarGenerator colors={colors} typography={typography} />
            )}
          </div>
        </section>

        {/* Live Device Preview and XML/CSS code Exporter Column (Desktop: 8 cols) */}
        {activeSidebarTab !== 'sidebar' && (
          <section className="lg:col-span-8 flex flex-col justify-start" id="preview-layout-column">
            
            {/* Main Visual Responsive Preview Window */}
            <PreviewCanvas 
              colors={colors}
              typography={typography}
              sections={sections}
              viewportMode={viewportMode}
              onViewportChange={setViewportMode}
              headerTitle={headerTitle}
              headerCtaText={headerCtaText}
              headerCtaUrl={headerCtaUrl}
              comparisonUrl={comparisonUrl}
              setComparisonUrl={setComparisonUrl}
              showComparison={showComparison}
              setShowComparison={setShowComparison}
            />

            {/* Code outputs exporters block and steps guide */}
            <ExportPanel 
              colors={colors}
              typography={typography}
              sections={sections}
            />
          </section>
        )}

      </main>

      {/* Humble, literal footer credit */}
      <footer className="py-6 border-t border-[#E5E2DE] bg-white text-center text-xs text-slate-400 mt-auto select-none shrink-0" id="global-page-footer">
        <p className="font-serif italic text-slate-500 mb-1">RLB Designs Theme Studio Editorial Engine • Schema v{APP_VERSION}</p>
        <p className="text-[10px] tracking-wider uppercase opacity-65">All Layout Structures Conform with sites.google.com embeds.</p>
      </footer>
    </div>
  );
}
