import { Route, Routes } from 'react-router-dom';
import LoginPage from './page/LoginPage';
import LandingPage from './page/LandingPage';
import RegisterPage from './page/RegisterPage';
import VirtualOffice from './page/VirtualOffice';

function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/auth/login" element={<LoginPage />} />
      <Route path="/auth/register" element={<RegisterPage />} />
      <Route path="/virtual-office" element={<VirtualOffice />} />
    </Routes>
  );
}

export default App;
