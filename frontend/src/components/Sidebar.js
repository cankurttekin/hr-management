import React, { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import AddCandidate from './AddCandidate';
import FilterCandidates from './FilterCandidates';
import { AuthContext } from '../contexts/AuthContext';

const NavbarContainer = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    height: 60px;
    background-color: white;
    padding: 0 20px;
    color: #2f2f2f;
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-bottom: 1px solid ${({ scrolled }) => (scrolled ? '#e5e5e5' : 'transparent')}; /* Change border based on scrolled state */
    z-index: 1000;
    transition: border-bottom 0.3s; /* Smooth transition for border */
`;

const NavbarItems = styled.div`
    display: flex;
    align-items: center;

    @media (max-width: 768px) {
        display: ${({ isOpen }) => (isOpen ? 'block' : 'none')};
        position: absolute;
        top: 60px;
        left: 0;
        right: 0;
        background-color: white;
        padding: 10px 10px;
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
        z-index: 1001;
    }
`;

const NavbarToggle = styled.button`
    display: none;
    background: none;
    border: none;
    font-size: 28px;
    cursor: pointer;
    color: #2f2f2f;
    border-radius: 0;
    width: 22px;
    height: 100%;
    margin: 0;
    padding: 0;

    @media (max-width: 768px) {
        display: block;
    }

    &:hover {
        background-color: transparent;
    }
`;

const NavbarRight = styled.div`
    display: flex;
    align-items: center;
    margin-left: 16px;

    @media (max-width: 768px) {
        justify-content: center;
        margin-left: 0;
        padding-top: 10px;
    }
`;

const NavbarItem = styled.div`
    cursor: pointer;
    padding: 10px;
    border-radius: 5px;
    display: flex;

    &:hover {
        background-color: #dedede;
    }

    & > .material-icons {
        margin-right: 5px;
    }
`;

const AppName = styled.div`
    font-size: 24px;
    font-weight: bold;
    display: flex;
    align-items: center;
    cursor: pointer;
    margin-right: 20px;
    margin-left: 2px;
`;

const Navbar = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);
    const { isLoggedIn, user, logout } = useContext(AuthContext);
    const navigate = useNavigate();
    const [isOpen, setIsOpen] = useState(false); // Dropdown state
    const [scrolled, setScrolled] = useState(false); // State to track scroll position

    const toggleDropdown = () => setIsOpen(!isOpen);

    const handleAddCandidateClick = () => {
        setIsModalOpen(true);
    };

    const handleFilterCandidates = () => {
        setIsFilterModalOpen(true);
    };

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    const handleNavigation = (path) => {
        toggleDropdown();  // Always toggle the dropdown before navigating
        navigate(path);    // Then navigate to the provided path
    };

    // Scroll event listener to update the scrolled state
    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 0); // Set scrolled to true if window is scrolled down
        };

        window.addEventListener('scroll', handleScroll); // Add scroll event listener
        return () => {
            window.removeEventListener('scroll', handleScroll); // Cleanup listener on unmount
        };
    }, []);

    return (
        <NavbarContainer scrolled={scrolled}>
            <AppName onClick={() => navigate('/')}>
                IK Yönetim Sistemi
            </AppName>
            <NavbarToggle onClick={toggleDropdown}>
                <span className="material-icons">menu</span>
            </NavbarToggle>
            <NavbarItems isOpen={isOpen}>
                {isLoggedIn && (
                    <>
                        <NavbarItem onClick={() => handleNavigation('/candidates')}>
                            <span className="material-icons">work</span>
                            Adaylar
                        </NavbarItem>
                        <NavbarItem onClick={() => {toggleDropdown(); handleAddCandidateClick();}}>
                            <span className="material-icons">add</span>
                            Ekle
                        </NavbarItem>
                        <NavbarItem onClick={() => {toggleDropdown(); handleFilterCandidates();}}>
                            <span className="material-icons">tune</span>
                            Filtre
                        </NavbarItem>
                    </>

                )}
                <AddCandidate isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
                <FilterCandidates isOpen={isFilterModalOpen} onClose={() => setIsFilterModalOpen(false)} />
                <NavbarRight>
                    {isLoggedIn && <div style={{ marginRight: '2px' }}><strong>{user}</strong></div>}
                    <NavbarItem onClick={isLoggedIn ? handleLogout : () => navigate('/login')}>
                        <span className="material-icons">{isLoggedIn ? 'logout' : 'login'}</span>
                        {isLoggedIn ? 'Çıkış Yap' : 'Giriş Yap'}
                    </NavbarItem>
                    {!isLoggedIn && (
                        <NavbarItem onClick={() => navigate('/register')}>
                            <span className="material-icons">person_add</span>
                            Kayıt Ol
                        </NavbarItem>
                    )}
                </NavbarRight>
            </NavbarItems>

        </NavbarContainer>
    );
};

export default Navbar;
