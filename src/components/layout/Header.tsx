import { useState, useEffect, useRef } from "react";
import { Search, Globe, Menu, User, SlidersHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Link } from "react-router-dom";

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const mainContentRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    mainContentRef.current = document.querySelector('main.overflow-y-auto');

    const handleScroll = (e: Event) => {
      const target = e.target as HTMLElement;
      if (target.scrollTop > 0) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    const mainContent = mainContentRef.current;
    if (mainContent) {
      mainContent.addEventListener('scroll', handleScroll);
    }

    window.addEventListener('scroll', () => {
      setIsScrolled(window.scrollY > 0);
    });

    return () => {
      if (mainContent) {
        mainContent.removeEventListener('scroll', handleScroll);
      }
      window.removeEventListener('scroll', () => {
        setIsScrolled(window.scrollY > 0);
      });
    };
  }, []);

  return (
    <>
      {/* Version Mobile */}
      <header className="fixed top-0 w-full z-50 bg-white md:hidden">
        <div className="px-4 py-3">
          <div className="flex items-center gap-3 bg-white rounded-full border border-gray-200 p-3 shadow-lg">
            <Search className="h-5 w-5 text-gray-600" />
            <div className="flex flex-col flex-1">
              <span className="text-sm font-medium text-gray-800">Destination</span>
              <span className="text-xs text-gray-500">Destination...besoin...N'importe...</span>
            </div>
            <Button 
              variant="outline" 
              size="icon" 
              className="rounded-full border-gray-300"
            >
              <SlidersHorizontal className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </header>

      {/* Version Desktop */}
      <header 
        className={`
          fixed top-0 left-0 right-0 z-50 
          transition-all duration-300
          hidden md:block 
          ${isScrolled ? 
            "bg-white shadow-md border-b border-gray-200" : 
            "bg-transparent"
          }
        `}
      >
        <div className="max-w-[2520px] mx-auto xl:px-20 md:px-10 sm:px-2 px-4">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <Link to="/" className="flex items-center">
              <span className={`text-2xl font-bold ${isScrolled ? 'text-primary' : 'text-primary'}`}>
                LOGO
              </span>
            </Link>

            {/* Search Bar - Only visible when scrolled */}
            {isScrolled && (
              <div className="hidden md:flex flex-1 max-w-md mx-8">
                <div className="relative w-full">
                  <div className="flex items-center bg-white rounded-full border border-gray-300 shadow-md hover:shadow-xl transition-shadow duration-200">
                    <div className="flex-1">
                      <Input
                        type="text"
                        placeholder="Rechercher une destination"
                        className="w-full pl-10 pr-4 py-2 border-0 bg-transparent focus:ring-0 focus:outline-none placeholder-gray-500"
                      />
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                    </div>
                    <div className="pr-1">
                      <Button size="sm" className="rounded-full bg-primary hover:bg-primary-hover h-8 w-8">
                        <Search className="h-4 w-4 text-white" />
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Right Menu */}
            <div className="hidden md:flex items-center gap-4">
              <Button 
                variant="ghost" 
                className={`hover:text-gray-600 ${isScrolled ? 'text-gray-800' : 'text-gray-800'}`}
              >
                Mettre mon logement sur Airbnb
              </Button>
              <Button 
                variant="ghost" 
                size="icon" 
                className={isScrolled ? 'text-gray-800' : 'text-gray-800'}
              >
                <Globe className="h-5 w-5" />
              </Button>
              <Button 
                variant="outline" 
                className="flex items-center gap-2 rounded-full border border-gray-300"
              >
                <Menu className="h-5 w-5" />
                <User className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Search Bar - Positioned between Header and CategoryBar */}
      {!isScrolled && (
        <div className="w-full bg-transparent hidden md:block" style={{ marginTop: "80px" }}>
          <div className="max-w-[2520px] mx-auto xl:px-20 md:px-10 sm:px-2 px-4">
            <div className="max-w-2xl mx-auto">
              <div className="relative">
                <div className="flex items-center bg-white rounded-full border border-gray-300 shadow-md hover:shadow-xl transition-shadow duration-200">
                  <div className="flex-1 px-6 py-3">
                    <Input
                      type="text"
                      placeholder="Trouver une location n'importe où"
                      className="border-0 bg-transparent focus:ring-0 focus:outline-none w-full placeholder-gray-500"
                    />
                  </div>
                  <div className="pr-2">
                    <Button size="icon" className="rounded-full bg-primary hover:bg-primary-hover">
                      <Search className="h-5 w-5 text-white" />
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Header;