function Student(fhirpatient) {

    var student = fhirpatient;

    return {
        "art": function () {
            if (student) {
                return student.Art;
            }
            return undefined;
        },        

        "zueins": function () {
            if (student.Berechtigt) {
            	var nameElement = student.Berechtigt.find(function(element){
            		return (element.use == "usual");
            	});
            	if (nameElement)
            		return nameElement.Person1
            	}
            return undefined;
        },

        "lastname": function () {
            if (student.name) {
                var nameElement = student.name.find(function (element) {
                    return (element.use == "usual");
                });
                if (nameElement)
                    return nameElement.family;
            }
            return undefined;
        },

        "firstname": function () {
            if (student.name) {
                var nameElement = student.name.find(function (element) {
                    return (element.use == "usual");
                });
                if (nameElement)
                    return nameElement.given;
            }
            return undefined;
        }












    }
}