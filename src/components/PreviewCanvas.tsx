import React, { useEffect } from 'react';
import { ColorPalette, TypographySettings, Section, ViewportMode, APP_VERSION } from '../types';
import { 
  Monitor, Tablet, Smartphone, MoveUpRight, ArrowRight, 
  CheckCircle2, Menu, Star, Quote, ChevronRight, HelpCircle
} from 'lucide-react';

interface PreviewCanvasProps {
  colors: ColorPalette;
  typography: TypographySettings;
  sections: Section[];
  viewportMode: ViewportMode;
  onViewportChange: (mode: ViewportMode) => void;
  headerTitle?: string;
  headerCtaText?: string;
  headerCtaUrl?: string;
  comparisonUrl?: string;
  setComparisonUrl?: (val: string) => void;
  showComparison?: boolean;
  setShowComparison?: (val: boolean) => void;
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

export default function PreviewCanvas({ 
  colors, 
  typography, 
  sections, 
  viewportMode, 
  onViewportChange,
  headerTitle,
  headerCtaText,
  headerCtaUrl,
  comparisonUrl,
  setComparisonUrl,
  showComparison,
  setShowComparison
}: PreviewCanvasProps) {

  // Local state for interactive page navigation simulation and continuous scroll rendering
  const [activeSubPage, setActiveSubPage] = React.useState<string>('Home');
  const [multiPageMode, setMultiPageMode] = React.useState<boolean>(true);
  const [domain, setDomain] = React.useState<string>('https://sites.google.com/view/custom-editorial-theme');

  // Interactive link toast notification and iframe escape helper
  const [toastMessage, setToastMessage] = React.useState<string | null>(null);

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, url: string | undefined) => {
    const norm = normalizeUrl(url);
    if (!url || norm === '#' || norm === '') {
      e.preventDefault();
      setToastMessage("ℹ️ Internal section link clicked (Navigation simulation)");
      setTimeout(() => setToastMessage(null), 3000);
      return;
    }
    
    // Display our polished, real-time indicator to clarify what happens inside the Sites sandbox
    setToastMessage(`🔗 Navigating to: ${norm}`);
    setTimeout(() => setToastMessage(null), 4000);

    // Some sandboxed iframes block standard link actions. We attempt programatic window opening as a bulletproof escape
    try {
      window.open(norm, '_blank', 'noopener,noreferrer');
    } catch (err) {
      console.warn("Popup blocked by sandboxed iframe environment. Standard link click will also attempt to route.", err);
    }
  };

