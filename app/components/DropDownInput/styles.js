import {StyleSheet, Dimensions, Platform} from 'react-native';
import {colors, style} from '../../config/styles';

var {height, width} = Dimensions.get('window')
export default StyleSheet.create({
    title: {
        fontSize: style.titleFontSize,
        ...Platform.select({
        ios: {
            fontFamily: 'CenturySchL-Roma'
        },
        android: {
            fontFamily: 'centuryschl',

        },
    }),
        textAlign: 'left',
        margin: style.titleMargin,
        color: colors.carbon,
    },
    container: {
        flex: 1,
        width: window.width,
        marginHorizontal: style.containerMarginHorizontal,
        alignSelf: "center",
    },
    option_list: {
        width: width - style.inputWidthDifference,
        backgroundColor: colors.white,
        alignSelf: 'center',
        borderRadius: style.borderRadius,
        borderColor: colors.carbon,
    },
    option_list_text: {
        fontSize: style.inputFontSize,
        textAlign: 'left',
        margin: style.margin,
        color: colors.carbon,
        ...Platform.select({
        ios: {
            fontFamily: 'CenturySchL-Roma'
        },
        android: {
            fontFamily: 'centuryschl',

        },
    }),
    },
    select: {
        backgroundColor: colors.translucent,
        borderRadius: style.borderRadius,
        width: width - style.inputWidthDifference,
        borderColor: colors.white,
        alignSelf: 'center'
    },
});


