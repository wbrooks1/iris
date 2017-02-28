import { StyleSheet, Dimensions } from 'react-native';
import { colors } from '../../config/styles';

const window = Dimensions.get('window');
export default StyleSheet.create({
    modal: {
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
    submit: {
        fontSize: 30,
        textAlign: 'center',
        margin: 5,
        color: colors.ink,
        justifyContent: 'flex-end',
        width: window.width,
        backgroundColor: colors.neutral,
    },
    container: {
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    map: {
        flex: 1,
        height: window.height,
        width: window.width,
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
    },
});
