import Cookies from 'js-cookie';
import { createContext, useReducer, useEffect, useState } from 'react';
import debounce from 'lodash.debounce';
import axios from 'axios';
import { getError } from './error';
export const ACTIONS = {
  DATE_FORWARDS: 'date-forwards',
  DATE_BACKWARDS: 'date-backwards',
  DATE_TODAY: 'date-today',
  SET_CURRENT_DATE: 'set-current-date',
  SET_STICKY_NOTES: 'set-stickynotes',
  ADD_NOTE: 'add-note',
  EDIT_NOTE: 'edit-note',
  SET_NOTE_INDEXES: 'set-note-indexes',
  ADD_NOTE_INDEX: 'add-note-index',
  DEL_NOTE_INDEX: 'delete-note-index',
  CHANGE_NOTE_POS: 'change-note-pos',
  CHANGE_NOTE_SIZE: 'change-note-size',
  DELETE_NOTE: 'delete-note',
  ADD_FOLDER: 'add-folder',
  EDIT_FOLDER_SETTINGS: 'edit-folder-settings',
  EDIT_FOLDER_LASTACCESSED: 'edit-folder-lastaccessed',
  EDIT_FOLDER_SLUG: 'edit-folder-slug',
  DELETE_FOLDER: 'delete-folder',
  SET_FOLDERS: 'set-folders',
  SET_FOLDER_INDEXES: 'set-folder-indexes',
  SET_INVITED_FOLDERS: 'set-invited-folders',
  ADD_TODO_CATEGORY: 'add-todo-category',
  ADD_TODO: 'add-todo',
  TOGGLE_TODO: 'toggle-todo',
  DELETE_TODO: 'delete-todo',
  SET_TODOS: 'set-todos',
  SET_TODOCATEGORY: 'set-todocategory',
  ADD_TODOPARAMETER: 'add-todoparameter',
  DELETE_TODOPARAMETER: 'delete-todoparameter',
  EDIT_TODOPARAMETER: 'edit-todoparameter',
  ADD_TODONOTE: 'add-todonote',
  MERGE_TODOS: 'merege-todos',
  ADD_ACTIVITY: 'add-act',
  TOGGLE_ACTIVITY: 'toggle-act',
  DELETE_ACTIVITY: 'delete-act',
  SET_ACTIVITIES: 'set-activities',
  ADD_ACTIVITYPARAMETER: 'add-actparameter',
  ADD_ACTIVITYNOTE: 'add-actnote',
  ADD_REFLECTION: 'add-reflection',
  EDIT_REFLECTION: 'edit-reflection',
  SET_WEEKLYPLANNERS: 'set-weekly-planners',
  SET_QUESTIONNAIRES: 'set-questionnaires',
  SET_HOWSYOURDAY: 'set-hows-your-day',
  SET_EXTRALOGS: 'set-extralogs',
  SET_STATE: 'set-state',
  SET_REGSTATE: 'set-regstate',
  SET_DAYLOGS: 'set-daylogs',
  SET_DAYLOG: 'set-daylog',
  SET_DAYLOG_MAIN: 'set-daylog-main',
  SET_RECENT_SAVETODOS: 'set-recent-savetodos',
};

export const Store = createContext();

const d = new Date();
let date = new Date(
  Date.UTC(
    d.toLocaleDateString().split('/')[2],
    parseInt(d.toLocaleDateString().split('/')[0]) - 1,
    d.toLocaleDateString().split('/')[1],
    0,
    0,
    0
  )
);
date.setDate(date.getDate() + 1);

const initialState = {
  //   darkMode: Cookies.get('darkMode') === 'ON' ? true : false,
  notes: [], //stickynotes
  stickynote_gridindexes: { firstload: true, indexes: [] },
  weeklyplanners: [],
  todos: [],
  tdcategories: ['Work', 'Personal'],
  recenttodolistsave: [],
  activities: [],
  reflections: [],
  howsyourdaylogs: [],
  extralogs: [],
  folders: [],
  invitedfolders: [],
  daylogs: [],
  userInfo: Cookies.get('userInfonavcloud')
    ? JSON.parse(Cookies.get('userInfonavcloud'))
    : null,
  currentdate: new Date(date),
  todaysdate: new Date(date),
};

