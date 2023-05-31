import React, { useState } from 'react'
import UsersService from '../services/UsersService';
import { useHistory } from 'react-router-dom';
import '../App.css';
import '../bootstrap.min.css';

function LoginComponent() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showSuccessMessage, setShowSuccessMessage] = useState(false);
    const [hasLoginFailed, setHasLoginFailed] = useState('');
    const history = useHistory();

    const handleSubmit = async e => {
        e.preventDefault();
        UsersService.executeBasicAuth(email, password)
        .then(() => {
            UsersService.registerSuccessfullLogin(email, password)
            setEmail('')
            setPassword('')
            history.push(`/user`)
        }).catch(() => {
            setShowSuccessMessage(false)
            setHasLoginFailed(true)
        })
    }

        return (
            <div className="Auth-form-container">
                <form onSubmit={handleSubmit} className='Auth-form'>
                    <div className='Auth-form-content'>
                        <h3 className="Auth-form-title">Sign In</h3>
                        <div className="form-group mt-3">
                            <label>Email : </label>
                            <input
                                type="text"
                                className='form-control mt-1'
                                placeholder="Email"
                                value={email}
                                onChange={e => setEmail(e.target.value)}
                            />
                        </div>
                        <div className="form-group mt-3">
                            <label>Mot de passe : </label>
                            <input
                                type="password"
                                className='form-control mt-1'
                                placeholder="Mot de passe"
                                value={password}
                                onChange={e => setPassword(e.target.value)}
                            />
                        </div>
                        <div className='d-grid gap-2 mt-3'>
                            <button className="btn btn-primary" type="submit">Se connecter</button>
                        </div>
                    </div>
                </form>
            </div>
        )
    //}
}

export default LoginComponent