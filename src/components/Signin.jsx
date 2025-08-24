import { useActionState, useContext } from 'react'
import { AuthContext } from '../context/AuthContext'
import { useNavigate, Link } from 'react-router-dom'
import '../styles/auth.css'

function SignIn() {
    const { signInUser } = useContext(AuthContext)
    const navigate = useNavigate()

    const [error, submitAction, isPending] = useActionState(async (_previousState, formData) => {
        const email = formData.get('email')
        const password = formData.get('password')

        const {
            success,
            data,
            error 
        } = await signInUser(email, password)

        if (error) 
            return new Error(error)
        
        if (success && data?.session) {
            navigate('/home')
            return null
        }

        return null

    }, null)

    return (
        <div className="auth-container">
            <div className="form-container">
                <h1>Sign in</h1>

                <form action={submitAction}>
                    <div className="input-container">
                        <label htmlFor="email-input">Email</label>
                        <input 
                            type="email" 
                            id="email-input"
                            name="email"
                            placeholder=""
                            required
                            aria-required="true"
                            aria-invalid={error ? 'true' : 'false'}
                            aria-describedby={error ? 'signin-error' : undefined}
                            disabled={isPending}
                        />
                    </div>

                    <div className="input-container">
                        <label htmlFor="password-input">Your password</label>
                        <input 
                            type="password"
                            id="password-input"
                            name="password"
                            placeholder=""
                            required
                            aria-required="true"
                            aria-invalid={error ? 'true' : 'false'}
                            aria-describedby={error ? 'signin-error' : undefined}
                            disabled={isPending}
                        />
                    </div>

                    { error && error }

                    <button>{isPending ? 'Signing in' : 'Sign in'}</button>
                </form>

                <p className="policy-text">By continuing, you agree to the <span>Terms of use</span> and <span>Privacy Policy.</span></p>
            </div>

            <div className="login-cta">
                <span className="line"></span>
                <p>New to our community</p>
                <span className="line"></span>
            </div>

            <Link to={'/login'} className="cta-btn">Create an account</Link>
        </div>
    )
}

export default SignIn