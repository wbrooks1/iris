import { StyleSheet } from 'react-native';
import { colors } from '../../config/styles';

export default StyleSheet.create({
    button: {
        paddingVertical: 20,
        paddingHorizontal: 20,
        alignItems: 'center',
    },
    buttonText: {
        color: colors.buttonText,
        fontSize: 14,
        alignSelf: 'center',
    },
    buttonIcon: {
        width: 60,
        height: 60,
        justifyContent: 'center',
    },
    container: {
      justifyContent: 'center',
      alignItems: 'center',
    }
});
