import {observer} from 'mobx-react-lite';
import {Images} from '../../assets';
import useRootStore from '../../hooks/useRootStore';
import RN from '../RN';

interface ICheckbox {
  active?: boolean;
  onPress: () => void;
}

const Checkbox: React.FC<ICheckbox> = ({onPress, active = false}) => {
  const {themeState} = useRootStore().personalAreaStore;
  return (
    <RN.TouchableOpacity onPress={onPress}>
      <RN.View style={styles.container}>
        <themeState.checkbox width={28} height={28} onPress={onPress} />
        {active && <Images.Svg.checkIcon style={styles.checkIcon} />}
      </RN.View>
    </RN.TouchableOpacity>
  );
};

export default observer(Checkbox);

const styles = RN.StyleSheet.create({
  container: {
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkIcon: {
    width: 22,
    height: 22,
    position: 'absolute',
  },
});
