// import React from "react";
// // import * as SQLite from "expo-sqlite";
// import SQLite, {
//   DEBUG,
//   enablePromise,
//   openDatabase,
//   SQLiteDatabase,
// } from "react-native-sqlite-storage";

// // DEBUG(true);
// SQLite.enablePromise(true);

// const routinesDB = () =>
//   SQLite.openDatabase(
//     {
//       name: "routinesDB",
//       location: "default",
//     }
//     // () => {},
//     // (error) => {
//     //   console.log("ERROR on routinesDB: " + error);
//     // }
//   );

// // const workoutsDB = openDatabase(
// //   {
// //     name: "workoutsDB",
// //     location: "default",
// //   },
// //   () => {},
// //   (error) => {
// //     console.log("ERROR on workoutsDB: " + error);
// //   }
// // );

// // Check if the database exists, if not create it
// // const createRoutinesDatabase = () => {
// //   return new Promise(
// //     (resolve, reject) => {
// //     routinesDB.transaction((tx) => {
// //       tx.executeSql(
// //         "CREATE TABLE IF NOT EXISTS routines (routineID INTEGER PRIMARY KEY AUTOINCREMENT, routineName varchar(20), workoutID REFERENCES workouts(workoutID))"
// //       );
// //     })
// //     },
// //     (_, error) => {
// //       console.log("db error creating tables");
// //       console.log(error);
// //       reject(error);
// //     },
// //     (_, success) => {
// //       resolve(success);
// //     }
// //   );
// // };

// const createRoutinesDatabase = async (routinesDB) => {
//   const query =
//     "CREATE TABLE IF NOT EXISTS routines (routineID INTEGER PRIMARY KEY AUTOINCREMENT, routineName varchar(20), workoutID REFERENCES workouts(workoutID))";

//   await routinesDB.executeSql(query);
// };

// //  routines services
// // const getRoutines = () => {
// //   return new Promise(
// //     routinesDB.transaction(
// //       (tx) => {
// //         tx.executeSql("select * from routines", [], (tx, results) => {
// //           setRoutineFunc(results);
// //         });
// //       },
// //       (t, error) => {
// //         console.log("routineDB error load routines");
// //         console.log(error);
// //         createRoutinesDatabase();
// //         return getRoutines();
// //       },
// //       (_t, _success) => {
// //         console.log("loading routines");
// //       }
// //     )
// //   );
// // };

// // //   event handler for new routine creation
// // const insertRoutine = (newRoutine, successFunc) => {
// //   routinesDB.transaction(
// //     (tx) => {
// //       tx.executeSql(
// //         "INSERT INTO routines (routineID INTEGER PRIMARY KEY AUTOINCREMENT, routineName varchar(20)) values (?, ?)",
// //         newRoutine[0],
// //         newRoutine[1]
// //       );
// //     }
// //     // (t, error) => {
// //     //   console.log("db error insertRoutine");
// //     //   console.log(error);
// //     // },
// //     // (t, success) => {
// //     //   successFunc();
// //     // }
// //   );
// // };

// // //  event handler for deleting item from database
// // const deleteRoutine = (routineID) => {
// //   routinesDB.transaction(
// //     (tx) => {
// //       tx.executeSql("DELETE FROM routines WHERE id = ? ", [routineID]);
// //     }

// //     // (_, error) => {
// //     //   console.log("db error deleteRoutine");
// //     //   console.log(error);
// //     //   reject(error);
// //     // },
// //     // (_, success) => {
// //     //   resolve(success);
// //     // }
// //   );
// // };

// // //  event handler for updating routine in databse
// // const updateRoutine = (id, routineName) => {
// //   workoutsDb.transaction(
// //     (tx) => {
// //       tx.executeSql(
// //         "UPDATE routines SET routineName varchar(20) values (?) WHERE id = ?",
// //         [routineName],
// //         [id]
// //       );
// //     }
// //     // (t, error) => {
// //     //   console.log("db error updateRoutine");
// //     //   console.log(error);
// //     // },
// //     // (t, success) => {
// //     //   successFunc();
// //     // }
// //   );
// // };

