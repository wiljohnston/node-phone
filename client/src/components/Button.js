import React from "react";
import { motion } from "framer-motion";
import PropTypes from "prop-types";

const Button = ({
  className,
  containerClassName,
  color,
  onClick,
  text,
  transparent,
  fontClass,
  children,
}) => (
  <motion.div
    className={`${containerClassName} w-content`}
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
      {children && children}
    </button>
  </motion.div>
);

Button.defaultProps = {
  color: ``,
  className: ``,
  onClick: () => {},
  text: ``,
  transparent: false,
  fontClass: `button`,
  children: null,
};

Button.propTypes = {
  color: PropTypes.string,
  className: PropTypes.string,
  onClick: PropTypes.func,
  text: PropTypes.string,
  fontClass: PropTypes.string,
  transparent: PropTypes.bool,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
};

export default Button;