function reducer(state, action) {
  switch (action.type) {
    // case 'DARK_MODE_ON':
    //   return { ...state, darkMode: true };
    // case 'DARK_MODE_OFF':
    //   return { ...state, darkMode: false };
    case ACTIONS.DATE_FORWARDS:
      let tomorrow = new Date(state.currentdate);
      tomorrow.setDate(tomorrow.getDate() + 1);
      return { ...state, currentdate: tomorrow };
    case ACTIONS.DATE_BACKWARDS:
      let yesterday = new Date(state.currentdate);
      yesterday.setDate(yesterday.getDate() - 1);
      return { ...state, currentdate: yesterday };
    case ACTIONS.SET_CURRENT_DATE:
      let newdate = action.payload.date;
      let olddate = new Date(state.currentdate);
      // console.log(newdate, olddate);
      let diffTime = newdate - olddate;
      let diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      olddate.setDate(olddate.getDate() + diffDays);
      return {
        ...state,
        currentdate: new Date(olddate),
      };
    case ACTIONS.DATE_TODAY:
      return { ...state, currentdate: state.todaysdate };
    //STICKY NOTES
    //STICKY NOTES
    //STICKY NOTES
    //STICKY NOTES

    case ACTIONS.SET_STICKY_NOTES:
      return {
        ...state,
        notes: action.payload.notes,
      };
    case ACTIONS.ADD_NOTE:
      let newNote = action.payload;
      return { ...state, notes: [...state.notes, newNote] };
    case ACTIONS.EDIT_NOTE:
      return {
        ...state,
        notes: state.notes.map((note) => {
          if (note.name === action.payload.name) {
            return { ...note, stuff: action.payload.stuff };
          }
          return note;
        }),
      };

    case ACTIONS.SET_NOTE_INDEXES:
      return {
        ...state,
        stickynote_gridindexes: action.payload,
      };

    case ACTIONS.ADD_NOTE_INDEX:
      return {
        ...state,
        stickynote_gridindexes: {
          firstload: false,
          indexes: [
            ...state.stickynote_gridindexes.indexes,
            action.payload.index,
          ],
        },
      };

    case ACTIONS.DEL_NOTE_INDEX:
      return {
        ...state,
        stickynote_gridindexes: {
          firstload: false,
          indexes: stickynote_gridindexes.indexes.filter((el) => {
            el == action.payload.index;
          }),
        },
      };

    case ACTIONS.CHANGE_NOTE_POS:
      return {
        ...state,
        notes: state.notes.map((note) => {
          if (note.name === action.payload.name) {
            return {
              ...note,
              x: action.payload.x,
              y: action.payload.y,
            };
          }
          return note;
        }),
      };
    case ACTIONS.CHANGE_NOTE_SIZE:
      return {
        ...state,
        notes: state.notes.map((note) => {
          if (note.name === action.payload.name) {
            return {
              ...note,
              width: action.payload.width,
              height: action.payload.height,
            };
          }
          return note;
        }),
      };
    case ACTIONS.DELETE_NOTE:
      return {
        ...state,
        notes: state.notes.filter((note) => note.name != action.payload.name),
      };
    ///FOLDERS
    ///FOLDERS
    ///FOLDERS
    ///FOLDERS

    case ACTIONS.ADD_FOLDER:
      let newFolder = action.payload;
      return { ...state, folders: [...state.folders, newFolder] };

    case ACTIONS.EDIT_FOLDER_SETTINGS:
      return {
        ...state,
        folders: state.folders.map((folder) => {
          if (folder._id === action.payload._id) {
            return {
              ...folder,
              name: action.payload.name,
              private: action.payload.private,
              category: action.payload.category,
            };
          }
          return folder;
        }),
      };
    case ACTIONS.EDIT_FOLDER_SLUG:
      return {
        ...state,
        folders: state.folders.map((folder) => {
          if (folder._id === action.payload._id) {
            return {
              ...folder,
              slug: action.payload.slug,
            };
          }
          return folder;
        }),
      };
    case ACTIONS.EDIT_FOLDER_LASTACCESSED:
      return folders.map((folder) => {
        if (folder.name === action.payload.name) {
          return { ...folder, lastaccessed: action.payload.lastaccessed };
        }
        return folder;
      });
    case ACTIONS.DELETE_FOLDER:
      return {
        ...state,
        folders: state.folders.filter(
          (folder) => folder._id !== action.payload._id
        ),
      };
    case ACTIONS.SET_FOLDERS:
      return { ...state, folders: action.payload.folders };
    case ACTIONS.SET_FOLDER_INDEXES:
      return {
        ...state,
        folders: state.folders.map((folder) => {
          return {
            ...folder,
            index: action.payload.folderorder.indexOf(folder.name),
          };
        }),
      };
    case ACTIONS.SET_INVITED_FOLDERS:
      return { ...state, invitedfolders: action.payload.folders };

    //Todos
    //Todos
    //Todos
    //Todos
    case ACTIONS.ADD_TODO:
      let newTodo = action.payload;
      console.log(newTodo);
      if (action.payload.name.trim().length >= 1) {
        let duplicate = state.todos.some((todo) => todo.name === newTodo.name);
        if (duplicate) {
          return state;
        } else {
          return { ...state, todos: [...state.todos, newTodo] };
        }
      }
    case ACTIONS.TOGGLE_TODO:
      return {
        ...state,
        todos: state.todos.map((todo) => {
          if (todo.name === action.payload.name) {
            return { ...todo, complete: !todo.complete };
          }
          return todo;
        }),
      };
    case ACTIONS.ADD_TODOPARAMETER:
      let newParameter = action.payload.parameter;
      return {
        ...state,
        todos: state.todos.map((todo) => {
          if (todo.name === action.payload.name) {
            if (!todo.parameters) {
              todo.parameters = [];
            }
            return { ...todo, parameters: [...todo.parameters, newParameter] };
          }
          return todo;
        }),
      };
    case ACTIONS.SET_TODOCATEGORY:
      let todocategory = action.payload.category;
      return {
        ...state,
        todos: state.todos.map((todo) => {
          if (todo.name === action.payload.name) {
            return { ...todo, category: todocategory };
          }
          return todo;
        }),
      };
    case ACTIONS.ADD_TODO_CATEGORY:
      return {
        ...state,
        tdcategories: [
          ...new Set(state.tdcategories.concat(action.payload.category)),
        ],
      };
    case ACTIONS.DELETE_TODOPARAMETER:
      let delParameter = action.payload.parameter;
      return {
        ...state,
        todos: state.todos.map((todo) => {
          if (todo.name === action.payload.name) {
            if (!todo.parameters) {
              todo.parameters = [];
            }
            return {
              ...todo,
              parameters: todo.parameters.filter(
                (parm) =>
                  parm.att !== delParameter.att &&
                  parm.desc !== delParameter.desc
              ),
            };
          }
          return todo;
        }),
      };
    case ACTIONS.EDIT_TODOPARAMETER:
      let oldParameter = action.payload.oldparam;
      return {
        ...state,
        todos: state.todos.map((todo) => {
          if (todo.name === action.payload.name) {
            return {
              ...todo,
              parameters: todo.parameters.map((parm) => {
                if (
                  parm.att == oldParameter.att &&
                  parm.desc == oldParameter.desc
                ) {
                  return action.payload.newparam;
                }
                return parm;
              }),
            };
          }
          return todo;
        }),
      };
    case ACTIONS.ADD_TODONOTE:
      let newTodoNote = action.payload.note;
      return {
        ...state,
        todos: state.todos.map((todo) => {
          if (todo.name === action.payload.name) {
            return { ...todo, note: newTodoNote };
          }
          return todo;
        }),
      };
    case ACTIONS.DELETE_TODO:
      return {
        ...state,
        todos: state.todos.filter((todo) => todo.name !== action.payload.name),
      };
    case ACTIONS.SET_TODOS:
      return { ...state, todos: action.payload.todos };
    case ACTIONS.MERGE_TODOS:
      return { ...state, todos: state.todos.concat(action.payload.todos) };
    //ACTIVITY
    //ACTIVITY
    //ACTIVITY
    //ACTIVITY
    case ACTIONS.ADD_ACTIVITY:
      let newActivity = action.payload;
      if (action.payload.name.trim().length >= 1) {
        let duplicate = state.activities.some(
          (act) => act.name === newActivity.name
        );
        if (duplicate) {
          return state;
        } else {
          return { ...state, activities: [...state.activities, newActivity] };
        }
      }
    case ACTIONS.ADD_ACTIVITYPARAMETER:
      newParameter = action.payload.parameter;
      return {
        ...state,
        activities: state.activities.map((act) => {
          if (act.name === action.payload.name) {
            if (!act.parameters) {
              act.parameters = [];
            }
            return { ...act, parameters: [...act.parameters, newParameter] };
          }
          return act;
        }),
      };
    case ACTIONS.ADD_ACTIVITYNOTE:
      newNote = action.payload.note;
      return {
        ...state,
        activities: state.activities.map((act) => {
          if (act.name === action.payload.name) {
            return { ...act, note: newNote };
          }
          return act;
        }),
      };
    case ACTIONS.DELETE_ACTIVITY:
      return {
        ...state,
        activities: state.activities.filter(
          (act) => act.name !== action.payload.name
        ),
      };
    case ACTIONS.SET_ACTIVITIES:
      return { ...state, activities: action.payload.activities };
    //REFLECTIONS
    //REFLECTIONS
    //REFLECTIONS
    case ACTIONS.ADD_REFLECTION:
      let newReflection = action.payload;
      return { ...state, reflections: [...state.reflections, newReflection] };

    case ACTIONS.EDIT_REFLECTION:
      return {
        ...state,
        reflections: state.reflections.map((entry) => {
          if (entry.name == action.payload.name) {
            return { ...entry, note: action.payload.note };
          }
          return entry;
        }),
      };

    case ACTIONS.SET_DAYLOG:
      return {
        ...state,
        daylogs: state.daylogs.map((day) => {
          if (day.date == action.payload.date.toISOString()) {
            return {
              ...day,
              todos: action.payload.todos,
              reflections: action.payload.reflections,
              activities: action.payload.activities,
            };
          }
          return day;
        }),
      };
    case ACTIONS.SET_DAYLOG_MAIN:
      return {
        ...state,
        todos: action.payload.todos,
        activities: action.payload.activities,
        daylogs: state.daylogs.map((day) => {
          if (day.date == action.payload.date.toISOString()) {
            return {
              ...day,
              todos: action.payload.todos,
              activities: action.payload.activities,
            };
          }
          return day;
        }),
      };
    case ACTIONS.SET_DAYLOGS:
      return {
        ...state,
        daylogs: action.payload.daylogs,
      };
    case ACTIONS.SET_WEEKLYPLANNERS:
      return {
        ...state,
        weeklyplanners: action.payload,
      };

    case ACTIONS.SET_HOWSYOURDAY:
      return {
        ...state,
        howsyourdaylogs: action.payload.extralogs,
      };

    case ACTIONS.SET_EXTRALOGS:
      return {
        ...state,
        extralogs: action.payload.extralogs,
      };

    case ACTIONS.SET_STATE:
      return {
        ...state,
        todos: action.payload.todos,
        activities: action.payload.activities,
        reflections: action.payload.reflections,
        daylogs: action.payload.daylogs,
      };
    case ACTIONS.SET_REGSTATE:
      return {
        ...state,
        todos: action.payload.todos,
        activities: action.payload.activities,
        reflections: action.payload.reflections,
      };
    case ACTIONS.SET_RECENT_SAVETODOS:
      return {
        ...state,
        recenttodolistsave: action.payload.todos,
      };

    case 'USER_LOGIN':
      return { ...state, userInfo: action.payload };
    case 'USER_LOGOUT':
      return {
        ...state,
        userInfo: null,
      };
    default:
      return state;
  }
}

