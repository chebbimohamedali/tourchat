import { addMessage, getMessages } from "../../api/MessageRequests";
import { getUser } from "../../api/UserRequest";
import "./ChatBox.css";
import React, { useEffect, useRef, useState } from 'react'
import { format } from "timeago.js";
import InputEmoji from "react-input-emoji";
import {UilVideo, UilPhone, UilChatInfo} from "@iconscout/react-unicons"

const ChatBox = ({ chat, currentUser, setSendMessage, receivedMessage }) => {

    const [userData, setUserData] = useState(null);
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState("");
    const scroll = useRef();
    const imageRef = useRef();

    // fetching data for header
    useEffect(() => {
        const userId = chat?.members?.find((id) => id !== currentUser);
        const getUserData = async () => {
          try {
            const { data } = await getUser(userId);
            setUserData(data);
            // console.log(data)
          } catch (error) {
            console.log(error);
          }
        };
    
        if (chat !== null) getUserData();
      }, [chat, currentUser]);

        // fetch data for messages
  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const { data } = await getMessages(chat._id);
        setMessages(data);
        // console.log(data)
      } catch (error) {
        console.log(error);
      }
    };

    if (chat !== null) fetchMessages();
  }, [chat]);

  const handleChange = (newMessage)=> {
    setNewMessage(newMessage)
  }

    // Send Message 
    const handleSend = async(e)=> {
      e.preventDefault()
      const message = {
        senderId : currentUser,
        text: newMessage,
        chatId: chat._id,
    }
    // send message to socket server
    const receiverId = chat.members.find((id)=>id!==currentUser);
    setSendMessage({...message, receiverId})
    // send message to database
    try {
      const { data } = await addMessage(message);
      setMessages([...messages, data]);
      setNewMessage("");
    }
    catch
    {
      console.log("error")
    }}

  // Receive Message from parent component
useEffect(()=> {
  if (receivedMessage !== null && receivedMessage.chatId === chat._id) {
    setMessages([...messages, receivedMessage]);
    console.log("Message Arrived: ", receivedMessage)
  }},[receivedMessage])

  // Always scroll to last Message
  useEffect(()=> {
    scroll.current?.scrollIntoView({ behavior: "smooth" });
  },[messages])



  return (
    <>
    <div className="ChatBox-container">
      {chat ? (
        <>
          {/* chat-header */}
          <div className="chat-header">
            <div className="follower">
              <div>
                <img src={userData?.profilePicture? process.env.REACT_APP_PUBLIC_FOLDER + userData.profilePicture: process.env.REACT_APP_PUBLIC_FOLDER + "defaultProfile.png"} alt="Profile"  className="followerImg"
                  style={{ width: "50px", height: "50px" }} />
                <div className="name" style={{ fontSize: "0.9rem" }}>
                  <span> {userData?.firstname} {userData?.lastname}  </span>


                    {/* <div className="chat-icons">
                    <UilPhone />
                    <UilVideo />
                    <UilChatInfo />
                    </div> */}



                </div>
              </div>
            </div>
            <hr style={{ width: "95%", border: "0.1px solid #ececec", marginTop: "20px",}} />
          </div>

          {/* chat-body */}

          <div className="chat-body" >
            {messages.map((message) => (
              <>
                <div className= {message.senderId === currentUser? "message own": "message"} ref={scroll} >
                  <span>{message.text}</span>{" "}
                  <span>{format(message.createdAt)}</span>
                </div>
              </>
            ))}
          </div>

          {/* chat-sender */}
          <div className="chat-sender">
            <div 
            onClick={() => imageRef.current.click()}
            >+</div>
            <InputEmoji value={newMessage} onChange={handleChange} />
            <div 
            className="send-button button" onClick = {handleSend} > Send </div>
            <input
              type="file"
              name=""
              id=""
              style={{ display: "none" }}
              ref={imageRef}
            />
          </div>{" "}
        </>
      ) 
      : (
        <span className="chatbox-empty-message">
          Tap on a chat to start conversation...
        </span>
      )
      }
    </div>
  </>
);
};

export default ChatBox;