export const UserId = () => {
  const generateUserId = () => {
    return `user_${Math.random().toString(36).substring(7)}`;
  };

  const checkUserExisting = () => {
    let existingUserId = localStorage.getItem('userId');

    if (!existingUserId) {
      existingUserId = generateUserId();
      localStorage.setItem('userId', existingUserId);
      return existingUserId;
    }
  };

  return {
    generateUserId,
    checkUserExisting,
  };
};
