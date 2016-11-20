/**
 *  
 *  Original sourcemod plugin by nolem
 *  http://tf2rj.com/forum/index.php?topic=1374
 *  
 *  Author :: Tyrael 
 *  
 */

// Server tickrate
var tickRate = 66.666666;

// Special starting types (look straight down fire when going at max horizontal speed (240))
var bounceSpecialVel = { stock_uncrouch_stand: { RL_type: "stock", text: "(Stock) Uncrouch Stand", vel:416.319183 },
                         stock_uncrouch_walk_right: { RL_type: "stock", text: "(Stock) Uncrouch Walk Right", vel:445.528625 },
                         stock_uncrouch_walk_left: { RL_type: "stock", text: "(Stock) Uncrouch Walk Left", vel:371.735992 },
                         stock_uncrouch_walk_forward: { RL_type: "stock", text: "(Stock) Uncrouch Walk Forward", vel:395.333892 },
                         stock_uncrouch_walk_backward: { RL_type: "stock", text: "(Stock) Uncrouch Walk Backward", vel:407.484252 },
                         stock_crouch_stand: { RL_type: "stock", text: "(Stock) Crouch Stand", vel:591.278747 },
                         stock_crouch_walk_right: { RL_type: "stock", text: "(Stock) Crouch Walk Right", vel:604.681030 },
                         stock_crouch_walk_left: { RL_type: "stock", text: "(Stock) Crouch Walk Left", vel:576.230651 },
                         stock_crouch_walk_forward: { RL_type: "stock", text: "(Stock) Crouch Walk Forward", vel:600.576049 },
                         stock_crouch_walk_backward: { RL_type: "stock", text: "(Stock) Crouch Walk Backward", vel:579.762084 },
                         original_uncrouch_stand: { RL_type: "original", text: "(Original) Uncrouch Stand", vel:445.987030 },
                         original_uncrouch_walk_leftright: { RL_type: "original", text: "(Original) Uncrouch Walk Left/Right", vel:419.643127 },
                         original_uncrouch_walk_forward: { RL_type: "original", text: "(Original) Uncrouch Walk Forward", vel:413.770080 },
                         original_uncrouch_walk_backward: { RL_type: "original", text: "(Original) Uncrouch Walk Backward", vel:429.626434 },
                         original_crouch_stand: { RL_type: "original", text: "(Original) Crouch Stand", vel:631.862487 },
                         original_crouch_walk_leftright: { RL_type: "original", text: "(Original) Crouch Walk Left/Right", vel:629.907165 },
                         original_crouch_walk_forward: { RL_type: "original", text: "(Original) Crouch Walk Forward", vel:645.274536 },
                         original_crouch_walk_backward: { RL_type: "original", text: "(Original) Crouch Walk Backward", vel:616.711364 },
						 
                         stock_uncrouch_forwardright: { RL_type: "stock", text: "(Stock) Uncrouch Forward&Right", vel: 422.054656, note: "[Unreliable]" },
                         stock_uncrouch_forwardleft: { RL_type: "stock", text: "(Stock) Uncrouch Forward&Left", vel: 376.538848, note: "[Unreliable]" },
                         stock_uncrouch_backwardright: { RL_type: "stock", text: "(Stock) Uncrouch Backward&Right", vel: 432.042541, note: "[Unreliable]" },
                         stock_crouch_forwardright: { RL_type: "stock", text: "(Stock) Crouch Forward&Right", vel: 608.236206, note: "[Unreliable]" },
                         stock_crouch_backwardleft: { RL_type: "stock", text: "(Stock) Crouch Backward&Right", vel: 592.538208, note: "[Unreliable]" },

                         cowmangler_uncrouch_stand: { RL_type: "cowmangler", text: "(Cow Mangler) Uncrouch Stand", vel:429.504699 },
                         cowmangler_uncrouch_walk_right: { RL_type: "cowmangler", text: "(Cow Mangler) Uncrouch Walk Right", vel:442.260070 },
                         cowmangler_uncrouch_walk_left: { RL_type: "cowmangler", text: "(Cow Mangler) Uncrouch Walk Left", vel:388.864471 },
                         cowmangler_uncrouch_walk_forward: { RL_type: "cowmangler", text: "(Cow Mangler) Uncrouch Walk Forward", vel:405.110443 },
                         cowmangler_uncrouch_walk_backward: { RL_type: "cowmangler", text: "(Cow Mangler) Uncrouch Walk Backward", vel:418.827087 },
                         cowmangler_crouch_stand: { RL_type: "cowmangler", text: "(Cow Mangler) Crouch Stand", vel:612.282043 },
                         cowmangler_crouch_walk_right: { RL_type: "cowmangler", text: "(Cow Mangler) Crouch Walk Right", vel:621.940307 },
                         cowmangler_crouch_walk_left: { RL_type: "cowmangler", text: "(Cow Mangler) Crouch Walk Left", vel:600.181823 },
                         cowmangler_crouch_walk_forward: { RL_type: "cowmangler", text: "(Cow Mangler) Crouch Walk Forward", vel:623.124084 },
                         cowmangler_crouch_walk_backward: { RL_type: "cowmangler", text: "(Cow Mangler) Crouch Walk Backward", vel:599.182861 }					 
                        };
						
