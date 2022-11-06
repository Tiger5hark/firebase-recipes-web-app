import { useState } from "react"
import FirebaseAuthService from "../FirebaseAuthService"

const LoginForm = ({ existingUser }) => {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (e) => {

        e.preventDefault()

        try {
            await FirebaseAuthService.loginUser(username, password)

            setUsername('')
            setPassword('')

        } catch (error) {
            alert(error.message)
        }

    }

    const handleLogout = () => {
        FirebaseAuthService.logoutUser()
    }

    const handleSendPasswordResetEmail = async () => {

        if (!username) {
            alert('Missing username')
            return
        }

        try {

            await FirebaseAuthService.sendPasswordResetEmail(username)
            alert(`Password reset email sent to ${username}`)

        } catch (error) {
            alert(error.message)
        }

    }

    const handleSignInWithGoogle = async () => {

        try {
            await FirebaseAuthService.loginWithGoogle()
        } catch (error) {
            alert(error.message)
        }

    }

    return (
        <div className="login-form-container">
            {
                existingUser ?
                    <div>
                        <h3>Welcome, {existingUser.email}</h3>
                        <button
                            className="primary-button"
                            type="button"
                            onClick={handleLogout}
                        >Logout</button>
                    </div> :
                    <form className="login-form" onSubmit={handleSubmit} >
                        <label className="input-label login-label">
                            Username (email):
                            <input
                                className="input-text"
                                id="username"
                                required
                                placeholder="Enter username"
                                type='email'
                                value={username}
                                onChange={e => setUsername(e.target.value)}
                            />
                        </label>
                        <label className="input-label login-label">
                            Password:
                            <input
                                className="input-text"
                                id="password"
                                required
                                placeholder="Enter a Password"
                                type="password"
                                value={password}
                                onChange={e => setPassword(e.target.value)}
                            />
                        </label>
                        <div className="button-box">
                            <button
                                className="primary-button"
                            >Log in</button>
                            <button
                                className="primary-button"
                                type="button"
                                onClick={handleSendPasswordResetEmail}
                            >Reset Password</button>
                            <button
                                className="primary-button"
                                type='button'
                                onClick={handleSignInWithGoogle}
                            >Log in with Google</button>
                        </div>
                    </form>
            }
        </div>
    )
}
export default LoginForm