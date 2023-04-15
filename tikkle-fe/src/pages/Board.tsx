import axios from 'axios';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
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
    display: flex;
    align-items: center;
  }
  div:last-child {
    margin-top: 10px;
    margin-bottom: 50px;
    font-size: 20px;
  }
  img {
    width: 100px;
    height: 100px;
  }
`;

const ControlContainer = styled.div``;

const ContentContainer = styled.div``;

const PostLists = styled.table`
  width: 100%;
  /* border-top: 3px solid black; */
  th {
    background-color: #a2a0fb;
    font-weight: bold;
    /* border-bottom: 2px solid black; */
    font-size: 20px;
    vertical-align: middle;
    height: 50px;
    border-right: 1px solid white;
    color: white;
  }
  th:first-child {
    border-top-left-radius: 10px;
  }
  th:last-child {
    border-right: none;
    border-top-right-radius: 10px;
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
  .post-title-div {
    text-align: left;
    padding-left: 20px;
  }
`;

const Tag = styled.div`
  color: white;
  border-radius: 10px;
  width: fit-content;
  padding: 8px;
  background-color: #c29cedd7;
`;

const PageNation = styled.div``;

interface curationType {
  id: number;
  title: string;
  createdAt: Date;
}

const Board = () => {
  const [curations, setCurations] = useState<curationType[]>();

  const getAllCurations = async (page: number) => {
    const data = await (
      await axios.get(
        `${import.meta.env.VITE_SERVER}/curations/all?page=${page}`
      )
    ).data;
    return data;
  };

  useEffect(() => {
    getAllCurations(1).then((res) => {
      setCurations(res.data);
    });
  }, []);
  return (
    <Container>
      <HeaderWrap>
        <div>
          티클 Talk
          <img src="/tikkle-talk.png" alt="tikkle talk"></img>
        </div>
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
            <td className="post-title-div">
              <Link to="/curationview">
                <div>ㅎㅇ</div>
              </Link>
              <Tag>tag</Tag>
            </td>
            <td>1</td>
            <td>2023.04.20</td>
          </Post>
          {curations &&
            curations.map((el) => {
              return (
                <Post>
                  <td>{el.id}</td>
                  <td>
                    <div>{el.title}</div>
                    <Tag>tag</Tag>
                  </td>
                  <td>1</td>
                  <td>2023.04.20</td>
                </Post>
              );
            })}
        </PostLists>
      </ContentContainer>
      <PageNation></PageNation>
    </Container>
  );
};

export default Board;
