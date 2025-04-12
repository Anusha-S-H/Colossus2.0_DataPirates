import React, { useEffect, useState } from 'react';
import axios from 'axios';



// User Info Modal
const UserInfoModal = ({ user, isOpen, onClose, onChangeProfilePic }) => {
  if (!isOpen) return null;

  return (
    <div style={{
      position: 'fixed', inset: 0, backgroundColor: 'rgba(107, 114, 128, 0.5)',
      display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 10
    }}>
      <div style={{
        backgroundColor: 'white', padding: '2rem', borderRadius: '10px',
        boxShadow: '0 10px 25px rgba(0, 0, 0, 0.2)', width: '400px', position: 'relative'
      }}>
        <button onClick={onClose} style={{
          position: 'absolute', top: '10px', right: '10px', fontSize: '20px',
          color: '#555', border: 'none', background: 'none', cursor: 'pointer'
        }}>✖</button>
        <h2 style={{ fontSize: '24px', fontWeight: '600', marginBottom: '1rem' }}>User Information</h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          <div><strong>Username: </strong>{user.username}</div>
          <div><strong>Email: </strong>{user.email}</div>
          <div><strong>Points: </strong>{user.points}</div>
        </div>
        <div style={{ marginTop: '1rem' }}>
          <button onClick={onChangeProfilePic} style={{
            backgroundColor: '#2563eb', color: 'white', padding: '10px 20px',
            borderRadius: '5px', border: 'none', cursor: 'pointer'
          }}>Change Profile Picture</button>
        </div>
      </div>
    </div>
  );
};

// Report Modal
const ReportIssueModal = ({ isOpen, onClose, onSubmit }) => {
  const [formData, setFormData] = useState({
    image: null, location: '', department: '', dateTime: '', description: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData({ ...formData, image: file });
    }
  };

  const handleSubmit = async () => {
    if (!formData.image || !formData.location || !formData.department || !formData.dateTime || !formData.description) {
      alert('Please fill out all fields and upload an image.');
      return;
    }
    await onSubmit(formData);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div style={{
      position: 'fixed', inset: 0, backgroundColor: 'rgba(107, 114, 128, 0.5)',
      display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 10
    }}>
      <div style={{
        backgroundColor: 'white', padding: '2rem', borderRadius: '10px',
        boxShadow: '0 10px 25px rgba(0, 0, 0, 0.2)', width: '400px', position: 'relative'
      }}>
        <button onClick={onClose} style={{
          position: 'absolute', top: '10px', right: '10px', fontSize: '20px',
          color: '#555', border: 'none', background: 'none', cursor: 'pointer'
        }}>✖</button>
        <h2 style={{ fontSize: '24px', fontWeight: '600', marginBottom: '1rem' }}>Report an Issue</h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          <input type="file" onChange={handleImageUpload} />
          <input type="text" name="location" placeholder="Location" onChange={handleInputChange} />
          <select name="department" onChange={handleInputChange}>
            <option value="">Select Department</option>
            <option value="Roads">Roads</option>
            <option value="Water Supply">Water Supply</option>
            <option value="Electricity">Electricity</option>
            <option value="Other">Other</option>
          </select>
          <input type="datetime-local" name="dateTime" onChange={handleInputChange} />
          <textarea name="description" placeholder="Describe the issue..." onChange={handleInputChange}></textarea>
        </div>
        <button onClick={handleSubmit} style={{
          backgroundColor: '#2563eb', color: 'white', padding: '10px 20px',
          borderRadius: '5px', border: 'none', marginTop: '1rem', cursor: 'pointer'
        }}>Submit Issue</button>
      </div>
    </div>
  );
};

