import { useEffect, useState } from 'react';
import { useAuth } from '../AuthProvider';
import { supabase } from '../supabaseClient';

interface Profile {
  username: string;
  full_name: string;
  avatar_url: string | null;
}

export function UserWidget() {
  const { user } = useAuth();
  const [profile, setProfile] = useState<Profile | null>(null);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (!user) return;

    // Fetch the real-time profile row we just automated with our database trigger
    async function fetchProfile() {
      const { data, error } = await supabase
        .from('profiles')
        .select('username, full_name, avatar_url')
        .eq('id', user.id)
        .single();

      if (!error && data) {
        setProfile(data);
      }
    }

    fetchProfile();
  }, [user]);

  const handleSignOut = async () => {
    await supabase.auth.signOut();
  };

  if (!user) return null;

  return (
    <div style={{ position: 'relative', fontFamily: 'sans-serif' }}>
      {/* Trigger Button */}
      <button 
        onClick={() => setIsOpen(!isOpen)}
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
          background: '#222',
          border: '1px solid #333',
          color: '#fff',
          padding: '8px 14px',
          borderRadius: '20px',
          cursor: 'pointer',
          fontSize: '14px',
          fontWeight: 500
        }}
      >
        <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#52c41a' }} />
        <span>{profile?.full_name || user.email}</span>
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <>
          {/* Invisible overlay to close dropdown on outside click */}
          <div onClick={() => setIsOpen(false)} style={{ position: 'fixed', inset: 0, zIndex: 998 }} />
          
          <div style={{
            position: 'absolute',
            right: 0,
            top: '45px',
            background: '#161616',
            border: '1px solid #2a2a2a',
            borderRadius: '8px',
            padding: '8px',
            width: '220px',
            boxShadow: '0 10px 25px rgba(0,0,0,0.5)',
            zIndex: 999
          }}>
            <div style={{ padding: '8px', borderBottom: '1px solid #222', marginBottom: '6px' }}>
              <p style={{ margin: 0, fontSize: '12px', color: '#666' }}>Logged in as</p>
              <p style={{ margin: '2px 0 0 0', fontSize: '14px', color: '#ddd', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                @{profile?.username || 'user'}
              </p>
            </div>
            
            <button
              onClick={handleSignOut}
              style={{
                width: '100%',
                textAlign: 'left',
                background: 'transparent',
                border: 'none',
                color: '#ff4d4f',
                padding: '10px 8px',
                borderRadius: '4px',
                cursor: 'pointer',
                fontSize: '14px',
                fontWeight: 'bold',
                transition: 'background 0.2s'
              }}
              onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#2a1415'}
              onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
            >
              Log Out
            </button>
          </div>
        </>
      )}
    </div>
  );
}