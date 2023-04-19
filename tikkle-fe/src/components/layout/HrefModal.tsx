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
  font-family: GmarketSansMedium;
  display: flex;
  flex-direction: column;

  .modal-info-message {
    height: 15vh;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .modal-button-box {
    display: flex;
    justify-content: space-between;
  }
  button {
    padding: 0.5rem;
    border-radius: 5px;
  }
  .modal-close-button {
    background-color: #e2e8f0;
    color: black;
  }
  .modal-close-button:hover {
    background-color: #d5d9dd;
  }
  .modal-href-button {
    background-color: #805ad5;
    color: white;
  }
  .modal-href-button:hover {
    background-color: #6a49b1;
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

  // 멤버 카테고리 생성 함수
  const createMemberCategory = () => {
    axios
      .patch(
        `${import.meta.env.VITE_SERVER}/members/${userInfo?.id}/init`,
        userInfo
      )
      .catch((err) => console.log(err));
  };

  const handleMemberState = () => {
    // 이동할 페이지에 따라 사용자 상태도 변경
    let nextState = '';
    switch (targetPage) {
      case 'categoryedit':
        // 상태가 'usersetting'일 때 categoryedit으로 이동하는 시나리오는 최초 상태를 의미
        // 따라서 멤버 카테고리 생성
        if (userInfo?.state === 'usersetting') createMemberCategory();
        nextState = 'categoryEdit';
      case 'budgetsetting':
        nextState = 'budgetSetting';
      case 'home':
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
    <ModalContainer>
      <ModalContent>
        <div className="modal-info-message">{infoMessage}</div>
        <div className="modal-button-box">
          <button className="modal-close-button" onClick={onClose}>
            닫기
          </button>
          <button
            className="modal-href-button"
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
