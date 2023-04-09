import { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';

/**
 * 스타일 코드 부분
 */

const Container = styled.div`
  overflow: hidden;
  font-family: 'GmarketSansMedium';
  h3 {
    font-size: 40px;
    text-align: left;
    padding: 20px;
    margin-top: 60px;
    background-color: #6b46c1;
    color: white;
    background: linear-gradient(to right, #6b46c1, white);
  }
`;

interface CarouselProps {
  current: number;
}

const CarouselContainer = styled.div<CarouselProps>`
  display: flex;
  margin-top: 60px;
  transform: translateX(-${(props) => props.current * 100}vw);
  width: 100%;
  transition: all 0.3s ease-out;
  .landing-carousel0__div {
    display: flex;
    justify-content: center;
    align-items: center;
    color: white;
    font-size: 50px;
    text-shadow: 3px 3px 5px black;
    flex: none;
    background-image: url('/tikkle-background.jpg');
    background-position: center;
    background-size: cover;
    background-repeat: no-repeat;
    width: 100vw;
    height: 60vh;
  }
  .landing-carousel1__div {
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 50px;
    color: white;
    text-shadow: 3px 3px 5px black;
    flex: none;
    background-image: url('/carousel1.png');
    background-position: center;
    background-size: cover;
    background-repeat: no-repeat;
    width: 100vw;
    height: 60vh;
  }
  .landing-carousel2__div {
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 50px;
    color: white;
    text-shadow: 3px 3px 5px black;
    flex: none;
    background-image: url('/carousel2.png');
    background-position: center;
    background-size: cover;
    background-repeat: no-repeat;
    width: 100vw;
    height: 60vh;
  }
`;

const GuideContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding: 20px;
  .landing-guide__div {
    @media (max-width: 1024px) {
      flex-direction: column;
      justify-content: end;
    }
    display: flex;
    align-items: center;
    justify-content: space-around;
    gap: 20px;
    font-size: 30px;
    height: 60vh;
    position: relative;
    img {
      width: 50rem;
      border-radius: 10px;
      box-shadow: 1px 1px 2px;
    }
  }
`;

/**
 * 컴포넌트 코드 부분
 */

function Landing() {
  // 캐러셀 인덱스 상태 관리
  const [currentIdx, setCurrentIdx] = useState(0);
  const savedCallback: { current: () => void } = useRef(() => {});

  const useInterval = (callback: () => void, delay: number) => {
    useEffect(() => {
      savedCallback.current = callback;
    }, [callback]);

    useEffect(() => {
      const tick = () => {
        savedCallback.current();
      };
      if (delay !== null) {
        let interval = setInterval(tick, delay);
        return () => clearInterval(interval);
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

  useInterval(changeCarousel, 5000);

  return (
    <Container>
      <CarouselContainer
        current={currentIdx}
        onClick={() => {
          window.location.href = `${import.meta.env.VITE_CLIENT}/login`;
        }}
      >
        <div className="landing-carousel0__div">
          편리한 예산별 지출 관리 서비스, 티클✨
        </div>
        <div className="landing-carousel1__div">
          예산관리? 이젠 카테고리별로 관리하세요!
        </div>
        <div className="landing-carousel2__div">
          카테고리별 예산설정 및 예산조회, 월별 / 일자별 소비내역 조회까지!
        </div>
      </CarouselContainer>
      <h3>Tikkle 서비스 소개</h3>
      <GuideContainer>
        <div className="landing-guide__div">
          <img src="./guide-usersetting.png" alt="guide usersetting"></img>
          <div>
            <p>
              회원정보 설정 페이지에서 계좌 연결 및 예산 시작일 및 예산 금액,
              급여일 및 급여액을 설정할 수 있습니다.
            </p>
          </div>
        </div>
        <div className="landing-guide__div">
          <div>
            <p>
              카테고리 수정 페이지에서 예산 설정할 카테고리를 선택할 수
              있습니다.
            </p>
          </div>
          <img src="./guide-category.png" alt="guide category edit"></img>
        </div>
        <div className="landing-guide__div">
          <img src="./guide-budgetsetting.png" alt="guide budget setting"></img>
          <div>
            <p>
              예산 설정 페이지에서 선택한 카테고리별로 예산 금액을 설정할 수
              있습니다.
            </p>
          </div>
        </div>
        <div className="landing-guide__div">
          <div>
            <p>
              예산 조회 페이지에서 총 예산 정보와 카테고리별 남은 예산 금액을
              퍼센트 또는 금액단위로 확인할 수 있습니다.
            </p>
          </div>
          <img src="./guide-budgetview.png" alt="guide budget view"></img>
        </div>
      </GuideContainer>
    </Container>
  );
}

export default Landing;
