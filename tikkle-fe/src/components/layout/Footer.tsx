//TODO Footer 구현하기
import React from 'react';
import styled from 'styled-components';

const FooterContainer = styled.div`
  width: 100%;
  background-color: #232629;
  display: flex;
  font-family: 'GmarketSansMedium';
  align-items: center;
  padding-top: 30px;
  padding-bottom: 30px;
  img {
    width: 30vw;
    height: 20vh;
  }
`;
const FooterContentWrap = styled.div`
  flex-grow: 1;
  color: #babfc3;
  display: flex;
  flex-direction: column;
  justify-content: center;
  div {
    margin: 10px;
    font-weight: bolder;
  }
  li {
    margin: 5px;
    font-weight: lighter;
  }
`;
const MemberContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 20px;
`;
const MemberLists = styled.ul``;
function Footer() {
  return (
    <FooterContainer>
      <img src="tikkle-logo.svg" alt="logo"></img>
      <FooterContentWrap>
        <div>Copyright ⓒ 2023 Tikkle All rights reserved.</div>
        <div>Team Member</div>
        <MemberContainer>
          <MemberLists>
            <li>김규리 (FE Lead)</li>
            <li>고재필 (FE)</li>
            <li>김재훈 (FE)</li>
          </MemberLists>
          <MemberLists>
            <li>신승현 (BE Lead)</li>
            <li>송규성 (BE)</li>
            <li>전민주 (BE)</li>
          </MemberLists>
        </MemberContainer>
      </FooterContentWrap>
    </FooterContainer>
  );
}

export default Footer;
