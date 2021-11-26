import React from 'react';
import MyButton from '../components/UI/button/MyButton';
import MyInput from '../components/UI/input/MyInput';

const Login = () => {
    return (
        <div>
            <h1>Login Page</h1>
            <form>
                <MyInput type="text" placeholder='enter username' />
                <MyInput type="password" placeholder='enter password' />
                <MyButton>Enter</MyButton>
            </form>
        </div>
    );
};

export default Login;