import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();
  const [selectedRole, setSelectedRole] = useState(null);

  const handleRoleClick = (role) => {
    setSelectedRole(role);
  };

  const closeModal = () => {
    setSelectedRole(null);
  };

  return (
    <div style={styles.container}>
      {/* Navbar */}
      <nav style={styles.navbar}>
        <ul style={styles.navList}>
          <li><a href="#home" style={styles.navLink}>Home</a></li>
          <li><a href="#about" style={styles.navLink}>About Us</a></li>
          <li><a href="#help" style={styles.navLink}>Help</a></li>
          <li><a href="#contact" style={styles.navLink}>Contact</a></li>
        </ul>
      </nav>

      {/* Main Section */}
      <section id="home" style={styles.heroSection}>
        <div style={styles.contentBox}>
          <h1 style={styles.welcomeText}>Welcome to SmartCivic Hub</h1>
          <div style={styles.buttonGroup}>
            <button style={styles.animatedButton} onClick={() => handleRoleClick('citizen')}>Citizen</button>
            <button style={styles.animatedButton} onClick={() => navigate('./GovernmentLogin')}>Government</button>
            <button style={styles.animatedButton} onClick={() => handleRoleClick('ngo')}>Other NGO</button>
          </div>
        </div>
      </section>

      {/* Modal */}
      {selectedRole && (
        <div style={styles.modalOverlay}>
          <div style={styles.modalContent}>
            <h2 style={styles.modalHeading}>{selectedRole.toUpperCase()}</h2>
            <div style={styles.modalButtons}>
              <button
                style={styles.modalBtn}
                onClick={() => navigate('/login')}
              >
                Login
              </button>
              <button
                style={styles.modalBtn}
                onClick={() => navigate('/signup')}
              >
                Signup
              </button>
            </div>
            <button onClick={closeModal} style={styles.closeBtn}>X</button>
          </div>
        </div>
      )}
    </div>
  );
};

const styles = {
  container: {
    fontFamily: 'sans-serif',
    width: '100vw',
    overflowX: 'hidden',
    margin: 0,
    padding: 0,
    boxSizing: 'border-box',
  },
  navbar: {
    width: '100vw',
    backgroundColor: '#303c6c',
    padding: '15px 0',
    position: 'fixed',
    top: 0,
    left: 0,
    zIndex: 1000,
  },
  navList: {
    display: 'flex',
    justifyContent: 'center',
    gap: '40px',
    listStyle: 'none',
    margin: 0,
    padding: 0,
  },
  navLink: {
    color: 'aliceblue',
    textDecoration: 'none',
    fontSize: '18px',
    fontWeight: 'bold',
    transition: 'color 0.3s',
  },
  heroSection: {
    marginTop: '80px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: 'calc(100vh - 80px)',
    background: 'linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)',
    padding: '20px',
    width: '100vw',
    boxSizing: 'border-box',
  },
  contentBox: {
    width: '100%',
    maxWidth: '600px',
    padding: '60px 20px',
    backgroundColor: 'rgba(255, 255, 255, 0.85)',
    boxShadow: '0 8px 16px rgba(0, 0, 0, 0.1)',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  welcomeText: {
    fontSize: '32px',
    fontWeight: 'bold',
    color: '#303c6c',
    marginBottom: '30px',
    textAlign: 'center',
  },
  buttonGroup: {
    display: 'flex',
    justifyContent: 'center',
    flexWrap: 'wrap',
    gap: '20px',
  },
  animatedButton: {
    padding: '12px 28px',
    fontSize: '16px',
    borderRadius: '25px',
    border: '2px solid #303c6c',
    backgroundColor: '#ffffff',
    color: '#303c6c',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
  },
  modalOverlay: {
    position: 'fixed',
    top: 0, left: 0, right: 0, bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 9999,
  },
  modalContent: {
    backgroundColor: '#fff',
    padding: '40px',
    borderRadius: '12px',
    textAlign: 'center',
    position: 'relative',
    width: '90%',
    maxWidth: '400px',
    boxSizing: 'border-box',
  },
  modalHeading: {
    fontSize: '24px',
    color: '#303c6c',
    marginBottom: '20px',
  },
  modalButtons: {
    display: 'flex',
    justifyContent: 'center',
    gap: '20px',
    marginBottom: '20px',
  },
  modalBtn: {
    padding: '10px 20px',
    fontSize: '16px',
    borderRadius: '20px',
    border: '2px solid #303c6c',
    backgroundColor: '#fff',
    color: '#303c6c',
    cursor: 'pointer',
  },
  closeBtn: {
    position: 'absolute',
    top: '10px',
    right: '15px',
    background: 'transparent',
    border: 'none',
    fontSize: '20px',
    color: '#303c6c',
    cursor: 'pointer',
  }
};

export default Home;
