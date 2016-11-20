/**
 *  
 *  Deal with displaying stuff
 *  
 *  
 */

// Due to showpos AND setang telling lies, add a small value to make sure that the angle shown can be bounced
var resultsOffset = 0.01;

// Deal with displaying results
function m()
{
	var floor_height = document.getElementById("txt_height").value;
	var nearestAngle = document.getElementById("txt_nearestAngle").value;
	

	document.getElementById("bounceInfo").innerHTML = "";
	document.getElementById("bounceResults").innerHTML = "";
	document.getElementById("bounceTips").innerHTML = "";
	document.getElementById("divID_specialBounce").innerHTML = "";
	
	// Have you tried turning it off and on again?
	document.getElementById("hrID_midway").style.display = "none";
	document.getElementById("divID_specialTitle").style.display = "none";
	
	// Do some checking to make sure input looks ok
	if (!isNaN(floor_height)) {
		if (floor_height > 999999) {
			// Can find higher bounces but it might start to hang
			document.getElementById("bounceInfo").innerHTML = "Silly..";
			return 0;
		}
		else if (floor_height < 1) {
			document.getElementById("bounceInfo").innerHTML = "Enter a height > 1";
			return 0;
		}
	}
	else {
		document.getElementById("bounceInfo").innerHTML = "Enter a height > 1";
		return 0;
	}
	
	// 
	var f_h = 0 - floor_height;
	
	
	// Deal with angle bounces
	if (document.getElementById("chk_angleCheck").checked) {
		if (nearestAngle === "") {
			nearestAngle = 60.00;
		}
		if (!isNaN(nearestAngle)) {
			if (nearestAngle < 45 || nearestAngle > 89) {
				document.getElementById("bounceInfo").innerHTML = "Nearest angle should be 45 < x < 89";
				return 0;
			}
			nearestAngle = parseFloat(nearestAngle);
		}
		else {
			document.getElementById("bounceInfo").innerHTML = "Nearest angle needs to be a number";
			return 0;
		}
		
		// Calculate results
		// Stock
		if (document.getElementById("rad_stock").checked) {
			if (document.getElementById("rad_startUn").checked) {
				if (document.getElementById("rad_landUn").checked) {
				
					var bounceAngleResult = calculateAngle(f_h, nearestAngle, "STOCK", "UNCROUCHED", "UNCROUCHED");
					if (bounceAngleResult[0] == 0) {
						document.getElementById("bounceResults").innerHTML = "<h3>No bounce found</h3>";
					} else { 
						var ba1 = Math.round((bounceAngleResult[0] + resultsOffset) * 1000 ) / 1000;
						var ba2 = Math.round((bounceAngleResult[0] + bounceAngleResult[1]) * 1000 ) / 1000;
						
						document.getElementById("bounceResults").innerHTML = "<h3>" + (ba1) + " to " + (ba2) + "</h3>";
						document.getElementById("bounceTips").innerHTML = "(Stock) Start uncrouched -&gt; Land uncrouched";
					}
				}
				else if (document.getElementById("rad_landC").checked) {
				
					var bounceAngleResult = calculateAngle(f_h, nearestAngle, "STOCK", "UNCROUCHED", "CROUCHED");
					if (bounceAngleResult[0] == 0) {
						document.getElementById("bounceResults").innerHTML = "<h3>No bounce found</h3>";
					} else {
						var ba1 = Math.round((bounceAngleResult[0] + resultsOffset) * 1000 ) / 1000;
						var ba2 = Math.round((bounceAngleResult[0] + bounceAngleResult[1]) * 1000 ) / 1000;
						
						document.getElementById("bounceResults").innerHTML = "<h3>" + (ba1) + " to " + (ba2) + "</h3>";
						document.getElementById("bounceTips").innerHTML = "(Stock) Start uncrouched -&gt; Land crouched";
					}
				}
			}
			else if (document.getElementById("rad_startC").checked) {
				if (document.getElementById("rad_landUn").checked) {
				
					var bounceAngleResult = calculateAngle(f_h, nearestAngle, "STOCK", "CROUCHED", "UNCROUCHED");
					if (bounceAngleResult[0] == 0) {
						document.getElementById("bounceResults").innerHTML = "<h3>No bounce found</h3>";
					} else {
						var ba1 = Math.round((bounceAngleResult[0] + resultsOffset) * 1000 ) / 1000;
						var ba2 = Math.round((bounceAngleResult[0] + bounceAngleResult[1]) * 1000 ) / 1000;
						
						document.getElementById("bounceResults").innerHTML = "<h3>" + (ba1) + " to " + (ba2) + "</h3>";
						document.getElementById("bounceTips").innerHTML = "(Stock) Start crouched -&gt; Land uncrouched";
					}
				}
				else if (document.getElementById("rad_landC").checked) {
				
					var bounceAngleResult = calculateAngle(f_h, nearestAngle, "STOCK", "CROUCHED", "CROUCHED");
					if (bounceAngleResult[0] == 0) {
						document.getElementById("bounceResults").innerHTML = "<h3>No bounce found</h3>";
					} else { 
						var ba1 = Math.round((bounceAngleResult[0] + resultsOffset) * 1000 ) / 1000;
						var ba2 = Math.round((bounceAngleResult[0] + bounceAngleResult[1]) * 1000 ) / 1000;
						
						document.getElementById("bounceResults").innerHTML = "<h3>" + (ba1) + " to " + (ba2) + "</h3>";
						document.getElementById("bounceTips").innerHTML = "(Stock) Start crouched -&gt; Land crouched";
					}
				}
			}
		}
		// Original
		else if (document.getElementById("rad_original").checked) {
			if (document.getElementById("rad_startUn").checked) {
				if (document.getElementById("rad_landUn").checked) {
				
					var bounceAngleResult = calculateAngle(f_h, nearestAngle, "ORIGINAL", "UNCROUCHED", "UNCROUCHED");
					if (bounceAngleResult[0] == 0) {
						document.getElementById("bounceResults").innerHTML = "<h3>No bounce found</h3>";
					} else { 
						var ba1 = Math.round((bounceAngleResult[0] + resultsOffset) * 1000 ) / 1000;
						var ba2 = Math.round((bounceAngleResult[0] + bounceAngleResult[1]) * 1000 ) / 1000;
						
						document.getElementById("bounceResults").innerHTML = "<h3>" + (ba1) + " to " + (ba2) + "</h3>";
						document.getElementById("bounceTips").innerHTML = "(Original) Start uncrouched -> Land uncrouched";
					}
				}
				else if (document.getElementById("rad_landC").checked) {
				
					var bounceAngleResult = calculateAngle(f_h, nearestAngle, "ORIGINAL", "UNCROUCHED", "CROUCHED");
					if (bounceAngleResult[0] == 0) {
						document.getElementById("bounceResults").innerHTML = "<h3>No bounce found</h3>";
					} else { 
						var ba1 = Math.round((bounceAngleResult[0] + resultsOffset) * 1000 ) / 1000;
						var ba2 = Math.round((bounceAngleResult[0] + bounceAngleResult[1]) * 1000 ) / 1000;
						
						document.getElementById("bounceResults").innerHTML = "<h3>" + (ba1) + " to " + (ba2) + "</h3>";
						document.getElementById("bounceTips").innerHTML = "(Original) Start uncrouched -&gt; Land crouched";
					}
				}
			}
			else if (document.getElementById("rad_startC").checked) {
				if (document.getElementById("rad_landUn").checked) {
				
					var bounceAngleResult = calculateAngle(f_h, nearestAngle, "ORIGINAL", "CROUCHED", "UNCROUCHED");
					if (bounceAngleResult[0] == 0) {
						document.getElementById("bounceResults").innerHTML = "<h3>No bounce found</h3>";
					} else { 
						var ba1 = Math.round((bounceAngleResult[0] + resultsOffset) * 1000 ) / 1000;
						var ba2 = Math.round((bounceAngleResult[0] + bounceAngleResult[1]) * 1000 ) / 1000;
						
						document.getElementById("bounceResults").innerHTML = "<h3>" + (ba1) + " to " + (ba2) + "</h3>";
						document.getElementById("bounceTips").innerHTML = "(Original) Start crouched -&gt; Land uncrouched";
					}
				}
				else if (document.getElementById("rad_landC").checked) {
				
					var bounceAngleResult = calculateAngle(f_h, nearestAngle, "ORIGINAL", "CROUCHED", "CROUCHED");
					if (bounceAngleResult[0] == 0) {
						document.getElementById("bounceResults").innerHTML = "<h3>No bounce found</h3>";
					} else { 
						var ba1 = Math.round((bounceAngleResult[0] + resultsOffset) * 1000 ) / 1000;
						var ba2 = Math.round((bounceAngleResult[0] + bounceAngleResult[1]) * 1000 ) / 1000;
						
						document.getElementById("bounceResults").innerHTML = "<h3>" + (ba1) + " to " + (ba2) + "</h3>";
						document.getElementById("bounceTips").innerHTML = "(Original) Start crouched -&gt; Land crouched";
					}
				}
			}	
		}
		else if (document.getElementById("rad_cowmangler").checked) {
			// Don't have angle to velocity approximations for cowmangler so place holder for now
			document.getElementById("bounceResults").innerHTML = "<h3>No angle bounce found</h3>";
		}
	}
	
	// Show the mid HR if both types of bounces are checked
	if(document.getElementById("chk_angleCheck").checked && document.getElementById("chk_specialCheck").checked) {
		document.getElementById("hrID_midway").style.display = "block";
	}
	
	// Deal with "special" start bounce types
	if (document.getElementById("chk_specialCheck").checked) {
	
		// Enable Display
		document.getElementById("divID_specialTitle").style.display = "block";
		
		var specialFound = 0;
		var specialDisplay = "";
		
		if (document.getElementById("rad_stock").checked) {
			var rl_type = "stock";
		} else if (document.getElementById("rad_original").checked) {
			var rl_type = "original";
		} else if (document.getElementById("rad_cowmangler").checked) {
			var rl_type = "cowmangler";
		}
		
		for (var specialType in bounceSpecialVel) {
			if (bounceSpecialVel.hasOwnProperty(specialType)) {
				if (findSpecialBounce(f_h, specialType, "UNCROUCHED")) {
					if(bounceSpecialVel[specialType]["RL_type"] == rl_type) {
						specialDisplay += bounceSpecialVel[specialType]["text"] + " -&gt; " + "Land Uncrouched ";
						if (typeof(bounceSpecialVel[specialType]["note"] ) !== "undefined") {
							specialDisplay += bounceSpecialVel[specialType]["note"];
						}
						specialDisplay += "<br />\n";
						specialFound = 1;
					}
				}
				if (findSpecialBounce(f_h, specialType, "CROUCHED")) {
					if(bounceSpecialVel[specialType]["RL_type"] == rl_type) {
						specialDisplay += bounceSpecialVel[specialType]["text"] + " -&gt; " + "Land Crouched ";
						if (typeof(bounceSpecialVel[specialType]["note"] ) !== "undefined") {
							specialDisplay += bounceSpecialVel[specialType]["note"];
						}
						specialDisplay += "<br />\n";
						specialFound = 1;
					}
				}
			}
		}
		
		if (specialFound) {
			document.getElementById("divID_specialBounce").innerHTML = specialDisplay;
		} else {
			document.getElementById("divID_specialBounce").innerHTML = "No special start found.";
		}
	}
	
	return 1
}

function toggle_chkBox(chkBoxID)
{
	if (document.getElementById(chkBoxID).checked) {
		document.getElementById(chkBoxID).checked = false;
	}
	else {
		document.getElementById(chkBoxID).checked = true;
	}
}

// Check textboxes to see if enter was pressed, then call m
function checkEnterPress(keypressed)
{
	if (keypressed.keyCode == 13) {
		m();
	}
	return false;
}