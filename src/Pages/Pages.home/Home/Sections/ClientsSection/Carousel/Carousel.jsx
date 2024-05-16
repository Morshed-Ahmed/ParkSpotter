import { useState, useEffect } from "react"
import styled from "styled-components"

export const CarouselContainer = styled.div`
  width: 100%;
  overflow: hidden;
  padding: 50px;
`

export const CarouselWrapper = styled.div`
  display: flex;
  transition: transform 2s ease;
`

export const CarouselItem = styled.div`
  flex: 0 0 auto;
  width: 100%;
  height: 200px;

  box-sizing: border-box;
`

const Carousel = ({ children }) => {
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((currentIndex) => (currentIndex + 1) % children.length)
    }, 2000)

    return () => clearInterval(interval)
  }, [children.length])

  return (
    <CarouselContainer>
      <CarouselWrapper
        style={{ transform: `translateX(-${currentIndex * 40}%)` }}
      >
        {children}
      </CarouselWrapper>
    </CarouselContainer>
  )
}

export default Carousel
