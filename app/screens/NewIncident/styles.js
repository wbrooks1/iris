import {StyleSheet, Dimensions} from 'react-native';
import {colors, style} from '../../config/styles';

var {height, width} = Dimensions.get('window')
export default StyleSheet.create({
    container: {
        flex: 1,
        alignSelf: 'center',
        backgroundColor: colors.neutral,
    },
    image: {
        width: width,
        height: style.headerImageSize,
        alignSelf: 'center',
        resizeMode: 'contain',
    },
    submit_text: {
        fontFamily: 'centuryschl',
        fontSize: style.largeFontSize,
        textAlign: 'center',
        color: colors.black,
        width: width,
    },
    header_text: {
        fontSize: style.titleFontSize,
        fontFamily: 'centuryschl',
        textAlign: 'center',
        margin: style.margin,
        color: colors.black,
    },
    add_field_text: {
        fontSize: style.titleFontSize,
        fontFamily: 'centuryschl',
        textAlign: 'left',
        margin: style.margin,
        color: colors.carbon,
    },
    footer: {
        alignItems: "flex-start",
        paddingLeft: style.padding,
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
    },
    back_arrow: {
        width: style.headerImageSize,
        height: style.headerImageSize,
        justifyContent: 'flex-start',
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
        fontFamily: 'centuryschl',
    },
    select: {
        backgroundColor: 'rgba(255, 255, 255, 0.5)',
        borderRadius: style.borderRadius,
        width: width - style.inputWidthDifference,
        borderColor: colors.white,
        alignSelf: 'center'
    },
    title: {
        fontSize: style.titleFontSize,
        fontFamily: 'centuryschl',
        textAlign: 'left',
        margin: style.titleMargin,
        color: colors.carbon,
        marginLeft: 30,
    },

});
