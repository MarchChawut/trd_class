import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface IAppState {
    userToken: string
}

const initialState: IAppState = {
    userToken: "",
}

const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    resetState: () => initialState,
    setState: (state, action: PayloadAction<IAppState>) => {
        return {
            ...state,
            ...action.payload
        }
    },
   
    setToken: (state, action: PayloadAction<string>) => {
        state.userToken = action.payload
    }
  },
})

export const { resetState, setToken } = appSlice.actions

export default appSlice.reducer
