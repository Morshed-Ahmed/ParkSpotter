const chartOptions = {
  responsive: true,
  plugins: {
    legend: {
      display: true,
      labels: {
        color: "#202123",
        font: {
          family:
            "'Poppins', 'Helvetica Neue', 'Helvetica', 'Arial', sans-serif",
          size: 14,
          // style: "italic",
          weight: "bold",
        },
        padding: 20,
        boxWidth: 20,
      },
    },
    title: {
      display: true,
      text: "Sales and Revenue Chart",
      font: {
        family: "'Poppins', 'Helvetica Neue', 'Helvetica', 'Arial', sans-serif",
        size: 24,
        weight: "bold",
      },
      color: "#202123",
      padding: {
        top: 10,
        bottom: 30,
      },
    },
    subtitle: {
      display: true,
      text: "Tickets sold and revenue generated over the months",
      font: {
        family: "'Poppins', 'Helvetica Neue', 'Helvetica', 'Arial', sans-serif",
        size: 18,
        style: "italic",
      },
      color: "#505050",
      padding: {
        bottom: 20,
      },
    },
    tooltip: {
      enabled: true,
      backgroundColor: "rgba(0,0,0,0.7)",
      titleFont: {
        family: "'Poppins', 'Helvetica Neue', 'Helvetica', 'Arial', sans-serif",
        size: 16,
        weight: "bold",
      },
      bodyFont: {
        family: "'Poppins', 'Helvetica Neue', 'Helvetica', 'Arial', sans-serif",
        size: 14,
      },
      footerFont: {
        family: "'Poppins', 'Helvetica Neue', 'Helvetica', 'Arial', sans-serif",
        size: 14,
        style: "italic",
      },
      padding: 25,
      boxPadding: 8,
      borderColor: "rgba(0,0,0,1)",
      borderWidth: 1,
      caretSize: 15,
      cornerRadius: 25,
      callbacks: {
        label: function (context) {
          const label = context.dataset.label || ""
          const value = context.raw
          return `${label}:  ${value.toLocaleString()}`
        },
        footer: function (tooltipItems) {
          let sum = 0
          tooltipItems.forEach(function (tooltipItem) {
            sum += tooltipItem.raw
          })
          return `Total:  ${sum.toLocaleString()}`
        },
      },
    },
    annotation: {
      annotations: {
        line1: {
          type: "line",
          yMin: 100,
          yMax: 100,
          borderColor: "red",
          borderWidth: 2,
          label: {
            content: "Target",
            enabled: true,
            position: "start",
            backgroundColor: "red",
            color: "white",
            padding: 4,
          },
        },
        box1: {
          type: "box",
          xMin: "March",
          xMax: "April",
          yMin: 50,
          yMax: 150,
          backgroundColor: "rgba(101, 33, 171, 0.5)",
          borderColor: "rgba(101, 33, 171, 1)",
          borderWidth: 1,
        },
        point1: {
          type: "point",
          xValue: "June",
          yValue: 200,
          backgroundColor: "#0ab39c",
          radius: 10,
          borderWidth: 2,
          borderColor: "darkgreen",
          label: {
            content: "Peak",
            enabled: true,
            position: "end",
            color: "white",
            backgroundColor: "#0ab39c",
            padding: 4,
          },
        },
        callout: {
          type: "label",
          xValue: "February",
          yValue: 150,
          backgroundColor: "rgba(255, 99, 132, 0.8)",
          borderColor: "rgba(255, 99, 132, 1)",
          borderWidth: 1,
          content: "Important Event",
          enabled: true,
          position: "center",
          font: {
            family:
              "'Poppins', 'Helvetica Neue', 'Helvetica', 'Arial', sans-serif",
            size: 12,
            style: "italic",
          },
          padding: 8,
          cornerRadius: 4,
        },
      },
    },
    datalabels: {
      display: true,
      align: "top",
      color: "#202123",
      font: {
        family: "'Poppins', 'Helvetica Neue', 'Helvetica', 'Arial', sans-serif",
        size: 12,
        weight: "bold",
      },
      formatter: function (value, context) {
        return value.toLocaleString()
      },
      padding: {
        top: 10,
      },
      backgroundColor: "rgba(255, 255, 255, 0.7)",
      borderRadius: 3,
    },
    zoom: {
      pan: {
        enabled: true,
        mode: "xy",
      },
      zoom: {
        wheel: {
          enabled: true,
        },
        pinch: {
          enabled: true,
        },
        mode: "xy",
      },
    },
    export: {
      csv: {
        enabled: true,
        filename: "chart-data.csv",
      },
      image: {
        enabled: true,
        filename: "chart.png",
        type: "image/png",
      },
    },
    customPlugin: {
      beforeDraw: (chart) => {
        const ctx = chart.ctx
        ctx.save()
        ctx.fillStyle = "rgba(255, 255, 255, 0.6)"
        ctx.fillRect(0, 0, chart.width, chart.height)
        ctx.restore()
      },
    },
  },
  scales: {
    x: {
      ticks: {
        color: "#202123",
        font: {
          family:
            "'Poppins', 'Helvetica Neue', 'Helvetica', 'Arial', sans-serif",
          size: 12,
          weight: "bold",
        },
        padding: 10,
      },
      grid: {
        color: "rgba(200,200,200,0.2)",
        lineWidth: 1,
        borderDash: [5, 5],
      },
      title: {
        display: true,
        text: "Months",
        color: "#202123",
        font: {
          family:
            "'Poppins', 'Helvetica Neue', 'Helvetica', 'Arial', sans-serif",
          size: 14,
          weight: "bold",
        },
        padding: {
          top: 10,
        },
      },
    },
    y: {
      ticks: {
        color: "#202123",
        font: {
          family:
            "'Poppins', 'Helvetica Neue', 'Helvetica', 'Arial', sans-serif",
          size: 12,
          weight: "bold",
        },
        padding: 10,
        callback: function (value) {
          return value.toLocaleString()
        },
      },
      grid: {
        color: "rgba(200,200,200,0.2)",
        lineWidth: 1,
        borderDash: [5, 5],
      },
      title: {
        display: true,
        text: "Values",
        color: "#202123",
        font: {
          family:
            "'Poppins', 'Helvetica Neue', 'Helvetica', 'Arial', sans-serif",
          size: 14,
          weight: "bold",
        },
        padding: {
          bottom: 10,
        },
      },
    },
  },
  layout: {
    padding: {
      left: 20,
      right: 20,
      top: 20,
      bottom: 20,
    },
  },
  animation: {
    duration: 1500,
    easing: "easeInOutBounce",
    onComplete: function (animation) {
      console.log("Animation complete!", animation)
    },
  },
  hover: {
    mode: "nearest",
    intersect: true,
    onHover: function (event, activeElements) {
      if (activeElements.length > 0) {
        const activeElement = activeElements[0]
        const datasetIndex = activeElement.datasetIndex
        const index = activeElement.index
        console.log("Hovered dataset:", datasetIndex, "index:", index)
      }
    },
  },
  elements: {
    point: {
      radius: 5,
      hoverRadius: 7,
      backgroundColor: function (context) {
        const value = context.dataset.data[context.dataIndex]
        return value > 200 ? "#f7b84b" : "#0ab39c"
      },
      borderColor: "white",
      borderWidth: 2,
    },
    line: {
      tension: 0.4,
      borderWidth: 3,
      borderColor: function (context) {
        return context.dataset.label === "Revenue" ? "#0ab39c" : "#405189"
      },
    },
  },
  interaction: {
    mode: "index",
    intersect: false,
  },
}


export default chartOptions