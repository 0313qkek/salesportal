import React, { useState }from 'react';
import './MeetingModal.css';

function MeetingModal({ isOpen, closeModal }) {
    const [attendees, setAttendees] = useState(['']);

    const handleAttendeeChange = (index, event) => {
        const newAttendees = [...attendees];
        newAttendees[index] = event.target.value;
        setAttendees(newAttendees);
    };

    const addAttendee = () => {
        setAttendees([...attendees, '']);
    };

    const removeAttendee = (index) => {
        const newAttendees = attendees.filter((_, i) => i !== index);
        setAttendees(newAttendees);
    }

    if (!isOpen) return null;

    return (
        <div className='modal'>

            <div className='modal-content'>

                <div className='modal-header'>
                    <h2>Add Meeting</h2>
                    <span className='close' onClick={closeModal}>&times;</span>
                </div>

                <div className='meeting-info'>
                    <div className='meeting-details'>
                        <div className='input-group'>
                            <label>Meeting Name</label>
                            <input type='text' />
                        </div>
                        <div className='input-group'>
                            <label>Date and Time</label>
                            <input type='datetime-local' />
                        </div>
                        <div className='input-group'>
                            <label>Meeting Attendee</label>
                            {attendees.map((attendee, index) => (
                                <div key={index} className='attendee-input'>
                                    <input 
                                        type='text' 
                                        value={attendee} 
                                        onChange={(event) => handleAttendeeChange(index, event)} 
                                    />
                                    {attendees.length > 1 && (
                                        <button type="button" onClick={() => removeAttendee(index)} className='remove-attendee-btn'>
                                            Remove
                                        </button>
                                    )}
                                </div>
                            ))}
                            <button type="button" onClick={addAttendee} className='add-attendee-btn'>Add Attendee</button>
                        </div>
                    </div>
                </div>

                <button className='add-btn'>Add</button>

            </div>
        </div>
    );
}

export default MeetingModal;