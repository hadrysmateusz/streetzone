import styled from "styled-components/macro"

const Container = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 990;
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${(p) => p.color || "transparent"};
`

const Overlay = ({ color, onClick, children, ...rest }) => (
  <Container
    color={color}
    onClick={(e) => {
      if (e.currentTarget === e.target) onClick(e)
    }}
    {...rest}
  >
    {children}
  </Container>
)

export default Overlay
