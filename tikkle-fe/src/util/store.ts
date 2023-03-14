import { atom } from 'recoil';

// atom에서 타입은 할당하는 값에 atom<T> 형식으로 작성
// <T>는 제네릭을 학습하며 배우는 것으로, 프로그래밍에서 불특정 타입을 의미
export const date = atom<Date>({
  key: 'date',
  default: new Date(),
});
