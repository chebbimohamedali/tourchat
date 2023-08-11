import React, { useEffect, useState } from 'react'
import "./FollowersCard.css"
import User from '../user/User'
import { useSelector } from 'react-redux'
import {getAllUser} from "../../api/UserRequest"
import FollowersModal from '../followersModal/FollowersModal'


const FollowersCard = ({ location }) => {

  const[persons, setPersons]= useState([]);
  const {user}= useSelector((state)=>state.authReducer.authData);
  const [modalOpened, setModalOpened] = useState(false);

  useEffect(()=>{
     const fetchPersons= async()=>{
      const {data}= await getAllUser();
      setPersons(data)
      console.log(data)
     };
     fetchPersons()
  }, []);

  return (

    <div className="followersCard">
        <h3> You probably know those </h3>
       { persons.map((person, id)=>{ 
          if(person._id !== user._id) return <User person={person} key={id} />;
       })}
{!location ? (
  <span onClick={() => setModalOpened(true)}>Show more</span>
  ) : (
    ""
    )}
      <FollowersModal modalOpened={modalOpened} setModalOpened={setModalOpened} />
</div>

  );
};

export default FollowersCard