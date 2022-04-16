import React from 'react';
import { NavLink } from "react-router-dom";

const Navbar = () => {
    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-danger">
            <div className="container">
                <NavLink className="navbar-brand" to="/">MI</NavLink>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#my-collapse" aria-controls="my-collapse" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="my-collapse">
                    <ul className="navbar-nav ml-auto">
                        <li className="nav-item">
                            <NavLink className="nav-link" to="/posts">Posts</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className="nav-link" to="/posts/add">Add</NavLink>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;