import { useState, useEffect } from 'react';
import { authService } from 'booksFirebase';
import { onAuthStateChanged } from 'firebase/auth';

const useUser = () => {
  const [userObj, setUserObj] = useState(null);

  useEffect(() => {
    onAuthStateChanged(authService, (user) => {
      setUserObj(user);
    });
  }, []);

  return userObj;
};

export default useUser;
