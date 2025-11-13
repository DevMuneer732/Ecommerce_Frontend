
export const routePaths = {
  Home: '/',
  Collection: '/collection',
  Cart: '/cart',
  Wish: '/wish',
  TrackOrder: '/track-order',
  Login: '/login',
  Register: '/register',
  ForgotPassword:'/forgot-password',
  Shop:'/shop',
  ProductDetail: '/shop/:productId', 
  CheckOut:'/checkout',
  MyOrders:'/my-orders',
  OrderDetails:'/my-orders/:orderId',
} as const;
