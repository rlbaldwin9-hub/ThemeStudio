import React, { useState } from 'react';
import { Section, SectionType, ColorPalette } from '../types';
import { 
  Plus, Trash2, ArrowUp, ArrowDown, Copy, Edit3, 
  ChevronDown, ChevronUp, Layers, HelpCircle, Eye, EyeOff
} from 'lucide-react';

interface LayoutControlsProps {
  sections: Section[];
  onChange: (sections: Section[]) => void;
  colors: ColorPalette;
  headerTitle: string;
  setHeaderTitle: (val: string) => void;
  headerCtaText: string;
  setHeaderCtaText: (val: string) => void;
  headerCtaUrl: string;
  setHeaderCtaUrl: (val: string) => void;
  comparisonUrl: string;
  setComparisonUrl: (val: string) => void;
  showComparison: boolean;
  setShowComparison: (val: boolean) => void;
}

const TEMPLATE_PRESETS: { type: SectionType; name: string; description: string; defaultData: Section }[] = [
  {
    type: 'hero',
    name: '1. Elegant Hero',
    description: 'Header text banner with main Title, Subtitle, and a CTA link button.',
    defaultData: {
      id: '',
      type: 'hero',
      title: 'A New Beautiful Section Title',
      subtitle: 'Write an attractive subtitle explaining the major purpose of this block.',
      content: 'Provide detailed contextual sentences here. Perfect for custom introduction text.',
      ctaText: 'Get Started Today',
      ctaUrl: '#',
    }
  },
  {
    type: 'features',
    name: '2. Features Bullet Grid',
    description: 'Rows of styled benefit lists with descriptive sub-texts.',
    defaultData: {
      id: '',
      type: 'features',
      title: 'Our Premium Offerings',
      subtitle: 'Why people choose our modern templates',
      items: [
        { id: 'f-1', title: 'Speedy Delivery', description: 'Immediate download links provided right after your purchase verification.' },
        { id: 'f-2', title: 'Free Support Academy', description: 'Access step-by-step videos demonstrating setup tricks.' }
      ]
    }
  },
  {
    type: 'split',
    name: '3. Image-Text Split',
    description: 'Asymmetrical columns featuring a modern floating Unsplash photo and bullet block.',
    defaultData: {
      id: '',
      type: 'split',
      title: 'Beautiful Side-By-Side Visuals',
      subtitle: 'Stand out from standard Google Sites templates',
      content: 'Google Sites embeds represent the finest way to display custom grid layers. Insert responsive code snippets directly using Embed settings to maintain full custom formatting.',
      imageUrl: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=800&q=80',
      imagePosition: 'right',
      ctaText: 'View Showcase',
      ctaUrl: '#'
    }
  },
  {
    type: 'two-col',
    name: '4. Two-Column Symmetrical Split',
    description: 'Perfect balanced double column boxes supporting descriptive body text paragraphs.',
    defaultData: {
      id: '',
      type: 'two-col',
      title: 'Symmetrical Features Grid',
      subtitle: 'Keep your presentation organized cleanly',
      items: [
        { id: 'tc-1', title: 'Creative Layouts', description: 'Every card is engineered to scale perfectly on mobile, tablet & responsive laptop screens.' },
        { id: 'tc-2', title: 'Developer Assets', description: 'Provides clean stylesheets to maintain full brand guidelines compliance across modules.' }
      ]
    }
  },
  {
    type: 'bento',
    name: '5. Pre-built Bento Portfolio',
    description: 'A trendy design grids grouping perfect for portfolios, galleries, and links.',
    defaultData: {
      id: '',
      type: 'bento',
      title: 'Creative Works Portfolio',
      subtitle: 'Explore our latest releases and premium designs',
      items: [
        { id: 'b-1', title: 'Studio Portfolio Theme', description: 'Clean minimal templates for photography.', tag: 'OUTDOOR' },
        { id: 'b-2', title: 'Link In Bio Hub', description: 'Great single pages tailored for mobile bios.', tag: 'MOBILE' },
        { id: 'b-3', title: 'E-commerce Assets', description: 'Expandable card components for item catalogs.', tag: 'SHOP' }
      ]
    }
  },
  {
    type: 'faq',
    name: '6. Expandable Accordion FAQs',
    description: 'Styled collapsible dropdown panels explaining crucial queries.',
    defaultData: {
      id: '',
      type: 'faq',
      title: 'Frequently Answered Inquiries',
      subtitle: 'Quick hints regarding custom theme setups',
      items: [
        { id: 'q-1', title: 'How does copy-paste work?', description: 'We provide beautifully responsive HTML/CSS structures. In Google Sites, simply click Insert -> Embed, toggle the Embed Code tab, paste, and slide the container to fit.' },
        { id: 'q-2', title: 'Can I reuse these configurations?', description: 'Absolutely! Save them under your theme naming profile and reload them anytime to export updated assets.' }
      ]
    }
  },
  {
    type: 'testimonials',
    name: '7. Customer Reviews Grid',
    description: 'Highlight beautiful high-contrast user praise alongside their names.',
    defaultData: {
      id: '',
      type: 'testimonials',
      title: 'Feedback From Our Community',
      subtitle: 'Hear directly from our active theme designers',
      items: [
        { id: 't-1', title: 'Clara Dubois, CEO', description: 'This toolkit completely converted my Google Site into a modern digital products agency! Recomended 100%!', tag: 'Verified' },
        { id: 't-2', title: 'Alex Mercer, UX Lead', description: 'The custom Google Sites theme JSON configurations are perfectly organized and extremely easy to incorporate.', tag: 'Designer' }
      ]
    }
  },
  {
    type: 'link-in-bio',
    name: '8. Link-in-Bio Social Lists',
    description: 'Sleek rounded buttons carrying icons to showcase quick hyperlinks.',
    defaultData: {
      id: '',
      type: 'link-in-bio',
      title: 'Connect & Stay Tuned',
      subtitle: 'Read our creative articles and discover templates',
      items: [
        { id: 'l-1', title: '🏪 Visit Our Shop Catalog', description: 'Shop premium assets and custom layout packages.', url: '#' },
        { id: 'l-2', title: '📺 YouTube Training Sessions', description: 'Watch live walkthrough building guides.', url: '#' },
        { id: 'l-3', title: '📌 Pinterest Design Board', description: 'Get fresh retro-modern inspiration daily.', url: '#' }
      ]
    }
  },
  {
    type: 'pricing',
    name: '9. Comparison Pricing Cards',
    description: 'Side-by-side comparison tables showing different service plan packages.',
    defaultData: {
      id: '',
      type: 'pricing',
      title: 'Simple Billing Tiers',
      subtitle: 'Select the creative scope that fits your needs',
      items: [
        { id: 'p-1', title: 'Free Option', description: 'Standard layout options with local save.', price: '$0', ctaText: 'Download' },
        { id: 'p-2', title: 'Creator License', description: 'Full access to 10 visual builders and CSS sheets.', price: '$15', ctaText: 'Purchase', tag: 'RECOMMENDED' }
      ]
    }
  },
  {
    type: 'footer',
    name: '10. Beautiful Multi-col Footer',
    description: 'Organize category guides, license statements, and brand labels.',
    defaultData: {
      id: '',
      type: 'footer',
      title: 'RLB Designs Theme Studio',
      subtitle: '© 2026. Custom layout modules. All Rights Reserved.',
      items: [
        { id: 'ft-1', title: 'Templates', description: 'Shop Premium', url: '#' },
        { id: 'ft-2', title: 'Support', description: 'Tutorial Add-ons', url: '#' }
      ]
    }
  }
];

