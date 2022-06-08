import React, { useEffect, useState } from "react";
import moment from "moment";
import WeeklyTableHeader from "./WeeklyTableHeader";
import WeeklyCalendarBody from "./WeeklyTableBody";
import WeeklyCalendarHeader from "./WeeklyCalendarHeader";
import "./WeeklyCalendar.css";

const WeeklyCalendar = () => {
  //selectedDay is a standard day
  const [selectedDay, setSelectedDay] = useState(moment());
  const [daysInWeek, setDaysInWeek] = useState();

  //need to fetch store information
  const storeOpen = moment("09:00", "HH:mm");
  // console.log("storeStart", storeOpen)
  const storeClose = moment("21:00", "HH:mm");

  useEffect(() => {
    const startDayOfWeek = selectedDay.clone().startOf("week");
    const endDayOfWeek = startDayOfWeek.clone().endOf("week");
    //days in week should include startDayOfWeek
    const weekCalArray = [startDayOfWeek.format()];
    //If you dont insert clone(), startDayOfweek will be incresed everytime in this loop.
    while (startDayOfWeek.add(1, "days").diff(endDayOfWeek) <= 0) {
      weekCalArray.push(startDayOfWeek.format());
    }
    // console.log(weekCalArray);
    setDaysInWeek(weekCalArray);
  }, [selectedDay]);

  return (
    <div className="Weekly-calendar-container">
      <WeeklyCalendarHeader
        storeOpen={storeOpen}
        storeClose={storeClose}
        setSelectedDay={setSelectedDay}
      />
      <div className="Weekly-calendar">
        <WeeklyTableHeader
          selectedDay={selectedDay}
          setSelectedDay={setSelectedDay}
          daysInWeek={daysInWeek}
        />

        <WeeklyCalendarBody
          selectedDay={selectedDay}
          storeOpen={storeOpen}
          storeClose={storeClose}
        />
      </div>
    </div>
  );
};

export default WeeklyCalendar;
