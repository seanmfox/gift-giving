export const UPDATEGROUPGIFT = 'UPDATEGROUPGIFT';
export const UPDATEGROUPS = 'UPDATEGROUPS';

export const updateGroupGift = group => {
	return {
		type: UPDATEGROUPGIFT,
		payload: { group }
	};
};

export const updateGroups = group => {
	return {
		type: UPDATEGROUPS,
		payload: { group }
	};
};
