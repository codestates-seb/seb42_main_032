import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

import { TagDropdown } from '../components/layout/TagDropdown';

export function CurationWrite() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  return (
    <>
      <WirteContainer>
        <div>
          <section className="title">
            <h1>제목</h1>
            <span className="invalid-label">제목은 3글자 이상 적어주세요.</span>
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
            <span className="invalid-label">
              내용은 10글자 이상 적어주세요.
            </span>
            <ReactQuill theme="snow" value={content} onChange={setContent} />
          </section>
          <section className="tag">
            <h1>태그</h1>
            <span className="invalid-label">태그를 선택해주세요.</span>
            <TagDropdown />
          </section>
          <div className="button-container">
            <Button>저장하기</Button>
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
