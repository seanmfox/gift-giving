export const updateGroup = store => next => action => {
	if (action.type === 'UPDATEGROUP') {
		const newState = store.getState();
		const { group } = action.payload;
		const groupIndex = newState.groups
			.map(group => group._id)
			.indexOf(group._id);
		if (groupIndex < 0) {
			newState.push(group);
		} else {
			const memberIndex = group.members
				.map(member => member.memberId)
				.indexOf(newState.user.userId);
			if (memberIndex < 0) {
				newState.groups.splice(groupIndex, 1);
			} else {
				newState.groups.splice(groupIndex, 1, group);
			}
		}
		return newState;
	} else {
		next(action);
	}
};
