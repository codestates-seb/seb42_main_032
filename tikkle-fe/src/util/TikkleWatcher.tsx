import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { useHrefModal } from '../hooks/useHrefModal';
import { userInfoState } from './store';

export function TikkleWatcher({ children }: { children: JSX.Element }) {
  // pathname은 /부터 시작하므로 앞글자 제거
  const currentPath = useLocation().pathname.slice(1);

  const userInfo = useRecoilValue(userInfoState);

  const userSettingModal = useHrefModal(
    '회원정보 설정이 완료되지 않았습니다. 설정을 완료해주세요.',
    '회원정보로 이동',
    'usersetting'
  );
  const categoryEditModal = useHrefModal(
    '카테고리 설정이 완료되지 않았습니다. 설정을 완료해주세요.',
    '카테고리 설정으로 이동',
    'categoryedit'
  );
  const budgetSettingModal = useHrefModal(
    '예산 설정이 완료되지 않았습니다. 설정을 완료해주세요.',
    '예산 설정으로 이동',
    'budgetsetting'
  );

  useEffect(() => {
    const userMustHere = userInfo?.state?.toLowerCase();

    // active가 아닌 사용자가 설정해야 하는 위치를 벗어나 다른 페이지로 이동한 경우인지 판별
    if (userMustHere !== 'active' && currentPath !== userMustHere) {
      // 사용자가 설정해야 하는 위치로 이동하도록 모달 표시
      switch (userMustHere) {
        case 'usersetting':
          userSettingModal.onOpen();
          break;
        case 'categoryedit':
          categoryEditModal.onOpen();
          break;
        case 'budgetsetting':
          budgetSettingModal.onOpen();
          break;
        default:
          break;
      }
    }
  }, [currentPath]);

  // 감싼 하위 컴포넌트들을 그대로 다시 반환
  return (
    <>
      {children}
      <userSettingModal.ModalWrapper />
      <categoryEditModal.ModalWrapper />
      <budgetSettingModal.ModalWrapper />
    </>
  );
}
