//@ts-ignore

//TODO 헤더 구현
import React from 'react';
import styled from 'styled-components';
import { BellIcon, ChevronDownIcon } from '@chakra-ui/icons';
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

const HeaderContainer = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  font-family: 'GmarketSansMedium';
  -webkit-box-shadow: 0 3px 5px rgba(57, 63, 72, 0.3);
  -moz-box-shadow: 0 3px 5px rgba(57, 63, 72, 0.3);
  box-shadow: 0 3px 5px rgba(57, 63, 72, 0.3);
  img{
    width: 120px;
    height: 60px;
  }
  svg{
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
  }
  .header-menubutton {
    cursor: pointer;
    span {
      display: flex;
      align-items: center;
    }
  }
`
const LoginButton = styled.button`
  cursor: pointer;
  padding: 5px 10px;
  color: #6b46c1;
  background-color: transparent;
  border: 1px solid #6b46c1;
  border-radius: 6px;
  font-size: 15px;
  :hover{
    background-color: #B794F4;
    color: white;
    border-color: transparent;
  }
  :active{
    background-color: #6b46c1;
    color: white;
    border-color: transparent;
  }
`
const HeaderContentWrap = styled.div`
  display: flex;
  align-items: center;
  gap: 15px;
`
const BeforeLogin = styled.div`
  margin-right: 15px;
`
const AfterLogin = styled.div`
  margin-right: 15px;
`
const UserButton = styled.button`
  border-radius: 50%;
  border: none;
  background-color: transparent;
`

const Button = styled.div`
  margin: 15px;
  cursor: pointer;
  :hover{
    /* background-color: #6b46c1; */
    color: #6b46c1;
  }
`
const LogOutButton = styled.div`
  margin: 15px;
  cursor: pointer;
  :hover {
    color: red;
  }
`

function Header() {
  return (
    <HeaderContainer>
      <img className='header-logo__img'src='tikkle-logo.svg' alt='logo'></img>
      <HeaderContentWrap>
        <BellIcon boxSize={25}/>
        <BeforeLogin>
          <LoginButton>Log In</LoginButton>
        </BeforeLogin>
        <AfterLogin>
          <Menu>
            <MenuButton className='header-menubutton' as={UserButton}>
              <img className='header-user__img' src='user.png' alt='user' />
              <ChevronDownIcon boxSize={25}/>
            </MenuButton>
            <MenuList className='header-menulist'>
              <MenuItem as={Button}>회원정보</MenuItem>
              <MenuItem as={Button}>예산 설정</MenuItem>
              <MenuItem as={Button}>예산 조회</MenuItem>
              <MenuItem as={Button}>거래내역 조회</MenuItem>
              <MenuItem as={Button}>카테고리 수정</MenuItem>
              <MenuItem as={LogOutButton}>로그아웃</MenuItem>
            </MenuList>
          </Menu>
        </AfterLogin>
      </HeaderContentWrap>
    </HeaderContainer>
  )
}

export default Header
