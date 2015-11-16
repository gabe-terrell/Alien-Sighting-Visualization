function initializeMap1()
{
	console.log(ufoData);
	var places = parseJSON();
	var width = 960,
	    height = 500;

	var path = d3.geo.path();
	


	var svg = d3.select("#map-block").append("svg")
	    .attr("width", width)
	    .attr("height", height);

	d3.json("/us-atlas/topo/us-10m.json", function(error, topology) {
	  svg.selectAll("path")
	      .data(topojson.feature(topology, topology.objects.counties).features)
	    .enter().append("path")
	      .attr("d", path);
	});
	svg.selectAll(".pin")
		.data(places)
		.enter().append("circle", ".pin")
		.attr("r", 5)
		.attr("transform", function(d) {
		return "translate(" + projection([
		  d.location.longitude,
		  d.location.latitude
		]) + ")"
	});
}


function parseJSON() {
	var dataArray = [];
	for (var i = 0; i < ufoData.length; i++) {
		var newPlace = {
			"name": ufoData[i]["location"],
			"location": {
			  "latitude": ufoData[i]["latitude"],
			  "longitude": ufoData[i]["longitude"]
			}
		}
		dataArray.push(newPlace);
	}
	return dataArray;
}