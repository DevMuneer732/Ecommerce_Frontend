import './App.css';

import { AppRoutes } from './routes/routes';
import { Content } from './layouts/content';
import { Footer } from './layouts/footer';
import { Header } from './layouts/header';
import Navbar from './layouts/navbar.tsx';



function App() {
  return (

    <>
      <Header />
      <Navbar />
      <Content>
        <AppRoutes />
      </Content>
      <Footer />
    </>
  );
}

export default App;
