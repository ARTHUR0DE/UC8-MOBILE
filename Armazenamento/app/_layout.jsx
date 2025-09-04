import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  Alert,
  Keyboard,
} from "react-native";

import AsyncStorage from "@react-native-async-storage/async-storage";
import * as SecureStore from "expo-secure-store";
import * as FileSystem from "expo-file-system";

import styles from "../styles/styles";

const NOTES_KEY = "@NOTAS";
const PIN_KEY = "user_pin";

export default function App() {
  const [hasPin, setHasPin] = useState(null);
  const [pinInput, setPinInput] = useState("");
  const [pinStep, setPinStep] = useState("enter");
  const [tempPin, setTempPin] = useState("");
  const [nota, setNota] = useState("");
  const [notas, setNotas] = useState([]);
  const [editandoId, setEditandoId] = useState(null); // NOVO: controla o ID da nota em edição

  useEffect(() => {
    (async () => {
      try {
        const savedPin = await SecureStore.getItemAsync(PIN_KEY);
        setHasPin(!!savedPin);
        setPinStep(savedPin ? "enter" : "set");
      } catch (_error) {
        setHasPin(false);
        setPinStep("set");
      }
    })();
  }, []);

  useEffect(() => {
    (async () => {
      try {
        const raw = await AsyncStorage.getItem(NOTES_KEY);
        if (raw) setNotas(JSON.parse(raw));
      } catch (_error) {}
    })();
  }, []);

  const persistNotas = async (list) => {
    setNotas(list);
    try {
      await AsyncStorage.setItem(NOTES_KEY, JSON.stringify(list));
    } catch (_error) {
      Alert.alert("Erro", "Não foi possível salvar suas notas.");
    }
  };

  // NOVO: função para iniciar edição
  const editarNota = (notaObj) => {
    setNota(notaObj.text);
    setEditandoId(notaObj.id);
  };

  // ALTERADO: função para adicionar ou salvar edição
  const addNota = () => {
    const text = nota.trim();
    if (!text) return;

    if (editandoId) {
      // Atualiza nota existente
      const atualizadas = notas.map((n) =>
        n.id === editandoId ? { ...n, text } : n
      );
      persistNotas(atualizadas);
      setEditandoId(null); // Sai do modo edição
    } else {
      // Adiciona nova nota
      const nova = { id: Date.now().toString(), text };
      persistNotas([nova, ...notas]);
    }

    setNota("");
    Keyboard.dismiss();
  };

  const handlePinSubmit = async () => {
    const code = pinInput.trim();

    if (code.length < 4) {
      Alert.alert("PIN inválido", "Use pelo menos 4 dígitos.");
      return;
    }

    if (pinStep === "set") {
      setTempPin(code);
      setPinInput("");
      setPinStep("confirm");
      return;
    }

    if (pinStep === "confirm") {
      if (code !== tempPin) {
        Alert.alert("Não confere", "Os PINs não são iguais");
        return;
      }

      try {
        await SecureStore.setItemAsync(PIN_KEY, code, {
          keychainService: "appPin",
        });

        setHasPin(true);
        setPinStep("enter");
        setPinInput("");

        Alert.alert("Pronto", "PIN configurado com sucesso.");
      } catch (_error) {
        Alert.alert("Erro", "Não foi possível salvar o PIN");
      }
      return;
    }

    try {
      const savedPin = await SecureStore.getItemAsync(PIN_KEY);
      if (savedPin && code === savedPin) {
        setPinInput("");
        
      } else {
        Alert.alert("PIN incorreto", "Tente novamente.");
      }
    } catch (_error) {
      Alert.alert("Erro", "Falha ao verificar PIN.");
    }
  };

  if (hasPin === null) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Carregando…</Text>
      </View>
    );
  }

  if (!hasPin || pinStep !== "enter") {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>
          {pinStep === "set"
            ? "Crie um PIN"
            : pinStep === "confirm"
            ? "Confirme o PIN"
            : "Digite seu PIN"}
        </Text>

        <TextInput
          style={styles.input}
          value={pinInput}
          onChangeText={setPinInput}
          placeholder="PIN (mín. 4 dígitos)"
          keyboardType="numeric"
          secureTextEntry
          maxLength={10}
          placeholderTextColor="#fff"
        />

        <TouchableOpacity style={styles.button} onPress={handlePinSubmit}>
          <Text style={styles.buttonText}>
            {pinStep === "enter" ? "Entrar" : "Salvar PIN"}
          </Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Minhas Notas</Text>

      <View style={styles.row}>
        <TextInput
          style={[styles.input, { flex: 1 }]}
          value={nota}
          onChangeText={setNota}
          placeholder="Escreva uma nota…"
          returnKeyType="done"
          onSubmitEditing={addNota}
          placeholderTextColor="#fff" 
        />

        <TouchableOpacity style={styles.button} onPress={addNota}>
          <Text style={styles.buttonText}>
            {editandoId ? "Salvar" : "+"}
          </Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={notas}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ gap: 8, paddingVertical: 8 }}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.cardText}>{item.text}</Text>
            <TouchableOpacity onPress={() => editarNota(item)}>
              <Text style={styles.buttonText}>Editar</Text>
            </TouchableOpacity>
          </View>
        )}
        ListEmptyComponent={
          <Text style={styles.muted}>Nenhuma nota ainda.</Text>
        }
      />
    </View>
  );
}
