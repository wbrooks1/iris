import {StyleSheet, Platform} from 'react-native';
import { colors, style } from '../../config/styles';

export default StyleSheet.create({
    button: {
        paddingHorizontal: style.buttonPadding,
    },
    buttonIcon: {
        width: style.homeButtonSize,
        height: style.homeButtonSize,
        justifyContent: 'center',
        resizeMode: 'contain',
    },
    container: {
        width: style.homeButtonSize,
        height: style.homeButtonSize,
        justifyContent: 'center',
        alignItems: 'center',
    }
});
