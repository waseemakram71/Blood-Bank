import React, { useState } from 'react';

const ProcurerList = () => {
  const [recipientBloodGroup, setRecipientBloodGroup] = useState('A');
  const [recipientRhFactor, setRecipientRhFactor] = useState('+');
  const [matches, setMatches] = useState([]);

  const findBloodGroupMatches = () => {
    const allBloodGroups = ['A', 'B', 'AB', 'O'];
    const allRhFactors = ['+', '-'];
    const possibleMatches = [];

    for (const donorBloodGroup of allBloodGroups) {
      for (const donorRhFactor of allRhFactors) {
        if (recipientBloodGroup === 'O' && donorBloodGroup === 'O') {
          possibleMatches.push(donorBloodGroup + donorRhFactor);
        } else if (
          (recipientBloodGroup === 'A' && ['A', 'O'].includes(donorBloodGroup)) ||
          (recipientBloodGroup === 'B' && ['B', 'O'].includes(donorBloodGroup)) ||
          recipientBloodGroup === 'AB'
        ) {
          possibleMatches.push(donorBloodGroup + donorRhFactor);
        }
      }
    }

    // Consider Rh factor compatibility
    const compatibleMatches = possibleMatches.filter((match) => match.endsWith(recipientRhFactor));

    setMatches(compatibleMatches);
  };

  return (
    <div>
      <h2>Blood Group Matcher</h2>
      <div>
        <label>Recipient Blood Group:</label>
        <select value={recipientBloodGroup} onChange={(e) => setRecipientBloodGroup(e.target.value)}>
          <option value="A">A</option>
          <option value="B">B</option>
          <option value="AB">AB</option>
          <option value="O">O</option>
        </select>
      </div>
      <div>
        <label>Recipient Rh Factor:</label>
        <select value={recipientRhFactor} onChange={(e) => setRecipientRhFactor(e.target.value)}>
          <option value="+">+</option>
          <option value="-">-</option>
        </select>
      </div>
      <button onClick={findBloodGroupMatches}>Find Matches</button>
      {matches.length > 0 && (
        <div>
          <h3>Possible Blood Group Matches:</h3>
          <ul>
            {matches.map((match, index) => (
              <li key={index}>{match}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default ProcurerList;

