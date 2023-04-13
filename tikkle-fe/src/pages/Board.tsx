import styled from 'styled-components';

const Container = styled.div`
  font-family: 'GmarketSansMedium';
  margin-top: 60px;
  min-height: 70vh;
  padding: 20px 50px;
  display: flex;
  flex-direction: column;
`;

const HeaderWrap = styled.div`
  text-align: left;
  div:first-child {
    font-size: 30px;
  }
  div:last-child {
    margin-top: 10px;
    margin-bottom: 10px;
    font-size: 20px;
  }
`;

const ControlContainer = styled.div``;

const ContentContainer = styled.div``;

const PostLists = styled.table`
  width: 100%;
  border: 1px solid black;
  th {
    font-weight: bold;
    border-bottom: 1px solid black;
    font-size: 20px;
    vertical-align: middle;
    height: 50px;
  }
  .post-table__th2 {
    width: 60%;
  }
`;

const Post = styled.tr`
  height: 70px;
  border-bottom: 1px solid black;
  td {
    vertical-align: middle;
    text-align: center;
    margin-top: 10px;
  }
`;

const PageNation = styled.div``;

const Board = () => {
  return (
    <Container>
      <HeaderWrap>
        <div>티클 Talk</div>
        <div>금융 큐레이팅 게시판</div>
      </HeaderWrap>
      <ControlContainer></ControlContainer>
      <ContentContainer>
        <PostLists>
          <tr>
            <th className="post-table__th1">글번호</th>
            <th className="post-table__th2">제목</th>
            <th className="post-table__th3">좋아요</th>
            <th className="post-table__th4">작성일시</th>
          </tr>
          <Post>
            <td>1</td>
            <td>
              <div>ㅎㅇ</div>
              <div>tag</div>
            </td>
            <td>1</td>
            <td>2023.04.20</td>
          </Post>
          <Post>
            <td>1</td>
            <td>
              <div>ㅎㅇ</div>
              <div>tag</div>
            </td>
            <td>1</td>
            <td>2023.04.20</td>
          </Post>
        </PostLists>
      </ContentContainer>
      <PageNation></PageNation>
    </Container>
  );
};

export default Board;
