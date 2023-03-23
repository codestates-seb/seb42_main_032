import axios from 'axios';
import React, { useState, Dispatch, SetStateAction, useEffect } from 'react';
import {
  AiOutlineShopping, //쇼핑
  MdFastfood, //식비
  BiCoffeeTogo, //카페
  IoLogoGameControllerA, //오락
  IoBeer, //유흥
  MdOutlineLocalHospital, //의료비
  GiLipstick, //뷰티,미용
  GiAirplaneDeparture, //여행
  BiWon, //금융
  BsFillCarFrontFill, //자동차
  IoIosSubway, //교통
  BsFillHouseFill, //주거
  GiPresent, //경조사
  BiPhoneCall, //통신비
  BsCart4, //생활
  FaBabyCarriage, //육아
  IoMdSchool, //교육
  FaDog, //반려동물
  BiCameraMovie, //문화
  CiDumbbell, //운동
  AiOutlineQuestion, //기타
} from 'react-icons/all';
import { IconContext } from 'react-icons/lib';
import styled from 'styled-components';

interface IconListProps {
  icons: string[];
  handleSelect: (icon: string) => void;
  selectedIcon: string;
  categoryId: number;
}

const IconListsContainer = styled.div`
  border: 1px solid black;
  width: 240px;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
  flex-wrap: wrap;
  position: absolute;
  border-radius: 10px;
  background-color: white;
  padding: 20px 10px;
`;

const IconList: React.FC<IconListProps> = ({
  icons,
  handleSelect,
  selectedIcon,
  categoryId,
}) => {
  const iconMap: any = {
    AiOutlineShopping: <AiOutlineShopping className="AiOutlineShopping" />,
    MdFastfood: <MdFastfood className="MdFastfood" />,
    BiCoffeeTogo: <BiCoffeeTogo className="BiCoffeeTogo" />,
    IoLogoGameControllerA: (
      <IoLogoGameControllerA className="IoLogoGameControllerA" />
    ),
    IoBeer: <IoBeer className="IoBeer" />,
    MdOutlineLocalHospital: (
      <MdOutlineLocalHospital className="MdOutlineLocalHospital" />
    ),
    GiLipstick: <GiLipstick className="GiLipstick" />,
    GiAirplaneDeparture: (
      <GiAirplaneDeparture className="GiAirplaneDeparture" />
    ),
    BiWon: <BiWon className="BiWon" />,
    BsFillCarFrontFill: <BsFillCarFrontFill className="BsFillCarFrontFill" />,
    IoIosSubway: <IoIosSubway className="IoIosSubway" />,
    BsFillHouseFill: <BsFillHouseFill className="BsFillHouseFill" />,
    GiPresent: <GiPresent className="GiPresent" />,
    BiPhoneCall: <BiPhoneCall className="BiPhoneCall" />,
    BsCart4: <BsCart4 className="BsCart4" />,
    FaBabyCarriage: <FaBabyCarriage className="FaBabyCarriage" />,
    IoMdSchool: <IoMdSchool className="IoMdSchool" />,
    FaDog: <FaDog className="FaDog" />,
    BiCameraMovie: <BiCameraMovie className="BiCameraMovie" />,
    CiDumbbell: <CiDumbbell className="CiDumbbell" />,
    AiOutlineQuestion: <AiOutlineQuestion className="AiOutlineQuestion" />,
  };
  return (
    <IconListsContainer>
      {icons.map((icon) => (
        <span key={icon} onClick={() => handleSelect(icon)}>
          {iconMap[icon]}
          {/* {icon === selectedIcon} */}
        </span>
      ))}
    </IconListsContainer>
  );
};
interface IconSelectorProps {
  initialIcon: string;
  icons: string[];
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  categoryId: number;
}

