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
