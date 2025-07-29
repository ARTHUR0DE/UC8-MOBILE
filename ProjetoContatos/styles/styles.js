import { StyleSheet } from "react-native";

export default StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fffbe6',
        padding: 16,
    },

    image: {
        width: '100%',
        height: 200,
    },

    title: {
        fontSize: 24,
        marginVertical: 12,
        color: 'red',
        textShadowColor: '#f67280',
        textShadowOffset: { width: 2, height: 2 },
        textShadowRadius: 1,
        textAlign: 'center'
    },

    description: {
        fontSize: 16,
        color: '#444',
        marginTop: 8,
        textAlign: 'center'
    },

    subContainer: {
        backgroundColor: 'white',
        borderRadius: 20,
        height: '100%',
        shadowColor: '#000',
        shadowOffset: {width: 1, height: 4},
        shadowOpacity: 0.3,
        shadowRadius: 4.65,
        elevation: 25
    },

    buttonView: {
        flex: 1,
        alignItems: 'center',
        marginTop: 15
    },

    button: {
        backgroundColor: '#f67280',
        paddingVertical: 12,
        paddingHorizontal: 24,
        borderRadius: 25,
        alignItems: 'center',
    },

    textButton: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 16
    },
    
    avatar: {
    width: 64,
    height: 64,
    borderRadius: 32,
    marginRight: 12,
    },

    card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffe4b5',
    padding: 10,
    marginVertical: 8,
    borderRadius: 10,
    },

})