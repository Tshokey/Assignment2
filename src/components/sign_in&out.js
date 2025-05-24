import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';

export default function AuthForm({ onLoginSuccess }) {
  const [isSignIn, setIsSignIn] = useState(true);
  const [formData, setFormData] = useState({
    name: '',
    gender: '',
    email: '',
    password: '',
  });

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{isSignIn ? 'Sign In' : 'Sign up a new user'}</Text>

      {!isSignIn && (
        <>
          <TextInput
            placeholder="Name"
            value={formData.name}
            onChangeText={(text) => setFormData({...formData, name: text})}
            style={styles.input}
          />
          <TextInput
            placeholder="Gender"
            value={formData.gender}
            onChangeText={(text) => setFormData({...formData, gender: text})}
            style={styles.input}
          />
        </>
      )}

      <TextInput
        placeholder="Email"
        value={formData.email}
        onChangeText={(text) => setFormData({...formData, email: text})}
        style={styles.input}
      />
      <TextInput
        placeholder="Password"
        value={formData.password}
        onChangeText={(text) => setFormData({...formData, password: text})}
        secureTextEntry
        style={styles.input}
      />

      {/* Add Sign In/Up + Clear buttons here */}

    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 16 },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 16 },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    marginBottom: 12,
    padding: 10,
    borderRadius: 6
  },
});
