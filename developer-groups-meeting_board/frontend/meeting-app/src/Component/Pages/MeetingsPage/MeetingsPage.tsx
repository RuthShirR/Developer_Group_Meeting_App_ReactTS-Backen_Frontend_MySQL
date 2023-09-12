import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Meeting from '../../Models/Meeting';
import Group from '../../Models/Groups';
import appConfig from '../../Utils/Config';
import './MeetingsPage.css';

function MeetingsPage() {
  const [groups, setGroups] = useState<Group[]>([]);
  const [selectedGroup, setSelectedGroup] = useState<number | null>(null);
  const [meetings, setMeetings] = useState<Meeting[]>([]);

    // On component mount, fetch all groups and all meetings
  useEffect(() => {
    axios.get<Group[]>(`${appConfig.groupsUrl}all`).then((response) => {
      setGroups(response.data);
    });
    axios.get<Meeting[]>(`${appConfig.groupsUrl}all_meetings`).then((response) => {
      setMeetings(response.data);
    });
  }, []);

  // Event handler for changing the selected group in the dropdown
  const handleGroupChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const value = parseInt(event.target.value);
    setSelectedGroup(value === 0 ? null : value);
  };

 // Fetch meetings based on selected group, or fetch all meetings if no group is selected
  useEffect(() => {
    if (selectedGroup) {
      axios.get<Meeting[]>(`${appConfig.groupsUrl}group_meetings/${selectedGroup}`).then((response) => {
        setMeetings(response.data);
      });
    } else {
      axios.get<Meeting[]>(`${appConfig.groupsUrl}all_meetings`).then((response) => {
        setMeetings(response.data);
      });
    }
  }, [selectedGroup]);

    // Helper function to get the group name based on its code
  const getGroupName = (groupCode: number) => {
    const group = groups.find((group) => group.d_group_code === groupCode);
    return group ? group.d_group_name : '';
  };

    // Helper function to format date time in DD-MM-YYYY HH:mm format
  const formatDateTime = (dateTime: string) => {
    const date = new Date(dateTime);
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    return `${day}-${month}-${year} ${hours}:${minutes}`;
  };

    // Helper function to get meeting duration in minutes
  const getMeetingDuration = (startDateTime: string, endDateTime: string) => {
    const start = new Date(startDateTime);
    const end = new Date(endDateTime);
    const durationInMinutes = Math.floor((end.getTime() - start.getTime()) / (1000 * 60));
    return `${durationInMinutes} minutes`;
  };

  return (
    <div className="MeetingsPage">
      <h1>Meeting Board</h1>
      <label htmlFor="group-select">Select a group to view a future meeting schedule:</label>
      <select id="group-select" value={selectedGroup || 0} onChange={handleGroupChange}>
        <option value={0}>All Groups</option>
        {groups.map((group) => (
          <option key={group.d_group_code} value={group.d_group_code}>
            {group.d_group_name}
          </option>
        ))}
      </select>
      <table>
        <thead>
          <tr>
            <th>Meeting Code</th>
            <th>Group Name</th>
            <th>Start Time</th>
            <th>End Time</th>
            <th>Meeting Duration</th>
            <th>Description</th>
            <th>Room</th>
          </tr>
        </thead>
        <tbody>
          {meetings.map((meeting) => (
            <tr key={meeting.meeting_code}>
              <td>{meeting.meeting_code}</td>
              <td>{getGroupName(meeting.d_group_code)}</td>
              <td>{formatDateTime(meeting.start_meeting_date_time)}</td>
              <td>{formatDateTime(meeting.end_meeting_date_time)}</td>
              <td>{getMeetingDuration(meeting.start_meeting_date_time, meeting.end_meeting_date_time)}</td>
              <td>{meeting.meeting_description}</td>
              <td>{meeting.meeting_room}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default MeetingsPage;








