import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import About from './pages/About';
import AddBlog from './pages/AddBlog';
import AdminLogin from './pages/AdminLogin';
import Blog from './pages/Blog';
import Projects from './pages/Projects';
import AddProject from './pages/AddProject';
import './App.css';

function App() {
  return (
    <Router basename="/">
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="about" element={<About />} />
          <Route path="blog" element={<Blog />} />
          <Route path="projects" element={<Projects />} />
          <Route path="add-blog" element={<AddBlog />} />
          <Route path="admin-login" element={<AdminLogin />} />
          <Route path="projects" element={<Projects />} /> 
          <Route path="add-project" element={<AddProject />} /> 
          {/* Diğer sayfalar buraya eklenecek */}
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
