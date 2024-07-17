import React from 'react';
import LinearContainer from '../../../components/LinearContainer/LinearContainer';
import RN from '../../../components/RN';
import HeaderContent from '../../../components/HeaderContent/HeaderContent';
import { Images } from '../../../assets';
import Cancel from '../../../components/Cancel/Cancel';
import { useNavigation } from '@react-navigation/native';
import { windowHeight, windowWidth } from '../../../utils/styles';
import ButtonComp from '../../../components/Button/Button';
import { APP_ROUTES } from '../../../navigation/routes';
import OutlineBtn from '../../../components/OutlineBtn/OutlineBtn';
import RadioBtn from '../../../components/RadioBtn/RadioBtn';

const SendIdea = () => {
    const navigation = useNavigation();
    return (
        <LinearContainer
            children={
                <RN.ScrollView showsVerticalScrollIndicator={false}>
                    <RN.View style={styles.container}>
                        <Images.Svg.bg style={styles.bg} />
                        <HeaderContent
                            leftItem={<Images.Svg.btsRightLinear />}
                            rightItem={<Cancel onClose={() => navigation.goBack()} />}
                            title="Your Idea"
                        />
                        <RN.Text style={styles.text}>
                            {`Your preferences are very important to us. We strive to satisfy your most sophisticated tastes. Just imagine, \n you have the opportunity to realize your idea in the  \n most exquisite form!`}
                        </RN.Text>
                        <RN.View style={{display: 'flex', justifyContent: 'space-between', flexDirection:'row', gap: 13}}>
                            <RadioBtn active />
                            <RN.View>
                            <RN.Text style={styles.text}>
                                {`Your personal data are guaranteed to be safe \n and will not be handed over to third parties.`}
                            </RN.Text>

                            </RN.View>
                        </RN.View>
                        <RN.View style={styles.btn}>
                            <ButtonComp title='Send' containerColor='white' outline textColor='black'
                                onPress={() => navigation.navigate(APP_ROUTES.THANKS as never)} />
                        </RN.View>
                    </RN.View>
                </RN.ScrollView>
            }
        />
    );
};

export default SendIdea;

const styles = RN.StyleSheet.create({
    container: {
        width: '100%',
        alignItems: 'center',
        position: 'relative',
        height: windowHeight,
        paddingHorizontal: 10,
    },
    bg: {
        left: 1,
        height: '100%',
        position: 'absolute',
    },
    text: {
        fontSize: 14,
        lineHeight: 18,
        color: '#D9D9D9',
        fontWeight: '400',
        textAlign: 'center',
    },
    btn: {
        bottom: '5%',
        position: 'absolute',
    }

});
