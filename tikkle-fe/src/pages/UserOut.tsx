//TODO DELETEACCOUNT_001 회원 탈퇴 페이지 구현
import styled from 'styled-components';
import { Box, Checkbox, CheckboxGroup, Input, Stack } from '@chakra-ui/react';
import { Button } from '@chakra-ui/react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
const Container = styled.div`
  background-color: #eaeaea;
  display: flex;
  flex-direction: column;
  font-family: 'GmarketSansMedium';
  font-size: 20px;
  font-weight: bold;
  .title-container {
    text-align: left;
    margin-top: 10vh;
    margin-bottom: 10vh;
    background-color: #faf5ff;
  }
  .usersetting-title {
    margin-left: 5vh;
    text-align: left;
    font-weight: bold;
    font-size: 2rem;
  }

  input {
    margin-bottom: 6em;
  }
`;

const AskContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  .checkbox {
    margin: 7vh;
    background-color: white;
    border: 1px solid white;
    border-radius: 20px;
    padding: 30px;
    width: 60vw;
    display: flex;
    flex-direction: column;
  }

  .button {
    margin-bottom: 5vh;
  }
`;

const EmailCheck = styled.div`
  margin: 7vh;
  background-color: white;
  border: 1px solid white;
  border-radius: 20px;
  padding: 30px;
  width: 60vw;
  display: flex;
  flex-direction: column;
  .emailCheck {
    margin-top: 4vh;
    display: flex;
    flex-direction: column;
    text-align: right;
    color: red;
    font-size: smaller;
  }
`;
function UserOut() {
  const navigate = useNavigate();
  const [isClicked, setIsClicked] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [input, setInput] = useState('');

  const handleClicked = () => {
    setIsClicked(!isClicked);
  };

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <Container>
      <div className="title-container">
        <span className="usersetting-title">회원 탈퇴</span>
      </div>
      <AskContainer>
        <div className="checkbox">
          <p>정말 떠나시는 건가요?</p>
          <p>한번 더 생각해보지 않으시겠어요? 🥲</p>
        </div>
        <div className="button">
          <Button colorScheme="red" mr="3vw" onClick={handleClicked}>
            {isClicked ? '회원 탈퇴 멈추기' : '회원 탈퇴 계속하기'}
          </Button>
          <Button colorScheme="purple" onClick={handleBack}>
            뒤로 가기
          </Button>
        </div>
        {isClicked && (
          <div>
            <div className="checkbox">
              <p>
                계정을 삭제하시는 이유를 말씀해주세요. <br />
                제품 개선에 중요한 자료로 활용하겠습니다.
              </p>
              <CheckboxGroup colorScheme="purple">
                <Stack spacing={[1, 5]} ml="20vw" mt="40px" mb="20px">
                  <Checkbox borderColor="purple.300">사용빈도 낮음</Checkbox>
                  <Checkbox borderColor="purple.300">
                    이용이 불편하고 장애가 잦음
                  </Checkbox>
                  <Checkbox borderColor="purple.300">
                    다른 서비스가 더 좋음
                  </Checkbox>
                  <Checkbox borderColor="purple.300">컨텐츠 불만</Checkbox>
                  <Checkbox borderColor="purple.300">기타</Checkbox>
                </Stack>
              </CheckboxGroup>
            </div>

            <EmailCheck>
              <p>이메일 재확인</p>
              <p className="emailCheck">
                {isCorrect
                  ? '이메일이 일치합니다.'
                  : '이메일을 다시 입력해주세요.'}
              </p>
              <Box mb="-4vh">
                <Input
                  type="email"
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setInput(e.target.value)
                  }
                  colorScheme="purple"
                  borderColor="purple.400"
                  mt="5vh"
                  mb="-5vh"
                ></Input>
              </Box>

              <Box>
                <Button colorScheme="red">탈퇴하기</Button>
              </Box>
            </EmailCheck>
          </div>
        )}
      </AskContainer>
    </Container>
  );
}

export default UserOut;
