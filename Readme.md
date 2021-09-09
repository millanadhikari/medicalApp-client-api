<!-- How to use
run git clone https://github.com/DentedCode/client-api.git
run npm install
run npm start
Note: Make sure you have nodemon is installed in your system otherwise you can install as a dev dependencies in the project.

API Resources
User API Resources
All the user API router follows /v1/user/ -->

|#	| Routers |	Verbs |	Progress |	Is Private |	Description
|1	| /v1/user |	GET	| Done |Yes	 | Get user Info
2	/v1/user	POST	Done	No	Create a user
3	/v1/user/login	POST	Done	No	Verify user Authentication and return JWT
4	/v1/user/reset-password	POST	Done	No	Verify email and email pin to reset the password
5	/v1/user/reset-password	PATCH	Done	No	Replace with new password
6	/v1/user/logout	DELETE	Done	Yes	Delete user accessJWT
Patient API Resources
All the user API router follows /v1/ticket/

#	Routers	Verbs	Progress	Is Private	Description
1	/v1/patient	GET	Done	Yes	Get all patient for the logined in user
2	/v1/patient/{id}	GET	Done	Yes	Get a patient details
3	/v1/patient	POST	Done	Yes	Create a new patient
4	/v1/patient/{id}	PUT	Done	Yes	Update patient details ie. reply message
5	/v1/patient/close-patient/{id}	PATCH	Done	Yes	Update patient status to close
6	/v1/patient/{id}	DELET	Done	Yes	Delete a patient
Tokens API Resources
All the user API router follows /v1/tokens

#	Routers	Verbs	Progress	Is Private	Description
1	/v1/tokens	GET	Done	No	Get a fresh access JWT 