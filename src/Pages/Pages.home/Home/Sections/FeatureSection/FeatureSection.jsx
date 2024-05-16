import styled from "styled-components"

const FeatureSection = () => {
  return (
    <FeatureSectionContainer>
      <div className="w-10/12 m-auto py-16">
        <Title>More reasons than one reason to love ParkSpotter</Title>
        <FeatureGrid>
          <FeatureItem>
            <img
              className="h-24 w-24 my-12"
              src="./Group_33680_d728cbaf93.webp"
              alt="..."
            />
            <div>
              <p className="text-center font-medium">
                One fastag for all your needs - Parking, Tolls, Malls, Fuel
                payment
              </p>
            </div>
          </FeatureItem>
          <FeatureItem>
            <img
              className="h-24 w-24 my-12"
              src="./Group_3_6c7e04abbc.webp"
              alt="..."
            />
            <div>
              <p className="text-center font-medium">
                Save time, fuel and effort with smart parking
              </p>
            </div>
          </FeatureItem>
          <FeatureItem>
            <img
              className="h-24 w-24 my-12"
              src="./Group_7_59de4a0585.webp"
              alt="..."
            />
            <div>
              <p className="text-center font-medium">
                Reminders to never miss out on your insurance and PUCC renewal
              </p>
            </div>
          </FeatureItem>
          <FeatureItem>
            <img
              className="h-24 w-24 my-12"
              src="./Group_9_3dfabe529a.webp"
              alt="..."
            />
            <div>
              <p className="text-center font-medium">
                Easy to find information regarding RTO services, traffic rules
                etc
              </p>
            </div>
          </FeatureItem>
        </FeatureGrid>
      </div>
    </FeatureSectionContainer>
  )
}

const FeatureSectionContainer = styled.div`
  @media (max-width: 768px) {
    height: 750px;
  }
`

const Title = styled.h1`
  font-weight: bold;
  text-align: center;

  @media (max-width: 600px) {
    font-size: 1.6rem;
  }

  @media (min-width: 601px) {
    font-size: 2.4rem;
  }
`

const FeatureGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1rem;
  height: 250px;
  margin-top: 60px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr 1fr;
    gap: 2rem;
  }
`
const FeatureItem = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  img {
    height: 4rem;
    width: 4rem;
    margin-bottom: auto;
    margin-top: 30px;
  }

  > div {
    display: flex;
    align-items: baseline;
    height: 100px;
    @media (max-width: 768px) {
      width: 100%;
      font-size: 12px;
      color: gray;
      margin-top: 20px;
      height: 60px;
    }
    p {
      text-align: center;
      font-weight: 500;
    }
  }
`

export default FeatureSection
