import React, { Component } from 'react';
import { ListItem, Avatar } from '@rneui/themed';
import { SafeAreaView, FlatList } from 'react-native';
import { baseUrl } from '../comun/comun';
import { connect } from 'react-redux';
import { IndicadorActividad } from './IndicadorActividadComponent';

class Calendario extends Component {
    render() {
        const { navigate } = this.props.navigation;
      
        const renderCalendarioItem = ({ item }) => {
          return (
            <ListItem
              onPress={() => navigate('DetalleExcursion', { excursionId: item.id })}
              bottomDivider>
              <Avatar source={{ uri: baseUrl + item.imagen }} />
              <ListItem.Content>
                <ListItem.Title>{item.nombre}</ListItem.Title>
                <ListItem.Subtitle>{item.descripcion}</ListItem.Subtitle>
              </ListItem.Content>
            </ListItem>
          );
        };
      
        if (this.props.excursiones.isLoading) {
          return <IndicadorActividad />;
        }
      
        if (this.props.excursiones.errMess) {
          return (
            <View>
              <Text>{this.props.excursiones.errMess}</Text>
            </View>
          );
        }
      
        return (
          <SafeAreaView>
            <FlatList
              data={this.props.excursiones.excursiones}
              renderItem={renderCalendarioItem}
              keyExtractor={(item) => item.id.toString()}
            />
          </SafeAreaView>
        );
      }
      
}
const mapStateToProps = state => {
    return {
      excursiones: state.excursiones
    };
  };
  
  export default connect(mapStateToProps)(Calendario);
  
  