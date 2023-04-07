import { useState } from 'react';
import { createPortal } from 'react-dom';
import { HrefModal } from '../components/layout/HrefModal';
export function useHrefModal(
  infoMessage: string,
  buttonLabel: string,
  targetPage: string
) {
  const [showModal, setShowModal] = useState(false);

  const onOpen = () => {
    console.log(true);
    setShowModal(true);
  };

  const onClose = () => setShowModal(false);

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
