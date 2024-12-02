import React, { useState } from 'react';
import { Wallet, Mail } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { isAdminEmail, resendVerificationEmail } from '../services/authService';

interface LoginProps {
  onClose: () => void;
}

export function Login({ onClose }: LoginProps) {
  const { login, register } = useAuth();
  const [isRegistering, setIsRegistering] = useState(false);
  const [showResendVerification, setShowResendVerification] = useState(false);
  const [form, setForm] = useState({
    email: '',
    password: '',
    name: '',
    confirmPassword: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [verificationSent, setVerificationSent] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      if (isRegistering) {
        if (form.password !== form.confirmPassword) {
          throw new Error('Passwords do not match');
        }
        await register(form.email, form.password, form.name);
        
        if (isAdminEmail(form.email)) {
          setVerificationSent(true);
          return;
        }
        onClose();
      } else {
        try {
          await login(form.email, form.password);
          onClose();
        } catch (err: any) {
          if (err.message.includes('verify your email')) {
            setShowResendVerification(true);
            setError(err.message);
          } else {
            throw err;
          }
        }
      }
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleResendVerification = async () => {
    try {
      setLoading(true);
      await resendVerificationEmail(form.email, form.password);
      setVerificationSent(true);
      setShowResendVerification(false);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (verificationSent) {
    return (
      <div className="min-h-[400px] flex items-center justify-center bg-gradient-to-br from-green-50 to-orange-50 py-12 px-4">
        <div className="text-center">
          <Mail className="h-12 w-12 text-green-600 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Verify Your Email</h2>
          <p className="text-gray-600 mb-6">
            A verification link has been sent to your email address. Please check your inbox and verify your email to continue.
          </p>
          <button
            onClick={onClose}
            className="text-green-600 hover:text-green-700"
          >
            Close
          </button>
        </div>
      </div>
    );
  }

  if (showResendVerification) {
    return (
      <div className="min-h-[400px] flex items-center justify-center bg-gradient-to-br from-green-50 to-orange-50 py-12 px-4">
        <div className="text-center">
          <Mail className="h-12 w-12 text-green-600 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Email Verification Required</h2>
          <p className="text-gray-600 mb-6">
            Your email needs to be verified before you can log in. Would you like us to send a new verification link?
          </p>
          <div className="space-y-4">
            <button
              onClick={handleResendVerification}
              disabled={loading}
              className="w-full bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50"
            >
              {loading ? 'Sending...' : 'Resend Verification Email'}
            </button>
            <button
              onClick={() => {
                setShowResendVerification(false);
                setError(null);
              }}
              className="w-full text-gray-600 hover:text-gray-800"
            >
              Back to Login
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-[400px] flex items-center justify-center bg-gradient-to-br from-green-50 to-orange-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <div className="flex justify-center">
            <Wallet className="h-12 w-12 text-green-600" />
          </div>
          <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
            {isRegistering ? 'Create your account' : 'Welcome back'}
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            {isRegistering ? 'Start managing your subscriptions' : 'Sign in to manage your subscriptions'}
          </p>
        </div>

        {error && (
          <div className="bg-red-50 border-l-4 border-red-400 p-4">
            <p className="text-sm text-red-700">{error}</p>
          </div>
        )}

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="rounded-md shadow-sm space-y-4">
            {isRegistering && (
              <div>
                <label htmlFor="name" className="sr-only">Full Name</label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  required
                  className="appearance-none rounded-lg relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-green-500 focus:border-green-500 focus:z-10 sm:text-sm"
                  placeholder="Full Name"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                />
              </div>
            )}
            <div>
              <label htmlFor="email-address" className="sr-only">Email address</label>
              <input
                id="email-address"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="appearance-none rounded-lg relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-green-500 focus:border-green-500 focus:z-10 sm:text-sm"
                placeholder="Email address"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
              />
            </div>
            <div>
              <label htmlFor="password" className="sr-only">Password</label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete={isRegistering ? 'new-password' : 'current-password'}
                required
                className="appearance-none rounded-lg relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-green-500 focus:border-green-500 focus:z-10 sm:text-sm"
                placeholder="Password"
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
              />
            </div>
            {isRegistering && (
              <div>
                <label htmlFor="confirm-password" className="sr-only">Confirm Password</label>
                <input
                  id="confirm-password"
                  name="confirm-password"
                  type="password"
                  required
                  className="appearance-none rounded-lg relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-green-500 focus:border-green-500 focus:z-10 sm:text-sm"
                  placeholder="Confirm Password"
                  value={form.confirmPassword}
                  onChange={(e) => setForm({ ...form, confirmPassword: e.target.value })}
                />
              </div>
            )}
          </div>

          <div>
            <button
              type="submit"
              disabled={loading}
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-lg text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:opacity-50"
            >
              {loading ? 'Please wait...' : (isRegistering ? 'Sign up' : 'Sign in')}
            </button>
          </div>

          <div className="text-center">
            <button
              type="button"
              onClick={() => {
                setIsRegistering(!isRegistering);
                setError(null);
              }}
              className="font-medium text-green-600 hover:text-green-500"
            >
              {isRegistering ? 'Already have an account? Sign in' : "Don't have an account? Sign up"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}