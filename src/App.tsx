import { Header } from './components/Header/Header';
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import HomePage from './pages/HomePage';
import UserPage from './pages/UserPage';
import { Container } from '@mui/system';
import { Provider } from 'react-redux';
import { store } from './store';

function App() {

  return (
    <div className="App">
      <Provider store={store}>
        <Header></Header>
        <Container maxWidth="sm">
          <BrowserRouter basename="/Github-Search">
            <Routes>
              <Route index element={<HomePage />} />
              <Route path="/user/:login" element={<UserPage />}></Route>
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </BrowserRouter>
        </Container>
      </Provider>
    </div>
  );
}

export default App;
