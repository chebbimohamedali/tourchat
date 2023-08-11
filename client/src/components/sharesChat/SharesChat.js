import React from 'react'
import "./SharesChat.css"
import {toursData} from "../../Data/ToursData"
import ShareChat from '../shareChat/ShareChat'

const sharesChat = () => {
  return (
    <div className="ShareChat">
        <h3>Chat for you</h3>
        {
            toursData.map((share)=>{
                return(
                  <ShareChat data={share} id="id" />
                )})
        }
    </div>
    
  )
}

export default sharesChat