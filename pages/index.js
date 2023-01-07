import React, {useState, useEffect, useContext } from "react";

import { Filter, Friend } from "../Components/index";


const ChatApp = () => {
  // const {} = useContext(ChatAppContext);
  return ( 
    <div>
      <Filter />
      <Friend />
    </div>
   );
}

export default ChatApp;