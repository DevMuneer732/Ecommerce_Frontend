import { devtools, persist } from 'zustand/middleware';

import type { TUserStore } from '../types/user';
import { create } from 'zustand';

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
      }),
      { name: 'settings' },
    ),
  ),
);
