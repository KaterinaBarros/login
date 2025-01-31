import { configureStore } from "@reduxjs/toolkit";
import CartReducer from "./slices/CartReducer";
// ...

export const store = configureStore({
  reducer: {
    cartReducer: CartReducer, // Agregamos el reducer del slice TablaReducer al estado global con la clave tablaReducer
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
