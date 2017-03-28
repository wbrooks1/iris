import {StyleSheet, Platform} from 'react-native';
import { colors, style } from '../../config/styles';

export default StyleSheet.create({
    button: {
        paddingVertical: style.buttonPadding,
        paddingHorizontal: style.buttonPadding,
        alignItems: 'center',
    },
    buttonText: {
        color: colors.carbon,
        ...Platform.select({
        ios: {
            fontFamily: 'CenturySchL-Roma'
        },
        android: {
            fontFamily: 'centuryschl',

        },
    }),
        fontSize: style.iconButtonFontSize,
        alignSelf: 'center',
    },
    buttonIcon: {
        width: style.iconButtonSize,
        height: style.iconButtonSize,
        justifyContent: 'center',
    },
    container: {
      justifyContent: 'center',
      alignItems: 'center',
    }
});
