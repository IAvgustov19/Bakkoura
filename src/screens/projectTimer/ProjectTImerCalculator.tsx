import {useNavigation} from '@react-navigation/native';
import {observer} from 'mobx-react-lite';
import React, {useCallback, useEffect, useState} from 'react';
import {Keyboard} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {Images} from '../../assets';
import ArrowLeftBack from '../../components/ArrowLeftBack/ArrowLeftBack';
import Cancel from '../../components/Cancel/Cancel';
import GeneralModal from '../../components/GeneralModal/GeneralModal';
import HeaderContent from '../../components/HeaderContent/HeaderContent';
import Input from '../../components/Input/Input';
import LinearContainer from '../../components/LinearContainer/LinearContainer';
import ListItemCont from '../../components/ListItemCont/ListItemCont';
import RadioBtn from '../../components/RadioBtn/RadioBtn';
import RN from '../../components/RN';
import SelectInput from '../../components/SelectInput/SelectInput';
import SoundsContent from '../../components/SoundsContent/SoundsContent';
import StartBtn from '../../components/StopStartBtn/StopStartBtn';
import TextView from '../../components/Text/Text';
import useRootStore from '../../hooks/useRootStore';
import {COLORS} from '../../utils/colors';
import {HITSLOP, windowHeight} from '../../utils/styles';
import { t } from '../../i18n';

const ProjectTimerCalculator = () => {
  const navigation = useNavigation();
  const [projectsVisible, setProjectsVisible] = useState(false);
  const {themeState} = useRootStore().personalAreaStore;
  const {
    onProjectsItemPress,
    projectTimerList,
    selectedProject,
    recentlyCalculated,
    deleteRecentlyCalculated,
    clearSelectedProject,
  } = useRootStore().projectTimer;

  const onBackHandle = () => {
    navigation.goBack();
    clearSelectedProject();
  };

  const onHandleProjects = () => {
    setProjectsVisible(e => !e);
  };

  const renderData = useCallback(() => {
    return (
      <GeneralModal
        visible={projectsVisible}
        hide={onHandleProjects}
        children={
          <RN.View style={styles.projectsBox}>
            <HeaderContent
              leftItem={<ArrowLeftBack onPress={onHandleProjects} />}
              title={`${t("Projects")}`}
            />
            <RN.ScrollView
              showsHorizontalScrollIndicator={false}
              showsVerticalScrollIndicator={false}>
              <RN.View style={styles.projects}>
                <RN.View style={styles.projectList}>
                  {projectTimerList.map((item, index) => {
                    return (
                      <ListItemCont
                        key={index}
                        title={item.title}
                        onPress={() => onProjectsItemPress(index)}
                        backBlack
                        rightItem={
                          <RadioBtn
                            active={item.id === selectedProject.id}
                            onPress={() => onProjectsItemPress(index)}
                          />
                        }
                      />
                    );
                  })}
                </RN.View>
              </RN.View>
            </RN.ScrollView>
            <RN.View style={styles.okBtn}>
              <StartBtn
                elWidth={60}
                subWidth={75}
                primary
                text={`${t("ok")}`}
                onPress={onHandleProjects}
              />
            </RN.View>
          </RN.View>
        }
      />
    );
  }, [projectTimerList, projectsVisible, selectedProject]);

  return (
    <LinearContainer
      children={
        <RN.View style={styles.container}>
          <HeaderContent
            leftItem={<ArrowLeftBack onPress={onBackHandle} />}
            title={`${t("calc")}`}
          />
          <RN.View style={styles.content}>
            <SelectInput
              title={selectedProject.title}
              value={selectedProject.workTime}
              onPress={onHandleProjects}
              iconPress={onHandleProjects}
            />
            <RN.View style={styles.timePrice}>
              <RN.View style={styles.timeBox}>
                <TextView text={`${t("Time")}`} style={styles.label} />
                <RN.View
                  style={[
                    styles.itemBox,
                    {backgroundColor: themeState.inputBaack},
                  ]}>
                  <RN.Text
                    style={[styles.itemTitle, {color: themeState.title}]}>
                    {selectedProject.workTime}
                  </RN.Text>
                </RN.View>
              </RN.View>
              <RN.View style={styles.priceBox}>
                <TextView text={`${t("Price")}, $`} style={styles.label} />
                <RN.View
                  style={[
                    styles.itemBox,
                    {backgroundColor: themeState.inputBaack},
                  ]}>
                  <RN.Text
                    style={[styles.itemTitle, {color: themeState.title}]}>
                    {selectedProject.price}
                  </RN.Text>
                </RN.View>
              </RN.View>
            </RN.View>
            <RN.View style={styles.amount}>
              <TextView
                text={`${t("Amount")}`}
                style={[styles.label, styles.amountLabel]}
              />
              <LinearGradient
                start={{x: 0, y: 0}}
                end={{x: 0.8, y: 1}}
                colors={[COLORS.green, COLORS.darkGreyText, '#007AFF54']}
                style={styles.amounLinear}>
                <RN.View
                  style={[
                    styles.itemBox,
                    {backgroundColor: themeState.inputBaack},
                  ]}>
                  <RN.Text
                    style={[styles.itemTitle, {color: themeState.title}]}>
                    {selectedProject.totalPrice}
                  </RN.Text>
                </RN.View>
              </LinearGradient>
            </RN.View>
            {recentlyCalculated?.id ? (
              <RN.View style={styles.counted}>
                <TextView text={`${t("Recently counted")}`} style={styles.label} />
                <SelectInput
                  title={
                    recentlyCalculated?.title ? recentlyCalculated.title : ''
                  }
                  value={`${
                    recentlyCalculated?.totalPrice
                      ? recentlyCalculated.totalPrice
                      : 0
                  }$`}
                  icon={<themeState.delete />}
                  iconPress={deleteRecentlyCalculated}
                />
              </RN.View>
            ) : null}
          </RN.View>
          {renderData()}
        </RN.View>
      }
    />
  );
};

export default observer(ProjectTimerCalculator);

const styles = RN.StyleSheet.create({
  container: {
    paddingHorizontal: 5,
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
  itemBox: {
    justifyContent: 'center',
    // alignItems: 'center',
    width: '100%',
    borderRadius: 30,
    height: 60,
    paddingHorizontal: 20,
  },
  itemTitle: {
    fontSize: 20,
  },
  amounLinear: {
    padding: 0.8,
    width: '100%',
    borderRadius: 30,
  },
  amountLabel: {
    color: COLORS.green,
  },
  projectsBox: {
    height: windowHeight - 50,
  },
  projects: {
    paddingBottom: 110,
  },
  projectList: {
    borderRadius: 3,
  },
  okBtn: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    alignItems: 'center',
  },
});
