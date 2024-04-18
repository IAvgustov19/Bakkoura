import {useNavigation} from '@react-navigation/native';
import {observer} from 'mobx-react-lite';
import React, {useEffect, useState} from 'react';
import {Keyboard} from 'react-native';
import {Images} from '../../assets';
import ArrowLeftBack from '../../components/ArrowLeftBack/ArrowLeftBack';
import Cancel from '../../components/Cancel/Cancel';
import HeaderContent from '../../components/HeaderContent/HeaderContent';
import Input from '../../components/Input/Input';
import LinearContainer from '../../components/LinearContainer/LinearContainer';
import RN from '../../components/RN';
import SelectInput from '../../components/SelectInput/SelectInput';
import SoundsContent from '../../components/SoundsContent/SoundsContent';
import TextView from '../../components/Text/Text';
import useRootStore from '../../hooks/useRootStore';
import {HITSLOP} from '../../utils/styles';

const ProjectTimerCalculator = () => {
  const navigation = useNavigation();
  const [projectsVisible, setProjectsVisible] = useState(false);
  const {
    onSoundItemPress,
    projectTimerList,
    selectedProject,
    recentlyCalculated,
    deleteRecentlyCalculated,
  } = useRootStore().projectTimer;

  const onBackHandle = () => {
    navigation.goBack();
  };

  const onHandleProjects = () => {
    setProjectsVisible(e => !e);
  };

  return (
    <LinearContainer
      children={
        <RN.View style={styles.container}>
          <HeaderContent
            leftItem={<ArrowLeftBack onPress={onBackHandle} />}
            title="Calculator"
            rightItem={<Cancel onClose={onBackHandle} />}
          />
          <RN.View style={styles.content}>
            <SelectInput
              title={selectedProject.title}
              value={selectedProject.workTime}
              onPress={onHandleProjects}
            />
            <RN.View style={styles.timePrice}>
              <RN.View style={styles.timeBox}>
                <TextView text="Time" style={styles.label} />
                <Input
                  placeholder="00:00:00"
                  value={selectedProject.workTime}
                />
              </RN.View>
              <RN.View style={styles.priceBox}>
                <TextView text="Price $" style={styles.label} />
                <Input placeholder="0$" value={selectedProject.price} />
              </RN.View>
            </RN.View>
            <RN.View style={styles.amount}>
              <TextView text="Amount" style={styles.label} />
              <Input placeholder="1232" value={selectedProject.totalPrice} />
            </RN.View>
            <RN.View style={styles.counted}>
              <TextView text="Recently counted" style={styles.label} />
              <SelectInput
                title={recentlyCalculated.title}
                value={`${
                  recentlyCalculated.totalPrice
                    ? recentlyCalculated.totalPrice
                    : 0
                }$`}
                icon={<Images.Svg.deleteIcon />}
                iconPress={deleteRecentlyCalculated}
              />
            </RN.View>
          </RN.View>
          <SoundsContent
            headerTitle="Projects"
            data={projectTimerList}
            onItemPress={onSoundItemPress as never}
            headerLeftItem={
              <RN.TouchableOpacity hitSlop={HITSLOP} onPress={onHandleProjects}>
                <Images.Svg.arrowLeft />
              </RN.TouchableOpacity>
            }
            onClose={onHandleProjects}
            modalVisible={projectsVisible}
          />
        </RN.View>
      }
    />
  );
};

export default observer(ProjectTimerCalculator);

const styles = RN.StyleSheet.create({
  container: {
    paddingHorizontal: 10,
  },
  content: {},
  timePrice: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 40,
  },
  timeBox: {
    width: '45%',
    alignItems: 'flex-start',
    gap: 6,
  },
  priceBox: {
    alignItems: 'flex-start',
    gap: 6,
    width: '45%',
  },
  label: {
    paddingLeft: 15,
  },
  amount: {
    alignItems: 'flex-start',
    gap: 6,
    marginTop: 20,
  },
  counted: {
    alignItems: 'flex-start',
    gap: 6,
    marginTop: 50,
  },
});
