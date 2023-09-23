import { createSlice } from "@reduxjs/toolkit";
import { configureStore } from '@reduxjs/toolkit';
import storage from 'redux-persist/lib/storage';
import { createLogger } from 'redux-logger';
import storageSession from 'reduxjs-toolkit-persist/lib/storage/session'
import {
    persistReducer,
    persistStore,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
} from 'redux-persist'


const persistConfig = {
    key: 'root',
    version: 1,
    storage,
};

const logger = createLogger();


// Define the initial state
const initialState = { username: '', profilePhoto: '' };

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        updateUserName: (state, action) => {
            state.username = action.payload;
        },
        updateProfilePhoto: (state, action) => {
            state.profilePhoto = action.payload;
        },
        logout: (state) => {
            // Reset the state to initial state
            console.log('Logout action triggered');
            state.username = initialState.username;
            state.profilePhoto = initialState.profilePhoto;
        },
    },
});

const persistedReducer = persistReducer(persistConfig, userSlice.reducer);

export const { updateUserName, updateProfilePhoto, logout } = userSlice.actions;

// export const store = configureStore({
//     reducer: {
//         user: userSlice.reducer,
//     }
// });

export const store = configureStore({
    reducer: {
        user: persistedReducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
});



// persistedReducer 