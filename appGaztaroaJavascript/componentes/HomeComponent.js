import React, { Component } from 'react';
import { Text, ScrollView, View } from 'react-native';
import { Card } from '@rneui/themed';
import { baseUrl } from '../comun/comun';
import { connect } from 'react-redux';
import { IndicadorActividad } from './IndicadorActividadComponent';

function RenderItem(props) {
    
        const item = props.item;
        if (props.isLoading) {
            return <IndicadorActividad />;
          }
          if (props.errMess) {
            return (
              <View>
                <Text>{props.errMess}</Text>
              </View>
            );
          }
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
                <RenderItem
                item={this.props.cabeceras.cabeceras.filter(c => c.destacado)[0]}
                isLoading={this.props.cabeceras.isLoading}
                errMess={this.props.cabeceras.errMess}
                />

                <RenderItem
                item={this.props.excursiones.excursiones.filter(e => e.destacado)[0]}
                isLoading={this.props.excursiones.isLoading}
                errMess={this.props.excursiones.errMess}
                />

                <RenderItem
                item={this.props.actividades.actividades.filter(a => a.destacado)[0]}
                isLoading={this.props.actividades.isLoading}
                errMess={this.props.actividades.errMess}
                />

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