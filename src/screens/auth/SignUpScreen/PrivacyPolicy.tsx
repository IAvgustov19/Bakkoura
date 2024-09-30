import {useNavigation} from '@react-navigation/native';
import {observer} from 'mobx-react-lite';
import React, {useRef} from 'react';
import {WebView} from 'react-native-webview';
import ArrowLeftBack from '../../../components/ArrowLeftBack/ArrowLeftBack';
import RN from '../../../components/RN';
import { t } from '../../../i18n';

const PrivacyPolicy = () => {
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
        source={{uri: `${t("privacy_link")}`}}
        style={{flex: 1}}
        javaScriptEnabled={true}
      />
    </RN.View>
  );
};

export default observer(PrivacyPolicy);

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
