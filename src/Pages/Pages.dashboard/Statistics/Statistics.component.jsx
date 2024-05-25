import React, { useState } from "react"
import styled from "styled-components"
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

const Container = styled.div`
  padding: 20px;
  background-color: #ffffff;
  color: #202123;
  display: flex;
  flex-direction: column;
  align-items: center;
`

const FilterContainer = styled.div`
  margin-bottom: 20px;
  width: 100%;
  max-width: 800px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-evenly;
  background: #202123;
  border-radius: 15px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  padding: 20px;
`

const Select = styled.select`
  padding: 12px;
  font-size: 14px;
  border: 2px solid #202123;
  border-radius: 8px;
  outline: none;
  width: 100%;
  max-width: 300px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  transition: box-shadow 0.3s;

  &:hover,
  &:focus {
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.15);
  }
`

const Input = styled.input`
  padding: 8px;
  font-size: 14px;
  border: 2px solid #202123;
  border-radius: 8px;
  outline: none;
  margin-bottom: 10px;
  width: 100%;
  max-width: 300px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  transition: box-shadow 0.3s;

  &:hover,
  &:focus {
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.15);
  }
`

const ChartContainer = styled.div`
  width: 100%;
  max-width: 900px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
`

const dummyData = {
  labels: ["January", "February", "March", "April", "May", "June", "July"],
  ticketsSold: [65, 59, 80, 81, 56, 55, 40],
  revenueGenerated: [2800, 4800, 4000, 1900, 8600, 2700, 3800],
}

const getFilteredData = (
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
  }

  dummyData.labels.forEach((label, index) => {
    const date = new Date(2021, index) 
    const price = dummyData.revenueGenerated[index]
    const tickets = dummyData.ticketsSold[index]

    if (
      (!start || date >= start) &&
      (!end || date <= end) &&
      (!minPrice || price >= minPrice) &&
      (!maxPrice || price <= maxPrice) &&
      (!minTickets || tickets >= minTickets) &&
      (!maxTickets || tickets <= maxTickets)
    ) {
      filteredData.labels.push(label)
      filteredData.ticketsSold.push(tickets)
      filteredData.revenueGenerated.push(price)
    }
  })

  return filteredData
}

const ChartComponent = () => {
  const [chartType, setChartType] = useState("Line")
  const [filterType, setFilterType] = useState("")
  const [startDate, setStartDate] = useState("")
  const [endDate, setEndDate] = useState("")
  const [minPrice, setMinPrice] = useState("")
  const [maxPrice, setMaxPrice] = useState("")
  const [minTickets, setMinTickets] = useState("")
  const [maxTickets, setMaxTickets] = useState("")

  const handleChartTypeChange = (e) => {
    setChartType(e.target.value)
  }

  const handleFilterTypeChange = (e) => {
    setFilterType(e.target.value)
  }

  const handleStartDateChange = (e) => {
    setStartDate(e.target.value)
  }

  const handleEndDateChange = (e) => {
    setEndDate(e.target.value)
  }

  const handleMinPriceChange = (e) => {
    setMinPrice(e.target.value)
  }

  const handleMaxPriceChange = (e) => {
    setMaxPrice(e.target.value)
  }

  const handleMinTicketsChange = (e) => {
    setMinTickets(e.target.value)
  }

  const handleMaxTicketsChange = (e) => {
    setMaxTickets(e.target.value)
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
    ],
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
            style: "italic",
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
          family:
            "'Poppins', 'Helvetica Neue', 'Helvetica', 'Arial', sans-serif",
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
          family:
            "'Poppins', 'Helvetica Neue', 'Helvetica', 'Arial', sans-serif",
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
          family:
            "'Poppins', 'Helvetica Neue', 'Helvetica', 'Arial', sans-serif",
          size: 16,
          weight: "bold",
        },
        bodyFont: {
          family:
            "'Poppins', 'Helvetica Neue', 'Helvetica', 'Arial', sans-serif",
          size: 14,
        },
        footerFont: {
          family:
            "'Poppins', 'Helvetica Neue', 'Helvetica', 'Arial', sans-serif",
          size: 12,
          style: "italic",
        },
        padding: 10,
        boxPadding: 5,
        borderColor: "rgba(0,0,0,0.1)",
        borderWidth: 1,
        caretSize: 5,
        cornerRadius: 4,
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
        },
        grid: {
          color: "rgba(200,200,200,0.2)",
          lineWidth: 1,
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
        return <Line data={data} options={chartOptions} />
    }
  }

  return (
    <Container>
      <FilterContainer>
        <Select value={chartType} onChange={handleChartTypeChange}>
          <option value="Line">Line Chart</option>
          <option value="Bar">Bar Chart</option>
          <option value="Pie">Pie Chart</option>
          <option value="Doughnut">Doughnut Chart</option>
          <option value="Radar">Radar Chart</option>
          <option value="PolarArea">Polar Area Chart</option>
        </Select>
        <Select value={filterType} onChange={handleFilterTypeChange}>
          <option value="">Select Filter Type</option>
          <option value="timeRange">Time Range</option>
          <option value="priceRange">Price Range</option>
          <option value="ticketsRange">Tickets Sold Range</option>
        </Select>
        {filterType === "timeRange" && (
          <>
            <Input
              type="date"
              value={startDate}
              onChange={handleStartDateChange}
              placeholder="Start Date"
            />
            <Input
              type="date"
              value={endDate}
              onChange={handleEndDateChange}
              placeholder="End Date"
            />
          </>
        )}
        {filterType === "priceRange" && (
          <>
            <Input
              type="number"
              value={minPrice}
              onChange={handleMinPriceChange}
              placeholder="Min Price"
            />
            <Input
              type="number"
              value={maxPrice}
              onChange={handleMaxPriceChange}
              placeholder="Max Price"
            />
          </>
        )}
        {filterType === "ticketsRange" && (
          <>
            <Input
              type="number"
              value={minTickets}
              onChange={handleMinTicketsChange}
              placeholder="Min Tickets Sold"
            />
            <Input
              type="number"
              value={maxTickets}
              onChange={handleMaxTicketsChange}
              placeholder="Max Tickets Sold"
            />
          </>
        )}
      </FilterContainer>
      <ChartContainer>{renderChart()}</ChartContainer>
    </Container>
  )
}

export default ChartComponent