export default function LayoutControls({ 
  sections, 
  onChange,
  colors,
  headerTitle,
  setHeaderTitle,
  headerCtaText,
  setHeaderCtaText,
  headerCtaUrl,
  setHeaderCtaUrl,
  comparisonUrl,
  setComparisonUrl,
  showComparison,
  setShowComparison
}: LayoutControlsProps) {
  const [activeEditId, setActiveEditId] = useState<string | null>(null);

  const subPagesList = ['Home', ...(colors?.primaryButtonBg ? [
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

  const handleAddSection = (type: SectionType) => {
    const preset = TEMPLATE_PRESETS.find(p => p.type === type);
    if (!preset) return;

    const newSection: Section = JSON.parse(JSON.stringify(preset.defaultData));
    newSection.id = `sec-${Date.now()}`;
    const updated = [...sections, newSection];
    onChange(updated);
    setActiveEditId(newSection.id);
  };

  const handleMove = (index: number, direction: 'up' | 'down') => {
    const nextIndex = direction === 'up' ? index - 1 : index + 1;
    if (nextIndex < 0 || nextIndex >= sections.length) return;

    const updated = [...sections];
    const temp = updated[index];
    updated[index] = updated[nextIndex];
    updated[nextIndex] = temp;
    onChange(updated);
  };

  const handleDelete = (id: string) => {
    const updated = sections.filter(s => s.id !== id);
    onChange(updated);
    if (activeEditId === id) setActiveEditId(null);
  };

  const handleDuplicate = (section: Section) => {
    const copy: Section = JSON.parse(JSON.stringify(section));
    copy.id = `sec-copy-${Date.now()}`;
    copy.title = `${copy.title} (Copy)`;
    
    const index = sections.findIndex(s => s.id === section.id);
    const updated = [...sections];
    updated.splice(index + 1, 0, copy);
    onChange(updated);
    setActiveEditId(copy.id);
  };

  const handleUpdateField = (id: string, field: keyof Section, value: any) => {
    const updated = sections.map(s => {
      if (s.id === id) {
        return { ...s, [field]: value };
      }
      return s;
    });
    onChange(updated);
  };

  const handleUpdateItemField = (sectionId: string, itemId: string, field: string, value: string) => {
    const updated = sections.map(s => {
      if (s.id === sectionId && s.items) {
        const updatedItems = s.items.map(item => {
          if (item.id === itemId) {
            return { ...item, [field]: value };
          }
          return item;
        });
        return { ...s, items: updatedItems };
      }
      return s;
    });
    onChange(updated);
  };

  const handleAddItem = (sectionId: string) => {
    const updated = sections.map(s => {
      if (s.id === sectionId) {
        const items = s.items || [];
        const newItem = {
          id: `item-${Date.now()}`,
          title: 'New Listing Title',
          description: 'Short helper descriptive parameters for your grids compilation.',
          tag: 'TAG',
          url: '#',
          icon: 'Star',
          price: '$9.99',
          ctaText: 'Explore'
        };
        return { ...s, items: [...items, newItem] };
      }
      return s;
    });
    onChange(updated);
  };

  const handleDeleteItem = (sectionId: string, itemId: string) => {
    const updated = sections.map(s => {
      if (s.id === sectionId && s.items) {
        return { ...s, items: s.items.filter(item => item.id !== itemId) };
      }
      return s;
    });
    onChange(updated);
  };

  return (
    <div className="space-y-6" id="layout-controls-panel">
      <div>
        <h3 className="text-[10px] uppercase tracking-widest font-bold text-gray-400 mb-0.5">Visual Layout Grid Mesh</h3>
        <p className="text-xs text-[#413A36] font-serif italic">Insert, reorder, and configure custom page rows.</p>
      </div>

      {/* Header Branding & Global Nav CTA Settings */}
      <div className="bg-[#FAF9F6] p-3.5 rounded-none border border-[#E5E2DE] space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-[10px] uppercase tracking-wider font-bold text-[#8B6A4F] block">
            Custom Header Navigation (Universal)
          </span>
          <span className="text-[9px] font-mono text-slate-400 font-bold bg-slate-100 px-1">PERSISTENT</span>
        </div>
        
        <div className="space-y-2 text-xs">
          <div>
            <label className="text-[9px] font-mono text-slate-400 uppercase tracking-wider block mb-0.5">Header Brand Title</label>
            <input
              type="text"
              value={headerTitle}
              onChange={(e) => setHeaderTitle(e.target.value)}
              className="w-full p-1.5 border border-[#E5E2DE] bg-white rounded-none focus:border-black focus:outline-none text-[#1A1A1A] text-xs font-serif italic font-bold"
              placeholder="e.g. RLB Designs Theme Studio"
            />
          </div>

          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="text-[9px] font-mono text-slate-400 uppercase tracking-wider block mb-0.5">Header Button text</label>
              <input
                type="text"
                value={headerCtaText}
                onChange={(e) => setHeaderCtaText(e.target.value)}
                className="w-full p-1.5 border border-[#E5E2DE] bg-white rounded-none focus:border-black focus:outline-none text-[#1A1A1A] text-xs font-bold"
                placeholder="e.g. Discover"
              />
            </div>
            <div>
              <label className="text-[9px] font-mono text-slate-400 uppercase tracking-wider block mb-0.5">Button action link (URL)</label>
              <input
                type="text"
                value={headerCtaUrl}
                onChange={(e) => setHeaderCtaUrl(e.target.value)}
                className="w-full p-1.5 border border-[#E5E2DE] bg-white rounded-none focus:border-black focus:outline-none text-[#1A1A1A] text-xs font-mono"
                placeholder="e.g. #contact"
              />
            </div>
          </div>
          <p className="text-[9px] text-slate-400 leading-tight italic">
            This controls the brand label logo and the CTA button (e.g. "Discover") on the persistent header frame.
          </p>
        </div>
      </div>

      {/* Live Site Comparison Overlay Controls */}
      <div className="bg-[#FAF9F6] p-3.5 rounded-none border border-[#E5E2DE] space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-[10px] uppercase tracking-wider font-bold text-[#8B6A4F] block">
            Published Site Comparator
          </span>
          <span className="text-[9px] font-mono text-indigo-600 font-bold bg-indigo-50 px-1 border border-indigo-100">SIDE-BY-SIDE</span>
        </div>

        <div className="space-y-2 text-xs">
          <div>
            <label className="text-[9px] font-mono text-slate-400 uppercase tracking-wider block mb-0.5">Google Sites / published URL</label>
            <div className="flex gap-1">
              <input
                type="url"
                value={comparisonUrl}
                onChange={(e) => setComparisonUrl(e.target.value)}
                className="flex-1 p-1.5 border border-[#E5E2DE] bg-white rounded-none focus:border-black focus:outline-none text-[#1A1A1A] text-xs font-mono"
                placeholder="https://sites.google.com/..."
              />
              {comparisonUrl && (
                <button
                  type="button"
                  onClick={() => {
                    setComparisonUrl('');
                    setShowComparison(false);
                  }}
                  className="px-2 border border-[#E5E2DE] bg-white text-slate-500 hover:text-black text-[9px] uppercase font-mono font-bold hover:bg-slate-50"
                  title="Clear URL"
                >
                  Clear
                </button>
              )}
            </div>
          </div>

          <div className="flex items-center justify-between pt-1">
            <span className="text-[11px] text-slate-600 font-serif italic">Display side-by-side iframe</span>
            <button
              type="button"
              onClick={() => setShowComparison(!showComparison)}
              disabled={!comparisonUrl}
              className={`p-1 px-3 text-[9px] font-mono font-extrabold transition-colors uppercase border rounded-none ${
                showComparison 
                  ? 'bg-[#10B981] text-white border-[#059669]' 
                  : 'bg-white text-slate-500 border-[#E5E2DE] hover:border-black disabled:opacity-45 disabled:pointer-events-none'
              }`}
            >
              {showComparison ? 'Active (On)' : 'Inactive (Off)'}
            </button>
          </div>

          <p className="text-[9px] text-slate-400 leading-tight italic">
            This renders a side-by-side comparative iframe inside the preview panel. Note: standard Google Sites URLs restrict framing; use any standard web URLs, or test side-by-side.
          </p>
        </div>
      </div>

      {/* Library of 10 Layout Section Templates */}
      <div className="bg-[#FDFCFB] p-3 rounded-none border border-[#E5E2DE]">
        <span className="text-[10px] uppercase tracking-wider font-bold text-gray-400 block mb-2">
          Add Layout Module (Choose from 10 designs)
        </span>
        <div className="grid grid-cols-1 gap-1.5 max-h-[18vh] overflow-y-auto pr-1 custom-scrollbar">
          {TEMPLATE_PRESETS.map((tmpl) => (
            <button
              key={tmpl.type}
              onClick={() => handleAddSection(tmpl.type)}
              className="group text-[11px] font-medium bg-white border border-[#E5E2DE] hover:border-black rounded-none p-2.5 flex items-center justify-between text-slate-650 hover:text-black text-left transition focus:outline-none cursor-pointer"
              id={`add-template-${tmpl.type}`}
            >
              <div>
                <span className="font-serif italic font-bold text-slate-800 block group-hover:text-black">
                  {tmpl.name}
                </span>
                <span className="text-[10px] font-normal text-slate-400 line-clamp-1">
                  {tmpl.description}
                </span>
              </div>
              <Plus className="w-4 h-4 shrink-0 bg-slate-50 hover:bg-[#D8D3CD] p-0.5 rounded-none text-[#1A1A1A]" />
            </button>
          ))}
        </div>
      </div>

      {/* Active Sections Outline / Hierarchy Tree */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-xs font-serif font-bold italic text-slate-800 flex items-center gap-1.5">
            <Layers className="w-3.5 h-3.5 text-slate-400" />
            Active Rows List ({sections.length})
          </span>
          {sections.length === 0 && (
            <span className="text-[10px] text-amber-600 font-mono font-bold uppercase tracking-widest">
              Canvas is Empty
            </span>
          )}
        </div>

        <div className="space-y-2 max-h-[40vh] overflow-y-auto pr-1 custom-scrollbar">
          {sections.map((sec, idx) => {
            const isEditing = activeEditId === sec.id;
            return (
              <div 
                key={sec.id}
                className={`bg-white border rounded-none overflow-hidden transition shadow-xs ${
                  isEditing ? 'border-[#1A1A1A] ring-1 ring-[#1A1A1A]' : 'border-[#E5E2DE] hover:border-gray-400'
                }`}
                id={`active-row-${sec.id}`}
              >
                {/* Header Row */}
                <div className="flex items-center justify-between p-2.5 bg-[#FAF9F6] border-b border-[#E5E2DE] select-none hover:bg-[#F6F5F0] transition-colors">
                  <div 
                    onClick={() => setActiveEditId(isEditing ? null : sec.id)}
                    className="flex items-center gap-2 max-w-[65%] cursor-pointer hover:opacity-85 active:scale-[0.99] transition-all flex-1 py-1"
                    title="Click row header to expand/collapse configuration settings"
                  >
                    <span className="w-5 h-5 rounded-none bg-[#1A1A1A] text-white text-[10px] font-mono font-bold flex items-center justify-center shrink-0">
                      {idx + 1}
                    </span>
                    <div className="truncate">
                      <span className="text-xs font-serif font-bold text-slate-800 truncate block">
                        {sec.title || 'Untitled Section'}
                      </span>
                      <div className="flex flex-wrap items-center gap-1.5 mt-0.5">
                        <span className="text-[8px] uppercase tracking-wider font-semibold text-slate-400 font-mono">
                          {sec.type}
                        </span>
                        {/* Page assignment indicator badge */}
                        <span className={`text-[8px] px-1 font-mono font-bold uppercase rounded-sm border ${
                          sec.targetPage === 'all' 
                            ? 'bg-blue-50 text-blue-600 border-blue-200' :
                          sec.targetPage === 'home' 
                            ? 'bg-emerald-50 text-emerald-600 border-emerald-200' :
                          sec.targetPage === 'page2' 
                            ? 'bg-amber-50 text-amber-600 border-amber-200' :
                          sec.targetPage === 'page3' 
                            ? 'bg-purple-50 text-purple-600 border-purple-200' :
                          sec.targetPage === 'page4' 
                            ? 'bg-rose-50 text-rose-600 border-rose-200' :
                          'bg-slate-50 text-slate-500 border-slate-200'
                        }`}>
                          {sec.targetPage === 'all' ? 'Universal Global' :
                           sec.targetPage === 'home' ? `P1: ${subPagesList[0] || 'Home'}` :
                           sec.targetPage === 'page2' ? `P2: ${subPagesList[1] || 'Tour'}` :
                           sec.targetPage === 'page3' ? `P3: ${subPagesList[2] || 'Services'}` :
                           sec.targetPage === 'page4' ? `P4: ${subPagesList[3] || 'FAQ'}` :
                           'Auto-Routed'}
                        </span>
                        {sec.hidden && (
                          <span className="text-[8px] px-1 font-mono font-bold uppercase rounded-sm bg-rose-100 text-rose-700 border border-rose-200 shrink-0">
                            Hidden / Draft
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-1 shrink-0">
                    <button
                      onClick={() => handleUpdateField(sec.id, 'hidden', !sec.hidden)}
                      className={`p-1 rounded-none ${sec.hidden ? 'text-rose-500 bg-rose-50 hover:bg-rose-100' : 'text-slate-400 hover:text-black hover:bg-white'}`}
                      title={sec.hidden ? "Show Row (Set Active)" : "Hide Row (Set Draft/Hidden)"}
                    >
                      {sec.hidden ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                    </button>
                    <button
                      onClick={() => handleMove(idx, 'up')}
                      disabled={idx === 0}
                      className="p-1 rounded-none text-slate-400 hover:text-black hover:bg-white disabled:opacity-30 disabled:pointer-events-none"
                      title="Move Up"
                    >
                      <ArrowUp className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => handleMove(idx, 'down')}
                      disabled={idx === sections.length - 1}
                      className="p-1 rounded-none text-slate-400 hover:text-black hover:bg-white disabled:opacity-30 disabled:pointer-events-none"
                      title="Move Down"
                    >
                      <ArrowDown className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => handleDuplicate(sec)}
                      className="p-1 rounded-none text-slate-400 hover:text-black hover:bg-white"
                      title="Duplicate Block"
                    >
                      <Copy className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => handleDelete(sec.id)}
                      className="p-1 rounded-none text-slate-400 hover:text-rose-600 hover:bg-white mr-1"
                      title="Delete Block"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => setActiveEditId(isEditing ? null : sec.id)}
                      className={`p-1 px-1.5 border rounded-none text-[8px] font-mono font-bold uppercase transition flex items-center gap-0.5 ${
                        isEditing 
                          ? 'bg-black text-white border-black hover:bg-neutral-800' 
                          : 'bg-white text-emerald-700 border-emerald-200 hover:border-emerald-500 hover:bg-emerald-50'
                      }`}
                      title="Toggle Configuration"
                    >
                      <span>{isEditing ? 'Close' : 'Configure'}</span>
                      {isEditing ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
                    </button>
                  </div>
                </div>

                {/* Expanded configuration block inside Sidebar */}
                {isEditing && (
                  <div className="p-3.5 border-t border-[#E5E2DE] bg-white space-y-3.5 text-xs">
                    {/* Virtual Page Assignment override */}
                    <div className="space-y-1 bg-[#FAF9F6] p-2.5 border border-[#E5E2DE]">
                      <label className="text-[10px] font-mono text-[#8B6A4F] uppercase tracking-wider block font-bold">Virtual Page Assignment</label>
                      <select
                        value={sec.targetPage || 'auto'}
                        onChange={(e) => handleUpdateField(sec.id, 'targetPage', e.target.value)}
                        className="w-full p-1.5 border border-[#E5E2DE] bg-white rounded-none focus:border-black focus:outline-none text-[#1A1A1A] text-xs font-mono font-bold"
                      >
                        <option value="auto">Auto (Default section rules)</option>
                        <option value="all">Global (Show on All Pages)</option>
                        <option value="home">Page 1: {subPagesList[0] || 'Home'}</option>
                        <option value="page2">Page 2: {subPagesList[1] || 'Tour'}</option>
                        <option value="page3">Page 3: {subPagesList[2] || 'Services'}</option>
                        <option value="page4">Page 4: {subPagesList[3] || 'FAQs'}</option>
                      </select>
                      <p className="text-[9px] text-slate-500 font-serif italic leading-snug">
                        Assign this section row to a specific simulated sub-tab page, show it globally on every page (e.g. as a Footer), or stick to default rules.
                      </p>
                    </div>

                    {/* General Titles settings */}
                    <div className="grid grid-cols-2 gap-2">
                      <div className="col-span-2 space-y-1">
                        <label className="text-[10px] font-mono text-slate-400 uppercase tracking-wider block">Section Title</label>
                        <input
                          type="text"
                          value={sec.title}
                          onChange={(e) => handleUpdateField(sec.id, 'title', e.target.value)}
                          className="w-full p-1.5 border border-[#E5E2DE] rounded-none focus:border-black focus:outline-none text-[#1A1A1A] text-xs"
                        />
                      </div>

                      {sec.subtitle !== undefined && (
                        <div className="col-span-2 space-y-1">
                          <label className="text-[10px] font-mono text-slate-400 uppercase tracking-wider block">Section Subtitle</label>
                          <input
                            type="text"
                            value={sec.subtitle}
                            onChange={(e) => handleUpdateField(sec.id, 'subtitle', e.target.value)}
                            className="w-full p-1.5 border border-[#E5E2DE] rounded-none focus:border-black focus:outline-none text-[#1A1A1A] text-xs"
                          />
                        </div>
                      )}

                      {sec.content !== undefined && (
                        <div className="col-span-2 space-y-1">
                          <label className="text-[10px] font-mono text-slate-400 uppercase tracking-wider block font-medium">Long Paragraph Content</label>
                          <textarea
                            rows={3}
                            value={sec.content}
                            onChange={(e) => handleUpdateField(sec.id, 'content', e.target.value)}
                            className="w-full p-1.5 border border-[#E5E2DE] rounded-none focus:border-black focus:outline-none text-[#1A1A1A] text-xs"
                          />
                        </div>
                      )}

                      {/* CTA option items */}
                      {(sec.ctaText !== undefined || sec.type === 'hero' || sec.type === 'split' || sec.type === 'pricing') && (
                        <div className="space-y-1">
                          <label className="text-[10px] font-mono text-slate-400 uppercase tracking-wider block">CTA Button Text</label>
                          <input
                            type="text"
                            value={sec.ctaText || ''}
                            onChange={(e) => handleUpdateField(sec.id, 'ctaText', e.target.value)}
                            className="w-full p-1.5 border border-[#E5E2DE] rounded-none focus:border-black focus:outline-none text-[#1A1A1A] text-xs"
                            placeholder="e.g. Build Custom Template"
                          />
                        </div>
                      )}
                      {(sec.ctaUrl !== undefined || sec.type === 'hero' || sec.type === 'split' || sec.type === 'pricing') && (
                        <div className="space-y-1">
                          <label className="text-[10px] font-mono text-slate-400 uppercase tracking-wider block">CTA URL Link</label>
                          <input
                            type="text"
                            value={sec.ctaUrl || ''}
                            onChange={(e) => handleUpdateField(sec.id, 'ctaUrl', e.target.value)}
                            className="w-full p-1.5 border border-[#E5E2DE] rounded-none focus:border-black focus:outline-none text-[#1A1A1A] text-xs font-mono text-[10px]"
                            placeholder="e.g. https://themes.rlbdesigns.com"
                          />
                        </div>
                      )}

                      {/* IMAGE options for image-split & hero banner templates */}
                      {(sec.imageUrl !== undefined || sec.type === 'hero') && (
                        <div className="col-span-2 space-y-1">
                          <label className="text-[10px] font-mono text-slate-400 uppercase tracking-wider block">Unsplash/Custom Banner Image URL</label>
                          <div className="flex gap-1">
                            <input
                              type="text"
                              value={sec.imageUrl || ''}
                              onChange={(e) => handleUpdateField(sec.id, 'imageUrl', e.target.value)}
                              placeholder="e.g. https://images.unsplash.com/photo-..."
                              className="flex-1 p-1.5 border border-[#E5E2DE] rounded-none focus:border-black focus:outline-none text-[#1A1A1A] text-[10px]"
                            />
                            {sec.imageUrl && (
                              <button
                                onClick={() => handleUpdateField(sec.id, 'imageUrl', '')}
                                className="px-2 border border-[#E5E2DE] text-[9px] uppercase font-mono text-slate-500 hover:text-black hover:border-black transition"
                                title="Remove Image Banner"
                              >
                                Clean
                              </button>
                            )}
                          </div>
                          {sec.type === 'hero' && !sec.imageUrl && (
                            <span className="text-[9px] text-slate-400 italic font-medium block">
                              Add an Unsplash photo link to convert this header into a beautiful visual Banner.
                            </span>
                          )}
                        </div>
                      )}

                      {sec.type === 'hero' && sec.imageUrl !== undefined && sec.imageUrl !== '' && (
                        <div className="col-span-2 space-y-2 bg-[#F9F8F6] p-2.5 border border-[#E5E2DE]">
                          <div className="flex items-center justify-between">
                            <span className="text-[10px] font-mono text-slate-500 uppercase tracking-wider block font-bold">Banner Text Background Opacity</span>
                            <span className="text-[10px] font-mono font-bold text-amber-700 bg-amber-50 px-1.5 py-0.5 border border-amber-100">
                              {sec.bannerOpacity !== undefined ? sec.bannerOpacity : 96}%
                            </span>
                          </div>
                          <input
                            type="range"
                            min="0"
                            max="100"
                            value={sec.bannerOpacity !== undefined ? sec.bannerOpacity : 96}
                            onChange={(e) => handleUpdateField(sec.id, 'bannerOpacity', parseInt(e.target.value))}
                            className="w-full h-1 bg-[#E5E2DE] rounded-none appearance-none cursor-pointer accent-black"
                          />
                          <p className="text-[9px] text-slate-400 leading-normal italic">
                            Adjusts the transparency of the themed background area behind the Hero banner text (0% is completely transparent, 100% is fully solid).
                          </p>
                        </div>
                      )}

                      {sec.imagePosition !== undefined && (
                        <div className="col-span-2 space-y-1">
                          <label className="text-[10px] font-mono text-slate-400 uppercase tracking-wider block">Image Positioning</label>
                          <div className="flex gap-2">
                            <button
                              onClick={() => handleUpdateField(sec.id, 'imagePosition', 'left')}
                              className={`flex-1 p-1.5 rounded-none text-center border text-[10px] uppercase font-mono tracking-wider ${sec.imagePosition === 'left' ? 'bg-[#1A1A1A] border-black text-white' : 'bg-slate-50 text-slate-700 border-[#E5E2DE] hover:bg-slate-100'}`}
                            >
                              Left side
                            </button>
                            <button
                              onClick={() => handleUpdateField(sec.id, 'imagePosition', 'right')}
                              className={`flex-1 p-1.5 rounded-none text-center border text-[10px] uppercase font-mono tracking-wider ${sec.imagePosition === 'right' ? 'bg-[#1A1A1A] border-black text-white' : 'bg-slate-50 text-slate-700 border-[#E5E2DE] hover:bg-slate-100'}`}
                            >
                              Right side
                            </button>
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Nested lists & sub items editors for features, bento grids, FAQs */}
                    {sec.items !== undefined && (
                      <div className="space-y-2 border-t border-[#E5E2DE] pt-3">
                        <div className="flex items-center justify-between">
                          <span className="text-[10px] font-serif font-bold italic text-slate-700 uppercase tracking-wider">Nested Sub-Items / Grid Elements</span>
                          <button
                            onClick={() => handleAddItem(sec.id)}
                            className="p-1 px-2 border border-black text-[10px] font-mono uppercase bg-white text-[#1A1A1A] hover:bg-[#1A1A1A] hover:text-white transition duration-200 flex items-center gap-1 focus:outline-none rounded-none cursor-pointer"
                          >
                            <Plus className="w-3 h-3" /> Add Item
                          </button>
                        </div>

                        <div className="space-y-2 max-h-[180px] overflow-y-auto pr-1 custom-scrollbar">
                          {sec.items.map((item, itemIdx) => (
                            <div key={item.id} className="p-2.5 border border-[#E5E2DE] rounded-none bg-[#FAF9F6] relative space-y-1.5">
                              <button
                                onClick={() => handleDeleteItem(sec.id, item.id)}
                                className="absolute top-1 right-1 text-slate-400 hover:text-rose-500 p-0.5"
                                title="Remove list item"
                              >
                                <Trash2 className="w-3 h-3" />
                              </button>

                              <div className="flex gap-1 items-center mb-1">
                                <span className="text-[9px] font-mono font-bold text-slate-400 uppercase">Item #{itemIdx + 1}</span>
                              </div>

                              <input
                                type="text"
                                value={item.title}
                                onChange={(e) => handleUpdateItemField(sec.id, item.id, 'title', e.target.value)}
                                className="w-full p-1.5 bg-white border border-[#E5E2DE] rounded-none text-slate-700 text-[11px] font-medium"
                                placeholder="Listing Header"
                              />

                              <textarea
                                value={item.description}
                                rows={2}
                                onChange={(e) => handleUpdateItemField(sec.id, item.id, 'description', e.target.value)}
                                className="w-full p-1.5 bg-white border border-[#E5E2DE] rounded-none text-slate-600 text-[10px]"
                                placeholder="Core descriptive review sentence or FAQ answers"
                              />

                              {/* Layout specific fields like tags, prices, or links */}
                              <div className="grid grid-cols-2 gap-1.5">
                                {item.tag !== undefined && (
                                  <div>
                                    <span className="text-[8px] font-mono font-bold text-slate-400 uppercase">Card Badge</span>
                                    <input
                                      type="text"
                                      value={item.tag}
                                      onChange={(e) => handleUpdateItemField(sec.id, item.id, 'tag', e.target.value)}
                                      className="w-full p-1 bg-white border border-[#E5E2DE] rounded-none text-slate-600 text-[10px]"
                                      placeholder="Badge tag text"
                                    />
                                  </div>
                                )}
                                {item.price !== undefined && (
                                  <div>
                                    <span className="text-[8px] font-mono font-bold text-slate-400 uppercase">Price Label</span>
                                    <input
                                      type="text"
                                      value={item.price}
                                      onChange={(e) => handleUpdateItemField(sec.id, item.id, 'price', e.target.value)}
                                      className="w-full p-1 bg-white border border-[#E5E2DE] rounded-none text-slate-650 text-[10px] font-mono"
                                      placeholder="$19"
                                    />
                                  </div>
                                )}
                                {item.ctaText !== undefined && (
                                  <div>
                                    <span className="text-[8px] font-mono font-bold text-slate-400 uppercase">Item Link Label</span>
                                    <input
                                      type="text"
                                      value={item.ctaText}
                                      onChange={(e) => handleUpdateItemField(sec.id, item.id, 'ctaText', e.target.value)}
                                      className="w-full p-1 bg-white border border-[#E5E2DE] rounded-none text-slate-600 text-[10px]"
                                    />
                                  </div>
                                )}
                                {item.url !== undefined && (
                                  <div className="col-span-2">
                                    <span className="text-[8px] font-mono font-bold text-slate-400 uppercase">Redirect URL</span>
                                    <input
                                      type="text"
                                      value={item.url}
                                      onChange={(e) => handleUpdateItemField(sec.id, item.id, 'url', e.target.value)}
                                      className="w-full p-1 bg-white border border-[#E5E2DE] rounded-none text-slate-600 text-[10px] font-mono"
                                    />
                                  </div>
                                )}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
