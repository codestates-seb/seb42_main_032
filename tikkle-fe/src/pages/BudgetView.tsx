//TODO BUDGET_002 예산 조회 화면 구현
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Progress } from '@chakra-ui/react';
import { MdFastfood } from 'react-icons/md';
import { BiCoffeeTogo, BiWon } from 'react-icons/bi';
import { FiPercent } from 'react-icons/fi';
import { IoLogoGameControllerA } from 'react-icons/io';
import axios from 'axios';
import { useRecoilValue } from 'recoil';
import { userInfoState } from '../util/store';

const BodyContainer = styled.div`
  margin-top: 60px;
  display: flex;
  @media (max-width: 1024px) {
    flex-direction: column;
  }
  font-family: 'GmarketSansMedium';
`;

const BudgetWrap = styled.div`
  position: sticky;
  top: 100px;
  @media (max-width: 1024px) {
    position: static;
    top: 0;
  }
  height: 400px;
  display: flex;
  flex-direction: column;
  gap: 20px;
  margin: 20px;
  min-width: 350px;
  h3 {
    text-align: left;
    font-size: 25px;
  }
  .budgetview-edit__span {
    cursor: pointer;
  }
  .budgetview-total__div {
    display: flex;
    justify-content: space-between;
  }
  .budgetview-day__div {
    text-align: left;
  }
  .budgetview-free__span {
    font-size: 20px;
    font-weight: bold;
  }
`;
const CategoryBudgetWrap = styled.div`
  padding: 40px;
  width: 100%;
  border-left: 1px solid gray;
  min-height: 100vh;
  @media (max-width: 1024px) {
    border: none;
  }
  padding-left: 30px;
  h3 {
    text-align: left;
    font-size: 25px;
  }
  .budgetview-category-contents__div {
    display: flex;
    .budgetview-viewchange__div {
      margin: 20px;
    }
  }
`;

const CategoryBudgetLists = styled.div`
  flex-grow: 1;
  .budgetview-categorylist__div {
    display: flex;
    align-items: center;
    gap: 10px;
    margin-top: 30px;
    margin-bottom: 30px;
  }
  .budgetview-categorycontent__div {
    flex-grow: 1;
  }
  .budgetview-categoryname__div {
    text-align: left;
    font-size: 20px;
  }
  .budgetview-category__icon {
  }
`;
const ViewChangeStickyContainer = styled.div`
  position: sticky;
  top: 137px;
  height: 100%;
`;
const ViewChangeButtonWrap = styled.div`
  display: flex;
  height: 123px;
  position: relative;
  flex-direction: column;
  margin-left: 20px;
  gap: 15px;
  padding: 1px;
  background-color: #d6bcfa;
  border: 3px solid #d6bcfa;
  border-top-left-radius: 45px;
  border-top-right-radius: 45px;
  border-bottom-left-radius: 45px;
  border-bottom-right-radius: 45px;
  cursor: pointer;
  .budgetview-change__button {
    padding: 10px;
    color: #6b46c1;
    transition: all 0.5s;
    z-index: 2;
  }
  .budgetview-change__button.selected {
    transition: all 0.5s;
    color: white;
  }
  .toggle {
    z-index: 1;
    position: absolute;
    border: 5px solid #6b46c1;
    background-color: #6b46c1;
    border-radius: 100%;
    width: 50px;
    height: 50px;
    top: 1px;
    transition: all 0.5s;
  }
  .toggle.selected {
    position: absolute;
    top: 66px;
    color: white;
    padding: 10px;
    border-radius: 100%;
    transition: all 0.5s;
    background-color: #6b46c1;
  }
`;

// 카테고리 아이콘
const categoryIcons: Record<string, any> = {
  식비: MdFastfood,
  음료: BiCoffeeTogo,
  오락: IoLogoGameControllerA,
};

const CategoryIconWrapper = styled.div<{ category: string }>`
  max-width: fit-content;
  padding: 10px;
  border-radius: 100%;
  color: white;
  font-size: 20px;
  background-color: ${(props) => {
    switch (props.category) {
      case '식비':
        return '#FFC107'; // yellow
      case '음료':
        return '#4CAF50'; // green
      case '오락':
        return '#9C27B0'; // purple
      default:
        return 'inherit';
    }
  }};
`;

const testArr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14];

function BudgetView() {
  const [unit, setUnit] = useState<boolean>(false);
  const handleUnitButton = () => {
    setUnit(!unit);
  };
  const [totalBudget, setTotalBudget] = useState(0);
  const userInfo = useRecoilValue(userInfoState);
  const getTotalBudget = async () => {
    const userTotalBudget =
      userInfo &&
      (await axios.get(`${import.meta.env.VITE_SERVER}/members/${userInfo.id}`))
        .data.data.total_budget;
    return userTotalBudget;
  };

  useEffect(() => {
    getTotalBudget().then((res) => {
      setTotalBudget(res);
    });
  });

  getTotalBudget();
  return (
    <BodyContainer>
      <BudgetWrap>
        <h3>한 달 총 예산</h3>
        <div className="budgetview-total__div">
          <span className="budgetview-free__span">500,000원 남음</span>
          <span className="budgetview-edit__span">수정하기</span>
        </div>
        <div className="budgetview-day__div">총 하루 예산 20,000원</div>
        <div>
          <Progress
            value={30}
            size="lg"
            colorScheme="purple"
            borderRadius={10}
          />
          <span>30%</span>
        </div>
        <div className="budgetview-total__div">
          <span>● 예산</span>
          <span>{`${totalBudget} 원`}</span>
        </div>
        <div className="budgetview-total__div">
          <span>○ 오늘까지 지출 총액</span>
          <span>150,000원</span>
        </div>
      </BudgetWrap>
      <CategoryBudgetWrap>
        <div>
          <h3>카테고리별 예산</h3>
        </div>
        <div className="budgetview-category-contents__div">
          <CategoryBudgetLists>
            {testArr.map(() => {
              return (
                <div className="budgetview-categorylist__div">
                  <CategoryIconWrapper category={'식비'}>
                    <MdFastfood size={30} />
                  </CategoryIconWrapper>
                  <div className="budgetview-categorycontent__div">
                    <div className="budgetview-categoryname__div">식비</div>
                    <div>
                      <Progress
                        value={30}
                        size="md"
                        colorScheme={'purple'}
                        borderRadius={10}
                      />
                      <span>
                        {unit ? '30,000원 / 100,000원' : '30% / 100%'}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </CategoryBudgetLists>
          <ViewChangeStickyContainer>
            <ViewChangeButtonWrap onClick={handleUnitButton}>
              <div
                className={
                  unit
                    ? 'budgetview-change__button'
                    : 'budgetview-change__button selected'
                }
              >
                <FiPercent size={30} />
              </div>
              <div
                className={
                  unit
                    ? 'budgetview-change__button selected'
                    : 'budgetview-change__button'
                }
              >
                <BiWon size={30} />
              </div>
              <div className={unit ? 'toggle selected' : 'toggle'}></div>
            </ViewChangeButtonWrap>
          </ViewChangeStickyContainer>
        </div>
      </CategoryBudgetWrap>
    </BodyContainer>
  );
}

export default BudgetView;
