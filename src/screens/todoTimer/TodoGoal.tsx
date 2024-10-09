import {useNavigation} from '@react-navigation/native';
import {observer} from 'mobx-react-lite';
import React from 'react';
import ArrowLeftBack from '../../components/ArrowLeftBack/ArrowLeftBack';
import HeaderContent from '../../components/HeaderContent/HeaderContent';
import LinearContainer from '../../components/LinearContainer/LinearContainer';
import OutlineBtn from '../../components/OutlineBtn/OutlineBtn';
import RN from '../../components/RN';
import StartBtn from '../../components/StopStartBtn/StopStartBtn';
import useRootStore from '../../hooks/useRootStore';
import {APP_ROUTES} from '../../navigation/routes';
import {COLORS} from '../../utils/colors';
import {TodoGoalData, TodoGoalData_ar} from '../../utils/repeat';
import {windowHeight} from '../../utils/styles';
import TodoGoalTime from './components/TodoGoalTime';
import { t } from '../../i18n';

import l from '../../i18n'

const TodoGoal = () => {
  const navigation = useNavigation();
  const {setNewTaskState, taskState} = useRootStore().todoTimer;
  const {themeState} = useRootStore().personalAreaStore;

  const onHandleOk = () => {
    navigation.navigate(APP_ROUTES.NEW_TASK as never);
  };

  return (
    <LinearContainer
      children={
        <RN.View style={styles.container}>
          <HeaderContent
            title="Goal"
            leftItem={<ArrowLeftBack onPress={() => navigation.goBack()} />}
          />
          <RN.View style={styles.content}>
            <RN.View>
              <RN.View style={styles.time}>
                <TodoGoalTime />
              </RN.View>
              <RN.View style={styles.repeat}>
                {
                  l.locale == 'English' ?
                  
                TodoGoalData.map((item, index) => {
                  return (
                    <OutlineBtn
                      key={index}
                      text={item.title}
                      textColor={
                        item.title === taskState.goal && themeState.selectYellow
                      }
                      borderColor={
                        item.title === taskState.goal && themeState.selectYellow
                      }
                      borderColor_2={
                        themeState.radioback
                      }
                      onPress={() => setNewTaskState('goal', item.title)}
                      Width={'30%'}
                    />
                  );
                })
               
                :
                
                TodoGoalData_ar.map((item, index) => {
                  return (
                    <OutlineBtn
                      key={index}
                      text={item.title}
                      textColor={
                        item.title === taskState.goal && themeState.selectYellow
                      }
                      borderColor={
                        item.title === taskState.goal && themeState.selectYellow
                      }
                      borderColor_2={
                        themeState.radioback
                      }
                      onPress={() => setNewTaskState('goal', item.title)}
                      Width={'30%'}
                    />
                  );
                })
                }
              </RN.View>
            </RN.View>
            <RN.View>
              <StartBtn
                text={`${t("ok")}`}
                primary
                elWidth={55}
                subWidth={70}
                onPress={onHandleOk}
              />
            </RN.View>
          </RN.View>
        </RN.View>
      }
    />
  );
};

export default observer(TodoGoal);

const styles = RN.StyleSheet.create({
  container: {
    paddingHorizontal: 5,
  },
  content: {
    height: windowHeight - windowHeight / 5,
    justifyContent: 'space-between',
  },
  time: {
    height: '70%',
  },
  repeat: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});
