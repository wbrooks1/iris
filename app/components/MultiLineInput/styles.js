
import { StyleSheet, Dimensions } from 'react-native';
import { colors } from '../../config/styles';

const window = Dimensions.get('window');
export default StyleSheet.create({
    input: {
        height: 80,
        width: window.width - 60,
        fontSize: 16,
        borderRadius: 5,
        backgroundColor: colors.white,
        marginHorizontal: 10,
        paddingVertical: 5,
        paddingHorizontal: 15,
        alignSelf:"center",

    },
    title: {
        fontSize: 20,
        textAlign: 'left',
        margin: 5,
        color: colors.carbon,
        fontFamily: 'centuryschl',
    },
    container: {
        flex: 1,
        // height: 40,
        width: window.width - 50,
        backgroundColor: colors.neutral,
        marginHorizontal: 5,
        alignSelf:"center",
        flexDirection: 'column',
    },
});
