import {observer} from 'mobx-react-lite';
import React from 'react';
import {Swipeable} from 'react-native-gesture-handler';
import {ProjectTimerDataType} from '../../../types/alarm';
import ProjectTimerItem from './ProjectTimerItem';

type Props = {
  item: ProjectTimerDataType;
  index: number;
  onGetOneProject?: () => void;
  onPlayHandle?: () => void;
};

const RenderProjectTimer: React.FC<Props> = ({
  item,
  index,
  onGetOneProject,
  onPlayHandle,
}) => {
  return (
    <ProjectTimerItem
      onEnter={onGetOneProject}
      key={item.workTime}
      play={item.play}
      day={item.date}
      time={item.time}
      name={item.title}
      description={item.description}
      workTime={item.workTime}
      onPlay={onPlayHandle}
    />
  );
};

export default observer(RenderProjectTimer);
