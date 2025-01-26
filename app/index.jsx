import { useState } from "react";
import { View, TouchableOpacity, StyleSheet, Animated } from "react-native";
import {
  TextInput,
  List,
  Button,
  FAB,
  Modal,
  Text,
  PaperProvider,
} from "react-native-paper";
import {
  GestureHandlerRootView,
  Swipeable,
} from "react-native-gesture-handler";
import { Dropdown } from "react-native-paper-dropdown";

export default function Index() {
  const [openModal, setopenModal] = useState(false);
  const showModal = () => setopenModal(true);
  const hideModal = () => setopenModal(false);
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [status, setStatus] = useState("");
  const [todo, setTodo] = useState([]);

  const OPTIONS = [
    { label: "Todo", value: "Todo" },
    { label: "On Progress", value: "On Progress" },
    { label: "Completed", value: "Completed" },
  ];

  const submitTodo = (title, desc, status) => {
    const newObj = {
      title: title,
      desc: desc,
      status: status,
    };
    setTodo([...todo, newObj]);
    setTitle("");
    setDesc("");
    setStatus("");
    setopenModal(false);
  };

  // Swipeable
  const renderRightActions = (progress, dragX, itemId) => {
    const trans = dragX.interpolate({
      inputRange: [0, 50, 100],
      outputRange: [0, 0.5, 1],
    });

    return (
      <View style={styles.swipeContainer}>
        {/* Delete Button */}
        <TouchableOpacity
          style={[styles.rightSwipe, styles.deleteSwipe]}
          onPress={() => handleDelete(itemId)}
        >
          <Animated.Text
            style={[styles.swipeText, { transform: [{ translateX: trans }] }]}
          >
            Delete
          </Animated.Text>
        </TouchableOpacity>
      </View>
    );
  };

  const renderLeftActions = (progress, dragX, itemId) => {
    const trans = dragX.interpolate({
      inputRange: [0, 50, 100],
      outputRange: [0, 0.5, 1],
    });

    return (
      <View style={styles.swipeContainer}>
        {/* Edit Button */}
        <TouchableOpacity
          style={[styles.leftSwipe, styles.editSwipe]}
          onPress={() => handleEdit(itemId)}
        >
          <Animated.Text
            style={[styles.swipeText, { transform: [{ translateX: trans }] }]}
          >
            Edit
          </Animated.Text>
        </TouchableOpacity>
      </View>
    );
  };

  const handleDelete = (index) => {
    setTodo(todo.filter((_, i) => i !== index));
  };

  const handleEdit = (index) => {
    // Implement your edit logic here
    showModal();
    console.log("Edit item:", todo[index]);
  };

  return (
    <PaperProvider>
      <GestureHandlerRootView style={styles.container}>
        <FAB icon="plus" style={styles.fab} onPress={showModal} />
        <View style={styles.content}>
          <Text variant="titleLarge" style={styles.title}>
            Your To-Do List
          </Text>
          {todo.map((item, index) => (
            <Swipeable
              key={index}
              renderRightActions={(progress, dragX) =>
                renderRightActions(progress, dragX, index)
              }
              renderLeftActions={(progress, dragX) =>
                renderLeftActions(progress, dragX, index)
              }
              onSwipeableOpen={(direction) => {
                if (direction === "right") handleDelete(index);
                if (direction === "left") handleEdit(index);
              }}
            >
              <TouchableOpacity
                onPress={() => console.log(item)}
                style={styles.listItemContainer}
              >
                <View style={styles.listItem}>
                  <List.Icon
                    icon="file-document-outline"
                    style={styles.listIcon}
                  />
                  <View style={styles.textContainer}>
                    <Text numberOfLines={1} style={styles.itemTitle}>
                      {item.title}
                    </Text>
                    <Text
                      numberOfLines={1}
                      ellipsizeMode="tail"
                      style={styles.itemDescription}
                    >
                      {item.desc}
                    </Text>
                  </View>
                  <View
                    style={[
                      styles.statusContainer,
                      { backgroundColor: getStatusColor(item.status) },
                    ]}
                  >
                    <Text style={styles.statusText}>{item.status}</Text>
                  </View>
                </View>
              </TouchableOpacity>
            </Swipeable>
          ))}
        </View>
        <Modal
          visible={openModal}
          onDismiss={hideModal}
          contentContainerStyle={styles.modal}
        >
          <View style={styles.modalContent}>
            <Text variant="titleLarge" style={styles.modalTitle}>
              Add your ToDo
            </Text>
            <TextInput
              style={styles.input}
              label="Todo title"
              value={title}
              onChangeText={setTitle}
              mode="outlined"
            />
            <TextInput
              style={styles.input}
              label="Description"
              value={desc}
              onChangeText={setDesc}
              mode="outlined"
            />
            <View style={styles.dropdownContainer}>
              <Dropdown
                label="Status"
                placeholder="Select Status"
                options={OPTIONS}
                value={status}
                onSelect={setStatus}
                mode="outlined"
              />
            </View>
            <Button
              mode="contained"
              onPress={() => submitTodo(title, desc, status)}
              style={styles.button}
              labelStyle={styles.buttonLabel}
            >
              Add Task
            </Button>
          </View>
        </Modal>
      </GestureHandlerRootView>
    </PaperProvider>
  );
}

const getStatusColor = (status) => {
  switch (status) {
    case "Todo":
      return "#4A90E2"; // Soft blue
    case "On Progress":
      return "#F5A623"; // Warm orange
    case "Completed":
      return "#7ED321"; // Fresh green
    default:
      return "#9B9B9B"; // Neutral gray
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8F9FA",
  },
  content: {
    padding: 16,
  },
  title: {
    marginBottom: 24,
    fontWeight: "700",
    color: "#2D3436",
  },
  listItemContainer: {
    marginBottom: 8,
  },
  listItem: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    padding: 16,
    borderRadius: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  listIcon: {
    marginRight: 12,
    color: "#636E72",
  },
  textContainer: {
    flex: 1,
    marginRight: 12,
    minWidth: 0, // Crucial for text truncation
  },
  itemTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#2D3436",
    marginBottom: 4,
  },
  itemDescription: {
    fontSize: 14,
    color: "#636E72",
    opacity: 0.9,
  },
  statusContainer: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    minWidth: 100,
    maxWidth: 120,
    justifyContent: "center",
    alignItems: "center",
  },
  statusText: {
    color: "#FFFFFF",
    fontWeight: "600",
    fontSize: 12,
  },
  fab: {
    position: "absolute",
    margin: 24,
    right: 0,
    bottom: 0,
    backgroundColor: "#4A90E2",
  },
  modal: {
    width: "90%",
    alignSelf: "center",
    backgroundColor: "white",
    borderRadius: 16,
    paddingVertical: 24,
  },
  modalContent: {
    paddingHorizontal: 24,
  },
  modalTitle: {
    textAlign: "center",
    marginBottom: 24,
    fontWeight: "700",
    color: "#2D3436",
  },
  input: {
    marginBottom: 16,
    backgroundColor: "#F8F9FA",
  },
  dropdownContainer: {
    marginBottom: 24,
  },
  button: {
    borderRadius: 8,
    backgroundColor: "#4A90E2",
    paddingVertical: 4,
  },
  buttonLabel: {
    color: "#FFFFFF",
    fontWeight: "600",
  },
});
