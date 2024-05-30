var emailRegex =
	/^[-!#$%&'*+\/0-9=?A-Z^_a-z{|}~](\.?[-!#$%&'*+\/0-9=?A-Z^_a-z`{|}~])*@[a-zA-Z0-9](-*\.?[a-zA-Z0-9])*\.[a-zA-Z](-?[a-zA-Z0-9])+$/;
const competitions = ["Poster Designing", "Logo Designing","3D Designing","Video Editing","Photo Manipulation Competition", "Algorithm Competition","Web Designing Competition","Audio Production Competition"]

const isEmailValid = (email) => {
	if (!email) return false;

	if (email.length > 254) return false;

	var valid = emailRegex.test(email);
	if (!valid) return false;

	// Further checking of some things regex can't handle
	var parts = email.split("@");
	if (parts[0].length > 64) return false;

	var domainParts = parts[1].split(".");
	if (
		domainParts.some(function (part) {
			return part.length > 63;
		})
	)
		return false;

	return true;
};

exports.verifyTeam = (school,TICName,TICMobile,competition) => {
	return new Promise((resolve, reject) => {
		if (!school || typeof school != "string") {
			reject("Invalid School Name");
		}

		if (school.length < 5) {
			reject("School Name must be contains at least 5 characters");
		}

		if(school.length > 50){
			reject("Username cannot be include more than 50 letters");
		}

        if (!TICName || typeof TICName != "string") {
			reject("Invalid Teacher-in-charge Name");
		}

		if (TICName.length < 10) {
			reject("Teacher-in-charge Name must be contains at least 10 characters");
		}

		if(TICName.length > 50){
			reject("Teacher-in-charge cannot be include more than 50 letters");
		}

        if (!TICMobile || typeof TICMobile != "string") {
			reject("Invalid Teacher-in-charge Mobile Number");
		}

		if (TICMobile.length !== 10) {
			reject("Invalid Teacher-in-charge Mobile Number");
		}
		
        if (!competition || typeof competition != "string") {
			reject("Invalid Competition Name");
		}

        if(!competitions.includes(competition)){
            reject("Invalid Competition Name");
        }

		resolve();
	});
};

exports.verifyMember = (name,email,mobile,role)=>{
    return new Promise((resolve, reject) => {
		if (!name || typeof name != "string") {
			reject("Invalid Name");
		}

		if (name.length < 5) {
			reject("Name must be contains at least 5 characters");
		}

		if(name.length > 50){
			reject("Name cannot be include more than 50 letters");
		}

        if (!email || !isEmailValid(email)) {
			reject("Invalid Email");
		}

        if (!mobile || typeof mobile != "string") {
			reject("Invalid Mobile Number");
		}

		if (mobile.length !== 10) {
			reject("Invalid Mobile Number");
		}
		
        if (role && role !== "Leader") {
			reject("Invalid Competition Name");
		}

		resolve();
	});
}