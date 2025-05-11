import React, { Component } from 'react';
import { Text, ScrollView, View } from 'react-native';
import { Card } from '@rneui/themed';
import { baseUrl } from '../comun/comun';
import { connect } from 'react-redux';


function RenderItem(props) {
    
        const item = props.item;
        
        if (item != null) {
            return(
                <Card>
                    <Card.Image source={{ uri: baseUrl + item.imagen }} style={{ justifyContent: 'center', alignItems: 'center', height: 200 }}>
                        <Text style={{
                            color: 'white',
                            fontSize: 24,
                            fontWeight: 'bold',
                            backgroundColor: 'rgba(0, 0, 0, 0.5)',
                            paddingHorizontal: 10,
                            paddingVertical: 5,
                            borderRadius: 10
                            }}>
                            {item.nombre}
                        </Text>
                    </Card.Image>
                    <Text style={{margin: 20}}>
                        {item.descripcion}
                    </Text>
                </Card>
            );
        }
        else {
            return(<View></View>);
        }
}

class Home extends Component {

    

    render() {
        
        return(
            <ScrollView>
                <RenderItem item={this.props.cabeceras.cabeceras.filter((cabecera) => cabecera.destacado)[0]} />
                <RenderItem item={this.props.excursiones.excursiones.filter((excursion) => excursion.destacado)[0]} />
                <RenderItem item={this.props.actividades.actividades.filter((actividad) => actividad.destacado)[0]} />
            </ScrollView>
        );
    }
}

const mapStateToProps = state => {
    return {
      excursiones: state.excursiones,
      cabeceras: state.cabeceras,
      actividades: state.actividades
    };
  };
  
  export default connect(mapStateToProps)(Home);