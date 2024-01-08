// store.js
// basic syntx
// import slice
// import CounterSlice from "../dataStoreComponent/viewcartSlice";
// import { configureStore } from "@reduxjs/toolkit";

// const store = configureStore({
//   reducer: {
//     // viewCart this is state name which decalred in slice  and CounterSlice  varible name used for import slice and viewCart this only use for acces name
//     viewCart: CounterSlice,
//   },
// });
// export default store;

//

// store.js

import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "./rootReducer";

const store = configureStore({
  reducer: rootReducer,
});

export default store;
