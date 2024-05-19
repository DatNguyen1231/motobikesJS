
import { configureStore } from '@reduxjs/toolkit'
import rootReducer from './reducerStore'

export const store = configureStore({
  reducer: rootReducer,
})