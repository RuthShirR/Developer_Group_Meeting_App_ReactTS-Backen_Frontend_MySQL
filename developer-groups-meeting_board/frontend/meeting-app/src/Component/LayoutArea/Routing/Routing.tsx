import React from 'react';
import { Route, Routes } from "react-router-dom";
import Home from '../../HomeArea/Home/Home';
import Page404 from '../Page404/Page404';
import AddMeetingPage from '../../Pages/AddMeetingPage/AddMeetingPage';
import MeetingsPage from "../../Pages/MeetingsPage/MeetingsPage";

function Routing(): JSX.Element {
  return (
    <div className="Routing">
         <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/meetings" element={<MeetingsPage />} />
        <Route path="/add-meeting" element={<AddMeetingPage />} />
        <Route path="/*" element={<Page404 />} />
      </Routes>
     
    </div>
  );
}

export default Routing;



 

