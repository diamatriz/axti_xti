import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { supabase } from '../lib/supabaseClient';
import '../styles/Profile.css';

const EMOJI_AVATARS = ['😀', '😎', '🤖', '🐱', '🦊', '🐼', '🦁', '🐶', '🐵', '🦄'];

const Profile = () => {
  const { user } = useAuth();
  const [username, setUsername] = useState('');
  const [selectedEmoji, setSelectedEmoji] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });

  useEffect(() => {
    if (user) {
      fetchProfile();
    }
  }, [user]);

  const fetchProfile = async () => {
    try {
      setIsLoading(true);
      const { data: { session } } = await supabase.auth.getSession();
      
      const response = await fetch('https://pgaypklckjbiozsgboil.supabase.co/functions/v1/profiles', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${session.access_token}`
        },
        body: JSON.stringify({
          action: 'get_profile'
        })
      });

      if (!response.ok) {
        throw new Error('Failed to fetch profile');
      }

      const data = await response.json();
      setUsername(data.username || '');
      setSelectedEmoji(data.avatar_url || EMOJI_AVATARS[Math.floor(Math.random() * EMOJI_AVATARS.length)]);
    } catch (error) {
      console.error('Error fetching profile:', error);
      setMessage({ type: 'error', text: 'Failed to load profile' });
    } finally {
      setIsLoading(false);
    }
  };

  const updateProfile = async (e) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      const { data: { session } } = await supabase.auth.getSession();
      
      const response = await fetch('https://pgaypklckjbiozsgboil.supabase.co/functions/v1/profiles', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${session.access_token}`
        },
        body: JSON.stringify({
          action: 'update_profile',
          username,
          avatar_url: selectedEmoji
        })
      });

      if (!response.ok) {
        throw new Error('Failed to update profile');
      }

      const data = await response.json();
      setMessage({ type: 'success', text: 'Profile updated successfully!' });
    } catch (error) {
      console.error('Error updating profile:', error);
      setMessage({ type: 'error', text: 'Failed to update profile' });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="profile">
      <div className="profile-content">
        <h2>Личный кабинет</h2>
        
        <form onSubmit={updateProfile}>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              value={user?.email || ''}
              disabled
            />
          </div>

          <div className="form-group">
            <label htmlFor="username">Имя пользователя</label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label>Выберите аватар</label>
            <div className="emoji-selector">
              {EMOJI_AVATARS.map((emoji, index) => (
                <button
                  key={index}
                  type="button"
                  className={`emoji-option ${selectedEmoji === emoji ? 'selected' : ''}`}
                  onClick={() => setSelectedEmoji(emoji)}
                >
                  {emoji}
                </button>
              ))}
            </div>
          </div>

          {message && (
            <div className={`message ${message.type}`}>
              {message.text}
            </div>
          )}

          <button type="submit" disabled={isLoading}>
            {isLoading ? 'Сохранение...' : 'Сохранить изменения'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Profile; 