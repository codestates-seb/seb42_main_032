//TODO LOGIN_001 Google OAuth 로그인 페이지 구현
import React from 'react';
import styled from 'styled-components';
import axios from 'axios';

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
  const handleOAuthLogin = () => {
    // window.location.href =
    //   'https://accounts.google.com/o/oauth2/auth?' +
    //   'client_id=338499705230-mkcb14qnk7piqv7jlor03nbkmp29iog1.apps.googleusercontent.com&' +
    //   'redirect_uri=http://localhost:5173/login&' +
    //   'response_type=token&' +
    //   'scope=https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/userinfo.profile';

    // TODO 백엔드로 access token 보내기
    // TODO 백엔드에서 유저 정보 받아오기
    const parsedHash = new URLSearchParams(window.location.hash.substring(1));
    console.log(parsedHash.get('access_token'));
    const accessToken = parsedHash.get('access_token');
    axios
      .post('http://localhost:8080/oauth/google', { accessToken })
      .then((res) => console.log(res));
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
