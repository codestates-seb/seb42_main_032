// TODO 거래 내역 추가하기 버튼 클릭 시, input들이 뜨는 모달창

import styled from 'styled-components';
import { Button, Input, Select } from '@chakra-ui/react';
import { useState } from 'react';
import axios from 'axios';

const ModalContainer = styled.div`
  display: flex;
  flex-direction: column;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(188, 188, 188, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ModalContent = styled.div`
  width: 50vw;
  background-color: white;
  padding: 20px;
  border-radius: 5px;
  .notice_p {
    color: #f83d3d;
    font-size: smaller;
  }
`;

interface NewTransactionType {
  amount: number;
  branchName: string;
  date: Date;
  inoutType: string;
  memberCategoryId: number;
  memo: string;
  bankName: string;
  time: string;
}

const Modal = ({ togglePostModal }: { togglePostModal: () => void }) => {
  // 유저가 입력한 정보 상태 관리
  const [transaction, setTransaction] = useState<NewTransactionType>({
    amount: 0,
    branchName: '',
    date: new Date(),
    inoutType: '',
    memberCategoryId: 0,
    memo: '',
    bankName: '',
    time: '',
  });

  // 유저가 입력한 거래내역 POST 요청하기
  const submitHandler = () => {
    const postTransaction = async () => {
      axios
        .post(
          `${import.meta.env.VITE_SERVER}/transaction_histories`,
          transaction
        )
        .then((res) => console.log(res))
        .then((res) => alert('저장되었습니다.'))
        .catch((err) => console.log(err));
    };
    postTransaction();
  };

  // input 핸들러 함수들 작성 (순서대로 inoutType, amount, branchName, bankName, date, memberCategoryId, memo)
  //TODO 이벤트 타입 지정
  const inoutTypeHandler = (e) => {
    setTransaction({ ...transaction, inoutType: e.target.value });
  };

  const amounteHandler = (e) => {
    setTransaction({ ...transaction, amount: e.target.value });
  };

  const branchNameHandler = (e) => {
    setTransaction({ ...transaction, branchName: e.target.value });
  };

  const bankNameHandler = (e) => {
    setTransaction({ ...transaction, bankName: e.target.value });
  };

  const dateHandler = (e) => {
    setTransaction({ ...transaction, date: e.target.value });
  };

  const memberCategoryIdHandler = (e) => {
    setTransaction({ ...transaction, memberCategoryId: e.target.value });
  };

  const memoHandler = (e) => {
    setTransaction({ ...transaction, memo: e.target.value });
  };
  return (
    <ModalContainer onClick={togglePostModal}>
      <ModalContent onClick={(e) => e.stopPropagation()}>
        <h1>거래 내역 추가</h1>
        <form>
          <Select onChange={inoutTypeHandler}>
            <option value="지출">출금</option>
            <option value="수입">입금</option>
          </Select>
          <Input
            type="number"
            placeholder="금액을 입력하세요."
            colorScheme="purple"
            onChange={amounteHandler}
          ></Input>
          <Input
            type="text"
            placeholder="사용처를 입력하세요. ex) 택시"
            colorScheme="purple"
            onChange={branchNameHandler}
          ></Input>
          <Input
            type="text"
            placeholder="은행명을 입력하세요. ex) 토스뱅크"
            colorScheme="purple"
            onChange={bankNameHandler}
          ></Input>
          <Input
            type="date"
            placeholder="거래 날짜를 입력하세요."
            colorScheme="purple"
            onChange={dateHandler}
          ></Input>
          <Select onChange={memberCategoryIdHandler}>
            //TODO 카테고리 map
            <option value="1">카테고리 1</option>
            <option value="2">카테고리 2</option>
            <option value="3">카테고리 3</option>
          </Select>
          <Input
            type="text"
            placeholder="메모를 입력하세요."
            colorScheme="purple"
            onChange={memoHandler}
          ></Input>
        </form>
        <p className="notice_p">
          거래 금액, 사용처, 입금/출금 여부 및 카테고리는 필수 입력 항목입니다.
        </p>
        <Button
          colorScheme="purple"
          onClick={submitHandler}
          disabled={
            transaction.amount !== 0 &&
            transaction.branchName !== '' &&
            transaction.inoutType !== '' &&
            transaction.memberCategoryId !== 0
              ? false
              : true
          }
        >
          저장하기
        </Button>
      </ModalContent>
    </ModalContainer>
  );
};

export default Modal;
