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
//   ImAirplane,
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
//       case 'ImAirplane':
//         setSelectedIcon(<ImAirplane />);
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
//                 <ImAirplane />
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
//         <ImAirplane />
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

import React, { useState } from 'react';
import {
  FiShoppingBag,
  MdFastfood,
  BiCoffeeTogo,
  IoLogoGameControllerA,
  IoBeer,
  MdOutlineLocalHospital,
  ImAirplane,
  BiWon,
  BsFillCarFrontFill,
  IoIosSubway,
  BsFillHouseFill,
  GiPresent,
  BiPhoneCall,
  BsCart4,
  BsPeopleFill,
} from 'react-icons/all';
import { IconContext } from 'react-icons/lib';
import styled from 'styled-components';

const Container = styled.div`
  .react-icons {
    color: white;
    font-size: 20px o !important;
    vertical-align: middle;
    padding: 15px;
    height: 60px;
    width: 60px;
    border: none;
    border-radius: 100%;
    background-color: lightblue;
  }
`;

interface IconListProps {
  icons: string[];
  onChange: (icon: string) => void;
  selectedIcon: string;
}

const IconList: React.FC<IconListProps> = ({
  icons,
  onChange,
  selectedIcon,
}) => {
  const iconMap: any = {
    FiShoppingBag: <FiShoppingBag />,
    MdFastfood: <MdFastfood />,
    BiCoffeeTogo: <BiCoffeeTogo />,
    IoLogoGameControllerA: <IoLogoGameControllerA />,
    IoBeer: <IoBeer />,
    MdOutlineLocalHospital: <MdOutlineLocalHospital />,
    ImAirplane: <ImAirplane />,
    BiWon: <BiWon />,
    BsFillCarFrontFill: <BsFillCarFrontFill />,
    IoIosSubway: <IoIosSubway />,
    BsFillHouseFill: <BsFillHouseFill />,
    GiPresent: <GiPresent />,
    BiPhoneCall: <BiPhoneCall />,
    BsCart4: <BsCart4 />,
    BsPeopleFill: <BsPeopleFill />,
  };

  return (
    <div>
      {icons.map((icon) => (
        <div key={icon} onClick={() => onChange(icon)}>
          {iconMap[icon]}
          {icon === selectedIcon}
        </div>
      ))}
    </div>
  );
};

interface IconSelectorProps {
  initialIcon: string;
  icons: string[];
  onChange: (icon: string) => void;
}

const IconSelector: React.FC<IconSelectorProps> = ({
  initialIcon,
  icons,
  onChange,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedIcon, setSelectedIcon] = useState(initialIcon);

  const toggleList = () => {
    setIsOpen(!isOpen);
  };

  const handleSelect = (icon: string) => {
    setSelectedIcon(icon);
    onChange(icon);
    toggleList();
  };

  return (
    <div>
      {selectedIcon === 'FiShoppingBag' && (
        <FiShoppingBag onClick={toggleList} />
      )}
      {selectedIcon === 'MdFastfood' && <MdFastfood onClick={toggleList} />}
      {selectedIcon === 'BiCoffeeTogo' && <BiCoffeeTogo onClick={toggleList} />}
      {selectedIcon === 'IoLogoGameControllerA' && (
        <IoLogoGameControllerA onClick={toggleList} />
      )}
      {selectedIcon === 'IoBeer' && <IoBeer onClick={toggleList} />}
      {selectedIcon === 'MdOutlineLocalHospital' && (
        <MdOutlineLocalHospital onClick={toggleList} />
      )}
      {selectedIcon === 'ImAirplane' && <ImAirplane onClick={toggleList} />}
      {selectedIcon === 'BiWon' && <BiWon onClick={toggleList} />}
      {selectedIcon === 'BsFillCarFrontFill' && (
        <BsFillCarFrontFill onClick={toggleList} />
      )}
      {selectedIcon === 'IoIosSubway' && <IoIosSubway onClick={toggleList} />}
      {selectedIcon === 'BsFillHouseFill' && (
        <BsFillHouseFill onClick={toggleList} />
      )}
      {selectedIcon === 'GiPresent' && <GiPresent onClick={toggleList} />}
      {selectedIcon === 'BiPhoneCall' && <BiPhoneCall onClick={toggleList} />}
      {selectedIcon === 'BsCart4' && <BsCart4 onClick={toggleList} />}
      {selectedIcon === 'BsPeopleFill' && <BsPeopleFill onClick={toggleList} />}
      {isOpen && (
        <IconList
          icons={icons}
          onChange={handleSelect}
          selectedIcon={selectedIcon}
        />
      )}
    </div>
  );
};

const CategoryDropdown: React.FC = () => {
  const [selectedIcon, setSelectedIcon] = useState('FiShoppingBag');
  const icons = [
    'FiShoppingBag',
    'MdFastfood',
    'BiCoffeeTogo',
    'IoLogoGameControllerA',
    'IoBeer',
    'MdOutlineLocalHospital',
    'ImAirplane',
    'BiWon',
    'BsFillCarFrontFill',
    'IoIosSubway',
    'BsFillHouseFill',
    'GiPresent',
    'BiPhoneCall',
    'BsCart4',
    'BsPeopleFill',
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
        />
      </IconContext.Provider>
    </Container>
  );
};

export default CategoryDropdown;
