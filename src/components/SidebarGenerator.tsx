import React, { useState, useEffect } from 'react';
import { ColorPalette, TypographySettings } from '../types';
import { 
  Plus, Trash2, ChevronUp, ChevronDown, ChevronRight, Copy, Check, 
  Code, RefreshCw, FileText, Settings, Link, Layout, Eye, AlertCircle,
  FolderPlus, MoveRight, HelpCircle
} from 'lucide-react';

interface SidebarGeneratorProps {
  colors: ColorPalette;
  typography: TypographySettings;
}

interface SidebarItem {
  id: string;
  label: string;
  url: string;
  level: 0 | 1 | 2; // nesting depth
  type: 'link' | 'header' | 'divider';
  isOpen?: boolean; // for collapsible preview menu groups
}

export default function SidebarGenerator({ colors, typography }: SidebarGeneratorProps) {
  // Navigation links hierarchical list
  const [items, setItems] = useState<SidebarItem[]>([
    { id: '1', label: 'MAIN NAVIGATION', url: '', level: 0, type: 'header' },
    { id: '2', label: 'Home Page', url: '#home', level: 0, type: 'link' },
    { id: '3', label: 'Services', url: '#services', level: 0, type: 'link', isOpen: true },
    { id: '4', label: 'Theme Customization', url: '#services-custom', level: 1, type: 'link' },
    { id: '5', label: 'Site Development', url: '#services-dev', level: 1, type: 'link' },
    { id: '6', label: 'Project Gallery', url: '#gallery', level: 0, type: 'link' },
    { id: '7', label: 'OUR COMPANY', url: '', level: 0, type: 'header' },
    { id: '8', label: 'About Us', url: '#about', level: 0, type: 'link' },
    { id: '9', label: 'Meet the Team', url: '#team', level: 1, type: 'link' },
    { id: '10', label: 'Our Story & Brand', url: '#story', level: 1, type: 'link' },
    { id: '11', label: '---', url: '', level: 0, type: 'divider' },
    { id: '12', label: 'Get in Touch', url: '#contact', level: 0, type: 'link' },
  ]);

  // Styling settings specific to sidebar (initially synchronizing with parent theme colors)
  const [sbBgMode, setSbBgMode] = useState<'transparent' | 'themeBg' | 'themeSecondary' | 'dark' | 'white'>('themeSecondary');
  const [sbBgColor, setSbBgColor] = useState<string>(colors.secondaryBg);
  const [sbTextColor, setSbTextColor] = useState<string>(colors.textColor);
  const [sbAccentColor, setSbAccentColor] = useState<string>(colors.primaryButtonBg);
  const [sbFontFamily, setSbFontFamily] = useState<'body' | 'title' | 'heading'>('body');
  const [sbRoundedMode, setSbRoundedMode] = useState<'none' | 'sm' | 'md' | 'lg' | 'full'>('none');
  const [sbActiveStyle, setSbActiveStyle] = useState<'left-border' | 'pill-bg' | 'underline' | 'bold-only'>('left-border');
  const [sbSpacing, setSbSpacing] = useState<'tight' | 'cozy' | 'spacious'>('cozy');

  // Interactive simulation states
  const [activeSimUrl, setActiveSimUrl] = useState<string>('#home');
  const [collapsedHeaders, setCollapsedHeaders] = useState<Record<string, boolean>>({});
  const [copySuccess, setCopySuccess] = useState<'embed' | 'script' | null>(null);
  const [activeExportTab, setActiveExportTab] = useState<'html' | 'apps-script'>('html');

  // Re-synchronize background colors if theme changes
  useEffect(() => {
    if (sbBgMode === 'themeBg') {
      setSbBgColor(colors.primaryBg);
    } else if (sbBgMode === 'themeSecondary') {
      setSbBgColor(colors.secondaryBg);
    } else if (sbBgMode === 'dark') {
      setSbBgColor('#1A1A1A');
    } else if (sbBgMode === 'white') {
      setSbBgColor('#FFFFFF');
    } else {
      setSbBgColor('transparent');
    }
    setSbAccentColor(colors.primaryButtonBg);
    setSbTextColor(sbBgMode === 'dark' ? '#F3F4F6' : colors.textColor);
  }, [colors, sbBgMode]);

  // Sidebar item modifiers
  const handleAddItem = (type: 'link' | 'header' | 'divider') => {
    const newId = String(Date.now());
    let newLabel = '';
    let newUrl = '';

    if (type === 'link') {
      newLabel = 'New Navigation Link';
      newUrl = '#new-page';
    } else if (type === 'header') {
      newLabel = 'NEW CATEGORY HEADER';
    } else {
      newLabel = '---';
    }

    setItems([...items, { id: newId, label: newLabel, url: newUrl, level: 0, type }]);
  };

  const handleDeleteItem = (id: string) => {
    setItems(items.filter(item => item.id !== id));
  };

  const handleUpdateItem = (id: string, field: keyof SidebarItem, value: any) => {
    setItems(items.map(item => item.id === id ? { ...item, [field]: value } : item));
  };

  const handleIndent = (id: string, direction: 'increase' | 'decrease') => {
    setItems(items.map(item => {
      if (item.id === id && item.type === 'link') {
        const currentLevel = item.level;
        let nextLevel = currentLevel;
        if (direction === 'increase' && currentLevel < 2) nextLevel = (currentLevel + 1) as 0 | 1 | 2;
        if (direction === 'decrease' && currentLevel > 0) nextLevel = (currentLevel - 1) as 0 | 1 | 2;
        return { ...item, level: nextLevel };
      }
      return item;
    }));
  };

  const handleMove = (index: number, direction: 'up' | 'down') => {
    if (direction === 'up' && index === 0) return;
    if (direction === 'down' && index === items.length - 1) return;

    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    const newItems = [...items];
    const temp = newItems[index];
    newItems[index] = newItems[targetIndex];
    newItems[targetIndex] = temp;
    setItems(newItems);
  };

  // Toggle collapsing of submenu trees
  const toggleHeaderCollapse = (headerLabel: string) => {
    setCollapsedHeaders(prev => ({
      ...prev,
      [headerLabel]: !prev[headerLabel]
    }));
  };

  // Helper styles based on options
  const getRoundedClass = () => {
    switch (sbRoundedMode) {
      case 'sm': return 'rounded-sm';
      case 'md': return 'rounded-md';
      case 'lg': return 'rounded-lg';
      case 'full': return 'rounded-full';
      default: return 'rounded-none';
    }
  };

  const getSpacingClass = () => {
    switch (sbSpacing) {
      case 'tight': return 'py-1 px-2.5 my-0.5 text-xs';
      case 'spacious': return 'py-3.5 px-4 my-1.5 text-sm';
      default: return 'py-2.5 px-3.5 my-1 text-[13px]';
    }
  };

  const getFontFamilyName = () => {
    if (sbFontFamily === 'title') return typography.title.family;
    if (sbFontFamily === 'heading') return typography.heading.family;
    return typography.body.family;
  };

  // Helper: Generates self-contained HTML/CSS block
  const generateEmbedCode = () => {
    const fontName = getFontFamilyName();
    const borderStyleHex = sbBgMode === 'transparent' ? '#E5E2DE' : 'transparent';
    const activeBorderColor = sbAccentColor;
    const itemFontWeight = sbFontFamily === 'body' ? '400' : '500';

    // Build lists in HTML
    let listItemsHtml = '';
    let isCurrentlyCollapsed = false;

    items.forEach((item, index) => {
      if (item.type === 'divider') {
        listItemsHtml += `    <div class="sidebar-divider"></div>\n`;
      } else if (item.type === 'header') {
        listItemsHtml += `    <div class="sidebar-header" onclick="toggleSection(this)">
      <span>${item.label}</span>
      <svg class="chevron-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 12 15 18 9"></polyline></svg>
    </div>\n`;
      } else {
        const isActive = item.url === activeSimUrl ? 'active' : '';
        const levelClass = item.level > 0 ? `level-${item.level}` : '';
        const target = item.url.startsWith('#') ? '_self' : '_blank';
        listItemsHtml += `    <a href="${item.url || '#'}" target="${target}" class="sidebar-item ${isActive} ${levelClass}" data-url="${item.url}">
      ${item.label}
    </a>\n`;
      }
    });

    return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Google Sites Sidebar Navigation</title>
  <link href="https://fonts.googleapis.com/css2?family=${fontName.replace(/\s+/g, '+')}:wght@400;500;600;700&display=swap" rel="stylesheet">
  <style>
    :root {
      --bg-color: ${sbBgColor};
      --text-color: ${sbTextColor};
      --accent-color: ${sbAccentColor};
      --accent-hover-bg: ${sbAccentColor}15; /* 8% opacity overlay */
      --font-family: "${fontName}", sans-serif;
    }
    
    * {
      box-sizing: border-box;
      margin: 0;
      padding: 0;
    }

    body {
      background-color: var(--bg-color);
      color: var(--text-color);
      font-family: var(--font-family);
      font-size: 14px;
      line-height: 1.5;
      padding: 16px;
      -webkit-font-smoothing: antialiased;
    }

    .sidebar-container {
      width: 100%;
      max-width: 320px;
      background-color: var(--bg-color);
      border: 1px solid ${borderStyleHex};
      padding: 8px 4px;
    }

    .sidebar-header {
      font-size: 11px;
      font-weight: 700;
      letter-spacing: 0.1em;
      text-transform: uppercase;
      color: var(--text-color);
      opacity: 0.55;
      padding: 12px 12px 6px 12px;
      margin-top: 14px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      cursor: pointer;
      user-select: none;
    }

    .sidebar-header:first-child {
      margin-top: 4px;
    }

    .sidebar-header .chevron-icon {
      width: 12px;
      height: 12px;
      transition: transform 0.2s ease;
      opacity: 0.8;
    }

    .sidebar-header.collapsed .chevron-icon {
      transform: rotate(-90deg);
    }

    .sidebar-divider {
      height: 1px;
      background-color: var(--text-color);
      opacity: 0.15;
      margin: 12px 12px;
    }

    .sidebar-item {
      display: block;
      text-decoration: none;
      color: var(--text-color);
      opacity: 0.85;
      font-weight: ${itemFontWeight};
      transition: all 0.15s ease;
      position: relative;
      outline: none;
      
      /* Spacing based on preset choices */
      padding: ${sbSpacing === 'tight' ? '6px 12px' : sbSpacing === 'spacious' ? '12px 16px' : '9px 14px'};
      margin: ${sbSpacing === 'tight' ? '2px 0' : sbSpacing === 'spacious' ? '5px 0' : '3px 0'};
      font-size: ${sbSpacing === 'tight' ? '12.5px' : sbSpacing === 'spacious' ? '14px' : '13px'};
      
      /* Rounded option styling */
      border-radius: ${sbRoundedMode === 'sm' ? '3px' : sbRoundedMode === 'md' ? '6px' : sbRoundedMode === 'lg' ? '10px' : sbRoundedMode === 'full' ? '999px' : '0px'};
    }

    .sidebar-item:hover {
      background-color: var(--accent-hover-bg);
      opacity: 1;
      color: var(--accent-color);
    }

    /* Sub-level indentation levels */
    .sidebar-item.level-1 {
      padding-left: ${sbSpacing === 'tight' ? '24px' : sbSpacing === 'spacious' ? '32px' : '28px'};
      font-size: 0.95em;
      opacity: 0.75;
    }
    .sidebar-item.level-2 {
      padding-left: ${sbSpacing === 'tight' ? '36px' : sbSpacing === 'spacious' ? '48px' : '42px'};
      font-size: 0.9em;
      opacity: 0.65;
    }

    /* Active navigation indicator styles */
    .sidebar-item.active {
      opacity: 1;
      font-weight: 700;
      color: var(--accent-color);
      
      ${sbActiveStyle === 'left-border' ? `
      border-left: 3px solid var(--accent-color);
      padding-left: calc(14px - 3px);
      ` : ''}

      ${sbActiveStyle === 'pill-bg' ? `
      background-color: var(--accent-color);
      color: #FFFFFF !important;
      font-weight: 600;
      ` : ''}

      ${sbActiveStyle === 'underline' ? `
      text-decoration: underline;
      text-underline-offset: 4px;
      text-decoration-thickness: 2px;
      ` : ''}
    }

    /* Active level adjustment for left borders */
    .sidebar-item.active.level-1 {
      ${sbActiveStyle === 'left-border' ? `
      padding-left: calc(28px - 3px);
      ` : ''}
    }
    .sidebar-item.active.level-2 {
      ${sbActiveStyle === 'left-border' ? `
      padding-left: calc(42px - 3px);
      ` : ''}
    }

    /* Collapsible Group Handling */
    .collapsed-section-content {
      display: none;
    }
  </style>
</head>
<body>

  <div class="sidebar-container">
${listItemsHtml}  </div>

  <script>
    // Handles collapsible headers
    function toggleSection(headerEl) {
      headerEl.classList.toggle('collapsed');
      
      // Select all sibling sidebar items up to the next header
      let currentEl = headerEl.nextElementSibling;
      while (currentEl && !currentEl.classList.contains('sidebar-header')) {
        if (currentEl.classList.contains('sidebar-item') || currentEl.classList.contains('sidebar-divider')) {
          if (currentEl.style.display === 'none') {
            currentEl.style.display = 'block';
          } else {
            currentEl.style.display = 'none';
          }
        }
        currentEl = currentEl.nextElementSibling;
      }
    }

    // Capture URL changes or make links feel live
    const links = document.querySelectorAll('.sidebar-item');
    links.forEach(link => {
      link.addEventListener('click', function(e) {
        // Remove active class from all
        links.forEach(l => l.classList.remove('active'));
        
        // Add active class to current
        this.classList.add('active');
        
        // Simulating Google Sites page routing
        const targetUrl = this.getAttribute('data-url');
        if (targetUrl && targetUrl.startsWith('#')) {
          e.preventDefault();
          console.log("Navigated internally to:", targetUrl);
          // If embedded inside a Google Site, you could post messages or route pages
        }
      });
    });
  </script>

</body>
</html>`;
  };

  // Google Sheets & Google Apps Script Sync template explanation
  const generateAppsScriptTemplate = () => {
    return `/**
 * Google Apps Script Web App Template for Dynamic Google Sites Sidebar Navigation
 * 
 * 1. Open your Google Drive, create a new Google Sheet named "Site Navigation Config".
 * 2. Create the columns exactly as: [Label], [URL], [Level], [Type]
 *    - Type values: "link", "header", "divider"
 *    - Level values: 0, 1, or 2 (depth indentation)
 * 3. Inside Google Sheet, select Extensions -> Apps Script.
 * 4. Paste this code block, change the SPREADSHEET_ID, and click Deploy -> New Deployment -> Web App.
 * 5. Set 'Who has access' to "Anyone". Copy the Web App Deployment URL.
 * 6. Embed that Web App URL on your Google Sites page as an "Embed"!
 */

const SPREADSHEET_ID = "YOUR_GOOGLE_SHEET_ID_HERE"; // Put your sheet ID here
const SHEET_NAME = "Sheet1";

function doGet() {
  const sheet = SpreadsheetApp.openById(SPREADSHEET_ID).getSheetByName(SHEET_NAME);
  const data = sheet.getDataRange().getValues();
  
  // Skip headers row
  const rows = data.slice(1);
  
  // Custom theme variables (matches RLB Designs Theme Studio palette)
  const colors = {
    bg: "${sbBgColor}",
    text: "${sbTextColor}",
    accent: "${sbAccentColor}",
    accentHover: "${sbAccentColor}15",
    font: "${getFontFamilyName()}"
  };

  let listHtml = "";
  
  rows.forEach(function(row) {
    const label = row[0];
    const url = row[1] || "#";
    const level = parseInt(row[2]) || 0;
    const type = (row[3] || "link").toLowerCase();
    
    if (type === "divider") {
      listHtml += '<div class="sidebar-divider"></div>\\n';
    } else if (type === "header") {
      listHtml += '<div class="sidebar-header" onclick="toggleSection(this)">' +
                    '<span>' + label + '</span>' +
                    '<svg class="chevron-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="6 9 12 15 18 9"></polyline></svg>' +
                  '</div>\\n';
    } else {
      const levelClass = level > 0 ? "level-" + level : "";
      const target = url.indexOf("http") === 0 ? "_blank" : "_self";
      listHtml += '<a href="' + url + '" target="' + target + '" class="sidebar-item ' + levelClass + '" data-url="' + url + '">' + label + '</a>\\n';
    }
  });

  const completeHtml = '<!DOCTYPE html>\\n' +
'<html>\\n' +
'<head>\\n' +
'  <link href="https://fonts.googleapis.com/css2?family=' + colors.font.replace(/\\s+/g, '+') + ':wght@400;500;600;700&display=swap" rel="stylesheet">\\n' +
'  <style>\\n' +
'    :root {\\n' +
'      --bg-color: ' + colors.bg + ';\\n' +
'      --text-color: ' + colors.text + ';\\n' +
'      --accent-color: ' + colors.accent + ';\\n' +
'      --accent-hover-bg: ' + colors.accentHover + ';\\n' +
'      --font-family: "' + colors.font + '", sans-serif;\\n' +
'    }\\n' +
'    body { background-color: var(--bg-color); color: var(--text-color); font-family: var(--font-family); margin:0; padding: 12px; font-size:14px; }\\n' +
'    .sidebar-container { width: 100%; }\\n' +
'    .sidebar-header { font-size: 11px; font-weight: 700; letter-spacing: 0.1em; text-transform: uppercase; color: var(--text-color); opacity: 0.55; padding: 12px 12px 6px 12px; margin-top: 14px; display: flex; justify-content: space-between; align-items: center; cursor: pointer; }\\n' +
'    .sidebar-header.collapsed .chevron-icon { transform: rotate(-90deg); }\\n' +
'    .chevron-icon { width:12px; height:12px; transition: transform 0.2s; }\\n' +
'    .sidebar-divider { height: 1px; background-color: var(--text-color); opacity: 0.15; margin: 12px; }\\n' +
'    .sidebar-item { display: block; text-decoration: none; color: var(--text-color); opacity: 0.85; font-weight: 500; padding: 10px 14px; margin: 3px 0; border-radius: 4px; transition: all 0.15s; }\\n' +
'    .sidebar-item:hover { background-color: var(--accent-hover-bg); opacity: 1; color: var(--accent-color); }\\n' +
'    .sidebar-item.level-1 { padding-left: 28px; font-size: 0.95em; opacity: 0.75; }\\n' +
'    .sidebar-item.level-2 { padding-left: 42px; font-size: 0.9em; opacity: 0.65; }\\n' +
'    .sidebar-item.active { opacity: 1; font-weight: 700; color: var(--accent-color); border-left: 3px solid var(--accent-color); padding-left: 11px; }\\n' +
'    .sidebar-item.active.level-1 { padding-left: 25px; }\\n' +
'    .sidebar-item.active.level-2 { padding-left: 39px; }\\n' +
'  </style>\\n' +
'</head>\\n' +
'<body>\\n' +
'  <div class="sidebar-container">\\n' +
     listHtml +
'  </div>\\n' +
'  <script>\\n' +
'    function toggleSection(headerEl) {\\n' +
'      headerEl.classList.toggle("collapsed");\\n' +
'      var currentEl = headerEl.nextElementSibling;\\n' +
'      while (currentEl && !currentEl.classList.contains("sidebar-header")) {\\n' +
'        if (currentEl.classList.contains("sidebar-item") || currentEl.classList.contains("sidebar-divider")) {\\n' +
'          currentEl.style.display = currentEl.style.display === "none" ? "block" : "none";\\n' +
'        }\\n' +
'        currentEl = currentEl.nextElementSibling;\\n' +
'      }\\n' +
'    }\\n' +
'    // Dynamic active page detection based on browser parent frame\\n' +
'    var currentPath = window.location.hash || window.location.search;\\n' +
'    var items = document.querySelectorAll(".sidebar-item");\\n' +
'    items.forEach(function(item) {\\n' +
'      if (item.getAttribute("href") === currentPath) {\\n' +
'        item.classList.add("active");\\n' +
'      }\\n' +
'      item.addEventListener("click", function() {\\n' +
'        items.forEach(function(i) { i.classList.remove("active"); });\\n' +
'        this.classList.add("active");\\n' +
'      });\\n' +
'    });\\n' +
'  </script>\\n' +
'</body>\\n' +
'</html>';

  return HtmlService.createHtmlOutput(completeHtml)
    .setTitle("Dynamic Google Sites Sidebar")
    .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL);
}`;
  };

  const copyToClipboard = (type: 'embed' | 'script', content: string) => {
    navigator.clipboard.writeText(content);
    setCopySuccess(type);
    setTimeout(() => setCopySuccess(null), 3000);
  };

  return (
    <div className="space-y-6 text-left animation-fade-in" id="sidebar-generator-panel">
      {/* Introduction Banner Header */}
      <div className="bg-[#FAF9F6] border border-[#E5E2DE] p-4 rounded-none">
        <h3 className="text-xs font-serif font-bold uppercase tracking-widest text-[#1A1A1A] flex items-center gap-2">
          <Layout className="w-4 h-4 text-[#8B6A4F]" />
          <span>Sidebar Navigation Generator</span>
        </h3>
        <p className="text-[11px] text-[#413A36] font-serif italic mt-1 leading-normal">
          Google Sites sidebars can be difficult to style and sync across subpages. Build a stunning custom hierarchical sidebar menu here, style it, and embed it instantly onto your live site.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
        
        {/* Left Column: List Tree Editor */}
        <div className="space-y-4">
          <div className="flex items-center justify-between border-b border-[#E5E2DE] pb-2">
            <h4 className="text-[10px] font-mono uppercase font-bold text-gray-500 tracking-wider">Page Links Hierarchy Builder</h4>
            <div className="flex gap-1.5">
              <button 
                onClick={() => handleAddItem('link')} 
                className="p-1 text-[9px] font-mono font-bold bg-white border border-gray-300 hover:border-black text-black flex items-center gap-1 cursor-pointer transition focus:outline-none"
                id="btn-add-sidebar-link"
              >
                <Plus className="w-3 h-3" />
                <span>Link</span>
              </button>
              <button 
                onClick={() => handleAddItem('header')} 
                className="p-1 text-[9px] font-mono font-bold bg-white border border-gray-300 hover:border-black text-black flex items-center gap-1 cursor-pointer transition focus:outline-none"
                id="btn-add-sidebar-header"
              >
                <FolderPlus className="w-3 h-3" />
                <span>Header</span>
              </button>
              <button 
                onClick={() => handleAddItem('divider')} 
                className="p-1 text-[9px] font-mono font-bold bg-white border border-gray-300 hover:border-black text-black flex items-center gap-1 cursor-pointer transition focus:outline-none"
                id="btn-add-sidebar-divider"
              >
                <span>--- Divider</span>
              </button>
            </div>
          </div>

          {/* Links Tree Container */}
          <div className="space-y-2 max-h-[50vh] overflow-y-auto pr-1 border border-dashed border-[#E5E2DE] p-2.5 bg-white">
            {items.length === 0 ? (
              <div className="py-8 text-center text-xs text-gray-400 font-serif italic">
                No menu navigation items. Click the buttons above to build your tree layout.
              </div>
            ) : (
              items.map((item, idx) => (
                <div 
                  key={item.id} 
                  className={`p-2 border group transition flex items-center justify-between gap-2 bg-[#FAF9F6] ${
                    item.type === 'header' ? 'border-[#EAE1DA] bg-[#FAF8F5]' : 
                    item.type === 'divider' ? 'border-gray-200 opacity-60' : 'border-gray-100 bg-white'
                  }`}
                  style={{ marginLeft: item.type === 'link' ? `${item.level * 16}px` : '0px' }}
                >
                  <div className="flex-1 flex items-center gap-2 min-w-0">
                    {/* Visual level indent flags */}
                    {item.type === 'link' && item.level > 0 && (
                      <span className="text-[9px] font-mono font-bold text-gray-400 bg-gray-100 px-1 py-0.5 scale-90 rounded-none shrink-0 select-none">
                        L{item.level}
                      </span>
                    )}

                    {/* Inputs based on item types */}
                    {item.type === 'divider' ? (
                      <span className="text-xs font-mono text-gray-400 tracking-widest pl-1">---- Section Divider Line ----</span>
                    ) : (
                      <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-1.5">
                        <input
                          type="text"
                          value={item.label}
                          onChange={(e) => handleUpdateItem(item.id, 'label', e.target.value)}
                          className="px-2 py-1 text-xs border border-gray-200 focus:border-black focus:outline-none bg-white min-w-0 font-medium"
                          placeholder={item.type === 'header' ? 'SECTION TITLE' : 'Page Title / Label'}
                          title="Click to edit link label name"
                        />
                        {item.type === 'link' && (
                          <input
                            type="text"
                            value={item.url}
                            onChange={(e) => handleUpdateItem(item.id, 'url', e.target.value)}
                            className="px-2 py-1 text-[10px] font-mono border border-gray-100 focus:border-black focus:outline-none bg-slate-50 text-slate-500 min-w-0"
                            placeholder="URL (#anchor or https://)"
                            title="Navigation destination or section anchor"
                          />
                        )}
                      </div>
                    )}
                  </div>

                  {/* Actions buttons panel */}
                  <div className="flex items-center gap-1 shrink-0 opacity-40 group-hover:opacity-100 transition duration-150">
                    {/* Hierarchy manipulation buttons for link depth */}
                    {item.type === 'link' && (
                      <>
                        <button
                          onClick={() => handleIndent(item.id, 'decrease')}
                          disabled={item.level === 0}
                          className="p-1 hover:bg-gray-200 text-gray-600 disabled:opacity-20 cursor-pointer focus:outline-none"
                          title="Outdent link"
                        >
                          <ChevronRight className="w-3.5 h-3.5 rotate-180" />
                        </button>
                        <button
                          onClick={() => handleIndent(item.id, 'increase')}
                          disabled={item.level === 2}
                          className="p-1 hover:bg-gray-200 text-gray-600 disabled:opacity-20 cursor-pointer focus:outline-none"
                          title="Indent link (nest depth)"
                        >
                          <ChevronRight className="w-3.5 h-3.5" />
                        </button>
                      </>
                    )}

                    {/* Reordering list elements */}
                    <button
                      onClick={() => handleMove(idx, 'up')}
                      disabled={idx === 0}
                      className="p-1 hover:bg-gray-200 text-gray-600 disabled:opacity-20 cursor-pointer focus:outline-none"
                      title="Move Up"
                    >
                      <ChevronUp className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => handleMove(idx, 'down')}
                      disabled={idx === items.length - 1}
                      className="p-1 hover:bg-gray-200 text-gray-600 disabled:opacity-20 cursor-pointer focus:outline-none"
                      title="Move Down"
                    >
                      <ChevronDown className="w-3.5 h-3.5" />
                    </button>

                    {/* Deletion */}
                    <button
                      onClick={() => handleDeleteItem(item.id)}
                      className="p-1 text-red-500 hover:bg-red-50 hover:text-red-700 cursor-pointer focus:outline-none ml-1"
                      title="Delete nav item"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Quick instructions indicator details */}
          <div className="p-3 bg-blue-50/50 border border-blue-100 rounded-none text-[11px] text-[#2B4C7E] flex gap-2.5 items-start">
            <AlertCircle className="w-4 h-4 text-blue-500 shrink-0 mt-0.5" />
            <div className="space-y-1">
              <p className="font-semibold">Nesting Level Quick Tip:</p>
              <p className="leading-relaxed opacity-90">
                You can create nested folders/subpages! Indent links under Category Headers to establish a perfect layout hierarchy. If you type <code className="font-mono bg-blue-100/60 px-1 py-0.2 rounded-sm text-[10px]">#anchor</code>, the link routes smoothly inside the preview, while absolute URLs will open in new browser tabs.
              </p>
            </div>
          </div>
        </div>

        {/* Right Column: Styling & Interactive Live Preview */}
        <div className="space-y-4">
          <div className="border-b border-[#E5E2DE] pb-2">
            <h4 className="text-[10px] font-mono uppercase font-bold text-gray-500 tracking-wider">Navigation Design Controls</h4>
          </div>

          {/* Controls list */}
          <div className="grid grid-cols-2 gap-4 bg-[#FAF9F6] p-3.5 border border-[#E5E2DE] text-xs">
            {/* Background Style */}
            <div className="space-y-1.5 text-left">
              <label className="block text-[10px] uppercase tracking-wider font-bold text-gray-500">Background Mode</label>
              <select
                value={sbBgMode}
                onChange={(e) => setSbBgMode(e.target.value as any)}
                className="w-full px-2 py-1.5 border border-gray-200 bg-white text-xs focus:outline-none focus:border-black rounded-none cursor-pointer"
              >
                <option value="transparent">Transparent / Bare border</option>
                <option value="themeSecondary">Secondary theme shade ({colors.secondaryBg})</option>
                <option value="themeBg">Theme Page Background ({colors.primaryBg})</option>
                <option value="dark">Cosmic Dark Slate (#1A1A1A)</option>
                <option value="white">Pristine Minimalist White (#FFFFFF)</option>
              </select>
            </div>

            {/* Typography Family Selector */}
            <div className="space-y-1.5 text-left">
              <label className="block text-[10px] uppercase tracking-wider font-bold text-gray-500">Font Family</label>
              <select
                value={sbFontFamily}
                onChange={(e) => setSbFontFamily(e.target.value as any)}
                className="w-full px-2 py-1.5 border border-gray-200 bg-white text-xs focus:outline-none focus:border-black rounded-none cursor-pointer font-mono"
              >
                <option value="body">Body (Inherits: {typography.body.family})</option>
                <option value="heading">Heading (Inherits: {typography.heading.family})</option>
                <option value="title">Title (Inherits: {typography.title.family})</option>
              </select>
            </div>

            {/* Rounded Corners Shape */}
            <div className="space-y-1.5 text-left">
              <label className="block text-[10px] uppercase tracking-wider font-bold text-gray-500">Rounded Pill Shape</label>
              <select
                value={sbRoundedMode}
                onChange={(e) => setSbRoundedMode(e.target.value as any)}
                className="w-full px-2 py-1.5 border border-gray-200 bg-white text-xs focus:outline-none focus:border-black rounded-none cursor-pointer"
              >
                <option value="none">Square Flat (None)</option>
                <option value="sm">Soft Border Corner (Small)</option>
                <option value="md">Modern Curved (Medium)</option>
                <option value="lg">Soft Rounded Bubbles (Large)</option>
                <option value="full">Capsule Pill Shape (Full)</option>
              </select>
            </div>

            {/* Active Link Layout Style */}
            <div className="space-y-1.5 text-left">
              <label className="block text-[10px] uppercase tracking-wider font-bold text-gray-500">Active link design</label>
              <select
                value={sbActiveStyle}
                onChange={(e) => setSbActiveStyle(e.target.value as any)}
                className="w-full px-2 py-1.5 border border-gray-200 bg-white text-xs focus:outline-none focus:border-black rounded-none cursor-pointer"
              >
                <option value="left-border">Colored left border bar</option>
                <option value="pill-bg">Solid colored capsule background</option>
                <option value="underline">Minimalist text underline bar</option>
                <option value="bold-only">Simple high-contrast bold text</option>
              </select>
            </div>

            {/* Sidebar Spacing / Padding Height */}
            <div className="space-y-1.5 text-left col-span-2">
              <label className="block text-[10px] uppercase tracking-wider font-bold text-gray-500">Link Spacing & Padding density</label>
              <div className="grid grid-cols-3 gap-2">
                {(['tight', 'cozy', 'spacious'] as const).map((space) => (
                  <button
                    key={space}
                    onClick={() => setSbSpacing(space)}
                    className={`py-1.5 px-3 border text-xs text-center font-bold uppercase tracking-wider cursor-pointer transition focus:outline-none ${
                      sbSpacing === space ? 'bg-black text-white border-black' : 'bg-white border-gray-200 text-gray-500 hover:border-gray-400'
                    }`}
                  >
                    <span>{space}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Interactive live rendering container representing exactly how the embedded iframe looks */}
          <div className="space-y-1 text-left">
            <span className="text-[10px] font-mono font-bold text-gray-400 uppercase tracking-wider">Live Sidebar Preview (Interactive)</span>
            
            <div 
              className="p-5 border border-solid border-[#E5E2DE] relative min-h-[250px] transition duration-200"
              style={{ backgroundColor: sbBgColor }}
            >
              <div className="w-full max-w-[280px]" style={{ fontFamily: getFontFamilyName() }}>
                {items.map((item, idx) => {
                  if (item.type === 'divider') {
                    return <div key={item.id} className="h-[1px] my-3" style={{ backgroundColor: sbTextColor, opacity: 0.15 }} />;
                  }

                  if (item.type === 'header') {
                    const isCollapsed = collapsedHeaders[item.label] === true;
                    return (
                      <div 
                        key={item.id}
                        onClick={() => toggleHeaderCollapse(item.label)}
                        className="text-[11px] font-bold tracking-widest uppercase py-3 px-3 mt-3 flex justify-between items-center cursor-pointer select-none"
                        style={{ color: sbTextColor, opacity: 0.55 }}
                      >
                        <span>{item.label}</span>
                        <ChevronDown 
                          className={`w-3 h-3 transition-transform duration-200 ${isCollapsed ? 'rotate-[-90deg]' : 'rotate-0'}`} 
                          style={{ color: sbTextColor }}
                        />
                      </div>
                    );
                  }

                  // Skip rendering if parent header is collapsed
                  // Find the closest preceding header
                  let isHidden = false;
                  for (let i = idx; i >= 0; i--) {
                    if (items[i].type === 'header') {
                      if (collapsedHeaders[items[i].label] === true) {
                        isHidden = true;
                      }
                      break;
                    }
                  }

                  if (isHidden) return null;

                  const isActive = item.url === activeSimUrl;
                  const pl = item.level === 2 ? 'pl-9' : item.level === 1 ? 'pl-6' : 'pl-3.5';
                  
                  // Active indicator styles
                  const activeStyleMap = isActive ? {
                    color: sbAccentColor,
                    fontWeight: '700',
                    borderLeft: sbActiveStyle === 'left-border' ? `3px solid ${sbAccentColor}` : 'none',
                    backgroundColor: sbActiveStyle === 'pill-bg' ? sbAccentColor : 'transparent',
                    textDecoration: sbActiveStyle === 'underline' ? 'underline' : 'none',
                    textUnderlineOffset: '4px',
                    colorOverride: sbActiveStyle === 'pill-bg' ? '#FFFFFF' : sbAccentColor
                  } : null;

                  return (
                    <button
                      key={item.id}
                      onClick={() => {
                        if (item.url) setActiveSimUrl(item.url);
                      }}
                      className={`w-full text-left transition duration-150 block cursor-pointer outline-none ${getRoundedClass()} ${getSpacingClass()} ${pl}`}
                      style={{
                        color: activeStyleMap ? activeStyleMap.colorOverride : sbTextColor,
                        backgroundColor: activeStyleMap ? activeStyleMap.backgroundColor : 'transparent',
                        fontWeight: activeStyleMap ? '700' : '400',
                        borderLeft: activeStyleMap ? activeStyleMap.borderLeft : 'none',
                        textDecoration: activeStyleMap ? activeStyleMap.textDecoration : 'none',
                        textUnderlineOffset: activeStyleMap ? activeStyleMap.textUnderlineOffset : '0px',
                        opacity: isActive ? 1 : item.level === 2 ? 0.65 : item.level === 1 ? 0.75 : 0.85
                      }}
                    >
                      <span>{item.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Code Export block and Google Apps Script Integrator */}
      <div className="border border-[#E5E2DE] rounded-none bg-white overflow-hidden">
        {/* Toggle bar between static HTML embed and Google Apps script syncing */}
        <div className="flex border-b border-[#E5E2DE] bg-[#FAF9F6]">
          <button
            onClick={() => setActiveExportTab('html')}
            className={`flex-1 py-3 px-4 text-[10px] uppercase tracking-wider font-bold flex items-center justify-center gap-2 border-r border-[#E5E2DE] cursor-pointer transition focus:outline-none ${
              activeExportTab === 'html' ? 'bg-white border-t-2 border-black text-black' : 'text-gray-400 hover:text-gray-600'
            }`}
            id="tab-export-html"
          >
            <Code className="w-3.5 h-3.5" />
            <span>Option A: HTML Embed Code</span>
          </button>
          <button
            onClick={() => setActiveExportTab('apps-script')}
            className={`flex-1 py-3 px-4 text-[10px] uppercase tracking-wider font-bold flex items-center justify-center gap-2 cursor-pointer transition focus:outline-none ${
              activeExportTab === 'apps-script' ? 'bg-white border-t-2 border-black text-black' : 'text-gray-400 hover:text-gray-600'
            }`}
            id="tab-export-script"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Option B: Google Apps Script (Auto-Sync)</span>
          </button>
        </div>

        {/* Tab content panel */}
        <div className="p-5">
          {activeExportTab === 'html' ? (
            <div className="space-y-3.5">
              <div className="flex justify-between items-start">
                <div>
                  <h4 className="text-[11px] uppercase tracking-wider font-bold text-gray-800">Static HTML/CSS Code Embed Box</h4>
                  <p className="text-[10px] text-gray-400 mt-0.5 font-serif italic">This produces a beautiful, high-speed standalone navigation sidebar designed to fit into an Embed element.</p>
                </div>
                <button
                  onClick={() => copyToClipboard('embed', generateEmbedCode())}
                  className="px-3 py-1 bg-[#1A1A1A] hover:bg-[#333] text-white text-[10px] uppercase font-mono tracking-widest flex items-center gap-1.5 transition cursor-pointer focus:outline-none"
                  id="btn-copy-embed"
                >
                  {copySuccess === 'embed' ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-green-400" />
                      <span>Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Copy Embed</span>
                    </>
                  )}
                </button>
              </div>

              {/* Code markup frame */}
              <div className="relative">
                <pre className="p-4 bg-slate-900 text-slate-100 text-[10px] font-mono rounded-none overflow-x-auto max-h-[180px] text-left border border-slate-800 custom-scrollbar select-all">
                  <code>{generateEmbedCode()}</code>
                </pre>
              </div>

              {/* Simple layout step guidelines */}
              <div className="text-[11px] space-y-1 pl-4 border-l border-[#8B6A4F] text-[#413A36] font-serif italic text-left">
                <p className="font-sans font-bold uppercase tracking-wider text-[9px] text-[#8B6A4F] not-italic mb-1">How to place on Google Sites:</p>
                <p>1. Open your Google Sites editor and click on the page you wish to modify.</p>
                <p>2. Select the <strong>Insert</strong> tab on the right side options deck, then click the <strong>Embed (&lt;/&gt;)</strong> button tool.</p>
                <p>3. Choose <strong>Embed Code</strong> in the popup card, paste our copied markup block, and click <strong>Next &gt; Insert</strong>.</p>
                <p>4. Stretch the frame height to fit your list structure perfectly and align it as a vertical sidebar next to your content blocks!</p>
              </div>
            </div>
          ) : (
            <div className="space-y-3.5">
              <div className="flex justify-between items-start">
                <div>
                  <h4 className="text-[11px] uppercase tracking-wider font-bold text-gray-800">Automated Google Sheet Sync Deployment</h4>
                  <p className="text-[10px] text-gray-400 mt-0.5 font-serif italic">Avoid editing each subpage separately! Use this Apps Script to read and sync your links directly from a simple Google Sheet spreadsheet.</p>
                </div>
                <button
                  onClick={() => copyToClipboard('script', generateAppsScriptTemplate())}
                  className="px-3 py-1 bg-[#1A1A1A] hover:bg-[#333] text-white text-[10px] uppercase font-mono tracking-widest flex items-center gap-1.5 transition cursor-pointer focus:outline-none"
                  id="btn-copy-script"
                >
                  {copySuccess === 'script' ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-green-400" />
                      <span>Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Copy Apps Script</span>
                    </>
                  )}
                </button>
              </div>

              {/* Code markup frame */}
              <div className="relative">
                <pre className="p-4 bg-slate-900 text-slate-100 text-[10px] font-mono rounded-none overflow-x-auto max-h-[180px] text-left border border-slate-800 custom-scrollbar select-all">
                  <code>{generateAppsScriptTemplate()}</code>
                </pre>
              </div>

              {/* Step instructions */}
              <div className="bg-[#FAF9F6] border border-[#E5E2DE] p-4 text-[11px] text-[#413A36] space-y-2 text-left leading-normal">
                <p className="font-sans font-bold uppercase text-[10px] text-[#1A1A1A] tracking-wider mb-1">Easy Setup Steps:</p>
                <p>
                  <strong>1. Setup Sheet:</strong> Create a new spreadsheet in Google Sheets. Name the first tab <code className="font-mono bg-[#EAE8E4] px-1 py-0.2 rounded-sm text-[10px]">Sheet1</code>. Set headers as:
                  <br />
                  <span className="font-mono bg-white px-2 py-0.5 border border-gray-200 inline-block mt-1 font-bold">Label | URL | Level | Type</span>
                </p>
                <p>
                  <strong>2. Configure Script:</strong> In your spreadsheet, open <strong>Extensions &gt; Apps Script</strong>. Replace the empty file contents with this copied script, paste your Google Sheet ID in the <code className="font-mono bg-[#EAE8E4] px-1 py-0.2 text-[#C0392B]">YOUR_GOOGLE_SHEET_ID_HERE</code> variable, and save.
                </p>
                <p>
                  <strong>3. Deploy Web App:</strong> Click <strong>Deploy &gt; New Deployment</strong>. Choose <strong>Web App</strong> as the type. Under "Who has access", pick <strong>Anyone</strong>. Authorize permissions and copy the generated Web App URL.
                </p>
                <p>
                  <strong>4. Paste into Google Sites:</strong> In Google Sites, insert an **Embed (by URL)** widget on your pages, paste your Web App URL, and save! Now, whenever you add or edit rows in your Google Sheet, the navigation sidebar on your public site automatically updates in real-time!
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
