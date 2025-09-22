import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Menu, X, Github, Linkedin, Mail, Settings, LogOut } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { Link, useNavigate } from 'react-router-dom';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { user, isPortfolioOwner, signOut } = useAuth();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    await signOut();
    navigate('/');
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { name: 'Home', href: '#home' },
    { name: 'About', href: '#about' },
    { name: 'Skills', href: '#skills' },
    { name: 'Projects', href: '#projects' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <header 
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-background/95 backdrop-blur-md border-b border-border' 
          : 'bg-transparent'
      }`}
    >
      <nav className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="text-2xl font-bold gradient-text">
            UZ
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="text-muted-foreground hover:text-foreground transition-colors duration-200 relative group"
              >
                {item.name}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-primary group-hover:w-full transition-all duration-300" />
              </a>
            ))}
          </div>

          {/* Social Links */}
          <div className="hidden md:flex items-center space-x-4">
            <Button variant="ghost" size="icon" asChild>
              <a href="https://github.com/Uzma-Zuman" target="_blank" rel="noopener noreferrer">
                <Github className="h-5 w-5" />
              </a>
            </Button>
            <Button variant="ghost" size="icon" asChild>
              <a href="https://www.linkedin.com/in/uzma-zuman-329b0637b/" target="_blank" rel="noopener noreferrer">
                <Linkedin className="h-5 w-5" />
              </a>
            </Button>
            
            {/* Admin Controls */}
            {user ? (
              <div className="flex items-center gap-2">
                {isPortfolioOwner && (
                  <Button variant="outline" size="sm" asChild>
                    <Link to="/auth">
                      <Settings className="h-4 w-4 mr-2" />
                      Admin
                    </Link>
                  </Button>
                )}
                <Button variant="outline" size="sm" onClick={handleSignOut}>
                  <LogOut className="h-4 w-4 mr-2" />
                  Sign Out
                </Button>
              </div>
            ) : (
              <Button variant="outline" size="sm" asChild>
                <Link to="/auth">
                  <Settings className="h-4 w-4 mr-2" />
                  Admin Login
                </Link>
              </Button>
            )}
            <Button variant="ghost" size="icon" asChild>
              <a href="mailto:uzmazuman42@gmail.com">
                <Mail className="h-5 w-5" />
              </a>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </Button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 pb-4 border-t border-border animate-fade-in">
            <div className="flex flex-col space-y-4 pt-4">
              {navItems.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="text-muted-foreground hover:text-foreground transition-colors duration-200"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </a>
              ))}
              <div className="flex items-center space-x-4 pt-4">
                <Button variant="ghost" size="icon" asChild>
                  <a href="https://github.com/Uzma-Zuman" target="_blank" rel="noopener noreferrer">
                    <Github className="h-5 w-5" />
                  </a>
                </Button>
                <Button variant="ghost" size="icon" asChild>
                  <a href="https://www.linkedin.com/in/uzma-zuman-329b0637b/" target="_blank" rel="noopener noreferrer">
                    <Linkedin className="h-5 w-5" />
                  </a>
                </Button>
                
                {/* Mobile Admin Controls */}
                <div className="pt-4 border-t border-border">
                  {user ? (
                    <div className="space-y-2">
                      {isPortfolioOwner && (
                        <Button variant="outline" size="sm" className="w-full justify-start" asChild>
                          <Link to="/auth" onClick={() => setIsMenuOpen(false)}>
                            <Settings className="h-4 w-4 mr-2" />
                            Admin Panel
                          </Link>
                        </Button>
                      )}
                      <Button variant="outline" size="sm" className="w-full justify-start" onClick={() => {
                        handleSignOut();
                        setIsMenuOpen(false);
                      }}>
                        <LogOut className="h-4 w-4 mr-2" />
                        Sign Out
                      </Button>
                    </div>
                  ) : (
                    <Button variant="outline" size="sm" className="w-full justify-start" asChild>
                      <Link to="/auth" onClick={() => setIsMenuOpen(false)}>
                        <Settings className="h-4 w-4 mr-2" />
                        Admin Login
                      </Link>
                    </Button>
                  )}
                </div>
                <Button variant="ghost" size="icon" asChild>
                  <a href="mailto:uzmazuman42@gmail.com">
                    <Mail className="h-5 w-5" />
                  </a>
                </Button>
              </div>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Header;