import React, { useEffect, useState } from 'react';
import './App.css';
import AppRouter from './components/AppRouter';
import { AuthContext } from './context';
import MyNavbar from './components/UI/navbar/MyNavbar';

function App() {
  const [isAuth, setIsAuth] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if(localStorage.getItem('auth')) {
      setIsAuth(true)
    }
    setIsLoading(false);
  }, [])

  return (
    <AuthContext.Provider value={{
      isAuth,
      setIsAuth,
      isLoading
    }}>
      <MyNavbar />
      <AppRouter />
    </AuthContext.Provider>
  )
}

export default App;