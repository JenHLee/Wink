import React, { useEffect, useState } from "react";
import { ProfileIcon } from "../../Reusables/components/ProfileIcon";
import WeeklySchedBar from "../../Reusables/components/WeeklySchedBar";
// import { ProfilePhoto } from "../../Reusables/components/ProfilePhoto";

const DisplayOthersSched = (props) => {
  const { cowokerProfs, positions, daysInWeek, storeOpen, storeClose } = props;
// console.log("all", cowokerProfs, positions, daysInWeek, storeOpen, storeClose)
  const [groupedProfs, setGroupedProfs] = useState();
  useEffect(() => {
    const groupByPosition = () => {
      const initialVal = {};
      return cowokerProfs?.reduce((acc, current) => {
        if (!acc[current.position]) {
          acc[current.position] = [];
        }

        acc[current.position].push(current);
        //order emplyees in every group
        acc[current.position]?.sort((a, b) =>
          a.firstname > b.firstname ? 1 : -1
        );
        // console.log('after', acc[current.position])

        return acc;
      }, initialVal);
    };
    const groupedObj = groupByPosition();
    setGroupedProfs(() => groupedObj);
  }, [cowokerProfs]);
  return (
    <>
      {positions?.map((position, i) => {
        const empInPositon = groupedProfs && groupedProfs[position.position];
        if (empInPositon) {
          return empInPositon?.map((emp, index) => {
            return (
              <React.Fragment key={`OtherScheds ${i} ${index}`}>
                <div
                  className="WeeklyCal-Profiles others"
                  key={`profile ${i} ${index}`}
                >
                  {index === 0 && (
                    <div className="title" key={`position ${i}`}>
                      <ProfileIcon profile={emp} color={position.color} />
                      <div className="name">{position.position}</div>
                    </div>
                  )}
                  <div className="profile" key={`profile ${index}`}>
                    <div key={`name ${index}`} className="Name-container">
                      <div className="name">
                        {emp.firstname}, {emp.lastname}
                      </div>
                    </div>
                  </div>
                </div>
                <WeeklySchedBar
                  daysInWeek={daysInWeek}
                  storeOpen={storeOpen}
                  storeClose={storeClose}
                  schedules={emp.schedules}
                />
              </React.Fragment>
            );
          });
        }
      })}
    </>
  );
};

export default DisplayOthersSched;
