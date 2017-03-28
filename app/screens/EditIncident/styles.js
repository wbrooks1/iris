import { StyleSheet, Dimensions, Platform } from 'react-native';
import { colors, style } from '../../config/styles';

var {height, width} = Dimensions.get('window')
export default StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: colors.neutral,
    },
    row_container: {
        flex: -1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: colors.neutral,
    },
    title: {
        fontSize: style.titleFontSize,
        textAlign: 'center',
        margin: style.margin,
        color: colors.black,
        ...Platform.select({
        ios: {
            fontFamily: 'CenturySchL-Roma'
        },
        android: {
            fontFamily: 'centuryschl',

        },
    }),
    },
    image: {
        width: width,
        height: style.headerImageSize,
        justifyContent: 'flex-start',
        resizeMode: 'contain',
    },
    save_text: {
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
    list_container: {
        borderRadius: style.borderRadius,
    },
    submit_button: {
        backgroundColor: colors.sky,
        width: style.submitButtonWidth,
        height: style.submitButtonHeight,
        borderRadius: style.borderRadius,
        marginVertical: style.margin,
        alignItems: 'center',
        justifyContent: 'center',
    },
    back_arrow: {
        width: style.headerImageSize,
        height: style.headerImageSize,
        justifyContent: 'flex-start',
    },
});
