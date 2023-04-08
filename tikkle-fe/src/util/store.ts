import { atom, selector } from 'recoil';
import { recoilPersist } from 'recoil-persist';
import { userInfoType } from '../pages/Login';

// localStorage에 'recoil-persist'라는 key로 저장
const { persistAtom } = recoilPersist({
  key: 'recoil-persist',
  storage: localStorage
});

// atom에서 타입은 할당하는 값에 atom<T> 형식으로 작성
// <T>는 제네릭을 학습하며 배우는 것으로, 프로그래밍에서 불특정 타입을 의미
export const dateState = atom({
  key: 'dateState',
  default: new Date(),
});

/**
 * 액세스 토큰
 */
export const tokenState = atom<string | null>({
  key: 'tokenState',
  default: null,
  
  // 서버에서 토큰의 유효기간 검증을 하지 않기 때문에 영구 저장 시 오히려 버그의 원인이 되므로 주석
  // 구글 페이지로 이동했다가 리디렉션 될 시 상태가 날라가서 불가피하게 필요함
  // ToDo 백엔드에 토큰이 만료된 토큰이라면 401을 반환하도록 수정 요청
  effects: [persistAtom]
});

// 로그인 후 사용자가 이동해야 할 페이지를 저장하는 상태
export const currentPageState = atom({
  key: 'currentPageState',
  default: 'usersetting',

  // 토큰을 localStorage에 저장하려면 아래 구문을 atom마다 적어주어야 함
  effects: [persistAtom]
})

export const userInfoState = atom<userInfoType | null>({
  key: 'userInfoState',
  default: null,
  effects: [persistAtom],
});