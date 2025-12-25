// app/context/AccessibilityContext.tsx
"use client";

import React, { createContext, useContext, useState, useEffect } from 'react';
import { Supabase} from '../lib/supabase-client';

interface AccessibilitySettings {
  font_size: number;
  theme: 'dark' | 'light';
  screen_reader: boolean;
  magnification: number;
  color_inversion: boolean;
}

interface AccessibilityContextType {
  settings: AccessibilitySettings;
  updateSettings: (newSettings: Partial<AccessibilitySettings>) => Promise<void>;
  loading: boolean;
  fontSizeMultiplier: number;
}

const defaultSettings: AccessibilitySettings = {
  font_size: 16,
  theme: 'light',
  screen_reader: false,
  magnification: 100,
  color_inversion: false,
};

const AccessibilityContext = createContext<AccessibilityContextType | undefined>(undefined);

export function AccessibilityProvider({ children }: { children: React.ReactNode }) {
  const [settings, setSettings] = useState<AccessibilitySettings>(defaultSettings);
  const [loading, setLoading] = useState(true);
  const supabase = Supabase;

  // Calculate font size multiplier (1x or 1.25x)
  const fontSizeMultiplier = settings.font_size >= 18 ? 1.25 : 1;

  useEffect(() => {
    loadSettings();
  }, []);

  // Apply theme and other settings to document
  useEffect(() => {
    if (typeof window !== 'undefined') {
      // Apply theme
      document.documentElement.classList.toggle('dark', settings.theme === 'dark');
      
      // Apply color inversion
      document.documentElement.style.filter = settings.color_inversion ? 'invert(1) hue-rotate(180deg)' : 'none';
      
      // Apply magnification
      document.documentElement.style.zoom = `${settings.magnification}%`;
      
      // Set CSS variable for font size
      document.documentElement.style.setProperty('--base-font-size', `${settings.font_size}px`);
    }
  }, [settings]);

  const loadSettings = async () => {
    try {
      // Get user from cookie
      const cookies = document.cookie.split(';');
      const userCookie = cookies.find(c => c.trim().startsWith('user='));
      
      if (!userCookie) {
        setLoading(false);
        return;
      }

      const userData = JSON.parse(decodeURIComponent(userCookie.split('=')[1]));
      
      // Fetch accessibility settings from Supabase
      const { data, error } = await supabase
        .from('accessibility_settings')
        .select('*')
        .eq('id', userData.id)
        .single();

      if (error) {
        // If no settings exist, create default settings
        if (error.code === 'PGRST116') {
          await createDefaultSettings(userData.id);
        }
      } else if (data) {
        setSettings(data);
      }
    } catch (error) {
      console.error('Error loading accessibility settings:', error);
    } finally {
      setLoading(false);
    }
  };

  const createDefaultSettings = async (userId: number) => {
    try {
      const { error } = await supabase
        .from('accessibility_settings')
        .insert([{ id: userId, ...defaultSettings }]);
      
      if (!error) {
        setSettings(defaultSettings);
      }
    } catch (error) {
      console.error('Error creating default settings:', error);
    }
  };

  const updateSettings = async (newSettings: Partial<AccessibilitySettings>) => {
    try {
      const cookies = document.cookie.split(';');
      const userCookie = cookies.find(c => c.trim().startsWith('user='));
      
      if (!userCookie) return;

      const userData = JSON.parse(decodeURIComponent(userCookie.split('=')[1]));
      const updatedSettings = { ...settings, ...newSettings };

      const { error } = await supabase
        .from('accessibility_settings')
        .update(newSettings)
        .eq('id', userData.id);

      if (!error) {
        setSettings(updatedSettings);
      }
    } catch (error) {
      console.error('Error updating accessibility settings:', error);
    }
  };

  return (
    <AccessibilityContext.Provider value={{ settings, updateSettings, loading, fontSizeMultiplier }}>
      {children}
    </AccessibilityContext.Provider>
  );
}

export function useAccessibility() {
  const context = useContext(AccessibilityContext);
  if (context === undefined) {
    throw new Error('useAccessibility must be used within AccessibilityProvider');
  }
  return context;
}