import "./chatOnline.css";
import { useEffect, useState } from "react";
import axios from "../../config/axios";



export default function ChatOnline({ id, online }) {
    const [user, setUser] = useState();
    useEffect(() => {
        const getUser = async (id) => {
            const res = await axios.get(`/user/${id}`);
            if (res.data && +res.data.EM === 0) {
                setUser(res.data.DT);
            }
        }

        getUser(id);

    }, [id]);

    return (
        <div className="chatOnline">
            {user &&
                <>
                    <div className="chatOnlineFriend" >
                        <div className="chatOnlineImgContainer">
                            <img
                                className="chatOnlineImg"
                                src={user.profilePicture ? process.env.REACT_APP_ASSETS + "/" + user.profilePicture : process.env.REACT_APP_ASSETS + "/person/noAvatar.png"}
                                alt=""
                            />
                            {online && <div className="chatOnlineBadge"></div>}
                        </div>
                        <span className="chatOnlineName">{user.username}</span>
                    </div>
                </>
            }
        </div>
    );
}