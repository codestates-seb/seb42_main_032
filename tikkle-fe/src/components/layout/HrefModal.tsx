import axios from 'axios';
import { useRecoilState } from 'recoil';
import styled from 'styled-components';
import { userInfoState } from '../../util/store';

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
  const [userInfo, setUserInfo] = useRecoilState(userInfoState);

  const handleMemberState = () => {
    let nextState = '';

    switch (targetPage) {
      case 'usersetting':
        nextState = 'categoryEdit';
      case 'categoryedit':
        nextState = 'budgetSetting';
      case 'budgetsetting':
        nextState = 'active';
      default:
        break;
    }

    // 변경된 state로 새 사용자 객체 생성
    const newUserInfo = {
      ...userInfo,
      state: nextState,
    };

    // 변경된 state로 사용자 상태 업데이트
    setUserInfo(newUserInfo);

    // 변경된 내용을 서버에도 반영
    axios.patch(
      `${import.meta.env.VITE_SERVER}/members/${userInfo?.id}`,
      newUserInfo
    );
  };
  return (
    <ModalContainer onClick={onClose}>
      <ModalContent onClick={(e) => e.stopPropagation()}>
        <div className="modal-info-message">{infoMessage}</div>
        <div className="modal-button-box">
          <button onClick={onClose}>닫기</button>
          <button
            onClick={() => {
              handleMemberState();
              window.location.href = targetPage;
            }}
          >
            {buttonLabel}
          </button>
        </div>
      </ModalContent>
    </ModalContainer>
  );
}
