import React, { useState, useEffect, useContext } from 'react'
import AuthContext from '../context/AuthContext';
import SongList from '../components/SongList';

const HomePage = () => {
    const { authTokens, logoutUser } = useContext(AuthContext);
    let [profile, setProfile] = useState([])

    useEffect(() => {
        getProfile()
    },[])

    const getProfile = async() => {
        let response = await fetch('/api/profile', {
        method: 'GET',
        headers:{
            'Content-Type': 'application/json',
            'Authorization':'Bearer ' + String(authTokens.access)
        }
        })
        let data = await response.json()
        console.log(data)
        if(response.status === 200){
            setProfile(data)
        } else if(response.statusText === 'Unauthorized'){
            logoutUser()
        }
    }

    return (
        <div>
            <h2>Welcome, {profile.first_name} {profile.last_name}</h2>
            <h3>Email: {profile.email}</h3>
			<p> </p>
			<p><SongList /></p>
        </div>
    )
}

export default HomePage