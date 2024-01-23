import "./topbar.css";
import { AuthContext } from "../../context/AuthContext";
import { useContext, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import useDebounce from "../../hooks/useDebounce";
import Tippy from '@tippyjs/react/headless';
import axios from "../../config/axios";
import AccountItem from "../accountItem/AccountItem";

export default function Topbar() {

  const { user } = useContext(AuthContext);
  const [search, setSearch] = useState('');
  const [showTippy, setShowTippy] = useState(false);
  const [result, setResult] = useState([]);

  const value = useDebounce(search, 1000);

  useEffect(() => {
    if (value.trim()) {
      getResult(value);
    }

  }, [value])

  const handleChange = (e) => {
    const searchValue = e.target.value;
    if (!searchValue.startsWith(' ')) {
      setSearch(searchValue);
    }
  }

  const getResult = async (value) => {
    const res = await axios.get(`/user/${value}/find`);
    setResult(res.data.DT);
  }

  return (
    <div className="topbarContainer">
      <div className="topbarLeft">
        <Link to="/" className="logo">
          Social
        </Link>
      </div>

      <div className="topbarCenter">
        <Tippy
          interactive
          visible={showTippy && search && result.length > 0}
          render={(attrs) => (
            <div className="tippy" tabIndex="-1" {...attrs}>

              {result.map(user =>
                <AccountItem user={user} key={user.id} />
              )

              }
            </div>
          )}
          onClickOutside={() => setShowTippy(false)}
        >

          <div className="searchbar">
            <i className="fa-solid fa-magnifying-glass searchIcon"></i>
            <input
              placeholder="Search for friend, post or video"
              className="searchInput"
              value={search}
              onChange={(e) => handleChange(e)}
              onFocus={() => setShowTippy(true)}
            />
          </div>

        </Tippy>
      </div>
      <div className="topbarRight">
        <div className="topbarLinks">
          <span className="topbarLink">Homepage</span>
          <span className="topbarLink">Timeline</span>
        </div>
        <div className="topbarIcons">
          
          
        </div>
        <Link to={`/profile/${user.id}`}>
          <img src={user.profilePicture ? process.env.REACT_APP_ASSETS + "/" + user.profilePicture : process.env.REACT_APP_ASSETS + "/person/noAvatar.png"} alt="" className="topbarImg" />
        </Link>
      </div>

    </div>

  );
}
