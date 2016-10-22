			
function firstTabFunc(event)
{
	console.log("F(firstTabFunc): ENTER");
	var i, tabcontent, tablinks;
	var varId;
	//show the first tab content and hide the rest
	tabcontent = document.getElementsByClassName("tabcontent");
	for (i = 0; i < tabcontent.length; i++) {
		tabcontent[i].style.display = "none";
	}
	tablinks = document.getElementsByClassName("tablinks");
	for (i = 0; i < tablinks.length; i++) {
		tablinks[i].className = tablinks[i].className.replace(" active", "");
	}
	document.getElementById("first").style.display = "block";
	event.currentTarget.className += " active";
						
	//Initialize variable1 type list widget
	d3.select('#variable1Type').selectAll('option').data(variable1Type).enter().append('option')
		.html(function(d) { return d; })
		.attr('value', function(d) { return d; })
			
	showMap("B01003001", getDivision());
	
	d3.select("#variable1Type")
		.on('change', function() {	
		//Get the value of variable that has been chosen
		selection = document.getElementById('variable1Type');
		variableName = selection.options[selection.selectedIndex].value;
		console.log("variableName: "+variableName);
	
		if(variableName == "Total population within the locality"){
			hideSecVariable();
			showMap("B01003001", getDivision());
		}
		else if(variableName == "Age distribution broken down by sex"){
			updateSecDropDown(sexByAge);	
			showMap(getVariableId(sexByAge), getDivision());
		}
		else if(variableName == "Median age by sex"){
			updateSecDropDown(medianAgebySex);		
			showMap(getVariableId(medianAgebySex), getDivision());
		}
		else if(variableName == "Race"){
			updateSecDropDown(race);	
			showMap(getVariableId(race), getDivision());		
		}
		else if(variableName == "Living arrangement for adults (18 years and over)"){
			updateSecDropDown(livingArrangements);	
			showMap(getVariableId(livingArrangements), getDivision());			
		}
		else if(variableName == "Place of birth by nativity"){
			updateSecDropDown(placeOfBirth);
			showMap(getVariableId(placeOfBirth), getDivision());			
		}
		else if(variableName == "Median household income"){
			hideSecVariable();
			showMap("B19013001", getDivision());
		}
		else if(variableName == "Per capita income"){
			hideSecVariable();
			showMap("B19301001", getDivision());
		}
		else if(variableName == "Income to poverty-level ratio"){
			updateSecDropDown(incomeToPovertyRatio);
			showMap(getVariableId(incomeToPovertyRatio), getDivision());			
		}
		else if(variableName == "Poverty level by place of birth"){
			updateSecDropDown(povertyByPlace);		
			showMap(getVariableId(povertyByPlace), getDivision());			
		}
		else if(variableName == "Educational attainment by place of birth"){
			updateSecDropDown(educationalAttainment);	
			showMap(getVariableId(educationalAttainment), getDivision());			
		}
		else if(variableName == "Travel time to work"){
			updateSecDropDown(travelTimeToWork);	
			showMap(getVariableId(travelTimeToWork), getDivision());			
		}
		else if(variableName == "Means of transportation to work"){
			updateSecDropDown(meansOfTransportation);
			showMap(getVariableId(meansOfTransportation), getDivision());			
		}
		else{
			//none!
		}
	});
	
	d3.select("#variable2Type")
		.on('change', function() {	
		replotMap();
	});
	
	d3.select("#state")
		.on('change', function() {	
		replotMap();
	});
	
	d3.select("#county")
		.on('change', function() {	
		replotMap();
	});
	
	console.log("F(firstTabFunc): EXIT");
}

//in case of variable 2 reselection and radio button toggle replot the map
function replotMap()
{
		//Get the value of variable that has been chosen
		selection = document.getElementById('variable1Type');
		variableName = selection.options[selection.selectedIndex].value;
		console.log("variableName: "+variableName);
	
		if(variableName == "Total population within the locality"){
			showMap("B01003001", getDivision());
		}
		else if(variableName == "Age distribution broken down by sex"){
			showMap(getVariableId(sexByAge), getDivision());
		}
		else if(variableName == "Median age by sex"){		
			showMap(getVariableId(medianAgebySex), getDivision());
		}
		else if(variableName == "Race"){	
			showMap(getVariableId(race), getDivision());		
		}
		else if(variableName == "Living arrangement for adults (18 years and over)"){
			showMap(getVariableId(livingArrangements), getDivision());			
		}
		else if(variableName == "Place of birth by nativity"){
			showMap(getVariableId(placeOfBirth), getDivision());			
		}
		else if(variableName == "Median household income"){
			showMap("B19013001", getDivision());
		}
		else if(variableName == "Per capita income"){
			showMap("B19301001", getDivision());
		}
		else if(variableName == "Income to poverty-level ratio"){
			showMap(getVariableId(incomeToPovertyRatio), getDivision());			
		}
		else if(variableName == "Poverty level by place of birth"){	
			showMap(getVariableId(povertyByPlace), getDivision());			
		}
		else if(variableName == "Educational attainment by place of birth"){	
			showMap(getVariableId(educationalAttainment), getDivision());			
		}
		else if(variableName == "Travel time to work"){
			showMap(getVariableId(travelTimeToWork), getDivision());			
		}
		else if(variableName == "Means of transportation to work"){
			showMap(getVariableId(meansOfTransportation), getDivision());			
		}
		else{
			//none!
		}
}

//show the second variable label and drop down	
function showSecVariable()
{
	document.getElementById("secVarLabel").style.display = "block";
	document.getElementById("variable2Type").style.display = "block";
}

