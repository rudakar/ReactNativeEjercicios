import React, { Component } from 'react';
import { Text, View, ScrollView, Modal, Button, StyleSheet } from 'react-native';
import { Card, Icon, Input, Rating } from '@rneui/themed';
import { baseUrl } from '../comun/comun';
import { connect } from 'react-redux';
import { postFavorito, postComentario } from '../redux/ActionCreators';
import { AirbnbRating } from 'react-native-ratings';

const mapDispatchToProps = dispatch => ({
  postFavorito: (excursionId) => dispatch(postFavorito(excursionId)),
  postComentario: (excursionId, valoracion, autor, comentario) =>
    dispatch(postComentario(excursionId, valoracion, autor, comentario))
});

function RenderExcursion(props) {
  const excursion = props.excursion;

  if (excursion != null) {
    return (
      <Card>
        <Card.Image source={{ uri: baseUrl + excursion.imagen }} style={{ justifyContent: 'center', alignItems: 'center', height: 200 }}>
          <Text style={styles.cardTitle}>
            {excursion.nombre}
          </Text>
        </Card.Image>
        <Text style={{ margin: 20 }}>{excursion.descripcion}</Text>
        <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
          <Icon
            raised
            reverse
            name={props.favorita ? 'heart' : 'heart-o'}
            type='font-awesome'
            color='#f50'
            onPress={() =>
              props.favorita
                ? console.log('La excursión ya se encuentra entre las favoritas')
                : props.onPressFavorito()
            }
          />
          <Icon
            raised
            reverse
            name='pencil'
            type='font-awesome'
            color='#015afc'
            onPress={props.onPressFormulario}
          />
        </View>
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
      <AirbnbRating
        isDisabled
        defaultRating={comentario.valoracion}
        showRating={false}
        size={15}
        starContainerStyle={{ alignSelf: 'flex-start' }}
      />
      <Text style={{ fontSize: 12, marginTop: 4 }}>{`-- ${comentario.autor}, ${new Date(comentario.dia).toLocaleString()}`}</Text>
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
      valoracion: 5,
      autor: '',
      comentario: '',
      showModal: false
    };
  }

  toggleModal() {
    this.setState({ showModal: !this.state.showModal });
  }

  resetForm() {
    this.setState({
      valoracion: 5,
      autor: '',
      comentario: '',
      showModal: false
    });
  }

  gestionarComentario(excursionId) {
    this.props.postComentario(
      excursionId,
      this.state.valoracion,
      this.state.autor,
      this.state.comentario
    );
    this.resetForm();
  }

  marcarFavorito(excursionId) {
    this.props.postFavorito(excursionId);
  }

  render() {
    const { excursionId } = this.props.route.params;
    const id = +excursionId;

    return (
      <ScrollView>
        <RenderExcursion
          excursion={this.props.excursiones.excursiones[id]}
          favorita={this.props.favoritos.favoritos.includes(id)}
          onPressFavorito={() => this.marcarFavorito(id)}
          onPressFormulario={() => this.toggleModal()}
        />
        <RenderComentario
          comentarios={this.props.comentarios.comentarios.filter(c => c.excursionId === id)}
        />

        {/* Modal del formulario */}
        <Modal visible={this.state.showModal} animationType="slide" transparent={true}>
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
            <Rating
              showRating
              startingValue={5}
              imageSize={30}
              style={{ paddingVertical: 10 }}
              onFinishRating={value => this.setState({ valoracion: value })}
            />
            <Input
              placeholder="Autor"
              leftIcon={{ type: 'font-awesome', name: 'user' }}
              onChangeText={value => this.setState({ autor: value })}
            />
            <Input
              placeholder="Comentario"
              leftIcon={{ type: 'font-awesome', name: 'comment' }}
              onChangeText={value => this.setState({ comentario: value })}
            />
            <View style={{ margin: 10 }}>
              <Button
                title="Enviar"
                onPress={() => this.gestionarComentario(id)}
                color="#015afc"
              />
            </View>
            <View style={{ margin: 10 }}>
              <Button
                title="Cancelar"
                onPress={() => this.resetForm()}
                color="gray"
              />
            </View>
            </View>
          </View>
        </Modal>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.3)', // Fondo semitransparente si quieres
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    width: '90%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  cardTitle: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 10,
    position: 'absolute',
    top: '40%',
    alignSelf: 'center'
  }
  
  
});


const mapStateToProps = state => {
  return {
    excursiones: state.excursiones,
    comentarios: state.comentarios,
    favoritos: state.favoritos
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(DetalleExcursion);
