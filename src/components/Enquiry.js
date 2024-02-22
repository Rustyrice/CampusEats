import React, { useState, useEffect } from 'react';
import ingredientService from '../services/enquiriesService'; 

const Enquiry = () => {
  // state variables
  // enquiry structure: text,replies,isOpen
  const [enquiries, setEnquiries] = useState([]);
  const [newEnquiry, setNewEnquiry] = useState('');
  const [replyTexts, setReplyTexts] = useState([]);
  const [openThreads, setOpenThreads] = useState([]); 
  useEffect(() => {
    const fetchEnquiriesData = async () => {
      try {
        const data = await ingredientService.fetchEnquiries();
        setEnquiries(data);
        setReplyTexts(data.map(() => '')); 
        setOpenThreads(data.map(() => false));  
      } catch (error) {
        console.error('Error fetching enquiries:', error);
      }
    };
  
    fetchEnquiriesData();
  }, []);

  const handleAddEnquiry = async () => {
    try {
      const newEnquiryData = { text: newEnquiry, replies: [] };
      const addedEnquiry = await ingredientService.addEnquiry(newEnquiryData);

      setEnquiries((prevEnquiries) => [...prevEnquiries, addedEnquiry]);
      setNewEnquiry('');
      setReplyTexts((prevReplyTexts) => [...prevReplyTexts, '']);
      setOpenThreads((prevOpenThreads) => [...prevOpenThreads, false]);
    } catch (error) {
      console.error('Error adding enquiry:', error);
    }
  };

  const handleAddReply = async (enquiryIndex) => {
    const replyToAdd = replyTexts[enquiryIndex].trim();

    if (replyToAdd !== '') {
      try {
        const updatedEnquiries = [...enquiries];
        const enquiry = updatedEnquiries[enquiryIndex];

        const isReplyAlreadyAdded = enquiry.replies.some((reply) => reply.text === replyToAdd);

        if (!isReplyAlreadyAdded) {
          const updatedEnquiry = { ...enquiry, replies: [...enquiry.replies, { text: replyToAdd }] };
          await ingredientService.updateEnquiry(enquiry.id, updatedEnquiry); 
          updatedEnquiries[enquiryIndex] = updatedEnquiry;
          setEnquiries(updatedEnquiries);
        }
      } catch (error) {
        console.error('Error adding reply:', error);
      }

      setReplyTexts((prevReplyTexts) => {
        const updatedReplyTexts = [...prevReplyTexts];
        updatedReplyTexts[enquiryIndex] = '';
        return updatedReplyTexts;
      });
    }
  };

  const viewThread = (enquiryIndex) => {
    setOpenThreads((prevOpenThreads) => {
      const updatedOpenThreads = [...prevOpenThreads];
      updatedOpenThreads[enquiryIndex] = !updatedOpenThreads[enquiryIndex];
      return updatedOpenThreads;
    });
  };

  return (
    <>
      <div style={styles.pageContainer}>
        <div style={{ marginTop: '50px', ...styles.enquiriesListContainer }}></div>
        <div style={styles.enquiryFormContainer}>
          <h3 style={styles.enquiryFormTitle}>Ask a Question! </h3>
          <h1>Staff will do their best to get back to you soon.</h1>
          <br></br>
          <textarea
            style={styles.enquiryFormTextarea}
            value={newEnquiry}
            onChange={(event) => setNewEnquiry(event.target.value)}
          ></textarea>
          <button
            style={styles.enquiryFormButton}
            onClick={handleAddEnquiry}
            disabled={!newEnquiry.trim()}
          >
            Ask a Question
          </button>
        </div>
        <div style={styles.enquiriesListContainer}>
          <h3 style={styles.enquiriesListTitle}>Enquiries</h3>
          {enquiries.map((enquiry, index) => (
            <div key={index} style={styles.enquiry}>
              <div style={styles.enquiryContent} onClick={() => viewThread(index)}>
                <p style={styles.enquiryText}>{enquiry.text}</p>
                {enquiry.replies.length > 0 && (
                  <button
                    style={styles.viewRepliesButton}
                    onClick={(event) => {
                      event.stopPropagation();
                      viewThread(index);
                    }}
                  >
                    {openThreads[index] ? 'Hide Replies' : 'View Replies'}
                  </button>
                )}
              </div>
              {openThreads[index] && (
                <div style={styles.enquiryReplies}>
                  {enquiry.replies.map((reply, replyIndex) => (
                    <p key={replyIndex} style={styles.replyText}>
                      {reply.text}
                    </p>
                  ))}
                  <div style={styles.replyContainer}>
                    <textarea
                      style={styles.replyTextarea}
                      value={replyTexts[index]}
                      onChange={(event) => {
                        const newReplyTexts = [...replyTexts];
                        newReplyTexts[index] = event.target.value;
                        setReplyTexts(newReplyTexts);
                      }}
                    ></textarea>
                    <button
                      style={styles.addReplyButton}
                      onClick={() => handleAddReply(index)}
                      disabled={!replyTexts[index].trim()}
                    >
                      Add Reply
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

const styles = {
  pageContainer: {
    maxWidth: '800px',
    margin: '0 auto',
    padding: '20px',
  },
  pageTitle: {
    fontSize: '30px',
    marginBottom: '20px',
    textAlign: 'center',
  },
  enquiryFormContainer: {
    marginBottom: '20px',
  },
  enquiryFormTitle: {
    fontSize: '22px',
    marginBottom: '8px',
  },
  enquiryFormTextarea: {
    width: '100%',
    height: '80px',
    marginBottom: '8px',
    border: '1px solid rgb(107, 114, 12)',
    padding: '8px',
    fontSize: '16px',
  },
  enquiryFormButton: {
    fontSize: '16px',
    padding: '8px 16px',
    background: '#34D399',
    borderRadius: '8px',
    color: 'white',
    cursor: 'pointer',
  },
  enquiriesListContainer: {},
  enquiriesListTitle: {
    fontSize: '22px',
    marginBottom: '12px',
  },
  enquiry: {
    border: '1px solid #ddd',
    borderRadius: '8px',
    marginBottom: '20px',
    padding: '12px',
    cursor: 'pointer',
  },
  enquiryContent: {
    marginBottom: '12px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  enquiryText: {
    fontSize: '18px',
    margin: '0',
  },
  viewRepliesButton: {
    fontSize: '14px',
    padding: '4px 8px',
    background: '#34D399',
    borderRadius: '4px',
    color: 'white',
    cursor: 'pointer',
  },
  enquiryReplies: {
    marginLeft: '40px',
  },
  replyText: {
    fontSize: '14px',
    marginBottom: '4px',
  },
  replyContainer: {
    marginTop: '12px',
  },
  replyTextarea: {
    width: '100%',
    height: '60px',
    marginBottom: '8px',
    border: '1px solid rgb(107, 114, 12)',
    padding: '8px',
    fontSize: '14px',
  },
  addReplyButton: {
    fontSize: '14px',
    padding: '4px 8px',
    background: '#34D399',
    borderRadius: '4px',
    color: 'white',
    cursor: 'pointer',
    marginRight: '8px',
  },
};

export default Enquiry;