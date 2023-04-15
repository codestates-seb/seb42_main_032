import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import axios from 'axios';
import { useRecoilValue } from 'recoil';

import { TagDropdown, TagType } from '../components/layout/TagDropdown';
import { userInfoState } from '../util/store';

export function CurationWrite() {
  const [title, setTitle] = useState('');
  const [titleIsValid, setTitleIsValid] = useState(false);
  const [content, setContent] = useState('');
  const [contentIsValid, setContentIsValid] = useState(false);
  const [tag, setTag] = useState<TagType>();
  const [tagIsValid, setTagIsValid] = useState(false);

  const userInfo = useRecoilValue(userInfoState);

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

  return (
    <>
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
          <div className="button-container">
            <Button onClick={() => {
              // 모든 항목이 유효할 때만 post 요청 가능
              if (titleIsValid && contentIsValid && tagIsValid) {
                axios.post(`${import.meta.env.VITE_SERVER}/curations/${userInfo?.id}`, {
                  title: title,
                  content: content,
                  tagId: tag?.id,
                });
              }
            }}>저장하기</Button>
          </div>
        </div>
      </WirteContainer>
    </>
  );
}

// 스타일 영역
const WirteContainer = styled.div`
  margin-top: 60px;
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

const Button = styled.button`
  background-color: #805ad5;
  color: white;
  padding: 8px 16px;
  border-radius: 10px;
  font-size: 1.5rem;
`;
