import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { register as registerService } from '../services/authService'; // Import the register function from authService

const Container = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
`;

const FormWrapper = styled.div`
    width: 100%;
    max-width: 400px; /* Maximum width of form */
    padding: 0 20px;
`;

const Title = styled.h2`
    margin-bottom: 10px;
    color: #333;
`;

const Info = styled.h2`
    color: #666;
    margin-bottom: 10px;
`;

const Input = styled.input`
    background-color: #f9f9f9;
    padding: 10px;
    margin-bottom: 15px;

    &:focus {
        background-color: #fff;
    }
`;

const Button = styled.button`
    margin: 0;
    width: 100%;
    &:disabled {
        background-color: #ccc;
    }
`;

const Error = styled.p`
    color: #eb5b5b;
    margin-top: 10px;
    text-align: center;
`;

const PasswordStrengthFeedback = styled.ul`
    list-style-type: none;
    list-style-position: inside;
    padding-left: 4px;
    margin-bottom: 10px;
`;

const PasswordStrengthItem = styled.li`
    color: ${props => props.isValid ? '#00bd5b' : '#eb5b5b'};
`;

const Register = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [passwordFeedback, setPasswordFeedback] = useState({
        length: false,
        uppercase: false,
        lowercase: false,
        number: false,
        specialChar: false,
    });
    const [isPasswordFocused, setIsPasswordFocused] = useState(false); // Track if the password field is focused
    const navigate = useNavigate();

    // Password validation function
    const validatePassword = (password) => {
        const feedback = {
            length: password.length >= 8,
            uppercase: /[A-Z]/.test(password),
            lowercase: /[a-z]/.test(password),
            number: /[0-9]/.test(password),
            specialChar: /[!@#$%^&*(),.?":{}|<>]/.test(password),
        };
        setPasswordFeedback(feedback);  // Update feedback state
        return Object.values(feedback).every(Boolean);  // Returns true if all conditions are met
    };

    // Handle password change and validation
    const handlePasswordChange = (e) => {
        const newPassword = e.target.value;
        setPassword(newPassword);
        validatePassword(newPassword);
    };

    // Handle password field focus
    const handlePasswordFocus = () => {
        setIsPasswordFocused(true);
    };

    const handlePasswordBlur = () => {
        setIsPasswordFocused(false);
    };

    // Handle form submit
    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(''); // Reset error message

        // Check if fields are empty
        if (!username || !email || !password) {
            setError("Tüm alanların doldurulması gerekli.");
            return;
        }

        // Check password validity
        if (!Object.values(passwordFeedback).every(Boolean)) {
            setError('Parola gereksinimleri sağlamıyor.');
            return;
        }

        try {
            await registerService(username, email, password); // Call the register function
            setError('Kayıt başarılı. Giriş sayfasına yönlendiriliyor.');
            setTimeout(() => navigate('/login'), 1500); // Redirect after 1.5 seconds
        } catch (err) {
            if (err.response && err.response.status === 400) {
                setError(err.response.data);
            } else {
                setError('Kayıt başarısız. Lütfen daha sonra tekrar deneyiniz.'); // General error message
            }
        }
    };

    return (
        <Container>
            <FormWrapper>
                <Title>Yeni kullanıcı kaydı</Title>
                <Info>x.</Info>
                <form onSubmit={handleSubmit}>
                    <Input
                        type="text"
                        placeholder="Username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                    <Input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <Input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={handlePasswordChange}
                        onFocus={handlePasswordFocus}
                        onBlur={handlePasswordBlur}
                    />

                    {/* Show password strength feedback only if user starts typing */}
                    {isPasswordFocused && (
                        <PasswordStrengthFeedback>
                            <PasswordStrengthItem isValid={passwordFeedback.length}>
                                En az 8 karakter
                            </PasswordStrengthItem>
                            <PasswordStrengthItem isValid={passwordFeedback.uppercase}>
                                En az 1 büyük harf
                            </PasswordStrengthItem>
                            <PasswordStrengthItem isValid={passwordFeedback.lowercase}>
                                En az 1 küçük harf
                            </PasswordStrengthItem>
                            <PasswordStrengthItem isValid={passwordFeedback.number}>
                                En az 1 rakam
                            </PasswordStrengthItem>
                            <PasswordStrengthItem isValid={passwordFeedback.specialChar}>
                                En az 1 özel karakter
                            </PasswordStrengthItem>
                        </PasswordStrengthFeedback>
                    )}
                    <Button type="submit" disabled={!Object.values(passwordFeedback).every(Boolean)}>
                        Kayıt Ol
                    </Button>
                    {error && <Error>{error}</Error>}
                </form>
            </FormWrapper>
        </Container>
    );
};

export default Register;
