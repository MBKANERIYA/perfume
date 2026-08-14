import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

export default function LoginOverlay({ isOpen, onClose }) {
  const { user, login, register, logout, loading } = useAuth();
  const [mode, setMode] = useState('login'); // 'login' or 'register'
  const navigate = useNavigate();
  
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);



  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (mode === 'register' && password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    setIsSubmitting(true);
    
    try {
      if (mode === 'login') {
        await login(email, password);
      } else {
        await register(name, email, phone, password);
      }
    } catch (err) {
      setError(err.message || `Failed to ${mode}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  const toggleMode = (e) => {
    e.preventDefault();
    setMode(mode === 'login' ? 'register' : 'login');
    setError('');
  };

  return (
    <>
      {/* Overlay */}
      <div 
        className={`fixed inset-0 bg-black/50 z-[100000] backdrop-blur-sm transition-opacity duration-700 ${isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
        onClick={onClose}
      />

      {/* Sidebar */}
      <div className={`fixed top-0 right-0 h-full w-full max-w-[400px] bg-white z-[100001] flex flex-col shadow-2xl transition-transform duration-700 ease-in-out ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        
        {/* Header */}
        <div className="px-5 py-4 border-b border-gray-200 flex justify-between items-center">
          <h2 className="font-bebas text-2xl uppercase tracking-widest m-0 flex items-center gap-2">
            {user ? 'MY ACCOUNT' : (mode === 'login' ? 'LOGIN' : 'REGISTER')}
          </h2>
          <button onClick={onClose} className="text-gray-400 hover:text-black">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-8 flex flex-col no-scrollbar">
          {loading ? (
            <div className="flex justify-center py-10">
              <div className="w-8 h-8 border-4 border-gold border-t-transparent rounded-full animate-spin"></div>
            </div>
          ) : user ? (
            <div className="flex flex-col items-center justify-center text-center mt-10">
              <div className="w-20 h-20 bg-gold/10 rounded-full flex items-center justify-center mb-6">
                <span className="font-bebas text-4xl text-gold">{user.name?.charAt(0).toUpperCase()}</span>
              </div>
              <h2 className="font-bebas text-3xl mb-2 uppercase">WELCOME, {user.name}</h2>
              <p className="font-montserrat text-gray-500 text-sm mb-8">{user.email}</p>
              
              <div className="w-full space-y-3">
                <button 
                  onClick={() => { onClose(); navigate('/profile'); }} 
                  className="w-full border border-black text-black font-montserrat text-xs font-bold uppercase tracking-widest py-3 hover:bg-black hover:text-white transition-colors"
                >
                  View Profile
                </button>
                <button 
                  onClick={logout} 
                  className="w-full bg-red-600 hover:bg-red-700 text-white font-bebas text-xl tracking-widest uppercase py-3 transition-colors flex items-center justify-center rounded"
                >
                  LOGOUT
                </button>
              </div>
            </div>
          ) : (
            <div className="flex flex-col mt-4">
              <h2 className="font-bebas text-4xl mb-2 text-center">
                {mode === 'login' ? 'WELCOME BACK' : 'CREATE ACCOUNT'}
              </h2>
              <p className="font-montserrat text-gray-500 text-sm mb-8 text-center">
                {mode === 'login' ? 'Please enter your details to sign in.' : 'Fill in the details to register.'}
              </p>
              
              {error && (
                <div className="bg-red-50 text-red-600 font-montserrat text-xs p-3 rounded mb-6 border border-red-100">
                  {error}
                </div>
              )}

              <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                {mode === 'register' && (
                  <>
                    <div>
                      <label className="block font-montserrat text-xs font-bold uppercase tracking-wider text-gray-700 mb-2">Full Name</label>
                      <input 
                        type="text" 
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                        className="w-full border border-gray-300 p-3 text-sm font-montserrat focus:outline-none focus:border-gold transition-colors"
                        placeholder="Enter your name"
                      />
                    </div>
                    <div>
                      <label className="block font-montserrat text-xs font-bold uppercase tracking-wider text-gray-700 mb-2">Phone Number</label>
                      <input 
                        type="tel" 
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        required
                        className="w-full border border-gray-300 p-3 text-sm font-montserrat focus:outline-none focus:border-gold transition-colors"
                        placeholder="Enter your phone number"
                      />
                    </div>
                  </>
                )}
                <div>
                  <label className="block font-montserrat text-xs font-bold uppercase tracking-wider text-gray-700 mb-2">Email Address</label>
                  <input 
                    type="email" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="w-full border border-gray-300 p-3 text-sm font-montserrat focus:outline-none focus:border-gold transition-colors"
                    placeholder="Enter your email"
                  />
                </div>
                <div>
                  <label className="block font-montserrat text-xs font-bold uppercase tracking-wider text-gray-700 mb-2">Password</label>
                  <input 
                    type="password" 
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="w-full border border-gray-300 p-3 text-sm font-montserrat focus:outline-none focus:border-gold transition-colors"
                    placeholder="Enter your password"
                  />
                </div>
                {mode === 'register' && (
                  <div>
                    <label className="block font-montserrat text-xs font-bold uppercase tracking-wider text-gray-700 mb-2">Confirm Password</label>
                    <input 
                      type="password" 
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      required
                      className="w-full border border-gray-300 p-3 text-sm font-montserrat focus:outline-none focus:border-gold transition-colors"
                      placeholder="Confirm your password"
                    />
                  </div>
                )}
                
                <button 
                  type="submit" 
                  disabled={isSubmitting}
                  className="w-full bg-black hover:bg-gold text-white font-bebas text-xl tracking-widest uppercase py-4 mt-4 transition-colors flex items-center justify-center rounded disabled:opacity-70"
                >
                  {isSubmitting ? (mode === 'login' ? 'SIGNING IN...' : 'REGISTERING...') : (mode === 'login' ? 'SIGN IN' : 'REGISTER')}
                </button>
              </form>
              
              <div className="mt-8 text-center font-montserrat text-xs text-gray-500">
                {mode === 'login' ? (
                  <>Don't have an account? <a href="#" onClick={toggleMode} className="text-black font-bold hover:text-gold uppercase tracking-wider underline">Register</a></>
                ) : (
                  <>Already have an account? <a href="#" onClick={toggleMode} className="text-black font-bold hover:text-gold uppercase tracking-wider underline">Sign In</a></>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
