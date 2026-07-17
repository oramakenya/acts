import { useState } from 'react';
import { supabase } from './supabaseClient';

export function AuthForm() {
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setMessage(null);

    if (isSignUp) {
      const { error } = await supabase.auth.signUp({ email, password });
      if (error) setError(error.message);
      else setMessage('Registration successful! Check your email for a verification link.');
    } else {
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) setError(error.message);
    }
  };

  return (
    <div style={{ maxWidth: '400px', margin: '100px auto', padding: '24px', border: '1px solid #333', borderRadius: '8px', fontFamily: 'sans-serif', backgroundColor: '#111', color: '#fff' }}>
      <h2 style={{ marginTop: 0, marginBottom: '24px' }}>{isSignUp ? 'Create Account' : 'Welcome Back'}</h2>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <label style={{ fontSize: '14px', color: '#aaa' }}>Email Address</label>
          <input 
            type="email" placeholder="you@example.com" value={email} 
            onChange={(e) => setEmail(e.target.value)} required 
            style={{ padding: '10px', borderRadius: '4px', border: '1px solid #444', background: '#222', color: '#fff', fontSize: '16px' }}
          />
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <label style={{ fontSize: '14px', color: '#aaa' }}>Password</label>
          <input 
            type="password" placeholder="••••••••" value={password} 
            onChange={(e) => setPassword(e.target.value)} required 
            style={{ padding: '10px', borderRadius: '4px', border: '1px solid #444', background: '#222', color: '#fff', fontSize: '16px' }}
          />
        </div>
        <button type="submit" style={{ padding: '12px', background: '#0070f3', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', fontSize: '16px', fontWeight: 'bold', marginTop: '8px' }}>
          {isSignUp ? 'Sign Up' : 'Log In'}
        </button>
      </form>
      
      {error && <p style={{ color: '#ff4d4f', marginTop: '16px', fontSize: '14px' }}>{error}</p>}
      {message && <p style={{ color: '#52c41a', marginTop: '16px', fontSize: '14px' }}>{message}</p>}

      <p style={{ marginTop: '24px', textAlign: 'center', fontSize: '14px', color: '#aaa' }}>
        {isSignUp ? 'Already have an account?' : "Don't have an account?"}{' '}
        <span onClick={() => setIsSignUp(!isSignUp)} style={{ color: '#0070f3', cursor: 'pointer', textDecoration: 'underline' }}>
          {isSignUp ? 'Log In' : 'Sign Up'}
        </span>
      </p>
    </div>
  );
}