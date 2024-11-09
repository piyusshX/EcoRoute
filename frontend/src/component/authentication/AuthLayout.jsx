import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import {Bars} from 'react-loader-spinner'
import { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';

export default function AuthLayout({children}, path) {
    const { authToken,setAuthToken } = useContext(AuthContext);


    const navigate = useNavigate()
    const [loader, setLoader] = useState(true)
    const authStatus = useSelector(state => state.auth.status)

    useEffect(() => {
        if (authToken) { 
            navigate(path)
        } else {
            navigate('/login')
        }
        setLoader(false)
    }, [authStatus, navigate, path])

    return loader ? <Bars height="80" width="80" color="#18BED4" ariaLabel="bars-loading" visible={true} /> : <>{children}</>
}