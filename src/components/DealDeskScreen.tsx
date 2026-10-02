import React from 'react';
import { DealRoomScreen, DealRoomScreenProps } from './DealRoomScreen';

export const DealDeskScreen: React.FC<DealRoomScreenProps> = (props) => {
  return <DealRoomScreen {...props} />;
};

export default DealDeskScreen;
