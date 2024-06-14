import React from 'react'
import * as Progress from 'react-native-progress';

import { windowHeight } from '../../../utils/styles';
import { COLORS } from '../../../utils/colors';
import RN from '../../../components/RN';


interface Props {
    loading: boolean;
    setLoading: React.Dispatch<React.SetStateAction<boolean>>;
}

const LoadingScreen: React.FC<Props> = ({
    loading,
    setLoading,
}) => {
    return (
        <>
            {loading && (
                <RN.View style={styles.overlay}>
                    <Progress.Circle size={50} indeterminate={true} color={'#FFFFFF'} />
                </RN.View>
            )}
        </>
    )
}

export default LoadingScreen;


const styles = RN.StyleSheet.create({
    overlay: {
        width: '100%',
        position: 'relative',
        height: windowHeight,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: COLORS.darkGrey,
    },
})