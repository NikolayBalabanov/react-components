import React from 'react';
import ArrowIcon from './Icons/ArrowIcon';

export enum EIcons {
  arrow = 'Arrow',
}

interface IIconProps {
  name: EIcons;
  styles?: string;
}

export default function Icon(props: IIconProps) {
  const { name, styles } = props;
  switch (name) {
    case 'Arrow':
      return <ArrowIcon styles={styles} />;
    default:
      return <ArrowIcon styles={styles} />;
  }
}
