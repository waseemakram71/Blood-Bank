import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { db } from '../firebase';
import { addDoc, collection } from 'firebase/firestore'; 


const DonorForm = () => {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [bloodGroup, setBloodGroup] = useState('');
  const [medicalInfo, setMedicalInfo] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const userCollectionRef = collection(db, "DonorData");
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    
    try {
      await addDoc(userCollectionRef, {
      
        name: name,
        age: age,
        bloodGroup: bloodGroup,
        medicalInfo: medicalInfo,
      });
      
      setSuccessMessage("Data Submitt Successfully!!")
       setName('');
      setAge('');
      setBloodGroup('');
      setMedicalInfo('');
      navigate('/donorList')
    } catch (error) {
      console.error("Error adding document: ", error);
    }

  };
  const handleInputChange = () => {
    setSuccessMessage('');
  };



  return (
    <div className="donor-details">
      
      <div className='donor'>
      
      <h2>Donor Details</h2>
      <form  onSubmit={handleSubmit}>
        
        <label htmlFor="name"><span>Name:</span></label>
        <input type="text" id="name" placeholder='Name' value={name} onChange={(e) =>{ handleInputChange(); setName(e.target.value)}} required />

        <label htmlFor="age"><span>Age:</span></label>
        <input type="number" id="age" value={age} onChange={(e) => { handleInputChange();setAge(e.target.value)} }required />

        <label htmlFor="blood-group"><span>Blood Group:</span></label>
        <select id="blood-group" value={bloodGroup} onChange={(e) => { handleInputChange();setBloodGroup(e.target.value)}} required>
          <option value="">Select Blood Group</option>
          <option value="A+">A+</option>
          <option value="A-">A-</option>
          <option value="B+">B+</option>
          <option value="B-">B-</option>
          <option value="AB+">AB+</option>
          <option value="AB-">AB-</option>
          <option value="O+">O+</option>
          <option value="O-">O-</option>
        </select>

        <label htmlFor="medical-info"><span>Medical Information:</span></label>
        <textarea id="medical-info" placeholder='Write Here' value={medicalInfo} onChange={(e) => { handleInputChange();setMedicalInfo(e.target.value)}} required />

        <button type="submit">Submit</button>
        {successMessage && <p className='success'>{successMessage}</p>}
      </form>
      </div>
    </div>
  );
};

export default DonorForm;
