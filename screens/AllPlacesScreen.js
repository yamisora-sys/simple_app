import { observer } from 'mobx-react-lite';
import { FlatList, View, Text, StyleSheet } from 'react-native';
import PlaceItem from '../components/Places/PlaceItem';
import { useStore } from '../store/store';
import { Colors } from '../utils/constants';

export default observer(function AllPlacesScreen() {
  const { places } = useStore().placeStore;

  if (!places?.length)
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyText}>
          No places added yet - start adding some!
        </Text>
      </View>
    );
  return (
    <FlatList
      data={places}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => <PlaceItem place={item} />}
      style={styles.container}
    />
  );
});

const styles = StyleSheet.create({
  container: {
    margin: 24,
  },
  emptyContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyText: {
    fontSize: 16,
    color: Colors.primary200,
  },
});
