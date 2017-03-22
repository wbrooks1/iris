import { StyleSheet, Dimensions } from 'react-native';
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
        fontFamily: 'centuryschl',
        textAlign: 'center',
        margin: style.margin,
        color: colors.black,
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
    list_desc: {
        fontSize: style.inputFontSize,
        fontFamily: 'centuryschl',
        color: colors.carbon,
    },
    list_title: {
        fontSize: style.titleFontSize,
        fontFamily: 'centuryschl',
        color: colors.black,
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
        // resizeMode: 'contain',
    },
});