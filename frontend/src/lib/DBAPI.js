export async function createNewUser(fname, lname, email, password) {
	return fetch(`/api/users`, {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify({ fname, lname, email, password })
	}).then(res => res.json());
}

export async function signinUser(email, password) {
	return fetch(`/api/usersignin`, {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify({ email, password })
	}).then(res => res.json());
}
