import React,{useState,useEffect} from 'react';
import {HiOutlineSearch} from  "react-icons/hi";
import {SlMenu} from "react-icons/sl";
import {VscChromeClose} from "react-icons/vsc";
import {useNavigate,useLocation} from "react-router-dom";
import ContentWrapper from '../contentWrapper/ContentWrapper';
import logo from "../../assets/movix-logo.svg";
import "./style.css"

const Header = () => {


  return (
    <header>
      <ContentWrapper>
        <div className="logo">
          <img src={logo} alt='Sitelogo'/>
        </div>
        <ul className="menuItems">
          <li className="items">Movies</li>
          <li className="items">TV Shows</li>
          <li className="items"><HiOutlineSearch/></li>
        </ul>
      </ContentWrapper>
    </header>
  )
}

export default Header
