

function printObject(toPrint) {
	for (x in toPrint) {
		console.log(x);
	}
}

function checkForLocation(json, loc) {
	//console.log("in check");
	for (var i = 0; i < json.length; i++) {
		//console.log("i = ", i);
		if (json[i].location == loc) {
			return i;
		}
	}
	return -1;

}

function formatData()
{
	var dataLength = nuforcData2014String.length;
	var firstData = [];
	var allNames = [];
	for (var i = 0; i < dataLength; i++) {

		var currLocation = nuforcData2014String[i]["location"];
		var shapeName = nuforcData2014String[i]["shape"];
		if (shapeName == "") shapeName = "Unknown";
		if (shapeName == "Egg") shapeName = "Sphere";
		if (shapeName == "Cone") shapeName = "Triangle";
		var newIncident =
						  {
						  	"date_stamp":nuforcData2014String[i]["date_stamp"],
						    "date":nuforcData2014String[i]["date"],
						    "day":nuforcData2014String[i]["day"],
						    "month":nuforcData2014String[i]["month"],
						    "year":nuforcData2014String[i]["year"],
						    "city":nuforcData2014String[i]["city"],
						    "state":nuforcData2014String[i]["state"],
						    "location":nuforcData2014String[i]["location"],
						    "geo_longitude":nuforcData2014String[i]["geo_longitude"],
						    "geo_latitude":nuforcData2014String[i]["geo_latitude"],
						    "geo_accuracy":nuforcData2014String[i]["geo_accuracy"],
						    "shape":shapeName,
						    "summary":nuforcData2014String[i]["summary"],
						  };
		if (checkForLocation(firstData, currLocation) >= 0) {
			firstData[checkForLocation(firstData, currLocation)]["reports"].push(newIncident);

		}
		else {
			var newEntry = {
								"location": currLocation,
							    "geo_longitude":newIncident["geo_longitude"],
							    "geo_latitude":newIncident["geo_latitude"],
								"reports": [newIncident],
								"count": 0
							};

			firstData.push(newEntry);
			allNames.push(currLocation);
		}

	}
	//printObject(firstData);
	return firstData;

}
