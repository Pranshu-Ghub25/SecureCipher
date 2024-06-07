import React, { useState } from 'react';


const VigenereCipher = () => {
  const [plainText, setPlainText] = useState('');
  const [keyword, setKeyword] = useState('');
  const [cipherText, setCipherText] = useState('');
  const [decryptedText, setDecryptedText] = useState('');

  const handleEncrypt = () => {
    const { text } = encryptVigenere(plainText, keyword);
    
    setCipherText(text);
  };

  const handleDecrypt = () => {
    const {  text } = decryptVigenere(cipherText, keyword);
   
    setDecryptedText(text);
  };

  const encryptVigenere = (plainText, keyword) => {

    let cipherText = '';

    for (let i = 0, j = 0; i < plainText.length; i++) {
      const plainChar = plainText[i];
      if (/[^a-zA-Z]/.test(plainChar)) {
        // Skip non-alphabetic characters (e.g., spaces)
        cipherText += plainChar;
        continue;
      }
      const plainCharCode = plainChar.toUpperCase().charCodeAt(0) - 65;
      const keywordCharCode = keyword[j % keyword.length].toUpperCase().charCodeAt(0) - 65;
      const cipherCharCode = (plainCharCode + keywordCharCode) % 26 + 65;
      const cipherChar = String.fromCharCode(cipherCharCode);

    

      cipherText += cipherChar;
      j++;
    }

    return {  text: cipherText };
};

const decryptVigenere = (cipherText, keyword) => {

    let plainText = '';

    for (let i = 0, j = 0; i < cipherText.length; i++) {
      const cipherChar = cipherText[i];
      if (/[^a-zA-Z]/.test(cipherChar)) {
        // Skip non-alphabetic characters (e.g., spaces)
        plainText += cipherChar;
        continue;
      }
      const cipherCharCode = cipherChar.toUpperCase().charCodeAt(0) - 65;
      const keywordCharCode = keyword[j % keyword.length].toUpperCase().charCodeAt(0) - 65;
      const plainCharCode = (cipherCharCode - keywordCharCode + 26) % 26 + 65;
      const plainChar = String.fromCharCode(plainCharCode);


      plainText += plainChar;
      j++;
    }

    return {  text: plainText };
};


  return (
    <div className="container">
      <h1>Vigenère Cipher</h1>
      <div className="label">
        <label>
          Plain Text:
          <input
            type="text"
            value={plainText}
            onChange={(e) => setPlainText(e.target.value.toUpperCase())}
            className="input"
          />
        </label>
      </div>
      <div className="label">
        <label>
          Keyword:
          <input
            type="text"
            value={keyword}
            onChange={(e) => setKeyword(e.target.value.toUpperCase())}
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
            onChange={(e) => setCipherText(e.target.value.toUpperCase())}

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

      
    </div>
  );
};

export default VigenereCipher;
