var keystone = require('keystone');
var Types = keystone.Field.Types;

/**
 * Workout Model
 * =============
 */

var Workout = new keystone.List('Workout', {
	nocreate: true,
	noedit: false,
});

Workout.add({
	name: { type: Types.Name, required: true },
	email: { type: Types.Email, required: true },
	age: { type: Number, required: true },
	sex: { type: Types.Select, options: [
		{ value: 'm', label: 'Male' },
		{ value: 'f', label: 'Female' },
	], required: true },
	phone: { type: String },
	comment: { type: Types.Markdown, required: true },
	createdAt: { type: Date, default: Date.now },
});

Workout.defaultSort = '-createdAt';
Workout.defaultColumns = 'name, email, age, sex, phone, comment, createdAt';
Workout.register();
