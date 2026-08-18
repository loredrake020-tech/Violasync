import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, ActivityIndicator } from 'react-native';
import { useSelector } from 'react-redux';

const HomeScreen = () => {
  const [loading, setLoading] = useState(false);
  const user = useSelector(state => state.user);

  useEffect(() => {
    // Fetch data on component mount
    setLoading(true);
    setTimeout(() => setLoading(false), 1000);
  }, []);

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Welcome to ViolaSync</Text>
      <Text style={styles.subtitle}>Home Screen</Text>
      {user && <Text style={styles.text}>User: {user.name}</Text>}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 18,
    color: '#666',
    marginBottom: 20,
  },
  text: {
    fontSize: 16,
    color: '#333',
  },
});

export default HomeScreen;