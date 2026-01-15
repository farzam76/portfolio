import { Section,Container,Links,List,ListItem,Icons,Button } from "./styles";

function NavbarComponent () {
  return (
    <Section>
      <Container>
        <Links>
          {/* <Logo src="./img/logo.png" /> */}
          <List>
            <ListItem>Home</ListItem>
            <ListItem>Studio</ListItem>
            <ListItem>Works</ListItem>
            <ListItem>Contact</ListItem>
          </List>
        </Links>
        <Icons>
          {/* Changed the image due to copyright problems */}
          {/* <Icon src="./img/search.png" /> */}
          <Button>Hire Now</Button>
        </Icons>
      </Container>
    </Section>
  );
};

export const Navbar = NavbarComponent;