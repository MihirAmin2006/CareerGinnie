export const salaryChartConfig = {
    animation: false,
    tooltip: {
        trigger: "axis",
        backgroundColor: "rgba(255, 255, 255, 0.8)",
        borderColor: "#eee",
        borderWidth: 1,
        textStyle: {
            color: "#1f2937",
        },
    },
    legend: {
        data: ["Your Skills", "Market Average", "Top 10%"],
        bottom: 0,
        textStyle: {
            color: "#1f2937",
        },
    },
    grid: {
        left: "3%",
        right: "4%",
        bottom: "15%",
        top: "3%",
        containLabel: true,
    },
    xAxis: {
        type: "category",
        boundaryGap: false,
        data: ["Frontend Dev", "Full Stack", "React Dev", "UI Engineer", "JavaScript Dev"],
        axisLine: {
            lineStyle: {
                color: "#ddd",
            },
        },
        axisLabel: {
            color: "#1f2937",
        },
    },
    yAxis: {
        type: "value",
        axisLine: {
            show: false,
        },
        axisLabel: {
            color: "#1f2937",
            formatter: "${value}K",
        },
        splitLine: {
            lineStyle: {
                color: "#eee",
            },
        },
    },
    series: [
        {
            name: "Your Skills",
            type: "line",
            smooth: true,
            lineStyle: {
                width: 3,
                color: "rgba(87, 181, 231, 1)",
            },
            symbol: "none",
            areaStyle: {
                color: {
                    type: "linear",
                    x: 0,
                    y: 0,
                    x2: 0,
                    y2: 1,
                    colorStops: [
                        {
                            offset: 0,
                            color: "rgba(87, 181, 231, 0.2)",
                        },
                        {
                            offset: 1,
                            color: "rgba(87, 181, 231, 0.05)",
                        },
                    ],
                },
            },
            data: [95, 100, 105, 98, 102],
        },
        {
            name: "Market Average",
            type: "line",
            smooth: true,
            lineStyle: {
                width: 3,
                color: "rgba(141, 211, 199, 1)",
            },
            symbol: "none",
            areaStyle: {
                color: {
                    type: "linear",
                    x: 0,
                    y: 0,
                    x2: 0,
                    y2: 1,
                    colorStops: [
                        {
                            offset: 0,
                            color: "rgba(141, 211, 199, 0.2)",
                        },
                        {
                            offset: 1,
                            color: "rgba(141, 211, 199, 0.05)",
                        },
                    ],
                },
            },
            data: [90, 93, 98, 92, 95],
        },
        {
            name: "Top 10%",
            type: "line",
            smooth: true,
            lineStyle: {
                width: 3,
                color: "rgba(251, 191, 114, 1)",
            },
            symbol: "none",
            areaStyle: {
                color: {
                    type: "linear",
                    x: 0,
                    y: 0,
                    x2: 0,
                    y2: 1,
                    colorStops: [
                        {
                            offset: 0,
                            color: "rgba(251, 191, 114, 0.2)",
                        },
                        {
                            offset: 1,
                            color: "rgba(251, 191, 114, 0.05)",
                        },
                    ],
                },
            },
            data: [120, 125, 130, 122, 128],
        },
    ],
};