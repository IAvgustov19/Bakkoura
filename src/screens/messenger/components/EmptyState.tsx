import React from 'react';
import RN from '../../../components/RN';
import { Images } from '../../../assets';
import { t } from '../../../i18n';

interface EmptyStateProps {
    title: string;
}

const EmptyState: React.FC<EmptyStateProps> = ({ title }) => {
    return (
        <RN.View style={styles.container}>
            <Images.Svg.noData width={52} height={52} />
            <RN.Text style={styles.title}>{title}</RN.Text>
            <RN.Text style={styles.subtitle}>{`${t("oops")}`}</RN.Text>
        </RN.View>
    );
};

export default EmptyState;

const styles = RN.StyleSheet.create({
    container: {
        height: '50%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    title: {
        marginTop: 10,
        fontSize: 18,
        color: '#FFFFFF',
        textAlign: 'center',
        fontFamily: 'RedHatDisplay-Bold',
    },
    subtitle: {
        marginTop: 5,
        fontSize: 14,
        color: '#AAAAAA',
        textAlign: 'center',
        fontFamily: 'RedHatDisplay-Regular',
    },
});
