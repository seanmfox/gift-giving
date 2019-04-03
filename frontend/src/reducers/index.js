import { UPDATEUSER, LOGOUT } from '../actions/user';
import { UPDATEGROUPGIFT, UPDATEGROUPS } from '../actions/group';

const initialState = {
	user: '',
	groups: []
};

const rootReducer = (state = initialState, action) => {
	const newState = { ...state };
	switch (action.type) {
		case UPDATEUSER:
			const userData = action.payload.user;
			newState.user = {
				fname: userData.fname,
				lname: userData.lname,
				userId: userData.userId,
				email: userData.email
			};
			newState.groups = userData.groups;
			return Object.assign({}, newState);
		case LOGOUT:
			newState.user = '';
			return {
				...newState
			};
		case UPDATEGROUPS:
			let newGroupArray = newState.groups.slice();
			const groupIndex = newGroupArray
				.map(group => group._id)
				.indexOf(action.payload.group._id);
			if (groupIndex < 0) {
				newGroupArray.push(action.payload.group);
			} else {
				newGroupArray = state.groups.filter(
					(group, index) => index !== groupIndex
				);
			}
			return { user: state.user, groups: newGroupArray };
		case UPDATEGROUPGIFT:
			const giftGroupIndex = newState.groups
				.map(group => group._id)
				.indexOf(action.payload.group._id);
			const arrayUpdate = state.groups.map((group, index) => {
				if (index !== giftGroupIndex) {
					return group;
				} else {
					return action.payload.group;
				}
			});
			return { user: state.user, groups: arrayUpdate };
		default:
			return state;
	}
};

export default rootReducer;
