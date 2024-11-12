import { StyleSheet, Dimensions } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "white",
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  searchIcon: {
    marginRight: 10,
  },
  searchInput: {
    flex: 1, // Makes the SearchBar take the remaining space
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    paddingLeft: 10,
  },
  card: {
    width: Dimensions.get("window").width * 0.9,
    backgroundColor: "#EEEEEE",
    padding: 10,
    margin: 10,
    marginBottom: 20,
    borderRadius: 8,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 5,
    maxHeight: 350,
  },
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 5,
  },
  cardDateContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  cardDate: {
    fontSize: 14,
    color: "gray",
  },
  cardText: {
    fontWeight: "bold",
    fontSize: 18,
  },
  separator: {
    borderBottomColor: "#ccc",
    borderBottomWidth: 1,
    marginVertical: 5,
  },
  cardDescription: {
    marginBottom: 5,
    maxHeight: 60,
  },
  tagContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  tag: {
    backgroundColor: "#ddd",
    padding: 5,
    borderRadius: 5,
    marginRight: 5,
    marginTop: 5,
  },
  tagText: {
    fontSize: 12,
  },
  deleteButton: {
    padding: 5,
    borderRadius: 5,
    marginLeft: "auto",
    marginTop: 5,
  },
  deleteButtonText: {
    color: "red",
    fontSize: 12,
  },
  editButton: {
    padding: 5,
    borderRadius: 5,
    marginTop: 5,
  },
  editButtonText: {
    color: "blue",
    fontSize: 12,
  },
  bottomBar: {
    width: Dimensions.get("window").width, // Ensure it fully matches the screen width
    height: 70,
    position: "absolute",
    bottom: 0,
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    backgroundColor: "#ddd",
    paddingVertical: 10,
  },
  buttonContainer: {
    flex: 1,
    alignItems: "center",
  },
  pressable: {
    padding: 10,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modalView: {
    width: "90%",
    height: "70%",
    backgroundColor: "white",
    borderRadius: 10,
    padding: 20,
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalText: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  input: {
    width: "100%",
    padding: 10,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 5,
    marginBottom: 10,
  },
  eventNameInput: {
    width: "100%",
    padding: 10,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 5,
    marginBottom: 10,
  },
  nameOrgInput: {
    width: "100%",
    padding: 10,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 5,
    marginBottom: 10,
  },
  dateAndLocationInput: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  dateInput: {
    width: "48%",
    padding: 10,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 5,
    marginBottom: 10,
  },
  locationInput: {
    width: "48%",
    padding: 10,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 5,
    marginBottom: 10,
  },
  descriptionInput: {
    width: "100%",
    padding: 10,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 5,
    marginBottom: 10,
    height: 200,
  },
  tagSelectionContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginBottom: 10,
  },
  saveButton: {
    fontSize: 14, //cant change font size for some reason
    marginHorizontal: 5,
    borderRadius: 5,
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontSize: 14, // Smaller font size
  },
  cancelButton: {
    marginHorizontal: 5,
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 5,
    backgroundColor: "#FF0000",
    alignItems: "center",
  },
  cancelButtonText: {
    color: "white",
  },
  saveOrCancelButton: {
    paddingVertical: 0,
    flexDirection: "row",
    justifyContent: "flex-end",
    marginTop: 20,
    position: "absolute",
    bottom: 20,
    right: 20,
  },
  buttonContainerCard: {
    flexDirection: "row",
    justifyContent: "flex-end",
    position: "absolute",
    paddingStart: "55%",
    padding: 10,
    paddingBottom: 15,
  },
  tagAndButtonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
  },
  button: {
    backgroundColor: "blue",
    padding: 10,
    borderRadius: 5,
    width: "100%",
    alignItems: "center",
    marginTop: 10,
  },
  bookmarkIcon: {
    position: "absolute",
    justifyContent: "flex-end",
    right: 0,
    top: -15,
  },
  seeMoreText: {
    color: "blue",
  },
  communityItem: {
    padding: 16,
    backgroundColor: "#ffffff",
    borderRadius: 8,
    marginBottom: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3, // For Android shadow effect
  },
  communityName: {
    fontSize: 18,
    color: "#555",
  },
});

export default styles;
