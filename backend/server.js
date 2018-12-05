const express = require('express');
const logger = require('morgan');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const path = require('path');
const User = require('./models').User;
const userRoutes = require('./routes/users');
const jwt = require('jsonwebtoken');

require('dotenv').config();

const app = express();
const router = express.Router();

const PORT = process.env.PORT || 3001;

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(logger('dev'));

router.post('/usersignin/', (req, res) => {
	const { email, password } = req.body;
	if (!email || !password) {
		return res.json({
			success: false,
			error: 'Not all fields have been completed'
		});
	}
	User.findOne({ email: email.toLowerCase() }, (err, user) => {
		if (!user)
			return res.json({
				success: false,
				error: 'The email or password do not match.  Please try again.'
			});
		return bcrypt.compare(password, user.password).then(response => {
			if (!response)
				return res.json({
					success: false,
					error: 'The email or password do not match.  Please try again.'
				});
			return res.json({
				token: jwt.sign(
					{ email: user.email, userId: user._id },
					process.env.SECRET_KEY
				),
				email: user.email,
				success: true,
				userId: user._id
			});
		});
	});
});

router.get('/authuser/', (req, res) => {
	const token = req.headers.authorization.split(' ')[1];
	jwt.verify(token, process.env.SECRET_KEY, (error, decoded) => {
		User.findById(decoded.userId, (error, user) => {
			if (error) return res.json({ success: false, error });
			return res.json({ success: true, userId: user._id, email: user.email });
		});
	});
});

app.use('/api', router);
app.use('/api/users', userRoutes);

if (process.env.NODE_ENV === 'production') {
	// Serve any static files
	app.use(express.static(`${__dirname}/../frontend/dist`));

	// Handle React routing, return all requests to React app
	app.get('*', (req, res) => {
		res.sendFile(path.join(__dirname, '../frontend/dist/index.html'));
	});
}

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
