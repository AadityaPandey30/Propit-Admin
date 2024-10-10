import { useState, useEffect } from 'react';
import Modal from './Modal'; // Import the modal component

const LeadsTable = () => {
  const [leads, setLeads] = useState([]); // State to hold fetched leads
  const [currentPage, setCurrentPage] = useState(1); // Track the current page
  const [selectedLead, setSelectedLead] = useState(null); // Track the selected lead
  const [selectedLeadId, setSelectedLeadId] = useState(null); // Track the clicked lead ID
  const [leadsPerPage] = useState(100); // Limit the number of leads shown per page
  const [searchTerm, setSearchTerm] = useState(''); // State for the search term
  const [filteredLeads, setFilteredLeads] = useState([]); // State to hold filtered leads

  useEffect(() => {
    fetchLeads();
  }, [currentPage]);

  useEffect(() => {
    // Apply search filter whenever leads or search term changes
    applySearchFilter();
  }, [leads, searchTerm]);

  const fetchLeads = async () => {
    try {
      const response = await fetch(`https://propit-admin-backend-aaditya.onrender.com/api/leads?page=${currentPage}&limit=${leadsPerPage}`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setLeads(data);

      // Automatically select the first lead once data is fetched
      if (data.length > 0) {
        const firstLead = data[0];
        
        // Check if chat history needs parsing
        if (typeof firstLead.chat_history === 'string') {
          try {
            firstLead.chat_history = JSON.parse(firstLead.chat_history);
          } catch (error) {
            console.error('Error parsing chat history:', error);
            firstLead.chat_history = []; // Fallback to empty array if parsing fails
          }
        }

        // Set the first lead as the selected one
        setSelectedLead(firstLead);
        setSelectedLeadId(firstLead.lead_id);
      }
    } catch (error) {
      console.error('Error fetching leads:', error);
    }
  };

  const applySearchFilter = () => {
    if (searchTerm === '') {
      setFilteredLeads(leads); // No search term, show all leads
    } else {
      const filtered = leads.filter((lead) => {
        // Check if the lead_id matches the search term
        const leadIdMatch = lead.lead_id.toLowerCase().includes(searchTerm.toLowerCase());

        // Check if any of the chat messages contain the search term
        const chatMatch = lead.chat_history.some((chat) => 
          chat.content && chat.content.toLowerCase().includes(searchTerm.toLowerCase())
        );

        return leadIdMatch || chatMatch;
      });
      setFilteredLeads(filtered);
    }
  };

  const handleNextPage = () => {
    setCurrentPage(currentPage + 1);
      // Scroll to the top of the page
      window.scrollTo({
        top: 0,
        behavior: 'smooth' // For smooth scrolling effect
      });
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
      // Scroll to the top of the page
      window.scrollTo({
        top: 0,
        behavior: 'smooth' // For smooth scrolling effect
      });
  };

  const handleLeadClick = (lead) => {
    // Only parse chat_history if it's a string (not an object)
    if (typeof lead.chat_history === 'string') {
      try {
        lead.chat_history = JSON.parse(lead.chat_history);
      } catch (error) {
        console.error('Error parsing chat history:', error);
        lead.chat_history = []; // Fallback to empty array if parsing fails
      }
    }
  
    setSelectedLead(lead); // Set the selected lead
    setSelectedLeadId(lead.lead_id); // Set the selected lead ID for highlighting
  
    // Scroll to the top of the page
    window.scrollTo({
      top: 0,
      behavior: 'smooth' // For smooth scrolling effect
    });
  };

  const formatDate = (leadId) => {
    const datePart = leadId.split('T')[0];
    return datePart;
  };

  return (
    <div className="leads-container">
      <div className="leads-table">
        <h1>Leads Table</h1>

        {/* Search Bar */}
        <input
          type="text"
          placeholder="Search by Lead ID or Chat Content..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-bar"
        />

        <div className='flexbox'>
          <table>
            <thead>
              <tr>
                <th>Lead ID</th>
              </tr>
            </thead>
            <div className='column'>
              <tbody>
                {filteredLeads.length > 0 ? filteredLeads.map((lead) => (
                  <tr 
                    key={lead._id} 
                    onClick={() => handleLeadClick(lead)} 
                    className={selectedLeadId === lead.lead_id ? 'highlighted' : ''}
                  >
                    <td className='leadDate'>{formatDate(lead.lead_id)}</td>
                  </tr>
                )) : (
                  <tr>
                    <td>No leads available</td>
                  </tr>
                )}
              </tbody>
            </div>
          </table>
          <div className="modal-section">
            {selectedLead && <Modal lead={selectedLead} />} {/* Render the modal beside the table */}
          </div>
        </div>

        <div className="navigator">
          <button onClick={handlePreviousPage} disabled={currentPage === 1}>Previous</button>
          <span>Page {currentPage}</span>
          <button onClick={handleNextPage}>Next</button>
        </div>

      </div>
    </div>
  );
};

export default LeadsTable;
