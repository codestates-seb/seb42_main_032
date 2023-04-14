import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import './index.css';
import { ChakraProvider } from '@chakra-ui/react';
import { RecoilRoot } from 'recoil';
import { TikkleWatcher } from './util/TikkleWatcher';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    {/* Recoil 사용을 위해 최상위에서 RecoilRoot 컴포넌트로 감싸줘야 함 */}
    <RecoilRoot>
      <ChakraProvider>
        <BrowserRouter>
          <TikkleWatcher>
            <App />
          </TikkleWatcher>
        </BrowserRouter>
      </ChakraProvider>
    </RecoilRoot>
  </React.StrictMode>
);
