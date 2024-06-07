import React, { useState } from 'react';

const CaesarCipher = () => {
  const [text, setText] = useState('');
  const [key, setKey] = useState(0);
  const [encryptedText, setEncryptedText] = useState('');
  const [decryptedText, setDecryptedText] = useState('');

  const examplePlaintext = "THE QUICK BROWN FOX JUMPS OVER THE LAZY DOG";
  const exampleKey = 3;
  const exampleEncryptedText = "QEB NRFZH YOLTK CLU GRJMP LSBO QEB IXWV ALD";
  const exampleDecryptedText = "THE QUICK BROWN FOX JUMPS OVER THE LAZY DOG";

  const encryptText = (text, key) => {
    const encrypted = text
      .split('')
      .map(char => {
        if (char.match(/[a-z]/i)) {
          const code = char.charCodeAt(0);
          const isUpperCase = code >= 65 && code <= 90;
          const shift = isUpperCase ? 65 : 97;
          return String.fromCharCode(((code - shift + key) % 26) + shift);
        }
        return char;
      })
      .join('');
    setEncryptedText(encrypted);
  };

  const decryptText = (text, key) => {
    const decrypted = text
      .split('')
      .map(char => {
        if (char.match(/[a-z]/i)) {
          const code = char.charCodeAt(0);
          const isUpperCase = code >= 65 && code <= 90;
          const shift = isUpperCase ? 65 : 97;
          // Decryption formula: (currentCharCode - shift - key + 26) % 26
          return String.fromCharCode(((code - shift - key + 26) % 26) + shift);
        }
        return char;
      })
      .join('');
    setDecryptedText(decrypted);
  };

  const handleEncrypt = () => {
    encryptText(text, key);
  };

  const handleDecrypt = () => {
    decryptText(encryptedText, key);
  };

  return (
    <div style={{  padding: '10px' }}>
      <h1>Caesar Cipher </h1>
      <p>
        <strong>Example:</strong><br />
        <strong>Plaintext:</strong> {examplePlaintext}<br />
        <strong>Key:</strong> {exampleKey}<br />
        <strong>Encrypted Text:</strong> {exampleEncryptedText}<br />
        <strong>Decrypted Text:</strong> {exampleDecryptedText}
      </p>
      <label>
        Enter Text:
        <input className="input" type="text" value={text} onChange={e => setText(e.target.value)} />
      </label>
      <br />
      <label>
        Enter Key:
        <input className="input" type="number" value={key} onChange={e => setKey(parseInt(e.target.value))} />
      </label>
      <br />
      <button  onClick={handleEncrypt}>Encrypt</button>
      <button  onClick={handleDecrypt}>Decrypt</button>
      <br />
      <h3>Encrypted Text: {encryptedText}</h3>
      <h3>Decrypted Text: {decryptedText}</h3>
    </div>
  );
};

export default CaesarCipher;