//hide the second variable label and drop down	
function hideSecVariable()
{
	document.getElementById("secVarLabel").style.display = "none";
	document.getElementById("variable2Type").style.display = "none";
}

//read radio button selection and return result
function getDivision()
{
	var division = document.getElementById('state').checked;
	if(division)
	{
		return "state";
	}
	else
	{
		return "county";
	}
}

//get variable ID mapping to the value of variable 2
function getVariableId(variableMap)
{
    var flag=false;
    var keyVal;
	selection = document.getElementById('variable2Type');
	variableName = selection.options[selection.selectedIndex].value;
	
	for (key in variableMap){
         if (variableMap[key] == variableName){
             flag=true;
             keyVal=key;
             break;
         }
    }
    if(flag){
		console.log("F(getVariableId): variableId= "+keyVal);
        return keyVal;
    }
    else{
        return false;
    }
}

function updateSecDropDown(variable1)
{
	d3.select('#variable2Type').selectAll('option').remove();
	//show the second variable widget
	showSecVariable();
	//Initialize variable2 type list widget
	//get the values from the map
	var vals = Object.keys(variable1).map(function(key) {
		return variable1[key];
	});

	//update the variable2 widget with values
	d3.select('#variable2Type').selectAll('option').data(vals).enter().append('option')
		.html(function(d) { return d; })
		.attr('value', function(d) { return d; })	
}

//Fetches the dataset asynchronously and draws the choropleth
//Input: Census data variable and division - state/county
function showMap(variable, division)
{
	d3.select("body svg").selectAll("g").remove();
	
	key = "7adf8bfea67e27e5edcaa228acef5db5cb905303";
	year = "2015";
	
	var reqVar = "";
	
	//create the request variable to be sent in the URL
	for(i = 0; i < variable.length; i++)
	{
		if(i < 6)
		{
			reqVar+= variable[i];
		}
		else if(i == 6)
		{
			reqVar+= "_";
			reqVar+= variable[i];
		}
		else
		{
			reqVar+= variable[i];
		}
	}

	//lastly append character 'E' to variable
	reqVar+= "E";
	
	console.log("F(getData) : reqVar = "+reqVar);
	
	//get the response asynchronously
	var q = d3.queue()
		.defer(d3.json, "data/us-10m.json")
	    .defer(d3.json, "http://api.census.gov/data/"+year+"/acs1?get=NAME,"+reqVar+"&for="+division+":*&key="+key)
		.awaitAll(function(error, results) {
			if (error) throw error;
			
			console.log(results[0]);
			
			var val = [];
			var countyId;
			var valById = d3.map();
			var nameById = d3.map();
			var index = 1;
			
			for(i = 1; i < results[index].length; i++)
			{
				//make sure to start from 0 index for val else trouble at min and max and later
				val[i-1] = parseInt(results[index][i][1]);
				//make the key field using "state"+"county" value
				countyId = parseInt(results[index][i][2] + results[index][i][3]);
				//store the values and their IDs
				valById.set(countyId, parseInt(results[index][i][1]));
				//store the names and their IDs
				nameById.set(countyId, results[index][i][0]);
			}

			min = d3.min(val);	
			max = d3.max(val);
		
			console.log("min : "+min);
			console.log("max : "+max);
			
			var quantize = d3.scaleQuantize()
				.domain([min, max])
				.range(["#fee0d2", "#fcbba1", "#fc9272", "#fb6a4a",
					"#ef3b2c", "#cb181d", "#a50f15", "#67000d"]);
					
			var tip = d3.tip()
				  .attr('class', 'd3-tip')
				  .offset([-10, 0])
				  .html(function(d) {
					return "<strong>Region:</strong> <span style='color:red'>" + nameById.get(d.id) + "</span>";
				  })
				  
			svg.call(tip);
			
			var division;
			var geometry;
			if(getDivision() == "state"){
				//modify states to counties to get for counties below
				var paths = svg.append("g")
					.attr("transform", "translate(100, 10)")
					.attr("class", "states")
					.selectAll("path")
					.data(topojson.feature(results[0], results[0].objects.states).features)
					.enter().append("path")
					.attr("id", function(d) { return d.id; })
					.attr("fill", function(d) { return quantize(valById.get(d.id)); })
					.attr("d", path)
					.on("mouseover", function() {
					  d3.select(this)
						.attr('fill', '#ff0000') // Un-sets the "explicit" fill (might need to be null instead of '')
						.classed("active", true ) // should then accept fill from CSS
					})
					.on("mouseout",  function() {
					  d3.select(this)
						.classed("active", false)
						.attr('fill', function(d) { return quantize(valById.get(d.id)); }) // Re-sets the "explicit" fill
					});
			}
			else{
				//modify states to counties to get for counties below
				var paths = svg.append("g")
					.attr("transform", "translate(100, 10)")
					.attr("class", "counties")
					.selectAll("path")
					.data(topojson.feature(results[0], results[0].objects.counties).features)
					.enter().append("path")
					.attr("id", function(d) { return d.id; })
					.attr("fill", function(d) { if(valById.get(d.id)){ return quantize(valById.get(d.id)); }else{ return "#cccccc";}})
					.attr("d", path)
					.on("mouseover", function() {
					  d3.select(this)
						.attr('fill', '#ff0000') // Un-sets the "explicit" fill (might need to be null instead of '')
						.classed("active", true ) // should then accept fill from CSS
					})
					.on("mouseout",  function() {
					  d3.select(this)
						.classed("active", false)
						.attr('fill', function(d) { if(valById.get(d.id)){ return quantize(valById.get(d.id)); }else{ return "#cccccc";}})
					});
			}
	});
}
