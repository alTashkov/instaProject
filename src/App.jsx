import './App.css'
import HomePage from './pages/HomePage';
import AuthPage from './pages/AuthPage';
import ProfilePage from './pages/ProfilePage.jsx';
import {Routes, Route} from 'react-router-dom'
import {PageLayout} from "./components/layouts/PageLayout.jsx"

function App() {
  return <>
    <PageLayout>
      <Routes>
        <Route path='/' element={<HomePage/>}/>
        <Route path='/auth' element={<AuthPage/>}/>
        <Route path='/profile' element={<ProfilePage/>}/>
      </Routes>
    </PageLayout>
  </>
}

export default App
