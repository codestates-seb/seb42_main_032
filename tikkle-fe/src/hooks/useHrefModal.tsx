import { useState } from 'react';
import { createPortal } from 'react-dom';
import { useRecoilValue } from 'recoil';
import { HrefModal } from '../components/layout/HrefModal';
import { userInfoState } from '../util/store';
export function useHrefModal(
  infoMessage: string,
  buttonLabel: string,
  targetPage: string
) {
  const userInfo = useRecoilValue(userInfoState);
  const [showModal, setShowModal] = useState(false);

  // 모달을 열고 닫는 핸들러
  const onOpen = () => {
    // 사용자가 active 상태일 때는 모달을 열지 않도록 설정
    // TODO 사용자가 active가 아닐 때 (or bank account 연결이 되어있지 않을 때)
    setShowModal(true);
  };

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
