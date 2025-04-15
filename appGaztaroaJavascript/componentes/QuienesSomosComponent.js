import React, { Component } from 'react';
import { Text, ScrollView, StyleSheet } from 'react-native';
import { Card, ListItem, Avatar } from '@rneui/themed';
import { ACTIVIDADES } from '../comun/actividades';

// Componente funcional para la historia
function Historia() {
  return (
    <Card>
      <Card.Title style={{ textAlign: 'center' }}>Un poquito de historia</Card.Title>
      <Card.Divider />
      <Text style={{ margin: 10 }}>
        El nacimiento del club de montaña Gaztaroa se remonta a la primavera de 1976 cuando jóvenes aficionados a la montaña y pertenecientes a un club juvenil decidieron crear la sección montañera de dicho club. Fueron unos comienzos duros debido sobre todo a la situación política de entonces. Gracias al esfuerzo económico de sus socios y socias se logró alquilar una bajera. Gaztaroa ya tenía su sede social.{'\n\n'}
        Desde aquí queremos hacer llegar nuestro agradecimiento a todos los montañeros y montañeras que alguna vez habéis pasado por el club aportando vuestro granito de arena.{'\n'}
        ¡Gracias!
      </Text>
    </Card>
  );
}

class QuienesSomos extends Component {
  constructor(props) {
    super(props);
    this.state = {
      actividades: ACTIVIDADES
    };
  }

  render() {
    return (
      <ScrollView>

        {/* Tarjeta de historia */}
        <Historia />

        {/* Espacio entre tarjetas */}
        <Text style={{ marginTop: 20 }} />

        {/* Tarjeta de actividades */}
        <Card>
          <Card.Title style={{ textAlign: 'center' }}>Actividades y recursos</Card.Title>
          <Card.Divider />

          {this.state.actividades.map((item, index) => (
            <ListItem key={index} bottomDivider>
              <Avatar source={require('./imagenes/40Años.png')} />
              <ListItem.Content>
                <ListItem.Title>{item.nombre}</ListItem.Title>
                <ListItem.Subtitle>{item.descripcion}</ListItem.Subtitle>
              </ListItem.Content>
            </ListItem>
          ))}
        </Card>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  tituloSeccion: {
    fontSize: 20,
    color: '#015afc',
    textAlign: 'center',
    fontWeight: 'bold',
    marginVertical: 10
  }
});

export default QuienesSomos;
