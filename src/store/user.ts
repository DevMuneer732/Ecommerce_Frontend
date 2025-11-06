import { devtools, persist } from 'zustand/middleware';
import { create } from 'zustand';

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
          const responseData = await authService.register(values);

          set({ user: responseData.user, isLoggedIn: false });
          
          return responseData;

        },

        login: async (values: LoginValues) => {
          // 1. Call the API service
          const responseData = await authService.login(values);

          // 2. Update the state
          set({ user: responseData.user, isLoggedIn: true });

          // 3. Set the auth token for future API calls
          if (responseData.token) {
            localStorage.setItem('token', responseData.token);
            api.defaults.headers.common['Authorization'] = `Bearer ${responseData.token}`;
          }

          return responseData;
        },

      }),

      // Persist config
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