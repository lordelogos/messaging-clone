import React, { createContext, useContext, useReducer } from "react";

//This is the data layer
export const StateContext = createContext();

//This is the provider for wrapping the app
export const StateProvider = ({ reducer, initialState, children }) => (
	<StateContext.Provider value={useReducer(reducer, initialState)}>
		{children}
	</StateContext.Provider>
);

//usage inside of component
export const useStateValue = () => useContext(StateContext);