  // Floating Site Comparator state properties
  const [overlayPos, setOverlayPos] = React.useState({ x: 30, y: 150 });
  const [isDragging, setIsDragging] = React.useState(false);
  const [dragStart, setDragStart] = React.useState({ x: 0, y: 0 });
  const [overlayWidth, setOverlayWidth] = React.useState<number>(450);
  const [overlayHeight, setOverlayHeight] = React.useState<number>(550);
  const [overlayOpacity, setOverlayOpacity] = React.useState<number>(95);

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setDragStart({
      x: e.clientX - overlayPos.x,
      y: e.clientY - overlayPos.y
    });
  };

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!isDragging) return;
      setOverlayPos({
        x: Math.max(0, Math.min(window.innerWidth - 200, e.clientX - dragStart.x)),
        y: Math.max(0, Math.min(window.innerHeight - 200, e.clientY - dragStart.y))
      });
    };

    const handleMouseUp = () => {
      setIsDragging(false);
    };

    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging, dragStart]);

  // Reset page simulation back to Home tab if preset style profile is changed
  useEffect(() => {
    setActiveSubPage('Home');
  }, [colors.primaryButtonBg, colors.primaryBg]);

  // Load Google Fonts dynamically by appending a Link stylesheet tag to the head
  useEffect(() => {
    const families = [
      typography.title.family,
      typography.heading.family,
      typography.body.family
    ];
    // De-duplicate
    const uniqueFamilies = Array.from(new Set(families));
    const fontQueryString = uniqueFamilies
      .map(f => f.replace(/\s+/g, '+'))
      .join('&family=');
    
    const elementId = 'gsites-dynamic-fonts';
    let linkElement = document.getElementById(elementId) as HTMLLinkElement;
    
    if (!linkElement) {
      linkElement = document.createElement('link');
      linkElement.id = elementId;
      linkElement.rel = 'stylesheet';
      document.head.appendChild(linkElement);
    }
    
    linkElement.href = `https://fonts.googleapis.com/css2?family=${fontQueryString}&display=swap`;
  }, [typography]);

  // Viewport width class bindings
  const getViewportWidthClass = () => {
    switch (viewportMode) {
      case 'mobile':
        return 'max-w-[360px] border-[12px] border-[#1A1A1A] rounded-none shadow-[0_25px_60px_-15px_rgba(0,0,0,0.3)]';
      case 'tablet':
        return 'max-w-[768px] border-[16px] border-[#1A1A1A] rounded-none shadow-[0_25px_60px_-15px_rgba(0,0,0,0.3)]';
      case 'desktop':
      default:
        return 'max-w-full border-t-[28px] border-x-[1px] border-b-[1px] border-[#1A1A1A] rounded-none shadow-[0_25px_60px_-15px_rgba(0,0,0,0.15)]';
    }
  };

  return (
    <div className="flex-1 flex flex-col bg-[#F0EFEE] p-4 lg:p-7 overflow-y-auto" id="preview-canvas-container">
      {/* Top Controller Bar */}
      <div className="flex items-center justify-between mb-4 bg-white p-3.5 rounded-none border border-[#E5E2DE] shadow-xs shrink-0">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-[#1A1A1A]" />
            <span className="w-2 h-2 rounded-full bg-[#D8D3CD]" />
            <span className="text-[9px] font-mono tracking-wider uppercase text-slate-400 bg-slate-50 px-2 py-0.5 border border-slate-100 hidden sm:inline-block">
              Canvas Frame
            </span>
          </div>

          {/* Interactive Page Switch Mode select button */}
          <button
            onClick={() => setMultiPageMode(!multiPageMode)}
            className={`p-1 px-2.5 text-[9px] font-mono uppercase tracking-wider border transition flex items-center gap-1.5 cursor-pointer focus:outline-none ${multiPageMode ? 'bg-[#FAF7F5] border-amber-500 text-amber-700 font-bold' : 'bg-slate-50 border-slate-200 text-slate-500 hover:border-slate-400 font-medium'}`}
            title="Toggle between browsing custom virtual pages or scrolling all sections continuously"
          >
            <span className={`inline-block w-1.5 h-1.5 rounded-full ${multiPageMode ? 'bg-amber-500 animate-pulse' : 'bg-slate-400'}`} />
            <span>{multiPageMode ? 'Multi-page Sim Active' : 'Single page continuous'}</span>
          </button>
        </div>

        {/* Viewport Toggles */}
        <div className="flex items-center bg-slate-100 p-1 rounded-none border border-[#E5E2DE]">
          <button
            onClick={() => onViewportChange('desktop')}
            className={`p-1.5 px-3 rounded-none transition flex items-center gap-1 text-[10px] font-mono uppercase tracking-wider ${viewportMode === 'desktop' ? 'bg-[#1A1A1A] text-white shadow-xs' : 'text-slate-500 hover:text-black hover:bg-slate-50'}`}
            title="Desktop Mode"
            id="toggle-viewport-desktop"
          >
            <Monitor className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Desktop</span>
          </button>
          <button
            onClick={() => onViewportChange('tablet')}
            className={`p-1.5 px-3 rounded-none transition flex items-center gap-1 text-[10px] font-mono uppercase tracking-wider ${viewportMode === 'tablet' ? 'bg-[#1A1A1A] text-white shadow-xs' : 'text-slate-500 hover:text-black hover:bg-slate-50'}`}
            title="Tablet Mode"
            id="toggle-viewport-tablet"
          >
            <Tablet className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Tablet</span>
          </button>
          <button
            onClick={() => onViewportChange('mobile')}
            className={`p-1.5 px-3 rounded-none transition flex items-center gap-1 text-[10px] font-mono uppercase tracking-wider ${viewportMode === 'mobile' ? 'bg-[#1A1A1A] text-white shadow-xs' : 'text-slate-500 hover:text-black hover:bg-slate-50'}`}
            title="Mobile Mode"
            id="toggle-viewport-mobile"
          >
            <Smartphone className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Mobile</span>
          </button>
        </div>
      </div>

      {/* Simulated Device Frame Wrapper */}
      <div className="flex-1 flex justify-center items-start overflow-y-auto pt-2">
        <div 
          className={`w-full bg-white transition-all duration-300 relative select-none overflow-y-auto flex flex-col ${getViewportWidthClass()}`}
          style={{
            minHeight: viewportMode === 'mobile' ? '560px' : '650px',
            backgroundColor: colors.primaryBg,
            fontFamily: `"${typography.body.family}", sans-serif`,
            fontSize: typography.body.size,
            color: colors.textColor
          }}
          id="device-viewport-frame"
        >
          {/* Simulated Browser Bar Address */}
          {viewportMode === 'desktop' && (
            <div className="bg-[#1A1A1A] text-[9px] text-[#D8D3CD] p-1.5 px-4 flex items-center justify-between border-b border-[#E5E2DE] shrink-0 font-mono gap-4">
              <div className="flex items-center gap-1.5 flex-1 max-w-[500px] bg-[#222222] px-2 py-0.5 rounded-none text-left border border-slate-800 focus-within:border-slate-600 transition">
                <span className="text-[8px] text-emerald-500 font-mono font-bold uppercase select-none">SITE URL:</span>
                <input
                  type="text"
                  value={domain}
                  onChange={(e) => setDomain(e.target.value)}
                  placeholder="Paste your own sites.google.com/view/your-site here..."
                  className="bg-transparent text-[#D8D3CD] outline-none border-none text-[9px] flex-1 font-mono placeholder:text-slate-600 focus:text-white"
                  title="Click to customize your preview workspace URL"
                />
                <span className="text-slate-500 select-none">/{activeSubPage.toLowerCase().replace(/\s+/g, '-')}</span>
              </div>
              <span className="text-[8px] text-amber-500 font-mono font-bold tracking-widest uppercase select-none whitespace-nowrap">SECURE CONCEPT SPACE</span>
            </div>
          )}

          {/* Simulated Google Site Navigation Bar */}
          <nav 
            className="p-3.5 border-b flex justify-between items-center transition shrink-0 rounded-none bg-white font-sans"
            style={{
              backgroundColor: colors.navBg,
              color: colors.navText,
              borderColor: colors.dividerColor
            }}
          >
            <div className="flex items-center gap-2 select-none">
              <span 
                className="font-bold text-xs uppercase tracking-widest font-mono"
                style={{ fontFamily: `"${typography.heading.family}", sans-serif` }}
              >
                ✦ {headerTitle || 'RLB Designs Theme Studio'}
              </span>
            </div>
            
            <div className="flex items-center gap-4 text-[10px] font-mono tracking-widest uppercase leading-none">
              <div className="hidden md:flex items-center gap-4">
                {['Home', ...(colors.primaryButtonBg ? [
                  colors.primaryButtonBg.toUpperCase() === '#E07A5F' ? 'Clinic Tour' :
                  colors.primaryButtonBg.toUpperCase() === '#D6C5B3' ? 'Lavender Craft' :
                  colors.primaryButtonBg.toUpperCase() === '#A2C2E8' ? 'Luxury Villas' :
                  colors.primaryButtonBg.toUpperCase() === '#FF9F1C' ? 'Wood-Fired Menu' :
                  colors.primaryButtonBg.toUpperCase() === '#3B82F6' ? 'AI Mentoring' :
                  colors.primaryButtonBg.toUpperCase() === '#FDA4AF' ? 'Facial Care' :
                  colors.primaryButtonBg.toUpperCase() === '#10B981' ? 'Flavor Profiles' :
                  colors.primaryButtonBg.toUpperCase() === '#78350F' ? 'Cocoa Journey' :
                  colors.primaryButtonBg.toUpperCase() === '#FB7185' ? 'Ollie Book Owl' :
                  colors.primaryButtonBg.toUpperCase() === '#F59E0B' ? 'Sensory Play Gym' :
                  colors.primaryButtonBg.toUpperCase() === '#111827' ? 'Second Brain PARA' : 'Our Services',
                  colors.primaryButtonBg.toUpperCase() === '#E07A5F' ? 'Services' :
                  colors.primaryButtonBg.toUpperCase() === '#D6C5B3' ? 'Our Soaps' :
                  colors.primaryButtonBg.toUpperCase() === '#A2C2E8' ? 'Breezy Amenities' :
                  colors.primaryButtonBg.toUpperCase() === '#FF9F1C' ? 'Track Foodtruck' :
                  colors.primaryButtonBg.toUpperCase() === '#3B82F6' ? 'Workflow Specs' :
                  colors.primaryButtonBg.toUpperCase() === '#FDA4AF' ? 'Lymphatic Massage' :
                  colors.primaryButtonBg.toUpperCase() === '#10B981' ? 'Mineral Seltzers' :
                  colors.primaryButtonBg.toUpperCase() === '#78350F' ? 'Gift Boxes' :
                  colors.primaryButtonBg.toUpperCase() === '#FB7185' ? 'Bedtime Stories' :
                  colors.primaryButtonBg.toUpperCase() === '#F59E0B' ? 'Climb Soft Area' :
                  colors.primaryButtonBg.toUpperCase() === '#111827' ? 'Resource Databases' : 'Pricing Guides',
                  colors.primaryButtonBg.toUpperCase() === '#E07A5F' ? 'FAQs' :
                  colors.primaryButtonBg.toUpperCase() === '#D6C5B3' ? 'Philosophy' :
                  colors.primaryButtonBg.toUpperCase() === '#A2C2E8' ? 'Pricing Table' :
                  colors.primaryButtonBg.toUpperCase() === '#FF9F1C' ? 'Community FAQ' :
                  colors.primaryButtonBg.toUpperCase() === '#3B82F6' ? 'Hardware Board' :
                  colors.primaryButtonBg.toUpperCase() === '#FDA4AF' ? 'Glam Salon Tour' :
                  colors.primaryButtonBg.toUpperCase() === '#10B981' ? 'Bulk Orders' :
                  colors.primaryButtonBg.toUpperCase() === '#78350F' ? 'Supply Stories' :
                  colors.primaryButtonBg.toUpperCase() === '#FB7185' ? 'Parents Corner' :
                  colors.primaryButtonBg.toUpperCase() === '#F59E0B' ? 'Nursery Support' :
                  colors.primaryButtonBg.toUpperCase() === '#111827' ? 'Archive Grid' : 'Inquiry FAQ'
                ] : ['Services', 'Pricing Guides', 'Inquiry FAQ'])].map((tab) => {
                  const isCurrent = multiPageMode && activeSubPage === tab;
                  return (
                    <button
                      key={tab}
                      onClick={() => {
                        if (multiPageMode) {
                          setActiveSubPage(tab);
                        }
                      }}
                      className={`hover:opacity-100 transition pb-1 border-b cursor-pointer ${isCurrent ? 'opacity-100 font-extrabold border-current' : 'opacity-65 border-transparent hover:opacity-85'}`}
                      style={{ color: colors.navText }}
                    >
                      {tab}
                    </button>
                  );
                })}
              </div>
              <a 
                href={normalizeUrl(headerCtaUrl)}
                target={getLinkTarget(headerCtaUrl)}
                rel="noopener noreferrer"
                onClick={(e) => handleLinkClick(e, headerCtaUrl)}
                className="p-1.5 px-3 rounded-none text-[9px] uppercase font-mono tracking-wider transition flex items-center gap-1 cursor-pointer focus:outline-none border hover:opacity-90 font-bold"
                style={{
                  backgroundColor: colors.primaryButtonBg,
                  borderColor: colors.dividerColor,
                  color: colors.primaryButtonText
                }}
              >
                <span>{headerCtaText || 'Discover'}</span>
                <MoveUpRight className="w-2.5 h-2.5" />
              </a>
              <Menu className="w-4 h-4 md:hidden block hover:opacity-85 cursor-pointer text-current" />
            </div>
          </nav>

          {/* Subpage simulation sticky status flag helpful to clarify editing */}
          {multiPageMode && (
            <div className="bg-[#FAF9F6] border-b border-[#E5E2DE] p-2 text-center text-[10px] text-slate-500 font-mono tracking-tight flex items-center justify-center gap-1.5 shrink-0 select-none">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-ping shrink-0" />
              <span>Simulating Subpage: <strong className="text-slate-800 uppercase underline decoration-amber-500 decoration-2">{activeSubPage}</strong>. Click navbar links to switch views or modify block rows in the sidebar list.</span>
            </div>
          )}

          {/* Sections List Renderer */}
          {sections.length === 0 ? (
            <div className="flex-1 flex flex-col justify-center items-center py-24 px-6 text-center select-none">
              <div className="w-16 h-16 rounded-none bg-white flex items-center justify-center mb-4 border border-[#E5E2DE]">
                <Menu className="w-6 h-6 text-[#1A1A1A]" />
              </div>
              <h3 
                className="text-base font-serif italic font-bold mb-1"
                style={{ fontFamily: `"${typography.heading.family}", sans-serif`, color: typography.heading.color || colors.headingColor }}
              >
                No active layout template rows.
              </h3>
              <p className="max-w-[320px] text-[11px] text-[#413A36] leading-normal block italic">
                Use the sidebar <strong>Layers & Sections</strong> library tool to insert a pre-built section block template row onto your theme preview.
              </p>
            </div>
          ) : (
            <div className="flex-1 flex flex-col">
              {(() => {
                // Dynamic responsive font size adjustment based on viewportModes
                const getFontSizeStr = (sizeStr: string, type: 'title' | 'heading' | 'body') => {
                  if (!sizeStr) return undefined;
                  const match = sizeStr.match(/^([\d.]+)(.*)$/);
                  if (!match) return sizeStr;
                  const num = parseFloat(match[1]);
                  const unit = match[2].trim() || 'px';
                  let pxValue = num;
                  if (unit === 'rem' || unit === 'em') {
                    pxValue = num * 16;
                  }
                  
                  let scale = 1;
                  if (type === 'title') {
                    if (viewportMode === 'mobile') {
                      scale = 0.52; // Scale down around 48% on Mobile simulation
                    } else if (viewportMode === 'tablet') {
                      scale = 0.78; // Scale down around 22% on Tablet simulation
                    }
                  } else if (type === 'heading') {
                    if (viewportMode === 'mobile') {
                      scale = 0.75;
                    } else if (viewportMode === 'tablet') {
                      scale = 0.88;
                    }
                  } else if (type === 'body') {
                    if (viewportMode === 'mobile') {
                      scale = 0.95;
                    }
                  }
                  
                  const finalPx = pxValue * scale;
                  const minPx = type === 'title' ? 18 : (type === 'heading' ? 16 : 12);
                  return `${Math.max(minPx, finalPx)}px`;
                };

                const subPagesList = ['Home', ...(colors.primaryButtonBg ? [
                  colors.primaryButtonBg.toUpperCase() === '#E07A5F' ? 'Clinic Tour' :
                  colors.primaryButtonBg.toUpperCase() === '#D6C5B3' ? 'Lavender Craft' :
                  colors.primaryButtonBg.toUpperCase() === '#A2C2E8' ? 'Luxury Villas' :
                  colors.primaryButtonBg.toUpperCase() === '#FF9F1C' ? 'Wood-Fired Menu' :
                  colors.primaryButtonBg.toUpperCase() === '#3B82F6' ? 'AI Mentoring' :
                  colors.primaryButtonBg.toUpperCase() === '#FDA4AF' ? 'Facial Care' :
                  colors.primaryButtonBg.toUpperCase() === '#10B981' ? 'Flavor Profiles' :
                  colors.primaryButtonBg.toUpperCase() === '#78350F' ? 'Cocoa Journey' :
                  colors.primaryButtonBg.toUpperCase() === '#FB7185' ? 'Ollie Book Owl' :
                  colors.primaryButtonBg.toUpperCase() === '#F59E0B' ? 'Sensory Play Gym' :
                  colors.primaryButtonBg.toUpperCase() === '#111827' ? 'Second Brain PARA' : 'Our Services',
                  colors.primaryButtonBg.toUpperCase() === '#E07A5F' ? 'Services' :
                  colors.primaryButtonBg.toUpperCase() === '#D6C5B3' ? 'Our Soaps' :
                  colors.primaryButtonBg.toUpperCase() === '#A2C2E8' ? 'Breezy Amenities' :
                  colors.primaryButtonBg.toUpperCase() === '#FF9F1C' ? 'Track Foodtruck' :
                  colors.primaryButtonBg.toUpperCase() === '#3B82F6' ? 'Workflow Specs' :
                  colors.primaryButtonBg.toUpperCase() === '#FDA4AF' ? 'Lymphatic Massage' :
                  colors.primaryButtonBg.toUpperCase() === '#10B981' ? 'Mineral Seltzers' :
                  colors.primaryButtonBg.toUpperCase() === '#78350F' ? 'Gift Boxes' :
                  colors.primaryButtonBg.toUpperCase() === '#FB7185' ? 'Bedtime Stories' :
                  colors.primaryButtonBg.toUpperCase() === '#F59E0B' ? 'Climb Soft Area' :
                  colors.primaryButtonBg.toUpperCase() === '#111827' ? 'Resource Databases' : 'Pricing Guides',
                  colors.primaryButtonBg.toUpperCase() === '#E07A5F' ? 'FAQs' :
                  colors.primaryButtonBg.toUpperCase() === '#D6C5B3' ? 'Philosophy' :
                  colors.primaryButtonBg.toUpperCase() === '#A2C2E8' ? 'Pricing Table' :
                  colors.primaryButtonBg.toUpperCase() === '#FF9F1C' ? 'Community FAQ' :
                  colors.primaryButtonBg.toUpperCase() === '#3B82F6' ? 'Hardware Board' :
                  colors.primaryButtonBg.toUpperCase() === '#FDA4AF' ? 'Glam Salon Tour' :
                  colors.primaryButtonBg.toUpperCase() === '#10B981' ? 'Bulk Orders' :
                  colors.primaryButtonBg.toUpperCase() === '#78350F' ? 'Supply Stories' :
                  colors.primaryButtonBg.toUpperCase() === '#FB7185' ? 'Parents Corner' :
                  colors.primaryButtonBg.toUpperCase() === '#F59E0B' ? 'Nursery Support' :
                  colors.primaryButtonBg.toUpperCase() === '#111827' ? 'Archive Grid' : 'Inquiry FAQ'
                ] : ['Services', 'Pricing Guides', 'Inquiry FAQ'])];

                const activeTabIndex = subPagesList.indexOf(activeSubPage);

                const getFilteredSections = () => {
                  const activeSections = sections.filter(s => !s.hidden);
                  if (!multiPageMode) return activeSections;
                  
                  return activeSections.filter((sect, sIdx) => {
                    // Check explicit targetPage overrides first if set:
                    if (sect.targetPage && sect.targetPage !== 'auto') {
                      if (sect.targetPage === 'all') return true;
                      if (sect.targetPage === 'home') return activeTabIndex === 0;
                      if (sect.targetPage === 'page2') return activeTabIndex === 1;
                      if (sect.targetPage === 'page3') return activeTabIndex === 2;
                      if (sect.targetPage === 'page4') return activeTabIndex === 3;
                    }

                    // Fallback check if activeSections length is tiny
                    if (activeSections.length <= 2) return true;

                    // Check according to segment type default rules
                    if (activeTabIndex === 0) {
                      // Home: Hero, or first split block, or last footer block
                      return sect.type === 'hero' || sIdx === 0 || (sect.type === 'split' && sIdx === 1) || sect.type === 'footer';
                    }
                    if (activeTabIndex === 1) {
                      // Tab 1 (Details/Splits/Bento): bento, or any split/two-col that is not the first one
                      return sect.type === 'bento' || sect.type === 'two-col' || (sect.type === 'split' && sIdx > 1);
                    }
                    if (activeTabIndex === 2) {
                      // Tab 2 (Services/Features/Pricing): features / link-in-bio / pricing lists
                      return sect.type === 'features' || sect.type === 'pricing' || sect.type === 'link-in-bio';
                    }
                    if (activeTabIndex === 3) {
                      // Tab 3 (Help/FAQs/Reviews): faq / testimonials / final footer
                      return sect.type === 'faq' || sect.type === 'testimonials' || sect.type === 'footer';
                    }
                    return true;
                  });
                };

                const visibleSections = getFilteredSections();

                if (visibleSections.length === 0) {
                  return (
                    <div className="flex-1 flex flex-col justify-center items-center py-24 px-6 text-center select-none bg-[#FAF9F6] border border-dashed border-slate-300 m-6">
                      <div className="w-12 h-12 rounded-none mb-3 flex items-center justify-center border border-dashed border-slate-300">
                        <HelpCircle className="w-5 h-5 text-slate-400" />
                      </div>
                      <h4 
                        className="text-sm font-serif font-bold italic mb-1"
                        style={{ fontFamily: `"${typography.heading.family}", sans-serif`, color: typography.heading.color || colors.headingColor }}
                      >
                        Empty Virtual Page Tab Details
                      </h4>
                      <p className="max-w-[280px] text-[10px] text-slate-500 italic block leading-normal">
                        No rows of the type matching "{activeSubPage}" are currently added to your theme sections. Swap to "Single page continuous" mode in the simulator top bar or add blocks to your layout in the sidebar list.
                      </p>
                    </div>
                  );
                }

                return visibleSections.map((section, sectionIdx) => {
                  // Alternating three background styles precisely as defined in Google Sites theme variations
                  const styleIndex = sectionIdx % 3;
                  const sectionBg = 
                    styleIndex === 0 ? colors.primaryBg : 
                    styleIndex === 1 ? colors.secondaryBg : 
                    (colors.tertiaryBg || colors.secondaryBg);

                  const titleStyle = {
                    fontFamily: `"${typography.title?.family || typography.heading?.family || 'Playfair Display'}", sans-serif`,
                    fontWeight: typography.title?.weight || '700',
                    color: typography.title?.color || colors.titleColor || colors.headingColor,
                    letterSpacing: typography.title?.letterSpacing || '0em',
                    fontSize: getFontSizeStr(typography.title?.size || '48px', 'title'),
                  };

                  const headingStyle = {
                    fontFamily: `"${typography.heading?.family || 'Playfair Display'}", sans-serif`,
                    fontWeight: typography.heading?.weight || '600',
                    color: typography.heading?.color || colors.headingColor,
                    fontSize: getFontSizeStr(typography.heading?.size || '24px', 'heading'),
                  };

                  const subheadingStyle = {
                    fontFamily: `"${typography.subheading?.family || typography.heading?.family || 'Playfair Display'}", sans-serif`,
                    fontWeight: typography.subheading?.weight || '500',
                    color: typography.subheading?.color || colors.subheadingColor || colors.headingColor,
                    letterSpacing: typography.subheading?.letterSpacing || '0em',
                    fontSize: getFontSizeStr(typography.subheading?.size || '18px', 'heading'),
                  };

                  const bodyStyle = {
                    fontFamily: `"${typography.body?.family || 'Inter'}", sans-serif`,
                    fontWeight: typography.body?.weight || '400',
                    color: typography.body?.color || colors.bodyTextColor || colors.textColor,
                    letterSpacing: typography.body?.letterSpacing || '0em',
                    fontSize: getFontSizeStr(typography.body?.size || '14px', 'body'),
                  };

                  const smallTextStyle = {
                    fontFamily: `"${typography.smallText?.family || typography.body?.family || 'Inter'}", sans-serif`,
                    fontWeight: typography.smallText?.weight || '400',
                    color: typography.smallText?.color || colors.smallTextColor || colors.textColor,
                    letterSpacing: typography.smallText?.letterSpacing || '0.01em',
                    fontSize: getFontSizeStr(typography.smallText?.size || '11px', 'body'),
                  };

                  return (
                    <section 
                      key={section.id}
                      id={`preview-sec-${section.id}`}
                      className={`${section.type === 'hero' && section.imageUrl ? 'py-4 md:py-6' : 'py-12'} px-4 sm:px-6 border-b transition`}
                      style={{
                        backgroundColor: sectionBg,
                        borderColor: colors.dividerColor
                      }}
                    >
                      <div className={`${section.type === 'hero' && section.imageUrl ? 'max-w-5xl' : 'max-w-4xl'} mx-auto space-y-6`}>

                        {/* 1. HERO SECTION */}
                        {section.type === 'hero' && (
                          section.imageUrl ? (
                            <div 
                              className="relative w-full rounded-none overflow-hidden border border-[#E5E2DE] shadow-xs bg-cover bg-center min-h-[280px] md:min-h-[365px] flex items-center justify-center p-4 md:p-8 select-none transition duration-500"
                              style={{ 
                                backgroundImage: `url(${section.imageUrl})`,
                              }}
                            >
                              {/* Dark softening overlay with slight backdrop-blur */}
                              <div className="absolute inset-0 bg-black/35 backdrop-blur-[0.5px]" />
                              
                              {/* Overlay content container card with custom transparency of the themed background */}
                              <div 
                                className="relative z-10 max-w-2xl w-full p-5 md:p-8 text-center border shadow-lg flex flex-col items-center justify-center space-y-3.5"
                                style={{
                                  backgroundColor: (() => {
                                    const opacity = section.bannerOpacity !== undefined ? section.bannerOpacity : 96;
                                    const hex = colors.primaryBg.trim().replace('#', '');
                                    let r = 255, g = 255, b = 255;
                                    if (hex.length === 3) {
                                      r = parseInt(hex[0] + hex[0], 16);
                                      g = parseInt(hex[1] + hex[1], 16);
                                      b = parseInt(hex[2] + hex[2], 16);
                                    } else if (hex.length === 6) {
                                      r = parseInt(hex.substring(0, 2), 16);
                                      g = parseInt(hex.substring(2, 4), 16);
                                      b = parseInt(hex.substring(4, 6), 16);
                                    }
                                    return `rgba(${r}, ${g}, ${b}, ${opacity / 100})`;
                                  })(),
                                  borderColor: (() => {
                                    const opacity = section.bannerOpacity !== undefined ? section.bannerOpacity : 96;
                                    const hex = colors.dividerColor.trim().replace('#', '');
                                    let r = 229, g = 226, b = 222;
                                    if (hex.length === 3) {
                                      r = parseInt(hex[0] + hex[0], 16);
                                      g = parseInt(hex[1] + hex[1], 16);
                                      b = parseInt(hex[2] + hex[2], 16);
                                    } else if (hex.length === 6) {
                                      r = parseInt(hex.substring(0, 2), 16);
                                      g = parseInt(hex.substring(2, 4), 16);
                                      b = parseInt(hex.substring(4, 6), 16);
                                    }
                                    return `rgba(${r}, ${g}, ${b}, ${opacity / 100})`;
                                  })(),
                                  color: colors.textColor,
                                }}
                              >
                                <h1 
                                  className="text-2xl md:text-3xl lg:text-4xl font-serif font-bold italic tracking-tight leading-tight block uppercase"
                                  style={titleStyle}
                                >
                                  {section.title}
                                </h1>
                                {section.subtitle && (
                                  <p 
                                    className="text-xs md:text-sm opacity-90 leading-relaxed block font-medium"
                                    style={bodyStyle}
                                  >
                                    {section.subtitle}
                                  </p>
                                )}
                                {section.content && (
                                  <p 
                                    className="text-[10px] md:text-[11px] max-w-lg mx-auto opacity-75 block leading-relaxed font-normal"
                                    style={bodyStyle}
                                  >
                                    {section.content}
                                  </p>
                                )}
                                {section.ctaText && (
                                  <div className="pt-1.5">
                                    <a
                                      href={normalizeUrl(section.ctaUrl)}
                                      target={getLinkTarget(section.ctaUrl)}
                                      rel="noopener noreferrer"
                                      onClick={(e) => handleLinkClick(e, section.ctaUrl)}
                                      className="inline-flex items-center gap-1.5 p-2 px-5 rounded-none text-[9px] font-mono uppercase tracking-widest transition duration-200 hover:opacity-90"
                                      style={{
                                        backgroundColor: colors.primaryButtonBg,
                                        color: colors.primaryButtonText,
                                      }}
                                    >
                                      <span>{section.ctaText}</span>
                                      <ArrowRight className="w-3.5 h-3.5" />
                                    </a>
                                  </div>
                                )}
                              </div>
                            </div>
                          ) : (
                            <div className="text-center py-6 space-y-4">
                              <h1 
                                className="text-3xl md:text-5xl lg:text-6xl font-serif font-bold italic tracking-tight leading-tight block uppercase"
                                style={titleStyle}
                              >
                                {section.title}
                              </h1>
                              {section.subtitle && (
                                <p 
                                  className="text-xs md:text-sm opacity-90 max-w-2xl mx-auto leading-relaxed block font-medium"
                                  style={bodyStyle}
                                >
                                  {section.subtitle}
                                </p>
                              )}
                              {section.content && (
                                <p 
                                  className="text-[11px] max-w-lg mx-auto opacity-70 block leading-relaxed"
                                  style={bodyStyle}
                                >
                                  {section.content}
                                </p>
                              )}
                              {section.ctaText && (
                                <div className="pt-2">
                                  <a
                                    href={normalizeUrl(section.ctaUrl)}
                                    target={getLinkTarget(section.ctaUrl)}
                                    rel="noopener noreferrer"
                                    onClick={(e) => handleLinkClick(e, section.ctaUrl)}
                                    className="inline-flex items-center gap-1.5 p-2.5 px-6 rounded-none text-[10px] font-mono uppercase tracking-widest transition"
                                    style={{
                                      backgroundColor: colors.primaryButtonBg,
                                      color: colors.primaryButtonText,
                                    }}
                                  >
                                    <span>{section.ctaText}</span>
                                    <ArrowRight className="w-3.5 h-3.5" />
                                  </a>
                                </div>
                              )}
                            </div>
                          )
                        )}

                      {/* 2. FEATURES GRID SECTION */}
                      {section.type === 'features' && (
                        <div className="space-y-6">
                          <div className="text-center space-y-1">
                            <h2 className="text-xl md:text-2xl font-serif font-bold italic" style={headingStyle}>{section.title}</h2>
                            {section.subtitle && <p className="text-xs opacity-75 max-w-lg mx-auto" style={bodyStyle}>{section.subtitle}</p>}
                          </div>
                          
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            {section.items?.map((item) => (
                              <div 
                                key={item.id} 
                                className="p-5 rounded-none border transition bg-white"
                                style={{
                                  backgroundColor: colors.primaryBg,
                                  borderColor: colors.dividerColor
                                }}
                              >
                                <div 
                                  className="w-7 h-7 rounded-none mb-3 flex items-center justify-center border"
                                  style={{ backgroundColor: colors.secondaryBg, borderColor: colors.dividerColor }}
                                >
                                  <CheckCircle2 className="w-3.5 h-3.5 shrink-0" style={{ color: colors.primaryButtonBg }} />
                                </div>
                                <h3 className="text-xs font-serif font-bold italic mb-1" style={headingStyle}>{item.title}</h3>
                                <p className="text-[11px] opacity-80 leading-normal" style={bodyStyle}>{item.description}</p>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* 3. IMAGE SPLIT SECTION */}
                      {section.type === 'split' && (
                        <div className={`grid grid-cols-1 md:grid-cols-2 gap-8 items-center`}>
                          <div className={`${section.imagePosition === 'right' ? 'md:order-1' : 'md:order-2'} space-y-4`}>
                            <h2 className="text-2xl md:text-3xl font-serif font-bold italic leading-tight" style={headingStyle}>{section.title}</h2>
                            {section.subtitle && <p className="text-[9px] font-mono uppercase tracking-widest" style={{ color: colors.primaryButtonBg }}>{section.subtitle}</p>}
                            {section.content && <p className="text-xs opacity-80 leading-relaxed" style={bodyStyle}>{section.content}</p>}
                            {section.ctaText && (
                              <div className="pt-2">
                                <a
                                  href={normalizeUrl(section.ctaUrl)}
                                  target={getLinkTarget(section.ctaUrl)}
                                  rel="noopener noreferrer"
                                  onClick={(e) => handleLinkClick(e, section.ctaUrl)}
                                  className="inline-flex items-center gap-1.5 p-2 px-5 rounded-none text-[10px] uppercase font-mono tracking-widest transition"
                                  style={{
                                    backgroundColor: colors.primaryButtonBg,
                                    color: colors.primaryButtonText,
                                  }}
                                >
                                  <span>{section.ctaText}</span>
                                  <ArrowRight className="w-3.5 h-3.5" />
                                </a>
                              </div>
                            )}
                          </div>
                          <div className={`${section.imagePosition === 'right' ? 'md:order-2' : 'md:order-1'}`}>
                            <div className="relative group">
                              <img 
                                src={section.imageUrl || 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=800&q=80'} 
                                alt={section.title}
                                referrerPolicy="no-referrer"
                                className="w-full h-56 object-cover rounded-none border transition-all duration-350 group-hover:brightness-95"
                                style={{ borderColor: colors.dividerColor }}
                              />
                              {/* Google Sites Image Carousel Active Dot & Navigation indicator bar */}
                              <div className="mt-3 flex flex-col items-center justify-center space-y-1">
                                <div className="flex items-center gap-2">
                                  <span className="w-2 h-2 rounded-full inline-block border border-black/25 shadow-xs transition" style={{ backgroundColor: colors.carouselActiveDotColor }} title="Active slide dot indicator" />
                                  <span className="w-1.5 h-1.5 rounded-full inline-block bg-slate-300 hover:bg-slate-400 cursor-pointer" title="Slide 2 indicator" />
                                  <span className="w-1.5 h-1.5 rounded-full inline-block bg-slate-300 hover:bg-slate-400 cursor-pointer" title="Slide 3 indicator" />
                                </div>
                                <span className="text-[9px] uppercase tracking-wider text-slate-400 font-mono" style={smallTextStyle}>
                                  Google Sites Carousel active dot demonstration
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                      )}

                      {/* 4. TWO COLUMN SYMMETRICAL SPLIT */}
                      {section.type === 'two-col' && (
                        <div className="space-y-6">
                          <div className="text-center space-y-1">
                            <h2 className="text-xl md:text-2xl font-serif font-bold italic" style={headingStyle}>{section.title}</h2>
                            {section.subtitle && <p className="text-xs opacity-75 mr-auto" style={bodyStyle}>{section.subtitle}</p>}
                          </div>

                          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {section.items?.map((item) => (
                              <div 
                                key={item.id} 
                                className="p-5 rounded-none border space-y-2 text-left bg-white"
                                style={{
                                  backgroundColor: colors.primaryBg,
                                  borderColor: colors.dividerColor
                                }}
                              >
                                <h3 className="text-xs font-mono uppercase tracking-widest inline-block bg-slate-50 border p-1 px-2.5 rounded-none" style={headingStyle}>
                                  {item.title}
                                </h3>
                                <p className="text-xs opacity-80 leading-relaxed" style={bodyStyle}>{item.description}</p>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* 5. BENTO GRID PORTFOLIO */}
                      {section.type === 'bento' && (
                        <div className="space-y-6">
                          <div className="text-center space-y-1">
                            <h2 className="text-xl md:text-2xl font-serif font-bold italic" style={headingStyle}>{section.title}</h2>
                            {section.subtitle && <p className="text-xs opacity-75" style={bodyStyle}>{section.subtitle}</p>}
                          </div>

                          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            {section.items?.map((item, idx) => {
                              const isLarge = idx === 0;
                              return (
                                <div 
                                  key={item.id}
                                  className={`p-5 rounded-none border flex flex-col justify-between transition min-h-[160px] bg-white ${isLarge ? 'md:col-span-2' : ''}`}
                                  style={{
                                    backgroundColor: isLarge ? colors.secondaryBg : colors.primaryBg,
                                    borderColor: colors.dividerColor
                                  }}
                                >
                                  <div>
                                    {item.tag && (
                                      <span 
                                        className="text-[8px] font-mono tracking-widest uppercase border p-1 px-2.5 inline-block mb-3 bg-white"
                                        style={{ color: colors.primaryButtonBg, borderColor: colors.dividerColor }}
                                      >
                                        {item.tag}
                                      </span>
                                    )}
                                    <h3 className="text-xs font-serif font-bold italic mb-1" style={headingStyle}>{item.title}</h3>
                                    <p className="text-xs opacity-80 leading-normal" style={bodyStyle}>{item.description}</p>
                                  </div>
                                  <div className="flex justify-end pt-3">
                                    <ChevronRight className="w-4 h-4 text-slate-400" />
                                  </div>
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      )}

                      {/* 6. EXPANDABLE FAQs */}
                      {section.type === 'faq' && (
                        <div className="space-y-6 max-w-2xl mx-auto">
                          <div className="text-center space-y-1">
                            <h2 className="text-xl md:text-2xl font-serif font-bold italic" style={headingStyle}>{section.title}</h2>
                            {section.subtitle && <p className="text-xs opacity-75" style={bodyStyle}>{section.subtitle}</p>}
                          </div>

                          <div className="space-y-3">
                            {section.items?.map((item) => (
                              <div 
                                key={item.id}
                                className="p-4.5 rounded-none border text-left bg-white"
                                style={{
                                  backgroundColor: colors.primaryBg,
                                  borderColor: colors.dividerColor
                                }}
                              >
                                <span className="text-xs font-serif font-bold block mb-1" style={headingStyle}>
                                  ❓ {item.title}
                                </span>
                                <p className="text-[11px] opacity-80 leading-relaxed border-t pt-2 mt-2 font-mono" style={{ ...bodyStyle, borderColor: colors.dividerColor }}>
                                  {item.description}
                                </p>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* 7. CUSTOMER TESTIMONIALS */}
                      {section.type === 'testimonials' && (
                        <div className="space-y-6">
                          <div className="text-center space-y-1">
                            <h2 className="text-xl md:text-2xl font-serif font-bold italic" style={headingStyle}>{section.title}</h2>
                            {section.subtitle && <p className="text-xs opacity-75" style={bodyStyle}>{section.subtitle}</p>}
                          </div>

                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {section.items?.map((item) => (
                              <div 
                                key={item.id}
                                className="p-5 rounded-none border text-left space-y-3 relative bg-white"
                                style={{
                                  backgroundColor: colors.primaryBg,
                                  borderColor: colors.dividerColor
                                }}
                              >
                                <Quote className="w-7 h-7 absolute -top-3.5 right-4 rotate-180 opacity-15" style={{ color: colors.primaryButtonBg }} />
                                
                                <div className="flex gap-0.5">
                                  {[...Array(5)].map((_, i) => (
                                    <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-500" />
                                  ))}
                                </div>

                                <p className="text-xs opacity-85 italic leading-relaxed font-serif" style={bodyStyle}>
                                  "{item.description}"
                                </p>

                                <div className="border-t pt-2 flex justify-between items-center" style={{ borderColor: colors.dividerColor }}>
                                  <span className="text-[11px] font-mono tracking-wider font-semibold" style={headingStyle}>{item.title}</span>
                                  {item.tag && <span className="text-[8px] font-mono tracking-widest opacity-60 uppercase p-0.5 px-1 bg-slate-50 border">{item.tag}</span>}
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* 8. LINK IN BIO SECTION */}
                      {section.type === 'link-in-bio' && (
                        <div className="space-y-6 max-w-md mx-auto text-center">
                          <div className="space-y-1">
                            <h2 className="text-xl md:text-2xl font-serif font-bold italic" style={headingStyle}>{section.title}</h2>
                            {section.subtitle && <p className="text-xs opacity-75" style={bodyStyle}>{section.subtitle}</p>}
                          </div>

                          <div className="grid grid-cols-1 gap-2">
                            {section.items?.map((item) => (
                              <a 
                                key={item.id}
                                href={normalizeUrl(item.url)}
                                target={getLinkTarget(item.url)}
                                rel="noopener noreferrer"
                                onClick={(e) => handleLinkClick(e, item.url)}
                                className="p-3.5 border rounded-none hover:scale-[1.01] hover:brightness-95 transition flex items-center justify-between text-left shadow-xs bg-white"
                                style={{
                                  backgroundColor: colors.primaryBg,
                                  borderColor: colors.dividerColor
                                }}
                              >
                                <div className="max-w-[85%]">
                                  <span className="text-xs font-serif font-bold italic block" style={headingStyle}>{item.title}</span>
                                  <span className="text-[10px] opacity-75 mt-0.5 block truncate" style={bodyStyle}>{item.description}</span>
                                </div>
                                <div 
                                  className="w-6 h-6 rounded-none border flex items-center justify-center"
                                  style={{ backgroundColor: colors.secondaryBg, borderColor: colors.dividerColor }}
                                >
                                  <ChevronRight className="w-3.5 h-3.5" />
                                </div>
                              </a>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* 9. PRICING GRID */}
                      {section.type === 'pricing' && (
                        <div className="space-y-6">
                          <div className="text-center space-y-1">
                            <h2 className="text-xl md:text-2xl font-serif font-bold italic" style={headingStyle}>{section.title}</h2>
                            {section.subtitle && <p className="text-xs opacity-75" style={bodyStyle}>{section.subtitle}</p>}
                          </div>

                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-2xl mx-auto">
                            {section.items?.map((item) => {
                              const isPopular = item.tag !== undefined;
                              return (
                                <div 
                                  key={item.id}
                                  className={`p-6 rounded-none border text-left flex flex-col justify-between relative transition bg-white ${isPopular ? 'border-2 border-black' : ''}`}
                                  style={{
                                    backgroundColor: colors.primaryBg,
                                    borderColor: isPopular ? '#1A1A1A' : colors.dividerColor
                                  }}
                                >
                                  {isPopular && (
                                    <span 
                                      className="absolute -top-3 left-6 text-[8px] font-mono uppercase tracking-widest p-1 px-3 text-white"
                                      style={{ backgroundColor: colors.primaryButtonBg }}
                                    >
                                      {item.tag}
                                    </span>
                                  )}

                                  <div className="space-y-4">
                                    <div>
                                      <h3 className="text-xs font-mono uppercase tracking-widest" style={headingStyle}>{item.title}</h3>
                                      <p className="text-[11px] opacity-70 leading-normal" style={bodyStyle}>{item.description}</p>
                                    </div>
                                    <div className="flex items-baseline">
                                      <span className="text-2xl font-serif font-bold italic" style={headingStyle}>{item.price}</span>
                                      <span className="text-[9px] font-mono uppercase tracking-widest opacity-60 ml-2">/ per project design</span>
                                    </div>
                                  </div>

                                  <div className="pt-6">
                                    <button 
                                      className="w-full p-2.5 rounded-none text-[10px] font-mono tracking-widest uppercase transition border"
                                      style={{
                                        backgroundColor: isPopular ? colors.primaryButtonBg : colors.secondaryButtonBg,
                                        color: isPopular ? colors.primaryButtonText : colors.secondaryButtonText,
                                        borderColor: colors.dividerColor
                                      }}
                                    >
                                      {item.ctaText}
                                    </button>
                                  </div>
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      )}

                      {/* 10. MULTI-COL FOOTER */}
                      {section.type === 'footer' && (
                        <div className="border-t pt-8 grid grid-cols-1 md:grid-cols-3 gap-6" style={{ borderColor: colors.dividerColor }}>
                          <div className="space-y-2 text-left">
                            <span className="text-xs font-mono uppercase tracking-widest block" style={headingStyle}>✦ {section.title}</span>
                            <span className="text-[11px] opacity-75 block max-w-[200px] font-serif italic" style={bodyStyle}>{section.subtitle}</span>
                          </div>

                          <div className="grid grid-cols-2 gap-4 md:col-span-2 text-left">
                            {section.items?.map((item) => (
                              <div key={item.id} className="space-y-1">
                                <span className="text-[9px] uppercase font-mono tracking-widest text-[#413A36] block">{item.title}</span>
                                <a 
                                  href={normalizeUrl(item.url)} 
                                  target={getLinkTarget(item.url)}
                                  rel="noopener noreferrer"
                                  onClick={(e) => handleLinkClick(e, item.url)}
                                  className="text-[11px] font-serif italic hover:underline block hover:opacity-100 opacity-80"
                                  style={{ color: colors.primaryButtonBg }}
                                >
                                  {item.description}
                                </a>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                    </div>
                  </section>
                );
              });
            })()}
          </div>
        )}

          {/* Simulated Google Site Footer signature */}
          <footer 
            className="p-5 border-t text-center text-[9px] font-mono tracking-widest uppercase text-slate-450 shrink-0 mt-auto select-none bg-white flex items-center justify-center gap-1.5"
            style={{
              backgroundColor: colors.navBg,
              borderColor: colors.dividerColor,
              color: colors.navText
            }}
          >
            <span>POWERED BY RLB DESIGNS MINIMALIST DESIGNER TOOLKIT V{APP_VERSION}</span>
          </footer>

        </div>
      </div>

      {/* Absolute Comparative Overlay Window */}
      {showComparison && comparisonUrl && (
        <div
          className="absolute z-50 bg-[#FAF9F6] border-2 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] flex flex-col overflow-hidden"
          style={{
            left: `${overlayPos.x}px`,
            top: `${overlayPos.y}px`,
            width: `${overlayWidth}px`,
            height: `${overlayHeight}px`,
            opacity: overlayOpacity / 100,
          }}
          id="comparator-overlay-window"
        >
          {/* Header Bar - Draggable */}
          <div
            onMouseDown={handleMouseDown}
            className="bg-black text-white p-2 px-3 flex items-center justify-between cursor-move select-none shrink-0"
          >
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-[10px] font-mono tracking-widest uppercase font-bold text-white">
                Live Companion Comparator
              </span>
            </div>
            <div className="flex items-center gap-2" onMouseDown={(e) => e.stopPropagation()}>
              <a
                href={comparisonUrl}
                target="_blank"
                rel="noreferrer"
                className="text-[9px] bg-[#333] hover:bg-[#444] text-slate-300 px-1.5 py-0.5 border border-slate-600 font-mono tracking-wider font-extrabold"
                title="Launch in a separate browser tab to bypass iframe sandbox restrictions"
              >
                OPEN OUTSIDE ↗
              </a>
              <button
                onClick={() => {
                  if (setShowComparison) setShowComparison(false);
                }}
                className="w-4 h-4 bg-[#CC3333] hover:bg-[#EE4444] text-white flex items-center justify-center font-bold text-[10px] uppercase font-mono cursor-pointer"
                title="Close overlay"
              >
                ✕
              </button>
            </div>
          </div>

          {/* Quick Resizing and Opacity Controls Bar */}
          <div className="bg-white border-b border-[#E5E2DE] p-2 flex flex-wrap items-center justify-between gap-2 text-[10px] shrink-0">
            {/* Opacity Control */}
            <div className="flex items-center gap-1.5">
              <label className="font-mono text-slate-600 uppercase tracking-wide text-[9px]">Opacity:</label>
              <input
                type="range"
                min="20"
                max="100"
                value={overlayOpacity}
                onChange={(e) => setOverlayOpacity(Number(e.target.value))}
                className="w-16 h-1 accent-black bg-slate-200 rounded-lg appearance-none cursor-pointer"
              />
              <span className="font-mono font-bold w-6 text-right text-slate-800">{overlayOpacity}%</span>
            </div>

            {/* Quick Presets */}
            <div className="flex items-center gap-1.5">
              <span className="font-mono text-slate-500 text-[9px] uppercase">Presets:</span>
              <button
                onClick={() => setOverlayWidth(360)}
                className={`px-1.5 py-0.5 font-mono text-[9px] border cursor-pointer ${overlayWidth === 360 ? 'bg-black text-white border-black font-bold' : 'bg-[#FAF9F6] text-slate-700 border-[#E5E2DE] hover:border-black'}`}
              >
                360w
              </button>
              <button
                onClick={() => setOverlayWidth(480)}
                className={`px-1.5 py-0.5 font-mono text-[9px] border cursor-pointer ${overlayWidth === 480 ? 'bg-black text-white border-black font-bold' : 'bg-[#FAF9F6] text-slate-700 border-[#E5E2DE] hover:border-black'}`}
              >
                (Split) 480w
              </button>
              <button
                onClick={() => setOverlayWidth(768)}
                className={`px-1.5 py-0.5 font-mono text-[9px] border cursor-pointer ${overlayWidth === 768 ? 'bg-black text-white border-black font-bold' : 'bg-[#FAF9F6] text-slate-700 border-[#E5E2DE] hover:border-black'}`}
              >
                Tablet (768w)
              </button>
            </div>
          </div>

          {/* Resizable Height & Width inputs */}
          <div className="bg-[#FAF9F6] border-b border-[#E5E2DE] p-1.5 px-3 flex flex-wrap items-center gap-3 text-[9px] font-mono shrink-0 text-slate-500">
            <div className="flex items-center gap-1">
              <span>W:</span>
              <input
                type="number"
                value={overlayWidth}
                onChange={(e) => setOverlayWidth(Math.max(200, Math.min(2000, Number(e.target.value))))}
                className="w-12 p-0.5 border border-[#E5E2DE] bg-white text-center focus:outline-none focus:border-black text-black font-bold"
              />
              <span>px</span>
            </div>
            <div className="flex items-center gap-1">
              <span>H:</span>
              <input
                type="number"
                value={overlayHeight}
                onChange={(e) => setOverlayHeight(Math.max(200, Math.min(1500, Number(e.target.value))))}
                className="w-12 p-0.5 border border-[#E5E2DE] bg-white text-center focus:outline-none focus:border-black text-black font-bold"
              />
              <span>px</span>
            </div>
            <div className="ml-auto text-slate-400 italic">
              ✨ Drag black header bar to move overlay
            </div>
          </div>

          {/* Core IFrame Container / Sandbox block */}
          <div className="flex-1 bg-slate-150 relative overflow-hidden flex flex-col">
            <iframe
              src={comparisonUrl}
              className="w-full h-full border-none bg-white"
              title="Published Site Comparator Overlay"
              sandbox="allow-same-origin allow-scripts allow-forms allow-popups"
            />

            {/* Embedded helpful tip for Google Sites iframe block warning */}
            <div className="absolute bottom-2 left-2 right-2 p-2.5 bg-rose-50 border border-rose-200 text-rose-900 text-[10px] leading-snug rounded-none font-serif italic shadow-sm pointer-events-auto">
              <div className="font-bold uppercase font-mono text-[9px] text-rose-800 not-italic mb-0.5 flex items-center justify-between">
                <span>⚠️ Loading Site Note</span>
                <span className="bg-rose-100 px-1 text-[8px] text-rose-700">Frame security policies</span>
              </div>
              Google Sites may restrict direct embedded previewing under strict frame headers. Click <strong>OPEN OUTSIDE ↗</strong> above to launch and inspect side-by-side!
            </div>
          </div>
        </div>
      )}

      {/* Floating Interactive Toast Message Block */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#1A1A1A] text-white p-3 px-5 border border-black shadow-lg flex items-center gap-3 transition-all duration-300 animate-slide-up rounded-none font-sans text-xs">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
          <p className="font-medium tracking-tight m-0">{toastMessage}</p>
          <button 
            onClick={() => setToastMessage(null)} 
            className="ml-2 font-mono text-[10px] text-slate-400 hover:text-white uppercase tracking-wider"
          >
            Dismiss
          </button>
        </div>
      )}
    </div>
  );
}
