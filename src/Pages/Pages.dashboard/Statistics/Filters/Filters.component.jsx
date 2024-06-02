import { useDispatch, useSelector } from "react-redux"
import {
  setSelectedFilter,
  setStartDate,
  setEndDate,
  setMinPrice,
  setMaxPrice,
  setMinTickets,
  setMaxTickets,
  selectSelectedFilter,
  selectStartDate,
  selectEndDate,
  selectMinPrice,
  selectMaxPrice,
  selectMinTickets,
  selectMaxTickets,
} from "../../../../store/FilterSlice/filterSlice"
import {
  Input,
  Select,
  FilterContainer,
  MobileFilterContainer,
  MobileFilterInputs,
} from "../Statistics.styled"

const FilterComponent = ({ children }) => {
  const dispatch = useDispatch()

  const selectedFilter = useSelector(selectSelectedFilter)
  const startDate = useSelector(selectStartDate)
  const endDate = useSelector(selectEndDate)
  const minPrice = useSelector(selectMinPrice)
  const maxPrice = useSelector(selectMaxPrice)
  const minTickets = useSelector(selectMinTickets)
  const maxTickets = useSelector(selectMaxTickets)

  const handleFilterChange = (e) => {
    dispatch(setSelectedFilter(e.target.value))
  }

  const handleStartDateChange = (e) => {
    dispatch(setStartDate(e.target.value))
  }

  const handleEndDateChange = (e) => {
    dispatch(setEndDate(e.target.value))
  }

  const handleMinPriceChange = (e) => {
    dispatch(setMinPrice(e.target.value))
  }

  const handleMaxPriceChange = (e) => {
    dispatch(setMaxPrice(e.target.value))
  }

  const handleMinTicketsChange = (e) => {
    dispatch(setMinTickets(e.target.value))
  }

  const handleMaxTicketsChange = (e) => {
    dispatch(setMaxTickets(e.target.value))
  }

  const renderFilterInputs = () => {
    switch (selectedFilter) {
      case "date":
        return (
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
        )
      case "price":
        return (
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
        )
      case "tickets":
        return (
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
        )
      default:
        return null
    }
  }

  return (
    <>
      <FilterContainer>
        {children}
        <Select value={selectedFilter} onChange={handleFilterChange}>
          <option value="">Select Filter</option>
          <option value="date">Date Range</option>
          <option value="price">Price Range</option>
          <option value="tickets">Tickets Sold Range</option>
        </Select>
        {renderFilterInputs()}
      </FilterContainer>

      <MobileFilterContainer>
        {children}
        <Select value={selectedFilter} onChange={handleFilterChange}>
          <option value="">Select Filter</option>
          <option value="date">Date Range</option>
          <option value="price">Price Range</option>
          <option value="tickets">Tickets Sold Range</option>
        </Select>
        {selectedFilter && (
          <MobileFilterInputs>{renderFilterInputs()}</MobileFilterInputs>
        )}
      </MobileFilterContainer>
    </>
  )
}

export default FilterComponent