// // wokouts services
// // Check if the database exists, if not create it
// const createWorkoutsDatabase = () => {
//   return new Promise(
//     (resolve, reject) => {
//       workoutsDB.transaction((tx) => {
//         tx.executeSql(
//           "CREATE TABLE IF NOT EXISTS workouts CREATE TABLE workouts(workoutID INTEGER PRIMARY KEY AUTOINCREMENT, workoutName varchar(20), workoutDate text, setNumber INTEGER, weight INTEGER, reps INTEGER, routineID INTEGER NOT NULL, FOREIGN KEY (routineID) REFERENCES routines(routineID))"
//         );
//       });
//     },
//     (_, error) => {
//       console.log("db error creating workout table");
//       console.log(error);
//       reject(error);
//     },
//     (_, success) => {
//       resolve(success);
//     }
//   );
// };

// //  get all workouts
// // const getWorkouts = (routineID, setWorkoutFunc) => {
// //   workoutsDB.transaction(
// //     (tx) => {
// //       tx.executeSql(
// //         "select * from workouts WHERE routineID = ?",
// //         routineID,
// //         [],
// //         (_, { rows: { _array } }) => {
// //           setWorkoutFunc(_array);
// //         }
// //       );
// //     },
// //     (t, error) => {
// //       console.log("db error loadWorkouts");
// //       console.log(error);
// //     },
// //     (_t, _success) => {
// //       console.log("loading workouts");
// //     }
// //   );
// // };

// // //   event handler for new routine creation
// // const insertWorkout = (newWorkout, successFunc) => {
// //   workoutsDB.transaction(
// //     (tx) => {
// //       tx.executeSql(
// //         "INSERT INTO workouts (workoutID INTEGER PRIMARY KEY AUTOINCREMENT, workoutName, workoutDate, setNumber, weight, reps, routineID FOREIGN KEY (routineID) REFERENCES routines(routineID)) VALUES (?, ?, ?, ?, ?, ?, ?)",
// //         newWorkout[0],
// //         newWorkout[1],
// //         newWorkout[2],
// //         newWorkout[3],
// //         newWorkout[4]
// //       );
// //     }
// //     // (t, error) => {
// //     //   console.log("db error insertWorkout");
// //     //   console.log(error);
// //     // },
// //     // (t, success) => {
// //     //   successFunc();
// //     // }
// //   );
// // };

// // //  event handler for deleting item from database
// // const deleteWorkout = (workoutID) => {
// //   workoutsDB.transaction((tx) => {
// //     tx.executeSql("DELETE FROM workouts WHERE id = ? ", [workoutID]);
// //   });
// // };

// // //  event handler for updating workout in databse
// // const updateWorkout = (id, workout) => {
// //   workoutsDb.transaction(
// //     (tx) => {
// //       tx.executeSql(
// //         "UPDATE workouts SET workoutName, workoutDate, setNumber, weight, reps, routineID FOREIGN KEY (routineID) REFERENCES routines (routineID) values (?, ?, ?, ?, ?, ?) WHERE id = ?",
// //         workout[0],
// //         workout[1],
// //         workout[2],
// //         workout[3],
// //         workout[4],
// //         workout[5],
// //         [id]
// //       );
// //     }
// //     // (t, error) => {
// //     //   console.log("db error updateWorkout");
// //     //   console.log(error);
// //     // },
// //     // (t, success) => {
// //     //   successFunc();
// //     // }
// //   );
// // };

// export {
//   createRoutinesDatabase,
//   // getRoutines,
//   // insertRoutine,
//   // deleteRoutine,
//   // updateRoutine,
//   createWorkoutsDatabase,
//   // getWorkouts,
//   // insertWorkout,
//   // deleteWorkout,
//   // updateWorkout,
// };
