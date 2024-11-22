import './App.css'
import HomePage from './pages/HomePage';
import AuthPage from './pages/AuthPage';
import ProfilePage from './pages/ProfilePage.jsx';
import {Routes, Route} from 'react-router-dom'
import {PageLayout} from "./components/layouts/PageLayout.jsx"
import useAuthStore from './store/authStore.js';
import { Navigate } from 'react-router-dom';

function App() {
  const authUser = useAuthStore(state => state.user);
  return <>
    <PageLayout>
      <Routes>
        <Route path='/' element={authUser ? <HomePage/> : <Navigate to="/auth"/>}/>
        <Route path='/auth' element={!authUser ? <AuthPage/> : <Navigate to="/"/>}/>
        <Route path='/profile' element={<ProfilePage/>}/>
      </Routes>
    </PageLayout>
  </>
}

export default App
