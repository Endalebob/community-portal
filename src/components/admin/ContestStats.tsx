import React from "react";
import ContestantsSolvedPerQuestion from "./contest_stats/ContestantsSolvedPerQuestion";
import ContestantsByNumberOfQuestions from "./contest_stats/ContestantsByNumberOfQuestions";

const ContestStats: React.FC = () => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 p-4 gap-4">
      <ContestantsSolvedPerQuestion />
      <ContestantsByNumberOfQuestions />
    </div>
  );
};

export default ContestStats;
