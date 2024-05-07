import { Images } from "../../assets";
import RN from "../RN"

interface ICheckbox {
    active?: boolean;
    onPress: () => void;
}

const Checkbox: React.FC<ICheckbox> = ({
    onPress,
    active = false,
}) => {
    return (
        <RN.TouchableOpacity onPress={onPress}>
            <RN.View style={styles.container}>
                <Images.Svg.checkbox width={28} height={28} onPress={onPress} />
                {
                    active &&
                    <Images.Svg.checkIcon style={styles.checkIcon} />
                }
            </RN.View>
        </RN.TouchableOpacity>
    )
}

export default Checkbox;


const styles = RN.StyleSheet.create({
    container: {
        position: 'relative',
        alignItems: 'center',
        justifyContent: 'center',
    },
    checkIcon: {
        width: 22,
        height: 22,
        position: 'absolute',
    }
});