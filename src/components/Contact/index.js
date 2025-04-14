import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import emailjs from '@emailjs/browser';
import { Snackbar } from '@mui/material';
import styled from 'styled-components';

// Restyled components to match the UI in the screenshot
const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  position: relative;
  z-index: 1;
  align-items: center;
  padding: 60px 0 80px 0px;
  background: linear-gradient(
    343.07deg, 
    rgba(132, 59, 206, 0.06) 5.71%, 
    rgba(132, 59, 206, 0) 64.83%
  );
  @media (max-width: 960px) {
    padding: 40px 0;
  }
`;

const Wrapper = styled.div`
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-direction: column;
  width: 100%;
  max-width: 1100px;
  padding: 0px 0px 40px 0px;
  gap: 12px;
`;

const Title = styled(motion.h1)`
  font-size: 42px;
  text-align: center;
  font-weight: 600;
  margin-top: 20px;
  color: #fff;
  @media (max-width: 768px) {
    font-size: 32px;
  }
`;

const Desc = styled(motion.p)`
  font-size: 18px;
  text-align: center;
  max-width: 600px;
  color: rgba(255, 255, 255, 0.8);
  margin-top: 10px;
  margin-bottom: 20px;
  @media (max-width: 768px) {
    font-size: 16px;
  }
`;

const ContactForm = styled(motion.form)`
  width: 95%;
  max-width: 500px;
  display: flex;
  flex-direction: column;
  background-color: #171721;
  padding: 32px;
  border-radius: 16px;
  box-shadow: 0px 0px 30px rgba(0, 0, 0, 0.2);
  gap: 20px;
`;

const ContactTitle = styled(motion.h2)`
  font-size: 24px;
  margin-bottom: 10px;
  font-weight: 600;
  color: #fff;
  display: flex;
  align-items: center;
  gap: 8px;
`;

const ContactInput = styled(motion.input)`
  width: 100%;
  background-color: transparent;
  border: 1px solid rgba(255, 255, 255, 0.2);
  outline: none;
  font-size: 16px;
  color: #fff;
  border-radius: 8px;
  padding: 12px 16px;
  transition: border 0.3s ease;
  &:focus {
    border: 1px solid #b624ff;
  }
`;

const ContactInputMessage = styled(motion.textarea)`
  width: 100%;
  min-height: 120px;
  background-color: transparent;
  border: 1px solid rgba(255, 255, 255, 0.2);
  outline: none;
  font-size: 16px;
  color: #fff;
  border-radius: 8px;
  padding: 12px 16px;
  transition: border 0.3s ease;
  &:focus {
    border: 1px solid #b624ff;
  }
`;

const ContactButton = styled(motion.button)`
  width: 100%;
  text-align: center;
  background: #b624ff;
  padding: 15px;
  border-radius: 8px;
  border: none;
  color: #fff;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  &:hover {
    background: #c42fff;
  }
`;

const Contact = () => {
  // hooks
  const [open, setOpen] = useState(false);
  const form = useRef();

  const handleSubmit = (e) => {
    e.preventDefault();
    emailjs.sendForm('service_7m4717z', 'template_3unam1p', form.current, 'Jw5dTq5t3-l10LMrF')
      .then((result) => {
        setOpen(true);
        form.current.reset();
      }, (error) => {
        console.log(error.text);
      });
  }

  return (
    <Container>
      <Wrapper>
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Title>Contact Me</Title>
          <Desc>Feel free to reach out to me for any questions or opportunities!</Desc>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          style={{ width: '100%', display: 'flex', justifyContent: 'center' }}
        >
          <ContactForm ref={form} onSubmit={handleSubmit}>
            <ContactTitle>Email Me 🚀</ContactTitle>

            <motion.div
              whileHover={{ scale: 1.01 }}
              transition={{ type: "spring", stiffness: 300, damping: 15 }}
            >
              <ContactInput
                type="text"
                placeholder="Your Name"
                name="from_name"
                required
              />
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.01 }}
              transition={{ type: "spring", stiffness: 300, damping: 15 }}
            >
              <ContactInput
                type="email"
                placeholder="Your Email"
                name="from_email"
                required
              />
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.01 }}
              transition={{ type: "spring", stiffness: 300, damping: 15 }}
            >
              <ContactInput
                type="text"
                placeholder="Subject"
                name="subject"
                required
              />
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.01 }}
              transition={{ type: "spring", stiffness: 300, damping: 15 }}
            >
              <ContactInputMessage
                placeholder="Message"
                name="message"
                required
              />
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
            >
              <ContactButton type="submit">
                Send
              </ContactButton>
            </motion.div>
          </ContactForm>
        </motion.div>

        <Snackbar
          open={open}
          autoHideDuration={6000}
          onClose={() => setOpen(false)}
          message="Email sent successfully!"
          severity="success"
        />
      </Wrapper>
    </Container>
  );
}

export default Contact;