import './App.css';

import { BrowserRouter } from 'react-router-dom';
import AppRoutes from './routes/AppRoutes';
import Navigation from './componentes/Navigation';

function App() {
  return (
    <BrowserRouter>
      <Navigation/>
      <div id='body'>
        <AppRoutes />
      </div>
    </BrowserRouter>
  );
}
export default App;
