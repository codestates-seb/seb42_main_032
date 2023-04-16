import axios from 'axios';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

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
    span:first-child {
      :hover {
        font-weight: bold;
      }
    }
  }
`;

const Tag = styled.div`
  color: white;
  border-radius: 10px;
  width: fit-content;
  padding: 8px;
  background-color: #c29cedd7;
`;

const PageNation = styled.div`
  display: flex;
  justify-content: center;
  svg {
    color: #a2a0fb;
    cursor: pointer;
  }
  .page-selected__span {
    font-size: 20px;
  }
`;

interface curationType {
  id: number;
  title: string;
  createdAt: Date;
  like: number;
}

const Board = () => {
  const [curations, setCurations] = useState<curationType[]>();
  const [selectedPage, setSelectedPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const getAllCurations = async (page: number) => {
    const data = await (
      await axios.get(
        `${import.meta.env.VITE_SERVER}/curations/all?page=${page}`
      )
    ).data;
    return data;
  };

  const getTotalPage = async () => {
    const totalPage = await (
      await axios.get(`${import.meta.env.VITE_SERVER}/curations/all?page=1`)
    ).data.pageInfo;
    return totalPage;
  };

  const dummyDatas = {
    data: [
      {
        id: 1,
        title: 'test',
        content: 'asdasd',
        createdAt: new Date(),
      },
      {
        id: 2,
        title: 'test',
        content: 'asdasd',
        createdAt: new Date(),
      },
      {
        id: 3,
        title: 'test',
        content: 'asdasd',
        createdAt: new Date(),
      },
      {
        id: 4,
        title: 'test',
        content: 'asdasd',
        createdAt: new Date(),
      },
    ],
    pageInfo: {
      page: 1,
      size: 10,
      totalElements: 1,
      totalPages: 1,
    },
  };

  useEffect(() => {
    getTotalPage().then((res) => {
      setTotalPages(res.totalPages);
    });
  }, []);

  useEffect(() => {
    getAllCurations(selectedPage).then((res) => {
      setCurations(res.data);
    });
  }, [selectedPage]);

  let pageArr = [];
  for (
    let i = Math.floor((selectedPage - 1) / 5) * 5 + 1;
    i < Math.floor((selectedPage - 1) / 5) * 5 + 6;
    i++
  ) {
    if (totalPages >= i) {
      pageArr.push(i);
    }
  }

  const prevPage = () => {
    if (selectedPage === 1) {
      alert('첫번째 페이지입니다.');
    } else {
      setSelectedPage(selectedPage - 1);
    }
  };

  const nextPage = () => {
    if (selectedPage === totalPages) {
      alert('마지막 페이지입니다.');
    } else {
      setSelectedPage(selectedPage + 1);
    }
  };

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
          <thead>
            <tr>
              <th className="post-table__th1">글번호</th>
              <th className="post-table__th2">제목</th>
              <th className="post-table__th3">좋아요</th>
              <th className="post-table__th4">작성일시</th>
            </tr>
          </thead>
          <tbody>
            {curations &&
              curations.map((el) => {
                return (
                  <Post key={el.id}>
                    <td>{el.id}</td>
                    <td className="post-title-div">
                      <Link to={`/curationview/${el.id}`}>
                        <span>{el.title}</span>
                      </Link>
                      <Tag>tag</Tag>
                    </td>
                    <td>{el.like}</td>
                    <td>
                      {el.createdAt
                        ? `${el.createdAt.getFullYear()}-${
                            el.createdAt.getMonth() + 1
                          }-${el.createdAt.getDate()}`
                        : ''}
                    </td>
                  </Post>
                );
              })}
          </tbody>
        </PostLists>
      </ContentContainer>
      <PageNation>
        <FaChevronLeft size={30} onClick={prevPage} />
        {pageArr.map((el) => {
          return (
            <span
              key={el}
              className={el === selectedPage ? 'page-selected__span' : ''}
            >
              {el}
            </span>
          );
        })}
        <FaChevronRight size={30} onClick={nextPage} />
      </PageNation>
    </Container>
  );
};

export default Board;
