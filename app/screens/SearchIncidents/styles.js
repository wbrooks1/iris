import { StyleSheet, Dimensions, Platform } from 'react-native';
import { colors, style } from '../../config/styles';

var {height, width} = Dimensions.get('window')
export default StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.neutral,
    },
    row_container: {
        flexDirection: 'row',
        padding: style.listRowPadding,
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
        })
    },
    icon: {
        width: style.listRowIconSize,
        height: style.listRowIconSize,
        marginRight: style.margin,
    },
    separator: {
        height: StyleSheet.hairlineWidth,
        backgroundColor: '#8E8E8E',
    },
    search_box: {
        backgroundColor: colors.sky,
        padding: style.listRowPadding,
        flex: 1,
        borderRadius: style.borderRadius,
    },
    list_desc: {
        fontSize: style.inputFontSize,
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
    list_title: {
        fontSize: style.titleFontSize,
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
    input: {
        height: style.headerImageSize,
        flex: 1,
        paddingHorizontal: style.listRowPadding,
        fontSize: style.titleFontSize,
        backgroundColor: '#FFFFFF',
        borderRadius: style.inputBorderRadius,
    },
    image: {
        width: width,
        height: style.headerImageSize,
        justifyContent: 'flex-start',
        resizeMode: 'contain',
    },
    back_arrow: {
        width: style.headerImageSize,
        height: style.headerImageSize,
        justifyContent: 'flex-start',
    },
});
