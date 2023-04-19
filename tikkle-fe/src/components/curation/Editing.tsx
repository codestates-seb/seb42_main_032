import { Button } from '@chakra-ui/react';
import { useState } from 'react';
import styled from 'styled-components';
import {Article} from '../../pages/CurationView';

const Container = styled.div`
  font-family: 'GmarketSansMedium';
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 20vh;
  width: 90%;
`;

const Tag = styled.div`
  color: white;
  border-radius: 10px;
  width: fit-content;
  padding: 8px;
  background-color: #a256f3;
`;

// 동일한 화면에서 title, content, tag 부분만 에디터로 전환하기
// 저장하기 버튼 -> 클릭 시, PATCH 요청 및 저장 완료 시 alert

function Editing({article}: {article: Article} ) {
  // 제목, 본문, 태그 상태관리
  const [editingArticle, setEditingArticle] = useState(article);

  // 저장하기 버튼 핸들러 (PATCH 요청)
  const submitHandler = () => {};
  return (
    <Container>
      //TODO 제목 수정 input
      <input></input>
      //TODO 태그 수정 컴포넌트 사용
      <Tag>article.tag</Tag>
      //TODO 내용 수정 마크다운 에디터?
      <p className="curation_content">article.content</p>
      <Button
        onClick={submitHandler}
        minWidth="auto"
        backgroundColor="#ceb1ed"
        color="white"
        ml="10px"
        mb="5vh"
      >
        저장하기
      </Button>
    </Container>
  );
}

export default Editing;
