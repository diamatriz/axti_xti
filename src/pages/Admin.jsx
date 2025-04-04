// src/pages/Admin.jsx
import React, { useState } from 'react';
import supabase from '../supabaseClient';

const Admin = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [image, setImage] = useState(null);
  const [error, setError] = useState('');

  const handlePublish = async (e) => {
    e.preventDefault();

    if (!title || !content || !image) {
      setError('Заполните все поля');
      return;
    }

    try {
      const { data, error: uploadError } = await supabase.storage
        .from('images') // Убедитесь, что bucket "images" создан в Supabase
        .upload(`public/${image.name}`, image);

      if (uploadError) throw uploadError;

      const imageUrl = supabase.storage
        .from('images')
        .getPublicUrl(data.path).data.publicUrl;

      const { data: postData, error: postError } = await supabase
        .from('posts')
        .insert([{ title, content, image_url: imageUrl }])
        .select();

      if (postError) throw postError;

      console.log('Пост опубликован:', postData);
      alert('Пост успешно опубликован!');
      setTitle('');
      setContent('');
      setImage(null);
    } catch (err) {
      setError('Ошибка при публикации: ' + err.message);
    }
  };

  return (
    <div className="admin-page">
      <h1>Панель администратора</h1>
      {error && <p className="error">{error}</p>}
      <form onSubmit={handlePublish} className="publish-form">
        <input
          type="text"
          placeholder="Заголовок"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <textarea
          placeholder="Содержание"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          required
        />
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setImage(e.target.files[0])}
          required
        />
        <button type="submit">Опубликовать</button>
      </form>
    </div>
  );
};

export default Admin;