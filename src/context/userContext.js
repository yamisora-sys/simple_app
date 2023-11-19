import {createContext, useState} from 'react';
import {UserData} from '../data/user.js';
export const UserContext = createContext([]);

export const UserProvider = ({children}) =>{
    const [user, setUser] = useState(UserData);
    return (
        <UserContext.Provider value={[user, setUser]}>
            {children}
        </UserContext.Provider>
    )
}

export const CurrentUserContext = createContext(null);
export const CurrentUserProvider = ({children}) => {
    const [currentUser, setCurrentUser] = useState(null);
    return (
        <CurrentUserContext.Provider value={[currentUser, setCurrentUser]}>
            {children}
        </CurrentUserContext.Provider>
    )
}

export function getUser(user, email){
    return user.filter((item) => item.email == email)[0];
}