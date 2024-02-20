import { User } from "@/types/user";
import { create } from "zustand"; // create로 zustand를 불러옵니다.

type UserStore = {
  isAuth: boolean;
  user: User | null;
  setIsAuth: (isAuth: boolean) => void;
  setUser: (user: User | null) => void;
};

const useUserStore = create<UserStore>((set) => ({
  isAuth: false,
  user: {
    id: 0,
    email: "",
    name: "",
  },
  setIsAuth: (isAuth) => set((state) => ({ isAuth })),
  setUser: (user: User | null) => {
    set({ user });
  },
}));

export default useUserStore;
