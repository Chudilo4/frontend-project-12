import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ChatPage } from './Components/pages/MainPage';
import {ErrorPage} from "./Components/pages/ErrorPage";
import { LoginPage} from "./Components/pages/LoginPage";
import route from './routes'
import {useSocketConnection} from "./hooks/use_connect_socket";

const ProtectedRoute = ({ children }) => {
  const token = window.localStorage.getItem('token')
  return token ? children : <Navigate replace to="/login" />;
};

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={route.loginFront} element={<LoginPage />} />
        <Route path={route.root} element={(<ProtectedRoute><ChatPage /></ProtectedRoute>)}/>
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;