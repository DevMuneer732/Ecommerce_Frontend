import { Navigate, useLocation } from 'react-router-dom';

import { useUserStore } from '../store/user';

export const PrivateRoute = ({ children }) => {
  const isLoggedIn = useUserStore((state) => state.isLoggedIn);
  const { pathname } = useLocation();

  if (!isLoggedIn) {
    return (
      <Navigate
        to={{
          pathname: '/login',
        }}
        replace
        state={`redirect=${pathname}`}
      />
    );
  }

  return children;
};
