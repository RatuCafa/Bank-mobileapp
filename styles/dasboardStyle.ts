import { StyleSheet, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');
const cardWidth = (width - 60) / 3; // Menghitung lebar untuk 3 kolom dengan margin

export const dasboardStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F6FA',
  },
  headerBackground: {
    backgroundColor: '#9A7B62', // Warna coklat dari gambar
    height: 180,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    paddingTop: 50,
    paddingHorizontal: 20,
  },
  headerTopInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },
  greetingText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '500',
  },
  notificationIcon: {
    backgroundColor: 'rgba(255,255,255,0.2)',
    padding: 8,
    borderRadius: 50,
  },
  cardContainer: {
    marginTop: -80, // Menarik kartu ke atas agar menumpuk dengan header
    paddingHorizontal: 20,
  },
  creditCard: {
    backgroundColor: '#827361',
    borderRadius: 15,
    padding: 20,
    height: 180,
    justifyContent: 'space-between',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    overflow: 'hidden',
  },
  cardShape: {
    position: 'absolute',
    right: -40,
    top: -20,
    width: 150,
    height: 150,
    borderRadius: 75,
    backgroundColor: '#E7B874',
    opacity: 0.8,
  },
  cardTitle: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  cardType: {
    color: '#E0E0E0',
    fontSize: 12,
    marginTop: 20,
  },
  cardNumberContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 5,
  },
  cardNumber: {
    color: '#FFFFFF',
    fontSize: 16,
    letterSpacing: 2,
    marginRight: 10,
  },
  cardBottom: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
  },
  cardBalance: {
    color: '#FFFFFF',
    fontSize: 22,
    fontWeight: 'bold',
  },
  cardLogo: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
    fontStyle: 'italic',
  },
  menuGridContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    padding: 20,
    marginTop: 10,
  },
  menuItem: {
    width: cardWidth,
    backgroundColor: '#FFFFFF',
    borderRadius: 15,
    padding: 15,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 15,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    height: 100,
  },
  iconContainer: {
    marginBottom: 10,
  },
  menuText: {
    fontSize: 11,
    color: '#707070',
    textAlign: 'center',
  },
});
