import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { login } from '../store/authSlice';
import Loader from '../components/Loader';

export default function LoginPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { token, loading, error } = useSelector((s) => s.auth);

  const [form, setForm] = useState({
    email: 'eve.holt@reqres.in',
    password: 'cityslicka',
  });

  const [localError, setLocalError] = useState('');

  useEffect(() => {
    if (token) navigate('/users', { replace: true });
  }, [token, navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      form.email !== 'eve.holt@reqres.in' ||
      form.password !== 'cityslicka'
    ) {
      setLocalError('Inavalid credentials.');
      return;
    }

    setLocalError('');
    dispatch(login(form));
  };

  return (
    <div className="flex-center" style={{ height: '100vh' }}>
      <form
        onSubmit={handleSubmit}
        className="card"
        style={{ width: 360, maxWidth: '90%' }}
      >
        <div style={{ marginBottom: '1rem' }}>
          <input
            className="input"
            placeholder="Email"
            value={form.email}
            onChange={(e) =>
              setForm((p) => ({ ...p, email: e.target.value }))
            }
          />
        </div>
        <div style={{ marginBottom: '1rem' }}>
          <input
            className="input"
            type="password"
            placeholder="Password"
            value={form.password}
            onChange={(e) =>
              setForm((p) => ({ ...p, password: e.target.value }))
            }
          />
        </div>

        {(error || localError) && (
          <div className="error" style={{ marginBottom: '1rem' }}>
            {localError || error}
          </div>
        )}

        <label
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            marginBottom: '1.25rem',
          }}
        >
          <input type="checkbox" defaultChecked />
          Remember me
        </label>

        <button
          className="btn btn-primary"
          style={{ width: '100%' }}
          disabled={loading}
        >
          {loading ? <Loader /> : 'Log in'}
        </button>
      </form>
    </div>
  );
}
