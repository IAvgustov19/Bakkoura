import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { Images } from '../../../assets';
import LinearContainer from '../../../components/LinearContainer/LinearContainer';
import HeaderContent from '../../../components/HeaderContent/HeaderContent';
import ListItemCont from '../../../components/ListItemCont/ListItemCont';
import { APP_ROUTES } from '../../../navigation/routes';
import { windowHeight, windowWidth } from '../../../utils/styles';
import { COLORS } from '../../../utils/colors';
import RN from '../../../components/RN';

const PersonalArea = () => {
    const navigation = useNavigation();
    return (
        <LinearContainer
            children={
                <RN.View style={styles.container}>
                    <Images.Svg.bg style={styles.bg} />
                    <HeaderContent
                        rightItem={
                            <RN.TouchableOpacity
                                style={styles.cancelBtn}
                                onPress={() => navigation.goBack()}>
                                <RN.Text style={styles.cancelTxt}>Cancel</RN.Text>
                            </RN.TouchableOpacity>
                        }
                        title="Personal Area"
                    />
                    <RN.ScrollView showsVerticalScrollIndicator={false}>
                        <RN.TouchableOpacity style={{ alignItems: 'center' }}>
                            <Images.Svg.userIcon width={79} height={79} />
                        </RN.TouchableOpacity>
                        <RN.TouchableOpacity
                            style={styles.chooseBtn}
                            onPress={() => { }}>
                            <RN.Text style={styles.chooseText}>Choose a photo</RN.Text>
                        </RN.TouchableOpacity>
                        <RN.View style={styles.content}>
                            <RN.View>
                                <RN.View style={styles.eventsTypeList}>
                                    <ListItemCont
                                        title="Jihad Bakkoura"
                                        onPress={() => navigation.navigate(APP_ROUTES.PERSONAL_DETAILS as never)}
                                    />
                                    <RN.View style={styles.line}></RN.View>
                                    <ListItemCont
                                        title="Login & Password"
                                        onPress={() => navigation.navigate(APP_ROUTES.LOGIN_PASSWORD as never)}
                                    />
                                    <RN.View style={styles.line}></RN.View>
                                    <ListItemCont
                                        title="Secure Entry"
                                        value={'Free'}
                                        onPress={() =>
                                            navigation.navigate(APP_ROUTES.SECURE_ENTRY as never)
                                        }
                                    />
                                </RN.View>
                                <RN.View style={styles.eventsTypeList}>
                                    <ListItemCont
                                        title="Organize Menu"
                                        onPress={() => navigation.navigate(APP_ROUTES.CONTACT_THANKS as never)}
                                    />
                                    <RN.View style={styles.line}></RN.View>
                                    <ListItemCont
                                        title="Start Screen"
                                        value={'Bakkoura 1'}
                                        onPress={() => { }}
                                    />
                                </RN.View>
                                <RN.View style={styles.eventsTypeList}>
                                    <ListItemCont
                                        title="Language"
                                        value={'English'}
                                        onPress={() => navigation.navigate(APP_ROUTES.LANGUAGE_SCREEN as never)}
                                    />
                                    <RN.View style={styles.line}></RN.View>
                                    <ListItemCont
                                        title="Theme"
                                        value={'Dark'}
                                        onPress={() => navigation.navigate(APP_ROUTES.THEME as never)}
                                    />
                                </RN.View>
                                <RN.View style={styles.eventsTypeList}>
                                    <ListItemCont
                                        title="Important Dates"
                                        onPress={() => { }}
                                    />
                                    <RN.View style={styles.line}></RN.View>
                                    <ListItemCont
                                        title="Couple Time"
                                        onPress={() => { }}
                                    />
                                </RN.View>
                            </RN.View>
                        </RN.View>
                    </RN.ScrollView>
                </RN.View>
            }
        />
    );
};

export default PersonalArea;

const styles = RN.StyleSheet.create({
    container: {
        height: windowHeight,
        position: 'relative',
        paddingHorizontal: 15,
    },
    bg: {
        left: 1,
        position: 'absolute',
    },
    cancelBtn: {
        paddingTop: 5,
        paddingRight: 5,
        paddingBottom: 5,
    },
    cancelTxt: {
        color: COLORS.grey,
        fontSize: 16,
    },
    chooseBtn: {
        paddingVertical: 11,
        alignItems: 'center',
    },
    chooseText: {
        fontSize: 14,
        color: COLORS.grey,
    },
    scrollView: {},
    content: {
        justifyContent: 'space-between',
        height: windowHeight - windowHeight / 6,
    },
    eventsTypeList: {
        backgroundColor: '#0D0D0D',
        borderRadius: 3,
        paddingHorizontal: 5,
        marginTop: 5,
    },
    line: {
        backgroundColor: '#131F28',
        width: '100%',
        height: 1,
    },
});
