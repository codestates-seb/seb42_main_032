//TODO LOGIN_001 Google OAuth 로그인 페이지 구현
import React, { useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { useLocation } from 'react-router-dom';

const LoginContainer = styled.div`
  background-image: url('/tikkle-background.jpg');
  position: relative;
  background-color: transparent;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  font-family: 'GmarketSansMedium';
  height: 100vh;
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

function Login() {
  // Login 페이지가 렌더링될 때 주소창에 access_token이 있는 상태라면 해당 정보로 서버에 사용자 정보 요청
  const parsedHash = new URLSearchParams(window.location.hash.substring(1));
  const accessToken = parsedHash.get('access_token');
  accessToken !== null
    ? axios
        .get(`http://localhost:8080/login?accessToken=${accessToken}`)
        .then((res) => {
          console.log(typeof res);
          console.log(res);
        })
        .catch((err) => console.log(err))
    : '';

  const handleOAuthLogin = () => {
    window.location.href =
      'https://accounts.google.com/o/oauth2/auth?' +
      'client_id=338499705230-mkcb14qnk7piqv7jlor03nbkmp29iog1.apps.googleusercontent.com&' +
      'redirect_uri=http://localhost:5173/login&' +
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
