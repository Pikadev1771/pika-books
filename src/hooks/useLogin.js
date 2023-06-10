import { useState, useEffect } from 'react';
import { authService } from 'booksFirebase';
import { onAuthStateChanged } from 'firebase/auth';

const useLogin = () => {
  const [init, setInit] = useState(false); // firebase 초기화 상태
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    onAuthStateChanged(authService, (user) => {
      if (user) {
        setIsLoggedIn(true);
      } else {
        setIsLoggedIn(false);
      }
      setInit(true);
    });
  }, []);

  return [init, isLoggedIn];
};

export default useLogin;
