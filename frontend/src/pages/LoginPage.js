import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Eye, EyeOff, Mail, Lock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { MOCK_USERS } from '@/utils/mockData';
import { toast } from 'sonner';

const LoginPage = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: '' });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};

    if (!formData.email) {
      newErrors.email = 'Email is required';
    }
    if (!formData.password) {
      newErrors.password = 'Password is required';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    // Check credentials
    const user = MOCK_USERS.find(
      (u) => u.email === formData.email && u.password === formData.password
    );

    if (user) {
      localStorage.setItem('fosys_user', JSON.stringify(user));
      toast.success(`Welcome back, ${user.name}!`);
      navigate(`/dashboard/${user.role}`);
    } else {
      toast.error('Invalid email or password');
      setErrors({ email: 'Invalid credentials' });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 flex items-center justify-center px-6">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <img src="/assets/logo.jpg" alt="FOSYS" className="h-12 w-12 rounded-lg" />
            <span className="text-3xl font-bold text-white" style={{fontFamily: 'Work Sans'}}>FOSYS</span>
          </div>
          <p className="text-slate-400">Sign in to your workspace</p>
        </div>

        {/* Login Form */}
        <div className="bg-slate-800/50 backdrop-blur-sm p-8 rounded-xl border border-slate-700">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-slate-200">Email Address</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
                <Input
                  id="email"
                  name="email"
                  type="email"
                  data-testid="login-email-input"
                  placeholder="your.email@fosys.com"
                  value={formData.email}
                  onChange={handleChange}
                  className="pl-10 bg-slate-900/50 border-slate-600 text-white placeholder:text-slate-500"
                />
              </div>
              {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="password" className="text-slate-200">Password</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
                <Input
                  id="password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  data-testid="login-password-input"
                  placeholder="Enter your password"
                  value={formData.password}
                  onChange={handleChange}
                  className="pl-10 pr-10 bg-slate-900/50 border-slate-600 text-white placeholder:text-slate-500"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-slate-300"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
              {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}
            </div>

            <div className="flex items-center justify-between">
              <button
                type="button"
                onClick={() => navigate('/forgot-password')}
                data-testid="forgot-password-link"
                className="text-sm text-blue-400 hover:text-blue-300"
              >
                Forgot password?
              </button>
            </div>

            <Button
              type="submit"
              data-testid="login-submit-btn"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-6 text-lg font-semibold"
            >
              Sign In
            </Button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-slate-400 text-sm">
              Don't have an account?{' '}
              <button
                onClick={() => navigate('/signup')}
                data-testid="signup-link"
                className="text-blue-400 hover:text-blue-300 font-medium"
              >
                Sign up
              </button>
            </p>
          </div>
        </div>

        {/* Mock Credentials Info */}
        <div className="mt-6 bg-slate-800/30 p-4 rounded-lg border border-slate-700">
          <p className="text-slate-400 text-xs mb-2 font-semibold">Demo Credentials:</p>
          <div className="space-y-1 text-xs text-slate-500">
            <p>Intern: intern@fosys.com / Intern@123</p>
            <p>Employee: employee@fosys.com / Employee@123</p>
            <p>Manager: manager@fosys.com / Manager@123</p>
            <p>Admin: admin@fosys.com / Admin@123</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;