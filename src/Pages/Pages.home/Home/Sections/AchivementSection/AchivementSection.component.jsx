import styled from "styled-components"

const SectionContainer = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: 60px;
`

const Title = styled.h2`
  color: #00163e;
  font-size: 2.2em;
  font-weight: bold;
  align-self: flex-start;
  width: 60%;
  @media (max-width: 768px) {
    font-size: 1.4em;
    text-align: center;
    width: 100%;
  }
`

const TitleUnderLine = styled.div`
  background-color: coral;
  width: 10%;
  height: 8px;
  margin-right: auto;
  margin-bottom: 52px;
  margin-top: 10px;
  border-radius: 30px;
  @media (max-width: 768px) {
    margin-right: auto;
    margin-left: auto;
    width: 40%;
  }
`

const ContentWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 4em;
  @media (max-width: 768px) {
    flex-direction: column;
    gap: 2em;
  }
`

const CardContainer = styled.div`
  width: 100%;
  height: 350px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  @media (max-width: 768px) {
    justify-content: center;
    gap: 30px;
  }
`

const CardImage = styled.img`
  max-width: 100%;
  max-height: 100%;
  object-fit: contain;
`

const CardText = styled.div`
  color: #00163e;
  margin-top: 10px;
  width: 100%;
  font-size: 1.3em;
  font-weight: bold;
`

const CardTitle = styled.h2`
  text-align: left;
  @media (max-width: 768px) {
    text-align: center;
    font-size: 1.1rem;
  }
`

const Button = styled.button`
  padding: 15px 30px;
  border-radius: 40px;
  border: 0;
  background-color: #202123;

  &:hover {
    background-color: coral;
  }
`

const ButtonText = styled.h2`
  color: #fff;

  font-size: 1.3em;

  @media (max-width: 768px) {
    text-align: center;
    font-size: 1.1rem;
  }
`

function AchivementSection() {
  return (
    <div>
      <SectionContainer>
        <Title>
          Check out our impressive solutions to some crucial parking problems
        </Title>
        <TitleUnderLine />
        <ContentWrapper>
          <CardContainer>
            <CardImage src="https://cdn.sanity.io/images/j29qhhdl/production/ca4c21844430e65835e9d653dc2c3f0ddcbac13b-2000x1186.png" />
            <CardText>
              <CardTitle>
                Solving parking capacity problems in Phoenix Mall
              </CardTitle>
            </CardText>
          </CardContainer>
          <CardContainer>
            <CardImage src="https://zkteco.technology/wp-content/uploads/2021/12/zkteco-parking-11_en.jpg" />
            <CardText>
              <CardTitle>
                Providing real time parking visibility to AXALTA employees
              </CardTitle>
            </CardText>
          </CardContainer>
          <CardContainer>
            <CardImage src="https://cdn.sanity.io/images/j29qhhdl/production/a4f9123e0bd4d3e796070bb325ebe58b7a437e30-1288x1010.png" />
            <CardText>
              <CardTitle>
                Automated solutions for residents of Emaar Palm Drive
              </CardTitle>
            </CardText>
          </CardContainer>
        </ContentWrapper>
        <div style={{ margin: "50px auto 50px auto" }}>
          <Button>
            <ButtonText>See All Case Studies</ButtonText>
          </Button>
        </div>
      </SectionContainer>
    </div>
  )
}

export default AchivementSection
