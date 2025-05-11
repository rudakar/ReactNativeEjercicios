import React, { Component } from 'react';
import { Text, ScrollView, StyleSheet } from 'react-native';
import { Card, ListItem, Avatar } from '@rneui/themed';
import { baseUrl } from '../comun/comun';
import { connect } from 'react-redux';
import { IndicadorActividad } from './IndicadorActividadComponent';


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
  

  render() {
    if (this.props.actividades.isLoading) {
      return (
        <ScrollView>
          <Historia />
          <Card>
            <Card.Title style={{ textAlign: 'center' }}>Actividades y recursos</Card.Title>
            <Card.Divider />
            <IndicadorActividad />
          </Card>
        </ScrollView>
      );
    }
  
    if (this.props.actividades.errMess) {
      return (
        <ScrollView>
          <Historia />
          <Card>
            <Card.Title style={{ textAlign: 'center' }}>Actividades y recursos</Card.Title>
            <Card.Divider />
            <Text>{this.props.actividades.errMess}</Text>
          </Card>
        </ScrollView>
      );
    }
  
    return (
      <ScrollView>
        <Historia />
        <Card>
          <Card.Title style={{ textAlign: 'center' }}>Actividades y recursos</Card.Title>
          <Card.Divider />
          {this.props.actividades.actividades.map((item, index) => (
            <ListItem key={index} bottomDivider>
              <Avatar source={{ uri: baseUrl + item.imagen }} />
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

const mapStateToProps = state => {
  return {
    actividades: state.actividades
  };
};

export default connect(mapStateToProps)(QuienesSomos);


