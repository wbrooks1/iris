import { StyleSheet } from 'react-native';
import { colors } from '../../config/styles';

export default StyleSheet.create({
    button: {
        paddingVertical: 10,
        paddingHorizontal: 20,
        margin: 5,
        alignItems: 'center',
    },
    buttonText: {
        color: colors.buttonText,
        fontSize: 20,
        fontWeight: '500',
        justifyContent: 'center',
    },
    buttonIcon: {
        width: 50,
        height: 50,
        marginTop: 5,
        justifyContent: 'center',
    },
});