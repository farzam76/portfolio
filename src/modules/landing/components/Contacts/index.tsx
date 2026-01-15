import { useRef, useState } from "react";
import emailjs from "@emailjs/browser";
import {Map} from "../index";
import { Section,Container,Left,Title,Input,Form,TextArea,Button,Right } from "./styles";

function ContactComponent () {
  const ref = useRef<HTMLFormElement>(null);
  const [success, setSuccess] = useState<boolean | null>(null);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!ref.current) return;

    emailjs
      .sendForm(
        "contact_service",
        "contact_form",
        ref.current,
        "ryg0IZdRQMDfrSNQp"
      )
      .then(
        (result) => {
          console.log(result.text);
          setSuccess(true);
        },
        (error) => {
          console.log(error.text);
          setSuccess(false);
        }
      );
  };
  return (
    <Section>
      <Container>
        <Left>
          <Form ref={ref} onSubmit={handleSubmit}>
            <Title>Contact Us</Title>
            <Input placeholder="Name" name="name" />
            <Input placeholder="Email" name="email" />
            <TextArea
              placeholder="Write your message"
              name="message"
              rows={10}
            />
            <Button type="submit">Send</Button>
            {success &&
              "Your message has been sent. We'll get back to you soon :)"}
          </Form>
        </Left>
        <Right>
          <Map />
        </Right>
      </Container>
    </Section>
  );
};

export const  Contact = ContactComponent;