import React from "react";
import PropTypes from "prop-types";

const Cross = ({ className, color }) => (
  <svg className={className} viewBox="0 0 39 39" fill="none">
    <rect
      x="10.6074"
      y="8.48535"
      width="27"
      height="3"
      transform="rotate(45 10.6074 8.48535)"
      fill={color}
    />
    <rect
      x="29.6992"
      y="10.6064"
      width="27"
      height="3"
      transform="rotate(135 29.6992 10.6064)"
      fill={color}
    />
  </svg>
);

Cross.defaultProps = {
  className: ``,
  color: `black`
};

Cross.propTypes = {
  className: PropTypes.string,
  color: PropTypes.string
};

export default Cross;
