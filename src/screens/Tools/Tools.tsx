import { useNavigation } from '@react-navigation/native';
import { observer } from 'mobx-react-lite';
import React, { useCallback } from 'react';
import { Images } from '../../assets';
import HeaderContent from '../../components/HeaderContent/HeaderContent';
import LinearContainer from '../../components/LinearContainer/LinearContainer';
import RN from '../../components/RN';
import { windowHeight } from '../../utils/styles';
import TimeClinicListItem from '../timeClinic/components/TimeClinicListItem';
import { ToolsList } from '../../constants/tools';
import ArrowLeftBack from '../../components/ArrowLeftBack/ArrowLeftBack';

const Tools = () => {
    const navigation = useNavigation();

    const renderItem = useCallback(({ item }) => {
        return (
            <TimeClinicListItem
                icon={<item.image />}
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
                    <HeaderContent
                        leftItem={<Images.Svg.btsRightLinear />}
                        title="Tools"
                    />
                    <RN.View style={styles.content}>
                        <RN.FlatList
                            showsVerticalScrollIndicator={false}
                            style={styles.flatlist}
                            data={ToolsList}
                            renderItem={({ item }) => renderItem({ item })}
                        />
                    </RN.View>
                </RN.View>
            }
        />
    );
};

export default observer(Tools);

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
    },
    flatlist: {
        height: '85%',
    },
});
