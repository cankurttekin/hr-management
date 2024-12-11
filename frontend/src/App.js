import React from 'react';
import Sidebar from './components/Sidebar';
import styled from 'styled-components';
import GlobalStyle from './styles/globalStyles';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import Candidates from './components/Candidates';
import { AuthProvider, AuthContext } from './contexts/AuthContext'; // Use AuthContext for the provider
import MainContent from './components/layout/MainContent';

const PrivateRoute = ({ isLoggedIn, children }) => {
    return isLoggedIn ? children : <Navigate to="/login" />;
};

const Container = styled.div`
    display: flex;
`;

const App = () => {
    return (
        <AuthProvider>
            <Router>
                <GlobalStyle />
                <Container>
                    <Sidebar />
                    <MainContent>
                        <Routes>
                            <Route path="/login" element={<Login />} />
                            <Route path="/register" element={<Register />} />
                        </Routes>
                        <AuthContext.Consumer>

                            {({ isLoggedIn }) => (
                                <Routes>
                                    <Route path="/" element={isLoggedIn ? <Navigate to="/candidates" /> : <Navigate to="/login" />} />
                                    <Route path="/register" element={<Register />} />
                                    <Route path="/candidates" element={<Candidates />} />

                                    <Route
                                        path="/candidates"
                                        element={<PrivateRoute isLoggedIn={isLoggedIn}><Candidates /></PrivateRoute>}
                                    />
                                </Routes>
                            )}
                        </AuthContext.Consumer>
                    </MainContent>
                </Container>
            </Router>
        </AuthProvider>
    );
};

export default App;
