import { Text, Pressable, StyleSheet, ActivityIndicator } from 'react-native';
import { Colors } from '../../utils/constants';

export default function CustomButton({
  children,
  onPress,
  isLoading,
  mode,
  style,
  textStyle,
}) {
  const isFlat = mode === 'flat';
  return (
    <Pressable
      style={({ pressed }) => [
        styles.button,
        isFlat && styles.flatButton,
        pressed && styles.pressed,
        style,
      ]}
      onPress={onPress}
    >
      {!isLoading && (
        <Text style={[styles.text, isFlat && styles.flatText, textStyle]}>
          {children}
        </Text>
      )}
      {isLoading && <ActivityIndicator size={16} color={Colors.primary50} />}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    borderRadius: 4,
    padding: 8,
    backgroundColor: Colors.primary800,
    elevation: 2,
    shadowColor: 'black',
    shadowOpacity: 0.15,
    shadowOffset: { width: 1, height: 1 },
    shadowRadius: 2,
  },
  flatButton: {
    backgroundColor: 'transparent',
  },
  text: {
    textAlign: 'center',
    fontSize: 16,
    color: Colors.primary50,
  },
  flatText: {
    color: Colors.primary200,
  },
  pressed: {
    opacity: 0.7,
  },
});
