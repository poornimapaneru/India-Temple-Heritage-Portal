import { useState } from 'react'

function UserAuth({ onAuthSuccess, onClose }) {
  const [isLogin, setIsLogin] = useState(true)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (event) => {
    event.preventDefault()
    setError('')
    setLoading(true)

    try {
      const endpoint = isLogin ? 'login' : 'register'

      const response = await fetch(
        `https://india-temple-heritage-portal.onrender.com/api/users/${endpoint}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(
            isLogin
              ? { email, password }
              : { name, email, password }
          ),
        }
      )

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.message || 'Something went wrong')
      }

      if (isLogin) {
        localStorage.setItem('userToken', data.token)
        localStorage.setItem('currentUser', JSON.stringify(data.user))

        if (onAuthSuccess) {
          onAuthSuccess(data.user)
        }
      } else {
        alert('Account created successfully! Please login.')

        setIsLogin(true)
        setName('')
        setPassword('')
      }
    } catch (error) {
      setError(error.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="user-auth-overlay">
      <div className="user-auth-box">

        {onClose && (
          <button className="user-auth-close" onClick={onClose}>
            ✕
          </button>
        )}

        <h2>{isLogin ? 'Welcome Back!' : 'Create Your Account'}</h2>

        <p>
          {isLogin
            ? 'Login to explore your spiritual journey.'
            : 'Join us to explore the spiritual heritage of India.'}
        </p>

        <form onSubmit={handleSubmit}>

          {!isLogin && (
            <input
              type="text"
              placeholder="Full Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          )}

          <input
            type="email"
            placeholder="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <input
            type="password"
            placeholder="Password (minimum 6 characters)"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            minLength={6}
            required
          />

          {error && <p className="user-auth-error">{error}</p>}

          <button type="submit" disabled={loading}>
            {loading
              ? 'Please wait...'
              : isLogin
                ? 'Login'
                : 'Create Account'}
          </button>

        </form>

        <p className="user-auth-switch">
          {isLogin ? "Don't have an account?" : 'Already have an account?'}

          <button
            type="button"
            onClick={() => {
              setIsLogin(!isLogin)
              setError('')
            }}
          >
            {isLogin ? 'Sign Up' : 'Login'}
          </button>
        </p>

      </div>
    </div>
  )
}

export default UserAuth