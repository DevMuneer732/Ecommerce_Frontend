import { Route, Routes } from 'react-router-dom';

import { PrivateRoute } from './private-route';
import { privateRoutes } from './private-routes';
import { publicRoutes } from './public-routes';

export const AppRoutes = () => {
  return (
    <Routes>
      {publicRoutes.map((item) => {
        const { component: Comp } = item;
        return <Route path={item.path} element={<Comp />} key={item.path} />;
      })}
      {privateRoutes.map((item) => {
        const { component: Comp } = item;
        return (
          <Route
            path={item.path}
            element={
              <PrivateRoute>
                <Comp />
              </PrivateRoute>
            }
            key={item.path}
          />
        );
      })}
    </Routes>
  );
};
