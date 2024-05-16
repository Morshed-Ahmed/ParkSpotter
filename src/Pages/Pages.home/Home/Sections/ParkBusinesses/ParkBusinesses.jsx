import { useEffect, useState } from "react"
import styled from "styled-components"
import { Link } from "react-router-dom"

const Container = styled.div`
  background-color: #f6f7fb;
`
const ParkBusinessesTitle = styled.div`
  width: 85%;
  margin: auto;
  padding: 70px 0px;
  display: flex;
  flex-direction: column;
  gap: 15px;
  h1 {
    font-size: 56px;
    line-height: 69px;
    font-weight: 700;
  }
  p {
    font-size: 18px;
    line-height: 32px;
    font-weight: 600;
    color: #a9a9ab;
  }

  @media (max-width: 768px) {
    h1 {
      font-size: 40px;
      line-height: 54px;
    }
    p {
      line-height: 26px;
    }
    text-align: center;
  }
`
const TabsContainer = styled.div`
  width: 85%;
  margin: auto;
  display: flex;
  gap: 40px;
  border-bottom: 1px solid #b3b3b3;
  grid-template-column: 1fr 1fr;
  column-gap: 70px;

  @media (max-width: 768px) {
    gap: 10px;
    display: grid;
    grid-template-column: 1fr 1fr;
    column-gap: 10%;
    border-bottom: none;
  }
`
const TabCoupleContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  column-gap: 70px;
  @media (max-width: 768px) {
    column-gap: auto;
  }
`

const Tab = styled.div`
  padding: 10px 0px;
  cursor: pointer;
  color: ${({ active }) => (active ? "#5430BB" : "#B3B3B3")};
  border: 1px solid #ccc;
  border: none;
  font-size: 24px;
  font-weight: 700;
  line-height: 30px;
  border-bottom: ${({ active }) =>
    active ? "1px solid #5430BB" : "transparent"};

  &:first-child {
    border-top-left-radius: 5px;
  }

  &:last-child {
    border-top-right-radius: 5px;
  }

  @media (max-width: 768px) {
    font-size: 13px;
    font-weight: 700;
    background-color: #202123;
    text-align: center;
    border-radius: 60px;
    color: ${({ active }) => (active ? "coral" : "#fff")};
  }
`

const Content = styled.div`
  margin: 70px 0;
`

const ContentBox = styled.div`
  display: flex;
  @media (max-width: 768px) {
    flex-direction: column;
  }
`

const ContentImage = styled.div`
  width: 50%;

  img {
    width: 100%;
  }
  @media (max-width: 768px) {
    width: 100%;
  }
`
const ContentDescription = styled.div`
  width: 50%;
  padding: 33px;
  background-color: #5430bb;
  color: white;
  display: flex;
  flex-direction: column;
  h1 {
    font-size: 40px;
    font-weight: 700;
    line-height: 50px;
  }
  h2 {
    font-size: 24px;
    font-weight: 600;
    line-height: 30px;
  }

  ul li {
    font-size: 16px;
    font-weight: 800;
    line-height: 36px;
  }

  @media (max-width: 768px) {
    width: 100%;

    h1 {
      font-size: 20px;
      font-weight: 700;
      line-height: 20px;
    }
    h2 {
      font-size: 14px;
      font-weight: 600;
      line-height: 22px;
    }
    text-align: center;
    background-color: #202123;
  }
`
const ContentDescriptionLink = styled(Link)`
  display: flex;
  align-items: center;
  gap: 100px;
  color: white;

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 15px;
    margin-top: 40px;

    p {
      font-family: "Roboto", sans-serif;
      font-weight: 900;
      font-size: 3em;
      line-height: 25px;
      background-color: #fff;
      border-radius: 40px;
      padding: 0 16px 7px 16px;
      color: coral;
      margin: 0;

      &:hover {
        color: white;
        background-color: coral;
      }
    }
  }
`

const CarouselContainer = styled.div`
  width: 100%;
  overflow: hidden;
  position: relative;
`

const SlideWrapper = styled.div`
  display: flex;
  transition: transform 0.5s ease-in-out;
`

const Slide = styled.img`
  width: 100%;
  height: auto;
`

const BusinessesProblemSolve = styled.div`
  text-align: center;
  padding-bottom: 70px;

  h1 {
    font-size: 48px;
    line-height: 50px;
    font-weight: 700;
    padding-bottom: 15px;
  }

  button {
    font-size: 18px;
    padding: 10px 30px;
  }

  @media (max-width: 768px) {
    h1 {
      font-size: 24px;
      line-height: 26px;
    }
  }
