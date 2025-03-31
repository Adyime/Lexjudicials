import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UIState {
  isDarkMode: boolean;
  isMobileMenuOpen: boolean;
  isScrolled: boolean;
  activeTab: string;
  toast: {
    open: boolean;
    message: string;
    type: 'success' | 'error' | 'info';
  };
}

const initialState: UIState = {
  isDarkMode: false,
  isMobileMenuOpen: false,
  isScrolled: false,
  activeTab: 'blogs',
  toast: {
    open: false,
    message: '',
    type: 'info',
  },
};

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    toggleDarkMode: (state) => {
      state.isDarkMode = !state.isDarkMode;
    },
    setDarkMode: (state, action: PayloadAction<boolean>) => {
      state.isDarkMode = action.payload;
    },
    toggleMobileMenu: (state) => {
      state.isMobileMenuOpen = !state.isMobileMenuOpen;
    },
    closeMobileMenu: (state) => {
      state.isMobileMenuOpen = false;
    },
    setIsScrolled: (state, action: PayloadAction<boolean>) => {
      state.isScrolled = action.payload;
    },
    setActiveTab: (state, action: PayloadAction<string>) => {
      state.activeTab = action.payload;
    },
    showToast: (state, action: PayloadAction<{ message: string; type: 'success' | 'error' | 'info' }>) => {
      state.toast = {
        open: true,
        message: action.payload.message,
        type: action.payload.type,
      };
    },
    hideToast: (state) => {
      state.toast.open = false;
    },
  },
});

export const {
  toggleDarkMode,
  setDarkMode,
  toggleMobileMenu,
  closeMobileMenu,
  setIsScrolled,
  setActiveTab,
  showToast,
  hideToast,
} = uiSlice.actions;
export default uiSlice.reducer;