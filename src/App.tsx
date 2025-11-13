import './App.css';
import { Toaster } from 'react-hot-toast';
import { AppRoutes } from './routes/routes';
function App() {
  return (

    <>
      <AppRoutes />
      <Toaster
        position="top-center" 
        reverseOrder={false}
      />
    </>
  );
}

export default App;
