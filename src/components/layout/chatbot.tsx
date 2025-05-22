// ChatbotButton.tsx
import React from 'react';
import { useTheme } from '../../context/ThemeContext';

const ChatbotButton: React.FC<{}> = () => {
    const { theme } = useTheme();
    const size = 50;
    const linkUrl = 'https://wa.me/+919851739851?utm_source=web'; // Add linkUrl definition
    const iconUrl = theme === 'dark' ? '/logo/WAWhiteLogo.png' : '/logo/WAGreenLogo.png';
    
    const openLink = () => {
        window.open(linkUrl, '_blank');
    };

    const buttonStyle: React.CSSProperties = {
        position: 'fixed',
        bottom: 25,
        right: 25,
        width: size,
        height: size,
        background: 'transparent',
        // borderRadius: '50%',
        // boxShadow: `0 5px 10px #000000`,
        cursor: 'pointer',
        zIndex: 9999,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        transition: 'transform 0.2s ease-in-out, background 0.3s',
    };

    const imgStyle: React.CSSProperties = {
        width: size,
        height: size,
    };

  return (
    <div
      className="chatbot-button"
      style={buttonStyle}
      onClick={openLink}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLDivElement).style.transform = 'scale(1.15)';
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLDivElement).style.transform = 'scale(1)';
      }}
    >
      <img src={iconUrl} alt="Chat" style={imgStyle} />
    </div>
  );
};

export default ChatbotButton;
