import { create } from "zustand";

// 스토어 상태를 위한 인터페이스 정의
interface StoreState {
  token: string | null; // token은 문자열 또는 null
  setToken: (token: string | null) => void; // setToken은 문자열 또는 null을 매개변수로 받고 void를 반환
}

// 스토어 생성
export const useStore = create<StoreState>((set) => ({
  token: null, // 초기 token 값은 null
  setToken: (token) => set({ token }), // setToken 함수는 주어진 token으로 상태를 업데이트
}));
