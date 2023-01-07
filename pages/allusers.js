import React, { useState, useEffect, useContext } from "react";

import { UserCard } from "../Components";
import Style from "../styles/allusers.module.css";
import { ChatAppContext } from "../Context/ChatAppContext";

const alluser = () => {
    const { userList, addFriends } = useContext(ChatAppContext);
    return (
      <div>
        <div className={Style.alluser_info}>
          <h1>Find Your Friends </h1>
        </div>
  
        <div className={Style.alluser}>
          {userList.map((el, i) => (
            <UserCard key={i + 1} el={el} i={i} addFriends={addFriends} />
          ))}
        </div>
      </div>
    );
  };
  
  export default alluser;
