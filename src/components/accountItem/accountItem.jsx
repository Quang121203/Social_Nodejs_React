import { Link } from "react-router-dom";
import './accountItem.css'

const AccountItem = ({ user,off }) => {
    return (
        <Link to={`/profile/${user.id}`} className='wrapper'>
            <img className='avatar' src={user.profilePicture ? process.env.REACT_APP_ASSETS + "/" + user.profilePicture : process.env.REACT_APP_ASSETS + "/person/noAvatar.png"} alt={user.username} />
            <div className='info'>
                <h4 className='name'>
                    <span>{user.username}</span>
                </h4>
            </div>
        </Link>
    );
}

export default AccountItem