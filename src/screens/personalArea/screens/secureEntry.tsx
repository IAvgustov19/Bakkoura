import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react'
import { Images } from '../../../assets';
import RN from '../../../components/RN';
import TextView from '../../../components/Text/Text';
import RadioBtn from '../../../components/RadioBtn/RadioBtn';
import StartBtn from '../../../components/StopStartBtn/StopStartBtn';
import ListItemCont from '../../../components/ListItemCont/ListItemCont';
import HeaderContent from '../../../components/HeaderContent/HeaderContent';
import LinearContainer from '../../../components/LinearContainer/LinearContainer';

import { SecureEntries } from '../../../utils/secureEntries';

const SecureEntry = () => {
    const navigation = useNavigation();
    const [active, setActive] = useState(0);

    const renderItem = ({ item, index }) => {
        return (
            <RN.View style={styles.eventsTypeList}>
                <ListItemCont
                    rightItem={
                        <RadioBtn
                            active={active == index}
                            onPress={() => setActive(index)}
                        />}
                    title={item}
                    onPress={() => setActive(index)}
                />
                <RN.View style={styles.line}></RN.View>
            </RN.View>
        );
    };

    return (
        <LinearContainer
            children={
                <RN.View style={styles.container}>
                    <Images.Svg.bg style={styles.bg} />
                    <HeaderContent
                        leftItem={
                            <RN.TouchableOpacity
                                style={styles.back}
                                onPress={() => navigation.goBack()}>
                                <Images.Svg.arrowLeft />
                                <TextView text="Back" />
                            </RN.TouchableOpacity>
                        }
                        title="Secure Entry"
                    />
                    <RN.FlatList
                        data={SecureEntries}
                        keyExtractor={(item, index) => index.toString()}
                        renderItem={renderItem}
                    />
                    <RN.View style={styles.addBtn}>
                        <StartBtn
                            onPress={() => navigation.goBack()}
                            primary={true}
                            text={'Ok'}
                            subWidth={70}
                            elWidth={55}
                        />
                    </RN.View>
                </RN.View>
            }
        />
    )
}


export default SecureEntry;

const styles = RN.StyleSheet.create({
    container: {
        height: '100%',
        position: 'relative',
        paddingHorizontal: 10,
    },
    bg: {
        position: 'absolute'
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
    listItemRight: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 5,
    },
    addBtn: {
        bottom: 20,
        width: '100%',
        position: 'absolute',
        alignItems: 'center',
    },
    back: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 5,
    },
});
