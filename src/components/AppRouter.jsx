import React, { useContext } from 'react';
import { Route, Routes } from 'react-router-dom';
import { AuthContext } from '../context';
import Login from '../pages/Login';
import { privateRoutes, publicRoutes } from '../router';
import MyLoader from './UI/loader/MyLoader';

const AppRouter = () => {
    const {isAuth, isLoading} = useContext(AuthContext);

    if (isLoading) {
        <MyLoader />
    }

    return (
        isAuth
        ? 
        <Routes>
            {privateRoutes.map(router =>
                <Route 
                    element={router.element} 
                    path={router.path} 
                    exact={router.exact}
                    key={router.path} 
                />    
            )}
        </Routes>
        :
        <Routes>
            {publicRoutes.map(router =>
                <Route 
                    element={router.element} 
                    path={router.path} 
                    exact={router.exact} 
                    key={router.path}
                />  
            )}
            <Route path='/*' element={<Login />} /> 
        </Routes>
    );
};

export default AppRouter;