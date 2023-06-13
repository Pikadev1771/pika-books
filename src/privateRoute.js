import { ReactElement } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import useLogin from 'hooks/useLogin';

export default function PrivateRoute({ authentication }) {
  const [init, isLoggedIn] = useLogin();

  if (init) {
    if (authentication) {
      // 로그인 반드시 해야하는 페이지
      return !isLoggedIn ? <Navigate to="/login" /> : <Outlet />;
    } else {
      // 로그인 반드시 안 해야하는 페이지
      return !isLoggedIn ? <Outlet /> : <Navigate to="/" />;
    }
  }
}
