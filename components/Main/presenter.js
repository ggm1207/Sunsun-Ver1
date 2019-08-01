import React, {Component} from 'react';
import { StyleSheet} from 'react-native';
import Group from '../Group';
import MainNavigator from '../navigator/ab';
import { NavigationActions } from 'react-navigation';

type Props = {};
export default class Main extends Component<Props> {
  render() {
    const { isLogined } = this.props;
    console.log('MainPresenter', isLogined);
    return (
      <MainNavigator />
    );
  }
}
