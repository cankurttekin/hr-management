import React, { useState } from 'react';
import axios from 'axios';
import Modal from 'react-modal';
import '../styles/FilterCandidates.css';
import { useNavigate } from 'react-router-dom';
import { REACT_APP_BACKEND_URL } from '../config';

const styles = {
    header: {
        textAlign: 'center',
        marginBottom: '10px',
    },
};

const FilterCandidates = ({ isOpen, onClose }) => {
    const [position, setPosition] = useState('');
    const [militaryStatus, setMilitaryStatus] = useState('');
    const [noticePeriod, setNoticePeriod] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [filteredCandidates, setFilteredCandidates] = useState([]);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrorMessage(''); // Reset error message

        /*
        if (!position || !militaryStatus || !noticePeriod) {
            setErrorMessage('Lutfen tum alanlari doldurunuz.');
            return;
        }*/

        try {
            const token = localStorage.getItem('token');
            const response = await axios.get(`${REACT_APP_BACKEND_URL}/candidates`,  {
                params: {
                    position,
                    militaryStatus,
                    noticePeriod,
                },
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            if (response.status === 200) {
                setFilteredCandidates(response.data);
                //onClose(); // Close modal on success
                //resetForm(); // Clear the form fields
                //navigate('/candidates'); // Redirect to candidates page on success
                //window.location.reload(); // Refactoring needed
            }
        } catch (error) {
            console.error('Error fetching candidates:', error);
            setErrorMessage('Failed to fetch candidates. Please try again.');
        }
    };

    const resetForm = () => {
        setPosition('');
        setMilitaryStatus('');
        setNoticePeriod('');
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
                    width: '800px',
                    padding: '20px',
                    borderRadius: '10px',
                    backgroundColor: '#ffffff',
                    color: '#333',
                },
            }}
        >
            <modal-content>
                <close-button onClick={onClose}>&times;</close-button>
                <h2 style={styles.header}>Filtre Uygula</h2>
                {errorMessage && <p className="error-message">{errorMessage}</p>}
                <div className="form-row">
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
                    <div className="form-group">
                        <input
                            type="date"
                            placeholder="noticePeriod"
                            value={noticePeriod}
                            onChange={(e) => setNoticePeriod(e.target.value)}
                        />
                    </div>
                </div>
                <button onClick={handleSubmit}>Filtrele</button>

                {filteredCandidates.length > 0 && (
                    <div className="filtered-candidates">
                        <h3>Adaylar:</h3>
                        <ul>
                            {filteredCandidates.map((candidate) => (
                                <li key={candidate.id}>
                                    {candidate.firstName} {candidate.lastName} - {candidate.position} - {candidate.militaryStatus} - {candidate.noticePeriod}
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
            </modal-content>
        </Modal>
    );
};

export default FilterCandidates;
