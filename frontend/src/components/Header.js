import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import AuthContext from '../context/AuthContext'


const HeaderStyle = {
	border: "2px solid blue",
	width: "75%",
	listStyleType: "none",
	textAlign: "center",
	justifyContent: 'center',
};

const ListStyle = {
	color: "purple",
	fontSize: "15px",
};

const Header = () => {
    let { user, logoutUser } = useContext(AuthContext)
    return (
        <div style={HeaderStyle}>
            <Link to="/" style={ListStyle}>Home</Link>
            <span> | </span>
            {user ? (
                <span onClick={logoutUser} style={ListStyle}>Logout</span>
            ) : (
                <Link to="/login" style={ListStyle}>Login</Link>
            )} | 
            <Link to="/register" style={ListStyle}>Register</Link>
            {user && <p>Hello, {user.username}!</p>}

        </div>
    )
}

export default Header