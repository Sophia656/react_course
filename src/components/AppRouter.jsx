import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Login from '../pages/Login';
import { privateRoutes, publicRoutes } from '../router';

const AppRouter = () => {
    const isAuth = false;
    return (
        isAuth
        ? 
        <Routes>
            {privateRoutes.map(router =>
                <Route 
                    element={router.element} 
                    path={router.path} 
                    exact={router.exact} 
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
                />  
            )}
            <Route path='/*' element={<Login />} /> 
        </Routes>
    );
};

export default AppRouter;