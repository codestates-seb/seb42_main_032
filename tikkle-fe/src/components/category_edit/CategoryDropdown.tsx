import axios from 'axios';
import React, { useState, Dispatch, SetStateAction, useEffect } from 'react';
import {
  FiShoppingBag,
  MdFastfood,
  BiCoffeeTogo,
  IoLogoGameControllerA,
  IoBeer,
  MdOutlineLocalHospital,
  BsFillAirplaneFill,
  BiWon,
  BsFillCarFrontFill,
  IoIosSubway,
  BsFillHouseFill,
  GiPresent,
  BiPhoneCall,
  BsCart4,
  BsPeopleFill,
  AiOutlineQuestion,
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
    FiShoppingBag: <FiShoppingBag className="FiShoppingBag" />,
    MdFastfood: <MdFastfood className="MdFastfood" />,
    BiCoffeeTogo: <BiCoffeeTogo className="BiCoffeeTogo" />,
    IoLogoGameControllerA: (
      <IoLogoGameControllerA className="IoLogoGameControllerA" />
    ),
    IoBeer: <IoBeer className="IoBeer" />,
    MdOutlineLocalHospital: (
      <MdOutlineLocalHospital className="MdOutlineLocalHospital" />
    ),
    BsFillAirplaneFill: <BsFillAirplaneFill className="BsFillAirplaneFill" />,
    BiWon: <BiWon className="BiWon" />,
    BsFillCarFrontFill: <BsFillCarFrontFill className="BsFillCarFrontFill" />,
    IoIosSubway: <IoIosSubway className="IoIosSubway" />,
    BsFillHouseFill: <BsFillHouseFill className="BsFillHouseFill" />,
    GiPresent: <GiPresent className="GiPresent" />,
    BiPhoneCall: <BiPhoneCall className="BiPhoneCall" />,
    BsCart4: <BsCart4 className="BsCart4" />,
    BsPeopleFill: <BsPeopleFill className="BsPeopleFill" />,
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
      {selectedIcon === 'FiShoppingBag' && (
        <FiShoppingBag
          className="FiShoppingBag"
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
      {selectedIcon === 'BsFillAirplaneFill' && (
        <BsFillAirplaneFill
          className="BsFillAirplaneFill"
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
      {selectedIcon === 'BsPeopleFill' && (
        <BsPeopleFill className="BsPeopleFill" onClick={(e) => toggleList(e)} />
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
    'FiShoppingBag',
    'MdFastfood',
    'BiCoffeeTogo',
    'IoLogoGameControllerA',
    'IoBeer',
    'MdOutlineLocalHospital',
    'BsFillAirplaneFill',
    'BiWon',
    'BsFillCarFrontFill',
    'IoIosSubway',
    'BsFillHouseFill',
    'GiPresent',
    'BiPhoneCall',
    'BsCart4',
    'BsPeopleFill',
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
