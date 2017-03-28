import {StyleSheet, Dimensions, Platform} from 'react-native';
import {colors, style} from '../../config/styles';

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
    },
    title: {
        fontSize: style.largeFontSize,
        ...Platform.select({
        ios: {
            fontFamily: 'CenturySchL-Roma'
        },
        android: {
            fontFamily: 'centuryschl',

        },
    }),
        textAlign: 'center',
        margin: style.margin,
        color: colors.black,
    },
    image: {
        width: width,
        height: height / 3,
        resizeMode: 'contain',
        padding: style.margin,
        borderRadius: style.borderRadius,
    },
    activityIndicator: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        height: 80
    }
});
