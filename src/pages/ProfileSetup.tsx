import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { supabase } from '../lib/supabase';
import { UserProfile } from '../types';

const ProfileSetup: React.FC = () => {
  const { user, userProfile, refreshProfile } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const [formData, setFormData] = useState<Partial<UserProfile>>({
    name: '',
    mobile: '',
    city: '',
    state: '',
    role: 'student',
    college: '',
    year_of_study: '',
    department: '',
    occupation: '',
    company: ''
  });

  useEffect(() => {
    if (!user) {
      navigate('/');
    } else if (userProfile) {
      // Pre-fill if editing existing profile
      setFormData({
        name: userProfile.name || '',
        mobile: userProfile.mobile || '',
        city: userProfile.city || '',
        state: userProfile.state || '',
        role: userProfile.role || 'student',
        college: userProfile.college || '',
        year_of_study: userProfile.year_of_study || '',
        department: userProfile.department || '',
        occupation: userProfile.occupation || '',
        company: userProfile.company || ''
      });
    }
  }, [user, userProfile, navigate]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;
    
    setLoading(true);
    setError('');

    try {
      const profileData = {
        id: user.id,
        email: user.email,
        name: formData.name,
        mobile: formData.mobile,
        city: formData.city,
        state: formData.state,
        role: formData.role,
        college: formData.role === 'student' || formData.role === 'staff' ? formData.college : null,
        year_of_study: formData.role === 'student' ? formData.year_of_study : null,
        department: formData.role === 'student' || formData.role === 'staff' ? formData.department : null,
        occupation: formData.role === 'others' ? formData.occupation : null,
        company: formData.role === 'others' ? formData.company : null,
      };

      const { error: upsertError } = await supabase
        .from('user_profiles')
        .upsert(profileData);

      if (upsertError) throw upsertError;

      await refreshProfile();
      navigate('/');
    } catch (err: any) {
      setError(err.message || 'Failed to save profile');
    } finally {
      setLoading(false);
    }
  };

  if (!user) return null;

  return (
    <div className="min-h-screen bg-surface py-12 px-6">
      <div className="max-w-2xl mx-auto bg-surface-container-lowest p-8 rounded-2xl shadow-xl border border-outline-variant/20">
        <h1 className="text-4xl font-serif text-emerald-900 mb-2">Complete Your Profile</h1>
        <p className="text-stone-500 mb-8">Please provide your details to access all features.</p>

        {error && (
          <div className="bg-red-50 text-red-600 p-4 rounded-xl mb-6 border border-red-100">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-xs font-bold text-stone-600 uppercase tracking-wider mb-2">Name</label>
              <input 
                type="text" 
                name="name"
                required
                value={formData.name}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-surface border border-outline-variant/30 rounded-xl focus:ring-2 focus:ring-primary outline-none"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-stone-600 uppercase tracking-wider mb-2">Mobile Number</label>
              <input 
                type="tel" 
                name="mobile"
                required
                value={formData.mobile}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-surface border border-outline-variant/30 rounded-xl focus:ring-2 focus:ring-primary outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-stone-600 uppercase tracking-wider mb-2">Email ID</label>
            <input 
              type="email" 
              disabled
              value={user.email || ''}
              className="w-full px-4 py-3 bg-surface-container border border-outline-variant/30 rounded-xl text-stone-500 cursor-not-allowed"
            />
            <p className="text-[10px] text-stone-400 mt-1">Email is managed via your authentication provider.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-xs font-bold text-stone-600 uppercase tracking-wider mb-2">City</label>
              <input 
                type="text" 
                name="city"
                required
                value={formData.city}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-surface border border-outline-variant/30 rounded-xl focus:ring-2 focus:ring-primary outline-none"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-stone-600 uppercase tracking-wider mb-2">State</label>
              <input 
                type="text" 
                name="state"
                required
                value={formData.state}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-surface border border-outline-variant/30 rounded-xl focus:ring-2 focus:ring-primary outline-none"
              />
            </div>
          </div>

          <div className="border-t border-outline-variant/20 pt-6">
            <label className="block text-xs font-bold text-stone-600 uppercase tracking-wider mb-4">I am a...</label>
            <div className="flex gap-4 mb-6">
              {['student', 'staff', 'others'].map((role) => (
                <label key={role} className="flex items-center gap-2 cursor-pointer">
                  <input 
                    type="radio" 
                    name="role" 
                    value={role}
                    checked={formData.role === role}
                    onChange={handleChange}
                    className="text-primary focus:ring-primary"
                  />
                  <span className="capitalize text-stone-700 font-medium">{role}</span>
                </label>
              ))}
            </div>

            <div className="space-y-6 bg-surface-container-low p-6 rounded-xl border border-outline-variant/10">
              {(formData.role === 'student' || formData.role === 'staff') && (
                <>
                  <div>
                    <label className="block text-xs font-bold text-stone-600 uppercase tracking-wider mb-2">College / University</label>
                    <input 
                      type="text" 
                      name="college"
                      required
                      value={formData.college}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-surface border border-outline-variant/30 rounded-xl focus:ring-2 focus:ring-primary outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-stone-600 uppercase tracking-wider mb-2">Department</label>
                    <input 
                      type="text" 
                      name="department"
                      required
                      value={formData.department}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-surface border border-outline-variant/30 rounded-xl focus:ring-2 focus:ring-primary outline-none"
                    />
                  </div>
                </>
              )}

              {formData.role === 'student' && (
                <div>
                  <label className="block text-xs font-bold text-stone-600 uppercase tracking-wider mb-2">Year of Study</label>
                  <input 
                    type="text" 
                    name="year_of_study"
                    required
                    value={formData.year_of_study}
                    onChange={handleChange}
                    placeholder="e.g., 3rd Year, Final Year"
                    className="w-full px-4 py-3 bg-surface border border-outline-variant/30 rounded-xl focus:ring-2 focus:ring-primary outline-none"
                  />
                </div>
              )}

              {formData.role === 'others' && (
                <>
                  <div>
                    <label className="block text-xs font-bold text-stone-600 uppercase tracking-wider mb-2">Occupation</label>
                    <input 
                      type="text" 
                      name="occupation"
                      required
                      value={formData.occupation}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-surface border border-outline-variant/30 rounded-xl focus:ring-2 focus:ring-primary outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-stone-600 uppercase tracking-wider mb-2">Company / Organization</label>
                    <input 
                      type="text" 
                      name="company"
                      required
                      value={formData.company}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-surface border border-outline-variant/30 rounded-xl focus:ring-2 focus:ring-primary outline-none"
                    />
                  </div>
                </>
              )}
            </div>
          </div>

          <button 
            type="submit" 
            disabled={loading}
            className="w-full bg-primary text-white font-bold py-4 rounded-xl hover:bg-emerald-800 transition-colors disabled:opacity-50 mt-8 shadow-lg"
          >
            {loading ? 'Saving Profile...' : 'Save Profile'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ProfileSetup;
