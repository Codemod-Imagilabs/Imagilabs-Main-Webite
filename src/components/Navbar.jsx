import logo from '../assets/logos/logo.png';

const Navbar = () => {
  return (
    <nav className="absolute top-0 w-full z-50 py-6 px-8 md:px-16 flex justify-between items-center bg-transparent">
      {/* Logo */}
      <div className="flex items-center gap-3 cursor-pointer">
        <img src={logo} alt="Imagilabs Logo" className="w-10 h-10 object-contain" />
        <div className="flex flex-col">
          <span className="text-white font-bold text-2xl tracking-tighter">imagilabs</span>
          <span className="text-[10px] font-normal tracking-normal text-gray-400 mt-[-4px]">The Creative Co.</span>
        </div>
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
