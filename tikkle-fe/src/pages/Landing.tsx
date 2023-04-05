import { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';

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

const Container = styled.div`
  overflow: hidden;
`;

interface CarouselProps {
  current: number;
}

const CarouselContainer = styled.div<CarouselProps>`
  display: flex;
  margin-top: 60px;
  transform: translateX(-${(props) => props.current * 100}%);
  width: 100%;
  transition: all 0.3s ease-out;
  .landing-carousel0__div {
    flex: none;
    background-image: url('/tikkle-background.jpg');
    background-position: center;
    background-size: contain;
    background-repeat: no-repeat;
    width: 100vw;
    height: 60vh;
  }
  .landing-carousel1__div {
    flex: none;
    background-image: url('/carousel1.png');
    background-position: center;
    background-size: contain;
    background-repeat: no-repeat;
    width: 100vw;
    height: 60vh;
  }
  .landing-carousel2__div {
    flex: none;
    background-image: url('/carousel2.png');
    background-position: center;
    background-size: contain;
    background-repeat: no-repeat;
    width: 100vw;
    height: 60vh;
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
  // 캐러셀 인덱스 상태 관리
  const [currentIdx, setCurrentIdx] = useState(0);

  const useInterval = (callback: () => void, delay: number) => {
    const savedCallback: { current: () => void } = useRef(() => {});
    useEffect(() => {
      savedCallback.current = callback;
    }, [callback]);

    useEffect(() => {
      const tick = () => {
        savedCallback.current();
      };
      if (delay !== null) {
        let id = setInterval(tick, delay);
        return () => clearInterval(id);
      }
    }, [delay]);
  };

  const changeCarousel = () => {
    if (currentIdx < 2) {
      setCurrentIdx(currentIdx + 1);
    } else {
      setCurrentIdx(0);
    }
  };

  useInterval(() => {
    changeCarousel();
  }, 5000);

  return (
    <Container>
      <CarouselContainer current={currentIdx}>
        <div className="landing-carousel0__div"></div>
        <div className="landing-carousel1__div"></div>
        <div className="landing-carousel2__div"></div>
      </CarouselContainer>
    </Container>
    // <LogoWrap>
    // <img src="tikkle-logo.svg" alt="logo" />
    // <span>편리한 예산별 지출 관리 서비스, 티클✨</span>
    // </LogoWrap>
  );
}

export default Landing;
