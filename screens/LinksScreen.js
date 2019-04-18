import React from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { ExpoLinksView } from '@expo/samples';
import SimulateProcess from '../components/SimulateProcess';
import EChartsWrapper from '../components/EChartsWrapper';

export default class LinksScreen extends React.Component {
  static navigationOptions = {
    title: 'Links',
  };

  render() {
    return (
      <ScrollView style={styles.container}>
        {/* Go ahead and delete ExpoLinksView and replace it with your
           * content, we just wanted to provide you with some helpful links */}

        {/* <ExpoLinksView /> */}
        <SimulateProcess startTime={new Date()} duration={240}/>
        {/* <EChartsWrapper/> */}
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15,
    backgroundColor: '#fff',
  },
});