const DashboardPage = () => {
  const [showModal, setShowModal] = useState(false);
  const [showReportModal, setShowReportModal] = useState(false);
  const [profilePic, setProfilePic] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [user, setUser] = useState({
    username: 'JohnDoe',
    email: 'johndoe@example.com',
    points: 0,
  });
  const [reportedIssues, setReportedIssues] = useState([]);
  const [activeTab, setActiveTab] = useState('reported');

  useEffect(() => {
    fetchReportedIssues();
  }, []);

  const fetchReportedIssues = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/issues');
      setReportedIssues(res.data);
    } catch (err) {
      console.error('Error fetching issues:', err.message);
    }
  };

  const handleReportClick = async (issueData) => {
    try {
      const imageFile = selectedImage;
  
      // ✅ Add size check here
      if (imageFile && imageFile.size > 10 * 1024 * 1024) {
        alert("File is too large! Max 10MB allowed.");
        return;
      }
      const imgFormData = new FormData();
      imgFormData.append('image', issueData.image);
  
      console.log('Uploading image:', issueData.image); // Log the image being uploaded
  
      const uploadRes = await axios.post('http://localhost:5000/api/upload', imgFormData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
  
      console.log('Image upload response:', uploadRes.data); // Log the response from the image upload
  
      const imageUrl = uploadRes.data.imageUrl;
      const payload = { ...issueData, image: imageUrl };
  
      console.log('Payload for issue:', payload); // Log the payload being sent to the /api/issues endpoint
  
      const res = await axios.post('http://localhost:5000/api/issues', payload);
  
      setReportedIssues(prev => [...prev, res.data]);
      setUser(prevUser => ({ ...prevUser, points: prevUser.points + 5 }));
      alert('✅ Issue reported! You earned 5 points.');
    } catch (err) {
      const message = err?.response?.data?.error || err.message || 'Something went wrong';
      console.error('🔥 Error in handleReportClick:', message);
      alert(`❌ Failed to report issue: ${message}`);
    }
  };
  const handleProfileClick = () => setShowModal(true);
  const closeModal = () => setShowModal(false);
  const closeReportModal = () => setShowReportModal(false);

  const handleProfilePicChange = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    input.onchange = (e) => {
      const file = e.target.files[0];
      if (file) {
        setProfilePic(URL.createObjectURL(file));
      }
    };
    input.click();
  };

  return (
    <div style={{
      width: '100vw', height: '100vh', backgroundColor: '#f3f4f6', padding: '2rem',
      boxSizing: 'border-box', overflow: 'auto', display: 'flex', flexDirection: 'column'
    }}>
      <div style={{
        position: 'absolute', top: '1rem', left: '1rem', backgroundColor: '#2563eb',
        color: 'white', padding: '0.5rem 1rem', borderRadius: '8px', fontWeight: 'bold'
      }}>
        Points: {user.points}
      </div>

      <h1 style={{
        fontSize: '2rem', fontWeight: 'bold', marginBottom: '2rem', textAlign: 'center'
      }}>Welcome to VillageSmart</h1>

      <div onClick={handleProfileClick} style={{
        position: 'absolute', top: '1rem', right: '1rem', cursor: 'pointer'
      }}>
        <div style={{
          width: '60px', height: '60px', borderRadius: '50%', backgroundColor: '#d1d5db',
          display: 'flex', justifyContent: 'center', alignItems: 'center', overflow: 'hidden'
        }}>
          {profilePic ? (
            <img src={profilePic} alt="Profile" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          ) : (
            <span style={{ color: 'white', fontSize: '1.5rem' }}>{user.username[0]}</span>
          )}
        </div>
      </div>

      <UserInfoModal user={user} isOpen={showModal} onClose={closeModal} onChangeProfilePic={handleProfilePicChange} />

      <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', marginBottom: '2rem' }}>
        <button onClick={() => setActiveTab('reported')} style={{
          backgroundColor: '#2563eb', color: 'white', padding: '10px 20px',
          borderRadius: '8px', border: 'none', cursor: 'pointer', fontWeight: 'bold'
        }}>📝 Reported Issues</button>
        <button onClick={() => setShowReportModal(true)} style={{
          backgroundColor: '#dc2626', color: 'white', padding: '10px 20px',
          borderRadius: '8px', border: 'none', cursor: 'pointer', fontWeight: 'bold'
        }}>📢 Report an Issue</button>
        <button style={{
          backgroundColor: '#059669', color: 'white', padding: '10px 20px',
          borderRadius: '8px', border: 'none', cursor: 'pointer', fontWeight: 'bold'
        }}>🤝 Volunteer</button>
      </div>

      <ReportIssueModal isOpen={showReportModal} onClose={closeReportModal} onSubmit={handleReportClick} />

      {activeTab === 'reported' && (
        <div style={{
          maxWidth: '800px', margin: '0 auto', backgroundColor: 'white',
          padding: '1.5rem', borderRadius: '10px',
          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)'
        }}>
          <h2 style={{ fontSize: '20px', fontWeight: '600', marginBottom: '1rem' }}>Reported Issues</h2>
          {reportedIssues.length > 0 ? (
            <ul>
              {reportedIssues.map((issue, index) => (
                <li key={index} style={{
                  padding: '1rem', border: '1px solid #e5e7eb', borderRadius: '8px',
                  backgroundColor: '#f9fafb', marginBottom: '1rem'
                }}>
                  <p><strong>Location:</strong> {issue.location}</p>
                  <p><strong>Department:</strong> {issue.department}</p>
                  <p><strong>Description:</strong> {issue.description}</p>
                  {issue.image && <img src={issue.image} alt="Issue" style={{
                    marginTop: '0.5rem', maxWidth: '100%', borderRadius: '8px'
                  }} />}
                </li>
              ))}
            </ul>
          ) : <p>No issues reported.</p>}
        </div>
      )}
    </div>
  );
};

export default DashboardPage;