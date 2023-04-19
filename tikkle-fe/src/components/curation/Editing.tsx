import { Button } from '@chakra-ui/react';
import axios from 'axios';
import { useEffect, useRef, useState } from 'react';
import ReactQuill from 'react-quill';
import { useParams } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import styled from 'styled-components';
import {Article} from '../../pages/CurationView';
import { userInfoState } from '../../util/store';
import { TagDropdown, TagType } from '../layout/TagDropdown';

const WirteContainer = styled.div`
  margin-top: 15vh;
  font-family: GMarketSansMedium;
  display: flex;
  flex-direction: column;
  align-items: center;

  > div {
    width: 60%;
    min-width: 500px;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 40px;
  }

  section {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    width: 100%;
  }

  section > h1 {
    font-size: 1.5rem;
  }

  section > .invalid-label {
    color: red;
  }

  section.title > input {
    border: 1px solid black;
    padding: 8px;
    width: 100%;
  }

  section.content > .quill {
    padding: 8px;
    width: 100%;
    height: auto;
  }
`;

// 동일한 화면에서 title, content, tag 부분만 에디터로 전환하기
// 저장하기 버튼 -> 클릭 시, 유효성검사 후 PATCH 요청 및 저장 완료 시 alert

function Editing({article}: {article: Article} ) {
  // 제목, 본문, 태그 및 유효성검사 상태관리 
  const [title, setTitle] = useState(article.title);
  const [titleIsValid, setTitleIsValid] = useState(true);
  const [content, setContent] = useState(article.content);
  const [contentIsValid, setContentIsValid] = useState(true);
  const [tag, setTag] = useState<TagType>();
  const [tagIsValid, setTagIsValid] = useState(false);

  const { curationId } = useParams();
  const memberId  =  useRecoilValue(userInfoState)?.id
  const editorRef = useRef(null);
  // 유효성 검사 로직
  useEffect(() => {
    // content는 <html> 태그가 포함된 상태로 나오기 때문에 유효성 검사를 위해 별도 변수로 저장
    const pureContent = (editorRef.current as any).getEditor().getText();
    
    // 제목 유효성 검사
    (title.length < 3) ? setTitleIsValid(false) : setTitleIsValid(true);

    // 내용 유효성 검사
    // 실제 길이보다 length 값이 1 짧게 나오는 버그가 있으므로 <= 로 비교
    (pureContent.length <= 10) ? setContentIsValid(false) : setContentIsValid(true);

    // 태그 유효성 검사
    (!tag) ? setTagIsValid(false) : setTagIsValid(true);
  }, [title, content, tag]);


  // 저장하기 버튼 핸들러 (PATCH 요청)
  const submitHandler = () => {
    if(titleIsValid && contentIsValid && tagIsValid) {
      axios.patch(`${import.meta.env.VITE_SERVER}/curations/${curationId}/${memberId}`, {
        title, content, tag
      })
      .then((res) => {if (res.status === 200) {
        alert('저장되었습니다.')
      }}) 
      .catch((err) => alert('수정 권한이 없습니다.'))
    }
  };
  return (
    <WirteContainer>
   
      <div>
          <section className="title">
            <h1>제목</h1>
            {titleIsValid ? (
              ''
            ) : (
              <span className="invalid-label">
                제목은 3글자 이상 적어주세요.
              </span>
            )}
            <input
              type="text"
              placeholder="제목을 입력해주세요."
              value={title}
              onChange={(e: React.ChangeEvent) =>
                setTitle((e.target as HTMLInputElement).value)
              }
            />
          </section>
    
      <section className="content">
            <h1>내용</h1>
            {contentIsValid ? '' : <span className="invalid-label">
              내용은 10글자 이상 적어주세요.
            </span>}
            <ReactQuill
              theme="snow"
              value={content}
              onChange={setContent}
              ref={editorRef}
            />
          </section>
          <section className="tag">
            <h1>태그</h1>
            {tagIsValid ? '' : <span className="invalid-label">태그를 선택해주세요.</span>}
            <TagDropdown onChange={setTag} />
          </section>

          
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
      </div>
    </WirteContainer>
  )
}

export default Editing;
