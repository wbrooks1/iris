import { StyleSheet, Dimensions } from 'react-native';
import { colors } from '../../config/styles';

const window = Dimensions.get('window');
export default StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 70
    },
    modal: {
        // flex: 1,
        marginTop: window.height / 4,
        height: window.height / 2,
        width: window.width - 20,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'silver',
        padding: 20,
        borderRadius: 10,
        alignSelf: 'center',
    },
    signIn: {
        fontSize: 20,
        textAlign: 'center',
        margin: 5,
        color: colors.ink
    },
});
