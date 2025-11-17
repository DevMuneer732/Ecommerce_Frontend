import './App.css';
import { Toaster } from 'react-hot-toast';
import { AppRoutes } from './routes/routes';
import ScrollToTop from './layouts/scrollToTop';
function App() {
  return (

    <>
      <ScrollToTop />
      <AppRoutes />
      <Toaster
        position="top-center"
        reverseOrder={false}
      />
    </>
  );
}

export default App;
