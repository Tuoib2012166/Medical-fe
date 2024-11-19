import { create } from 'zustand';

const useUserStore = create((set) => ({
    user: { user: null, profile: null },
    setUser: (newUser) => set({ user: { user: newUser.user, profile: newUser.profile } }),
    clearUser: () => set({ user: { user: null, profile: null } }),
    isUserLoggedIn: () => !!useUserStore.getState().user.profile,
}));

export default useUserStore;
