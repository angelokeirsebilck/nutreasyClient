import React, { useEffect, useLayoutEffect } from 'react';
import { StyleSheet, Text, View, BackHandler, Button } from 'react-native';
import { connect } from 'react-redux';

import { PRIMARY_COLOR } from '../config/theme';
import { logout } from '../actions/auth';
import { setBmr, loadProfile } from '../actions/profile';
import Food from '../components/home/Food';

import { withNavigation } from 'react-navigation';

const HomeScreen = ({ auth, navigation, profile, BMR, setBmr, loadProfile }) => {
  useEffect(() => {
    if (!auth.isAuthenticated) {
      navigation.navigate('Landing');
    }
    BackHandler.addEventListener('hardwareBackPress', () => true);

    // Load profile when homescreen is focus on init.
    const isFocused = navigation.isFocused();
    if (isFocused) {
      loadProfile();
    }

    // Load profile when homescreen is focused when switching screens.
    const navFocusListener = navigation.addListener('didFocus', () => {
      loadProfile();
    });

    return () => {
      navFocusListener.remove();
    };
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Nutreasy</Text>
      {BMR !== null ? <Food BMR={BMR} /> : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 50,
    marginHorizontal: 20,
  },
  title: {
    fontSize: 32,
    fontFamily: 'Roboto_700Bold',
    textAlign: 'center',
    color: PRIMARY_COLOR,
    marginBottom: 20,
  },
});

const mapStateToProps = (state) => ({
  auth: state.auth,
  profile: state.profile.profile,
  BMR: state.profile.BMR,
});

HomeScreen.navigationOptions = () => {
  return {
    title: 'Nutreasy',
    headerLeft: () => null,
    headerTitleStyle: {
      color: PRIMARY_COLOR,
      fontFamily: 'Roboto_700Bold',
    },
  };
};
export default withNavigation(
  connect(mapStateToProps, { logout, setBmr, loadProfile })(HomeScreen)
);