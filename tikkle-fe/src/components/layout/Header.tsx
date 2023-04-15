//@ts-ignore

//TODO 헤더 구현

import React, { Dispatch, SetStateAction, useState, useEffect } from 'react';
import styled from 'styled-components';
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  BellIcon,
  ChevronDownIcon,
} from '@chakra-ui/icons';
import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuItemOption,
  MenuGroup,
  MenuOptionGroup,
  MenuDivider,
} from '@chakra-ui/react';

import { Link, Navigate, useLocation, useNavigate } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { tokenState, userInfoState } from '../../util/store';

const HeaderContainer = styled.header`
  z-index: 100;
  background-color: white;
  display: flex;
  align-items: center;
  justify-content: space-between;

  /* position을 fixed로 설정하면 헤더 외 요소의 상단부를 가리게 되므로 주석 처리  */
  /* 헤더는 항상 표시되어야 하므로 필요함 */
  position: fixed;

  top: 0;
  left: 0;
  width: 100%;
  font-family: 'GmarketSansMedium';
  -webkit-box-shadow: 0 3px 5px rgba(57, 63, 72, 0.3);
  -moz-box-shadow: 0 3px 5px rgba(57, 63, 72, 0.3);
  box-shadow: 0 3px 5px rgba(57, 63, 72, 0.3);
  img {
    width: 120px;
    height: 60px;
  }
  svg {
    color: #6b46c1;
  }
  .header-logo__img {
    margin-left: 10px;
  }
  .header-user__img {
    width: 40px;
    height: 40px;
    border-radius: 50%;
  }
  .header-menulist {
    background-color: white;
    border: 1px solid gray;
    border-radius: 7px;
    font-size: 20px;
  }
  .header-menubutton {
    cursor: pointer;
    span {
      display: flex;
      align-items: center;
    }
  }
`;
const LoginButton = styled.button`
  cursor: pointer;
  padding: 10px 20px;
  color: #6b46c1;
  background-color: transparent;
  border: 1px solid #6b46c1;
  border-radius: 6px;
  font-size: 15px;
  margin-left: 20px;
  box-shadow: 1px 1px 2px black;
  :hover {
    background-color: #6b46c1;
    color: white;
    border-color: transparent;
  }
  :active {
    background-color: #b794f4;
    color: white;
    border-color: transparent;
  }
`;
const HeaderContentWrap = styled.div`
  display: flex;
  align-items: center;
  gap: 15px;
`;
const BeforeLogin = styled.div`
  margin-right: 15px;
  gap: 20px;
`;
const AfterLogin = styled.div`
  margin-right: 15px;
  display: flex;
  align-items: center;
  gap: 20px;
  .header-menulistbutton {
    padding: 15px;
    width: 100%;
    :hover {
      border-left: 5px solid #6b46c1;
      /* background-color: #6b46c1; */
      color: #6b46c1;
      transition: 0.15s all;
    }
  }
  .header-logoutbutton {
    padding: 15px;
    width: 100%;
    :hover {
      color: red;
      transition: 0.15s all;
      border-left: 5px solid red;
    }
  }
`;
const UserButton = styled.button`
  border-radius: 50%;
  border: none;
  background-color: transparent;
`;

const SelectMonthContainer = styled.div`
  .header-monthbutton {
    cursor: pointer;
  }
`;

const TikkleTalkButton = styled.button`
  padding: 10px 20px;
  color: white;
  background-color: transparent;
  border-radius: 6px;
  background-color: #b794f4;
  box-shadow: 1px 1px 2px black;
  :hover {
    background-color: #6b46c1;
    color: white;
    border-color: transparent;
  }
  :active {
    background-color: #b794f4;
    color: white;
    border-color: transparent;
  }
`;

const Button = styled.div`
  cursor: pointer;
`;

// TypeScript에서 상태변경 props 받아올때 아래처럼 interface 작성해줘야 함.
interface HeaderProps {
  selectedDate: Date;
  setSelectedDate: Dispatch<SetStateAction<Date>>;
}

