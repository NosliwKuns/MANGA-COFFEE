import { useState } from "react";

const useIsActive = () => {
  const [isActive, setIsActive] = useState(true);
  console.log("isActive: " + isActive);
  return {isActive, setIsActive};
};

export default useIsActive;