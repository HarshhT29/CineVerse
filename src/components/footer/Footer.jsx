import React from 'react';
import { FaFacebookF, FaInstagram, FaTwitter, FaLinkedin,} from 'react-icons/fa';
import ContentWrapper from '../contentWrapper/ContentWrapper';
import "./style.css"

const Footer = () => {
  return (
    <footer className="footer bg-[var(--black3)] py-12 px-0 text-white relative">
      <ContentWrapper className={"flex items-center flex-col"}>
        <ul className="menuItems list-none flex items-center justify-center gap-4 mb-5 md:mb-7 md:gap-7">
          <li className="itemsEle">Terms Of Use</li>
          <li className="itemsEle">Privacy Policy</li>
          <li className="itemsEle">About</li>
          <li className="itemsEle">Blog</li>
          <li className="itemsEle">FAQ</li>
        </ul>
        <div className="infoText text-xs opacity-50 text-center max-w-3xl mb-5 md:text-[14px] md:mb-7">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
          do eiusmod tempor incididunt ut labore et dolore magna
          aliqua. Ut enim ad minim veniam, quis nostrud exercitation
          ullamco laboris nisi ut aliquip ex ea commodo consequat.
          Duis aute irure dolor in reprehenderit in voluptate velit
          esse cillum dolore eu fugiat nulla pariatur.
        </div>
        <div className="socialIcons flex items-center justify-center gap-2">
          <span className="icon"><FaFacebookF /></span>
          <span className="icon"><FaInstagram /></span>
          <span className="icon"><FaTwitter /></span>
          <span className="icon"><FaLinkedin /></span>
        </div>
      </ContentWrapper>
    </footer>
  )
}

export default Footer
