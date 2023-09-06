import {create} from 'zustand';
import { persist } from 'zustand/middleware';

type AppState = {
    dopen: boolean;
    updateOpen: (dopen: boolean) => void;
};

const appStore = persist<AppState>(
    (set) => ({
        dopen: true,
        updateOpen: (dopen: boolean) => set(() => ({ dopen: dopen })),
    }),
    {
        name: 'my_app_store',
    }
);

export const useAppStore = create(appStore);
