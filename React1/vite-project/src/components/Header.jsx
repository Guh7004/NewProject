import { Link } from 'react-router-dom'

const Header = () => {
  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <nav className="flex items-center justify-between">
          <div className="flex items-center">
            <Link to="/" className="text-2xl font-bold text-gray-800 hover:text-blue-600 transition-colors">
              MeuSite
            </Link>
          </div>
          
          <div className="hidden md:flex space-x-8">
            <Link 
              to="/" 
              className="text-gray-600 hover:text-blue-600 transition-colors font-medium"
            >
              Home
            </Link>
            <Link 
              to="/about" 
              className="text-gray-600 hover:text-blue-600 transition-colors font-medium"
            >
              Sobre
            </Link>
          </div>

          {/* Menu mobile */}
          <div className="md:hidden">
            <button className="text-gray-600 hover:text-blue-600 focus:outline-none">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </nav>
      </div>
    </header>
  )
}

export default Header