const IconSelector: React.FC<IconSelectorProps> = ({
  initialIcon,
  icons,
  isOpen,
  setIsOpen,
  categoryId,
}) => {
  const [selectedIcon, setSelectedIcon] = useState(initialIcon);
  const [isModal, setIsModal] = useState(false);
  const toggleList = (e?: React.MouseEvent<Element>) => {
    e && e.stopPropagation();
    setIsOpen(!isOpen);
    setIsModal(!isModal);
  };

  const handleSelect = (icon: string) => {
    setSelectedIcon(icon);
    toggleList();
  };

  useEffect(() => {
    if (!isOpen) {
      setIsModal(false);
    }
  }, [isOpen]);

  useEffect(() => {
    const patchIcon = async () => {
      try {
        await axios({
          url: `http://localhost:3001/data/${categoryId}`,
          method: 'patch',
          data: {
            categoryIcon: selectedIcon,
          },
        });
      } catch (err) {
        console.log(err);
      }
    };
    patchIcon();
  }, [selectedIcon]);

  return (
    <div>
      {selectedIcon === 'AiOutlineShopping' && (
        <AiOutlineShopping
          className="AiOutlineShopping"
          onClick={(e) => toggleList(e)}
        />
      )}
      {selectedIcon === 'MdFastfood' && (
        <MdFastfood className="MdFastfood" onClick={(e) => toggleList(e)} />
      )}
      {selectedIcon === 'BiCoffeeTogo' && (
        <BiCoffeeTogo className="BiCoffeeTogo" onClick={(e) => toggleList(e)} />
      )}
      {selectedIcon === 'IoLogoGameControllerA' && (
        <IoLogoGameControllerA
          className="IoLogoGameControllerA"
          onClick={(e) => toggleList(e)}
        />
      )}
      {selectedIcon === 'IoBeer' && (
        <IoBeer className="IoBeer" onClick={(e) => toggleList(e)} />
      )}
      {selectedIcon === 'MdOutlineLocalHospital' && (
        <MdOutlineLocalHospital
          className="MdOutlineLocalHospital"
          onClick={(e) => toggleList(e)}
        />
      )}
      {selectedIcon === 'GiLipstick' && (
        <GiLipstick className="GiLipstick" onClick={(e) => toggleList(e)} />
      )}
      {selectedIcon === 'GiAirplaneDeparture' && (
        <GiAirplaneDeparture
          className="GiAirplaneDeparture"
          onClick={(e) => toggleList(e)}
        />
      )}
      {selectedIcon === 'BiWon' && (
        <BiWon className="BiWon" onClick={(e) => toggleList(e)} />
      )}
      {selectedIcon === 'BsFillCarFrontFill' && (
        <BsFillCarFrontFill
          className="BsFillCarFrontFill"
          onClick={(e) => toggleList(e)}
        />
      )}
      {selectedIcon === 'IoIosSubway' && (
        <IoIosSubway className="IoIosSubway" onClick={(e) => toggleList(e)} />
      )}
      {selectedIcon === 'BsFillHouseFill' && (
        <BsFillHouseFill
          className="BsFillHouseFill"
          onClick={(e) => toggleList(e)}
        />
      )}
      {selectedIcon === 'GiPresent' && (
        <GiPresent className="GiPresent" onClick={(e) => toggleList(e)} />
      )}
      {selectedIcon === 'BiPhoneCall' && (
        <BiPhoneCall className="BiPhoneCall" onClick={(e) => toggleList(e)} />
      )}
      {selectedIcon === 'BsCart4' && (
        <BsCart4 className="BsCart4" onClick={(e) => toggleList(e)} />
      )}
      {selectedIcon === 'FaBabyCarriage' && (
        <FaBabyCarriage
          className="FaBabyCarriage"
          onClick={(e) => toggleList(e)}
        />
      )}
      {selectedIcon === 'IoMdSchool' && (
        <IoMdSchool className="IoMdSchool" onClick={(e) => toggleList(e)} />
      )}
      {selectedIcon === 'FaDog' && (
        <FaDog className="FaDog" onClick={(e) => toggleList(e)} />
      )}
      {selectedIcon === 'BiCameraMovie' && (
        <BiCameraMovie
          className="BiCameraMovie"
          onClick={(e) => toggleList(e)}
        />
      )}
      {selectedIcon === 'CiDumbbell' && (
        <CiDumbbell className="CiDumbbell" onClick={(e) => toggleList(e)} />
      )}
      {selectedIcon === 'AiOutlineQuestion' && (
        <AiOutlineQuestion
          className="AiOutlineQuestion"
          onClick={(e) => toggleList(e)}
        />
      )}
      {isModal && isOpen && (
        <IconList
          icons={icons}
          handleSelect={handleSelect}
          selectedIcon={selectedIcon}
          categoryId={categoryId}
        />
      )}
    </div>
  );
};
const Container = styled.div`
  .react-icons {
    color: white;
    font-size: 20px o !important;
    vertical-align: middle;
    padding: 10px;
    height: 50px;
    width: 50px;
    border: none;
    border-radius: 50%;
    cursor: pointer;
  }
`;
interface CategoryDropdownProps {
  categoryIcon: string;
  categoryId: number;
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}

const CategoryDropdown: React.FC<CategoryDropdownProps> = ({
  categoryIcon,
  categoryId,
  isOpen,
  setIsOpen,
}) => {
  const [selectedIcon, setSelectedIcon] = useState(categoryIcon);
  const icons = [
    'AiOutlineShopping',
    'MdFastfood',
    'BiCoffeeTogo',
    'IoLogoGameControllerA',
    'IoBeer',
    'MdOutlineLocalHospital',
    'GiLipstick',
    'GiAirplaneDeparture',
    'BiWon',
    'BsFillCarFrontFill',
    'IoIosSubway',
    'BsFillHouseFill',
    'GiPresent',
    'BiPhoneCall',
    'BsCart4',
    'FaBabyCarriage',
    'IoMdSchool',
    'FaDog',
    'BiCameraMovie',
    'CiDumbbell',
    'AiOutlineQuestion',
  ];

  return (
    <Container>
      <IconContext.Provider value={{ className: 'react-icons' }}>
        <IconSelector
          initialIcon={selectedIcon}
          icons={icons}
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          categoryId={categoryId}
        />
      </IconContext.Provider>
    </Container>
  );
};

export default CategoryDropdown;
