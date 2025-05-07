import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header className="bg-blue-100 shadow-sm px-4 py-3">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between">
        
        {/* Site Title */}
        <h1 className="text-xl font-bold text-blue-900 mb-2 md:mb-0 text-center">
          <Link to= "/">Pages of Engineer</Link>
        </h1>

        {/* Navigation */}
        <nav className="flex flex-wrap gap-4 text-blue-900 text-sm font-medium justify-center md:justify-end">
          <Link to="/">Home</Link>
          <Link to="/about">About</Link>
          {/*
          <Link to="/projects">Projects</Link>
          <Link to="/blog">Blog</Link>
          <Link to="/reading">Reading</Link>
          */}
        <Link to="/contact">Contact</Link>

        </nav>
      </div>
    </header>
  );
};

export default Header;
