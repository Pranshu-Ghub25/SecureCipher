import React, { useState } from 'react';
// import './VernamCipher.css';

const VernamCipher = () => {
  const [plainText, setPlainText] = useState('');
  const [pad, setPad] = useState('');
  const [cipherText, setCipherText] = useState('');
  const [encryptionTable, setEncryptionTable] = useState([]);
  const [decryptionTable, setDecryptionTable] = useState([]);
  const [decryptedText, setDecryptedText] = useState('');

  const handleEncrypt = () => {
    if (pad.length < plainText.length) {
      alert('Pad length must be at least as long as the plaintext length');
      return;
    }
    const { table, text } = encryptVernam(plainText, pad);
    setEncryptionTable(table);
    setCipherText(text);
  };

  const handleDecrypt = () => {
    if (pad.length < cipherText.length) {
      alert('Pad length must be at least as long as the ciphertext length');
      return;
    }
    const { table, text } = decryptVernam(cipherText, pad);
    setDecryptionTable(table);
    setDecryptedText(text);
  };

  const charToNum = (char) => char.toLowerCase().charCodeAt(0) - 97;
  const numToChar = (num) => String.fromCharCode(num + 97);

  const encryptVernam = (plainText, pad) => {
    const table = [];
    let cipherText = '';

    for (let i = 0; i < plainText.length; i++) {
      const plainChar = plainText[i];
      const padChar = pad[i];
      const plainNum = charToNum(plainChar);
      const padNum = charToNum(padChar);
      const cipherNum = (plainNum + padNum) % 26;
      const cipherChar = numToChar(cipherNum);

      table.push({
        plainChar,
        padChar,
        plainNum,
        padNum,
        cipherNum,
        cipherChar,
      });

      cipherText += cipherChar;
    }

    return { table, text: cipherText };
  };

  const decryptVernam = (cipherText, pad) => {
    const table = [];
    let plainText = '';

    for (let i = 0; i < cipherText.length; i++) {
      const cipherChar = cipherText[i];
      const padChar = pad[i];
      const cipherNum = charToNum(cipherChar);
      const padNum = charToNum(padChar);
      const plainNum = (cipherNum - padNum + 26) % 26;
      const plainChar = numToChar(plainNum);

      table.push({
        cipherChar,
        padChar,
        cipherNum,
        padNum,
        plainNum,
        plainChar,
      });

      plainText += plainChar;
    }

    return { table, text: plainText };
  };

  return (
    <div className="container">
      <h1>Vernam Cipher</h1>
      <div className="label">
        <label>
          Plain Text:
          <input
            type="text"
            value={plainText}
            onChange={(e) => setPlainText(e.target.value)}
            className="input"
          />
        </label>
      </div>
      <div className="label">
        <label>
          Pad:
          <input
            type="text"
            value={pad}
            onChange={(e) => setPad(e.target.value)}
            className="input"
          />
        </label>
      </div>
      <button onClick={handleEncrypt} className="button">Encrypt</button>
          <button onClick={handleDecrypt} className="button">Decrypt</button>
      <div className="label">
        <label>
          Cipher Text:
          <input
            type="text"
            value={cipherText}
                 onChange={(e) => setCipherText(e.target.value)}

            className="input"
          />
        </label>
      </div>
      <div className="label">
        <label>
          Decrypted Text:
          <input
            type="text"
            value={decryptedText}
            readOnly
            className="input"
          />
        </label>
      </div>

      <h2>Encryption Table</h2>
      <table className="table">
        <thead>
          <tr>
            <th>Plain Text</th>
            <th>Pad</th>
            <th>Plain Num</th>
            <th>Pad Num</th>
            <th>Cipher Num</th>
            <th>Cipher Text</th>
          </tr>
        </thead>
        <tbody>
          {encryptionTable.map((row, index) => (
            <tr key={index}>
              <td className="table-cell">{row.plainChar}</td>
              <td className="table-cell">{row.padChar}</td>
              <td className="table-cell">{row.plainNum}</td>
              <td className="table-cell">{row.padNum}</td>
              <td className="table-cell">{row.cipherNum}</td>
              <td className="table-cell">{row.cipherChar}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <h2>Decryption Table</h2>
      <table className="table">
        <thead>
          <tr>
            <th>Cipher Text</th>
            <th>Pad</th>
            <th>Cipher Num</th>
            <th>Pad Num</th>
            <th>Plain Num</th>
            <th>Plain Text</th>
          </tr>
        </thead>
        <tbody>
          {decryptionTable.map((row, index) => (
            <tr key={index}>
              <td className="table-cell">{row.cipherChar}</td>
              <td className="table-cell">{row.padChar}</td>
              <td className="table-cell">{row.cipherNum}</td>
              <td className="table-cell">{row.padNum}</td>
              <td className="table-cell">{row.plainNum}</td>
              <td className="table-cell">{row.plainChar}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default VernamCipher;
