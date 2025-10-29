import React from "react";
import {
  RadialBarChart,
  RadialBar,
  Legend,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import "./StressVisualization.css";

const StressVisualization = ({ prediction, formData }) => {
  // Stress level gauge data
  const stressLevelValue =
    prediction.stress_level === "Low"
      ? 33
      : prediction.stress_level === "Moderate"
      ? 66
      : 100;

  const gaugeData = [
    {
      name: "Stress",
      value: stressLevelValue,
      fill:
        prediction.stress_level === "Low"
          ? "#4ade80"
          : prediction.stress_level === "Moderate"
          ? "#fb923c"
          : "#ef4444",
    },
  ];

  // Confidence pie chart data
  const confidenceData = [
    { name: "Confidence", value: prediction.confidence * 100, fill: "#3b82f6" },
    {
      name: "Uncertainty",
      value: (1 - prediction.confidence) * 100,
      fill: "#e5e7eb",
    },
  ];

  // Factor analysis - comparing user values to healthy ranges
  const factorAnalysisData = [
    {
      factor: "Sleep",
      value: formData.hours_of_sleep,
      healthy: 8,
      unit: "hrs",
    },
    {
      factor: "Study",
      value: formData.study_hours_per_day,
      healthy: 6,
      unit: "hrs",
    },
    {
      factor: "Social",
      value: formData.social_activity_hours,
      healthy: 3,
      unit: "hrs",
    },
    {
      factor: "Screen",
      value: formData.screen_time,
      healthy: 4,
      unit: "hrs",
    },
    {
      factor: "CGPA",
      value: formData.cgpa,
      healthy: 7.5,
      unit: "",
    },
  ];

  // Activity breakdown
  const activityData = [
    { name: "Sleep", value: formData.hours_of_sleep, fill: "#8b5cf6" },
    { name: "Study", value: formData.study_hours_per_day, fill: "#3b82f6" },
    { name: "Social", value: formData.social_activity_hours, fill: "#10b981" },
    { name: "Screen", value: formData.screen_time, fill: "#f59e0b" },
    {
      name: "Other",
      value: Math.max(
        0,
        24 -
          formData.hours_of_sleep -
          formData.study_hours_per_day -
          formData.social_activity_hours -
          formData.screen_time
      ),
      fill: "#94a3b8",
    },
  ];

  return (
    <div className="stress-visualization">
      <h2 className="viz-title">Prediction Analysis</h2>

      <div className="viz-grid">
        {/* Stress Level Gauge */}
        <div className="viz-card">
          <h3>Stress Level Gauge</h3>
          <ResponsiveContainer width="100%" height={250}>
            <RadialBarChart
              cx="50%"
              cy="50%"
              innerRadius="60%"
              outerRadius="90%"
              barSize={20}
              data={gaugeData}
              startAngle={180}
              endAngle={0}
            >
              <RadialBar minAngle={15} background clockWise dataKey="value" />
              <text
                x="50%"
                y="50%"
                textAnchor="middle"
                dominantBaseline="middle"
                className="gauge-text"
              >
                <tspan fontSize="24" fontWeight="bold" fill={gaugeData[0].fill}>
                  {prediction.stress_level}
                </tspan>
                <tspan x="50%" dy="1.5em" fontSize="14" fill="#666">
                  {stressLevelValue}%
                </tspan>
              </text>
            </RadialBarChart>
          </ResponsiveContainer>
        </div>

        {/* Confidence Meter */}
        <div className="viz-card">
          <h3>Prediction Confidence</h3>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={confidenceData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={80}
                paddingAngle={5}
                dataKey="value"
              >
                {confidenceData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.fill} />
                ))}
              </Pie>
              <Tooltip formatter={(value) => `${value.toFixed(1)}%`} />
              <text
                x="50%"
                y="50%"
                textAnchor="middle"
                dominantBaseline="middle"
              >
                <tspan fontSize="28" fontWeight="bold" fill="#3b82f6">
                  {(prediction.confidence * 100).toFixed(1)}%
                </tspan>
              </text>
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Factor Analysis Chart */}
        <div className="viz-card viz-card-wide">
          <h3>Your Metrics vs. Healthy Range</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart
              data={factorAnalysisData}
              margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="factor" />
              <YAxis />
              <Tooltip
                formatter={(value, name, props) => {
                  const item = factorAnalysisData.find(
                    (d) => d.factor === props.payload.factor
                  );
                  const displayValue = item?.unit
                    ? `${value} ${item.unit}`
                    : value;
                  return [displayValue, name];
                }}
              />
              <Legend />
              <Bar
                dataKey="value"
                name="Your Value"
                fill="#3b82f6"
                radius={[8, 8, 0, 0]}
              />
              <Bar
                dataKey="healthy"
                name="Healthy Range"
                fill="#10b981"
                radius={[8, 8, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Daily Time Distribution */}
        <div className="viz-card viz-card-wide">
          <h3>Daily Time Distribution (24 hours)</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={activityData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) =>
                  `${name}: ${(percent * 100).toFixed(0)}%`
                }
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
              >
                {activityData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.fill} />
                ))}
              </Pie>
              <Tooltip formatter={(value) => `${value.toFixed(1)} hours`} />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon">💤</div>
          <div className="stat-value">{formData.hours_of_sleep} hrs</div>
          <div className="stat-label">Sleep</div>
          <div
            className={`stat-status ${
              formData.hours_of_sleep >= 7 ? "good" : "warning"
            }`}
          >
            {formData.hours_of_sleep >= 7 ? "Good" : "Below Recommended"}
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">📚</div>
          <div className="stat-value">{formData.study_hours_per_day} hrs</div>
          <div className="stat-label">Study Time</div>
          <div
            className={`stat-status ${
              formData.study_hours_per_day <= 8 ? "good" : "warning"
            }`}
          >
            {formData.study_hours_per_day <= 8 ? "Balanced" : "High"}
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">👥</div>
          <div className="stat-value">{formData.social_activity_hours} hrs</div>
          <div className="stat-label">Social Activity</div>
          <div
            className={`stat-status ${
              formData.social_activity_hours >= 2 ? "good" : "warning"
            }`}
          >
            {formData.social_activity_hours >= 2 ? "Good" : "Low"}
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">📱</div>
          <div className="stat-value">{formData.screen_time} hrs</div>
          <div className="stat-label">Screen Time</div>
          <div
            className={`stat-status ${
              formData.screen_time <= 5 ? "good" : "warning"
            }`}
          >
            {formData.screen_time <= 5 ? "Moderate" : "High"}
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">🎯</div>
          <div className="stat-value">{formData.cgpa}</div>
          <div className="stat-label">CGPA</div>
          <div
            className={`stat-status ${formData.cgpa >= 7 ? "good" : "warning"}`}
          >
            {formData.cgpa >= 8
              ? "Excellent"
              : formData.cgpa >= 7
              ? "Good"
              : "Needs Improvement"}
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">🏃</div>
          <div className="stat-value">{formData.physical_activity}</div>
          <div className="stat-label">Physical Activity</div>
          <div
            className={`stat-status ${
              formData.physical_activity === "moderate" ? "good" : "warning"
            }`}
          >
            {formData.physical_activity === "moderate" ? "Active" : "Sedentary"}
          </div>
        </div>
      </div>
    </div>
  );
};

export default StressVisualization;
