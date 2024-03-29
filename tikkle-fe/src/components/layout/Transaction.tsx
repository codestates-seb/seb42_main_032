// TODO 거래내역 박스
// TODO 무한 스크롤 구현하기

import { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { MdFastfood } from 'react-icons/md';
import { BiCoffeeTogo } from 'react-icons/bi';
import { IoLogoGameControllerA } from 'react-icons/io';
import Modal from '../transaction/Modal';
import axios from 'axios';
import { useRecoilState, useRecoilValue } from 'recoil';
import {
  clickedDateState,
  locationState,
  userInfoState,
} from '../../util/store';
import { Box, Button } from '@chakra-ui/react';
import PostModal from '../transaction/PostModal';
import CategoryIcon, { CategoryIdMap } from '../category/CategoryIcon';

// axios GET 요청으로 불러온 데이터 타입 정의
export interface TransactionType {
  date: Date;
  bankInfo: string;
  payee: string;
  category: string;
  amount: number;
  branchName: string;
  id: number;
  inoutType: string;
  memberCategoryId: number;
  memo: string;
  time: string;
  bankName: string;
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 5vw;

  button {
    margin-right: 95vw;
    margin-top: 5vh;
  }
`;

const TransactionContainer = styled.div`
  margin: 1vw;
  padding: 10px;
  border-radius: 10px;
  width: 70%;
  :hover {
    background-color: #ede1f0;
    cursor: pointer;
  }
  .transaction-date-box {
    text-align: left;
    margin-top: 10px;
    margin-bottom: 10px;
    color: grey;
  }
`;

const ContentContainer = styled.div`
  display: flex;
  .transaction-content-box {
    margin-left: 20px;
    text-align: left;
  }

  .transaction-content-box:hover {
    cursor: pointer;
  }
  .transaciton-bank-box {
    color: grey;
  }
`;

// 날짜+요일별 거래내역 박스
const Transaction = ({ date }: { date: Date }) => {
  // Modal에 띄울 transaction history 상태 관리
  const [selectedTransaction, setSelectedTransaction] =
    useState<TransactionType | null>({
      amount: 0,
      branchName: '',
      date: new Date(date),
      id: 0,
      inoutType: '',
      memberCategoryId: 0,
      memo: '',
      time: '',
      bankName: '',
      bankInfo: '',
      payee: '',
      category: '',
    });

  // 거래내역 상태 관리
  const [transactionHistories, setTransactionHistories] = useState<
    TransactionType[]
  >([
    {
      amount: 0,
      branchName: '',
      date: new Date(date),
      id: 0,
      inoutType: '',
      memberCategoryId: 0,
      memo: '',
      time: '',
      bankName: '',
      bankInfo: '',
      payee: '',
      category: '',
    },
  ]);

  // GET 요청 URI parameter 용 memberID, date (month) 받아오기
  let member_id = useRecoilValue(userInfoState)?.id;
  let headerMonth =
    date.getFullYear() + String(date.getMonth() + 1).padStart(2, '0');

  // 월별 거래내역 GET 요청
  //TODO API 거래내역 잘 받아오는지 확인하기
  useEffect(() => {
    const getTransactionHistories = async () => {
      axios
        .get(
          `${
            import.meta.env.VITE_SERVER
          }/transaction_histories/${member_id}/${headerMonth}`
        )
        .then((res) => {
          const data: TransactionType[] = res.data.transactionHistoriesResponse;
          console.log(data);
          setTransactionHistories(
            // new Date 처리를 하지 않으면, date 가 string 타입으로 들어감.
            data.map((transaction) => ({
              ...transaction,
              date: new Date(transaction.date),
            }))
          );
        })
        .catch((err) => console.log(err));
    };
    getTransactionHistories();
  }, [headerMonth]);

  // 거래내역 클릭 시 상세 정보 모달 띄우기
  const [showModal, setShowModal] = useState<boolean>(false);
  const toggleModal = () => {
    setShowModal(!showModal);
  };
  const daysOfWeek = ['일', '월', '화', '수', '목', '금', '토'];

  //TODO 무한스크롤
  const options = {
    root: null,
    rootMargin: '10px',
    threshold: 0.5,
  };

  const callback = () => {
    console.log('관측되었습니다.');
  };

  let target = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let observer = new IntersectionObserver(callback, options);
    if (target.current) {
      console.log(target.current);
      observer.observe(target.current);
      // observer.unobserve(target);
    }
    return () => observer && observer.disconnect();
  }, []);

  // 거래내역 추가 모달 관련 상태관리
  const [showPostModal, setShowPostModal] = useState<boolean>(false);
  // 거래내역 임의 추가 버튼 핸들러
  const togglePostModal = () => {
    setShowPostModal(!showPostModal);
    console.log(showPostModal);
  };

  // const [location, setLocation] = useRecoilState(locationState);
  // // [날짜, y좌표] 구하기 - location
  // const childElement = document.querySelector('.transaction-date-box');
  // if (childElement) {
  //   const location = [];
  //   location.push([transactionDate, childElement.getBoundingClientRect().y]);
  //   setLocation(location);
  // }

  // console.log(location);

  //TODO 아이콘 처리
  return (
    <Container className="transaction-history-box" ref={target}>
      <Box>
        <Button colorScheme="purple" onClick={togglePostModal} margin="10px">
          거래내역 추가하기
        </Button>
      </Box>

      {showPostModal && (
        <PostModal togglePostModal={togglePostModal} memberId={member_id} />
      )}
      {transactionHistories.length !== 0 &&
        transactionHistories.map((transaction, idx) => {
          const transactionDate = transaction.date.getDate();
          return (
            <TransactionContainer
              className="transaction_container"
              key={transaction.id}
              onClick={toggleModal}
            >
              <div>
                <div className="transaction-date-box">
                  {transactionDate}일 {daysOfWeek[transaction.date.getDay()]}
                  요일
                </div>
                <ContentContainer>
                  <CategoryIcon icon={String(transaction.memberCategoryId)} />
                  <div
                    className="transaction-content-box"
                    onClick={() => setSelectedTransaction(transaction)}
                  >
                    <div className="transaction-amount-box">
                      <strong>
                        {new Intl.NumberFormat('ko-KR').format(
                          transaction.amount
                        )}
                        원
                      </strong>
                    </div>
                    <div className="transaciton-bank-box">
                      {transaction.bankName} &#8594; {transaction.branchName}
                    </div>
                  </div>
                </ContentContainer>
              </div>
            </TransactionContainer>
          );
        })}
      {selectedTransaction && showModal && (
        <Modal
          transaction={selectedTransaction}
          onClose={() => setSelectedTransaction(null)}
          toggleModal={toggleModal}
        ></Modal>
      )}
    </Container>
  );
};

export default Transaction;
