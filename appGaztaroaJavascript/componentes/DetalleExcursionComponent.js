import React, { Component } from 'react';
import { Text, View,ScrollView } from 'react-native';
import { Card, Icon } from '@rneui/themed';
import { EXCURSIONES } from '../comun/excursiones';
import { COMENTARIOS } from '../comun/comentarios';

function RenderExcursion(props) {
    const excursion = props.excursion;
  
    if (excursion != null) {
      return (
        <Card>
          <Card.Title style={{ color: 'chocolate', textAlign: 'center' }}>{excursion.nombre}</Card.Title>
          <Card.Divider />
          <Card.Image source={require('./imagenes/40Años.png')} />
          <Text style={{ margin: 20 }}>{excursion.descripcion}</Text>
          <Icon
            raised
            reverse
            name={props.favorita ? 'heart' : 'heart-o'}
            type='font-awesome'
            color='#f50'
            onPress={() =>
              props.favorita
                ? console.log('La excursión ya se encuentra entre las favoritas')
                : props.onPress()
            }
          />
        </Card>
      );
    } else {
      return <View />;
    }
  }
  
function RenderComentario(props) {
    const comentarios = props.comentarios;
  
    const renderComentarioItem = (comentario, index) => (
      <View key={index} style={{ margin: 10 }}>
        <Text style={{ fontSize: 14 }}>{comentario.comentario}</Text>
        <Text style={{ fontSize: 12 }}>{`-- ${comentario.autor}, ${new Date(comentario.dia).toLocaleString()}`}</Text>
      </View>
    );
  
    return (
      <Card>
        <Card.Title style={{ textAlign: 'center' }}>Comentarios</Card.Title>
        <Card.Divider />
        {comentarios.map(renderComentarioItem)}
      </Card>
    );
  }
  
class DetalleExcursion extends Component {
        constructor(props) {
            super(props);
            this.state = {
                excursiones: EXCURSIONES,
                comentarios: COMENTARIOS,
                favoritos: []
              };
              
        }
        marcarFavorito(excursionId) {
            this.setState({
              favoritos: this.state.favoritos.concat(excursionId)
            });
          }
          
          render() {
            const { excursionId } = this.props.route.params;
            const id = +excursionId;
          
            return (
              <ScrollView>
                <RenderExcursion
                  excursion={this.state.excursiones[id]}
                  favorita={this.state.favoritos.includes(id)}
                  onPress={() => this.marcarFavorito(id)}
                />
                <RenderComentario
                  comentarios={this.state.comentarios.filter(c => c.excursionId === id)}
                />
              </ScrollView>
            );
          }
          
}

export default DetalleExcursion;