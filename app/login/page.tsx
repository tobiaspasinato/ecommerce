'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useLogin } from '../hooks/useAuth';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const loginMutation = useLogin();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
        loginMutation.mutate({email, password});
        router.push('/');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al iniciar sesión');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{
      background: 'linear-gradient(135deg, #2d1b4e 0%, #3d2d6b 50%, #1e3c72 100%)',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      minHeight: '100vh',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    }}>
      <div style={{
        background: 'rgba(255, 255, 255, 0.1)',
        backdropFilter: 'blur(10px)',
        borderRadius: '24px',
        padding: '2.5rem',
        width: '90%',
        maxWidth: '380px',
        boxShadow: '0 8px 32px rgba(0, 0, 0, 0.2)',
        border: '1px solid rgba(255, 255, 255, 0.1)',
      }}>
        <form onSubmit={handleSubmit}>
          {error && (
            <p style={{
              color: '#ff6b6b',
              marginBottom: '1.5rem',
              fontSize: '0.875rem',
              textAlign: 'center',
            }}>
              {error}
            </p>
          )}

          <div style={{ marginBottom: '1.5rem' }}>
            <input
              id="email"
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              style={{
                width: '100%',
                padding: '0.875rem 1rem',
                fontSize: '0.95rem',
                border: 'none',
                borderBottom: '2px solid rgba(255, 255, 255, 0.3)',
                background: 'transparent',
                color: 'white',
                outline: 'none',
                transition: 'border-color 0.3s ease',
                boxSizing: 'border-box',
              }}
              onFocus={(e) => {
                e.currentTarget.style.borderBottomColor = 'rgba(255, 255, 255, 0.6)';
              }}
              onBlur={(e) => {
                e.currentTarget.style.borderBottomColor = 'rgba(255, 255, 255, 0.3)';
              }}
            />
          </div>

          <div style={{ marginBottom: '2rem' }}>
            <input
              id="password"
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              style={{
                width: '100%',
                padding: '0.875rem 1rem',
                fontSize: '0.95rem',
                border: 'none',
                borderBottom: '2px solid rgba(255, 255, 255, 0.3)',
                background: 'transparent',
                color: 'white',
                outline: 'none',
                transition: 'border-color 0.3s ease',
                boxSizing: 'border-box',
              }}
              onFocus={(e) => {
                e.currentTarget.style.borderBottomColor = 'rgba(255, 255, 255, 0.6)';
              }}
              onBlur={(e) => {
                e.currentTarget.style.borderBottomColor = 'rgba(255, 255, 255, 0.3)';
              }}
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            style={{
              width: '100%',
              padding: '0.875rem',
              fontSize: '0.95rem',
              fontWeight: '600',
              letterSpacing: '0.05em',
              background: loading ? 'rgba(147, 51, 234, 0.5)' : 'linear-gradient(135deg, #6b3dd6 0%, #3b82f6 100%)',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              cursor: loading ? 'not-allowed' : 'pointer',
              opacity: loading ? 0.6 : 1,
              transition: 'transform 0.2s ease, box-shadow 0.2s ease',
              boxShadow: '0 4px 15px rgba(107, 61, 214, 0.4)',
            }}
            onMouseEnter={(e) => {
              if (!loading) {
                e.currentTarget.style.transform = 'translateY(-2px)';
                e.currentTarget.style.boxShadow = '0 6px 20px rgba(107, 61, 214, 0.6)';
              }
            }}
            onMouseLeave={(e) => {
              if (!loading) {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 4px 15px rgba(107, 61, 214, 0.4)';
              }
            }}
          >
            {loading ? 'CARGANDO...' : 'LOGIN'}
          </button>
        </form>
      </div>
    </div>
  );
}
