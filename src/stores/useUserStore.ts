import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { User } from '@/types/user';

interface UserState {
  user: User | null;
  isAuthenticated: boolean;
}

interface UserActions {
  login: (username: string) => void;
  logout: () => void;
}

type UserStore = UserState & UserActions;

export const useUserStore = create<UserStore>()(
  persist(
    (set) => ({
      // Estado inicial
      user: null,
      isAuthenticated: false,

      // Login (pseudo-login sin backend)
      login: (username: string) => {
        const user: User = {
          id: `user-${Date.now()}`,
          username: username.trim(),
          createdAt: new Date().toISOString(),
        };

        set({
          user,
          isAuthenticated: true,
        });
      },

      // Logout
      logout: () => {
        set({
          user: null,
          isAuthenticated: false,
        });
      },
    }),
    {
      name: 'user-storage',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);
