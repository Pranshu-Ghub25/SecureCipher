import React, { useState } from 'react';

const RailfenceCipher = () => {
  const [plainText, setPlainText] = useState('');
  const [cipherText, setCipherText] = useState('');
  const [depth, setDepth] = useState(2);
  const [decryptionTable, setDecryptionTable] = useState([]);
  const [decryptedText, setDecryptedText] = useState('');

  const handleEncrypt = () => {
    const textWithUnderscores = plainText.replace(/ /g, '_');
    setCipherText(encryptRailFence(textWithUnderscores, depth));
  };

  const handleDecrypt = () => {
    const { table, text } = decryptRailFence(cipherText, depth);
    const textWithSpaces = text.replace(/_/g, ' ');
    setDecryptionTable(table);
    setDecryptedText(textWithSpaces);
  };

  const encryptRailFence = (text, depth) => {
    if (depth === 1) return text;

    const rail = Array.from({ length: depth }, () => []);
    let row = 0;
    let direction = 1;

    for (const char of text) {
      rail[row].push(char);
      row += direction;
      if (row === 0 || row === depth - 1) direction *= -1;
    }

    return rail.flat().join('');
  };

  const decryptRailFence = (text, depth) => {
    if (depth === 1) return { table: [[...text]], text };

    const rail = Array.from({ length: depth }, () => Array(text.length).fill(null));
    let row = 0;
    let direction = 1;

    for (let i = 0; i < text.length; i++) {
      rail[row][i] = '*';
      row += direction;
      if (row === 0 || row === depth - 1) direction *= -1;
    }

    let index = 0;
    for (let r = 0; r < depth; r++) {
      for (let c = 0; c < text.length; c++) {
        if (rail[r][c] === '*' && index < text.length) {
          rail[r][c] = text[index++];
        }
      }
    }

    let result = '';
    row = 0;
    direction = 1;
    for (let c = 0; c < text.length; c++) {
      result += rail[row][c];
      row += direction;
      if (row === 0 || row === depth - 1) direction *= -1;
    }

    return { table: rail, text: result };
  };

  return (
    <div style={{  padding: '10px' }}>
      <h1>Rail Fence Cipher</h1>
      <div style={{ marginBottom: '10px' }}>
        <label>
          Plain Text:
          <input
            type="text"
            value={plainText}
            onChange={(e) => setPlainText(e.target.value)}
            style={{ marginLeft: '10px', padding: '5px', width: '300px' }}
          />
        </label>
      </div>
      <div style={{ marginBottom: '10px' }}>
        <label>
          Depth:
          <input
          className="input"
            type="number"
            value={depth}
            min="2"
            onChange={(e) => setDepth(Number(e.target.value))}
            style={{ marginLeft: '10px', padding: '5px', width: '50px' }}
          />
        </label>
      </div>
      <button onClick={handleEncrypt} >Encrypt</button>
          <button onClick={handleDecrypt} >Decrypt</button>
      <div style={{ marginBottom: '10px' }}>
        <label>
          Cipher Text:
          <input
          className="input"
            type="text"
            value={cipherText}
            onChange={(e) => setCipherText(e.target.value)}

            style={{ marginLeft: '10px', padding: '5px', width: '300px' }}
          />
        </label>
      </div>
      <div style={{ marginBottom: '10px' }}>
        <label>
          Decrypted Text:
          <input
          className="input"
            type="text"
            value={decryptedText}
            readOnly
            style={{ marginLeft: '10px', padding: '5px', width: '300px' }}
          />
        </label>
      </div>
      <h2>Decryption Table</h2>
      <table style={{ borderCollapse: 'collapse', width: '100%', marginTop: '20px' }}>
        <tbody>
          {decryptionTable.map((row, rowIndex) => (
            <tr key={rowIndex}>
              {row.map((cell, cellIndex) => (
                <td key={cellIndex} style={{
                  border: '1px solid black',
                  padding: '8px',
                  textAlign: 'center',
                  backgroundColor: cell === '*' ? '#f2f2f2' : '#ffffff'
                }}>
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default RailfenceCipher;
