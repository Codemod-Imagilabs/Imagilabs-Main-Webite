import logo from '../assets/logos/logo.png';

const Navbar = () => {
  return (
    <nav className="absolute top-0 w-full z-50 py-6 px-8 md:px-16 flex justify-between items-center bg-transparent">
      {/* Logo */}
      <div className="flex items-center cursor-pointer">
        <img src={logo} alt="Imagilabs Logo" className="h-12 w-auto object-contain" />
      </div>

      {/* Navigation Links */}
      <div className="hidden md:flex space-x-8 text-sm font-medium text-gray-300">
        <a href="#homepage" className="hover:text-white transition-colors cursor-pointer text-brand-purple">Homepage</a>
        <a href="#about" className="hover:text-white transition-colors cursor-pointer">About</a>
        <a href="#services" className="hover:text-white transition-colors cursor-pointer">Services</a>
        <a href="#contact" className="hover:text-white transition-colors cursor-pointer">Contact</a>
      </div>
    </nav>
  );
};

export default Navbar;
