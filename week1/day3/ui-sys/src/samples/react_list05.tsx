import { useEffect, useState } from "react";

const ReactList05 = () => {
  return (
    <div className="flex flex-col items-center justify-center h-full">
      <div className="flex flex-row justify-between">
        <div className="flex flex-row gap-10">
          <h1 className="text-2xl font-bold mb-4">Deal of the day</h1>
          <CountDownTimer />
        </div>
      </div>
      <p className="text-lg">This is a sample component for React List 05.</p>
      <ul className="list-disc mt-4">
        <li>Item 1</li>
        <li>Item 2</li>
        <li>Item 3</li>
      </ul>
    </div>
  );
};

export default ReactList05;

const CountDownTimer = () => {
  const [time, setTime] = useState<string>("00:00:00");

  useEffect(() => {
    const endTime = new Date(Date.now() + 3600000); // 1 hour from now
    const interval = setInterval(() => {
      const now = new Date();
      const remainingTime = endTime.getTime() - now.getTime();

      if (remainingTime <= 0) {
        clearInterval(interval);
        setTime("00:00:00");
      } else {
        const hours = Math.floor((remainingTime / (1000 * 60 * 60)) % 24);
        const minutes = Math.floor((remainingTime / (1000 * 60)) % 60);
        const seconds = Math.floor((remainingTime / 1000) % 60);
        setTime(
          `${String(hours).padStart(2, "0")}:${String(minutes).padStart(
            2,
            "0"
          )}:${String(seconds).padStart(2, "0")}`
        );
      }
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return <span className="px-4 py-2 bg-orange-500">End in: {time}</span>;
};
