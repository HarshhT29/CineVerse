import React, { useState, useEffect } from 'react';
import { HiOutlineSearch } from "react-icons/hi";
import { SlMenu } from "react-icons/sl";
import { VscChromeClose } from "react-icons/vsc";
import { useNavigate, useLocation } from "react-router-dom";
import ContentWrapper from '../contentWrapper/ContentWrapper';
import logo from "../../assets/cineVerseLogo.png";
import "./style.css"

const Navbar = () => {
  const [menu, setMenu] = useState(false);
  const [search, setSearch] = useState(false);
  const [inp, setInp] = useState("");
  const [nav, setNav] = useState("top");
  const [prevScroll, setPrevScroll] = useState(0);
  const loc = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0); //naye page pe jaane ke baad scroll upar se hi chalu hona chahiye
  }, [loc]);

  const openSearch = () => {
    setMenu(false);
    setSearch(true);
  }
  const openMenu = () => {
    setMenu(true);
    setSearch(false);
  }
  const inpHandler = (e) => {
    if (e.key === "Enter" && inp.length > 0) {
      navigate(`/search/${inp}`);
      setTimeout(() => {
        setSearch(false);
      }, 1000)
    }
    setInp(e.target.value);
  };
  const navigationHandler = (type) => {
    navigate(`/explore/${type}`);
    setMenu(false);
    setSearch(false);
  }
  const scrollController = () => {
    if (window.scrollY > 250) {
      if (window.scrollY > prevScroll && !menu) {
        setNav("hide");
      } else {
        setNav("show");
      }
    } else {
      setNav("top");
    }
    setPrevScroll(window.scrollY);
  }
  useEffect(() => {
    window.addEventListener("scroll", scrollController);
    return () => { window.removeEventListener("scroll", scrollController) };  //leak problem if not remove listener
  }, [prevScroll]);

  return (
    <header className={`header fixed w-full h-[60px] flex items-center transition-all duration-300 ease-out z-[2] ${menu ? 'bg-[--black] md:bg-[#00000040]' : ''} ${nav}`}>
      <ContentWrapper className="flex items-center justify-between">
        <div className="logo cursor-pointer" onClick={() => {navigate("/");setMenu(false);setSearch(false);}}>
          <img src={logo} alt='Sitelogo' className='h-[41.5px] md:h-12' />
        </div>
        <ul className={`menuItems ${menu ? 'extra md:hidden' : 'hidden'} list-none items-center md:flex`}>
          <li className={`itemsEle ${menu ? 'extra1' : ''}`} onClick={() => { navigationHandler("movie") }}>Movies</li>
          <li className={`itemsEle ${menu ? 'extra1' : ''}`} onClick={() => { navigationHandler("tv") }}>TV Shows</li>
          <li className="hidden md:flex h-[60px] items-center text-[white] font-medium relative cursor-pointer mx-[15px] my-0"><HiOutlineSearch className='text-white' onClick={openSearch} /></li>
        </ul>
        <div className="mobileView flex items-center gap-5 md:hidden">
          <HiOutlineSearch className='text-white' onClick={openSearch} />
          {menu ? <VscChromeClose className='text-white' onClick={() => setMenu(false)} /> : <SlMenu className='text-white' onClick={openMenu} />}
        </div>
      </ContentWrapper>
      {search && (
        <div className="searchBar w-full h-[60px] bg-white absolute top-14">
          <ContentWrapper className={"flex items-center justify-between"}>
            <div className="searchInput flex items-center w-full h-[40px] m-2">
              <input type="text" placeholder="Search"
                onChange={inpHandler} value={inp}
                onKeyUp={inpHandler} className="w-full h-[50px] bg-white outline-0 border-0 rounded-tl-3xl rounded-bl-3xl rounded-tr-none rounded-br-none py-0 px-4 text-[14px] md:text-xl md:px-7 text-black" />
              <VscChromeClose className='text-xl flex-shrink-0 ml-2 cursor-pointer' onClick={() => setSearch(false)} />
            </div>
          </ContentWrapper>
        </div>
      )}
    </header>
  )
}

export default Navbar;
