import { devtools, persist } from 'zustand/middleware';
import { create } from 'zustand';
import { toast } from "react-hot-toast"
import type { TUserStore } from '../types/user';
import type { RegisterValues, LoginValues } from '../validation/authSchemas';
import { authService } from '../services/authService';
import { api } from '../services/api';

export const useUserStore = create<TUserStore>()(
  devtools(
    persist(
      (set) => ({
        isLoggedIn: false,
        user: null,

        setUser(user) {
          set(() => ({ user }));
        },
        setIsLoggedIn(status) {
          set(() => ({ isLoggedIn: status }));
        },

        register: async (values: RegisterValues) => {
          try {
            const responseData = await authService.register(values);
            set({ user: responseData.user, isLoggedIn: false });
            toast.success('Registration successful! Please log in.');
            return responseData;
          } catch (error: any) {
            console.error("Registration failed:", error);
            toast.error(error.message || 'Registration failed.');
            throw error;
          }
        },

        login: async (values: LoginValues) => {
          try {
            const responseData = await authService.login(values);
            set({ user: responseData.user, isLoggedIn: true });
            if (responseData.token) {
              localStorage.setItem('token', responseData.token);
              api.defaults.headers.common['Authorization'] = `Bearer ${responseData.token}`;
            }
            toast.success(`Login Successfully!`);
            return responseData;
          } catch (error: any) {
            console.error("Login failed:", error);
            toast.error(error.message || 'Invalid credentials.');
            throw error;
          }
        },
        logout: () => {
          localStorage.removeItem('token');
          delete api.defaults.headers.common['Authorization'];
          set({ user: null, isLoggedIn: false });
          toast.success('Logged out successfully');
        }
      }),
      {
        name: 'user-auth-settings',
        partialize: (state) => ({
          isLoggedIn: state.isLoggedIn,
          user: state.user
        }),
        onRehydrateStorage: () => (state) => {
          if (state) {
            const token = localStorage.getItem('token');
            if (token) {
              api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
            }
          }
        }
      }
    ),
  ),
);