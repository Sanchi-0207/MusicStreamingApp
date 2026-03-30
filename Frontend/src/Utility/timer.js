import { useState, useEffect } from "react";

function Timer(initialCount) {
  const [count, setCount] = useState(initialCount);

  useEffect(() => {
    if (count === 0) return;

    const interval = setInterval(() => {
      setCount((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [count]);

  return { count, setCount };
}

export default Timer;