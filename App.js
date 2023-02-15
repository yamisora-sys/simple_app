import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { Alert } from 'react-native';
import LoadingOverlay from './components/UI/LoadingOverlay';
import AppRoot from './screens/AppRoot';
import { useStore } from './store/store';
import { initialDatabase } from './utils/database';

export default function App() {
  const [databaseLoading, setDatabaseLoading] = useState(true);
  const { loadPlacesAsync } = useStore().placeStore;

  useEffect(() => {
    (async () => {
      try {
        await initialDatabase();
        await loadPlacesAsync();

        setDatabaseLoading(false);
      } catch (error) {
        console.error(error);
        Alert.alert('Something went wrong with database...');
      }
    })();
  }, []);

  if (databaseLoading) {
    return <LoadingOverlay />;
  }

  return (
    <>
      <StatusBar style='dark' />

      <AppRoot />
    </>
  );
}
