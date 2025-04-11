// Salary Trends Component
function renderSalaryTrends() {
  // This will be initialized in the main dashboard.js
  return `<div id="salary-trends-chart" class="h-80 w-full"></div>`;
}

function initSalaryTrendsChart() {
  const salaryTrendsChart = echarts.init(document.getElementById("salary-trends-chart"));

  const option = {
    title: {
      text: "Salary Trends (Last 12 Months)",
      left: "center",
      textStyle: {
        fontSize: 14,
        fontWeight: "normal",
      },
    },
    tooltip: {
      trigger: "axis",
    },
    legend: {
      data: ["Full Stack", "Frontend", "Data Science"],
      bottom: 0,
    },
    grid: {
      left: "3%",
      right: "4%",
      bottom: "15%",
      top: "15%",
      containLabel: true,
    },
    xAxis: {
      type: "category",
      boundaryGap: false,
      data: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
    },
    yAxis: {
      type: "value",
      axisLabel: {
        formatter: "${value}k",
      },
    },
    series: [
      {
        name: "Full Stack",
        type: "line",
        data: [98, 100, 102, 104, 105, 105, 107, 108, 110, 112, 115, 118],
        lineStyle: {
          color: "#4f46e5",
        },
        itemStyle: {
          color: "#4f46e5",
        },
      },
      {
        name: "Frontend",
        type: "line",
        data: [90, 92, 93, 94, 95, 95, 96, 97, 98, 99, 100, 102],
        lineStyle: {
          color: "#10b981",
        },
        itemStyle: {
          color: "#10b981",
        },
      },
      {
        name: "Data Science",
        type: "line",
        data: [110, 112, 114, 115, 116, 118, 120, 122, 124, 125, 128, 130],
        lineStyle: {
          color: "#f59e0b",
        },
        itemStyle: {
          color: "#f59e0b",
        },
      },
    ],
  };

  salaryTrendsChart.setOption(option);

  // Responsive chart
  window.addEventListener("resize", function () {
    salaryTrendsChart.resize();
  });
}