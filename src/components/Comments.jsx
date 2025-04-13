import React, { useState, useEffect } from 'react';
import { supabase } from '../supabaseClient';

const Comments = ({ newsId }) => {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchComments = async () => {
      const { data, error } = await supabase
        .from('comments')
        .select('*')
        .eq('news_id', newsId)
        .order('created_at', { ascending: false });

      if (error) console.error('Error fetching comments:', error);
      else setComments(data || []);
    };

    const checkUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      setUser(user);
    };

    fetchComments();
    checkUser();
  }, [newsId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user || !newComment.trim()) return;

    const { data, error } = await supabase
      .from('comments')
      .insert([
        {
          news_id: newsId,
          user_id: user.id,
          content: newComment.trim(),
          user_email: user.email,
        },
      ]);

    if (error) {
      console.error('Error adding comment:', error);
    } else {
      setComments([data[0], ...comments]);
      setNewComment('');
    }
  };

  return (
    <div className="comments-container">
      <h3>Комментарии ({comments.length})</h3>
      {user ? (
        <form onSubmit={handleSubmit} className="comment-form">
          <textarea
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="Напишите комментарий..."
            required
          />
          <button type="submit">Отправить</button>
        </form>
      ) : (
        <p className="login-prompt">Войдите, чтобы оставить комментарий</p>
      )}
      <div className="comments-list">
        {comments.map((comment) => (
          <div key={comment.id} className="comment">
            <div className="comment-header">
              <span className="comment-author">{comment.user_email}</span>
              <span className="comment-date">
                {new Date(comment.created_at).toLocaleDateString()}
              </span>
            </div>
            <p className="comment-content">{comment.content}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Comments; 