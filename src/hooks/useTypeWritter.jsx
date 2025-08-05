"use client";

import { useState, useEffect, useCallback } from "react";

export const useTypewriter = (
  phrases,
  speed = 100,
  delayBetweenPhrases = 1500
) => {
  const [currentPhraseIndex, setCurrentPhraseIndex] = useState(0);
  const [currentText, setCurrentText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [typingSpeed, setTypingSpeed] = useState(speed);

  const type = useCallback(() => {
    const fullText = phrases[currentPhraseIndex];
    const updatedText = isDeleting
      ? fullText.substring(0, currentText.length - 1)
      : fullText.substring(0, currentText.length + 1);

    setCurrentText(updatedText);

    if (!isDeleting && updatedText === fullText) {
      // Done typing, start deleting after a delay
      setTimeout(() => setIsDeleting(true), delayBetweenPhrases);
      setTypingSpeed(speed / 2); // Faster deleting
    } else if (isDeleting && updatedText === "") {
      // Done deleting, move to next phrase
      setIsDeleting(false);
      setCurrentPhraseIndex((prev) => (prev + 1) % phrases.length);
      setTypingSpeed(speed); // Normal typing speed
    } else {
      // Continue typing or deleting
      setTypingSpeed(speed);
    }
  }, [
    currentPhraseIndex,
    currentText,
    isDeleting,
    phrases,
    speed,
    delayBetweenPhrases,
  ]);

  useEffect(() => {
    const timer = setTimeout(type, typingSpeed);
    return () => clearTimeout(timer);
  }, [currentText, isDeleting, typingSpeed, type]);

  return currentText;
};
