import { StyleSheet } from 'react-native';

const camera = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    height: 40,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontWeight: 'bold',
    fontSize: 16,
    color: '#000000',
        marginLeft: 10,
  },
  camera: {
    flex: 1,
    width: '100%', 
    height: '100%', 
  },
  topControls: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 30,
  },
  controls: {
    flex: 0.5,
  },
  goBackButton: {},
  image: {
    height: 600,
    width: 600,
  },
});

export default camera;