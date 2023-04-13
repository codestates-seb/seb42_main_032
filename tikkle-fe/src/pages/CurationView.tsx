import axios from 'axios';
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import {
  AiFillHeart,
  AiOutlineHeart,
  AiOutlineEdit,
  AiOutlineUser,
} from 'react-icons/ai';
import { Button, Icon } from '@chakra-ui/react';

const Container = styled.div`
  font-family: 'GmarketSansMedium';
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 20vh;
  width: 90%;
  h1 {
    font-size: xx-large;
    margin-bottom: 5vh;
    text-shadow: 3px 3px 3px #ceb1ed;
  }
  .writer_information {
    font-size: medium;
    margin-top: 5vh;
    margin-bottom: 5vh;
    text-align: left;
  }
  .curation_content {
    border: 1px solid lightgrey;
    box-shadow: 3px 3px 3px #ceb1ed;
    padding: 10px;
    width: 80%;
    border-radius: 10px;
    font-size: larger;
    margin-bottom: 5vh;
    text-align: left;
  }
`;

const Tag = styled.div`
  color: white;
  border-radius: 10px;
  width: fit-content;
  padding: 8px;
  background-color: #a256f3;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: end;

  margin-bottom: 10vh;
`;
function CurationView() {
  interface Article {
    id: number;
    title: string;
    content: string;
    tagId: number;
    state: string;
    createdAt: Date;
    modifiedAt: Date;
  }
  // 게시글 정보 상태 관리
  const [article, setArticle] = useState<Article>({
    id: 0,
    title: '',
    content: '',
    tagId: 0,
    state: '',
    createdAt: new Date(),
    modifiedAt: new Date(),
  });

  // TODO curationID 받아오기
  // 게시글 GET 요청 (단일 게시글 조회)
  useEffect(() => {
    const getArticle = async () => {
      axios
        .get(`${import.meta.env.VITE_SERVER}/curations/${curationId}`)
        .then((res) => setArticle(res.data))
        .catch((err) => console.log(err));
    };
    getArticle();
  }, []);

  // 좋아요 기능 (한번만 클릭 가능, 해제 불가능)
  // TODO 좋아요 클릭 시, PATCH요청으로 개수 ++
  const [isLiked, setIsLiked] = useState<boolean>(false);
  const likeHandler = () => {
    setIsLiked(true);
    alert('좋아요가 반영되었습니다.');
  };
  const undoHandler = () => {
    alert('반영된 좋아요는 취소가 불가합니다.');
  };

  // 조회하는 사용자가 게시글 작성자인지 확인

  return (
    <Container>
      <h1>article.title</h1>
      <Tag>article.tag</Tag>

      <p className="writer_information">
        <Icon as={AiOutlineUser} /> by article.name <br />
        <Icon as={AiOutlineEdit} /> article.createdAt 에 작성되었어요. <br />
        <Icon as={AiOutlineHeart} /> article.likes 명이 좋아했어요.
      </p>

      <p className="curation_content">article.content</p>
      <ButtonContainer>
        {/* //TODO 클릭 여부 확인하여 조건부 렌더링 */}
        {isLiked ? (
          <Icon
            onClick={undoHandler}
            as={AiFillHeart}
            fontSize="xx-large"
            color="#a256f3"
          />
        ) : (
          <Icon
            onClick={likeHandler}
            as={AiOutlineHeart}
            fontSize="xx-large"
            color="#a256f3"
          />
        )}
        {/* //TODO 사용자인지 확인하여 조건부 렌더링 */}
        <Button
          minWidth="auto"
          backgroundColor="#ceb1ed"
          color="white"
          ml="20px"
        >
          수정하기
        </Button>
        <Button
          minWidth="auto"
          backgroundColor="#ceb1ed"
          color="white"
          ml="10px"
        >
          삭제하기
        </Button>
      </ButtonContainer>
    </Container>
  );
  // 각 정보 보여주는 Container
  // 수정 / 삭제 버튼 Container, 조건부 렌더링 / 글 작성자인지 확인하는 로직 필요
  // 좋아요 버튼 (하트모양?) 및 좋아요 개수 렌더링
  // 수정하기 / 삭제 버튼 클릭 시 버튼 클릭 핸들러 작성
  // 수정하기 -> 에디터 뷰로 전환 및 저장하기 버튼 생성
  // 삭제하기 -> "게시글을 삭제하겠습니까?" -> YES 클릭 -> DELETE 요청 & 성공 시 alert "삭제되었습니다"
}

export default CurationView;
