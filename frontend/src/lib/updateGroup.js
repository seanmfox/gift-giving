export const updateGroup = (user, group) => {
	const newState = { ...user };
	const groupIndex = newState.user.groups
		.map(group => group._id)
		.indexOf(group.group._id);
	if (groupIndex < 0) {
		newState.user.groups.push(group.group);
	} else {
		const memberIndex = group.group.members
			.map(member => member.memberId)
			.indexOf(newState.user.userId);
		if (memberIndex < 0) {
			newState.user.groups.splice(groupIndex, 1);
		} else {
			newState.user.groups.splice(groupIndex, 1, group.group);
		}
	}
	return newState.user;
};
