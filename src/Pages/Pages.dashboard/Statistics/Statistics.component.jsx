import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
// import chartOptions from "./Utils/chartOptions"
// import { getFilteredData } from "./Utils/dataUtils"

import {
  setChartType,
  selectChartType,
} from "../../../store/ChartSlice/chartSlice"
import {
  fetchDashboardData,
  selectDashboardData,
  selectDashboardError,
} from "../../../store/DashBoardSlice/dashBoardSlice"

import { Line, Bar, Pie, Doughnut, Radar, PolarArea } from "react-chartjs-2"
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  RadialLinearScale,
  Title,
  Tooltip,
  Legend,
} from "chart.js"
import DashBoardOverView from "./DashboardOverView/DashBoardOverView.component"
import FilterComponent from "./Filters/Filters.component"

import { ChartContainer, Container, Select } from "./Statistics.styled"
import {
  selectEndDate,
  selectMaxPrice,
  selectMaxTickets,
  selectMinPrice,
  selectMinTickets,
  selectStartDate,
} from "../../../store/FilterSlice/filterSlice"
import LocationAndZoneWarning from "./LocationAndZoneWarning/LocationAndZoneWarning.component"

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  RadialLinearScale,
  Title,
  Tooltip,
  Legend
)


export const dummyData = {
  labels: [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ],
  data: {
    2024: {
      ticketsSold: [720, 660, 860, 870, 620, 610, 460, 760, 780, 810, 750, 790],
      revenueGenerated: [
        3100, 5100, 4300, 2200, 8900, 3000, 4100, 4800, 5200, 5400, 5600, 6200,
      ],
      employeeExpenses: [
        1150, 1350, 1250, 1450, 1400, 1500, 1550, 1650, 1600, 1750, 1700, 1850,
      ],
    },
  },
}

export const getFilteredData = (
  startDate,
  endDate,
  minPrice,
  maxPrice,
  minTickets,
  maxTickets
) => {
  const start = startDate ? new Date(startDate) : null
  const end = endDate ? new Date(endDate) : null

  const filteredData = {
    labels: [],
    ticketsSold: [],
    revenueGenerated: [],
    employeeExpenses: [], // Added employee expenses
  }

  Object.keys(dummyData.data).forEach((year) => {
    dummyData.labels.forEach((label, index) => {
      const date = new Date(year, index)
      const price = dummyData.data[year].revenueGenerated[index]
      const tickets = dummyData.data[year].ticketsSold[index]
      const expenses = dummyData.data[year].employeeExpenses[index]

      if (
        (!start || date >= start) &&
        (!end || date <= end) &&
        (!minPrice || price >= minPrice) &&
        (!maxPrice || price <= maxPrice) &&
        (!minTickets || tickets >= minTickets) &&
        (!maxTickets || tickets <= maxTickets)
      ) {
        filteredData.labels.push(`${label} ${year}`)
        filteredData.ticketsSold.push(tickets)
        filteredData.revenueGenerated.push(price)
        filteredData.employeeExpenses.push(expenses) // Added employee expenses
      }
    })
  })

  return filteredData
}



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

const ChartComponent = () => {
  const dispatch = useDispatch()

  const chartType = useSelector(selectChartType)
  const dashboardData = useSelector(selectDashboardData)
  const error = useSelector(selectDashboardError)

  const startDate = useSelector(selectStartDate)
  const endDate = useSelector(selectEndDate)
  const minPrice = useSelector(selectMinPrice)
  const maxPrice = useSelector(selectMaxPrice)
  const minTickets = useSelector(selectMinTickets)
  const maxTickets = useSelector(selectMaxTickets)

  useEffect(() => {
    dispatch(fetchDashboardData())
  }, [dispatch])

  const handleChartTypeChange = (e) => {
    dispatch(setChartType(e.target.value))
  }

  const filteredData = getFilteredData(
    startDate,
    endDate,
    minPrice,
    maxPrice,
    minTickets,
    maxTickets
  )

  const data = {
    labels: filteredData.labels,
    datasets: [
      {
        label: "Tickets Sold",
        data: filteredData.ticketsSold,
        backgroundColor: "rgba(75,192,192,0.2)",
        borderColor: "rgba(75,192,192,1)",
        borderWidth: 1,
      },
      {
        label: "Revenue Generated",
        data: filteredData.revenueGenerated,
        backgroundColor: "rgba(153,102,255,0.2)",
        borderColor: "rgba(153,102,255,1)",
        borderWidth: 1,
      },
      {
        label: "Employee Expenses",
        data: filteredData.employeeExpenses, 
        backgroundColor: "rgba(255,99,132,0.2)",
        borderColor: "rgba(255,99,132,1)",
        borderWidth: 1,
      },
    ],
  }

  const renderChart = () => {
    switch (chartType) {
      case "Line":
        return <Line data={data} options={chartOptions} />
      case "Bar":
        return <Bar data={data} options={chartOptions} />
      case "Pie":
        return <Pie data={data} options={chartOptions} />
      case "Doughnut":
        return <Doughnut data={data} options={chartOptions} />
      case "Radar":
        return <Radar data={data} options={chartOptions} />
      case "PolarArea":
        return <PolarArea data={data} options={chartOptions} />
      default:
        return null
    }
  }

  return (
    <Container>
      <LocationAndZoneWarning/>
      <FilterComponent>
        <Select value={chartType} onChange={handleChartTypeChange}>
          <option value="Line">Line Chart</option>
          <option value="Bar">Bar Chart</option>
          <option value="Pie">Pie Chart</option>
          <option value="Doughnut">Doughnut Chart</option>
          <option value="Radar">Radar Chart</option>
          <option value="PolarArea">Polar Area Chart</option>
        </Select>
      </FilterComponent>

      {error && <div>Error: {error}</div>}
      <DashBoardOverView dashboardData={dashboardData} />
      <ChartContainer>{renderChart()}</ChartContainer>
    </Container>
  )
}

export default ChartComponent
