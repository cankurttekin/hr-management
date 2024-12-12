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
  const [cvFile, setCvFile] = useState(null); // To store the CV file
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage(''); // Reset error message

    // Validation check
    if (!firstName || !lastName || !email || !phone || !cvFile) {
      setErrorMessage('Lütfen tüm alanları doldurunuz.');
      return;
    }

    // Prepare form data to send as multipart
    const formData = new FormData();
    formData.append('candidate', JSON.stringify({
      firstName,
      lastName,
      position,
      militaryStatus,
      noticePeriod,
      phone,
      email,
    }));
    formData.append('cvFile', cvFile); // Append the CV file

    try {
      const token = localStorage.getItem('token');
      const response = await axios.post(`${REACT_APP_BACKEND_URL}/candidates`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          //'Content-Type': 'multipart/form-data',
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
      setErrorMessage('Aday eklenirken bir hata oluştu. Lütfen tekrar deneyin.');
    }
  };

  const resetForm = () => {
    setFirstName('');
    setLastName('');
    setPosition('');
    setMilitaryStatus('');
    setNoticePeriod('');
    setPhone('');
    setEmail('');
    setCvFile(null); // Reset CV file
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
              <input
                  type="text"
                  placeholder="Pozisyon"
                  value={position}
                  onChange={(e) => setPosition(e.target.value)}
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
            <div className="form-group">İhbar Tarihi:
              <input
                  type="date"
                  placeholder="Notice Period"
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
                  placeholder="E-posta"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>
          <div className="form-row">
            <div className="form-group">
              CV:
              <input
                  type="file"
                  onChange={(e) => setCvFile(e.target.files[0])} // Store the selected CV file
              />
            </div>
          </div>
          <button onClick={handleSubmit}>Gönder</button>
        </modal-content>
      </Modal>
  );
};

export default AddCandidate;
