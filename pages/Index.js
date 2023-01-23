import * as React from "react";
import { useFocusEffect } from "@react-navigation/native";
import { View, Text, Alert } from "react-native";
import {
  Provider as PaperProvider,
  List,
  IconButton,
  Divider,
  TextInput,
} from "react-native-paper";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { FlatList } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  updateRoutineID,
  updateWorkoutID,
  getAllData,
  setItem,
  getRoutine,
  removeItem,
  createID,
} from "./HandleData";

/*
  [[ID, RoutineName, [WorkoutName, etc.]], etc.]
*/
export default function HomeScreen({ navigation }) {
  const [routineName, setRoutineName] = React.useState("");
  const [workoutName, setWorkoutName] = React.useState("");
  const [all, setAll] = React.useState([]);

  React.useEffect(() => {
    // AsyncStorage.clear();
  }, []);

  useFocusEffect(
    React.useCallback(() => {
      showAllWorkouts();
      console.log("refocusing");
    }, [])
  );

  const addRoutine = async (id, routineName, newWorkout) => {
    await setItem(id, routineName, newWorkout);
    showAllWorkouts();
    setRoutineName("");
    setWorkoutName("");
  };

  //  this needs to be reworked to remove item from array
  const removeRoutine = (key) => {
    try {
      AsyncStorage.removeItem(key);
    } catch (e) {
      console.error("AsyncStorage#removeItem error: ", e.message);
    }
    console.log(key + " removed.");
  };

  const addWorkout = async (routineID, workoutName) => {
    let tempItem = await getRoutine(routineID);
    let tempArray = tempItem.workouts;
    let tempID = createID(tempArray, tempArray.length);
    let newItem = {
      id: tempID,
      wName: workoutName,
      sets: null,
    };

    addRoutine(routineID, tempItem.rName, newItem);
  };

  const showAllWorkouts = async () => {
    setAll(await getAllData());
    console.log(all);
  };

  return (
    <View
      style={{
        flex: 2,
        flexDirection: "column",
        justifyContent: "flex-start",
        padding: 5,
      }}
    >
      <SafeAreaView />

      {/* add button, input section, search button */}
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        <IconButton
          icon="plus-circle-outline"
          onPress={() => addRoutine(null, routineName, null)}
        />
        <TextInput
          style={{ flex: 3 }}
          mode="outlined"
          placeholder="Routine Name"
          value={routineName}
          onChangeText={(value) => setRoutineName(value)}
        />
      </View>

      <Divider />
      {/* routines accordion list */}
      <View>
        <FlatList
          data={all}
          renderItem={({ item }) => (
            <List.Accordion
              style={{ paddingLeft: 30 }}
              title={item.rName}
              key={item.id}
            >
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  paddingLeft: 30,
                }}
              >
                <IconButton
                  icon="plus-circle-outline"
                  onPress={() => addWorkout(item.id, workoutName)}
                />
                <TextInput
                  style={{ flex: 3 }}
                  mode="outlined"
                  placeholder="Workout Name"
                  value={workoutName}
                  onChangeText={(value) => setWorkoutName(value)}
                />
              </View>

              {/* list all workouts */}
              <View
                style={{
                  paddingLeft: 30,
                }}
              >
                {item.workouts.map((workout) => (
                  <View>
                    <List.Item
                      key={workout.id}
                      title={workout.wName}
                      onPress={() =>
                        navigation.navigate("Workout", {
                          routineID: item.id,
                          workout: workout,
                        })
                      }
                    />
                  </View>
                ))}
              </View>
            </List.Accordion>
          )}
          keyExtractor={(item) => item.id}
        />
      </View>
    </View>
  );
}
