import { configureStore } from "@reduxjs/toolkit"
import { rootReducer } from "./root-reducer"
import { persistStore } from "redux-persist"
import storage from "redux-persist/lib/storage" // defaults to localStorage
import persistReducer from "redux-persist/lib/persistReducer"

// Option 2: Persist specific slices with default middlewares
const persistConfig = {
  key: "root",
  storage,
  whitelist: ["user"], // Only persist these slices
}

const persistedReducer = persistReducer(persistConfig, rootReducer)
const store = configureStore({
  reducer: persistedReducer,
})
const persistor = persistStore(store)

export { store, persistor }
