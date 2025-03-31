import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';

interface ContactFormData {
  name: string;
  email: string;
  phone?: string;
  message: string;
}

interface ContactState {
  isSubmitting: boolean;
  success: boolean;
  error: string | null;
}

const initialState: ContactState = {
  isSubmitting: false,
  success: false,
  error: null,
};

export const submitContactForm = createAsyncThunk(
  'contact/submitForm',
  async (formData: ContactFormData, { rejectWithValue }) => {
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to submit contact form');
      }

      return await response.json();
    } catch (error) {
      return rejectWithValue((error as Error).message);
    }
  }
);

const contactSlice = createSlice({
  name: 'contact',
  initialState,
  reducers: {
    resetContactState: (state) => {
      state.isSubmitting = false;
      state.success = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(submitContactForm.pending, (state) => {
        state.isSubmitting = true;
        state.success = false;
        state.error = null;
      })
      .addCase(submitContactForm.fulfilled, (state) => {
        state.isSubmitting = false;
        state.success = true;
      })
      .addCase(submitContactForm.rejected, (state, action) => {
        state.isSubmitting = false;
        state.error = action.payload as string;
      });
  },
});

export const { resetContactState } = contactSlice.actions;
export default contactSlice.reducer;