`

const CorporatesImages = [
  "https://parkplus.io/_next/image?url=https%3A%2F%2Fstrapi-file-uploads.s3.ap-south-1.amazonaws.com%2FSoftware_Technology_Park_Gurgaon_1_2_5a107f7fba.jpg&w=1920&q=75",
  "https://parkplus.io/_next/image?url=https%3A%2F%2Fstrapi-file-uploads.s3.ap-south-1.amazonaws.com%2FSoftware_Technology_Park_Gurgaon_1_2_5a107f7fba.jpg&w=1920&q=75",
  "https://parkplus.io/_next/image?url=https%3A%2F%2Fstrapi-file-uploads.s3.ap-south-1.amazonaws.com%2FSoftware_Technology_Park_Gurgaon_1_2_5a107f7fba.jpg&w=1920&q=75",
]
const SocietiesImages = [
  "https://parkplus.io/_next/image?url=https%3A%2F%2Fstrapi-file-uploads.s3.ap-south-1.amazonaws.com%2Fglo_car_parking_garage_floor_03_7bfe159128.webp&w=1920&q=75",
  "https://parkplus.io/_next/image?url=https%3A%2F%2Fstrapi-file-uploads.s3.ap-south-1.amazonaws.com%2Fglo_car_parking_garage_floor_03_7bfe159128.webp&w=1920&q=75",
  "https://parkplus.io/_next/image?url=https%3A%2F%2Fstrapi-file-uploads.s3.ap-south-1.amazonaws.com%2Fglo_car_parking_garage_floor_03_7bfe159128.webp&w=1920&q=75",
]
const ParkingOwnersImages = [
  "https://parkplus.io/_next/image?url=https%3A%2F%2Fstrapi-file-uploads.s3.ap-south-1.amazonaws.com%2Fback_parking_8d924a1fe6.jpg&w=1920&q=75",
  "https://parkplus.io/_next/image?url=https%3A%2F%2Fstrapi-file-uploads.s3.ap-south-1.amazonaws.com%2Fback_parking_8d924a1fe6.jpg&w=1920&q=75",
  "https://parkplus.io/_next/image?url=https%3A%2F%2Fstrapi-file-uploads.s3.ap-south-1.amazonaws.com%2Fback_parking_8d924a1fe6.jpg&w=1920&q=75",
]
const MallsHotelsImages = [
  "https://parkplus.io/_next/image?url=https%3A%2F%2Fstrapi-file-uploads.s3.ap-south-1.amazonaws.com%2F1597042333_Vxc_Np_X_parking_featured_the_tech_portal_aa61e1ab08.jpg&w=1920&q=75",
  "https://parkplus.io/_next/image?url=https%3A%2F%2Fstrapi-file-uploads.s3.ap-south-1.amazonaws.com%2F1597042333_Vxc_Np_X_parking_featured_the_tech_portal_aa61e1ab08.jpg&w=1920&q=75",
  "https://parkplus.io/_next/image?url=https%3A%2F%2Fstrapi-file-uploads.s3.ap-south-1.amazonaws.com%2F1597042333_Vxc_Np_X_parking_featured_the_tech_portal_aa61e1ab08.jpg&w=1920&q=75",
]

const ParkBusinesses = () => {
  const [activeTab, setActiveTab] = useState("Corporates")

  const handleTabClick = (tab) => {
    setActiveTab(tab)
  }

  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === CorporatesImages.length - 1 ? 0 : prevIndex + 1
      )
    }, 3000) 

    return () => clearInterval(intervalId)
  }, [])
  return (
    <Container>
      <ParkBusinessesTitle>
        <h1>
          ParkSpotter for <br /> Businesses
        </h1>
        <p>
          Our technology has transformed the tricky traffic movement in parking
          <br />
          lots for various business establishments
        </p>
      </ParkBusinessesTitle>
      <TabsContainer>
        <TabCoupleContainer>
          <Tab
            active={activeTab === "Corporates"}
            onClick={() => handleTabClick("Corporates")}
          >
            Corporates
          </Tab>
          <Tab
            active={activeTab === "Societies"}
            onClick={() => handleTabClick("Societies")}
          >
            Societies
          </Tab>
        </TabCoupleContainer>
        <TabCoupleContainer>
          <Tab
            active={activeTab === "Parking owners"}
            onClick={() => handleTabClick("Parking owners")}
          >
            Parking owners
          </Tab>
          <Tab
            active={activeTab === "Malls/Hotels"}
            onClick={() => handleTabClick("Malls/Hotels")}
          >
            Malls/Hotels
          </Tab>
        </TabCoupleContainer>
      </TabsContainer>
      <Content>
        {activeTab === "Corporates" && (
          <ContentBox>
            <ContentImage>
              {/* <img
                src="https://parkplus.io/_next/image?url=https%3A%2F%2Fstrapi-file-uploads.s3.ap-south-1.amazonaws.com%2FSoftware_Technology_Park_Gurgaon_1_2_5a107f7fba.jpg&w=1920&q=75"
                alt=""
              /> */}

              <CarouselContainer>
                <SlideWrapper
                  style={{ transform: `translateX(-${currentIndex * 100}%)` }}
                >
                  {CorporatesImages.map((image, index) => (
                    <Slide key={index} src={image} alt={`Slide ${index + 1}`} />
                  ))}
                </SlideWrapper>
              </CarouselContainer>
            </ContentImage>
            <ContentDescription>
              <h1>For corporates</h1>
              <ul style={{ marginLeft: "18px" }}>
                <li>Smart Parking Solution using RFID Technology</li>
                <li>ANPR (Automatic Number Plate Recognition) solution</li>
                <li>Advanced Parking Guidance System</li>
                <li>FASTag based parking solution</li>
                <li>Fleet Management solution</li>
                <li>EV charging stations</li>
              </ul>
              <ContentDescriptionLink to={"/"} style={{}}>
                <h2>
                  See how we solved the parking <br />
                  problem for RBS
                </h2>
                <p>&rarr;</p>
              </ContentDescriptionLink>
            </ContentDescription>
          </ContentBox>
        )}
        {activeTab === "Societies" && (
          <ContentBox>
            <ContentImage>
              <CarouselContainer>
                <SlideWrapper
                  style={{ transform: `translateX(-${currentIndex * 100}%)` }}
                >
                  {SocietiesImages.map((image, index) => (
                    <Slide key={index} src={image} alt={`Slide ${index + 1}`} />
                  ))}
                </SlideWrapper>
              </CarouselContainer>
            </ContentImage>
            <ContentDescription>
              <h1>For Societies</h1>
              <ul style={{ marginLeft: "18px" }}>
                <li>Automatic gate entry/exit process</li>
                <li>Anti Theft Feature</li>
                <li>Wrong Parking Detection</li>
                <li>RWA Dashboard</li>
                <li>EV charging stations</li>
              </ul>
              <ContentDescriptionLink to={"/"} style={{}}>
                <h2>
                  See how we solved the parking <br />
                  problem for Emaar Palm Drive
                </h2>
                <p>&rarr;</p>
              </ContentDescriptionLink>
            </ContentDescription>
          </ContentBox>
        )}
        {activeTab === "Parking owners" && (
          <ContentBox>
            <ContentImage>
              <CarouselContainer>
                <SlideWrapper
                  style={{ transform: `translateX(-${currentIndex * 100}%)` }}
                >
                  {MallsHotelsImages.map((image, index) => (
                    <Slide key={index} src={image} alt={`Slide ${index + 1}`} />
                  ))}
                </SlideWrapper>
              </CarouselContainer>
            </ContentImage>
            <ContentDescription>
              <h1>For Parking Owners</h1>
              <ul style={{ marginLeft: "18px" }}>
                <li>Ticketing solution via POS device</li>
                <li>Owner Dashboard for real time analytics</li>
                <li>Smart alerts and auditioning tools</li>
                <li>Cashless parking facility</li>
                <li>Online bookings</li>
              </ul>
              <ContentDescriptionLink to={"/"} style={{}}>
                <h2>
                  See how we solved the parking <br />
                  problem for Celestia Spaces
                </h2>
                <p>&rarr;</p>
              </ContentDescriptionLink>
            </ContentDescription>
          </ContentBox>
        )}
        {activeTab === "Malls/Hotels" && (
          <ContentBox>
            <ContentImage>
              <CarouselContainer>
                <SlideWrapper
                  style={{ transform: `translateX(-${currentIndex * 100}%)` }}
                >
                  {ParkingOwnersImages.map((image, index) => (
                    <Slide key={index} src={image} alt={`Slide ${index + 1}`} />
                  ))}
                </SlideWrapper>
              </CarouselContainer>
            </ContentImage>
            <ContentDescription>
              <h1>For Malls/Hotels</h1>
              <ul style={{ marginLeft: "18px" }}>
                <li>FASTag enabled automatic parking system</li>
                <li>Automatic number plate recognition system</li>
                <li>Valet Parking software (ParkSpotter Valet)</li>
                <li>Automatic parking guidance system</li>
                <li>Online bookings for parking</li>
                <li>Tie ups with EV charging network providers</li>
              </ul>
              <ContentDescriptionLink to={"/"} style={{}}>
                <h2>
                  See how we solved the parking
                  <br />
                  problem for Phoenix Marketcity
                </h2>
                <p>&rarr;</p>
              </ContentDescriptionLink>
            </ContentDescription>
          </ContentBox>
        )}
      </Content>

      <BusinessesProblemSolve>
        <h1>
          Let us solve your <br /> problems next
        </h1>
        <button>Get in touch</button>
      </BusinessesProblemSolve>
    </Container>
  )
}

export default ParkBusinesses
