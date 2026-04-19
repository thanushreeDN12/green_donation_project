import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { login, signup, admin } from '../actions/authentication';

const LoginPage = () => {
  const [activeForm, setActiveForm] = useState('login'); // 'login' | 'signup' | 'admin' | 'adminSignup'
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    setError(''); // clear previous errors
    const username = e.target.username.value;
    const pw = e.target.password.value;
    console.log(username,pw,activeForm)

    switch (activeForm) {
      case 'login':
        dispatch(login({ username, pw, navigate, setError }));
        break;

      case 'signup':
        const email = e.target.email.value;
        dispatch(signup({ username, email, pw, navigate, setError }));
        break;

      case 'admin':
        dispatch(admin({ username, pw, navigate, setError }));
        break;

      default:
        console.warn('Unknown form type');
    }
  };

  const renderForm = () => {
    switch (activeForm) {
      case 'login':
        return (
          <form onSubmit={handleSubmit} style={styles.form}>
            <h2 style={styles.formTitle}>User Login</h2>
            <input type="text" name="username" placeholder="Username" required style={styles.input} />
            <input type="password" name="password" placeholder="Password" required style={styles.input} />
            <button type="submit" style={styles.submitBtn}>Login</button>
          </form>
        );
      case 'signup':
        return (
          <form onSubmit={handleSubmit} style={styles.form}>
            <h2 style={styles.formTitle}>Sign Up</h2>
            <input type="text" name="username" placeholder="Username" required style={styles.input} />
            <input type="email" name="email" placeholder="Email" required style={styles.input} />
            <input type="password" name="password" placeholder="Password" required style={styles.input} />
            <button type="submit" style={styles.submitBtn}>Sign Up</button>
          </form>
        );
      case 'admin':
        return (
          <form onSubmit={handleSubmit} style={styles.form}>
            <h2 style={styles.formTitle}>Admin Login</h2>
            <input type="text" name="username" placeholder="Admin ID" required style={styles.input} />
            <input type="password" name="password" placeholder="Admin Password" required style={styles.input} />
            <button type="submit" style={styles.submitBtn}>Login as Admin</button>
          </form>
        );

      default:
        return null;
    }
  };

  return (
    <div style={styles.fullpage}>
    <div style={styles.container}>
      <div style={styles.buttonGroup}>
        <button
          onClick={() => { setActiveForm('login'); setError(''); }}
          style={activeForm === 'login' ? styles.activeToggleBtn : styles.toggleBtn}
        >
          Login
        </button>
        <button
          onClick={() => { setActiveForm('signup'); setError(''); }}
          style={activeForm === 'signup' ? styles.activeToggleBtn : styles.toggleBtn}
        >
          Sign Up
        </button>
        <button
          onClick={() => { setActiveForm('admin'); setError(''); }}
          style={activeForm === 'admin' ? styles.activeToggleBtn : styles.toggleBtn}
        >
          Admin Login
        </button>

      </div>
      <div style={styles.formContainer}>
        {error && <div style={{ color: 'red', textAlign: 'center', marginBottom: '10px' }}>{error}</div>}
        {renderForm()}
      </div>
    </div>
    </div>
  );
};

const styles = {
  fullpage:{
   minHeight: '100vh',
    backgroundImage: `
      linear-gradient(rgba(20, 40, 20, 0.6), rgba(45, 106, 79, 0.5)),
      url('/nature.png')
    `,
    backgroundSize: 'cover',
    backgroundRepeat: 'repeat-x',
    backgroundPosition: '0 0',
    animation: 'moveBackground 30s linear infinite',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '20px',
    boxSizing: 'border-box',
  },
  container: {
    width: '420px',
    maxWidth: '100%',
    padding: '40px 30px',
    textAlign: 'center',
    borderRadius: '20px',
    fontFamily: '"Segoe UI", Tahoma, Geneva, Verdana, sans-serif',
    backgroundColor: 'rgba(255, 255, 255, 0.85)',
    backdropFilter: 'blur(15px)',
    WebkitBackdropFilter: 'blur(15px)',
    boxShadow: '0 15px 35px rgba(0, 0, 0, 0.2)',
    border: '1px solid rgba(255, 255, 255, 0.6)',
  },
  buttonGroup: {
    marginBottom: '30px',
    display: 'flex',
    justifyContent: 'space-between',
    backgroundColor: 'rgba(200, 220, 205, 0.6)',
    borderRadius: '12px',
    padding: '5px',
  },
  toggleBtn: {
    flex: 1,
    padding: '12px 5px',
    border: 'none',
    borderRadius: '8px',
    backgroundColor: 'transparent',
    color: '#405e46',
    fontWeight: '600',
    fontSize: '0.9rem',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
  },
  activeToggleBtn: {
    flex: 1,
    padding: '12px 5px',
    border: 'none',
    borderRadius: '8px',
    backgroundColor: '#fff',
    color: '#1b4332',
    fontWeight: '700',
    fontSize: '0.9rem',
    cursor: 'pointer',
    boxShadow: '0 3px 10px rgba(0,0,0,0.08)',
    transition: 'all 0.3s ease',
  },
  formContainer: {
    textAlign: 'left',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '18px',
  },
  formTitle: {
    margin: '0 0 15px 0',
    textAlign: 'center',
    color: '#1b4332',
    fontSize: '1.7rem',
    fontWeight: '800',
    letterSpacing: '0.5px',
  },
  input: {
    padding: '14px 16px',
    fontSize: '15px',
    borderRadius: '10px',
    border: '1px solid rgba(45, 106, 79, 0.2)',
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    outline: 'none',
    transition: 'border-color 0.3s ease, box-shadow 0.3s ease',
    color: '#1b4332',
  },
  submitBtn: {
    marginTop: '15px',
    padding: '15px',
    fontSize: '16px',
    backgroundColor: '#2d6a4f',
    color: '#ffffff',
    border: 'none',
    borderRadius: '10px',
    cursor: 'pointer',
    fontWeight: '700',
    letterSpacing: '1px',
    transition: 'all 0.3s ease',
    boxShadow: '0 5px 15px rgba(45, 106, 79, 0.35)',
  },
};

export default LoginPage;
