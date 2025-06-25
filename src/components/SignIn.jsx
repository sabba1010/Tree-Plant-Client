import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { FcGoogle } from 'react-icons/fc';
import Swal from 'sweetalert2';
import { AuthContext } from '../contexts/AuthProvider';

const SignIn = () => {
  const { signInUser, signInWithGoogle } = useContext(AuthContext);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleSignIn = async (e) => {
    e.preventDefault();
    setLoading(true);

    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;

    try {
      const result = await signInUser(email, password);
      const signInInfo = {
        email,
        lastSignInTime: result.user?.metadata?.lastSignInTime,
      };

      const response = await fetch('https://coffee-store-server-mocha-eight.vercel.app/users', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(signInInfo),
      });

      if (response.ok) {
        Swal.fire({
          icon: 'success',
          title: 'Login Successful',
          text: 'Welcome back!',
          timer: 1500,
          showConfirmButton: false,
        }).then(() => {
          navigate('/', { replace: true });
        });
      } else {
        Swal.fire('Error', `Failed to update user info. (Status: ${response.status})`, 'error');
      }
    } catch (error) {
      console.error('SignIn error:', error);
      Swal.fire('Login Failed', error.message || 'Invalid email or password', 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setLoading(true);

    try {
      const result = await signInWithGoogle();
      const user = result.user;
      const userInfo = {
        email: user.email,
        lastSignInTime: user.metadata?.lastSignInTime,
      };

      const response = await fetch('https://coffee-store-server-mocha-eight.vercel.app/users', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userInfo),
      });

      if (response.ok) {
        Swal.fire({
          icon: 'success',
          title: 'Google Sign-In Successful',
          text: 'Welcome!',
          timer: 1500,
          showConfirmButton: false,
        }).then(() => {
          navigate('/', { replace: true });
        });
      } else {
        Swal.fire('Error', `Failed to update user info. (Status: ${response.status})`, 'error');
      }
    } catch (error) {
      console.error('Google SignIn error:', error);
      Swal.fire('Google Sign-In Failed', error.message || 'Something went wrong', 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6" style={{ backgroundColor: '#01271e' }}>
      <div className="bg-white rounded-lg shadow-lg max-w-md w-full p-8">
        <h1 className="text-4xl font-extrabold text-center mb-8 text-gray-800">Sign In</h1>

        <form onSubmit={handleSignIn} className="space-y-6">
          <div>
            <label htmlFor="email" className="block text-gray-700 font-medium mb-2">
              Email
            </label>
            <input
              type="email"
              name="email"
              id="email"
              required
              className="w-full px-4 py-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-600 transition"
              placeholder="Enter your email"
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-gray-700 font-medium mb-2">
              Password
            </label>
            <input
              type="password"
              name="password"
              id="password"
              required
              className="w-full px-4 py-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-green-600 transition"
              placeholder="Enter your password"
            />
          </div>

          <div className="flex justify-between items-center text-sm">
            <a href="#" className="text-green-600 hover:underline">
              Forgot password?
            </a>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-green-600 text-white font-semibold py-3 rounded-md hover:bg-green-700 transition disabled:opacity-50"
          >
            {loading ? 'Signing In...' : 'Sign In'}
          </button>
        </form>

        <div className="text-center mt-6">
          <button
            onClick={handleGoogleSignIn}
            disabled={loading}
            className="flex items-center justify-center gap-2 w-full bg-white border border-gray-300 py-3 rounded-md hover:bg-gray-100 transition text-gray-700 font-semibold disabled:opacity-50"
          >
            <FcGoogle size={24} />
            {loading ? 'Please wait...' : 'Sign in with Google'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
