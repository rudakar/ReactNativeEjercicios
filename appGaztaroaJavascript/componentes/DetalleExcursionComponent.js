import React, { Component } from 'react';
import { Text, View,ScrollView } from 'react-native';
import { Card, Icon } from '@rneui/themed';
import { baseUrl } from '../comun/comun';
import { connect } from 'react-redux';

function RenderExcursion(props) {
    const excursion = props.excursion;
  
    if (excursion != null) {
      return (
        <Card>
          <Card.Image source={{ uri: baseUrl + excursion.imagen }} style={{ justifyContent: 'center', alignItems: 'center', height: 200 }}>
            <Text style={{
                color: 'white',
                fontSize: 24,
                fontWeight: 'bold',
                backgroundColor: 'rgba(0, 0, 0, 0.5)',
                paddingHorizontal: 10,
                paddingVertical: 5,
                borderRadius: 10
              }}>
              {excursion.nombre}
            </Text>
          </Card.Image>
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
                  excursion={this.props.excursiones.excursiones[id]}
                  favorita={this.state.favoritos.includes(id)}
                  onPress={() => this.marcarFavorito(id)}
                />
                <RenderComentario
                  comentarios={this.props.comentarios.comentarios.filter(c => c.excursionId === id)}
                />
              </ScrollView>
            );
          }
          
}

const mapStateToProps = state => {
  return {
    excursiones: state.excursiones,
    comentarios: state.comentarios
  };
};

export default connect(mapStateToProps)(DetalleExcursion);
