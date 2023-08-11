import React, { useEffect, useState } from 'react'
import "./Post.css"
import like from "../../img/like.png"
import notLike from "../../img/notLike.png"
import comment from "../../img/comment.png"
import share from "../../img/share.png";
import { useSelector } from 'react-redux';
import {likePost} from "../../api/PostsRequest";


import { getAllUser } from "../../api/UserRequest";
import Comments from '../comments/Comments'


const Post = ({data}) => {
  
  const {user}= useSelector((state)=>state.authReducer.authData);

  const serverPublic = process.env.REACT_APP_PUBLIC_FOLDER;

  
  const[liked, setLiked]= useState(data.likes.includes(user._id));
  const[likes, setLikes]= useState(data.likes.length);
 
  
// Like post and disslike
  const handleLike = () => {
    setLiked((prev) => !prev);
    // request server
    likePost(data._id, user._id);
    liked? setLikes((prev)=> prev-1) : setLikes((prev)=> prev+1)
  };


  const [persons, setPersons] = useState([]);

  useEffect(() => {
    const fetchPersons = async () => {
      const { data } = await getAllUser();
      setPersons(data);
    };
    fetchPersons();
  }, []);


  return (
    <div className="post">
       <div className="userInfos">

    {persons.map((person) => {
        if (person._id  === data?.userId){ return <img src={person.profilePicture? serverPublic + person.profilePicture: serverPublic + "defaultProfile.png"} alt="profileImage" /> }
      
      })}


     {persons.map((person) => {
        if (person._id  === data?.userId){ return <span>{person.firstname} {person.lastname}</span>}
      
      })}


       </div>
       <span>{data.desc}</span> 
        <img src={data.image?  process.env.REACT_APP_PUBLIC_FOLDER + data.image : ""} alt="postImg" />
        <div className="postReact">
            <img src={liked? like: notLike }  alt="" onClick={handleLike} />
            <img src={comment} alt="" />
            <img src={share} alt="" />
        </div>
        <div className="infos">
            <span>{ likes} Likes</span>
            <span>{data.comment} Comments</span>
        </div>
        <Comments />

    </div>
  )
}

export default Post