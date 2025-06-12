import React from 'react'
import { NavLink } from 'react-router-dom'
import { useAuth } from './AuthProvider'

const NavBar = () => {
    const { userDetails } = useAuth()
    return (
        <nav style={{ display: 'flex', gap: '1rem' }}>
            <NavLink to="/">Home</NavLink>
            <NavLink to="/about">About</NavLink>
            <NavLink to="/contact">Contact</NavLink>
            <NavLink to="/user">User</NavLink>
            <NavLink to="/project">Project</NavLink>
            {userDetails ?
                <NavLink to="/logout">Logout</NavLink>
                :
                <NavLink to="/login">Login</NavLink>
            }
        </nav>
    )
}

export default NavBar