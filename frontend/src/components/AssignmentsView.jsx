import React from "react";
import AssignmentCard from "./AssignmentCard";

const AssignmentsView = ({ assignments = [], onSelectAssignment }) => {

  const easyAssignments = assignments.filter(
    (a) => a.difficulty === "Easy"
  );

  const mediumAssignments = assignments.filter(
    (a) => a.difficulty === "Medium"
  );

  const hardAssignments = assignments.filter(
    (a) => a.difficulty === "Hard"
  );

  const renderSection = (title, data, difficultyClass) => (
    <div className={`assignment-section ${difficultyClass}`}>
      <h3 className="assignment-section__title">{title}</h3>

      <div className="assignments-grid">
        {data.length === 0 ? (
          <p>No {title} assignments available.</p>
        ) : (
          data.map((assignment) => (
            <AssignmentCard
              key={assignment._id}
              assignment={assignment}
              onSelect={onSelectAssignment}
            />
          ))
        )}
      </div>
    </div>
  );

  return (
    <div className="assignments-view">
      <div className="assignments-view__header">
        <h2>Available Assignments</h2>
        <p>Select an assignment to start practicing SQL</p>
      </div>

      {renderSection("🟢 Easy", easyAssignments, "easy")}
      {renderSection("🟠 Medium", mediumAssignments, "medium")}
      {renderSection("🔴 Hard", hardAssignments, "hard")}
    </div>
  );
};

export default AssignmentsView;