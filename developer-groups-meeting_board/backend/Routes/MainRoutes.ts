import express, { NextFunction, Request, Response } from "express";
import { addMeeting, getAllGroups, getAllMeetings, getMeetingsByGroupCode } from "../Logic/MeetingLogic";

// ==============================================
// MEETINGS & GROUPS ROUTERS
// ==============================================

const router = express.Router();

// Route to retrieve all developer groups
router.get(
    "/all",
    async (request: Request, response: Response, next: NextFunction) => {
        response.status(200).json(await getAllGroups());
    }
);

// Route to retrieve all meetings
router.get(
    "/all_meetings",
    async (request: Request, response: Response, next: NextFunction) => {
        response.status(200).json(await getAllMeetings());
    }
);

// Route to retrieve meetings based on group code
  router.get(
    "/group_meetings/:d_group_code",
    async (request: Request, response: Response, next: NextFunction) => {
      const d_group_code = parseInt(request.params.d_group_code);
      const meetings = await getMeetingsByGroupCode(d_group_code);
      response.status(200).json(meetings);
    }
  );

  // Route to add a new meeting
router.post(
    "/add_meeting",
    async (request: Request, response: Response, next: NextFunction) => {
      const newMeeting = request.body;
      console.log("body:\n",newMeeting);
      const result = await addMeeting(newMeeting);
      return response.status(201).json(`${result}`);
    }
  );
 
  
  
  
export default router;