import React from 'react';
import { useNavigation } from '@react-navigation/native';

import LinearContainer from '../../components/LinearContainer/LinearContainer';
import HeaderContent from '../../components/HeaderContent/HeaderContent';
import ArrowLeftBack from '../../components/ArrowLeftBack/ArrowLeftBack';
import { BtsNavigationItems } from '../../utils/btsNavigation';
import TextView from '../../components/Text/Text';
import { windowHeight } from '../../utils/styles';
import { COLORS } from '../../utils/colors';
import RN from '../../components/RN';


const BtsNavigation = () => {
    const navigation = useNavigation();

    const renderItem = ({ item, index }) => {
        return (
            <RN.View style={styles.itemContainer}>
                <RN.View style={styles.itemInfo}>
                    <item.image />
                    <TextView text={item.label} style={styles.label} />
                </RN.View>
                <TextView
                    textAlign='left'
                    text={item.text}
                    style={styles.text}
                />
            </RN.View>
        );
    };

    return (
        <LinearContainer
            children={
                <RN.View style={styles.container}>
                    <HeaderContent
                        leftItem={<ArrowLeftBack onPress={() => navigation.goBack()} />}
                        title="BTS Navigation"
                    />
                    <RN.View style={styles.content}>
                        <RN.FlatList
                            data={BtsNavigationItems}
                            renderItem={renderItem}
                            showsVerticalScrollIndicator={false}
                            keyExtractor={(item, index) => index.toString()}
                        />
                    </RN.View>
                </RN.View>
            }
        />
    );
};

export default BtsNavigation;

const styles = RN.StyleSheet.create({
    container: {
        paddingHorizontal: 10,
    },
    content: {
        paddingTop: 18,
        paddingBottom: 70,
    },
    itemContainer: {
        gap: 35,
        display: 'flex',
        paddingBottom: 24,
        flexDirection: 'row',
        alignItems: 'center',
        width:200
    },
    itemInfo: { alignItems: 'center', width: 80 },
    label: {
        fontSize: 13,
        textAlign: 'center',
    },
    text: {
        fontSize: 14,
        color: COLORS.white,
    },

});
