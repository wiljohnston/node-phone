import React from "react";
import { motion } from "framer-motion";
import PropTypes from "prop-types";

const Button = ({ className, color, onClick, text, transparent, fontClass }) => (
  <motion.div
    className={`${className}`}
    whileTap={{ scale: 0.975 }}
  >
    <button
      type="button"
      className={`button button--${color} ${
        transparent ? `button--transparent` : ``
      } ${className} relative py-4 ${fontClass}`}
      onClick={onClick}
    >
      {text}
    </button>
  </motion.div>
);

Button.defaultProps = {
  color: ``,
  className: ``,
  onClick: () => {},
  text: `Button`,
  transparent: false,
  fontClass: `button`
};

Button.propTypes = {
  color: PropTypes.string,
  className: PropTypes.string,
  onClick: PropTypes.func,
  text: PropTypes.string,
  fontClass: PropTypes.string,
  transparent: PropTypes.bool
};

export default Button;
