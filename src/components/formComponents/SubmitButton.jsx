import styles from './SubmitButtonStyles.module.css';

import React from 'react';
import { Button } from 'react-bootstrap';

export default function SubmitButton({ text }) {
  return (
    <Button
      type="submit"
      size="lg"
      className={`${styles.submitButton} border-0 rounded-pill`}
    >
      {text}
    </Button>
  );
}
