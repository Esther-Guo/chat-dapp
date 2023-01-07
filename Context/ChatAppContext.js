import React, {useState, useEffect} from 'react';
import { useRouter } from 'next/router';

import { CheckIfWalletConnected, connectWallet, connectingWithContract } from '../Utils/apiFeature';

export const ChatAppContext = React.createContext();

export const ChatAppProvider = ({children}) => {
    const [account, setAccount] = useState("");
    const [userName, setUserName] = useState("");
    const [friendList, setFriendList] = useState([]);
    const [friendMsg, setFriendMsg] = useState([]);
    const [loading, setLoading] = useState(false);
    const [userList, setUserList] = useState([]);
    const [error, setError] = useState("");

    //CHAT USER DATA
    const [currentUserName, setCurrentUserName] = useState("");
    const [currentUserAddress, setCurrentUserAddress] = useState("");

    const router = useRouter();

    // FETCH DATA ON PAGE LOAD
    const fetchData = async () => {
        try {
            const contract = await connectingWithContract();
            const connectAccount = await connectWallet();
            setAccount(connectAccount);
            const userName = await contract.getUserName(connectAccount);
            setUserName(userName);
            const friendList = await contract.getMyFriendList();
            setFriendList(friendList);
            const userList = await contract.getAllUsers();
            setUserList(userList);
        } catch (error) {
            // setError("");
            console.log(error)
        }
    }

    useEffect(() => {
        fetchData();
    }, []);

    //READ MESSAGE
    const readMessage = async (friendAddress) => {
        try {
        const contract = await connectingWithContract();
        const read = await contract.readMessage(friendAddress);
        setFriendMsg(read);
        } catch (error) {
            console.log("Currently You Have no Message");
        }
    };

    //CREATE ACCOUNT
    const createAccount = async ({ name, accountAddress }) => {
        try {
        // if (name || accountAddress)
        //   return setError("Name And AccountAddress, cannot be emty");

        const contract = await connectingWithContract();
        const getCreatedUser = await contract.createAccount(name);
        setLoading(true);
        await getCreatedUser.wait();
        setLoading(false);
        window.location.reload();
        } catch (error) {
            setError("Error while creating your account. Please reload browser");
        }
    };

    //ADD YOUR FRIENDS
    const addFriends = async ({ name, accountAddress }) => {
        try {
        // if (name || accountAddress) return setError("Please provide data");

        const contract = await connectingWithContract();
        const addMyFriend = await contract.addFriend(accountAddress, name);
        setLoading(true);
        await addMyFriend.wait();
        setLoading(false);
        router.push("/");
        window.location.reload();
        } catch (error) {
        setError("Something went wrong while adding friends, try again");
        console.log(error)
        }
    };

    //SEND MESSAGE TO YOUR FRIEND
    const sendMessage = async ({ msg, address }) => {
        try {
        // if (msg || address) return setError("Please Type your Message");

        const contract = await connectingWithContract();
        const addMessage = await contract.sendMessage(address, msg);
        setLoading(true);
        await addMessage.wait();
        setLoading(false);
        window.location.reload();
        } catch (error) {
        setError("Please reload and try again");
        console.log(error)
        }
    };

    //READ INFO
    const readUser = async (userAddress) => {
        const contract = await connectingWithContract();
        const userName = await contract.getUserName(userAddress);
        setCurrentUserName(userName);
        setCurrentUserAddress(userAddress);
    };

    return (
        <ChatAppContext.Provider 
            value=
                {{ 
                    readMessage, 
                    createAccount, 
                    addFriends, 
                    sendMessage, 
                    readUser,
                    CheckIfWalletConnected,
                    connectWallet,
                    account, 
                    userName,
                    friendList,
                    friendMsg,
                    userList,
                    loading,
                    error,
                    currentUserName,
                    currentUserAddress
                }}>
            {children}
        </ChatAppContext.Provider>
    )
}