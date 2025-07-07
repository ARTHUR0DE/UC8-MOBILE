import {
  View,
  Text,
  Pressable,
  TextInput,
  StyleSheet,
  Image,
  Alert,
  FlatList,
} from "react-native";
import logo from "../assets/images/logo.png";
import { Colors } from "../constants/Colors";
import Task from "../components/Task";
import React, { useState } from "react";

const initialTasks = [{ id: 1, completed: true, text: "Estudar React Native" }];

export default function ListaDeTarefas() {
  const [tasks, setTasks] = useState(initialTasks);
  const [text, setNewTask] = useState("");

  const addTask = () => {
    const newTask = {
      id: tasks.length + 1,
      completed: false,
      text,
    };
    setTasks([...tasks, newTask]);
    setNewTask("");
    Alert.alert("Tarefa foi adicionada", `Você adicionou: ${text}`);
  };

  return (
    <View style={style.erickContainer}>
      <View style={style.mainContainer}>
        <View style={style.marlonContainer}>
          <Text style={style.estiloTitulo}>Minhas Tarefas</Text>
          <Image source={logo} style={style.imageEstilo} />
        </View>

        <View>
          <TextInput
            value={text}
            onChangeText={setNewTask}
            placeholder="Digitar tarefa"
            style={style.estiloInput}
            placeholderTextColor={"#fff"}
          />

          <Pressable
            onPress={addTask}
            style={({ pressed }) => [
              style.Pressionar,
              {
                backgroundColor: pressed ? "rgb(13, 103, 212)" : Colors.primary,
              },
            ]}
          >
            {({ pressed }) => (
              <Text
                style={[
                  style.textInput,
                  {
                    color: pressed ? "#fff000" : "#fff",
                    fontWeight: pressed ? "bold" : 500,
                  },
                ]}
              >
                Adicionar
              </Text>
            )}
          </Pressable>
        </View>
      </View>
      <FlatList style={style.listaAtividade}
        data={tasks}
        renderItem={({ item }) => (
          <Task text={item.text} initialCompleted={item.completed} />
        )}
      />
    </View>
  );
}

const style = StyleSheet.create({
  erickContainer: {
    backgroundColor: "#8A8383",
    flex: 1,
  },
  mainContainer: {
    marginTop: 100,
    marginHorizontal: 15,
  },
  imageEstilo: {
    width: 50,
    height: 50,
  },
  marlonContainer: {
    alignItems: "center",
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    gap: 15,
    backgroundColor: Colors.corDeFundo,
    // propriedade: deOndeVCimporta.OqueVCimporta
    padding: 10,
    borderRadius: 40,
  },
  estiloTitulo: {
    fontSize: 20,
    fontWeight: "bold",
    color: Colors.corDoTitulo,
  },
  estiloInput: {
    marginVertical: 20,
    borderWidth: 2,
    borderColor: "white",
    borderRadius: 30,
    padding: 15,
    color: "white",
  },
  Pressionar: {
    backgroundColor: Colors.primary,
    borderRadius: 50,
    padding: 15,
    alignItems: "center",
    justifyContent: "center",
  },
  textInput: {
    color: "#fff000",
    fontSize: 18,
  },
  listaAtividade:{
    width: '80%',
    backgroundColor: 'white',
    padding: 15, 
  }
});
