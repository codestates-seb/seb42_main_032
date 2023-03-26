import {
  AiOutlineShopping,
  MdFastfood,
  BiCoffeeTogo,
  IoLogoGameControllerA,
  IoBeer,
  MdOutlineLocalHospital,
  GiLipstick,
  GiAirplaneDeparture,
  BiWon,
  BsFillCarFrontFill,
  IoIosSubway,
  BsFillHouseFill,
  GiPresent,
  BiPhoneCall,
  BsCart4,
  FaBabyCarriage,
  IoMdSchool,
  FaDog,
  BiCameraMovie,
  CiDumbbell,
  AiOutlineQuestion,
} from 'react-icons/all';
import styled from 'styled-components';
import { IconContext } from 'react-icons/lib';

const Icon = styled.div`
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

export const CategoryIdMap: { [key: number]: string } = {
  1: 'AiOutlineShopping',
  2: 'MdFastfood',
  3: 'BiCoffeeTogo',
  4: 'IoLogoGameControllerA',
  5: 'IoBeer',
  6: 'MdOutlineLocalHospital',
  7: 'GiLipstick',
  8: 'GiAirplaneDeparture',
  9: 'BiWon',
  10: 'BsFillCarFrontFill',
  11: 'IoIosSubway',
  12: 'BsFillHouseFill',
  13: 'GiPresent',
  14: 'BiPhoneCall',
  15: 'BsCart4',
  16: 'FaBabyCarriage',
  17: 'IoMdSchool',
  18: 'FaDog',
  19: 'BiCameraMovie',
  20: 'CiDumbbell',
  21: 'AiOutlineQuestion',
};

const CategoryIcon = ({ icon }: { icon: string }) => {
  return (
    <Icon className="react-icons">
      <IconContext.Provider value={{ className: 'react-icons' }}>
        {icon === 'AiOutlineShopping' && (
          <AiOutlineShopping className="AiOutlineShopping" />
        )}
        {icon === 'MdFastfood' && <MdFastfood className="MdFastfood" />}
        {icon === 'BiCoffeeTogo' && <BiCoffeeTogo className="BiCoffeeTogo" />}
        {icon === 'IoLogoGameControllerA' && (
          <IoLogoGameControllerA className="IoLogoGameControllerA" />
        )}
        {icon === 'IoBeer' && <IoBeer className="IoBeer" />}
        {icon === 'MdOutlineLocalHospital' && (
          <MdOutlineLocalHospital className="MdOutlineLocalHospital" />
        )}
        {icon === 'GiLipstick' && <GiLipstick className="GiLipstick" />}
        {icon === 'GiAirplaneDeparture' && (
          <GiAirplaneDeparture className="GiAirplaneDeparture" />
        )}
        {icon === 'BiWon' && <BiWon className="BiWon" />}
        {icon === 'BsFillCarFrontFill' && (
          <BsFillCarFrontFill className="BsFillCarFrontFill" />
        )}
        {icon === 'IoIosSubway' && <IoIosSubway className="IoIosSubway" />}
        {icon === 'BsFillHouseFill' && (
          <BsFillHouseFill className="BsFillHouseFill" />
        )}
        {icon === 'GiPresent' && <GiPresent className="GiPresent" />}
        {icon === 'BiPhoneCall' && <BiPhoneCall className="BiPhoneCall" />}
        {icon === 'BsCart4' && <BsCart4 className="BsCart4" />}
        {icon === 'FaBabyCarriage' && (
          <FaBabyCarriage className="FaBabyCarriage" />
        )}
        {icon === 'IoMdSchool' && <IoMdSchool className="IoMdSchool" />}
        {icon === 'FaDog' && <FaDog className="FaDog" />}
        {icon === 'BiCameraMovie' && (
          <BiCameraMovie className="BiCameraMovie" />
        )}
        {icon === 'CiDumbbell' && <CiDumbbell className="CiDumbbell" />}
        {icon === 'AiOutlineQuestion' && (
          <AiOutlineQuestion className="AiOutlineQuestion" />
        )}
      </IconContext.Provider>
    </Icon>
  );
};

export default CategoryIcon;
