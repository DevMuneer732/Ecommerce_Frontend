import { MyOrders } from '../pages/my-orders';
import { routePaths } from '../constants/paths';
import { Cart } from '../pages/cart';
import { CheckOut } from '../pages/checkOut';
import { Wish } from '../pages/wish';
import { TRoute } from '../types/route';
import { OrderDetails } from '../pages/orderDetails';
import ChangePassword from '../pages/change-password';

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
    {
        name: 'MyOrders',
        path: routePaths.MyOrders,
        component: MyOrders,
        exact: true
    },
    {
        name: 'OrderDetails',
        path: routePaths.OrderDetails,
        component: OrderDetails,
        exact: true,
    },
    {
        name:'ChangePassword',
        path:routePaths.ChangePassword,
        component:ChangePassword,
        exact:true
    }

];
