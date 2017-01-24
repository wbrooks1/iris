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
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'silver',
        padding: 20,
    },
    signIn: {
        fontSize: 20,
        textAlign: 'center',
        margin: 5,
    },
});