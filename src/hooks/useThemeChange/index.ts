// import { updateTheme } from '@/utils/utils';
import { useState } from 'react';
interface TypeTheme {
  theme: 'light' | 'dark' | 'auto';
  setTheme: (theme: 'light' | 'dark' | 'auto') => void;
}
const useThemeChange = () => {
  const [theme, setTheme] = useState<TypeTheme['theme']>('light');
  const changeTheme = (t: TypeTheme['theme']) => {
    setTheme(t);
    // if (t === 'dark') {
    //   updateTheme('dark');
    // } else {
    //   updateTheme('light');
    // }
  };
  return {
    theme: theme,
    changeTheme,
  };
};

export default useThemeChange;
