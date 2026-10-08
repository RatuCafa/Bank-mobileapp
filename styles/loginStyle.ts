import { StyleSheet } from 'react-native';

// Menerapkan External Styles
export const loginStyles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: '#F5F5DC', // Warna beige/pasir
    justifyContent: 'center',
  },
  headerText: {
    fontSize: 32,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 8,
    color: '#8B4513',
  },
  subHeaderText: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 30,
    color: '#A0522D',
  },
  input: {
    height: 50,
    borderColor: '#DEB887',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 16,
    marginBottom: 16,
    backgroundColor: '#FFFFFF',
    fontSize: 16,
  },
  loginButton: {
    backgroundColor: '#D2691E',
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
    elevation: 3, // Shadow untuk Android
  },
  loginButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  featureSection: {
    marginTop: 40,
    paddingTop: 20,
    borderTopWidth: 1,
    borderColor: '#DEB887',
  },
  featureHeading: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 12,
    color: '#8B4513',
  }
});