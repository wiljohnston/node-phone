import React from "react";
import { motion } from "framer-motion";
import PropTypes from "prop-types";

const Button = ({ className, color, onClick, text, transparent }) => (
  <motion.div
    className={`${className}`}
    whileHover={{
      scale: 1.025
    }}
    whileTap={{ scale: 0.975 }}
  >
    <button
      type="button"
      className={`button button--${color} ${
        transparent ? `button--transparent` : ``
      } ${className} relative py-4 caption uppercase`}
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
  transparent: false
};

Button.propTypes = {
  color: PropTypes.string,
  className: PropTypes.string,
  onClick: PropTypes.func,
  text: PropTypes.string,
  transparent: PropTypes.bool
};

export default Button;
