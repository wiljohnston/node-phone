import React from "react";
import PropTypes from "prop-types";

const Arrow = ({ className, color, direction }) => {
  if (direction === `<`) {
    className = `${className} invert-x`;
  }

  return (
    <svg className={className} viewBox="0 0 19 18" fill="none">
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M14.5858 10.0001H0V8.00008H14.5858L8.29289 1.70718L9.70711 0.292969L18.4142 9.00008L9.70711 17.7072L8.29289 16.293L14.5858 10.0001Z"
        fill={color}
      />
    </svg>
  );
};

Arrow.defaultProps = {
  className: ``,
  color: `black`,
  direction: `>`
};

Arrow.propTypes = {
  className: PropTypes.string,
  color: PropTypes.string,
  direction: PropTypes.string
};

export default Arrow;
