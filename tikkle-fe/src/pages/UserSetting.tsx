//TODO SIGNUP_002 유저 정보 입력 페이지 구현 (사용자 이름, 예산 시작일, 급여일, 고정 지출 등)
import { useEffect, useState } from 'react';
import { userInfoType } from '../pages/Login';
import UserInput from '../components/UserInput';

import styled from 'styled-components';
import {
  Box,
  Input,
  InputGroup,
  InputLeftElement,
  Select,
} from '@chakra-ui/react';

import { Button } from '@chakra-ui/react';
import { Icon, AddIcon } from '@chakra-ui/icons';
import { BsFillPersonFill } from 'react-icons/bs';
import { useNavigate } from 'react-router-dom';
import { useRecoilState, useRecoilValue } from 'recoil';
import { userInfoState } from '../util/store';
import axios from 'axios';
import { useHrefModal } from '../hooks/useHrefModal';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  font-family: 'GmarketSansMedium';
  font-size: 20px;
  font-weight: bold;
  .title-container {
    text-align: left;
    margin-top: 10vh;
    margin-bottom: 10vh;
    background-color: #dec8f5;
  }
  .usersetting-title {
    margin-left: 5vh;
    text-align: left;
    font-weight: bold;
    font-size: 2rem;
  }
  .direction_day {
    margin-left: 10vw;
    color: #9240e9;
    font-size: medium;
    text-align: left;
    margin-bottom: 4em;
  }

  .direction_info {
    color: #757575;
    text-align: left;
    font-size: medium;
    margin-bottom: 10em;
    margin-top: -5em;
  }
  input {
    width: auto;
    margin-bottom: 8em;
  }
`;

const SetContainer = styled.div`
  display: flex;
  button {
    width: 200px;
    margin-bottom: 60px;
    position: relative;
    top: -80px;
  }

  .valid {
    color: #4949ff;
    font-size: medium;
  }

  .invalid {
    color: #f84c4c;
    font-size: medium;
  }
