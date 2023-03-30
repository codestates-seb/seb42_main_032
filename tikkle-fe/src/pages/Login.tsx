//TODO LOGIN_001 Google OAuth 로그인 페이지 구현
/**
 * [README]
 * 주석에서 토큰은 액세스 토큰을 의미합니다
 * 액세스 토큰이 유효하다는 것은 만료되지 않은 액세스 토큰이 recoil 상태로 존재한다는 것을 의미합니다
 */

import { useEffect, useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { tokenState, currentPageState, userInfoState } from '../util/store';
import { useRecoilState } from 'recoil';

/**
 * 스타일 코드 부분
 */
const LoginContainer = styled.div`
  background-image: url('/tikkle-background.jpg');
  position: relative;
  background-color: transparent;
  background-size: cover;
  background-position: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  font-family: 'GmarketSansMedium';
  height: 100vh;
  width: 100%;
  ::before {
    position: absolute;
    content: '';
    top: 0px;
    left: 0px;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.6);
  }
  /* min-height: calc(100vh - 340px); */
  img {
    width: 600px;
    height: 300px;
  }
`;

const LogoWrap = styled.div`
  z-index: 1;
  img {
    filter: drop-shadow(1px 1px 1px white);
  }
  span {
    color: white;
    font-size: 25px;
    font-weight: bold;
    /* filter: drop-shadow(1px 1px 10px white); */
  }
`;

const OauthLoginButton = styled.div`
  z-index: 1;
  display: flex;
  justify-content: center;
  font-size: 14px;
  font-family: Roboto-Medium;
  border: 0.1px solid hsl(210, 8%, 85%);
  border-radius: 5px;
  padding: 10px;
  width: 265px;
  gap: 10px;
  margin-top: 50px;
  cursor: pointer;
  img {
    width: 18px;
    height: 18px;
  }
  background-color: white;
  :hover {
    background-color: hsl(210, 8%, 97.5%);
  }
  :active {
    background-color: hsl(210, 8%, 95%);
  }
`;

/**
 * 컴포넌트 코드 부분
 */

// 회원 정보 타입
export interface userInfoType {
  accessToken: string | null | undefined;
  createdAt: Date | undefined;
  email: string;
  gender: string | null;
  id: number;
  initDate: number;
  location: string | null;
  modifiedAt: Date;
  name: string;
  payAmount: number | null;
  payDay: number | null;
  picture: string;
  role: string;
  state: string;
  totalBudget: number;
}
//  ToDo 저장된 액세스 토큰이 존재할 경우, 사용자의 현재 상태에 따라 유저/카테고리/예산 설정 페이지 중 하나로 이동
//  ToDo 저장된 액세스 토큰이 존재하며, 회원가입 절차도 모두 마친 경우 홈 페이지로 이동
function Login() {
  const [accessToken, setAccessToken] = useRecoilState(tokenState);

  // 사용자 정보 임시 저장
  const [userInfo, setUserInfo] = useRecoilState(userInfoState);

  // 로그인 후 사용자가 이동해야 할 페이지 저장
  const [currentPage, setCurrentPage] = useRecoilState(currentPageState);

  // '/login' 경로로 바로 접속할 경우 recoil-persist가 동작하지 않는 버그가 있어,
  // 해당 키가 로컬스토리지에 없다면 수동으로 생성
  if (localStorage.getItem('recoil-persist') === null) {
    localStorage.setItem(
      'recoil-persist',
      JSON.stringify({
        tokenState: null,
        currentPageState: 'usersetting',
        userInfoState: null,
      })
    );
  }

  // 로그인 로직
  useEffect(() => {
    // 사용자 요청 후 응답 온 정보를 userInfo에 저장
    const getUserInfo = async () => {
      try {
        const fetchedUserInfo = (
          await axios.get(
            `${import.meta.env.VITE_SERVER}/login?accessToken=${accessToken}`
          )
        ).data;

        // 사용자 정보 저장 시 날짜 형식 데이터들은 모두 Date로 형변환 후 저장
        setUserInfo({
          ...fetchedUserInfo,
          createdAt: new Date(fetchedUserInfo.createdAt),
          modifiedAt: new Date(fetchedUserInfo.modifiedAt),
          payDay:
            fetchedUserInfo.payDay === null
              ? null
              : new Date(fetchedUserInfo.payDay),
          initDate:
            fetchedUserInfo.initDate === 1
              ? 1
              : new Date(fetchedUserInfo.initDate),
        });
      } catch (err: any) {
        console.log(err);
        // 토큰이 만료된 경우 저장된 토큰을 지우고, 다시 로그인
        if (err.response.status === 401 || err.response.status === 500) {
          setAccessToken(null);
          window.location.href =
            'https://accounts.google.com/o/oauth2/auth?' +
            `client_id=${import.meta.env.VITE_GCLIENT_ID}&` +
            `redirect_uri=${import.meta.env.VITE_CLIENT}/login&` +
            'response_type=token&' +
            'scope=https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/userinfo.profile';
        }
      }
    };

    if (accessToken !== null) {
      // 토큰이 유효할 때만 사용자 정보 요청
      getUserInfo();
    } else {
      // 토큰이 유효하지 않으면 URL에 발행된 토큰이 위치할 부분만 잘라냄
      const parsedHash = new URLSearchParams(window.location.hash.substring(1));

      // 잘라낸 부분이 access_token 값이 맞다면 뽑아내서 저장
      setAccessToken(parsedHash.get('access_token'));
    }

    // 액세스 토큰의 값이 변경될 때마다 useEffect 구문 재실행
  }, [accessToken]);

  // 페이지 이동 로직
  useEffect(() => {
    // 사용자 정보에 payday(급여일), initDate(예산 시작일) 중 하나라도 설정되지 않았다면
    // 회원정보 설정 페이지로 이동
    if (userInfo?.payDay === null || userInfo?.initDate === 1) {
      window.location.href = `${import.meta.env.VITE_CLIENT}/${currentPage}`;
    }
  }, [userInfo]);

  // 저장된 토큰이 없거나 만료되었다면 페이지 이동이 되지 않기 때문에 로그인 버튼 클릭 가능
  const handleOAuthLogin = () => {
    window.location.href =
      'https://accounts.google.com/o/oauth2/auth?' +
      `client_id=${import.meta.env.VITE_GCLIENT_ID}&` +
      `redirect_uri=${import.meta.env.VITE_CLIENT}/login&` +
      'response_type=token&' +
      'scope=https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/userinfo.profile';
  };

  return (
    <LoginContainer className="login-container">
      <LogoWrap>
        <img src="tikkle-logo.svg" alt="logo" />
        <span>편리한 예산별 지출 관리 서비스, 티클✨</span>
      </LogoWrap>
      <OauthLoginButton onClick={handleOAuthLogin}>
        <img src="g-logo.png" alt="googlelogin" />
        <span>Log in with Google</span>
      </OauthLoginButton>
    </LoginContainer>
  );
}

export default Login;
