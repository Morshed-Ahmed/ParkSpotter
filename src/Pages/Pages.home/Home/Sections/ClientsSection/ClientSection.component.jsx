import styled from "styled-components"
import * as carouselIcons from "../../../../../assets/CarouselIcons/CarouselIcons"
import Carousel, { CarouselItem } from "./Carousel/Carousel"

const SectionContainer = styled.div`
  background-color: #f6f7fb;
  display: grid;
  grid-template-columns: 1fr 1fr;
  @media (max-width: 768px) {
    display: flex;
    flex-direction: column;
  }
`

const ClientsContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`

const Title = styled.h1`
  margin-bottom: 10px;
  font-size: 2rem;
  font-weight: bold;
  padding-top:60px
`

const Subtitle = styled.p`
  margin-bottom: 30px;
`

const GridContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 20px;
`

const ClientItem = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`

const ClientLogo = styled.img`
  height: 60px;
  max-width: 100%;
  max-height: 100%;
`

const ClientName = styled.p`
  margin-top: 10px;
`

function ClientSection() {
  return (
    <SectionContainer>
      <ClientsContainer>
        <Title>Our Clients</Title>
        <Subtitle>We are trusted by some of the best</Subtitle>
      </ClientsContainer>
      <div>
        <Carousel>
          <CarouselItem>
            <GridContainer>
              <ClientItem>
                <ClientLogo src={carouselIcons.adobeIcon} />
                <ClientName>Adobe</ClientName>
              </ClientItem>
              <ClientItem>
                <ClientLogo src={carouselIcons.atiIcon} />
                <ClientName>ATI</ClientName>
              </ClientItem>
              <ClientItem>
                <ClientLogo src={carouselIcons.brandIcon} />
                <ClientName>Brilliant</ClientName>
              </ClientItem>
              <ClientItem>
                <ClientLogo src={carouselIcons.caffeineIcon} />
                <ClientName>Caffeine</ClientName>
              </ClientItem>
              <ClientItem>
                <ClientLogo src={carouselIcons.huaweiIcon} />
                <ClientName>Huawei</ClientName>
              </ClientItem>
              <ClientItem>
                <ClientLogo src={carouselIcons.itunesIcon} />
                <ClientName>iTunes</ClientName>
              </ClientItem>
            </GridContainer>
          </CarouselItem>
          <CarouselItem>
            <GridContainer>
              <ClientItem>
                <ClientLogo src={carouselIcons.logoIcon} />
                <ClientName>Logo</ClientName>
              </ClientItem>
              <ClientItem>
                <ClientLogo src={carouselIcons.pinterestIcon} />
                <ClientName>Pinterest</ClientName>
              </ClientItem>
              <ClientItem>
                <ClientLogo src={carouselIcons.mcdonaldsIcon} />
                <ClientName>McDonald&lsquo;s</ClientName>
              </ClientItem>
              <ClientItem>
                <ClientLogo src={carouselIcons.unityIcon} />
                <ClientName>Unity</ClientName>
              </ClientItem>
              <ClientItem>
                <ClientLogo src={carouselIcons.nikeIcon} />
                <ClientName>Nike</ClientName>
              </ClientItem>
              <ClientItem>
                <ClientLogo src={carouselIcons.msnIcon} />
                <ClientName>MSN</ClientName>
              </ClientItem>
            </GridContainer>
          </CarouselItem>
          <CarouselItem>
            <GridContainer>
              <ClientItem>
                <ClientLogo src={carouselIcons.astrazenecaIcon} />
                <ClientName>AstraZeneca</ClientName>
              </ClientItem>
              <ClientItem>
                <ClientLogo src={carouselIcons.telegramIcon} />
                <ClientName>Telegram</ClientName>
              </ClientItem>
              <ClientItem>
                <ClientLogo src={carouselIcons.upsIcon} />
                <ClientName>UPS</ClientName>
              </ClientItem>
              <ClientItem>
                <ClientLogo src={carouselIcons.enterpriseIcon} />
                <ClientName>Enterprise</ClientName>
              </ClientItem>
              <ClientItem>
                <ClientLogo src={carouselIcons.adobeIcon} />
                <ClientName>Adobe</ClientName>
              </ClientItem>
              <ClientItem>
                <ClientLogo src={carouselIcons.atiIcon} />
                <ClientName>ATI</ClientName>
              </ClientItem>
            </GridContainer>
          </CarouselItem>
          {/* Add more CarouselItems as needed */}
        </Carousel>
      </div>
    </SectionContainer>
  )
}

export default ClientSection
