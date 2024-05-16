import { useState, useRef } from "react"
import styled from "styled-components"

export const CarouselContainer = styled.div`
  width: 100%;
  overflow: hidden;
  padding: 50px;

  @media (max-width: 768px) {
    padding: 20px;
  }
`

export const CarouselWrapper = styled.div`
  display: flex;
  transition: transform 0.5s cubic-bezier(0.22, 1, 0.36, 1);
  height: 800px;
  @media (max-width: 768px) {
    height: auto;
    flex-wrap: nowrap;
  }
`

export const CarouselItem = styled.div`
  flex: 0 0 auto;
  width: 100%;
  height: 400px;
  box-sizing: border-box;

  @media (max-width: 768px) {
    height: auto;
    width: 90%; /* Adjust width to show one item at a time */
    margin-right: 5%; /* Adjust margin to separate items */
  }
`

const SliderCarousel = ({ children }) => {
  const [startIndex, setStartIndex] = useState(0)
  const [startPosition, setStartPosition] = useState(0)
  const [isDragging, setIsDragging] = useState(false)
  const [velocity, setVelocity] = useState(0)

  const containerRef = useRef(null)

  const handleTouchStart = (event) => {
    setIsDragging(true)
    setStartPosition(event.touches[0].clientX)
    setVelocity(0)
  }

  const handleTouchMove = (event) => {
    if (!isDragging) return

    const currentPosition = event.touches[0].clientX
    const diff = currentPosition - startPosition

    const sensitivity = 0.003
    const newIndex = startIndex - diff * sensitivity
    setStartIndex(newIndex)
    setStartPosition(currentPosition)
  }

  const handleTouchEnd = () => {
    setIsDragging(false)

    const decelerationRate = 0.7
    const timer = setInterval(() => {
      setStartIndex((prevIndex) => {
        const newIndex = prevIndex + velocity
        return Math.max(0, Math.min(children.length - 1, newIndex))
      })
      setVelocity((prevVelocity) => prevVelocity * decelerationRate)
      if (Math.abs(velocity) < 0.001) clearInterval(timer)
    }, 16)
  }

  const handleMouseDown = (event) => {
    setIsDragging(true)
    setStartPosition(event.clientX)
    setVelocity(0)
  }

  const handleMouseMove = (event) => {
    if (!isDragging) return

    const currentPosition = event.clientX
    const diff = currentPosition - startPosition

    const sensitivity = 0.003
    const newIndex = startIndex - diff * sensitivity
    setStartIndex(newIndex)
    setStartPosition(currentPosition)
  }

  const handleMouseUp = () => {
    setIsDragging(false)

    const decelerationRate = 0.7
    const timer = setInterval(() => {
      setStartIndex((prevIndex) => {
        const newIndex = prevIndex + velocity
        return Math.max(0, Math.min(children.length - 1, newIndex))
      })
      setVelocity((prevVelocity) => prevVelocity * decelerationRate)
      if (Math.abs(velocity) < 0.001) clearInterval(timer)
    }, 16)
  }

  const handleMouseMoveCapture = (event) => {
    if (isDragging) event.preventDefault()
  }

  return (
    <CarouselContainer
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      onMouseMoveCapture={handleMouseMoveCapture}
      ref={containerRef}
    >
      <CarouselWrapper
        style={{ transform: `translateX(-${startIndex * 100}%)` }} // Adjusted to show one item at a time
      >
        {children}
      </CarouselWrapper>
    </CarouselContainer>
  )
}

export default SliderCarousel
