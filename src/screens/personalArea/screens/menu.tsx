import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';

import LinearContainer from '../../../components/LinearContainer/LinearContainer';
import HeaderContent from '../../../components/HeaderContent/HeaderContent';
import ListItemCont from '../../../components/ListItemCont/ListItemCont';
import StartBtn from '../../../components/StopStartBtn/StopStartBtn';
import Checkbox from '../../../components/Checkbox/Checkbox';
import { windowHeight } from '../../../utils/styles';
import TextView from '../../../components/Text/Text';
import { MenuItems } from '../../../utils/menuItems';
import { COLORS } from '../../../utils/colors';
import { Images } from '../../../assets';
import RN from '../../../components/RN';


const Menu = () => {
    const [active, setActive] = useState<number[]>([]);
    const [selected, setSelected] = useState<string[]>([]);

    const onPress = (index: number, item: string) => {
        setActive((prevActive) =>
            prevActive.includes(index)
                ? prevActive.filter((item) => item !== index)
                : [...prevActive, index]
        );
        setSelected((prevSelected) =>
            active.includes(index)
                ? prevSelected.filter((selectedItem) => selectedItem !== item)
                : [...prevSelected, item]
        );
    };


    const renderItem = ({ item, index }) => {
        return (
            <RN.View style={styles.eventsTypeList}>
                <ListItemCont
                    title={item}
                    onPress={() => onPress(index, item)}
                    rightItem={
                        <Checkbox
                            active={active.includes(index)}
                            onPress={() => onPress(index, item)}
                        />
                    }
                />
                <RN.View style={styles.line}>
                </RN.View>
            </RN.View>
        );
    };

    const navigation = useNavigation();
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
                        rightItem={
                            <RN.TouchableOpacity
                                style={styles.cancelBtn}
                                onPress={() => navigation.goBack()}>
                                <RN.Text style={styles.cancelTxt}>Cancel</RN.Text>
                            </RN.TouchableOpacity>
                        }
                        title="Menu"
                    />
                    <RN.View style={styles.content}>
                        <RN.FlatList
                            data={MenuItems}
                            renderItem={renderItem}
                            keyExtractor={(item, index) => index.toString()}
                        />
                        <RN.View style={styles.addBtn}>
                            <StartBtn
                                primary={true}
                                text={'Ok'}
                                subWidth={70}
                                elWidth={55}
                                onPress={() => navigation.goBack()}
                            />
                        </RN.View>
                    </RN.View>
                </RN.View>
            }
        />
    );
};

export default Menu;

const styles = RN.StyleSheet.create({
    container: {
        height: '100%',
        position: 'relative',
        paddingHorizontal: 15,
    },
    bg: {
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
    scrollView: {},
    content: {
    },
    eventsTypeList: {
        borderRadius: 3,
        paddingHorizontal: 5,
        backgroundColor: '#0D0D0D',
    },
    line: {
        backgroundColor: '#131F28',
        width: '100%',
        height: 1,
    },
    back: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 5,
    },
    addBtn: {
        width: '100%',
        position: 'absolute',
        alignItems: 'center',
        bottom: windowHeight / 8,
    },
});
