import styled from 'styled-components';

/**
 * 스타일 코드 부분
 */
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

/**
 * 컴포넌트 코드 부분
 */

function Landing() {
  return (
    <LoginContainer className="login-container">
      <LogoWrap>
        <img src="tikkle-logo.svg" alt="logo" />
        <span>편리한 예산별 지출 관리 서비스, 티클✨</span>
      </LogoWrap>
    </LoginContainer>
  );
}

export default Landing;
