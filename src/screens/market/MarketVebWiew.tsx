import {useNavigation} from '@react-navigation/native';
import {observer} from 'mobx-react-lite';
import React, {useRef} from 'react';
import {SafeAreaView} from 'react-native';
import {WebView} from 'react-native-webview';
import {Images} from '../../assets';
import ArrowLeftBack from '../../components/ArrowLeftBack/ArrowLeftBack';
import LinearContainer from '../../components/LinearContainer/LinearContainer';
import RN from '../../components/RN';
import useRootStore from '../../hooks/useRootStore';
import {COLORS} from '../../utils/colors';

const MarketWebView = () => {
  const {webViewLink} = useRootStore().marketStore;
  const webviewRef = useRef<WebView>(null);
  const navigation = useNavigation();

  return (
    <RN.View style={styles.container}>
      <RN.View style={styles.header}>
        <ArrowLeftBack onPress={() => navigation.goBack()} />
      </RN.View>
      <WebView
        startInLoadingState
        ref={webviewRef}
        source={{uri: webViewLink}}
        style={{flex: 1}}
        javaScriptEnabled={true}
      />
    </RN.View>
  );
};

export default observer(MarketWebView);

const styles = RN.StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    paddingHorizontal: 10,
    paddingBottom: 15,
    backgroundColor: '#323D45',
    height: 80,
    justifyContent: 'flex-end',
    alignItems: 'flex-start',
  },
});
