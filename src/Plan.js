import React from "react";
import "./Plan.css";
import Moment from "moment";
import Helmet from "react-helmet";

let weekHeight = 60;

const TodayMarker = props => {
  const daysElapsed = Moment().diff(Moment(props.startDate), "days");
  const yOffset = daysElapsed / 7 * weekHeight;

  const sx = {
    top: `${yOffset}px`
  };

  const isVisible = daysElapsed >= 0 && daysElapsed <= props.weeks * 7;

  return isVisible ? <div className="plan__todayMarker" style={sx} /> : "";
};

const Axis = props => {
  const weeks = [];

  if (props.weeks) {
    for (let i = 0; i < props.weeks; i++) {
      weeks.push(
        <div
          key={i}
          className="plan__week"
          style={{ height: `${weekHeight}px` }}
        >
          <span>
            {Moment(props.startDate)
              .add(i, "week")
              .format("MMM DD")}
          </span>
        </div>
      );
    }
  }

  return <div className="plan__axis">{weeks}</div>;
};

const Task = props => {
  const opacity = props.isRest ? "0.5" : "1.0";

  const sx = {
    height: `${props.durationinWeeks * weekHeight}px`,
    opacity: `${opacity}`
  };

  return (
    <div className="plan__task" style={sx}>
      <span className="plan__task__label">{props.title}</span>
    </div>
  );
};

const Plan = props => {
  const tasks = [];
  let numOfWeeks = 0;
  let isRest = false;

  props.data.forEach((task, index) => {
    numOfWeeks += task.durationInWeeks;
    isRest = task.title === "Rest";

    tasks.push(
      <Task
        key={index}
        title={task.title}
        durationinWeeks={task.durationInWeeks}
        isRest={isRest}
      />
    );
  });

  return (
    <div className="plan">
      <Helmet title="Training Plan" />
      <Axis weeks={numOfWeeks} startDate={props.startDate} />
      <div className="plan__content">
        {tasks}
        <TodayMarker weeks={numOfWeeks} startDate={props.startDate} />
      </div>
    </div>
  );
};

export default Plan;
