import React, { useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";

const CountUp = ({ start, end }) => {
  const { t } = useTranslation();
  const [count, setCount] = useState("00:00:00");

  const startDate = useMemo(() => new Date(start * 1000), [start]);

  useEffect(() => {
    const interval = setInterval(() => {
      const diff = (end ? new Date(end * 1000) : new Date()) - startDate;
      const minutes = Math.floor((diff / (1000 * 60)) % 60);
      const hours = Math.floor(minutes / 60);
      const seconds = Math.floor((diff / 1000) % 60);

      const time = `${hours < 10 ? `0${hours}` : hours}:${
        minutes < 10 ? `0${minutes}` : minutes
      }:${seconds < 10 ? `0${seconds}` : seconds}`;

      setCount((prev) => {
        return time;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [startDate, end]);

  if (!start) {
    return t("visitors.all.notStarted");
  }

  return (
    <div>
      <span>{count}</span>
    </div>
  );
};

export default CountUp;
