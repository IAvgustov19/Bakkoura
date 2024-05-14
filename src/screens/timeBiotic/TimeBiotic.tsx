import { useNavigation } from '@react-navigation/native';
import { observer } from 'mobx-react-lite';
import React, { useCallback } from 'react';
import { Images } from '../../assets';
import HeaderContent from '../../components/HeaderContent/HeaderContent';
import LinearContainer from '../../components/LinearContainer/LinearContainer';
import RN from '../../components/RN';
import { windowHeight } from '../../utils/styles';
import TimeClinicListItem from '../timeClinic/components/TimeClinicListItem';
import { TimeBioticList } from '../../constants/timeBiotic';

import { windowWidth } from '../../utils/styles';

console.log(windowWidth)


const TimeBiotic = () => {
    const navigation = useNavigation();

    const renderItem = useCallback(({ item }) => {
        return (
            <TimeClinicListItem
                title={item.title}
                text={item.info}
                isBtn={item.isbtn}
                onPressItem={() => navigation.navigate(item.navigate as never)}
            />
        );
    }, []);

    return (
        <LinearContainer
            children={
                <RN.View style={styles.container}>
                    <RN.View style={styles.bgContainer}>
                        <Images.Svg.bg style={styles.bg} />
                    </RN.View>
                    <HeaderContent
                        rightItem={<Images.Svg.arrowRight />}
                        leftItem={<Images.Svg.btsRightLinear />}
                        title="Time Biotic"
                    />
                    <RN.View style={styles.content}>
                        <RN.FlatList
                            showsVerticalScrollIndicator={false}
                            style={styles.flatlist}
                            data={TimeBioticList}
                            renderItem={({ item }) => renderItem({ item })}
                        />
                    </RN.View>
                </RN.View>
            }
        />
    );
};

export default observer(TimeBiotic);

const styles = RN.StyleSheet.create({
    container: {
        paddingHorizontal: 10,
    },
    bgContainer: {
        width: '100%',
        position: 'relative',
        alignItems: 'center',
    },
    bg: {
        position: 'absolute',
    },
    content: {
        gap: 5,
        paddingBottom: 20,
    },
    flatlist: {
        height: windowHeight - windowHeight / 3.5,
    },
});
