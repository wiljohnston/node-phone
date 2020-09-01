import React from "react";
import PropTypes from "prop-types";

const FacebookIcon = ({ className, color }) => (
  <svg className={className} viewBox="0 0 20 20" fill="none">
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M2 0H18C19.1046 0 20 0.89543 20 2V18C20 19.1046 19.1046 20 18 20H2C0.89543 20 0 19.1046 0 18V2C0 0.89543 0.89543 0 2 0ZM2 2V18H18V2H2ZM9.13306 10.0044H11V16H13V10.0044H14.9824V8.00439H13V7C13 6.44772 13.4477 6 14 6H15V4H14C12.3431 4 11 5.34315 11 7V8.00439H9.13306V10.0044Z"
      fill={color}
    />
  </svg>
);

FacebookIcon.defaultProps = {
  className: ``,
  color: `white`
};

FacebookIcon.propTypes = {
  className: PropTypes.string,
  color: PropTypes.string
};

export default FacebookIcon;
