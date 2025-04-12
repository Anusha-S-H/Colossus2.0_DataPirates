import React, { useState } from 'react';

const GovernmentLogin = () => {
  const [departmentType, setDepartmentType] = useState('');
  const [otherDepartment, setOtherDepartment] = useState('');
  const [govType, setGovType] = useState('');
  const [locationDetails, setLocationDetails] = useState({
    place: '',
    district: '',
    taluk: '',
    pincode: ''
  });
  const [authorityId, setAuthorityId] = useState('');
  const [password, setPassword] = useState('');
  const [isSignUp, setIsSignUp] = useState(false);

  const handleLocationChange = (e) => {
    setLocationDetails({ ...locationDetails, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({ departmentType, otherDepartment, govType, locationDetails, authorityId, password, isSignUp });
  };

  return (
    <div style={{ 
  
        minHeight: '100vh', // Ensures the background takes up the full height of the screen
        display: 'flex', // Flexbox layout to center the content
        justifyContent: 'center', // Centers the content horizontally
        alignItems: 'center', // Centers the content vertically
        backgroundColor: '#f7fafc', // Background color for the page
        padding: '20px',
        width: '100vh'// Ensures the background occupies the full screen width
        
    }}>
      <div style={{ 
        width: '100%', 
        maxWidth: '1200px', 
        padding: '30px', 
        backgroundColor: 'white', 
        borderRadius: '16px', 
        boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)' 
      }}>
        <h2 style={{ fontSize: '24px', fontWeight: 'bold', textAlign: 'center', marginBottom: '24px' }}>
          Government {isSignUp ? 'Login' : 'Sign Up'}
        </h2>
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {!isSignUp && (
            <div>
              <label htmlFor="departmentType" style={{ display: 'block', marginBottom: '8px', fontSize: '14px', color: '#333' }}>Department Type</label>
              <select 
                id="departmentType" 
                name="departmentType" 
                value={departmentType} 
                onChange={(e) => setDepartmentType(e.target.value)} 
                style={{
                  width: '100%',
                  padding: '12px',
                  borderRadius: '8px',
                  border: '1px solid #ccc',
                  fontSize: '14px',
                  color: '#333',
                }}
              >
                <option value="">Select</option>
                <option value="panchayat">Panchayat</option>
                <option value="municipal">Municipal Corporation</option>
                <option value="roadways">Roadways</option>
                <option value="railways">Railways</option>
                <option value="irrigation">Irrigation</option>
                <option value="electricity">Electricity</option>
                <option value="other">Other</option>
              </select>
            </div>
          )}

          {departmentType === 'other' && !isSignUp && (
            <div>
              <label htmlFor="otherDepartment" style={{ display: 'block', marginBottom: '8px', fontSize: '14px', color: '#333' }}>Specify Department</label>
              <input 
                id="otherDepartment" 
                name="otherDepartment" 
                value={otherDepartment} 
                onChange={(e) => setOtherDepartment(e.target.value)} 
                style={{
                  width: '100%',
                  padding: '12px',
                  borderRadius: '8px',
                  border: '1px solid #ccc',
                  fontSize: '14px',
                  color: '#333',
                }}
              />
            </div>
          )}

          {(departmentType === 'panchayat' || departmentType === 'municipal') && !isSignUp && (
            <>
              <div>
                <label htmlFor="place" style={{ display: 'block', marginBottom: '8px', fontSize: '14px', color: '#333' }}>Place</label>
                <input 
                  id="place" 
                  name="place" 
                  value={locationDetails.place} 
                  onChange={handleLocationChange} 
                  style={{
                    width: '100%',
                    padding: '12px',
                    borderRadius: '8px',
                    border: '1px solid #ccc',
                    fontSize: '14px',
                    color: '#333',
                  }}
                />
              </div>
              <div>
                <label htmlFor="district" style={{ display: 'block', marginBottom: '8px', fontSize: '14px', color: '#333' }}>District</label>
                <input 
                  id="district" 
                  name="district" 
                  value={locationDetails.district} 
                  onChange={handleLocationChange} 
                  style={{
                    width: '100%',
                    padding: '12px',
                    borderRadius: '8px',
                    border: '1px solid #ccc',
                    fontSize: '14px',
                    color: '#333',
                  }}
                />
              </div>
              <div>
                <label htmlFor="taluk" style={{ display: 'block', marginBottom: '8px', fontSize: '14px', color: '#333' }}>Taluk</label>
                <input 
                  id="taluk" 
                  name="taluk" 
                  value={locationDetails.taluk} 
                  onChange={handleLocationChange} 
                  style={{
                    width: '100%',
                    padding: '12px',
                    borderRadius: '8px',
                    border: '1px solid #ccc',
                    fontSize: '14px',
                    color: '#333',
                  }}
                />
              </div>
              <div>
                <label htmlFor="pincode" style={{ display: 'block', marginBottom: '8px', fontSize: '14px', color: '#333' }}>Pincode</label>
                <input 
                  id="pincode" 
                  name="pincode" 
                  value={locationDetails.pincode} 
                  onChange={handleLocationChange} 
                  style={{
                    width: '100%',
                    padding: '12px',
                    borderRadius: '8px',
                    border: '1px solid #ccc',
                    fontSize: '14px',
                    color: '#333',
                  }}
                />
              </div>
            </>
          )}

          {(departmentType === 'roadways' || departmentType === 'railways' || departmentType === 'irrigation' || departmentType === 'electricity' || departmentType === 'other') && !isSignUp && (
            <div>
              <label htmlFor="govType" style={{ display: 'block', marginBottom: '8px', fontSize: '14px', color: '#333' }}>Government Type</label>
              <select 
                id="govType" 
                name="govType" 
                value={govType} 
                onChange={(e) => setGovType(e.target.value)} 
                style={{
                  width: '100%',
                  padding: '12px',
                  borderRadius: '8px',
                  border: '1px solid #ccc',
                  fontSize: '14px',
                  color: '#333',
                }}
              >
                <option value="">Select</option>
                <option value="state">State Government</option>
                <option value="central">Central Government</option>
              </select>
            </div>
          )}

          <div>
            <label htmlFor="authorityId" style={{ display: 'block', marginBottom: '8px', fontSize: '14px', color: '#333' }}>Authority ID</label>
            <input 
              id="authorityId" 
              type="text" 
              value={authorityId} 
              onChange={(e) => setAuthorityId(e.target.value)} 
              style={{
                width: '100%',
                padding: '12px',
                borderRadius: '8px',
                border: '1px solid #ccc',
                fontSize: '14px',
                color: '#333',
              }}
            />
          </div>
          <div>
            <label htmlFor="password" style={{ display: 'block', marginBottom: '8px', fontSize: '14px', color: '#333' }}>Password</label>
            <input 
              id="password" 
              type="password" 
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
              style={{
                width: '100%',
                padding: '12px',
                borderRadius: '8px',
                border: '1px solid #ccc',
                fontSize: '14px',
                color: '#333',
              }}
            />
          </div>

          <button type="submit" style={{
            width: '100%',
            marginTop: '16px',
            backgroundColor: '#4CAF50',
            color: 'white',
            padding: '14px',
            borderRadius: '8px',
            border: 'none',
            fontWeight: 'bold'
          }}>
            {isSignUp ? 'Login' : 'Sign Up'}
          </button>
          <button 
            type="button" 
            style={{
              width: '100%',
              marginTop: '10px',
              backgroundColor: '#555',
              color: 'white',
              padding: '14px',
              borderRadius: '8px',
              border: 'none',
              fontWeight: 'bold'
            }}
            onClick={() => setIsSignUp(!isSignUp)}
          >
            {isSignUp ? 'Switch to Sign Up' : 'Switch to Login'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default GovernmentLogin;
