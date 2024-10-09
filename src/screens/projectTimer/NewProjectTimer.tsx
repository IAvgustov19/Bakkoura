import {useNavigation} from '@react-navigation/native';
import {observer} from 'mobx-react-lite';
import React, {useEffect, useState} from 'react';
import {Keyboard} from 'react-native';
import ArrowLeftBack from '../../components/ArrowLeftBack/ArrowLeftBack';
import Cancel from '../../components/Cancel/Cancel';
import HeaderContent from '../../components/HeaderContent/HeaderContent';
import Input from '../../components/Input/Input';
import Line from '../../components/Line/Line';
import LinearContainer from '../../components/LinearContainer/LinearContainer';
import ListItemCont from '../../components/ListItemCont/ListItemCont';
import RN from '../../components/RN';
import SimpleSwitch from '../../components/SimpleSwitch/SimpleSwitch';
import StartBtn from '../../components/StopStartBtn/StopStartBtn';
import useRootStore from '../../hooks/useRootStore';
import {APP_ROUTES} from '../../navigation/routes';
import {COLORS} from '../../utils/colors';
import {windowHeight} from '../../utils/styles';
import { t } from '../../i18n';

const NewProjectTimer = () => {
  const navigation = useNavigation();
  const [isPaid, setIsPaid] = useState(false);
  const {themeState} = useRootStore().personalAreaStore;
  const {
    newProjectTimerState,
    setNewProjectTimeState,
    createNewProjectTimer,
    clearState,
    isUpdate,
  } = useRootStore().projectTimer;

  const goBackHandle = () => {
    navigation.goBack();
    clearState();
  };

  const onPaid = () => {
    setIsPaid(e => !e);
  };

  useEffect(() => {
    setNewProjectTimeState('paid', isPaid);
  }, [isPaid]);

  const createProjectTimer = () => {
    createNewProjectTimer(() =>
      navigation.navigate(APP_ROUTES.PROJECT_TIMER as never),
    );
  };

  return (
    <LinearContainer
      children={
        <RN.View style={styles.container}>
          <HeaderContent
            title={t("New Project")}
            rightItem={<Cancel onClose={goBackHandle} />}
          />
          <RN.ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
            <RN.View style={styles.content}>
              <RN.View style={styles.formBox}>
                <RN.View
                  style={[styles.form, {backgroundColor: themeState.mainBack}]}>
                  <Input
                    placeholder={t("name")}
                    value={newProjectTimerState.title}
                    onChangeText={e => setNewProjectTimeState('title', e)}
                    backColor={themeState.mainBack}
                    maxLenght={30}
                  />
                  <Line />
                  <Input
                    placeholder={t("Description")}
                    value={newProjectTimerState.description}
                    multiLine={true}
                    height={100}
                    paddingTop={15}
                    onChangeText={e => setNewProjectTimeState('description', e)}
                    textAlignVertical="top"
                    maxLenght={100}
                    backColor={themeState.mainBack}
                  />
                </RN.View>
                <RN.View
                  style={[styles.form, {backgroundColor: themeState.mainBack}]}>
                  {/* <ListItemCont
                    title="Paid"
                    rightItem={
                      <SimpleSwitch active={isPaid} handlePress={onPaid} />
                    }
                  /> */}
                  <ListItemCont
                    title={t("Price")}
                    value={`${newProjectTimerState.price}$/h`}
                    onPress={() =>
                      navigation.navigate(
                        APP_ROUTES.NEW_PROJECT_TIMER_PRICE as never,
                      )
                    }
                  />
                </RN.View>
              </RN.View>
              <StartBtn
                primary
                text={isUpdate ? `${t("Update")}` : `${t("add")}`}
                subWidth={80}
                elWidth={65}
                onPress={createProjectTimer}
              />
            </RN.View>
          </RN.ScrollView>
        </RN.View>
      }
    />
  );
};

export default observer(NewProjectTimer);

const styles = RN.StyleSheet.create({
  container: {
    paddingHorizontal: 5,
    height: windowHeight,
  },
  content: {
    justifyContent: 'space-between',
    height: windowHeight,
    paddingBottom: windowHeight - windowHeight / 1.2,
  },
  scrollView: {
    height: windowHeight,
  },
  formBox: {
    gap: 10,
  },
  form: {
    backgroundColor: COLORS.black,
    borderRadius: 5,
  },
});
