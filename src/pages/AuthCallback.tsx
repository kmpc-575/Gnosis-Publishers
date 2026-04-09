import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';

const AuthCallback = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const handleCallback = async () => {
      const { error } = await supabase.auth.getSession();
      
      if (window.opener) {
        // If opened in a popup, notify the opener and close
        window.opener.postMessage({ type: 'OAUTH_AUTH_SUCCESS' }, window.location.origin);
        window.close();
      } else {
        // If redirected in the same window, just go home
        if (error) {
          console.error('Error during auth callback:', error.message);
          navigate('/');
        } else {
          navigate('/');
        }
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
