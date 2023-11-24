
import { CurrentUserProvider, CurrentUserContext, UserProvider, ScreenHeaderProvider } from "../../context/userContext.js";
import { NavigationContainer } from "@react-navigation/native";
import {useState, useContext} from 'react'
import { MainScreen } from "./mainscreen.js";
import { Auth } from "./Auth.js";
export function Index() {
  return (
    <NavigationContainer>
      <UserProvider>
        <CurrentUserProvider>
          <ScreenHeaderProvider>
        <CurrentUserContext.Consumer>
          {
            ([currentUser, setCurrentUser]) => {
                return currentUser ? <MainScreen /> : <Auth />
            }
          }
        </CurrentUserContext.Consumer>
          </ScreenHeaderProvider>
        </CurrentUserProvider>
      </UserProvider>
    </NavigationContainer>
  );
}
