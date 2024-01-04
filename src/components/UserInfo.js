import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { logoutUser } from "../redux/actions";

function UserInfo() {
    const user = useSelector((state) => state.user);
    const dispatch = useDispatch();

    const handleLogout = () => {
        dispatch(logoutUser());
    };

    return (
        <div>
            {user ? (
                <div>
                    <p> Welcome , {user.name}</p>
                    <button onClick={handleLogout}>Logout</button>
                </div>) : (
                <p>You are not logged</p>

            )}
        </div>
    );
}

export default UserInfo;