import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import api from '../api/api.js';
import { motion } from 'framer-motion';
import { User, Mail, Lock, Smartphone, Hash, UserPlus, Coffee, ArrowRight, Github } from 'lucide-react';

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    role: 'student',
    rollNo: '',
    whatsapp: ''
  });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post('/auth/register', formData);
      alert('Registration successful! Please login.');
      navigate('/login');
    } catch (err) {
      alert('Registration failed: ' + err.message);
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
              Join the <br /> 
              <span className="gradient-text">Elite.</span>
            </h1>
            <p className="text-text-secondary text-2xl mt-6 max-w-lg">
              Begin your journey with the most advanced cafeteria management experience.
            </p>
          </motion.div>
        </div>
      </div>

      {/* Form Side */}
      <div className="auth-form-side overflow-y-auto">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="w-full max-w-xl space-y-8"
        >
          <div className="flex flex-col items-center lg:items-start">
            <div className="w-14 h-14 bg-gradient-to-br from-primary to-secondary rounded-2xl flex items-center justify-center mb-6 shadow-xl">
              <Coffee size={28} className="text-white" />
            </div>
            <h2 className="text-4xl font-extrabold tracking-tight">Create <span className="gradient-text">Account</span></h2>
            <p className="text-text-secondary mt-2">Join the future of cafeteria digital services</p>
          </div>

          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-widest text-text-secondary ml-1">Full Name</label>
              <div className="relative group">
                <User size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-text-muted group-focus-within:text-primary" />
                <input 
                  type="text" className="modern-input pl-12" placeholder="John Doe"
                  onChange={(e) => setFormData({...formData, name: e.target.value})} required
                />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-widest text-text-secondary ml-1">Email Address</label>
              <div className="relative group">
                <Mail size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-text-muted group-focus-within:text-primary" />
                <input 
                  type="email" className="modern-input pl-12" placeholder="john@example.com"
                  onChange={(e) => setFormData({...formData, email: e.target.value})} required
                />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-widest text-text-secondary ml-1">Access Password</label>
              <div className="relative group">
                <Lock size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-text-muted group-focus-within:text-primary" />
                <input 
                  type="password" className="modern-input pl-12" placeholder="••••••••"
                  onChange={(e) => setFormData({...formData, password: e.target.value})} required
                />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-widest text-text-secondary ml-1">Selection Role</label>
              <div className="relative group">
                <UserPlus size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-text-muted group-focus-within:text-primary" />
                <select 
                  className="modern-input pl-12 bg-bg-deep appearance-none"
                  onChange={(e) => setFormData({...formData, role: e.target.value})}
                >
                  <option value="student">Student</option>
                  <option value="teacher">Teacher</option>
                  <option value="staff">Cafe Staff</option>
                </select>
              </div>
            </div>
            
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-widest text-text-secondary ml-1">
                {formData.role === 'staff' ? 'Identification ID' : 'Institutional Roll No'}
              </label>
              <div className="relative group">
                <Hash size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-text-muted group-focus-within:text-primary" />
                <input 
                  type="text" className="modern-input pl-12" placeholder={formData.role === 'staff' ? 'STAFF-001' : 'ROLL-2023'}
                  onChange={(e) => setFormData({...formData, rollNo: e.target.value})} required
                />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-widest text-text-secondary ml-1">WhatsApp Connect</label>
              <div className="relative group">
                <Smartphone size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-text-muted group-focus-within:text-primary" />
                <input 
                  type="text" className="modern-input pl-12" placeholder="+92 3XX XXXXXXX"
                  onChange={(e) => setFormData({...formData, whatsapp: e.target.value})}
                />
              </div>
            </div>

            <div className="md:col-span-2 pt-6">
              <button type="submit" className="btn-vibrant w-full py-5 text-lg group">
                 Initialize Account <ArrowRight size={22} className="group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </form>

          <p className="text-center lg:text-left text-text-secondary font-medium">
            Already registered? <Link to="/login" className="text-primary font-bold hover:underline decoration-2 underline-offset-4">Sign into portal</Link>
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default Register;
