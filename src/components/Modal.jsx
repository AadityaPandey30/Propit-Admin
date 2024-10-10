import PropTypes from 'prop-types';
import { useRef } from 'react';
import ReactMarkdown from 'react-markdown';

const Modal = ({ lead }) => {
  const chatContainerRef = useRef(null); // Reference to the chat container

  const handleScrollToTop = () => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTo({
        top: 0, // Scroll to the top of the chat container
        behavior: 'smooth' // Smooth scrolling effect
      });
    }    
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <h2>Chat History for Lead ID: {lead.lead_id}</h2>
        
        

        <div className="chat-container" ref={chatContainerRef}>
          {lead.chat_history.length > 0 ? (
            lead.chat_history.map((chat, index) => (
              <div
                key={index}
                className={`${chat.role === 'user' ? 'user-chat' : chat.role === 'assistant' ? 'assistant-chat' : 'system-chat'}`}
              >
                <ReactMarkdown>{chat.content || 'No content'}</ReactMarkdown>
              </div>
            ))
          ) : (
            <p>No chat history available</p>
          )}

          {/* Scroll to top button */}
        <button onClick={handleScrollToTop} className="scroll-top-button">
        ↑
        </button>
        </div>
      </div>
    </div>
  );
};

Modal.propTypes = {
  lead: PropTypes.shape({
    lead_id: PropTypes.string.isRequired,
    chat_history: PropTypes.arrayOf(
      PropTypes.shape({
        content: PropTypes.string.isRequired
      })
    ).isRequired
  }).isRequired
};

export default Modal;
