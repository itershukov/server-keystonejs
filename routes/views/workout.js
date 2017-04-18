var keystone = require('keystone');
var Workout = keystone.list('Workout');

exports = module.exports = function (req, res) {

	var view = new keystone.View(req, res);
	var locals = res.locals;

	// Set locals
	locals.section = 'workout';
	locals.sex = Workout.fields.sex.ops;
	locals.formData = req.body || {};
	locals.validationErrors = {};
	locals.enquirySubmitted = false;

	// On POST requests, add the Workout item to the database
	view.on('post', { action: 'workout' }, function (next) {

		var newWorkout = new Workout.model();
		var updater = newWorkout.getUpdateHandler(req);

		updater.process(req.body, {
			flashErrors: true,
			fields: 'name, email, age, sex, phone, comment, createdAt',
			errorMessage: 'There was a problem submitting your enquiry:',
		}, function (err) {
			if (err) {
				locals.validationErrors = err.errors;
			} else {
				locals.enquirySubmitted = true;
			}
			next();
		});
	});

	view.render('workout');
};
