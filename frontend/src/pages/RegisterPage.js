import React, {useContext} from 'react'
import AuthContext from '../context/AuthContext'

const RegisterPage = () => {

    let {loginUser} = useContext(AuthContext)

    return (
        <div>
            <form onSubmit={loginUser}>
                <input type="text" name="usernamereg" placeholder="Enter username"/>
                <input type="text" name="emailreg" placeholder="Enter email"/>
                <input type="password" name="password1" placeholder="Enter password"/>
                <input type="password" name="password2" placeholder="Repeat password"/>
                <input type="submit"/>
            </form>
        </div>
    )
}

export default RegisterPage