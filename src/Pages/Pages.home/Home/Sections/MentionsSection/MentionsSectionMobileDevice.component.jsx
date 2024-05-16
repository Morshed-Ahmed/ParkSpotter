import styled from "styled-components"
import SliderCarousel, { CarouselItem } from "./SliderCarousel/SliderCarousel"
import SliderCarouselCard from "./SliderCarouselCard/SliderCarouselCard.component"

const MentionsSectionContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 800px;

  @media (max-width: 768px) {
    position: static;
    flex-direction: column;
    height: 680px;
  }
`

const TitleContainer = styled.div`
  width: 30%;
  align-self: baseline;
  font-size: 40px;

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
    grid-template-columns: 1fr;
  }
`

const SubGridContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`

function MentionsSectionMobileDevice() {
  return (
    <MentionsSectionContainer>
      <TitleContainer>
        <Title>Media Mentions</Title>
      </TitleContainer>

      <ContentContainer>
        <SliderCarousel>
          <CarouselItem>
            <GridContainer>
              <SubGridContainer>
                <SliderCarouselCard />
              </SubGridContainer>
            </GridContainer>
          </CarouselItem>

          <CarouselItem>
            <GridContainer>
              <SubGridContainer>
                <SliderCarouselCard />
              </SubGridContainer>
            </GridContainer>
          </CarouselItem>

          <CarouselItem>
            <GridContainer>
              <SubGridContainer>
                <SliderCarouselCard />
              </SubGridContainer>
            </GridContainer>
          </CarouselItem>
        </SliderCarousel>
      </ContentContainer>
    </MentionsSectionContainer>
  )
}

export default MentionsSectionMobileDevice
