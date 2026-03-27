import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Mail, Lock, AlertCircle } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { BaseCrudService } from '@/integrations';
import { Students, Teachers, Administrators } from '@/entities/index';
import { useAuthStore, type UserRole } from '@/store/authStore';

export default function LoginPage() {
  const navigate = useNavigate();
  const { setUser } = useAuthStore();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState<UserRole>('student');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const findUserByEmail = async (
    collectionId: 'students' | 'teachers' | 'admins',
    normalizedEmail: string,
  ) => {
    let skip = 0;

    while (true) {
      const result = await BaseCrudService.getAll<Students | Teachers | Administrators>(
        collectionId,
        undefined,
        { limit: 1000, skip },
      );

      const found = result.items.find((item) => item.email?.toLowerCase() === normalizedEmail);
      if (found) return found;
      if (!result.hasNext || result.nextSkip === null) return null;

      skip = result.nextSkip;
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const normalizedEmail = email.trim().toLowerCase();
      const collectionId = role === 'student' ? 'students' : role === 'teacher' ? 'teachers' : 'admins';
      const user = await findUserByEmail(collectionId, normalizedEmail);

      if (!user) {
        setError('Invalid email or role. Please check your credentials.');
        setLoading(false);
        return;
      }

      setUser({
        _id: user._id,
        fullName: user.fullName,
        email: user.email,
        role,
        registrationNumber: (user as Students).registrationNumber,
        department: (user as Teachers).department,
        cnicNumber: (user as any).cnicNumber,
        phoneNumber: (user as Students).contactNumber || (user as any).phoneNumber,
        whatsappNumber: (user as any).whatsappNumber || (user as Students).contactNumber || (user as any).phoneNumber,
        whatsappVerified: Boolean((user as any).whatsappVerified ?? true),
        universityName: (user as any).universityName,
        profilePicture: (user as any).profilePicture,
        adminRole: (user as Administrators).adminRole,
      });

      if (role === 'student') {
        navigate('/menu');
      } else if (role === 'teacher') {
        navigate('/');
      } else {
        navigate('/admin');
      }
    } catch (err) {
      setError('An error occurred during login. Please try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 text-foreground">
      <Header />

      <div className="flex items-center justify-center min-h-[calc(100vh-80px)] px-4 pt-20">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <h1 className="font-heading text-4xl uppercase tracking-tight mb-2">
              COMSATS Cafeteria
            </h1>
            <p className="font-paragraph text-secondary-foreground">
              Staff and Campus Access
            </p>
          </div>

          <div className="bg-background rounded-lg shadow-lg p-8 border border-secondary">
            <h2 className="font-heading text-2xl uppercase tracking-wide mb-6 text-center">
              Sign In
            </h2>

            {error && (
              <div className="mb-6 p-4 bg-destructive/10 border border-destructive rounded-lg flex gap-3">
                <AlertCircle className="w-5 h-5 text-destructive flex-shrink-0 mt-0.5" />
                <p className="font-paragraph text-sm text-destructive">{error}</p>
              </div>
            )}

            <form onSubmit={handleLogin} className="space-y-6">
              <div>
                <label className="font-paragraph text-sm uppercase tracking-wide text-secondary-foreground mb-3 block">
                  Select Your Role
                </label>
                <div className="grid grid-cols-3 gap-3">
                  {(['student', 'teacher', 'admin'] as const).map((itemRole) => (
                    <button
                      key={itemRole}
                      type="button"
                      onClick={() => setRole(itemRole)}
                      className={`py-3 px-4 rounded-lg font-paragraph text-sm uppercase tracking-wide transition-all ${
                        role === itemRole
                          ? 'bg-primary text-primary-foreground border-2 border-primary'
                          : 'bg-secondary/20 text-foreground border-2 border-secondary hover:border-primary'
                      }`}
                    >
                      {itemRole.charAt(0).toUpperCase() + itemRole.slice(1)}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="font-paragraph text-sm uppercase tracking-wide text-secondary-foreground mb-2 block">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-secondary-foreground" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="your.email@comsats.edu.pk"
                    className="w-full pl-12 pr-4 py-3 border border-secondary rounded-lg font-paragraph text-base focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="font-paragraph text-sm uppercase tracking-wide text-secondary-foreground mb-2 block">
                  Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-secondary-foreground" />
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter your password"
                    className="w-full pl-12 pr-4 py-3 border border-secondary rounded-lg font-paragraph text-base focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all"
                    required
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 px-4 bg-primary text-primary-foreground font-paragraph text-sm uppercase tracking-widest rounded-lg hover:bg-slate-800 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
              >
                {loading ? 'Signing In...' : 'Sign In'}
              </button>
            </form>

            <div className="my-6 flex items-center gap-4">
              <div className="flex-1 h-[1px] bg-secondary" />
              <span className="font-paragraph text-xs text-secondary-foreground uppercase">Or</span>
              <div className="flex-1 h-[1px] bg-secondary" />
            </div>

            <p className="font-paragraph text-sm text-center text-secondary-foreground">
              Don&apos;t have an account?{' '}
              <Link to="/register" className="text-primary hover:text-blue-700 font-semibold transition-colors">
                Register here
              </Link>
            </p>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
