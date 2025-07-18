import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Register from './pages/Register';
import Login from './pages/Login';  
import CreatePost from './pages/CreatePost';
import { Link } from 'react-router-dom';
import Feed from './pages/Feed';
import EditPost from './pages/EditPost';
import Profile from './pages/Profile';


function App() {
  return (
    <BrowserRouter>
        <nav>
            <Link to="/register">Register</Link>
            <Link to="/login">Login</Link> {/* ✅ Add this */}
            <Link to="/create-post">Create Post</Link> {/* ✅ Add this */}
            <Link to="/feed">Feed</Link> {/* ✅ Add this */}
            <Link to="/profile">Profile</Link>
      </nav>
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />  {/* ✅ Add this */}
        <Route path="/create-post" element={<CreatePost />} /> {/* ✅ Add this */}
        <Route path="/feed" element={<Feed />} /> {/* ✅ Add this */}
        <Route path="/edit-post/:id" element={<EditPost />} /> {/* ✅ Add this */}
        <Route path="/profile" element={<Profile />} />

      </Routes>
    </BrowserRouter>
    
  );
}
export default App;
