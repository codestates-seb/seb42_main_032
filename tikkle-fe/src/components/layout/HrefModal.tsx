import styled from 'styled-components';

// 모달이 표시되는 화면의 배경 스타일
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

// 모달 영역의 스타일
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

export function HrefModal({
  infoMessage,
  buttonLabel,
  targetPage,
  onClose,
}: {
  infoMessage: string;
  buttonLabel: string;
  targetPage: string;
  onClose: () => void;
}) {
  return (
    <ModalContainer onClick={onClose}>
      <ModalContent onClick={(e) => e.stopPropagation()}>
        <div className="modal-info-message">{infoMessage}</div>
        <div className="modal-button-box">
          <button onClick={onClose}>닫기</button>
          <button onClick={() => (window.location.href = targetPage)}>
            {buttonLabel}
          </button>
        </div>
      </ModalContent>
    </ModalContainer>
  );
}
