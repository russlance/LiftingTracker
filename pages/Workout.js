import React from "react";
import { View, Text, StyleSheet, Alert, BackHandler } from "react-native";
import {
  Provider as PaperProvider,
  IconButton,
  Modal,
  Portal,
  Divider,
  DataTable,
  TextInput,
} from "react-native-paper";
import { Calendar, CalendarList } from "react-native-calendars";
import * as dateFns from "date-fns";
import { getRoutine, setItem } from "./HandleData";

export default function Workout({ route, navigation }) {
  const { routineID, workout } = route.params;
  const [displayDate, setDisplayDate] = React.useState();
  const [showCalendar, setCalendarModel] = React.useState(false);
  const [showSetModal, setSetModal] = React.useState(false);
  const [editItem, setEditItem] = React.useState([]);
  const [weight, setWeight] = React.useState(null);
  const [reps, setReps] = React.useState(null);
  const [counter, setCounter] = React.useState(1);
  const [sets, setSets] = React.useState([]);

  React.useEffect(() => {
    console.log("Workout Page");
    updateDate(null);
    console.log(displayDate);
    displayInfo();
  }, []);

  const displayInfo = () => {
    if (workout.sets === null) {
      console.log("empty");
      setSets([]);
      // } else handleDate();
    } else setSets(workout.sets);
  };

  //  populates table with sets based on display date
  const handleDate = () => {
    let flag = 0;
    workout.sets.map((set) => {
      console.log("set date: " + set.date);
      console.log("display date: " + displayDate);
      if (set.date === displayDate) {
        setSets(set);
        flag = 1;
      }
    });
    if (flag === 0) setSets([]);
  };

  const addSet = async () => {
    if (weight === null || reps === null)
      Alert.alert("Hey!", "Enter some numbers!");
    else {
      let tempSet = {
        id: sets.length + 1,
        date: displayDate,
        weight: weight,
        reps: reps,
      };
      let tempFullList = sets;
      tempFullList.push(tempSet);
      setSets(tempFullList);
      console.log(sets);
      workout.sets = sets;

      //  get the routine this workout is part of
      //  get the workouts from that routine
      //  update the sets for this workout
      let routine = await getRoutine(routineID);
      let routineWorkouts = routine.workouts;
      routineWorkouts.map((rw) => {
        if (rw.id === workout.id) rw = JSON.stringify(workout);
      });

      //  save the routine again, with the updated workout
      setItem(JSON.stringify(routine.id), routine.rName, routineWorkouts);
      setWeight(null);
      setReps(null);
    }
  };

  const editName = async (newName) => {
    workout.wName = newName;
    let routine = await getRoutine(routineID);
    setItem(JSON.stringify(routine.id), routine.rName, routineWorkouts);
  };

  const removeSet = (index) => {
    // let tempFullList = this.state.sets;
    let tempFullList = sets;
    tempFullList.splice(index - 1, 1);
    setSets(tempFullList);
    // this.setState({
    //   allSets: tempFullList,
    // });
  };

  const selectItemToEdit = (display, item) => {
    addToSets(item);
    setSetModal(display);
  };

  const addToSets = (item) => {
    let tempItem = setSets[item - 1];
    setEditItem(tempItem);
  };

  const updateSet = (item, newWeight, newReps) => {
    // let tempArray = this.state.sets;
    let tempArray = sets;
    let tempItem = tempArray[item[0] - 1];
    tempItem[1] = newWeight;
    tempItem[2] = newReps;
    tempArray[item[0] - 1] = tempItem;
    setSets(tempArray);
    setSetModal(false);
    // this.setState({
    //   allSets: tempArray,
    // });
    // this.showSetEditModal(false);
  };

  const updateDate = (newDate) => {
    if (newDate === null) newDate = new Date();
    else newDate = newDate.timestamp;

    setDisplayDate(dateFns.format(newDate, "LLL d, yy"));
    setCalendarModel(false);
  };

  return (
    <View
      style={{
        padding: 3,
        flex: 2,
        flexDirection: "column",
        justifyContent: "flex-start",
      }}
    >
      {/* save button, calendar button, displayed date */}
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        {/* <IconButton icon="content-save-outline" /> */}
        <Text
          style={{
            paddingLeft: 2,
            fontWeight: "bold",
            fontSize: 22,
          }}
        >
          {displayDate}
        </Text>
        {/* <IconButton
          icon="calendar-range-outline"
          onPress={() => setCalendarModel(true)}
        /> */}
      </View>
      <Divider />

      {/* workout name and edit section */}
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        <Text
          style={{
            fontSize: 20,
            flex: 2,
            paddingHorizontal: 10,
          }}
        >
          {workout.wName}
        </Text>
        <IconButton icon="pencil-outline" />
      </View>
      <Divider />

      {/* add new set section */}
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-around",
          paddingBottom: 5,
          paddingTop: 5,
        }}
      >
        <IconButton icon="plus-circle-outline" onPress={() => addSet()} />

        <TextInput
          style={{ flex: 0.3, textAlign: "center" }}
          mode="outlined"
          placeholder="Weight"
          value={weight}
          // label={weight}
          onChangeText={(newWeight) => setWeight(newWeight)}
          keyboardType="number-pad"
        />
        <TextInput
          style={{ flex: 0.3, textAlign: "center" }}
          mode="outlined"
          placeholder="Reps"
          value={reps}
          // label={reps}
          onChangeText={(newReps) => setReps(newReps)}
          keyboardType="number-pad"
        />
      </View>
      <Divider />

      {/* workout details */}
      <View>
        <DataTable>
          <DataTable.Header>
            <DataTable.Title>Date</DataTable.Title>
            <DataTable.Title>Weight</DataTable.Title>
            <DataTable.Title>Reps</DataTable.Title>
            <DataTable.Title>Edit</DataTable.Title>
          </DataTable.Header>

          {sets.map((entry) => (
            <DataTable.Row key={entry.id}>
              <DataTable.Cell>{entry.date}</DataTable.Cell>
              <DataTable.Cell>{entry.weight}</DataTable.Cell>
              <DataTable.Cell>{entry.reps}</DataTable.Cell>
              <DataTable.Cell>
                <IconButton
                  icon="delete-outline"
                  onChangeText={(newReps) => setReps(newReps)}
                />
                {/* <IconButton
                  icon="pencil-outline"
                  onPress={() => selectItemToEdit(true, entry[0])}
                /> */}
              </DataTable.Cell>
            </DataTable.Row>
          ))}
        </DataTable>
      </View>

      <Portal>
        {/* calendar modal */}
        <Modal
          style={styles.container}
          visible={showCalendar}
          onDismiss={() => setCalendarModel(false)}
        >
          <Calendar onDayPress={(day) => updateDate(day)} />
        </Modal>

        {/* set edit modal  */}
        <Modal
          style={styles.container}
          visible={showSetModal}
          onDismiss={() => setSetModal(false)}
        >
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-around",
            }}
          >
            <Text>Weight: {editItem[1]}</Text>
            <Text>Reps: {editItem[2]}</Text>
          </View>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-around",
              paddingBottom: 5,
              paddingTop: 5,
            }}
          >
            <TextInput
              style={{ flex: 0.3, textAlign: "center" }}
              value={weight}
              onChangeText={(newWeight) => {
                setWeight(newWeight);
              }}
              keyboardType="number-pad"
              mode="outlined"
            />
            <TextInput
              style={{ flex: 0.3, textAlign: "center" }}
              value={reps}
              onChangeText={(newReps) => {
                setReps(newReps);
              }}
              keyboardType="number-pad"
              mode="outlined"
            />
          </View>
          <IconButton
            icon="content-save-outline"
            onPress={() => {
              updateSet(editItem, weight, reps);
            }}
          />
        </Modal>
      </Portal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    marginTop: 300,
  },
});
