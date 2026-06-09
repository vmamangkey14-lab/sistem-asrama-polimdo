import React from "react";

/**
 * GlassCard component
 * Props:
 * - title: string (optional)
 * - icon: React element (optional)
 * - children: content inside the card
 * - className: additional class names
 */
export default function GlassCard({ title, icon, children, className = "" }) {
  return (
    <div
      className={`glass-panel p-6 rounded-2xl shadow-lg hover:shadow-2xl transition-shadow duration-300 ${className}`}
    >
      {(title || icon) && (
        <div className="flex items-center gap-3 mb-4">
          {icon && <span className="text-white/80">{icon}</span>}
          {title && <h3 className="text-xl font-semibold text-white">{title}</h3>}
        </div>
      )}
      <div className="text-white">{children}</div>
    </div>
  );
}
