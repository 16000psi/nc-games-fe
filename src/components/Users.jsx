import { useContext, useEffect, useState } from "react";
import { UserContext } from "../context/UserContext";
import { getAllUsers } from "../api";

import './../styles/Users.css';

const Users = () => {

    const [usersData, setusersData] = useState([]);

    const { user, setUser } = useContext(UserContext);


    useEffect(() => {
        getAllUsers().then(({ data }) => {
            const { users } = data
            setusersData(users);

        });
    }, []);

    return (
        <div className="users-container">
            <section className="all-users">
                {usersData.map((websiteUser) => {
                    return (
                        <section className="user-card" key={websiteUser.username}>
                            <div className="user-image-container" >
                                <img
                                    className="user-image"
                                    src={websiteUser.avatar_url}
                                    alt={websiteUser.username}
                                />
                            </div>
                            <div className="user-body">
                                <p className="username">{websiteUser.username}</p>
  

                                <button className="log-in-button"
                                    onClick={() => {

                                        if (user && user.username === websiteUser.username) {
                                            setUser(null)
                                        } else {
                                            setUser(websiteUser)
                                        }
                                    }}
                                >
                                    {(user && user.username === websiteUser.username) ? "Log out" : `Log in as ${websiteUser.username}`}
                                </button>
                            </div>

                        </section>
                    );
                })}
            </section>
        </div>
    );
}

export default Users