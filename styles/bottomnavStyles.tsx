import { StyleSheet } from 'react-native';

export const bottomNavStyles = StyleSheet.create({
  footerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    height: 80,
    borderTopColor: '#eee',
    borderTopWidth: 1,
    backgroundColor: '#f9f9f9',
    paddingHorizontal: 10,
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
  footerItem: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    top:-9,
  },
  footerText: {
    fontSize: 12,
    color: '#555',
    marginTop: 2,
  },
  addButtonContainer: {
    position: 'absolute',
    bottom: 50,
    left: '50%',
    marginLeft: -28,
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#6C2EB9',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 5,
  },
  plusIcon: {
    color: '#fff',
  },
});