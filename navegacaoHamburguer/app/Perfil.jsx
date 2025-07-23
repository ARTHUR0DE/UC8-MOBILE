import{Text, View, Image} from 'react-native'
import {styles}  from '../styles/styles'

export default function Perfil(){
    return(
        <View style={styles.containerPerfil}>
            <Image source={require('../assets/User.png')} style={styles.avatar} />

            <Text>Valtemir Procopio</Text>

            <Text style={styles.descricaoUsuario}>Professor do SENAC de informática</Text>3

            <View style={styles.divisor} />
        </View>
    )
}