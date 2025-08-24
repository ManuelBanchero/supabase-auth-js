import { AuthContext } from '../context/AuthContext'
import { useContext, useActionState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import '../styles/auth.css'

function SignUp() {
    const { signUpNewUser } = useContext(AuthContext)
    const navigate = useNavigate()
    const [error, submitAction, isPending] = useActionState(async (_previousState, formData) => {
        const name = formData.get('name')
        const email = formData.get('email')
        const password = formData.get('password')
        const accountType = formData.get('account-type')

        const { 
            success,
            data,
            error
        } = await signUpNewUser(email, password, name, accountType)

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
                    <h1>Create an account</h1>
    
                    <form action={submitAction}>
                        <div className="input-container">
                            <label htmlFor="name-input">Name</label>
                            <input 
                                type="text" 
                                id="name-input"
                                name="name"
                                placeholder=""
                                required
                                aria-required="true"
                                aria-invalid={error ? 'true' : 'false'}
                                aria-describedby={error ? 'signin-error' : undefined}
                                disabled={isPending}
                            />
                        </div>

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

                        <div className="input-container">
                            <fieldset
                                className="form-fieldset"
                                aria-required="true"
                                aria-label="Select your role"
                            >
                                <legend>Select your role</legend>
                                <div className="radio-group">
                                    <label>
                                        <input
                                        type="radio"
                                        name="account-type"
                                        value="admin"
                                        required
                                        />{' '}
                                        Admin
                                    </label>
                                    <label>
                                        <input type="radio" name="account-type" value="user" required />{' '}
                                        User
                                    </label>
                                </div>
                            </fieldset>
                        </div>
    
                        { error && error }
    
                        <button>{isPending ? 'Signing up' : 'Sign up'}</button>
                    </form>
    
                    <p className="policy-text">By continuing, you agree to the <span>Terms of use</span> and <span>Privacy Policy.</span></p>
                </div>
    
                <div className="login-cta">
                    <span className="line"></span>
                    <p>New to our community</p>
                    <span className="line"></span>
                </div>
    
                <Link to={'/signin'} className="cta-btn">Already have an account? <span>Log in</span></Link>
            </div>
        )
}

export default SignUp