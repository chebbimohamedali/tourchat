import React, {useState,useRef} from 'react'
import "./PostShare.css"
// import profileImg from "../../img/profileImg.avif"
import {UilScenery,UilPlayCircle, UilSchedule,UilLocationPoint,UilTimes} from "@iconscout/react-unicons"
import AddEventModal from "../addEventModal/AddEventModal"
import { useDispatch, useSelector } from 'react-redux'
import { uploadImage, uploadPost } from '../../actions/UploadAction'

const PostShare = () => {
   
  const loading= useSelector((state)=>state.postReducer.uploading)
   
   const[image, setImage]= useState(null);
   const imageRef= useRef();
   const[video, setVideo]=useState(null);
   const videoRef=useRef();
   const[modalOpened,setModalOpened]=useState(false);
   const{user}=useSelector((state)=>state.authReducer.authData);
   const desc= useRef();
   const dispatch=useDispatch();
  const serverPublic = process.env.REACT_APP_PUBLIC_FOLDER;


    // handle Image Change
   const onImageChange =(e)=>{
    if(e.target.files && e.target.files[0]) {
    let img = e.target.files[0];
    setImage(img);
  }};
  const onVideoChange=(e)=>{
    if(e.target.files && e.target.files[0]){
      let vid= e.target.files[0];
      setVideo(vid);
    }};

      // Reset Post Share
  const reset = () => {
    setImage(null);
    desc.current.value = "";
  };

    const handleSubmit= (e)=>{
      e.preventDefault();
       const newPost= {
        userId: user._id,
        desc: desc.current.value
       };

       if(image){
        const data = new FormData()
        const filename = Date.now()+ image.name;
        data.append("name", filename)
        data.append("file", image)
        newPost.image= filename;
        console.log(newPost)

        try {
          dispatch(uploadImage(data))
        } catch (error) {
          console.log(error)
        }
       }
       //Upload post
       dispatch(uploadPost(newPost));
       reset()
    }

  return (
 <div className="postShare">
      <img src={user.profilePicture? serverPublic + user.profilePicture: serverPublic + "defaultProfile.png"} alt="profileImage" />
    <div>
        <input ref={desc} required type="text" placeholder="what's new" />
         <div className="postOptions">
           <div className="option ph" onClick={()=>imageRef.current.click()}>
             <UilScenery/>
             Photo
           </div>
           <div className="option vi" onClick={()=>videoRef.current.click()}>
             <UilPlayCircle/>
             Video
           </div>
           <div className="option lo">
             <UilLocationPoint/>
             Location
           </div>
           <div className="option sh"  onClick={()=>setModalOpened(true)} >
            <UilSchedule />
             Event 
             <AddEventModal modalOpened={modalOpened} setModalOpened={setModalOpened}/>
           </div>
           <button className="button ps--button" disabled={loading} onClick={handleSubmit}>
            { loading? "Uploading...": "Share" }
           </button>
           <div style={{display:"none"}}>
            <input type="file" accept="image/png, image/jpeg, image/avif" name="myImage" ref={imageRef} onChange={onImageChange}/>
            <input type="file" accept="video/mp4,video/mkv, video/x-m4v,video/*" name="myVideo" ref={videoRef} onChange={onVideoChange} />
           </div>
         </div>   
         {
         image && (
         <div className="previewImage">
          <UilTimes onClick={()=>setImage(null) }/>
          <img src={URL.createObjectURL(image)} alt="preview" />
          </div>
         )}
         {
        video && (
          <div className="previewVideo">
            <UilTimes onClick={()=>setVideo(null)} />
            <video src={URL.createObjectURL(video)}  controls/>
          </div>
        )}
     </div>
 </div>
  );
};
export default PostShare