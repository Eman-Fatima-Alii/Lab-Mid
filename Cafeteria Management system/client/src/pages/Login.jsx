import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';
import { motion } from 'framer-motion';
import { Mail, Lock, ArrowRight, Coffee, Globe, Github } from 'lucide-react';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const user = await login(email, password);
      if (user.role === 'admin') navigate('/admin');
      else if (user.role === 'staff') navigate('/pos');
      else navigate('/');
    } catch (err) {
      alert('Login failed: ' + err.message);
    }
  };

  return (
    <div className="auth-split">
      {/* Visual Side */}
      <div className="auth-visual">
        <img 
          src="/C:/Users/premier/.gemini/antigravity/brain/a15548fb-49f5-491f-8e8b-e6b1615c3d55/cafe_brand_bg_1774350331367.png" 
          alt="Cafe Interior" 
          className="auth-visual-image"
        />
        <div className="auth-visual-overlay"></div>
        <div className="absolute inset-0 flex flex-col justify-center p-20 z-20">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-7xl font-black text-white leading-tight">
              Savor the <br /> 
              <span className="gradient-text">Excellence.</span>
            </h1>
            <p className="text-text-secondary text-2xl mt-6 max-w-lg">
              Experience the pinnacle of cafeteria management with our elite platform.
            </p>
          </motion.div>
        </div>
      </div>

      {/* Form Side */}
      <div className="auth-form-side">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="w-full max-w-md space-y-10"
        >
          <div className="flex flex-col items-center lg:items-start">
            <div className="w-14 h-14 bg-gradient-to-br from-primary to-secondary rounded-2xl flex items-center justify-center mb-6 shadow-xl">
              <Coffee size={28} className="text-white" />
            </div>
            <h2 className="text-4xl font-extrabold tracking-tight">Login to <span className="gradient-text">Cafe Hub</span></h2>
            <p className="text-text-secondary mt-2">Welcome back to the elite community</p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <button className="social-btn"><Globe size={20} /> Google</button>
            <button className="social-btn"><Github size={20} /> Github</button>
          </div>

          <div className="relative flex items-center justify-center">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-glass-border"></div>
            </div>
            <span className="relative bg-[#0f172a] px-4 text-xs font-bold uppercase tracking-widest text-text-muted">or continue with email</span>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-widest text-text-secondary ml-1">Email Address</label>
              <div className="relative group">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-text-muted group-focus-within:text-primary transition-colors" size={20} />
                <input 
                  type="email" 
                  className="modern-input pl-12" 
                  placeholder="explorer@cafe.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-widest text-text-secondary ml-1">Secure Password</label>
              <div className="relative group">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-text-muted group-focus-within:text-primary transition-colors" size={20} />
                <input 
                  type="password" 
                  className="modern-input pl-12" 
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
            </div>
            
            <button type="submit" className="btn-vibrant w-full group py-5 text-lg">
              Access Dashboard <ArrowRight size={22} className="group-hover:translate-x-1 transition-transform" />
            </button>
          </form>

          <p className="text-center lg:text-left text-text-secondary font-medium">
            New here? <Link to="/register" className="text-primary font-bold hover:underline decoration-2 underline-offset-4">Create an elite account</Link>
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default Login;
