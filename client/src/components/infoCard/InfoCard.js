import React, { useEffect, useState } from 'react'
import "./InfoCard.css"
import {UilPen} from "@iconscout/react-unicons"
import ProfileModal from "../profileModal/ProfileModal"
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import * as UserApi from "../../api/UserRequest.js";

const InfoCard = () => {

  const [modalOpened, setModalOpened] = useState(false);
  const dispatch = useDispatch()
  const params = useParams();
  const profileUserId = params.id;
  const [profileUser, setProfileUser] = useState({});
  const { user } = useSelector((state) => state.authReducer.authData);

// fetch profile user
  useEffect(() => {
    const fetchProfileUser = async () => {
      if (profileUserId === user._id) {
        setProfileUser(user);
        // console.log(user)
      } else {
        const profileUser = await UserApi.getUser(profileUserId);
        setProfileUser(profileUser);
        // console.log(profileUser)
      }
    };
    fetchProfileUser();
  }, [user]);

  return (
    <div className="infoCard">
      <div className="infoHead">
        <h3>Profile Info</h3>
        {user._id === profileUserId ? (
                  <div>
                  <UilPen onClick={()=>setModalOpened(true)} />
                  <ProfileModal modalOpened={modalOpened} setModalOpened={setModalOpened} data={user} />
          
                  </div>
        ): ("") }

      </div>
      <div className="info">
        <span><b>First name: </b></span>
        <span>{user.firstname}</span>
      </div>
      <div className="info">
        <span><b>Last name: </b></span>
        <span> {user.lastname}</span>
      </div>
      <div className="info">
        <span><b>Job: </b></span>
        <span>{profileUser.worksAt}</span>
      </div>
      <div className="info">
        <span><b>Place of residence: </b></span>
        <span>{profileUser.livesin}</span>
      </div>
      <div className="info">
        <span><b>Relationship Status: </b></span>
        <span>{profileUser.relationship}</span>
      </div>
    </div>
  )
}

export default InfoCard