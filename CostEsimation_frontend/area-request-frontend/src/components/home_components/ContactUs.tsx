import React from 'react';

const ContactUs: React.FC = () => {
  return (
    <section id="contact" style={styles.contactSection}>
      <h3>Contact Us</h3>
      <p>Email: support@constructioncost.com</p>
      <p>Phone: +123 456 7890</p>
    </section>
  );
};

const styles: { contactSection: React.CSSProperties } = {
  contactSection: {
    textAlign: 'center', // Ensure 'center' is interpreted as a valid TextAlign value
    padding: '2rem 0',
    backgroundColor: '#f0f0f0'
  }
};

export default ContactUs;
