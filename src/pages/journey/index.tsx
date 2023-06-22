import { withStudentAuth } from "<@>/components/auth/withStudentAuth";
import Contests from "<@>/components/my-journey/Contests";
import Journey from "<@>/components/my-journey/Journey";
import Stepper from "<@>/components/my-journey/Stepper";
import React from "react";

const index: React.FC = () => {
  return (
    <div>
      <Journey />
    </div>
  );
};

export default withStudentAuth(index);
