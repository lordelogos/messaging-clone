export const initialState = {
	user: null,
	messages: [],
};

const reducer = (state, action) => {
	switch (action.type) {
		case "SET_USER":
			return {
				...state,
				user: action.user,
			};
		default:
			return state;
	}
};

export default reducer;
