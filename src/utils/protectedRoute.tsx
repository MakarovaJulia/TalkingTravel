import React from 'react'
import {Outlet} from 'react-router-dom';


export const ProtectedRoute = ({isAllowed, redirectPath = '/signup', children}: any) => {

    // if(isAllowed == false){
    //     return <Navigate to={redirectPath} replace/>
    // }

    return children ? children : <Outlet/>;
};