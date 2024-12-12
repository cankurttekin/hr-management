import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Modal from 'react-modal';
import styled from "styled-components";
import { REACT_APP_BACKEND_URL } from '../config';

const CandidatesContainer = styled.div`
  margin-top: 20px;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  @media (max-width: 768px) {
    display: none;
  }
`;

const styles = {
  header: {
    textAlign: 'center',
    marginBottom: '10px',
  },
  searchInput: {
    padding: '10px',
    marginBottom: '20px',
    borderRadius: '26px',
    border: '1px solid #ebebea',
    width: '100%',
  },
  tableHeader: {
    cursor: 'pointer',
    color: '#333',
    padding: '10px',
    textAlign: 'left',
  },
  tableRow: {
    cursor: 'pointer',
    '&:hover': {
      backgroundColor: '#f1f1f1',
    },
  },
  tableCell: {
    padding: '10px',
    border: '1px solid #ebebea',
  },
  deleteIcon: {
    color: 'grey',
    cursor: 'pointer',
  },
};

const Candidates = () => {
  const [candidates, setCandidates] = useState([]);
  const [sortColumn, setSortColumn] = useState('firstName');
  const [sortOrder, setSortOrder] = useState('desc');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCandidate, setSelectedCandidate] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(`${REACT_APP_BACKEND_URL}/candidates`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (response.data) {
          setCandidates(response.data);
        } else {
          setCandidates([]); // set to an empty array if the response is empty
        }
      } catch (error) {
        console.error("Error fetching candidates:", error);
      }
    };
    fetchData();
  }, []);

  const columnMap = {
    'Ad': 'firstName',
    'Soyad': 'lastName',
    'Pozisyon': 'position',
    'Askerlik': 'militaryStatus',
    'İhbar Tarihi': 'noticeDate',
    'Telefon': 'phone',
    'E-posta': 'email',
    'Cv': 'cv',
  };

  const handleSort = (column) => {
    const dataKey = columnMap[column]; // Get the data key
    setSortColumn(dataKey);
    setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
  };

  const handleRowClick = (candidate) => {
    setSelectedCandidate(candidate);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedCandidate(null);
  };

  const handleDelete = async (id, e) => {
    e.stopPropagation();
    const token = localStorage.getItem("token");
    await axios.delete(`${REACT_APP_BACKEND_URL}/candidates/${id}`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    setCandidates(prev => prev.filter(app => app.id !== id));
  };

  const handleSaveChanges = async () => {
    const token = localStorage.getItem("token");
    await axios.put(`${REACT_APP_BACKEND_URL}/candidates/${selectedCandidate.id}`, selectedCandidate, {
      headers: { Authorization: `Bearer ${token}` }
    });
    setCandidates(prev =>
        prev.map(app => app.id === selectedCandidate.id ? selectedCandidate : app)
    );
    closeModal();
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSelectedCandidate(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const sortedCandidates = [...candidates].sort((a, b) => {
    const aValue = a[sortColumn];
    const bValue = b[sortColumn];

    if (typeof aValue === 'string' && typeof bValue === 'string') {
      return sortOrder === 'asc' ? aValue.localeCompare(bValue) : bValue.localeCompare(aValue);
    }
    if (typeof aValue === 'number' && typeof bValue === 'number') {
      return sortOrder === 'asc' ? aValue - bValue : bValue - aValue;
    }
    if (aValue < bValue) return sortOrder === 'asc' ? -1 : 1;
    if (aValue > bValue) return sortOrder === 'asc' ? 1 : -1;
    return 0;
  });

  const filteredCandidates = sortedCandidates.filter(app =>
      Object.values(app).some(value =>
          value ? value.toString().toLowerCase().includes(searchTerm.toLowerCase()) : false
      )
  );

  return (
        <CandidatesContainer>
        <h2 style={styles.header}>Aday Listesi</h2>
        <input
            type="text"
            placeholder="Ara"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={styles.searchInput}
        />

        <Table>
          <thead>
          <tr>
            {['Ad', 'Soyad', 'Pozisyon', 'Askerlik', 'İhbar Tarihi', 'Telefon', 'E-posta', 'cv'].map((column) => (
                <th key={column} onClick={() => handleSort(column)} style={styles.tableHeader}>
                  {column.charAt(0).toUpperCase() + column.slice(1)}
                  {sortColumn === columnMap[column] && (
                      <span className="material-icons" style={{fontSize: '16px', marginLeft: '4px'}}>
            {sortOrder === 'asc' ? 'arrow_upward' : 'arrow_downward'}
          </span>
                  )}
                </th>
            ))}
            <th></th>
          </tr>
          </thead>
          <tbody>
          {filteredCandidates.map(app => (
              <React.Fragment key={app.id}>
                <tr style={styles.tableRow} onClick={() => handleRowClick(app)}>
                  <td style={styles.tableCell}>{app.firstName}</td>
                  <td style={styles.tableCell}>{app.lastName}</td>
                  <td style={styles.tableCell}>{app.position}</td>
                  <td style={styles.tableCell}>{app.militaryStatus}</td>
                  <td style={styles.tableCell}>{(app.noticePeriod)}</td>
                  <td style={styles.tableCell}>{(app.phone)}</td>
                  <td style={styles.tableCell}>{(app.email)}</td>
                  <td style={styles.tableCell}>{(app.cv)}</td>
                  <td>
                  <span
                      className="material-icons"
                      style={styles.deleteIcon}
                      onClick={(e) => handleDelete(app.id, e)}
                  >
                    delete
                  </span>
                  </td>
                </tr>

              </React.Fragment>
          ))}
          </tbody>
        </Table>



          {/* Edit Modal */}
          {isModalOpen && selectedCandidate && (
              <Modal
                  isOpen={isModalOpen}
                  onRequestClose={closeModal}
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
                    padding: '20px',
                    borderRadius: '10px',
                    backgroundColor: '#ffffff',
                    color: '#333',
                  },
                }}
            >

              <modal-content>
                <close-button onClick={closeModal}>&times;</close-button>
                <h2 style={styles.header}>Aday Duzenle</h2>
                <input
                    type="text"
                    name="firstName"
                    placeholder="Ad"
                    value={selectedCandidate.firstName}
                    onChange={handleInputChange}
                />
                <input
                    type="text"
                    name="lastName"
                    placeholder="Soyad"
                    value={selectedCandidate.lastName}
                    onChange={handleInputChange}
                />
                <input
                    type="text"
                    name="militaryStatus"
                    placeholder="Askerlik"
                    value={selectedCandidate.militaryStatus}
                    onChange={handleInputChange}
                />
                <input
                    type="date"
                    name="noticePeriod"
                    placeholder="Notice"
                    value={new Date(selectedCandidate.noticePeriod).toISOString().split('T')[0]}
                    onChange={handleInputChange}
                />
                <input
                    type="text"
                    name="phone"
                    placeholder="Telefon"
                    value={selectedCandidate.phone}
                    onChange={handleInputChange}
                />
                <input
                    type="email"
                    name="email"
                    placeholder="Eposta"
                    value={selectedCandidate.email}
                    onChange={handleInputChange}
                />
                <textarea
                    placeholder="CV"
                    value={selectedCandidate.cv}
                    onChange={handleInputChange}
                    rows="4"
                />
                <button onClick={handleSaveChanges}>Kaydet</button>
              </modal-content>
            </Modal>
        )}
        </CandidatesContainer>
  );
};

export default Candidates;
