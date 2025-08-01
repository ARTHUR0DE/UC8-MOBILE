import { View, Text, Image } from 'react-native';
import styles from "../styles/styles.js"


export default function Information(route) {
    const item = route?.params?.item || {
        name: "Aplicativo de listar pokemon",
        photo: require("../assets/images/Pokebola.png"),
        info: "Este app é uma demonstração de navegação com React Native e Drawer"
    }
    
    return (
        <View style={styles.container}>
            <Image style={styles.image} source={item.photo} />

            <Text style={styles.title}> { item.name } </Text>
            <Text style={styles.description}> { item.info } </Text>
        </View>
    )
}