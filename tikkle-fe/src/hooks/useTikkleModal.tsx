import styled from 'styled-components';
import { ReactNode, useCallback, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createRoot, Root } from 'react-dom/client';

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

// 모달 형태를 작성한 코드
function Modal({
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
  const navigate = useNavigate();
  return (
    <ModalContainer onClick={onClose}>
      <ModalContent onClick={(e) => e.stopPropagation()}>
        <div className="modal-info-message">{infoMessage}</div>
        <div className="modal-button-box">
          <button onClick={onClose}>닫기</button>
          <button onClick={() => navigate(targetPage)}>{buttonLabel}</button>
        </div>
      </ModalContent>
    </ModalContainer>
  );
}

export function useTikkeModal() {
  // 런타임에 생성된 모달 컴포넌트를 저장
  // 없을 때는 null로 유지
  const [modalInstance, setModalInstance] = useState<Root | null>(null);

  const openModal = useCallback(
    (infoMessage: string, buttonLabel: string, targetPage: string) => {
      // DOM에서 모달 제거하는 핸들러
      const onClose = () => {
        // 모달이 존재할 때만 제거
        if (modalInstance) {
          modalInstance.unmount();
          setModalInstance(null);
        }
      };

      // 모달 영역을 표시할 영역 지정
      // 해당 영역은 index.html에 추가되어 있음
      const modalRoot = createRoot(
        document.querySelector('#modal') as HTMLElement
      );

      // 모달 컴포넌트를 openModal 메서드가 호출됐을 때 생성
      const modalComponent = (
        <Modal
          infoMessage={infoMessage}
          buttonLabel={buttonLabel}
          targetPage={targetPage}
          onClose={onClose}
        />
      );

      // 생성된 모달 컴포넌트를 모달 영역에 렌더링
      modalRoot.render(modalComponent);

      // 닫기 기능을 위해 생성된 모달을 저장
      setModalInstance(modalRoot);
    },
    []
  );
  const closeModal = useCallback(() => {
    // 모달이 존재할 때만 제거
    if (modalInstance) {
      modalInstance.unmount();
      setModalInstance(null);
    }
  }, [modalInstance]);

  return { openModal, closeModal };
}
