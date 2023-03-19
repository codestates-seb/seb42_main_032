// import styled from 'styled-components';
// import { Menu, MenuButton, MenuList, MenuItem } from '@chakra-ui/react';
// import { ChevronDownIcon, ChevronRightIcon } from '@chakra-ui/icons';
// import { useEffect, useState } from 'react';
// import {
//   FiShoppingBag,
//   MdFastfood,
//   BiCoffeeTogo,
//   IoLogoGameControllerA,
//   IoBeer,
//   MdOutlineLocalHospital,
//   BsFillAirplaneFill,
//   BiWon,
//   BsFillCarFrontFill,
//   IoIosSubway,
//   BsFillHouseFill,
//   GiPresent,
//   BiPhoneCall,
//   BsCart4,
//   BsPeopleFill,
// } from 'react-icons/all';
// import { IconType, IconContext } from 'react-icons/lib';

// const DropdownContainer = styled.div`
//   font-family: 'GmarketSansMedium';
//   .categry-icon__div {
//     background-color: lightblue;
//     padding: 10px;
//     border-radius: 100%;
//     font-size: 30px;
//   }
// `;
// const Dropdown = styled.div`
//   .react-icons {
//     color: white;
//     font-size: 20px o !important;
//     vertical-align: middle;
//     padding: 15px;
//     height: 60px;
//     width: 60px;
//     border: none;
//     border-radius: 100%;
//     background-color: lightblue;
//   }
// `;

// const DropdownLists = styled.ul`
//   li {
//   }
//   .react-icons {
//     color: white;
//     font-size: 20px o !important;
//     vertical-align: middle;
//     padding: 15px;
//     height: 60px;
//     width: 60px;
//     border: none;
//     border-radius: 100%;
//   }
// `;

// const CategoryDropdown: React.FC = () => {
//   const selectedIconName: string = '';
//   const [selectedIcon, setSelectedIcon] = useState(<FiShoppingBag />);
//   const [isClick, setIsClick] = useState(false);

//   useEffect(() => {
//     switch (selectedIconName) {
//       case 'FiShoppingBag':
//         setSelectedIcon(<FiShoppingBag color="yellow" />);
//         break;
//       case 'MdFastfood':
//         setSelectedIcon(<MdFastfood />);
//         break;
//       case 'BiCoffeeTogo':
//         setSelectedIcon(<BiCoffeeTogo />);
//         break;
//       case 'IoLogoGameControllerA':
//         setSelectedIcon(<IoLogoGameControllerA />);
//         break;
//       case 'IoBeer':
//         setSelectedIcon(<IoBeer />);
//         break;
//       case 'MdOutlineLocalHospital':
//         setSelectedIcon(<MdOutlineLocalHospital />);
//         break;
//       case 'BsFillAirplaneFill':
//         setSelectedIcon(<BsFillAirplaneFill />);
//         break;
//       case 'BiWon':
//         setSelectedIcon(<BiWon />);
//         break;
//       case 'BsFillCarFrontFill':
//         setSelectedIcon(<BsFillCarFrontFill />);
//         break;
//       case 'IoIosSubway':
//         setSelectedIcon(<IoIosSubway />);
//         break;
//       case 'BsFillHouseFill':
//         setSelectedIcon(<BsFillHouseFill />);
//         break;
//       case 'GiPresent':
//         setSelectedIcon(<GiPresent />);
//         break;
//       case 'BiPhoneCall':
//         setSelectedIcon(<BiPhoneCall />);
//         break;
//       case 'BsCart4':
//         setSelectedIcon(<BsCart4 />);
//         break;
//       case 'BsPeopleFill':
//         setSelectedIcon(<BsPeopleFill />);
//         break;
//       default:
//         setSelectedIcon(<FiShoppingBag />);
//     }
//   }, []);

//   const handleClickCategory = () => {
//     setIsClick(!isClick);
//   };

//   const handleClickIcon = (e: React.MouseEvent<SVGElement>) => {
//     console.log(e.target);
//   };

