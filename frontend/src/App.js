import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ChatPage } from './Components/pages/MainPage';
import {ErrorPage} from "./Components/pages/ErrorPage";
import { LoginPage} from "./Components/pages/LoginPage";
import {LocalRoute} from './routes'

const ProtectedRoute = ({ children }) => {
  const token = window.localStorage.getItem('token')
  return token ? children : <Navigate replace to="/login" />;
};

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={LocalRoute.loginFront} element={<LoginPage />} />
        <Route path={LocalRoute.root} element={(<ProtectedRoute><ChatPage /></ProtectedRoute>)}/>
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;