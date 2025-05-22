import { StyleSheet } from 'react-native';

export const periodCalendarStyles = StyleSheet.create({
  container: {
    flex: 5,
    paddingTop: 20,
    backgroundColor: '#fff',
    justifyContent: 'space-between'
  },
  switchContainer: {
    marginTop: 100,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10
  },
  switchLabel: {
    fontSize: 14,
    color: '#333',
    marginRight: 10
  },
  legendContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 20,
    paddingVertical: 8
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    margin: 4
  },
  dot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginRight: 6
  },
  legendLabel: {
    fontSize: 12,
    color: '#333'
  },
});