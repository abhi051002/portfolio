import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import emailjs from '@emailjs/browser';
import { Snackbar } from '@mui/material';
import { ContactButton, ContactForm, ContactInput, ContactInputMessage, ContactTitle, Container, Desc, Title, Wrapper } from './ContactStyles';


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
    <Container id='contact'>
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