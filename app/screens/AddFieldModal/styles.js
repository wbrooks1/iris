import { StyleSheet, Dimensions, Platform } from 'react-native';
import { colors, style } from '../../config/styles';

const window = Dimensions.get('window');
export default StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: colors.translucent,
        height: window.height,
        width: window.width,
    },
    rowContainer: {
        flexDirection: 'row',
        width: window.width - style.modalWidthDifference,
    },
    background: {
        backgroundColor: colors.translucent,
        height: window.height,
        width: window.width,
    },
    modal: {
        ...Platform.select({
            ios: {
                alignSelf: 'center',
            },
            android: {
                marginTop: window.height / 4,
                height: 275,
            },
        }),

        width: window.width - style.modalWidthDifference,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: colors.neutral,
        padding: style.padding,
        borderRadius: style.borderRadius,
        alignSelf: 'center',
        borderColor: colors.carbon,
        borderWidth: StyleSheet.hairlineWidth,
    },
    text_box: {
        backgroundColor: colors.white,
        borderRadius: style.borderRadius,
    },
    picker: {
        width: window.width - style.inputWidthDifference,
    },
    input: {
        height: style.textInputHeight,
        width: window.width - style.inputWidthDifference,
        fontSize: style.inputFontSize,
        borderRadius: style.inputBorderRadius,
        marginHorizontal: style.inputMarginHorizontal,
        paddingVertical: style.inputPaddingVertical,
        paddingHorizontal: style.inputPaddingHorizontal,
        alignSelf: "center"
    },
    title: {flex: 1,
        fontSize: style.titleFontSize,
        ...Platform.select({
            ios: {
                fontFamily: 'CenturySchL-Roma'
            },
            android: {
                fontFamily: 'centuryschl',

            },
        }),
        color: colors.black,
        textAlignVertical: 'center',
        textAlign: 'center',
        right: 40 / 2,
    },
    submitButtonText: {
        fontSize: style.largeFontSize,
        ...Platform.select({
            ios: {
                fontFamily: 'CenturySchL-Roma'
            },
            android: {
                fontFamily: 'centuryschl',

            },
        }),
        margin: style.margin,
        color: colors.black,
    },
    label: {
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
    },
    submit_button: {
        backgroundColor: colors.sky,
        width: 200,
        height: style.submitButtonHeight,
        borderRadius: style.borderRadius,
        marginVertical: style.margin,
        alignItems: 'center',
        justifyContent: 'center',
    },
    back_arrow: {
        width: 40,
        height: 40,
    },
});
