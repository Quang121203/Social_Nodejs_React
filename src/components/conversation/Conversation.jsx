import "./conversation.css";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import axios from "../../config/axios";


export default function Conversation({ conversation }) {
    const { user: currentUser } = useContext(AuthContext);
    const [user, setUser] = useState();


    useEffect(() => {

        const getUser = async (conversation) => {
            const userID = currentUser.id === conversation.userID1 ? conversation.userID2 : conversation.userID1;
            const res = await axios.get(`/user/${userID}`);
            if (res.data && +res.data.EM === 0) {
                setUser(res.data.DT);
            }
        }

        getUser(conversation);

    }, [conversation,currentUser]);



    return (
        <div className="conversation">
            {user &&
                <>
                    <img
                        className="conversationImg"
                        src={
                            user.profilePicture ?
                                process.env.REACT_APP_ASSETS + "/" + user.profilePicture :
                                process.env.REACT_APP_ASSETS + "/person/noAvatar.png"
                        }
                        alt=""
                    />
                    <span className="conversationName">{user.username}</span>
                </>
            }

        </div>
    );
}