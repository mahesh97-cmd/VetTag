import {configureStore} from "@reduxjs/toolkit"
import userSlice from "../utils/userSlice"
import petSlice from "../utils/petSlice"

const appStore=configureStore({
    reducer:{
        user:userSlice,
        pets:petSlice
    }
})

export default appStore