`;

// TODO 금액 입력 시 콤마 찍혀서 input에 출력
function UserSetting() {
  const navigate = useNavigate();

  // userInfo Recoil atom으로 가져오기
  const [userInfo, setUserInfo] = useRecoilState(userInfoState);

  // axios PATCH 요청 parameter에 넣을 member_id
  const memberId = userInfo?.id;

  // 모달 커스텀 훅 사용
  const modalPage = useHrefModal(
    '회원정보를 저장했습니다. 이어서 카테고리를 설정해주세요.',
    '카테고리 설정으로 이동',
    'categoryedit'
  );

  // 계좌 연결하기 안내메세지 및 금결원 페이지로 이동
  const modalBank = useHrefModal(
    '아직 상용화되지 않은 기능이나, 더미데이터를 통해 서비스 기능 체험이 가능합니다. 가상의 계좌로 연결하시겠습니까?',
    '계좌 연결하기',
    `https://testapi.openbanking.or.kr/oauth/2.0/authorize?response_type=code` +
      `&client_id=${import.meta.env.VITE_K_CLIENT_ID}` +
      `&redirect_uri=${import.meta.env.VITE_CLIENT}/usersetting` +
      `&scope=login inquiry transfer&state=12345678123456781234567812345678&auth_type=0`
  );

  // 회원탈퇴 버튼 클릭 핸들러
  const handleClick = () => {
    navigate('/userout');
  };
  //* 유효성 검사용 상태 (value, message, isValid)

  // 이름
  const [nameMessage, setNameMessage] = useState('');
  const [isNameValid, setIsNameValid] = useState(false);
  // 성별
  const [genderMessage, setGenderMessage] = useState('');
  const [isGenderValid, setIsGenderValid] = useState(false);
  // 예산 시작일
  const [initDateMessage, setInitDateMessage] = useState('');
  const [isInitDateValid, setIsinitDateValid] = useState(false);
  // 예산 금액
  const [totalBudgetMessage, setTotalBudgetMessage] = useState('');
  const [isTotalBudgetValid, setIsTotalBudgetValid] = useState(false);
  // 급여일
  const [payDayMessage, setPayDayMessage] = useState('');
  const [isPayDayValid, setIsPayDayValid] = useState(false);
  // 급여 금액
  const [payAmountMessage, setPayAmountMessage] = useState('');
  const [isPayAmountValid, setIsPayAmountValid] = useState(false);

  // 이름 수정 및 유효성 검사
  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const name = event.target.value;
    setUserInfo({
      ...userInfo,
      name,
    });
    if (name.length < 12 && name.length >= 2) {
      setIsNameValid(true);
      setNameMessage('올바른 이름 형식입니다.');
    } else {
      setIsNameValid(false);
      setNameMessage('2글자 이상 12글자 미만으로 입력해주세요.');
    }
  };

  // 성별 수정 및 유효성 검사
  const handleGenderChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const gender = event.target.value;
    setUserInfo({ ...userInfo, gender });
    if (gender !== '') {
      setIsGenderValid(true);
      setGenderMessage('');
    } else {
      setIsGenderValid(false);
      setGenderMessage('성별을 선택해주세요.');
    }
  };

  // 저장하기 버튼 클릭 핸들러 (axios PATCH 요청)
  // 첫 가입 사용자는 userInfo.payDay 값이 null이므로 첫 사용자 여부를 이걸로 판별
  // 카테고리 생성을 위해서 첫 가입 사용자인 경우 /{member-id}/init에 patch 요청
  const handleSubmit = async () => {
    if (
      (await (
        await axios.get(`${import.meta.env.VITE_SERVER}/categories/${memberId}`)
      ).data.data.length) === 0
    ) {
      await axios
        .patch(
          `${import.meta.env.VITE_SERVER}/members/${memberId}/init`,
          userInfo
        )
        .then((res) => {
          alert('저장되었습니다.');
          navigate('/userinfo');
        })
        .catch((err) => console.log(err));
    } else {
      await axios
        .patch(`${import.meta.env.VITE_SERVER}/members/${memberId}`, userInfo)
        .then((res) => {
          alert('저장되었습니다.');
          navigate('/userinfo');
        })
        .catch((err) => console.log(err));
    }
  };

  // // 계좌연결 버튼 핸들러
  // const handleConnectOpenbanking = () => {
  //   window.location.href =
  //     `https://testapi.openbanking.or.kr/oauth/2.0/authorize?response_type=code` +
  //     `&client_id=${import.meta.env.VITE_K_CLIENT_ID}` +
  //     `&redirect_uri=${import.meta.env.VITE_CLIENT}/usersetting` +
  //     `&scope=login inquiry transfer&state=12345678123456781234567812345678&auth_type=0`;
  // };

  useEffect(() => {
    const parsedHash = new URLSearchParams(window.location.search.substring(1));
    const bankingCode = parsedHash.get('code');
    if (bankingCode) {
      axios.post(
        `${
          import.meta.env.VITE_SERVER
        }/members/auth/${memberId}?code=${bankingCode}`
      );
    }
  }, []);

  return (
    <Container>
      <div className="title-container">
        <span className="usersetting-title">회원 정보 설정</span>
      </div>
      <SetContainer>
        <Box display="flex" flexDir="column" ml="10vw">
          <Box display="flex" mb="1vh">
            <p>사용자 정보</p>
          </Box>

          <InputGroup className="input-username">
            <InputLeftElement
              pointerEvents="none"
              children={<Icon as={BsFillPersonFill} color="gray.700" />}
            />

            <Input
              defaultValue={userInfo?.name}
              type="text"
              size="md"
              focusBorderColor="purple.400"
              placeholder="ex) 홍길동"
              onChange={handleNameChange}
            ></Input>
            <p className={isNameValid ? 'valid' : 'invalid'}>{nameMessage}</p>

            <Select
              focusBorderColor="purple.400"
              className="select-usergender"
              placeholder="성별을 선택하세요"
              ml="1em"
              defaultValue={userInfo?.gender}
              onChange={handleGenderChange}
            >
              <option value="female">여성</option>
              <option value="male">남성</option>
            </Select>
          </InputGroup>
          <p className={isGenderValid ? 'valid' : 'invalid'}>{genderMessage}</p>

          <Button
            colorScheme="purple"
            size="md"
            leftIcon={<AddIcon />}
            loadingText="연결 중"
            onClick={modalBank.onOpen}
          >
            계좌 연결하기
          </Button>
          <p className="direction_info">
            금융결제원 오픈뱅킹 서비스를 이용합니다. <br /> 개인정보는 안전하게
            관리되며, 계좌번호는 임시로 입력하셔도 서비스 기능 체험이
            가능합니다.
          </p>
        </Box>
      </SetContainer>
      <p className="direction_day">
        매달 예산 시작일을 기준으로 한 달간의 예산을 관리하게됩니다.
        <br /> 예산 시작일과 급여일은 캘린더에 표시됩니다.
      </p>
      <UserInput
        label={'예산 시작일'}
        initDateMessage={initDateMessage}
        setInitDateMessage={setInitDateMessage}
        isInitDateValid={isInitDateValid}
        setIsinitDateValid={setIsinitDateValid}
        totalBudgetMessage={totalBudgetMessage}
        setTotalBudgetMessage={setTotalBudgetMessage}
        isTotalBudgetValid={isTotalBudgetValid}
        setIsTotalBudgetValid={setIsTotalBudgetValid}
        payDayMessage={payDayMessage}
        setPayDayMessage={setPayDayMessage}
        isPayDayValid={isPayDayValid}
        setIsPayDayValid={setIsPayDayValid}
        payAmountMessage={payAmountMessage}
        setPayAmountMessage={setPayAmountMessage}
        isPayAmountValid={isPayAmountValid}
        setIsPayAmountValid={setIsPayAmountValid}
      />
      <UserInput
        label={'급여일'}
        initDateMessage={initDateMessage}
        setInitDateMessage={setInitDateMessage}
        isInitDateValid={isInitDateValid}
        setIsinitDateValid={setIsinitDateValid}
        totalBudgetMessage={totalBudgetMessage}
        setTotalBudgetMessage={setTotalBudgetMessage}
        isTotalBudgetValid={isTotalBudgetValid}
        setIsTotalBudgetValid={setIsTotalBudgetValid}
        payDayMessage={payDayMessage}
        setPayDayMessage={setPayDayMessage}
        isPayDayValid={isPayDayValid}
        setIsPayDayValid={setIsPayDayValid}
        payAmountMessage={payAmountMessage}
        setPayAmountMessage={setPayAmountMessage}
        isPayAmountValid={isPayAmountValid}
        setIsPayAmountValid={setIsPayAmountValid}
      />
      <Box mb="100px">
        <Button colorScheme="red" size="md" onClick={handleClick}>
          회원 탈퇴하기
        </Button>
        <Button
          colorScheme="purple"
          size="md"
          ml="40px"
          onClick={() => {
            handleSubmit();
            modalPage.onOpen();
          }}
          disabled={
            isNameValid &&
            isGenderValid &&
            isInitDateValid &&
            isTotalBudgetValid &&
            isPayDayValid &&
            isPayAmountValid
              ? false
              : true
          }
        >
          저장하기
        </Button>
      </Box>
      <modalPage.ModalWrapper />
      <modalBank.ModalWrapper />
    </Container>
  );
}

export default UserSetting;
