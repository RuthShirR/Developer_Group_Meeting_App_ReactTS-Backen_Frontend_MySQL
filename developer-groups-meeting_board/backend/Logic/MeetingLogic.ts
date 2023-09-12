
import dal_mysql from "../Utils/dal_mysql";
import Meeting from "../Models/Meeting";

// ==============================================
// MEETINGS & GROUPS LOGIC
// ==============================================

// Function to retrieve all developer groups
const getAllGroups = async () => {
  const sql = "SELECT * FROM developer_groups";
  const all = await dal_mysql.execute(sql);
  console.log(all);
  return all;
}

// Function to retrieve all meetings
const getAllMeetings = async () => {
  const sql = "SELECT * FROM Meeting_schedule";
  const all = await dal_mysql.execute(sql);
  console.log(all);
  return all;
}

// Function to retrieve meetings based on a specific group code
const getMeetingsByGroupCode = async (d_group_code: number) => {
  const sql = `SELECT * FROM Meeting_schedule WHERE d_group_code = ${d_group_code}`;
  const meetings = await dal_mysql.execute(sql);
  return meetings;
};

// Function to add a new meeting to the database
const addMeeting = async (newMeeting: Meeting) => {
  console.log(newMeeting);
  const sql = `INSERT INTO Meeting_schedule(d_group_code, start_meeting_date_time, end_meeting_date_time, meeting_description, meeting_room) VALUES ( ${newMeeting.d_group_code}, '${newMeeting.start_meeting_date_time}', '${newMeeting.end_meeting_date_time}', '${newMeeting.meeting_description}', '${newMeeting.meeting_room}')`;
  console.log(sql);
  const result = await dal_mysql.execute(sql);
  return result;
};

export { getAllGroups, getAllMeetings, addMeeting, getMeetingsByGroupCode };
