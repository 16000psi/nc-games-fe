import { createContext, useState } from 'react';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {

    const [user, setUser] = useState({
        avatar_url: "https://vignette.wikia.nocookie.net/mrmen/images/d/d6/Mr-Tickle-9a.png/revision/latest?cb=20180127221953",
        name : "Tom Tickle",    
        username : "tickle122"
    });

    // const [user, setUser] = useState(null);


    return (
        <UserContext.Provider value={{ user, setUser }} >
            {children}
        </UserContext.Provider>
    )
}