// nolem's checkBounce function
function checkBounce(height, floor_height, velocity, b_type)
{
	if (typeof(b_type) === "undefined") { b_type = "UNCROUCHED" }
	
	var grav = 0.18
	var vel = 0;
	var bounce = 0;
	var pos = height;
	
	if (b_type == "CROUCHED") {
		pos += 20;
	}
	
	if (velocity == 0) {
		vel = 0.18;
	}
	else {
		vel = 0.09 + velocity / tickRate;
	}
	
	while ((pos + 50) > floor_height) {
		
		vel -= grav;
		
		if (vel <= -52.5) {
			vel = -52.5;
		}
		
		pos += vel;
		
		if (1.98 > (pos-floor_height) && (pos - floor_height) > 0.99) {
			bounce = 1;
			break;
		}
	}
	
	return bounce;
}

function calculateAngle(floor_height, nearestAngle, rl_type, s_type, l_type)
{
	if (typeof(nearestAngle) === "undefined") { nearestAngle = 60.0 }
	if (typeof(rl_type) === "undefined") { rl_type = "STOCK" }
	if (typeof(s_type) === "undefined") { s_type = "UNCROUCHED" }
	if (typeof(l_type) === "undefined") { l_type = "UNCROUCHED" }
	
	var angleOut = [0.0, 0.0];
	
	var bounceL = 0;
	var bounceVarianceL = 1;
	
	var tempVariance = 0.01;
	
	if (nearestAngle < 45 || nearestAngle > 89) {
		var tempAngle = 45.0;
	}
	else {
		var tempAngle = nearestAngle;
	}
	
	while (!bounceL) {
		var vel1 = calculateVel(tempAngle, rl_type, s_type);
		var vel2 = vel1 - 12.0
		
		var height = (((vel1 + vel2) / 2) / tickRate);
		
		if (s_type == "CROUCHED") { height -= 20 }
		
		if (checkBounce(height, floor_height, vel2, l_type)) {
			bounceL = 1;
			angleOut[0] = tempAngle;
			
			// Once the angle is found check angle +0.01 to see what range you can use and still bounce
			while (bounceVarianceL) {
				
				var verVel1 = calculateVel((tempAngle + tempVariance), rl_type, s_type);
				var verVel2 = verVel1 - 12.0
		
				var verHeight = (((verVel1 + verVel2) / 2) / tickRate);
				
				if (s_type == "CROUCHED") { verHeight -= 20 }
				
				if (checkBounce(verHeight, floor_height, verVel2, l_type)) {
					angleOut[1] = tempVariance;
					tempVariance += 0.01;
				}
				else {
					bounceVarianceL = 0;
					break;
				}
			}
			break;
		}
		else {
			tempAngle += 0.01;
		}
		// Stop it from going forever
		if (tempAngle > 89) {
			return [0, 0];
		}
	}
	return angleOut;
}

