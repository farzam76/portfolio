import React, { useState } from "react";
import { Section, Container, Left, List, ListItem, Right } from "./styles";
const data = [
  "Web Design",
  "Development",
  "Illustration",
  "Product Design",
  "Social Media",
];

function WorksComponent() {
  const [work, setWork] = useState("Web Design");
  return (
    <Section>
      <Container>
        <Left>
          <List>
            {data.map((item) => (
              <ListItem key={item} text={item} onClick={() => setWork(item)}>
                {item}
              </ListItem>
            ))}
          </List>
        </Left>
        <Right>
          {/* {work === "Web Design" ? (
            <WebDesign />
          ) : work === "Development" ? (
            <Development />
          ) : (
            <ProductDesign />
          )} */}
        </Right>
      </Container>
    </Section>
  );
};

export const Works = WorksComponent;
