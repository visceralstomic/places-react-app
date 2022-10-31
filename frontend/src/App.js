import './App.css';
import {BrowserRouter} from "react-router-dom";
import Header from "./components/Header/Header";
import { AuthContext } from './context/authContext';
import { useEffect, useState } from 'react';

import userServise from './service/userServise';
import { UserContext } from './context/userContext';
import AppRouter from './components/AppRouter/AppRouter';

function App() {
  const [isAuth, setIsAuth] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState({});

  useEffect(() => {
    if (localStorage.getItem('token')) {
      userServise
        .verify()
        .then(({user}) => {
          
          setIsAuth(true);
          setUser(user);
          setIsLoading(false)
        })
        .catch(error => {
          setIsLoading(false)
          console.log(error)
  
        })      
    } else {
      setIsLoading(false)
    }   

  }, [])

  return (
    <AuthContext.Provider value={{
      isAuth,
      setIsAuth,
      isLoading
    }}>
      <UserContext.Provider
        value={{
          user
        }}
      >
        <BrowserRouter>
          <div className="App">
            <Header />
            <AppRouter />
          </div>
        </BrowserRouter>
      </UserContext.Provider>
    </AuthContext.Provider>
    
  );
}

export default App;
