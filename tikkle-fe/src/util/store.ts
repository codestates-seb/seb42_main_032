import { atom } from 'recoil';
import { recoilPersist } from 'recoil-persist';

// 모든 recoil atom들이 localStorage에 'recoil-persist'라는 key로 저장됨
const { persistAtom } = recoilPersist();

// atom에서 타입은 할당하는 값에 atom<T> 형식으로 작성
// <T>는 제네릭을 학습하며 배우는 것으로, 프로그래밍에서 불특정 타입을 의미
export const dateState = atom<Date>({
  key: 'dateState',
  default: new Date(),
});

// ToDo - 사용자 로그인 시점에 서버에서 받아온 데이터로 업데이트
export const totalBudgetState = atom<number>({
  key: 'totalBudgetState',
  default: 500000
})

/**
 * 액세스 토큰
 */
export const tokenState = atom<string | null>({
  key: 'tokenState',
  default: null
})