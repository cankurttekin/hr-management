import React, { useState } from 'react';
import axios from 'axios';
import Modal from 'react-modal';
import '../styles/AddCandidates.css';
import { useNavigate } from 'react-router-dom';
import { REACT_APP_BACKEND_URL } from '../config';

const styles = {
  header: {
    textAlign: 'center',
    marginBottom: '10px',
  },
};

const AddCandidate = ({ isOpen, onClose }) => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [position, setPosition] = useState('');
  const [militaryStatus, setMilitaryStatus] = useState('');
  const [noticePeriod, setNoticePeriod] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [cv, setCv] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage(''); // Reset error message

    if (!firstName || !lastName || !email || !phone) {
      setErrorMessage('Lutfen tum alanlari doldurunuz.');
      return;
    }

    const candidate = {
      firstName,
      lastName,
      position,
      militaryStatus,
      noticePeriod,
      phone,
      email,
      cv
    };

    try {
      const token = localStorage.getItem('token');
      const response = await axios.post(`${REACT_APP_BACKEND_URL}/candidates`, candidate, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status === 201) {
        onClose(); // Close modal on success
        resetForm(); // Clear the form fields
        navigate('/candidates'); // Redirect to candidates page on success
        window.location.reload(); // Refactoring needed
      }
    } catch (error) {
      console.error('Error adding candidate:', error);
      setErrorMessage('Failed to add candidate. Please try again.');
    }
  };

  const resetForm = () => {
    setFirstName('');
    setLastName('');
    setPosition('');
    setMilitaryStatus('');
    setMilitaryStatus('');
    setNoticePeriod('');
    setPhone('');
    setEmail('');
    setCv('');
  };

  return (
      <Modal
          isOpen={isOpen}
          onRequestClose={onClose}
          style={{
            overlay: {
              backgroundColor: 'rgba(0, 0, 0, 0.7)',
            },
            content: {
              top: '50%',
              left: '50%',
              right: 'auto',
              bottom: 'auto',
              marginRight: '-50%',
              transform: 'translate(-50%, -50%)',
              width: '400px',
              padding: '20px',
              borderRadius: '10px',
              backgroundColor: '#ffffff',
              color: '#333',
            },
          }}
      >
        <modal-content>
          <close-button onClick={onClose}>&times;</close-button>
          <h2 style={styles.header}>Aday Ekle</h2>
          {errorMessage && <p className="error-message">{errorMessage}</p>}
          <div className="form-row">
            <div className="form-group">
              <input
                  type="text"
                  placeholder="Ad"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
              />
            </div>
            <div className="form-group">
              <input
                  type="text"
                  placeholder="Soyad"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
              />
            </div>
            <div className="form-group">
              <select
                  value={militaryStatus}
                  onChange={(e) => setMilitaryStatus(e.target.value)}
              >
                <option value="" disabled>Askerlik</option>
                <option value="Tamamlandi">Tamamlandi</option>
                <option value="Muaf">Muaf</option>
                <option value="Tecilli">Tecilli</option>
              </select>
            </div>
          </div>
          <div className="form-row">
            <div className="form-group">
              <input
                  type="date"
                  placeholder="noticePeriod"
                  value={noticePeriod}
                  onChange={(e) => setNoticePeriod(e.target.value)}
              />
            </div>
          </div>
          <div className="form-row">
            <div className="form-group">
              <input
                  type="text"
                  placeholder="Telefon"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
              />
            </div>
            <div className="form-group">
              <input
                  type="email"
                  placeholder="e-posta"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>
          <textarea
              placeholder="cv"
              value={cv}
              onChange={(e) => setCv(e.target.value)}
              rows="4"
          />
          <button onClick={handleSubmit}>Gönder</button>
        </modal-content>
      </Modal>
  );
};

export default AddCandidate;
