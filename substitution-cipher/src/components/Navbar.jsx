import React, { useState } from 'react';
import './Navbar.css'; // Import CSS file for styling
import CaeserCipher from './CaeserCipher';
import RailfenceCipher from './RailfenceCipher';
import VernamCipher from './VernamCipher';
import VigenereCipher from './VigenereCipher ';

const Navbar = () => {
  const [selectedCipher, setSelectedCipher] = useState('caesar');

  const renderCipherComponent = () => {
    switch (selectedCipher) {
      case 'caesar':
        return <CaeserCipher />;
      case 'railfence':
        return <RailfenceCipher />;
      case 'vernam':
        return <VernamCipher />;
      case 'vigenere':
        return <VigenereCipher />;
      // Add more cases for additional cipher techniques
      default:
        return <div>No cipher selected</div>;
    }
  };

  return (
    <div>
      <h2 className="title">Cipher Techniques</h2>
      <h4 className="title">Made with Headache😖😥 by Pranshu</h4>
      <nav>
        <ul>
          <li className={selectedCipher === 'caesar' ? 'active' : ''} onClick={() => setSelectedCipher('caesar')}>Caesar Cipher</li>
          {/* <li className={selectedCipher === 'playfair' ? 'active' : ''} onClick={() => setSelectedCipher('playfair')}>Playfair Cipher</li> */}
          <li className={selectedCipher === 'railfence' ? 'active' : ''} onClick={() => setSelectedCipher('railfence')}>Railfence Cipher</li>
          <li className={selectedCipher === 'vernam' ? 'active' : ''} onClick={() => setSelectedCipher('vernam')}>Vernam Cipher</li>
          <li className={selectedCipher === 'vigenere' ? 'active' : ''} onClick={() => setSelectedCipher('vigenere')}>Vigenere Cipher</li>
          {/* Add more list items for additional cipher techniques */}
        </ul>
      </nav>
      {renderCipherComponent()}
    </div>
  );
};

export default Navbar;
