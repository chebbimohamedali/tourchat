import React, { useEffect, useRef, useState } from 'react';
import "./Chat.css";
import LogoSearch from "../../components/logoSearch/LogoSearch";
import {useDispatch, useSelector} from "react-redux";
import { userChats } from '../../api/ChatRequests';
import Conversation from '../../components/coversation/Conversation';
import { Link } from 'react-router-dom';
import { logout } from '../../actions/AuthAction';
import home from "../../img/home.png"
import message from "../../img/message.png"
import notification from "../../img/notification.png"
import setting from "../../img/setting.png"
import ChatBox from '../../components/chatBox/ChatBox';
import { io } from "socket.io-client";

const Chat = () => {

    const[open, setOpen]=useState(false);
    const dispatch = useDispatch()
  
    const handleLogOut = ()=> {
      dispatch(logout())
    } 


    const { user } = useSelector((state) => state.authReducer.authData);
    console.log(user)


  
    const [chats, setChats] = useState([]);
    const [currentChat, setCurrentChat] = useState(null);
    const socket = useRef();
    const [onlineUsers, setOnlineUsers] = useState([]);
    const [sendMessage, setSendMessage] = useState(null);
    const [receivedMessage, setReceivedMessage] = useState(null);

 // Get the chat in chat section
    useEffect(() => {
      const getChats = async () => {
        try {
          const { data } = await userChats(user._id);
          setChats(data);
        } catch (error) {
          console.log(error);
        }
      };
      getChats();
    }, [user._id]);

      // Connect to Socket.io
  useEffect(() => {
    socket.current = io("ws://localhost:8800");
    socket.current.emit("new-user-add", user._id);
    socket.current.on("get-users", (users) => {
      setOnlineUsers(users);
      // console.log(onlineUsers)
    });
  }, [user]);

    // Send Message to socket server
    useEffect(() => {
      if (sendMessage!==null) {
        socket.current.emit("send-message", sendMessage);}
    }, [sendMessage]);


      // Get the message, Recive message from socket server
  useEffect(() => {
    socket.current.on("recieve-message", (data) => {
      console.log(data)
      setReceivedMessage(data);
    }

    );
  }, []);


  const checkOnlineStatus = (chat) => {
    const chatMember = chat.members.find((member) => member !== user._id);
    const online = onlineUsers.find((user) => user.userId === chatMember);
    return online ? true : false;
  };
  


  return (

    <div className="Chat">
    {/* Left Side */}
    <div className="Left-side-chat">
      <LogoSearch />
      <div className="Chat-container">
        <h2>Chats</h2>
        <div className="Chat-list">

        {chats.map((chat) => (
              <div onClick={() => {setCurrentChat(chat); }}>
                <Conversation data={chat} currentUser={user._id}  online={checkOnlineStatus(chat)} />
              </div>
            ))}
        </div>
      </div>
    </div>

          {/* Right Side */}
    <div className="Right-side-chat">
        <div style={{ width: "20rem", alignSelf: "flex-end" }}>
         
    <div className="navBarIcons">
        <Link to= '../home'> <img src={home} alt="" /> </Link> 
        <Link to='../chat'> <img src={message} alt="" /> </Link>
         <img src={notification} alt="" />
        <div className='dropdown-container'>
          <img src={setting} alt="" onClick={()=>setOpen(!open)} />
            { open && 
                <div className='dropdownItem'>
                   <ul>
                     <li onClick={handleLogOut}> Log out</li>
                     <li>Delete account</li>

                   </ul>
                </div>
            }
         </div>
    </div>
       </div>
    {/* Chat body */}
    <ChatBox chat={currentChat} currentUser={user._id} setSendMessage={setSendMessage} receivedMessage={receivedMessage}  />
      </div>
    </div>

  )
}

export default Chat