function calculateVel(angle, rl_type, s_type)
{
	// Use polynomial  functions to estimate what angle will give what velocity
	if (rl_type == "STOCK") {
		if (s_type == "UNCROUCHED") {
			var velocity = 1.1188069518073094e+003 * Math.pow(angle,0) 
			               + -9.4470082941572556e+001 * Math.pow(angle,1) 
			               +  3.1437606011469272e+000 * Math.pow(angle,2) 
			               + -4.0376921140145704e-002 * Math.pow(angle,3)
			               +  9.3311202118049295e-006 * Math.pow(angle,4)
			               +  6.4727269481056722e-006 * Math.pow(angle,5)
			               + -1.1651051659014418e-007 * Math.pow(angle,6)
			               +  1.2571277947911981e-009 * Math.pow(angle,7)
			               + -3.0365381334551026e-013 * Math.pow(angle,8)
			               + -1.2132718662137765e-013 * Math.pow(angle,9)
			               + -1.2464879869178670e-015 * Math.pow(angle,10)
			               +  5.1481275613195712e-017 * Math.pow(angle,11)
			               + -4.5875468994964854e-019 * Math.pow(angle,12)
			               +  1.3577824485845547e-021 * Math.pow(angle,13);
			return velocity;
		}
		else if (s_type == "CROUCHED") {
			var velocity = -5.2027127521770979e+001 * Math.pow(angle,0)
			               +  3.0733029008180797e+000 * Math.pow(angle,1)
			               +  2.3908124362736322e-001 * Math.pow(angle,2)
			               + -4.3478392989728040e-003 * Math.pow(angle,3)
			               +  1.8765632022340585e-005 * Math.pow(angle,4)
			               +  6.1766160283345954e-007 * Math.pow(angle,5)
			               + -1.0226309572660330e-008 * Math.pow(angle,6)
			               + -3.9733523679673720e-011 * Math.pow(angle,7)
			               +  2.9326047398834415e-012 * Math.pow(angle,8)
			               + -2.8576980477156293e-014 * Math.pow(angle,9)
			               + -1.7276688436622473e-016 * Math.pow(angle,10)
			               +  5.8335831342721851e-018 * Math.pow(angle,11)
			               + -4.6018582481875083e-020 * Math.pow(angle,12)
			               +  1.2674957409912882e-022 * Math.pow(angle,13);
			return velocity;
		}
	}
	else if (rl_type == "ORIGINAL") {
		if (s_type == "UNCROUCHED") {
			var velocity = -2.3845167904642790e+002 * Math.pow(angle,0)
			               +  1.1061405198114741e+001 * Math.pow(angle,1)
			               +  2.0950128858174955e-001 * Math.pow(angle,2)
			               + -1.2519137714164899e-002 * Math.pow(angle,3)
			               +  2.2025450144075494e-004 * Math.pow(angle,4)
			               + -1.9326139180248899e-006 * Math.pow(angle,5)
			               +  3.7435475638867103e-008 * Math.pow(angle,6)
			               + -6.3058661805399250e-010 * Math.pow(angle,7)
			               + -1.6267777362879090e-012 * Math.pow(angle,8)
			               +  8.3956995277258400e-014 * Math.pow(angle,9)
			               +  1.3864770303276377e-015 * Math.pow(angle,10)
			               + -4.2611643493827815e-017 * Math.pow(angle,11)
			               +  3.5341533664469049e-019 * Math.pow(angle,12)
			               + -1.0075343975770242e-021 * Math.pow(angle,13);
			return velocity;
		}
		else if (s_type == "CROUCHED") {
			var velocity = -6.0645435350454797e+001 * Math.pow(angle,0)
			               +  4.7176721952763936e+000 * Math.pow(angle,1)
			               +  1.2846611744133046e-001 * Math.pow(angle,2)
			               + -8.7270362108242969e-004 * Math.pow(angle,3)
			               + -1.9722592749818588e-005 * Math.pow(angle,4)
			               +  1.4099345988711197e-007 * Math.pow(angle,5)
			               +  6.3019443428803775e-009 * Math.pow(angle,6)
			               + -7.2248330988068600e-011 * Math.pow(angle,7)
			               + -6.8271309471408132e-013 * Math.pow(angle,8)
			               +  1.0354962041869418e-014 * Math.pow(angle,9)
			               +  6.8109092814229543e-017 * Math.pow(angle,10)
			               + -1.5773944858723984e-018 * Math.pow(angle,11)
			               +  7.6958302376447260e-021 * Math.pow(angle,12)
			               + -9.2439581078246086e-024 * Math.pow(angle,13);
			return velocity;
		}
	}
}

function findSpecialBounce(floor_height, sb_type, l_type)
{
	if (typeof(l_type) === "undefined") { l_type = "UNCROUCHED" }
	
	var vel1 = bounceSpecialVel[sb_type]["vel"];
	var vel2 = vel1 - 12.0;

	var height = (((vel1 + vel2) / 2) / tickRate);
	
	// Check to see if the start is crouched or uncrouched
	if (sb_type.indexOf("uncrouch") === -1) {
		height -= 20;
	}
	
	return checkBounce(height, floor_height, vel2, l_type)
}