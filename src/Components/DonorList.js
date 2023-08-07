import React, { useEffect, useState } from 'react';
import { db } from '../firebase';
import { collection, getDocs } from 'firebase/firestore';

const DonorList = () => {
  const [donors, setDonors] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  useEffect(() => {
    // Fetch data from Firestore and update the 'donors' state
    const fetchData = async () => {
      const querySnapshot = await getDocs(collection(db, 'DonorData'));
      const data = querySnapshot.docs.map((doc) => doc.data());
      setDonors(data);
    };
    fetchData();
  }, []);

  // Function to get compatible blood groups
  const getCompatibleBloodGroups = (bloodGroup) => {
    // Add your compatibility logic here based on standard compatibility rules
    switch (bloodGroup) {
      case 'a+':
        return ['a+', 'a-', 'o+', 'o-'];
      case 'a-':
        return ['a-', 'o-'];
      case 'b+':
        return ['b+', 'b-', 'o+', 'o-'];
      case 'b-':
        return ['b-', 'o-'];
      case 'ab+':
        return ['a+', 'a-', 'b+', 'b-', 'ab+', 'ab-', 'o+', 'o-'];
      case 'ab-':
        return ['a-', 'b-', 'ab-', 'o-'];
      case 'o+':
        return ['o+', 'o-'];
      case 'o-':
        return ['o-'];
      default:
        return [bloodGroup]; // Return its own blood group for others
    }
  };

  // Filter donors based on the search term and compatibility logic
  const filteredDonors = searchTerm !== 'a+' && searchTerm !== 'a-' && searchTerm !== 'b+' && searchTerm !== 'b-' && searchTerm !== 'ab+' && searchTerm !== 'ab-' && searchTerm !== 'o+' && searchTerm !== 'o-' ? donors : donors.filter((donor) => {
    const donorBloodGroup = donor.bloodGroup.toLowerCase();
    const compatibleGroups = getCompatibleBloodGroups(searchTerm.toLowerCase());
    return compatibleGroups.includes(donorBloodGroup);
  });

  // Calculate pagination
  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentRows = filteredDonors.slice(indexOfFirstRow, indexOfLastRow);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
    setCurrentPage(1); // Reset page to 1 when the search term changes
  };

  return (
    <div>
      <h1>Donor List</h1>
      <div>
        <input
          type="text"
          placeholder="Search by Blood Group"
          value={searchTerm}
          onChange={handleSearchChange}
        />
      </div>
      {donors.length > 0 ? ( // Check if there are donors available
        currentRows.length > 0 ? (
          <div>
            <table>
              <thead>
                <tr style={{color:'blue'}}>
                  <th>Name</th>
                  <th>Age</th>
                  <th>Blood Group</th>
                  <th>Medical Information</th>
                </tr>
              </thead>
              <tbody>
                {currentRows.map((donor, index) => (
                  <tr key={index}>
                    <td>{donor.name}</td>
                    <td>{donor.age}</td>
                    <td className='group'>{donor.bloodGroup}</td>
                    <td>{donor.medicalInfo}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className='main-btn'>
              {/* Pagination controls */}
              <div>
                <button
                  className='pre'
                  disabled={currentPage === 1}
                  onClick={() => setCurrentPage((prev) => prev - 1)}
                >
                  ←Previous
                </button>
              </div>
              <div className='page'>
                Page {currentPage} of {Math.ceil(filteredDonors.length / rowsPerPage)}
              </div>
              <div>
                <button
                  className='next'
                  disabled={indexOfLastRow >= filteredDonors.length}
                  onClick={() => setCurrentPage((prev) => prev + 1)}
                >
                  Next→
                </button>
              </div>
              {/* Display current page and total pages */}
             
            </div>
          </div>
        ) : (
          <p>No donors found for the blood group: {searchTerm}</p>
        )
      ) : (
        <p>Loading donors...</p>
      )}
    </div>
  );
};

export default DonorList;
