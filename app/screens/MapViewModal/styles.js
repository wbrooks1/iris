import { StyleSheet, Dimensions, Platform } from 'react-native';
import { colors, style } from '../../config/styles';

var {height, width} = Dimensions.get('window')
export default StyleSheet.create({

    submit: {
        ...Platform.select({
        ios: {
            fontFamily: 'CenturySchL-Roma'
        },
        android: {
            fontFamily: 'centuryschl',

        },
    }),
        fontSize: style.largeFontSize,
        textAlign: 'center',
        color: colors.black,
        width: width,
    },
    container: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    map: {
        flex: 1,
        height: height,
        width: width,
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
    },
    submit_button: {
        backgroundColor: colors.sky,
        width: style.submitButtonWidth,
        height: style.submitButtonHeight,
        borderRadius: style.borderRadius,
        marginVertical: style.margin,
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'center',
        marginTop: height - 100,
    },
});
