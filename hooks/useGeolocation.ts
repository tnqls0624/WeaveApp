
import { useState, useEffect } from 'react';
import type { Location } from '../types';

interface GeolocationState {
  position: Location | null;
  error: string | null;
}

const useGeolocation = (): GeolocationState => {
  const [state, setState] = useState<GeolocationState>({
    position: null,
    error: null,
  });

  useEffect(() => {
    if (!navigator.geolocation) {
      setState(prevState => ({ ...prevState, error: 'Geolocation is not supported by your browser.' }));
      return;
    }

    const watcher = navigator.geolocation.watchPosition(
      (pos) => {
        setState({
          position: {
            latitude: pos.coords.latitude,
            longitude: pos.coords.longitude,
          },
          error: null,
        });
      },
      (err) => {
        setState(prevState => ({ ...prevState, error: err.message }));
      },
      {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 0,
      }
    );

    return () => navigator.geolocation.clearWatch(watcher);
  }, []);

  return state;
};

export default useGeolocation;
