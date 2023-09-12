import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Meeting from '../../Models/Meeting';
import Group from '../../Models/Groups';
import { useNavigate } from 'react-router-dom';
import appConfig from '../../Utils/Config';
import './AddMeeting.css';

function AddMeetingPage() {
  const navigate = useNavigate();

    // States for managing component's data
  const [existingMeetings, setExistingMeetings] = useState<Meeting[]>([]);
  const [groups, setGroups] = useState<Group[]>([]);
  const [formData, setFormData] = useState<Meeting>({
    meeting_code: 0,
    d_group_code: 0,
    start_meeting_date_time: '',
    end_meeting_date_time: '',
    meeting_description: '',
    meeting_room: '',
  });

    // Fetch all groups and all meetings upon component mount
  useEffect(() => {
    axios.get<Group[]>(`${appConfig.groupsUrl}all`).then(({ data }) => {
      setGroups(data);
    });

    axios.get<Meeting[]>(`${appConfig.groupsUrl}all_meetings`).then(({ data }) => {
      setExistingMeetings(data);
    });
  }, []);

  // Update existing meetings when the group in the form changes
  useEffect(() => {
    if (formData.d_group_code) {
      axios
        .get<Meeting[]>(`${appConfig.groupsUrl}group_meetings/${formData.d_group_code}`)
        .then((response) => {
          setExistingMeetings(response.data);
        });
    }
  }, [formData.d_group_code]);

  // Handler for input changes to update the formData state
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  // Handler for form submission
  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    // Check for meeting time conflicts
    const isConflicting = existingMeetings.some((meeting) => {
      const start = new Date(meeting.start_meeting_date_time);
      const end = new Date(meeting.end_meeting_date_time);
      const newStart = new Date(formData.start_meeting_date_time);
      const newEnd = new Date(formData.end_meeting_date_time);

      return (
        (newStart >= start && newStart <= end) ||
        (newEnd >= start && newEnd <= end) ||
        (newStart <= start && newEnd >= end)
      );
    });

    if (isConflicting) {
      alert('Conflicting meeting time! Please select a different time.');
    } else {
      // Post new meeting data if no conflicts
      axios
        .post(`${appConfig.groupsUrl}add_meeting`, formData)
        .then((response) => {
          navigate('/meetings');
        });
    }
  };

  return (
    <div>
      <h1>Add Meeting</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="d-group-code">Select Group:</label>
          <select
            id="d-group-code"
            name="d_group_code"
            value={formData.d_group_code}
            onChange={handleInputChange}
            required
          >
            <option value="">Select a group</option>
            {groups.map(({ d_group_code, d_group_name }) => (
              <option key={d_group_code} value={d_group_code}>
                {d_group_name}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="start-meeting">Start Time:</label>
          <input
            type="datetime-local"
            id="start-meeting"
            name="start_meeting_date_time"
            value={formData.start_meeting_date_time}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label htmlFor="end-meeting">End Time:</label>
          <input
            type="datetime-local"
            id="end-meeting"
            name="end_meeting_date_time"
            value={formData.end_meeting_date_time}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label htmlFor="description">Description:</label>
          <input
            type="text"
            id="description"
            name="meeting_description"
            value={formData.meeting_description}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label htmlFor="room">Room:</label>
          <input
            type="text"
            id="room"
            name="meeting_room"
            value={formData.meeting_room}
            onChange={handleInputChange}
            required
          />
        </div>
        <button type="submit">Add Meeting</button>
      </form>
    </div>
  );
}

export default AddMeetingPage;










