import React from "react";
import { Link } from "react-router";

import { formatDate } from "../lib/utils.js";

const TaskCard = ({ task }) => {
  return (
    <Link to={`/task/${task._id}`} className="card bg-base-100 shadow-lg shadow-neutral hover:shadow-xl hover:shadow-neutral transition-all duration-300">
      <div className="card-body">
        <h3 className="card-title">{task.title}</h3>
        <span className="badge badge-accent">{task.subject}</span>
        <p>{task.description}</p>
        <div className="card-actions justify-end">
          <span className="badge badge-outline">{formatDate(task.deadline)}</span>
        </div>
      </div>
    </Link>
  );
};

export default TaskCard;
