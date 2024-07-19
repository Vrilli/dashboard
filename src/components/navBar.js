import React from 'react';
import { Link } from 'react-router-dom';
import { TbHomeMove } from "react-icons/tb";
import { MdYoutubeSearchedFor } from "react-icons/md";
import { IoMdBook } from "react-icons/io";
import { BsBookmarkDash } from "react-icons/bs";
import { TbHexagonNumber0 } from "react-icons/tb";



const LeftNav = () => {
  return (
    <nav className="left-nav">
      <ul>
        <li><Link to="/dashboard"><TbHomeMove /></Link></li>  
        <li><Link to=""><MdYoutubeSearchedFor /></Link></li>
        <li><Link to=""><IoMdBook /></Link></li>
        <li><Link to=""><BsBookmarkDash /></Link></li>
        <li><Link to=""><TbHexagonNumber0 /></Link></li>
      </ul>
    </nav>
  );
};

export default LeftNav;
