const {PatientSchema} = require ('./Patient.schema')


const insertPatient = (patientObj) => {
    return new Promise ((resolve, reject) => {
        try { 
            PatientSchema(patientObj)
                .save()
                .then((data) => {
                    resolve(data)
                })
                .catch((error) => reject(error))

        } catch (error) {
            reject(error)
        }
    })
}

module.exports = { insertPatient}  