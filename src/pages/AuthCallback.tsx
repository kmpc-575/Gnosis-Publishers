import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';

const AuthCallback = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const handleCallback = async () => {
      console.log('Auth callback reached. URL:', window.location.href);
      
      try {
        const { data, error } = await supabase.auth.getSession();
        
        if (error) {
          console.error('Session retrieval error:', error.message);
        } else if (data.session) {
          console.log('Session successfully retrieved!');
        } else {
          console.warn('No session found in callback.');
        }

        if (window.opener) {
          console.log('Notifying opener window...');
          window.opener.postMessage({ type: 'OAUTH_AUTH_SUCCESS' }, window.location.origin);
          setTimeout(() => {
            console.log('Closing popup...');
            window.close();
          }, 500);
        } else {
          console.log('Redirecting to home...');
          navigate('/');
        }
      } catch (err) {
        console.error('Unexpected error in callback:', err);
        navigate('/');
      }
    };

    handleCallback();
  }, [navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-surface">
      <div className="text-center">
        <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
        <p className="text-on-surface-variant font-serif italic">Completing authentication...</p>
      </div>
    </div>
  );
};

export default AuthCallback;