// interface 작성하고 아래와같이 props 받아오기
const Header: React.FunctionComponent<HeaderProps> = ({
  selectedDate,
  setSelectedDate,
}) => {
  const [isLogin, setIsLogin] = useState(false);

  const handlePrevMonth = () => {
    const prevDate = new Date(selectedDate);
    prevDate.setMonth(prevDate.getMonth() - 1);
    setSelectedDate(prevDate);
  };
  const handleNextMonth = () => {
    const nextDate = new Date(selectedDate);
    nextDate.setMonth(nextDate.getMonth() + 1);
    setSelectedDate(nextDate);
  };

  const location = useLocation();
  const [selectedPath, setSeletctedPath] = useState<String>('');

  useEffect(() => {
    setSeletctedPath(location.pathname.split('/')[1]);
  }, [location.pathname.split('/')[1]]);

  // 로그아웃 로직
  // Recoil token, userInfo 상태 초기화 및 랜딩 페이지로 이동
  //TODO 향후 랜딩 페이지로 이동 수정
  const [token, setToken] = useRecoilState(tokenState);
  const [userInfo, setUserInfo] = useRecoilState(userInfoState);

  useEffect(() => {
    if (userInfo && userInfo.id !== undefined) {
      setIsLogin(true);
    }
  }, [userInfo]);

  const navigate = useNavigate();
  const handleLogout = () => {
    setToken(null);
    setUserInfo(null);
    setIsLogin(false);
    navigate('/');
    alert('로그아웃 되었습니다.');
  };

  return (
    <HeaderContainer>
      <Link to="/home">
        <img className="header-logo__img" src="tikkle-logo.svg" alt="logo" />{' '}
      </Link>
      {selectedPath === 'home' ? (
        <SelectMonthContainer>
          <ChevronLeftIcon
            className="header-monthbutton"
            boxSize={30}
            onClick={handlePrevMonth}
          />
          <span>
            {selectedDate.getFullYear()} 년 {selectedDate.getMonth() + 1} 월
          </span>
          <ChevronRightIcon
            className="header-monthbutton"
            boxSize={30}
            onClick={handleNextMonth}
          />
        </SelectMonthContainer>
      ) : (
        ''
      )}

      <HeaderContentWrap>
        {isLogin ? (
          <AfterLogin>
            <Link to="/board">
              <TikkleTalkButton>티클 Talk</TikkleTalkButton>
            </Link>
            <BellIcon boxSize={25} />
            <Menu>
              <MenuButton className="header-menubutton" as={UserButton}>
                <img
                  className="header-user__img"
                  src={userInfo?.picture}
                  alt="user"
                />
                <ChevronDownIcon boxSize={25} />
              </MenuButton>
              <MenuList className="header-menulist">
                <MenuItem as={Link} to="/userinfo">
                  <div className="header-menulistbutton">회원정보</div>
                </MenuItem>
                <MenuItem as={Link} to={'/budgetsetting'}>
                  <div className="header-menulistbutton">예산 설정</div>
                </MenuItem>
                <MenuItem as={Link} to={'/budgetview'}>
                  <div className="header-menulistbutton">예산 조회</div>
                </MenuItem>
                <MenuItem as={Link} to="/categoryedit">
                  <div className="header-menulistbutton">카테고리 수정</div>
                </MenuItem>
                <MenuItem as={Button} onClick={handleLogout}>
                  <div className="header-logoutbutton">로그아웃</div>
                </MenuItem>
              </MenuList>
            </Menu>
          </AfterLogin>
        ) : (
          <BeforeLogin>
            <Link to="/board">
              <TikkleTalkButton>티클 Talk</TikkleTalkButton>
            </Link>
            <Link to="/login">
              <LoginButton>Log In</LoginButton>
            </Link>
          </BeforeLogin>
        )}
      </HeaderContentWrap>
    </HeaderContainer>
  );
};

export default Header;
