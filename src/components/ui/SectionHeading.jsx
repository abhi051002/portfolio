import React from 'react';

/**
 * SectionHeading — reusable animated section header
 * @param {string} label - eyebrow label text
 * @param {string} title - main heading
 * @param {string} highlight - word to wrap in gradient
 * @param {string} subtitle - optional subtitle paragraph
 * @param {'left'|'center'} align - text alignment
 */
const SectionHeading = ({ label, title, highlight, subtitle, align = 'center' }) => {
  const alignClass = align === 'left' ? 'items-start text-left' : 'items-center text-center';

  return (
    <div className={`flex flex-col gap-3 mb-14 ${alignClass}`}>
      {label && (
        <span className="section-label">{label}</span>
      )}

      <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight tracking-tight">
        {title}{' '}
        {highlight && <span className="gradient-text">{highlight}</span>}
      </h2>

      {subtitle && (
        <p className="text-slate-400 text-base sm:text-lg max-w-2xl text-balance leading-relaxed">
          {subtitle}
        </p>
      )}

      <div className={`flex gap-2 mt-1 ${align === 'center' ? 'justify-center' : ''}`}>
        <div className="h-0.5 w-12 bg-gradient-to-r from-violet-600 to-purple-500 rounded-full" />
        <div className="h-0.5 w-4 bg-gradient-to-r from-purple-500 to-cyan-500 rounded-full" />
        <div className="h-0.5 w-2 bg-cyan-500/50 rounded-full" />
      </div>
    </div>
  );
};

export default SectionHeading;
