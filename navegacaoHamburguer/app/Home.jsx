import {View, Text, Image} from 'react-native'
import {styles} from '../styles/styles'

export default function Home(){
    return(
        <View style={styles.containerHome}>
            <Text style={styles.titulo}>Bem vindo ao App</Text>
            <Image style={styles.avatar} source={require('../assets/User.png')} />

            <Text style={styles.subtitulo}>Navegue usando o menu lateral </Text>


        </View>


    )
}