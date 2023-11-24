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

export const CurrentUserConsumer = ({children}) => {
    return (
        <CurrentUserContext.Consumer>
            {children}
        </CurrentUserContext.Consumer>
    )
}

export const ScreenHeaderContext = createContext(null);

export const ScreenHeaderProvider = ({children}) => {
    const [screenHeader, setScreenHeader] = useState(true);
    return (
        <ScreenHeaderContext.Provider value={[screenHeader, setScreenHeader]}>
            {children}
        </ScreenHeaderContext.Provider>
    )
}

export const ScreenHeaderConsumer = ({children}) => {
    return (
        <ScreenHeaderContext.Consumer>
            {children}
        </ScreenHeaderContext.Consumer>
    )
}

export function getUser(user, email){
    return user.filter((item) => item.email == email)[0];
}