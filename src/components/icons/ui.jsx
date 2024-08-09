const ArrowVerticalIcon = ({ type }) => (
  <svg
    width="14"
    height="8"
    viewBox="0 0 14 8"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d={
        type === "bottom"
          ? "M13 1L7 6.99983L1 1"
          : "M13 6.99976L7 0.999921L1 6.99976"
      }
      stroke="#282828"
      strokeWidth="1.34998"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);




export {ArrowVerticalIcon}
