import React from 'react';
import { View, TextInput } from 'react-native';

const SearchBar = ({ searchQuery, setSearchQuery, style }) => {
  return (
    <View style={style ? [styles.searchBarContainer, style] : styles.searchBarContainer}>
      <TextInput
        style={styles.searchInput}
        placeholder="Search events..."
        value={searchQuery}
        onChangeText={setSearchQuery}
      />
    </View>
  );
};

export default SearchBar;

const styles = {
  searchBarContainer: {
    width: "100%",
  },
  searchInput: {
    width: "100%",  // Ensure it stretches across available space
    height: 40,
    marginBottom: 15,
    paddingLeft: 10,
  }
};
