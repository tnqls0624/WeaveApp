import React from 'react';
import Svg, { Path } from 'react-native-svg';

interface IconProps {
  width?: number;
  height?: number;
  color?: string;
}

const CalendarIcon: React.FC<IconProps> = ({ width = 24, height = 24, color = '#3B82F6' }) => (
  <Svg
    width={width}
    height={height}
    viewBox="0 0 24 24"
    fill={color}
  >
    <Path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M6.75 2.25A.75.75 0 017.5 3v1.5h9V3A.75.75 0 0118 3v1.5h.75a3 3 0 013 3v11.25a3 3 0 01-3 3H5.25a3 3 0 01-3-3V7.5a3 3 0 013-3H6V3a.75.75 0 01.75-.75zM5.25 6.75c-.83 0-1.5.67-1.5 1.5v11.25c0 .83.67 1.5 1.5 1.5h13.5c.83 0 1.5-.67 1.5-1.5V8.25c0-.83-.67-1.5-1.5-1.5H5.25z"
      fill={color}
      opacity={0.6}
    />
    <Path
      d="M12 11.25a.75.75 0 100 1.5.75.75 0 000-1.5zM15.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM8.25 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM12 15a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM15.75 15.75a.75.75 0 100-1.5.75.75 0 000 1.5zM8.25 15.75a.75.75 0 100-1.5.75.75 0 000 1.5zM12 18.75a.75.75 0 100-1.5.75.75 0 000 1.5z"
      fill={color}
    />
  </Svg>
);

export default CalendarIcon;
