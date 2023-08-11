import React from 'react'
import logoo from '../../img/logoo.png';
import {UilSearch} from "@iconscout/react-unicons"
import "./LogoSearch.css"
import { Link } from 'react-router-dom';

const LogoSearch = () => {
  return (
    <div className="logoSearch">
        <Link to= '../home'> <img src={logoo} alt="" className="logo" /> </Link>
      <div className="search">
        <input type="text" placeholder="Search" />
        <div className="s-icon">
          <UilSearch />
        </div>
      </div>
    </div>
  )
}

export default LogoSearch