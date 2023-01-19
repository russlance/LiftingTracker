import AsyncStorage from "@react-native-async-storage/async-storage";
import { Alert } from "react-native";

export const getAllData = async () => {
  try {
    let keys = await AsyncStorage.getAllKeys();
    if (keys.length > 0) {
      const result = keys.map(async (key) => {
        let tempItem = await getRoutine(key);
        let newItem = {
          id: key,
          rName: tempItem.rName,
          workouts: tempItem.workouts,
        };
        return newItem;
      });
      return await Promise.all(result);
    } else return [];
  } catch (e) {
    console.error("AsyncStorage#getAllData error: " + e.message);
  }
};

export const setItem = async (id, routineName, newWorkout) => {
  if (routineName.length < 1) {
    Alert.alert("Hey!", "Enter a Routine Name!");
  } else {
    try {
      let routineID = 0;
      let workoutID = 0;
      let newArray = [];
      //  if it is new routine, give it a new id and sample workout
      //  if not, get the routine's id and workouts
      if (newWorkout == null) {
        routineID = await updateRoutineID();
        newWorkout = { id: workoutID, wName: "Sample Workout", sets: null };
      } else {
        let tempItem = await getRoutine(id);
        newArray = tempItem.workouts;
        routineID = id;
      }

      //  add the new workout to the list of workouts
      newArray.push(newWorkout);
      let newItem = {
        id: workoutID,
        rName: routineName,
        workouts: newArray,
      };

      let _tempArray = JSON.stringify(newItem);
      let idString = routineID.toString();
      await AsyncStorage.setItem(idString, _tempArray);
    } catch (e) {
      console.error("AsyncStorage#setItem error: " + e.message);
    }
  }
};

export const getRoutine = async (key) => {
  return AsyncStorage.getItem(key).then((result) => {
    if (result) {
      try {
        return JSON.parse(result);
      } catch (e) {
        console.error(
          "AsyncStorage#getItem error deserializing JSON for key: " + key,
          e.message
        );
      }
    }
  });
};

export const createID = (tempArray, id) => {
  let flag = 0;
  for (let i = 0; i < tempArray.length; i++) {
    if (id === tempArray[i]) flag = 1;
  }
  if (flag > 0) createID(tempArray, id++);
  return id;
};

const updateRoutineID = async () => {
  let tempNum = 0;
  let routineIDs = await AsyncStorage.getAllKeys();
  if (routineIDs.length > 0) {
    for (let routineID in routineIDs) {
      let n = parseInt(routineID);
      if (n > tempNum) tempNum = n;
      if (n === tempNum) tempNum++;
    }
  }
  return tempNum;
};

const updateWorkoutID = async (workoutArray, id) => {
  workoutArray.map((item) => {
    let n = parseInt(item.id);
    if (n === id) updateWorkoutID(workoutArray, id++);
  });
  return id;
};
