import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';


function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
     const handleLogin = () => {
        navigate('/Todolist');
    };

    return (
        <div className="container" style={{ marginTop: '20px' }}>
            <form>
                <h2 className='welcome'>Login to your account</h2>
                <p>Welcome back!</p>
                <div>
                    <label htmlFor="email">Email address :</label>
                    <input 
                        onChange={e => setEmail(e.target.value)} 
                        type="email" 
                        id="email" 
                        value={email} 
                    />
                </div>
                <div>
                    <label htmlFor="password">Password :</label>
                    <input 
                        onChange={e => setPassword(e.target.value)} 
                        type="password" 
                        id="password" 
                        value={password} 
                    />
                </div>
               <button className='loginreg' onClick={handleLogin} >LOG IN</button>
            </form>
        </div>
    );
}

export default Login;
