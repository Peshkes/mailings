import React, {useState} from 'react';
import {Link, NavLink} from "react-router-dom";
// @ts-ignore
import img from '../assets/vp.webp';

const links = [
    {name: 'Главная', href: '/'},
    {name: 'Рассылки', href: '/messages'},
    {name: 'Клиенты', href: '/clients'},
    {name: 'Настройки', href: '/settings'},
];

const Header: React.FC = () => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    };

    return (
        <header className="bg-cyan-800 text-white w-full">
            <nav className="mx-auto px-4 py-3 flex justify-between">
                <div className="text-2xl font-bold flex items-center">
                    <Link to={'/'} className="text-white">
                        <img src={img} width={40} height={40} alt="logo"/>
                    </Link>
                </div>

                {/* Desktop Menu */}
                <div className="hidden sm:flex space-x-4">
                   {links.map((link, index) => (
                        <NavLink key={index}
                            to={link.href}
                            className={({isActive}) =>
                                isActive ? "bg-white/20 px-3 py-2 rounded" : "hover:bg-white/20 px-3 py-2 rounded"
                            }
                        >
                            {link.name}
                        </NavLink>
                    ))}
                </div>

                {/* Mobile Menu Button */}
                <button
                    className="sm:hidden text-2xl focus:outline-none z-40"
                    onClick={toggleMobileMenu}
                >
                    {isMobileMenuOpen ? (
                        <span className="block h-6 w-6">✕</span>
                    ) : (
                        <span className="block h-6 w-6">☰</span>
                    )}
                </button>
            </nav>

            {/* Mobile Menu */}
            <div
                className={`md:hidden fixed inset-0 bg-blue-700 text-white transition-transform duration-300 ease-in-out z-20 ${
                    isMobileMenuOpen ? 'translate-x-0 opacity-100' : '-translate-x-full opacity-0'
                }`}
            >
                <div className="md:hidden flex flex-col h-full justify-center items-center">
                    {links.map((link, index) => (
                        <NavLink key={index}
                            to={link.href}
                            className={({isActive}) =>
                                isActive ? "block px-4 py-2 bg-blue-800 m-1" : "block px-4 py-2 hover:bg-blue-800 m-1"
                            }
                        >
                            {link.name}
                        </NavLink>
                    ))}
                </div>
            </div>
        </header>
    );
};

export default Header;