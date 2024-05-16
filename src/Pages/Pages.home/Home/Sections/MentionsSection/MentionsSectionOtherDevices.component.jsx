import styled from "styled-components"
import SliderCarousel, { CarouselItem } from "./SliderCarousel/SliderCarousel"
import SliderCarouselCard from "./SliderCarouselCard/SliderCarouselCard.component"

const MentionsSectionContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;

  @media (max-width: 768px) {
    position: static;
    flex-direction: column;
  }
`

const TitleContainer = styled.div`
  width: 30%;
  align-self: baseline;
  text-align: right;
  position: absolute;
  left: 5.25em;
  top: 20px;
  font-size: 40px;
  z-index: 0;
  @media (max-width: 768px) {
    position: static;
    align-self: center;
    left: auto;
    top: auto;
    text-align: center;
  }
`

const Title = styled.p`
  font-size: 80px;
  font-weight: bold;

  @media (max-width: 768px) {
    text-align: center;
    font-size: 24px;
  }
`

const ContentContainer = styled.div`
  width: 70%;
  z-index: 1;
  @media (max-width: 768px) {
    z-index: 0;
    width: 100%;
  }
`

const GridContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  height: 100%;

  @media (max-width: 768px) {
    display: flex;
    align-items: center;
    justify-content: center;
  }
`

const SubGridContainerOne = styled.div`
  grid-column: 1 / 2;
  align-self: center;

  @media (max-width: 768px) {
    display: flex;
    align-items: center;
    justify-content: center;
  }
`
const SubGridContainerTwo = styled.div`
  grid-column: 2 / 3;
  @media (max-width: 768px) {
    display: flex;
    align-items: center;
    justify-content: center;
    align-self: center;
  }
`

function MentionsSectionOtherDevices() {
  return (
    <MentionsSectionContainer>
      <TitleContainer>
        <Title>Media Mentions</Title>
      </TitleContainer>

      <ContentContainer>
        <SliderCarousel>
          <CarouselItem>
            <GridContainer>
              <SubGridContainerOne>
                <SliderCarouselCard />
              </SubGridContainerOne>

              <SubGridContainerTwo>
                <SliderCarouselCard />
                <SliderCarouselCard />
              </SubGridContainerTwo>
            </GridContainer>
          </CarouselItem>

          <CarouselItem>
            <GridContainer>
              <SliderCarouselCard />
              <SliderCarouselCard />
              <SliderCarouselCard />
              <SliderCarouselCard />
            </GridContainer>
          </CarouselItem>

          <CarouselItem>
            <GridContainer>
              <SliderCarouselCard />
              <SliderCarouselCard />
              <SliderCarouselCard />
              <SliderCarouselCard />
            </GridContainer>
          </CarouselItem>
        </SliderCarousel>
      </ContentContainer>
    </MentionsSectionContainer>
  )
}

export default MentionsSectionOtherDevices
