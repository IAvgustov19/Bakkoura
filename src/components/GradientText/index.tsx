import MaskedView from '@react-native-masked-view/masked-view';
import {TextProps} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import RN from '../RN';

interface Props extends TextProps {
  colors: string[];
}

export default (props: Props) => {
  return (
    <MaskedView
      maskElement={
        <RN.Text
          {...props}
          style={[props.style, {backgroundColor: 'transparent'}]}
        />
      }>
      <LinearGradient
        start={{x: 0, y: 0}}
        end={{x: 1, y: 1}}
        colors={props.colors}>
        <RN.Text {...props} style={[props.style, {opacity: 0}]} />
      </LinearGradient>
    </MaskedView>
  );
};
