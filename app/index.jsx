import { useState } from "react";
import { View, TouchableOpacity } from "react-native";
import {
  TextInput,
  List,
  Button,
  FAB,
  Modal,
  Text,
  PaperProvider,
} from "react-native-paper";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import Swipeable from "react-native-gesture-handler/ReanimatedSwipeable";
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
    console.log(todo);
  };
  return (
    <PaperProvider>
      <GestureHandlerRootView>
        <FAB
          icon="plus"
          style={{ position: "absolute", margin: 16, right: 0, bottom: 0 }}
          onPress={() => showModal()}
        />
        <View style={{ margin: 24 }}>
          <Text variant="titleLarge" style={{ marginBottom: 8 }}>
            Your To-Do List
          </Text>
          {todo.map((item, index) => (
            <TouchableOpacity key={index} onPress={() => console.log(item)}>
              <List.Item
                title={item.title}
                description={item.desc}
                left={(props) => <List.Icon {...props} icon="folder" />}
              />
            </TouchableOpacity>
          ))}
        </View>
        <Modal
          visible={openModal}
          onDismiss={hideModal}
          contentContainerStyle={{
            height: "40%",
            width: "80%",
            backgroundColor: "white",
            padding: 24,
            alignSelf: "center",
            borderRadius: 24,
          }}
        >
          <Text
            variant="titleLarge"
            style={{ alignSelf: "center", marginBottom: 8 }}
          >
            Add your ToDo
          </Text>
          <TextInput
            style={{ marginBottom: 8 }}
            label="What your todo"
            value={title}
            onChangeText={(text) => setTitle(text)}
          />
          <TextInput
            style={{ marginBottom: 8 }}
            label="Description"
            value={desc}
            onChangeText={(text) => setDesc(text)}
          />
          <View style={{ marginBottom: 8 }}>
            <Dropdown
              label="Status"
              placeholder="Select Status"
              options={OPTIONS}
              value={status}
              onSelect={setStatus}
            />
          </View>

          <Button
            icon="location-enter"
            mode="contained"
            onPress={() => submitTodo(title, desc, status)}
          >
            Press me
          </Button>
        </Modal>
      </GestureHandlerRootView>
    </PaperProvider>
  );
}
