import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import UserInfoForm from './Pages/UserInfoForm';
import AddMembersForm from './Pages/AddMembersForm';
function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<UserInfoForm />} />
        <Route path='/AddMembersForm' element={<AddMembersForm />} />
      </Routes>
    </Router>
  );
}

export default App;
