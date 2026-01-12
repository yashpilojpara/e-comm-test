import React from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../redux/authSlice";
import "../styles/navbar.css";

const Navbar = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const token = useSelector((state) => state.auth.token);

    const handleLogout = () => {
        dispatch(logout());
        navigate("/");
    };

    const cartCount = useSelector(
        (state) =>
            state.cart.items.reduce(
                (total, item) => total + item.quantity,
                0
            )
    );


    return (
        <nav className="navbar">
            <h2 className="logo">E-Shop</h2>

            <div className="nav-links">
                {token ? (
                    <>
                        <NavLink to="/home">Home</NavLink>
                        <NavLink to="/checkout">Cart ({cartCount})</NavLink>
                        <button onClick={handleLogout}>Logout</button>
                    </>
                ) : (
                    <Link to="/">Login</Link>
                )}
            </div>
        </nav>
    );
};

export default Navbar;
