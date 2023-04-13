import { Select } from '@chakra-ui/react';
import axios from 'axios';
import { useEffect, useState } from 'react';

function Dropdown(
  { memberId }: { memberId: number },
  { memberCategoryIdHandler }: { memberCategoryIdHandler: (e: any) => void }
) {
  // 받아온 카테고리 리스트 상태 관리
  const [categoryList, setCategoryList] = useState([]);
  // GET 요청 URL용 멤버 아이디
  const member_id = memberId;

  // 카테고리 리스트 GET 요청
  useEffect(() => {
    const getCategoryList = async () => {
      axios
        .get(`${import.meta.env.VITE_SERVER}/budgets/members/${member_id}`)
        .then((res) => {
          const categoryList = res.data;
          setCategoryList(categoryList);
          console.log(categoryList);
        })
        .catch((err) => console.log(err));
    };
    getCategoryList();
  }, []);

  return (
    <div>
      <Select
        placeholder="카테고리를 선택하세요."
        onChange={memberCategoryIdHandler}
      >
        // TODO 카테고리 리스트 이름 생성
        {categoryList.map((category: any) => {
          return (
            <option key={category.id} value={category.memberCategoryId}>
              카테고리 이름
            </option>
          );
        })}
      </Select>
    </div>
  );
}

export default Dropdown;
