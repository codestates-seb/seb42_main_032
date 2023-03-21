// TODO 거래 내역 클릭 시, 상세 정보 나오는 모달창

// axios.get 데이터 받아오기 or Transaction에서 받아서 props로 넘겨 받기

import styled from 'styled-components';

const ModalContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(188, 188, 188, 0.1);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ModalContent = styled.div`
  background-color: white;
  padding: 20px;
  border-radius: 5px;
`;

function Modal() {
  return (
    <ModalContainer>
      <ModalContent>모달창!!</ModalContent>
    </ModalContainer>
  );
}

export default Modal;
