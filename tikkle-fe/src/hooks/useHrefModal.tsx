import { useState } from 'react';
import { createPortal } from 'react-dom';
import { HrefModal } from '../components/layout/HrefModal';
export function useHrefModal(
  infoMessage: string,
  buttonLabel: string,
  targetPage: string
) {
  const [showModal, setShowModal] = useState(false);

  // 모달을 열고 닫는 핸들러
  const onOpen = () => setShowModal(true);
  const onClose = () => setShowModal(false);

  // 모달을 열기 위해 사용하는 코드 내에 넣어야 하는 컴포넌트
  const ModalWrapper = () => (
    <>
      {showModal &&
        createPortal(
          <HrefModal
            infoMessage={infoMessage}
            buttonLabel={buttonLabel}
            targetPage={targetPage}
            onClose={onClose}
          />,
          document.body
        )}
    </>
  );

  return { ModalWrapper, onOpen, onClose };
}