//   return (
//     <DropdownContainer className="drop">
//       <IconContext.Provider value={{ className: 'react-icons' }}>
//         <Dropdown onClick={handleClickCategory}>
//           {selectedIcon}
//           {isClick ? (
//             <DropdownLists>
//               <li>
//                 <FiShoppingBag
//                   onClick={(e) => {
//                     e.stopPropagation();
//                     handleClickIcon(e);
//                   }}
//                   className="FiShoppingBag"
//                   id="FiShoppingBag"
//                 />
//               </li>
//               <li>
//                 <MdFastfood values="MdFastfood" />
//               </li>
//               <li>
//                 <BiCoffeeTogo />
//               </li>
//               <li>
//                 <IoBeer />
//               </li>
//               <li>
//                 <IoLogoGameControllerA />
//               </li>
//               <li>
//                 <MdOutlineLocalHospital />
//               </li>
//               <li>
//                 <BsFillAirplaneFill />
//               </li>
//               <li>
//                 <BiWon />
//               </li>
//               <li>
//                 <BsFillCarFrontFill />
//               </li>
//               <li>
//                 <IoIosSubway />
//               </li>
//               <li>
//                 <BsFillHouseFill />
//               </li>
//               <li>
//                 <GiPresent />
//               </li>
//               <li>
//                 <BiPhoneCall />
//               </li>
//               <li>
//                 <BsCart4 />
//               </li>
//               <li>
//                 <BsPeopleFill />
//               </li>
//             </DropdownLists>
//           ) : (
//             ''
//           )}
//         </Dropdown>
//         {/* {isClick ? (
//         <DropdownLists>
//         <IconContext.Provider value={{ className: 'react-icons' }}>
//         <li>
//         <FiShoppingBag className="FiShoppingBag" />
//         </li>
//         <li>
//         <MdFastfood />
//         </li>
//         <li>
//         <BiCoffeeTogo />
//         </li>
//         <li>
//         <IoBeer />
//         </li>
//         <li>
//         <IoLogoGameControllerA />
//         </li>
//         <li>
//         <MdOutlineLocalHospital />
//         </li>
//         <li>
//         <BsFillAirplaneFill />
//         </li>
//         <li>
//         <BiWon />
//         </li>
//         <li>
//         <BsFillCarFrontFill />
//         </li>
//         <li>
//         <IoIosSubway />
//         </li>
//         <li>
//         <BsFillHouseFill />
//         </li>
//         <li>
//         <GiPresent />
//         </li>
//         <li>
//         <BiPhoneCall />
//         </li>
//         <li>
//         <BsCart4 />
//         </li>
//         <li>
//         <BsPeopleFill />
//         </li>
//         </IconContext.Provider>
//         </DropdownLists>
//         ) : (
//           ''
//         )} */}
//       </IconContext.Provider>
//     </DropdownContainer>
//   );
// };

// export default CategoryDropdown;

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
  onChange: (icon: string) => void;
  selectedIcon: string;
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
  onChange,
  selectedIcon,
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
        <span key={icon} onClick={() => onChange(icon)}>
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
  onChange: (icon: string) => void;
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}

const IconSelector: React.FC<IconSelectorProps> = ({
  initialIcon,
  icons,
  onChange,
  isOpen,
  setIsOpen,
}) => {
  // const [isOpen, setIsOpen] = useState(false);
  const [selectedIcon, setSelectedIcon] = useState(initialIcon);
  const [isModal, setIsModal] = useState(false);
  const toggleList = (e?: React.MouseEvent<Element>) => {
    e && e.stopPropagation();
    setIsOpen(!isOpen);
    setIsModal(!isModal);
  };

  const handleSelect = (icon: string) => {
    setSelectedIcon(icon);
    onChange(icon);
    toggleList();
  };

  useEffect(() => {
    if (!isOpen) {
      setIsModal(false);
    }
  }, [isOpen]);

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
          onChange={handleSelect}
          selectedIcon={selectedIcon}
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
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}

const CategoryDropdown: React.FC<CategoryDropdownProps> = ({
  categoryIcon,
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

  const handleIconChange = (icon: string) => {
    setSelectedIcon(icon);
  };

  return (
    <Container>
      <IconContext.Provider value={{ className: 'react-icons' }}>
        <IconSelector
          initialIcon={selectedIcon}
          icons={icons}
          onChange={handleIconChange}
          isOpen={isOpen}
          setIsOpen={setIsOpen}
        />
      </IconContext.Provider>
    </Container>
  );
};

export default CategoryDropdown;
