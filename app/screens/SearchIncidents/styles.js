import { StyleSheet, Dimensions } from 'react-native';
import { colors } from '../../config/styles';

var {height, width} = Dimensions.get('window')
//TODO change all of this.
export default StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.neutral,
    },
    row_container: {
        flexDirection: 'row',
        padding: 10,
        backgroundColor: colors.neutral,
    },
    title: {
        fontSize: 20,
        fontFamily: 'centuryschl',
        textAlign: 'center',
        margin: 10,
        color: colors.black,
    },
    icon: {
        width: 60,
        height: 60,
        marginRight: 10,
    },
    separator: {
        height: StyleSheet.hairlineWidth,
        backgroundColor: '#8E8E8E',
    },
    search_box: {
        backgroundColor: colors.sky,
        padding: 10,
        flex: 1,
        borderRadius: 10,
    },
    list_desc: {
        fontSize: 16,
        fontFamily: 'centuryschl',
        color: colors.carbon,
    },
    list_title: {
        fontSize: 20,
        fontFamily: 'centuryschl',
        color: colors.black,
    },
    input: {
        height: 50,
        flex: 1,
        paddingHorizontal: 8,
        fontSize: 20,
        backgroundColor: '#FFFFFF',
        borderRadius: 2,
    },
    image: {
        width: width,
        height: 50,
        justifyContent: 'flex-start',
        resizeMode: 'contain',
    },
    back_arrow: {
        width: 50,
        height: 50,
        justifyContent: 'flex-start',
        resizeMode: 'contain',
    },
});