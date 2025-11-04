import { routePaths } from '../constants/paths';
import { Cart } from '../pages/cart';
import { CheckOut } from '../pages/checkOut';
import { Wish } from '../pages/wish';
import { TRoute } from '../types/route';

export const privateRoutes: TRoute[] = [
    {
        name: 'CheckOut',
        path: routePaths.CheckOut,
        component: CheckOut,
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

];
