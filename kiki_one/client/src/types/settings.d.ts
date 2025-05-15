export type ThemeColor = 'dark-blue' | 'dark-purple' | 'dark-green';
export type OpacityLevel = '30' | '50' | '80';

export interface SettingsMenuProps {
  onClose: () => void;
}

export interface Settings {
  background: string | null;
  themeColor: ThemeColor;
  opacity: OpacityLevel;
}

export interface SettingsContextType {
  settings: Settings;
  setBackground: (image: string) => void;
  setThemeColor: (color: ThemeColor) => void;
  setOpacity: (opacity: OpacityLevel) => void;
}