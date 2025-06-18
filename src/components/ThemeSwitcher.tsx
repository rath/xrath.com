"use client";

import { useTheme } from "./ThemeProvider";
import { useState } from "react";

const themes = [
  { 
    name: "azure", 
    label: "Azure",
    colors: ["#3b82f6", "#0ea5e9", "#06b6d4"],
    description: "Modern tech blue"
  },
  { 
    name: "emerald", 
    label: "Emerald",
    colors: ["#10b981", "#06b6d4", "#14b8a6"],
    description: "Natural green"
  },
  { 
    name: "rose", 
    label: "Rose",
    colors: ["#f43f5e", "#ec4899", "#f97316"],
    description: "Elegant pink"
  },
  { 
    name: "violet", 
    label: "Violet",
    colors: ["#8b5cf6", "#a855f7", "#6366f1"],
    description: "Royal purple"
  },
  { 
    name: "amber", 
    label: "Amber",
    colors: ["#f59e0b", "#f97316", "#ef4444"],
    description: "Warm golden"
  },
  { 
    name: "slate", 
    label: "Slate",
    colors: ["#64748b", "#6b7280", "#3b82f6"],
    description: "Professional gray"
  },
] as const;

export function ThemeSwitcher() {
  const { theme, setTheme, isDark, toggleDark } = useTheme();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="fixed bottom-8 right-8 z-50">
      <div className={`transition-all duration-300 ${isOpen ? "mb-4" : ""}`}>
        {isOpen && (
          <div className="glass-effect rounded-xl p-4 mb-4 shadow-2xl">
            <h3 className="text-sm font-semibold mb-3">Color Themes</h3>
            <div className="grid gap-2">
              {themes.map((t) => (
                <button
                  key={t.name}
                  onClick={() => setTheme(t.name as any)}
                  className={`
                    flex items-center gap-3 p-3 rounded-lg transition-all
                    ${theme === t.name 
                      ? "bg-primary/10 border border-primary" 
                      : "hover:bg-surface border border-transparent"
                    }
                  `}
                >
                  <div className="flex gap-1">
                    {t.colors.map((color, i) => (
                      <div
                        key={i}
                        className="w-4 h-4 rounded-full"
                        style={{ backgroundColor: color }}
                      />
                    ))}
                  </div>
                  <div className="text-left">
                    <div className="text-sm font-medium">{t.label}</div>
                    <div className="text-xs opacity-60">{t.description}</div>
                  </div>
                </button>
              ))}
            </div>
            
            <div className="mt-4 pt-4 border-t border-border">
              <label className="flex items-center justify-between">
                <span className="text-sm">Dark Mode</span>
                <button
                  onClick={toggleDark}
                  className={`
                    relative w-12 h-6 rounded-full transition-colors
                    ${isDark ? "bg-primary" : "bg-gray-300"}
                  `}
                >
                  <div
                    className={`
                      absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full
                      transition-transform duration-200
                      ${isDark ? "translate-x-6" : "translate-x-0"}
                    `}
                  />
                </button>
              </label>
            </div>
          </div>
        )}
      </div>
      
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`
          glass-effect p-4 rounded-full shadow-lg
          hover:shadow-xl transition-all duration-300
          ${isOpen ? "rotate-45" : ""}
        `}
      >
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
            d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" 
          />
        </svg>
      </button>
    </div>
  );
}