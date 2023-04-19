import axios from 'axios';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import SearchBar from '../components/curation/SearchBar';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { useRecoilValue } from 'recoil';
import { userInfoState } from '../util/store';

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

const ControlContainer = styled.div`
  margin: 10px;
  display: flex;
  gap: 10px;
  justify-content: space-between;
`;

const ContentContainer = styled.div`
  .post-noresult__div {
    margin-top: 20px;
    font-size: 20px;
  }
`;

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
  align-items: center;
  gap: 10px;
  margin: 20px;
  font-size: 17px;
  color: #a2a0fb;
  svg {
    cursor: pointer;
    color: #a2a0fb;
  }
  span {
    cursor: pointer;
  }
  .page-selected__span {
    font-size: 20px;
    font-weight: bold;
    color: #6764ff;
  }
`;

const WirteButton = styled.button`
  background-color: #a2a0fb;
  color: white;
  padding: 10px 20px;
  border-radius: 10px;
  box-shadow: 1px 1px 2px black;
  font-weight: bold;
  :hover {
    background-color: #7c7ac3;
  }
`;

export interface curationType {
  id: number;
  title: string;
  createdAt: Date;
  like: number;
  tagId: number;
}

interface tagsType {
  id: number;
  name: string;
}

const Board = () => {
  const [curations, setCurations] = useState<curationType[]>([]);
  const [selectedPage, setSelectedPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [tags, setTags] = useState<tagsType[]>([]);
  const [searchParams, setSearchParams] = useState(window.location.search);

  const getAllCurations = async () => {
    if (searchParams) {
      const params = searchParams.split('&');
      const searchPage = selectedPage - 1;
      const keyword = params[1].split('=')[1];
      const searchType = params[2].split('=')[1];
      const data = await (
        await axios.get(`${import.meta.env.VITE_SERVER}/curations`, {
          params: {
            keyword: decodeURI(keyword),
            page: searchPage,
            searchType: searchType,
          },
        })
      ).data;
      return data;
    }
    const data = await (
      await axios.get(
        `${import.meta.env.VITE_SERVER}/curations/all?page=${selectedPage}`
      )
    ).data;
    return data;
  };

  const getTotalPage = async () => {
    if (searchParams) {
      const params = searchParams.split('&');
      const searchPage = 0;
      const keyword = params[1].split('=')[1];
      const searchType = params[2].split('=')[1];
      const totalPage = await (
        await axios.get(`${import.meta.env.VITE_SERVER}/curations`, {
          params: {
            keyword: decodeURI(keyword),
            page: searchPage,
            searchType: searchType,
          },
        })
      ).data.pageInfo;
      return totalPage;
    }
    const totalPage = await (
      await axios.get(`${import.meta.env.VITE_SERVER}/curations/all?page=1`)
    ).data.pageInfo;
    return totalPage;
  };

  const getTags = async () => {
    const tagLists = await (
      await axios.get(`${import.meta.env.VITE_SERVER}/tags`)
    ).data.data;
    return tagLists;
  };

  useEffect(() => {
    getTotalPage().then((res) => {
      console.log(res);
      setTotalPages(res.totalPages);
    });

    getTags().then((res) => {
      setTags(res);
    });
  }, [window.location.search]);

  useEffect(() => {
    getAllCurations().then((res) => {
      setCurations(res.data);
    });
    getTags().then((res) => {
      setTags(res);
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

  const user = useRecoilValue(userInfoState);

  const handleWriteButton = () => {
    if (user?.role === 'REGULAR') {
      alert('글쓰기 권한이 없습니다.');
    } else {
      window.location.href = `${import.meta.env.VITE_CLIENT}/curationwrite`;
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
      <ControlContainer>
        <SearchBar />
        <WirteButton onClick={handleWriteButton}>글쓰기</WirteButton>
      </ControlContainer>
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
                      <Tag>
                        {tags.filter((tag) => tag.id === el.tagId)[0].name}
                      </Tag>
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
        {curations.length === 0 ? (
          <div className="post-noresult__div">검색결과가 없습니다.</div>
        ) : (
          ''
        )}
      </ContentContainer>
      {pageArr.length > 0 ? (
        <PageNation>
          <FaChevronLeft size={30} onClick={prevPage} />
          {pageArr.map((el) => {
            return (
              <span
                key={el}
                className={el === selectedPage ? 'page-selected__span' : ''}
                onClick={() => {
                  setSelectedPage(el);
                }}
              >
                {el}
              </span>
            );
          })}
          <FaChevronRight size={30} onClick={nextPage} />
        </PageNation>
      ) : (
        ''
      )}
    </Container>
  );
};

export default Board;
