
export const routePaths = {
  Home: '/',
  Collection: '/collection',
  Cart: '/cart',
  Wish: '/wish',
  TrackOrder: '/track-order',
  Login: '/login',
  ChangePassword:'/change-password',
  Register: '/register',
  ForgotPassword:'/forgot-password',
  Shop:'/shop',
  ProductDetail: '/shop/:productId', 
  CheckOut:'/checkout',
  MyOrders:'/my-orders',
  OrderDetails:'/my-orders/:id',
  TermsAndConditions:'/terms-and-conditions'
} as const;
