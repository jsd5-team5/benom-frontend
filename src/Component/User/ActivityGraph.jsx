import React from "react";
import { Chart as ChartJS, LineElement, CategoryScale, LinearScale, PointElement, Legend, Tooltip } from "chart.js";
import { Line } from "react-chartjs-2";
ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement, Legend, Tooltip);

const ActivityGraph = ({ ExerciseLog }) => {
  {
    /* ชื่อฐานกราฟ แกน X - แก้เป็นระบบวันจริง */
  }
  const today = new Date();
  const labels = [];
  for (let i = 6; i >= 0; i--) {
    labels.push(new Date(today - i * 24 * 60 * 60 * 1000).toISOString().split("T")[0]);
  }

  {
    /*เส้นกราฟการออกกำลังกาย 6 ชนิด ช่อง data คือ จำนวนวัน 7 วัน*/
  }
  const exercises = {
    Cycling: { data: Array(labels.length).fill(0), time: 0 },
    Swimming: { data: Array(labels.length).fill(0), time: 0 },
    Yoga: { data: Array(labels.length).fill(0), time: 0 },
    Running: { data: Array(labels.length).fill(0), time: 0 },
    Walking: { data: Array(labels.length).fill(0), time: 0 },
    Calisthenics: { data: Array(labels.length).fill(0), time: 0 },
    totalCalories: 0,
    totalTime: 0,
  };
  ExerciseLog.forEach((ex) => {
    if (new Date(ex.date) < new Date(labels[0])) return;
    const exIndex = labels.indexOf(ex.date.split("T")[0]);
    if (exIndex === -1) return;
    const exerciseType = ex.exerciseName.split(":")[0];
    exercises[exerciseType].data[exIndex] += ex.calories;
    exercises.totalCalories += ex.calories;
    exercises[exerciseType].time += ex.duration;
    exercises.totalTime += ex.duration;
  });

  const data = {
    labels: labels,
    datasets: [
      {
        label: "Cycling",
        backgroundColor: "#f21605",
        borderColor: "#f21605",
        data: exercises["Cycling"].data,
      },
      {
        label: "Swimming",
        backgroundColor: "#fe7534",
        borderColor: "#fe7534",
        data: exercises["Swimming"].data,
      },
      {
        label: "Yoga",
        backgroundColor: "#ffb443",
        borderColor: "#ffb443",
        data: exercises["Yoga"].data,
      },
      {
        label: "Running",
        backgroundColor: "#DE3163",
        borderColor: "#DE3163",
        data: exercises["Running"].data,
      },
      {
        label: "Walking",
        backgroundColor: "#e456c6",
        borderColor: "#e456c6",
        data: exercises["Walking"].data,
      },
      {
        label: "Calisthenics",
        backgroundColor: "#ff6767",
        borderColor: "#ff6767",
        data: exercises["Calisthenics"].data,
      },
    ],
  };
  return (
    <>
      <div id="line-chart">
        <div>
          <Line data={data} />
        </div>
      </div>

      {/*เส้นตรงสีดำ เริ่ม*/}
      <div class="border-t border-gray-700 w-3/3 mx-auto my-2"></div>
      {/*แถบแสดงข้อมูลผลรวมกราฟ - ใต้เส้นสีดำ */}
      <nav>
        <ul className="flex text-sm">
          <li className="flex w-80">
            <img />
            Weekly Totals
          </li>
          <li className="flex-1">
            <img /> {`${Math.floor(exercises.totalTime / 60)} hours, ${exercises.totalTime % 60} minutes.`}
          </li>
          <li className="flex-1 ml-3">
            <img />
            Total Calories Burned
          </li>
          <li className="flex-1">
            <img />
            {exercises.totalCalories}
          </li>
        </ul>
      </nav>

      {/*จบแถบแสดงข้อมูลผลรวมกราฟ - ใต้เส้นสีดำ */}
      <div class="border-t border-gray-700 w-3/3 mx-auto my-2"></div>
      {/*เส้นตรงสีดำ จบ*/}
    </>
  );
};

export default ActivityGraph;
