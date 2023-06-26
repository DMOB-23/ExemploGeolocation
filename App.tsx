import Geolocation from '@react-native-community/geolocation';
import { useEffect, useState } from 'react';
import { ActivityIndicator, View } from 'react-native';
import MapView, { Marker, enableLatestRenderer } from 'react-native-maps';

const App = () => {
  const [latitude, setLatitude] = useState(0);
  const [longitude, setLongitude] = useState(0);

  enableLatestRenderer();

  useEffect(() => {
    Geolocation.getCurrentPosition(
      response => {
        setLatitude(response.coords.latitude);
        setLongitude(response.coords.longitude);
      },
      error => {
        console.log(`Não foi possivel obter a localização: ${error.message}`);
      },
      {
        enableHighAccuracy: true,
        maximumAge: 0,
      },
    );
  }, []);

  if (latitude === 0) {
    return <ActivityIndicator style={{ flex: 1 }} />;
  }

  return (
    <View style={{ flex: 1 }}>
      <MapView
        style={{ flex: 1 }}
        provider="google"
        initialRegion={{
          latitude,
          longitude,
          latitudeDelta: 0.3,
          longitudeDelta: 0.3,
        }}>
        <Marker coordinate={{ latitude, longitude }} />
      </MapView>
    </View>
  );
};

export default App;
