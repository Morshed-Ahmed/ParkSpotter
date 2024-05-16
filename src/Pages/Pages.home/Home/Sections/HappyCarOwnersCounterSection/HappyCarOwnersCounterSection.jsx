import styled from "styled-components"

const HappyCarOwnersCounterSection = () => {
  const Container = styled.div`
    background-color: #f6f7fb;
    padding: 6rem 0;
  `

  const ContentWrapper = styled.div`
    display: flex;
    width: 90%;
    margin: auto;

    @media (max-width: 768px) {
      flex-direction: column;
    }
  `

  const LeftColumn = styled.div`
    width: 50%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    @media (max-width: 768px) {
      width: 100%;
      margin-bottom: 30px;
    }
  `

  const Title = styled.h1`
    font-size: 1.875rem;
    font-weight: bold;
    color: #000;

    @media (min-width: 768px) {
      font-size: 1.85rem;
    }
    @media (max-width: 768px) {
      text-align: center;
    }
  `

  const RightColumn = styled.div`
    width: 50%;
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 1rem;
    @media (max-width: 768px) {
      width: 100%;
      text-align: center;
      gap: 2rem;
    }
  `

  const StatWrapper = styled.div`
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
  `

  const StatTitle = styled.h3`
    font-size: 1.6rem;
    font-weight: 600;
    color: #5430bb;
  `

  const StatValue = styled.p`
    font-size: 1.2rem;
    color: #000;

    @media (max-width: 768px) {
      font-size: 1rem;
    }
  `

  return (
    <Container>
      <ContentWrapper>
        <LeftColumn>
          <Title>
            2 years. Multitude of solutions. <br />
            Countless Happy car owners
          </Title>
        </LeftColumn>
        <RightColumn>
          <StatWrapper>
            <StatTitle>6 Million+</StatTitle>
            <StatValue>Cars listed on ParkSpotter</StatValue>
          </StatWrapper>
          <StatWrapper>
            <StatTitle>12 Million+</StatTitle>
            <StatValue>FASTag Transactions</StatValue>
          </StatWrapper>
          <StatWrapper>
            <StatTitle>8 Million+</StatTitle>
            <StatValue>Trusted users</StatValue>
          </StatWrapper>
          <StatWrapper>
            <StatTitle>200,000 +</StatTitle>
            <StatValue>Parking Locations</StatValue>
          </StatWrapper>
        </RightColumn>
      </ContentWrapper>
    </Container>
  )
}

export default HappyCarOwnersCounterSection
