import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Flatlist,
  Alert,
  TouchableOpacity,
  Animated,
  PanResponder,
  Vibration,
} from "react-native";
import { fetchAllCitizens, deleteCitizen } from "../../db/db";
import styles from "../../styles/historyStyles";
import { MaterialIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

function ModernListItem({ item, onEdit, onDelete }) {
  const [isLongPressed, setIsLongPressed] = useState(false);
  const pan = new Animated.Value(0);
  const opacity = new Animated.Value(1);
  const scale = new Animated.Value(1);

  const panResponder = PanResponder.create({
    onMoveShouldSetPanResponder: (evt, gestureState) => {
      return Math.abs(gestureState.dx) > 20;
    },
    onPanResponderMove: (evt, gestureState) => {
      if (gestureState.dx < 0) {
        pan.setValue(Math.max(gestureState.dx, -120));
      }
    },
    onPanResponderRelease: (evt, gestureState) => {
      if (gestureState.dx < -60) {
        Animated.spring(pan, {
          toValue: -120,
          useNativeDriver: false,
        }).start();
      } else {
        Animated.spring(pan, {
          toValue: 0,
          useNativeDriver: false,
        }).start();
      }
    },
  });

  const handleLongPress = () => {
    setIsLongPressed(true);
    Vibration.vibrate(50);

    Animated.sequence([
      Animated.timing(scale, {
        toValue: 0.95,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(scale, {
        toValue: 1,
        duration: 100,
        useNativeDriver: true,
      }),
    ]).start();

    Alert.alert(
      "Ações",
      `O que deseja fazer com ${item.name}`,
      [
        {
          text: "Editar",
          onPress: () => {
            setIsLongPressed(false);
            onEdit();
          },
          style: "default",
        },
        {
          text: "Excluir",
          onPress: () => {
            setIsLongPressed(false);
            handleDeleteWithAnimation();
          },
          style: "destructive",
        },
        {
          text: "Cancelar",
          onPress: () => setIsLongPressed(false),
          style: "cancel",
        },
      ],
      {
        cancelable: true,
        onDismiss: () => setIsLongPressed(false),
      }
    );
  };

  const handleDeleteWithAnimation = () => {
    Alert.alert("Confirmar", "Deseja excluir o cadastro?", [
      { text: "Cancelar", style: "cancel" },
      {
        text: "Excluir",
        style: "destructive",
        onPress: () => {
          Animated.parallel([
            Animated.timing(opacity, {
              toValue: 0,
              duration: 300,
              useNativeDriver: true,
            }),
            Animated.timing(scale, {
              toValue: 0.8,
              duration: 300,
              useNativeDriver: true,
            }),
          ]).start(() => {
            onDelete();
          });
        },
      },
    ]);
  };

  const resetPosition = () => {
    Animated.spring(pan, {
      toValue: 0,
      useNativeDriver: false,
    }).start();
  };

  return <View style={styles.itemContainer}>
    <View style = { styles.actionsBackground}>
        <TouchableOpacity
            style={[styles.actionButton, {backgroundColor: "#3B82F6"}]}
            onPress={()=>{
                resetPosition();
                onEdit();
            }}
        >
            <MaterialIcons name="edit" size={20} color="#fff"/>
        </TouchableOpacity>
        <TouchableOpacity
            style={[styles.actionButton, {backgroundColor: "#ef4444"}]}
            onPress={()=>{
                resetPosition();
                handleDeleteWithAnimation();
            }}
        >
            <MaterialIcons name="delete" size={20} color="#fff"/>
        </TouchableOpacity>
    </View>

    <Animated.View
        style={[
            {
                transform: [{translateX: pan}]
            }
        ]}
        {...panResponder.panHandlers}
    >
        <Animated.View
            style={[
                styles.item, 
                {
                    transform: [{ scale: scale}],
                    opacity: opacity,
                    backgroundColor: isLongPressed ? "#f3f4f6" : "#fff"
                }
            ]}
        >
            <TouchableOpacity
                style={{ flex: 1, flexDirection: "row", alignItems: "center"}}
                delayLongPress={400}
                activeOpacity={0.7}
               >
                <View style={{flex: 1}}>
                    <Text style={}>{item.name}</Text>
                </View>
            </TouchableOpacity>

        </Animated.View>

    </Animated.View>



  </View>;
}
