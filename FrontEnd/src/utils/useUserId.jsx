// useUserId.js
import { useState, useEffect } from 'react';
import { UserId } from '../utils/UserId'; // Adjust the path accordingly

const useUserId = () => {
  const [userId, setUserId] = useState('');
  const { generateUserId } = UserId();

  useEffect(() => {
    let existingUserId = localStorage.getItem('userId');

    if (!existingUserId) {
      existingUserId = generateUserId();
      localStorage.setItem('userId', existingUserId);
    }

    setUserId(existingUserId);
  }, []);

  return userId;
};

export default useUserId;
