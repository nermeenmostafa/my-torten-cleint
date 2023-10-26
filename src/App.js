import logo from './logo.svg';
import './App.css';
import "bootstrap/dist/css/bootstrap.css";
import Navbar from './components/Navbar'
import tortes from './Tortendata';
import HomeScreen from './screens/HomeScreen';
import Torte from './components/Torte';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import { Route, Routes } from 'react-router-dom';
import IsAnon from './components/IsAnon';
import IsPrivate from './components/IsPrivate'
import AddTortePage from './pages/AddTortePage';
import CartPage from './pages/CartPage';
import TorteDetailsPage from './pages/TorteDetailsPage';
import EditTorte from './pages/EditTorte';
import Comment from './components/Comment';
import CommentList from './components/CommentList'
import UserList from './components/UserList';
import ChangeUserRole from './components/ChangeUserRole';

function App() {
  return (

    <div className="App" style={{ backgroundColor: 'palevioletred' }}>
      <Navbar />

      <Routes>
        <Route path="/" element={<HomeScreen />} />
        <Route path="/login" element={<IsAnon><LoginPage /></IsAnon>} />
        <Route path="/signup" element={<IsAnon><SignupPage /></IsAnon>} />
        <Route path="/tortes/add" element={<AddTortePage></AddTortePage>} />
        <Route path="/cart" element={<CartPage></CartPage>} />
        <Route path='/tortes/:id' element={<IsPrivate><TorteDetailsPage /></IsPrivate>} />
        <Route path='/tortes/:id/edit' element={<IsPrivate><EditTorte /></IsPrivate>} />
        <Route path='/comment' element={<Comment></Comment>} />
        <Route path='/commentList' element={<CommentList></CommentList>}/>
        <Route path='/userList' element={<UserList></UserList>}/>
        <Route path='/user/:id' element={<ChangeUserRole></ChangeUserRole>}/>
      </Routes>
    </div>
  );
}

export default App;
