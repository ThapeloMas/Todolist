import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';



function Register() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const navigate = useNavigate();
     const handleLogin = () => {
        navigate('/Todolist');
     }
    return (
        <div className="container" style={{ marginTop: "10vh" }}>
            <form >
                <h2 className='welcome'> Create your account</h2>
                <p>Welcome </p>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email address :</label>
                    <input onChange={e => { setEmail(e.target.value) }} type="email" className="form-control" id="email" />
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password :</label>
                    <input onChange={e => { setPassword(e.target.value) }} type="password" className="form-control" id="password" />
                </div>
                <button className='loginreg' onClick={handleLogin} >LOG IN</button>
      <p style={{ marginTop: '2vh' }}>
  Have an account? <Link to="/login">Login</Link>
  
</p>

            </form>
        </div>
        
    )
}

export default Register;
