import React, { useState } from 'react'
import "./RightSide.css"
import home from "../../img/home.png"
import message from "../../img/message.png"
import notification from "../../img/notification.png"
import setting from "../../img/setting.png"
import { Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { logout } from '../../actions/AuthAction'
import TrendCard from '../trendCard/TrendCard'
import ShareModal from "../shareModal/ShareModal";


const RightSide = () => {
 
  const [modalOpened, setModalOpened] = useState(false);
  const[open, setOpen]=useState(false);
  const dispatch = useDispatch()

  const handleLogOut = ()=> {
    dispatch(logout())
  } 

  return (
    <div className="rightSide">
       <div className="navBarIcons">
        <Link to= '../home'> <img src={home} alt="" /> </Link> 
        <Link to='../chat'> <img src={message} alt="" /> </Link>
         <img src={notification} alt="" />
         <div className='dropdown-container'>
          <img src={setting} alt="" onClick={()=>setOpen(!open)} />
{ open && 

          <div className='dropdownItem'>
          <ul>
            <li>Setting</li>
            <li  onClick={handleLogOut}> Log out</li>
          </ul>
        </div>
}
         </div>
       </div>
      {/* TrendCard */}
      <TrendCard />

            {/* Share buttong */}
            <button className="button r-button" onClick={() => setModalOpened(true)}>
        Share
      </button>
      <ShareModal modalOpened={modalOpened} setModalOpened={setModalOpened} />

    </div>
  )
}

export default RightSide