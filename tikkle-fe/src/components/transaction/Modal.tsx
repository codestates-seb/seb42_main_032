// TODO 거래 내역 클릭 시, 상세 정보 나오는 모달창

// axios.get 데이터 받아오기 or Transaction에서 받아서 props로 넘겨 받기
import Transaction, { TransactionType } from '../layout/Transaction';
import styled from 'styled-components';
import { Input } from '@chakra-ui/react';
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

  .memo-input {
    display: flex;
  }

  .modal-content-ul {
    padding: 10px;
    list-style: disc;
    list-style-position: inside;
  }

  .modal-content-ul li {
    margin-top: 10px;
  }
`;
interface ModalProps {
  transaction: TransactionType;
  onClose: () => void;
  toggleModal: () => void;
}

const Modal = ({ transaction, toggleModal }: ModalProps) => {
  // memo 입력 상태 관리
  const [memo, setMemo] = useState<string>(transaction.memo);

  console.log(transaction);

  // TODO 카테고리 드롭다운 수정 컴포넌트 만들기
  // TODO 카테고리 수정 시, TODO axios POST 요청으로 변경 사항 보내기
  return (
    <ModalContainer onClick={toggleModal}>
      <ModalContent onClick={(e) => e.stopPropagation()}>
        <p>
          <strong>거래내역 상세 조회</strong>
        </p>
        <ul className="modal-content-ul">
          <li>
            {transaction.inoutType === 'SPEND' ? '출금: -' : '입금: +'}
            {transaction.amount} 원
          </li>
          <li>
            거래처: {transaction.bankName} &#8594; {transaction.branchName}
          </li>
          <li> 거래 날짜: {transaction.date.toISOString()}</li>
          <li> 거래 시간: {transaction.time}</li>
          <li className="memo-input">
            메모:
            {/* // TODO memo 수정 시, axios POST 요청으로 변경 사항 보내기 */}
            <Input
              value={memo}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setMemo(e.target.value)
              }
            ></Input>
          </li>
          <li> 카테고리: </li>
        </ul>
      </ModalContent>
    </ModalContainer>
  );
};

export default Modal;
