import { configureStore } from "@reduxjs/toolkit"
import { rootReducer } from "./root-reducer"
import { persistStore } from "redux-persist"
import storage from "redux-persist/lib/storage"
import persistReducer from "redux-persist/lib/persistReducer"

const persistConfig = {
  key: "root",
  storage,
}

const persistedReducer = persistReducer(persistConfig, rootReducer)
const store = configureStore({
  reducer: persistedReducer,
})
const persistor = persistStore(store)

export { store, persistor }
