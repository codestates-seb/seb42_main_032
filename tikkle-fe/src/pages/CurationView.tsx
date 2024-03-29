import Editing from '../components/curation/Editing';
import axios from 'axios';
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import {
  AiFillHeart,
  AiOutlineHeart,
  AiOutlineEdit,
  AiOutlineUser,
} from 'react-icons/ai';
import { Box, Button, Icon } from '@chakra-ui/react';
import { useRecoilValue } from 'recoil';
import { userInfoState } from '../util/store';
import { Navigate, useNavigate, useParams } from 'react-router-dom';

const Container = styled.div`
  font-family: 'GmarketSansMedium';
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 20vh;
  width: 90%;
  .article_title {
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
  .consistent_notice {
    color: #f25f5f;
    margin-left: 10px;
  }
`;

export interface Article {
  name: string;
  id: number;
  title: string;
  content: string;
  tagId: number;
  state: string;
  createdAt: Date;
  modifiedAt: Date;  
  likesCount: number;
}

function CurationView() {
  const navigate = useNavigate();

  // 게시글 정보 상태 관리
  const [article, setArticle] = useState<Article>({
    name: '',
    id: 0,
    title: '',
    content: '',
    tagId: 0,
    state: '',
    createdAt: new Date(),
    modifiedAt: new Date(),
    likesCount: 0
  });

  // TODO curationID 받아오기
  let { curationId } = useParams();
 
  // 게시글 GET 요청 (단일 게시글 조회)
  useEffect(() => {
    const getArticle = async () => {
      await axios
        .get(`${import.meta.env.VITE_SERVER}/curations/${curationId}`)
        .then((res) => setArticle(res.data.data))
        .catch((err) => console.log(err));
    };
    getArticle();
  }, []);

  const memberId = useRecoilValue(userInfoState);
  // 좋아요 기능 핸들러
  const [isLiked, setIsLiked] = useState<boolean>(false);
 // 좋아요 추가
  const likeHandler = () => {
    setIsLiked(true);
    const addLikes = async () => {
      await axios
        .patch(`${import.meta.env.VITE_SERVER}/curations/likes/${memberId}/${curationId}`)
        .then((res) => {
          if (res.status === 200) alert('좋아요가 반영되었습니다.')
        })
        .catch((err) => console.log(err));
    };
    addLikes();
  };
// 좋아요 취소
  const undoHandler = () => {
    setIsLiked(false)
    const deleteLikes = async () => {
      await axios
        .patch(`${import.meta.env.VITE_SERVER}/curations/likes/${memberId}/${curationId}`)
        .then((res) => {
          if (res.status === 200) alert('좋아요가 취소되었습니다.')
        })
        .catch((err) => console.log(err));
    };
    deleteLikes();
   
  };

  console.log(article)
  // 조회하는 사용자가 게시글 작성자인지 확인
  // 로그인한 사용자 정보 (useRecoilState) 와 article.name 비교
  const userName = useRecoilValue(userInfoState)?.name;
  // 테스트용
  const isConsistent = true
  // const isConsistent = userName === article.name;

  // 수정하기 버튼 핸들러
  // 버튼 클릭 시, isEditing 상태 변경 및 이에 따른 에디터 조건부 렌더링
  const [isEditing, setIsEditing] = useState<boolean>(false);

  const editHandler = () => {
    setIsEditing(true);
  };

  // 삭제하기 버튼 핸들러

  const deleteHandler = () => {
    if (confirm('삭제하시겠습니까?')) {
      const deleteArticle = async () => {
        await axios
          .delete(`${import.meta.env.VITE_SERVER}/curations/${curationId}`)
          .then((res) => {
            const isSuccess = res.status === 200;
            if (isSuccess) alert('삭제되었습니다.');
          })
          .catch((err) => console.log(err));
      };
      deleteArticle();
    }
    navigate('/board');
  };

// TODO tagId에 따른 태그 렌더링

let tagName = ''
if (article.tagId === 1) {
   tagName = '부동산'
}

if (article.tagId === 2) {
   tagName = '주식'
}

if (article.tagId === 3) {
   tagName = '가상화폐'
}

if (article.tagId === 4) {
   tagName = '예/적금'
}

if (article.tagId === 5) {
   tagName = '재무계획'
}

if (article.tagId === 6) {
   tagName = '청약'
}

if (article.tagId === 7) {
   tagName = '대출'
}

if (article.tagId === 8) {
   tagName = '펀드'
}
  if (isEditing) {
    return <Editing article={article} />;
  } else {
    return (
      <Container>
        <h1 className='article_title'>{article?.title}</h1>
        <Tag>{tagName}</Tag>
        <p className="writer_information">
        <Icon as={AiOutlineUser} />by {article?.name}
        </p>
        <p className="writer_information">
          <>
          <Icon as={AiOutlineEdit} /> {article.createdAt?.getMonth} 에 작성되었어요. 
          </>
        </p>
       <p className="writer_information">
       <Icon as={AiOutlineHeart} /> {article.likesCount} 명이 좋아했어요.</p>
      <div dangerouslySetInnerHTML={{ __html: article.content }} />
        <ButtonContainer>
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
          {isConsistent ? (
            <Box>
              <Button
                onClick={editHandler}
                minWidth="auto"
                backgroundColor="#ceb1ed"
                color="white"
                ml="20px"
              >
                수정하기
              </Button>
              <Button
                onClick={deleteHandler}
                minWidth="auto"
                backgroundColor="#ceb1ed"
                color="white"
                ml="10px"
              >
                삭제하기
              </Button>
            </Box>
          ) : (
            <p className="consistent_notice">
              수정 및 삭제는 글 작성자만 가능합니다.
            </p>
          )}
        </ButtonContainer>
      </Container>
    );
  }
}

// 각 정보 보여주는 Container
// 수정 / 삭제 버튼 Container, 조건부 렌더링 / 글 작성자인지 확인하는 로직 필요
// 좋아요 버튼 (하트모양?) 및 좋아요 개수 렌더링
// 수정하기 / 삭제 버튼 클릭 시 버튼 클릭 핸들러 작성
// 수정하기 -> 에디터 뷰로 전환 및 저장하기 버튼 생성
// 삭제하기 -> "게시글을 삭제하겠습니까?" -> YES 클릭 -> DELETE 요청 & 성공 시 alert "삭제되었습니다"
export default CurationView;
