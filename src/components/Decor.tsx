import { FC } from "react";

type TProps = {
  fill: string;
  position: string;
}

const Decor: FC<TProps> = ({ fill, position }) => {
  return (
    <svg className="svg-shine" viewBox="0 0 200 150">
      <path fill={fill}
        d="M28.4,-11.95C30.85,-1.6,22.85,9.4,13.25,15.85C3.6,22.3,-7.6,24.1,-17.75,18.25C-27.9,12.35,-34.95,-1.3,-33.8,-12.6C-30.65,-23.85,-15.3,-32.8,-1.2,-32.4C12.95,-32.05,25.9,-22.35,28.4,-11.95Z"
        transform={`translate( ${position})`}></path>
    </svg>
  );
}

export default Decor;