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
import CategoryIcon, {
  CategoryIdMap,
} from '../components/category/CategoryIcon';
import { Link } from 'react-router-dom';

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

function BudgetView() {
  const userInfo = useRecoilValue(userInfoState);
  const [unit, setUnit] = useState<boolean>(false);
  const handleUnitButton = () => {
    setUnit(!unit);
  };
  const [totalBudget, setTotalBudget] = useState(0);
  const [budget, setBudget] = useState();
  const [budgetCategory, setBudgetCategory] = useState<
    {
      id: number;
      name: string;
      categoryId: number;
      amount: number;
      spend: number;
    }[]
  >();

  // 유저 총 예산 금액 get
  const getTotalBudget = async () => {
    const userTotalBudget =
      userInfo &&
      (await axios.get(`${import.meta.env.VITE_SERVER}/members/${userInfo.id}`))
        .data.data.totalBudget;
    setTotalBudget(userTotalBudget);
  };

  // budget 조회
  const getBudget = async () => {
    const memberBudget =
      userInfo &&
      (
        await axios.get(
          `${import.meta.env.VITE_SERVER}/budgets/members/${userInfo.id}`
        )
      ).data;

    const all =
      userInfo &&
      (await axios.get(
        `${import.meta.env.VITE_SERVER}/categories/${userInfo.id}`
      ));
    const budgetCategories = [];
    for (const i of memberBudget) {
      for (const j of all?.data.data) {
        if (i.memberCategoryId === j.id) {
          budgetCategories.push({ ...j, ...i });
          break;
        }
      }
    }
    setBudgetCategory(budgetCategories);
  };

  const initDate = new Date();
  userInfo && new Date(initDate.setDate(userInfo.initDate));

  const nextInitDate =
    initDate && new Date(initDate.setMonth(initDate.getMonth() + 1));

  const today = new Date();

  const dateDiff =
    nextInitDate &&
    (nextInitDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24);

  let totalSpend = 0;
  const getTotalSpend = () => {
    for (const el of budgetCategory!) {
      totalSpend = totalSpend + el.spend;
    }
  };

  // const getBudgetTrans;
  useEffect(() => {
    getTotalBudget();
    getBudget();
  }, []);

  return (
    <BodyContainer>
      <BudgetWrap>
        <h3>한 달 총 예산</h3>
        <div className="budgetview-total__div">
          <span className="budgetview-free__span">{`${(
            totalBudget - totalSpend
          ).toLocaleString('ko-KR')} 원 남음`}</span>
          <Link to="/budgetsetting">
            <span className="budgetview-edit__span">수정하기</span>
          </Link>
        </div>
        <div className="budgetview-day__div">{`총 하루 예산 ${(
          (totalBudget - totalSpend) /
          dateDiff!
        ).toLocaleString('ko-KR')} 원`}</div>
        <div>
          <Progress
            value={(totalSpend / totalBudget) * 100}
            size="lg"
            colorScheme={
              (totalSpend / totalBudget) * 100 < 90 ? 'purple' : 'red'
            }
            borderRadius={10}
          />
          <span>{`${(totalSpend / totalBudget) * 100}%`}</span>
        </div>
        <div className="budgetview-total__div">
          <span>● 예산</span>
          <span>{`${totalBudget.toLocaleString('ko-KR')} 원`}</span>
        </div>
        <div className="budgetview-total__div">
          <span>○ 오늘까지 지출 총액</span>
          <span>{`${totalSpend.toLocaleString('ko-KR')} 원`}</span>
        </div>
      </BudgetWrap>
      <CategoryBudgetWrap>
        <div>
          <h3>카테고리별 예산</h3>
        </div>
        <div className="budgetview-category-contents__div">
          <CategoryBudgetLists>
            {budgetCategory &&
              budgetCategory.map((el) => {
                return (
                  <div key={el.id} className="budgetview-categorylist__div">
                    <CategoryIcon icon={CategoryIdMap[el.categoryId]} />
                    <div className="budgetview-categorycontent__div">
                      <div className="budgetview-categoryname__div">
                        {el.name}
                      </div>
                      <div>
                        <Progress
                          value={
                            el.amount === 0 ? 0 : (el.spend / el.amount) * 100
                          }
                          size="md"
                          colorScheme={
                            (el.spend / el.amount) * 100 < 90 ? 'purple' : 'red'
                          }
                          borderRadius={10}
                        />
                        <span>
                          {unit
                            ? `${el.spend}원 / ${el.amount}원`
                            : `${
                                el.amount === 0
                                  ? '0'
                                  : (el.spend / el.amount) * 100
                              }% / 100%`}
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
