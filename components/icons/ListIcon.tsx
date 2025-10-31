import React from 'react';
import Svg, { Path } from 'react-native-svg';

interface IconProps {
  width?: number;
  height?: number;
  color?: string;
}

const ListIcon: React.FC<IconProps> = ({ width = 24, height = 24, color = '#3B82F6' }) => (
  <Svg
    width={width}
    height={height}
    viewBox="0 0 24 24"
    fill={color}
  >
    <Path
      d="M3 6.75A.75.75 0 013.75 6h16.5a.75.75 0 010 1.5H3.75A.75.75 0 013 6.75zM3 12a.75.75 0 01.75-.75h16.5a.75.75 0 010 1.5H3.75A.75.75 0 013 12z"
      fill={color}
      opacity={0.6}
    />
    <Path
      d="M3 17.25A.75.75 0 013.75 16.5h11.5a.75.75 0 010 1.5H3.75a.75.75 0 01-.75-.75z"
      fill={color}
    />
  </Svg>
);

export default ListIcon;
