import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import emailjs from '@emailjs/browser';
import { Snackbar } from '@mui/material';
import {
  ContactButton,
  ContactForm,
  ContactInput,
  ContactInputMessage,
  ContactTitle,
  Container,
  Desc,
  Title,
  Wrapper,
  FormContainer,
  InputGroup,
  InputLabel,
} from './ContactStyles';

const Contact = () => {
  // hooks
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const form = useRef();

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);

    emailjs.sendForm('service_7m4717z', 'template_3unam1p', form.current, 'Jw5dTq5t3-l10LMrF')
      .then((result) => {
        setOpen(true);
        form.current.reset();
        setIsLoading(false);
      }, (error) => {
        console.log(error.text);
        setIsLoading(false);
      });
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.8,
        when: "beforeChildren",
        staggerChildren: 0.2
      }
    }
  };

  const childVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  };

  const formVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.7,
        ease: "easeOut",
        when: "beforeChildren",
        staggerChildren: 0.1
      }
    }
  };

  const inputVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.5, ease: "easeOut" }
    }
  };

  return (
    <Container
      id='contact'
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.1 }}
      variants={containerVariants}
    >
      <Wrapper>
        <motion.div variants={childVariants}>
          <Title>Get In Touch</Title>
          <Desc>
            Have a project in mind or want to collaborate?
            I'd love to hear from you! Drop me a message and let's create something amazing together.
          </Desc>
        </motion.div>

        <FormContainer variants={childVariants}>
          <ContactForm
            ref={form}
            onSubmit={handleSubmit}
            variants={formVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
          >
            <ContactTitle variants={inputVariants}>
              Let's Start a Conversation
            </ContactTitle>

            <InputGroup variants={inputVariants}>
              <InputLabel>Full Name</InputLabel>
              <ContactInput
                type="text"
                placeholder="Enter your full name"
                name="from_name"
                required
                whileFocus={{ scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300, damping: 15 }}
              />
            </InputGroup>

            <InputGroup variants={inputVariants}>
              <InputLabel>Email Address</InputLabel>
              <ContactInput
                type="email"
                placeholder="your.email@example.com"
                name="from_email"
                required
                whileFocus={{ scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300, damping: 15 }}
              />
            </InputGroup>

            <InputGroup variants={inputVariants}>
              <InputLabel>Subject</InputLabel>
              <ContactInput
                type="text"
                placeholder="What's this about?"
                name="subject"
                required
                whileFocus={{ scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300, damping: 15 }}
              />
            </InputGroup>

            <InputGroup variants={inputVariants}>
              <InputLabel>Message</InputLabel>
              <ContactInputMessage
                placeholder="Tell me more about your project, ideas, or just say hello! I'm excited to hear from you..."
                name="message"
                required
                whileFocus={{ scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300, damping: 15 }}
              />
            </InputGroup>

            <motion.div
              variants={inputVariants}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <ContactButton
                type="submit"
                disabled={isLoading}
                whileHover={{
                  boxShadow: "0 10px 40px rgba(182, 36, 255, 0.4)",
                  y: -2
                }}
                transition={{ duration: 0.3 }}
              >
                {isLoading ? (
                  <motion.span
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                  >
                    ⟳
                  </motion.span>
                ) : (
                  <>
                    <span>Send Message</span>
                    <span>🚀</span>
                  </>
                )}
              </ContactButton>
            </motion.div>
          </ContactForm>
        </FormContainer>

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