import React, { useState, useEffect } from 'react';
import './navbar.css';
import logo from '../../assets/logo.png';
import { Link } from 'react-scroll';
import { FaBars, FaTimes } from 'react-icons/fa';
import details from '../../assets/data.json'

const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const [activeSection, setActiveSection] = useState('about-me');

    // Handle scroll effect for navbar shadow
    useEffect(() => {
        const handleScroll = () => {
            const offset = window.scrollY;
            if (offset > 50) {
                setScrolled(true);
            } else {
                setScrolled(false);
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    // Track active section
    useEffect(() => {
        const handleScrollSpy = () => {
            const sections = ['about-me', 'skills', 'experience', 'projects', 'contact'];
            const scrollPosition = window.scrollY + 200;

            for (const section of sections) {
                const element = document.getElementById(section);
                if (element) {
                    const offsetTop = element.offsetTop;
                    const offsetBottom = offsetTop + element.offsetHeight;

                    if (scrollPosition >= offsetTop && scrollPosition < offsetBottom) {
                        setActiveSection(section);
                        break;
                    }
                }
            }
        };

        window.addEventListener('scroll', handleScrollSpy);
        return () => {
            window.removeEventListener('scroll', handleScrollSpy);
        };
    }, []);

    const menuItems = [
        { id: '01.', text: 'Home', link: 'about-me' },
        { id: '02.', text: 'Skills', link: 'skills' },
        { id: '03.', text: 'Experience', link: 'experience' },
        { id: '04.', text: 'Projects', link: 'projects' },
        { id: '05.', text: 'Contact', link: 'contact' }
    ];

    const handleMenuClick = (id) => {
        const selectedItem = menuItems.find(item => item.id === id);
        if (selectedItem) {
            document.getElementById(selectedItem.link).scrollIntoView({
                behavior: 'smooth'
            });
        }
    }

const handleResumeClick = () => {
    const resumePath = require(`../../assets/${details.resume}`);
    window.open(resumePath, '_blank');
};

const handleLogoClick = () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
};

    return (
        <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
            <img src={logo} alt="logo" className='logo' onClick={handleLogoClick} style={{ cursor: 'pointer' }}/>

            <div className='menu-icon' onClick={() => setIsMenuOpen(!isMenuOpen)}>
                {isMenuOpen ? <FaTimes /> : <FaBars />}
            </div>

            <div className={`dropdown-menu ${isMenuOpen ? 'active' : ''}`}>
                {menuItems.map(({ id, text, link }) => (
                    <Link key={link} className='menuItems' onClick={() => handleMenuClick(id)}>
                        <span>{id}</span> {text}
                    </Link>
                ))}
                <button className='dropdown-resume' onClick={handleResumeClick}>
                    Resume
                </button>
            </div>

            <div className='menu'>
                {menuItems.map(({ id, text, link }) => (
                    <Link
                        key={link}
                        className={`menuItems ${activeSection === link ? 'active' : ''}`}
                        onClick={() => handleMenuClick(id)}
                    >
                        <span>{id}</span> {text}
                    </Link>
                ))}
            </div>

            <button className='resume' onClick={handleResumeClick}>
                Resume
            </button>
        </nav>
    );
};

export default Navbar;