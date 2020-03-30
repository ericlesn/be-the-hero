import React from 'react';
import {View, Text, Image, TouchableOpacity, Linking} from 'react-native';
import { Feather } from '@expo/vector-icons';
import {useNavigation, useRoute} from '@react-navigation/native';
import * as MailComposer from 'expo-mail-composer';

import logoImg from '../../assets/logo.png';
import styles from './styles';
import api from '../../services/api'

export default function Detail(){
    const navigation = useNavigation();
    const message = `Olá, ${incident.name} estou entrando em contato pois gostaria de ajudar no caso ${incident.title} com o valor de ${Intl.NumberFormat('pt-BR', { style: 'currency', currency:'BRL'}).format(incident.value)}`
    const route = useRoute();

    const incident = route.params.incident;
 
    function navigateBack(){
        navigation.goBack();
    }

    function sendMail(){
        MailComposer.composeAsync({
            subject: `Héroi do caso:${incident.title}`,
            recipients:['ericlesnunes1@gmail.com'],
            body: message,
        })
    }

    function sendWhatsapp(){
        Linking.openURL(`whatsapp://send?phone=${incident.whatsapp}&text=${message}`)
    }

    return(
        <View style={styles.container}>
        <View style={styles.header}>
            <Image source={logoImg}/>
            <TouchableOpacity onPress={navigateBack}>
                <Feather name="arrow-left" size={28} color="#E02041" />
            </TouchableOpacity>
        </View>
        <View style={styles.incident}>
        <Text style={styles.incidentProperty}>ONG:</Text>
                    <Text style={styles.incidentValue}>{incident.name} de {incident.city}/{incident.uf} </Text>

                    <Text style={styles.incidentProperty}>CASO:</Text>
                    <Text style={styles.incidentValue}>{incident.title} </Text>

                    <Text style={styles.incidentProperty}>VALOR:</Text>
                    <Text style={styles.incidentValue}>
                        {Intl.NumberFormat('pt-BR',
                        { style: 'currency', 
                        currency:'BRL'
                        }).format(incident.value)}
                    </Text>
        </View>
        <View style={styles.contactBox}>
            <Text style={styles.heroTitle}>Salve o dia!</Text>
            <Text style={styles.incidentProperty}>Seja o heroi desse caso.</Text>

            <Text style={styles.heroDescription}>ONG</Text>
            <View style={styles.actions}>
            <TouchableOpacity style={styles.action} onPress={sendWhatsapp}>
                <Text style={styles.actionText}>Whatsapp</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.action} onPress={sendMail}>
                <Text style={styles.actionText}>E-mail</Text>
            </TouchableOpacity>
            </View>
        </View>
    </View>
    )
}