export function StoreProvider(props) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [oldstate, setOldState] = useState(initialState);
  const [changedDay, setChangedDay] = useState(false);
  const value = {
    state,
    dispatch,
    oldstate,
    setOldState,
    changedDay,
    setChangedDay,
  };
  const {
    userInfo,
    todaysdate,
    currentdate,
    todos,
    daylogs,
    activities,
    reflections,
    folders,
  } = state;

  const fetchDayLogData = async () => {
    console.log('fetch day log data state');
    try {
      const { data } = await axios.get(`/api/daylog/`, {
        params: { date: todaysdate },
        headers: { authorization: `Bearer ${userInfo.token}` },
      });
      const today = data.filter(
        (day) => day.date == todaysdate.toISOString()
      )[0];

      console.log(today.todos);

      dispatch({
        type: ACTIONS.SET_STATE,
        payload: {
          todos: today.todos,
          activities: today.activities,
          reflections: today.reflections,
          daylogs: data,
        },
      });
    } catch (err) {
      console.log(getError(err));
    }
  };
  const fetchActiveTodos = async () => {
    console.log('fetch active todos');
    try {
      const { data } = await axios.get(`/api/todolist/active`, {
        params: {},
        headers: { authorization: `Bearer ${userInfo.token}` },
      });
      dispatch({
        type: ACTIONS.MERGE_TODOS,
        payload: {
          todos: data.todos,
        },
      });
    } catch (err) {
      console.log(getError(err));
    }
  };
  const fetchFolders = async () => {
    try {
      const { data } = await axios.get(`/api/folders/`, {
        params: {},
        headers: { authorization: `Bearer ${userInfo.token}` },
      });
      console.log(data);
      dispatch({
        type: ACTIONS.SET_FOLDERS,
        payload: {
          folders: data,
        },
      });
    } catch (err) {
      console.log(getError(err));
    }
  };

  const fetchInvite = async () => {
    try {
      const { data } = await axios.get(`/api/folders/invited`, {
        params: {},
        headers: { authorization: `Bearer ${userInfo.token}` },
      });
      console.log(data);
      dispatch({
        type: ACTIONS.SET_INVITED_FOLDERS,
        payload: {
          folders: data,
        },
      });
    } catch (err) {
      console.log(getError(err));
    }
  };

  const fetchWeeklyPlanners = async () => {
    try {
      const { data } = await axios.get(`/api/weeklyplanner/`, {
        params: {},
        headers: { authorization: `Bearer ${userInfo.token}` },
      });

      dispatch({
        type: ACTIONS.SET_WEEKLYPLANNERS,
        payload: data,
      });
    } catch (err) {
      console.log(getError(err));
    }
  };

  const fetchStickyNoteData = async () => {
    try {
      const { data } = await axios.get(`/api/notes/`, {
        params: {},
        headers: { authorization: `Bearer ${userInfo.token}` },
      });
      dispatch({
        type: ACTIONS.SET_STICKY_NOTES,
        payload: {
          notes: data.notes,
        },
      });
    } catch (err) {
      console.log(getError(err));
    }
  };

  const fetchExtraLogs = async () => {
    try {
      const { data } = await axios.get(`/api/extralogs/`, {
        params: {},
        headers: { authorization: `Bearer ${userInfo.token}` },
      });
      const howsyourday = [
        'CBT Log',
        'Day Rating',
        'Small Wins',
        'Big Wins',
        'Today-I-Learned',
        'Gratitude',
      ];
      dispatch({
        type: ACTIONS.SET_HOWSYOURDAY,
        payload: {
          extralogs: data.filter((log) => howsyourday.includes(log.name)),
        },
      });
      dispatch({
        type: ACTIONS.SET_EXTRALOGS,
        payload: {
          extralogs: data.filter((log) => !howsyourday.includes(log.name)),
        },
      });
    } catch (err) {
      console.log(getError(err));
    }
  };
  const handleBoth = async () => {
    const list = [fetchDayLogData, fetchActiveTodos];
    for (const fn of list) {
      await fn(); // call function to get returned Promise
    }
  };
  useEffect(() => {
    handleBoth();
    fetchWeeklyPlanners();
    fetchStickyNoteData();
    fetchExtraLogs();
    fetchFolders();
    fetchInvite();
  }, []);
  useEffect(() => {
    if (
      JSON.stringify(state.todos) !== JSON.stringify(oldstate.todos) &&
      changedDay === false
    ) {
      let keychange = 'todos';

      let update = state.todos.filter(
        (todo) =>
          new Date(todo.deadline).getTime() == new Date(currentdate).getTime()
      );

      let activetodos = state.todos.filter(
        (todo) =>
          new Date(todo.deadline).getTime() > new Date(currentdate).getTime()
      );

      const updateDayLog = async () => {
        try {
          const { data } = await axios.put(
            `/api/daylog/${currentdate.toISOString()}`,
            { keychange, update },
            {
              headers: { authorization: `Bearer ${userInfo.token}` },
            }
          );
          console.log(data);
          dispatch({
            type: ACTIONS.SET_DAYLOG,
            payload: {
              date: currentdate,
              todos: state.todos,
              activities: state.activities,
              reflections: state.reflections,
            },
          });
        } catch (err) {
          console.log(getError(err));
        }
      };

      const updateActiveTodos = async () => {
        try {
          const { data } = await axios.put(
            `/api/todolist/active`,
            { activetodos },
            {
              headers: { authorization: `Bearer ${userInfo.token}` },
            }
          );
          console.log('updateactivetodos', data);
          dispatch({
            type: ACTIONS.SET_DAYLOG,
            payload: {
              date: currentdate,
              todos: state.todos,
              activities: state.activities,
              reflections: state.reflections,
            },
          });
        } catch (err) {
          console.log(getError(err));
        }
      };

      const cleanTimeout = setTimeout(() => {
        console.log('todo value changed');
        updateDayLog();
        // updateActiveTodos();
      }, 5000);

      return () => {
        console.log('todo clean up function running');
        clearTimeout(cleanTimeout);
      };
      // const debouncedUpdateTodos = debounce(updateDayLog, 5000);
      // const debouncedUpdateActTodos = debounce(updateActiveTodos, 5000);
      // debouncedUpdateTodos();
      // debouncedUpdateActTodos();
    }
    setOldState(state);
    setChangedDay(false);
  }, [state.todos]);

  useEffect(() => {
    if (
      JSON.stringify(state.activities) !==
        JSON.stringify(oldstate.activities) &&
      changedDay === false
    ) {
      let keychange = 'activities';
      let update = activities;

      const updateDayLog = async () => {
        try {
          const { data } = await axios.put(
            `/api/daylog/${currentdate.toISOString()}`,
            { keychange, update },
            {
              headers: { authorization: `Bearer ${userInfo.token}` },
            }
          );
          console.log(data);
          dispatch({
            type: ACTIONS.SET_DAYLOG,
            payload: {
              date: currentdate,
              todos: state.todos,
              activities: state.activities,
              reflections: state.reflections,
            },
          });
        } catch (err) {
          console.log(getError(err));
        }

        setOldState(state);
      };
      const cleanTimeout = setTimeout(() => {
        console.log('activities value changed');
        updateDayLog();
      }, 3000);

      return () => {
        console.log('clean up function running');
        clearTimeout(cleanTimeout);
      };
    }
    setChangedDay(false);
  }, [state.activities]);
  useEffect(() => {
    if (
      JSON.stringify(state.reflections) !==
        JSON.stringify(oldstate.reflections) &&
      changedDay === false
    ) {
      let keychange = 'reflections';
      let update = reflections;

      const updateDayLog = async () => {
        try {
          const { data } = await axios.put(
            `/api/daylog/${currentdate.toISOString()}`,
            { keychange, update },
            {
              headers: { authorization: `Bearer ${userInfo.token}` },
            }
          );

          dispatch({
            type: ACTIONS.SET_DAYLOG,
            payload: {
              date: currentdate,
              todos: state.todos,
              activities: state.activities,
              reflections: state.reflections,
            },
          });
        } catch (err) {
          console.log(getError(err));
        }

        setOldState(state);
      };

      updateDayLog();
    }
    setChangedDay(false);
  }, [state.reflections]);
  useEffect(() => {
    const updateNotes = async () => {
      try {
        let notes = state.notes;
        const { data } = await axios.put(
          `/api/notes/`,
          { notes },
          {
            headers: { authorization: `Bearer ${userInfo.token}` },
          }
        );
      } catch (err) {
        console.log(getError(err));
      }
      setOldState(state);
    };
    const cleanTimeout = setTimeout(() => {
      console.log('value changed');
      updateNotes();
    }, 3000);

    return () => {
      console.log('clean up function running');
      clearTimeout(cleanTimeout);
    };
    // updateNotes();
    // const debouncedUpdateNote = debounce(updateNotes, 5000);
    // debouncedUpdateNote();
  }, [state.notes]);

  useEffect(() => {
    if (oldstate.currentdate !== state.currentdate) {
      setChangedDay(true);

      // state.daylogs.map((day) =>
      //   console.log(new Date(day.date).toLocaleDateString())
      // );
      let currdaylog = state.daylogs.filter(
        (day) =>
          new Date(day.date).getTime() == new Date(state.currentdate).getTime()
      )[0];

      if (currdaylog) {
        dispatch({
          type: ACTIONS.SET_REGSTATE,
          payload: {
            todos: currdaylog.todos,
            activities: currdaylog.activities,
            reflections: currdaylog.reflections,
          },
        });
        setOldState(state);
      } else {
        dispatch({
          type: ACTIONS.SET_REGSTATE,
          payload: {
            todos: [],
            activities: [],
            reflections: [],
          },
        });
        setOldState(state);
      }
    }
  }, [state.currentdate]);

  useEffect(() => {
    if (userInfo) {
      handleBoth();
      fetchWeeklyPlanners();
      fetchStickyNoteData();
      fetchExtraLogs();
      fetchFolders();
      fetchInvite();
    }
  }, [state.userInfo]);

  return <Store.Provider value={value}>{props.children}</Store.Provider>;
}
