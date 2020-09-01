import React from "react";
import PropTypes from "prop-types";

const LinkedInIcon = ({ className, color }) => (
  <svg className={className} viewBox="0 0 20 20" fill="none">
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M2 0H18C19.1046 0 20 0.89543 20 2V18C20 19.1046 19.1046 20 18 20H2C0.89543 20 0 19.1046 0 18V2C0 0.89543 0.89543 0 2 0ZM2 2V18H18V2H2ZM11 7C10.4823 7 9.93525 7.15826 9.45215 7.45215L9 7H8V14H10V10C10 9.42425 10.594 9 11 9H12C12.406 9 13 9.42425 13 10V14H15V10C15 8.14718 13.394 7 12 7H11ZM6 6C6.55228 6 7 5.55228 7 5C7 4.44772 6.55228 4 6 4C5.44772 4 5 4.44772 5 5C5 5.55228 5.44772 6 6 6ZM5 7V14H7V7H5Z"
      fill={color}
    />
  </svg>
);

LinkedInIcon.defaultProps = {
  className: ``,
  color: `white`
};

LinkedInIcon.propTypes = {
  className: PropTypes.string,
  color: PropTypes.string
};

export default LinkedInIcon;
