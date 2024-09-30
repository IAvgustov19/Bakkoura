import { useNavigation } from '@react-navigation/native';
import { observer } from 'mobx-react-lite';
import React, { useEffect, useState } from 'react';
import { Images } from '../../assets';
import ArrowLeftBack from '../../components/ArrowLeftBack/ArrowLeftBack';
import Cancel from '../../components/Cancel/Cancel';
import HeaderContent from '../../components/HeaderContent/HeaderContent';
import Input from '../../components/Input/Input';
import Line from '../../components/Line/Line';
import LinearContainer from '../../components/LinearContainer/LinearContainer';
import RN from '../../components/RN';
import StartBtn from '../../components/StopStartBtn/StopStartBtn';
import useRootStore from '../../hooks/useRootStore';
import { COLORS } from '../../utils/colors';
import { windowHeight } from '../../utils/styles';

import {t} from '../../i18n'
import { Alert } from 'react-native';

const AddTaskScreen = () => {
  const navigation = useNavigation();
  const {
    setNewTaskState,
    newTaskState,
    calculateTime,
    createTask,
    clearState,
    isUpdate,
    updateTask,
    handleDeleteTask,
  } = useRootStore().pomodoroStore;

  const [minut, setMinut] = useState(newTaskState.minut ?? 1);
  const addMinut = () => {
    if (minut + 1 <= 9){
      setMinut(minut + 1);
      setNewTaskState('minut', minut + 1);
      setNewTaskState('totalCycle', newTaskState.minut);
      calculateTime();
    }
  };
  const subMinut = () => {
    if (minut - 1 >= 0) {
      setMinut(minut - 1);
      setNewTaskState('minut', minut - 1);
      setNewTaskState('totalCycle', newTaskState.minut);
    } else {
      return
    }
    calculateTime();
  };

  const onBackHandle = () => {
    navigation.goBack();
    clearState();
  };

  const UpdateTask = () => {
    navigation.goBack();
    updateTask(newTaskState.id);
  };

  const deltateTask = () => {
    navigation.goBack();
    handleDeleteTask(newTaskState.id);
  };

  const handleTextChange = (key, value) => {
    if (value.length >= 101) {
      Alert.alert('Input Limit', 'You cannot write more than 100 characters.');
      return;
    }
    setNewTaskState(key, value);
  };

  useEffect(() => {
    !isUpdate && clearState();
  }, []);

  return (
    <LinearContainer
      children={
        <RN.View style={styles.container}>
          <HeaderContent
            title={`${t("Task")}`}
            rightItem={<Cancel onClose={onBackHandle} />}
          />
          <RN.ScrollView style={styles.scrollView}>
            <RN.View style={styles.content}>
              <RN.View style={styles.fomrBox}>
                <RN.View style={styles.form}>
                  <Input
                    placeholder={`${t("name")}`}
                    maxLenght={101}
                    value={newTaskState.name}
                    onChangeText={e => setNewTaskState('name', e)}
                  />
                  <Line />
                  <Input
                    placeholder={`${t("what working")}`}
                    multiLine={true}
                    maxLenght={101}
                    height={110}
                    paddingTop={15}
                    value={newTaskState.description}
                    textAlignVertical={'top'}
                    onChangeText={e => setNewTaskState('description', e)}
                  />
                </RN.View>
                <RN.View style={styles.timeSelect}>
                  <RN.Text style={styles.estPom}>{`${t("Est Pomodoros")}`}</RN.Text>
                  <RN.View style={styles.timeSelectBox}>
                    <RN.TouchableOpacity onPress={subMinut}>
                      <Images.Svg.minusDelete />
                    </RN.TouchableOpacity>
                    <RN.TextInput
                      style={styles.timeInput}
                      placeholder="0"
                      placeholderTextColor={COLORS.grey}
                      value={`${newTaskState.minut}`}
                      onChangeText={e => setNewTaskState('minut', e)}
                      maxLength={1}
                      keyboardType='Number'
                    />
                    <RN.TouchableOpacity onPress={addMinut}>
                      <Images.Svg.addSmallicon />
                    </RN.TouchableOpacity>
                  </RN.View>
                </RN.View>
              </RN.View>
              {isUpdate ? (
                <RN.View style={styles.btnsBox}>
                  <StartBtn
                    subWidth={70}
                    elWidth={55}
                    text={`${t("Delete")}`}
                    primary
                    onPress={deltateTask}
                  />
                  <StartBtn
                    subWidth={70}
                    elWidth={55}
                    text={`${t("ok")}`}
                    primary
                    onPress={UpdateTask}
                  />
                </RN.View>
              ) : (
                <RN.View style={styles.btnBox}>
                  <StartBtn
                    subWidth={70}
                    elWidth={55}
                    text={`${t("add")}`}
                    primary
                    onPress={() => createTask(onBackHandle)}
                  />
                </RN.View>
              )}
            </RN.View>
          </RN.ScrollView>
        </RN.View>
      }
    />
  );
};

export default observer(AddTaskScreen);

const styles = RN.StyleSheet.create({
  container: {
    paddingHorizontal: 5,
  },
  scrollView: {
    height: windowHeight,
  },
  content: {
    justifyContent: 'space-between',
    height: windowHeight - windowHeight / 5.5,
  },
  fomrBox: {
    gap: 10,
  },
  form: {
    backgroundColor: COLORS.black,
    borderRadius: 5,
  },
  timeSelectBox: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  timeSelect: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: COLORS.black,
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 25,
  },
  estPom: {
    fontSize: 14,
    color: COLORS.grey,
  },
  timeInput: {
    width: 70,
    height: 45,
    textAlign: 'center',
    color: COLORS.grey,
    backgroundColor: '#141414',
    borderRadius: 25,
  },
  btnBox: {
    alignItems: 'center',
  },
  btnsBox: {
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    flexDirection: 'row',
    paddingHorizontal: 10,
  },
});
