import styled from 'styled-components';

const LoadingContainer = styled.div`
  display: flex;
  justify-content: center;
`;

function Loading() {
  return (
    <LoadingContainer>
      <img src="/loading.gif" alt="loading"></img>
    </LoadingContainer>
  );
}

export default Loading;
