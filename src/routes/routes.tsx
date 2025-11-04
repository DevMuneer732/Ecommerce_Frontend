import { Route, Routes } from 'react-router-dom';

import { PrivateRoute } from './private-route';
import { privateRoutes } from './private-routes';
import { publicRoutes } from './public-routes';
import { MainLayout } from '../layouts/MainLayout';

const authPaths = [
  '/login',
  '/register',
  '/forgot-password'
];

const authRoutes = publicRoutes.filter(route => authPaths.includes(route.path));
const mainPublicRoutes = publicRoutes.filter(route => !authPaths.includes(route.path));

export const AppRoutes = () => {
  return (
    <Routes>
      {authRoutes.map((item) => {
        const { component: Comp } = item;
        return <Route path={item.path} element={<Comp />} key={item.path} />;
      })}

      <Route element={<MainLayout />}>

        {mainPublicRoutes.map((item) => {
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
      </Route>

    </Routes>
  );
};