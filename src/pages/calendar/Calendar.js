import React, { useState } from "react";
import { Route, Routes } from "react-router-dom";
import moment from "moment";
import "moment-timezone";

import MonthlyCalendar from "../../components/calendar/monthlyCalendar/MonthlyCalendar";
import WeeklyCalendar from "../../components/calendar/weeklyCalendar/WeeklyCalendar";
import DailyCalendar from "../../components/calendar/dailyCalendar/DailyCalendar";

import "./calendar.css";
import ViewButtons from "../../components/calendar/Reusables/components/ViewButtons";
import TodayButton from "../../components/calendar/Reusables/components/TodayButton";

const Calendar = () => {
  const [selectedDay, setSelectedDay] = useState(
    moment()
    // .tz("America/New_York")
    // .format('YYYY-MM-DD HH:mmZ')
  );

  // console.log("selected calendar", selectedDay);
  return (
    <div className="Calendars-container">
      <div className="Calendar-header">
        <ViewButtons />
        <TodayButton setSelectedDay={setSelectedDay} />
      </div>
      <div className="Calendar-view">
        <Routes>
          <Route path="/monthly" element={<MonthlyCalendar />} />
          <Route
            path="/weekly"
            element={
              <WeeklyCalendar
                selectedDay={selectedDay}
                setSelectedDay={setSelectedDay}
              />
            }
          />
          <Route
            path="/daily"
            element={<DailyCalendar selectedDay={selectedDay} />}
          />
        </Routes>
      </div>
    </div>
  );
};

export default Calendar;
