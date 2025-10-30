import { Home } from '../pages/home.tsx';
import { Collection } from '../pages/collection.tsx'
import { TRoute } from '../types/route';
import { routePaths } from '../constants/paths';
import { Cart } from '../pages/cart.tsx';
import { Wish } from '../pages/wish.tsx';
import { TrackOrder } from '../pages/track-order.tsx';
import { Register } from '../pages/register.tsx';
import login from '../pages/login.tsx';
import { ForgotPassword } from '../pages/forgot-password.tsx';
import { Shop } from '../pages/shop.tsx';
import { ProductDetail } from '../pages/productDetail.tsx';
import { CheckOut } from '../pages/checkOut.tsx';


export const publicRoutes: TRoute[] = [
  {
    name: 'Home',
    path: routePaths.Home,
    component: Home,
    exact: true,
  },
  {
    name: 'Login',
    path: routePaths.Login,
    component: login,
    exact: true,
  },
  {
    name: 'Register',
    path: routePaths.Register,
    component: Register,
    exact: true,
  },
  {
    name: 'ForgotPassword',
    path: routePaths.ForgotPassword,
    component: ForgotPassword,
    exact: true,
  },
  {
    name: 'Collection',
    path: routePaths.Collection,
    component: Collection,
    exact: true,
  },
  {
    name: 'ProductDetail',
    path: routePaths.ProductDetail,
    component: ProductDetail,
    exact: true,
  },
  {
    name: 'CheckOut',
    path: routePaths.CheckOut,
    component: CheckOut,
    exact: true,
  },
  {
    name: 'Shop',
    path: routePaths.Shop,
    component: Shop,
    exact: true,
  },

  {
    name: 'Cart',
    path: routePaths.Cart,
    component: Cart,
    exact: true,
  },
  {
    name: 'Wish',
    path: routePaths.Wish,
    component: Wish,
    exact: true,
  },
  {
    name: 'TrackOrder',
    path: routePaths.TrackOrder,
    component: TrackOrder,
    exact: true
  },
];
