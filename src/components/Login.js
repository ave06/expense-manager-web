import React from 'react';
import { useDispatch} from 'react-redux';
import { loginUser } from '../redux/actions';
import { Link } from 'react-router-dom';
import UserInfo from "./UserInfo";

function Login(){

    const dispatch = useDispatch();

    const handleLogin = ()=>{
        const user = {
            id:1,
            name:'John Doe'
        };
        dispatch(loginUser(user));
    };
    return(
        <div>
            <p>you are logged out of Expense manager plz click on the link to get redirect to homepage</p>
            <Link to="/">HomePage</Link>
            {/* <button onClick={handleLogin}>y</button> */}
            {/* <UserInfo /> */}
        </div>
    );
}

export default Login;