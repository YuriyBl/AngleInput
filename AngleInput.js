var AngleInput = function(selector, object, callback){
	if (typeof(object) === 'object') {
		inputSize = object['size'];
		inputColor = object['color'];
	} else {
		inputSize = '30px';
		inputColor = 'grey';
		callback = object;
	}
	var input = document.querySelector(selector);
	html = 	'<div style="width:100%;height:100%;position:relative">'+
					'<div style="width:50%;'+
					'height:2px;'+
					'background:'+inputColor+';'+
					'position:absolute;'+
					'top:50%;'+
					'transform:translate(0, -50%);">'+
						'<div style="width:6px;'+
										'height:6px;'+
										'border-radius:3px;'+
										'background:'+inputColor+';'+
										'position:absolute;'+
										'right:0;'+
										'bottom:0;'+
										'transform:translate(50%,2px)"></div>'+
						'</div>'+
					'</div>';
	input.innerHTML = html;
	input.style.width = inputSize;
	input.style.height = inputSize;
	input.style.border = '3px solid '+inputColor;
	input.style.boxSizing = 'border-box';
	input.style.cursor = 'pointer';
	input.style.borderRadius = input.getBoundingClientRect()['width']/2+'px';

	var rotatingElement = input.querySelector('div');

	rotatingElement.onmousedown = function(e){
		elementX = rotatingElement.getBoundingClientRect()['x'];
		elementY = rotatingElement.getBoundingClientRect()['y'];
		elementWidth = rotatingElement.getBoundingClientRect()['width'];
		elementHeight = rotatingElement.getBoundingClientRect()['height'];
		elementCenterX = ecX = elementX+(elementWidth/2);
		elementCenterY = ecY = elementY+(elementHeight/2);
		hV = [1, 0];
		
		input.style.cursor = 'grabbing';
		
		mouseX = mX = e.clientX;
		mouseY = mY = e.clientY;

		mouseToElementVertex = mteV = [
			elementCenterX-mouseX,
			elementCenterY-mouseY
		];
		cos = (-mteV[0] / 
				 Math.sqrt((mteV[0]*mteV[0]) + (mteV[1]*mteV[1])));
		deg = Math.floor(180-(Math.acos(cos)*180/Math.PI));
		if (mY>=ecY) {deg = 360-deg;}
		rotatingElement.style.transform = 'rotateZ('+deg+'deg)';
		callback( deg );


		document.onmousemove = function(e){
			document.querySelector('html').style.cursor = 'grabbing';
			
			mouseX = mX = e.clientX;
			mouseY = mY = e.clientY;

			mouseToElementVertex = mteV = [
				elementCenterX-mouseX,
				elementCenterY-mouseY
			];
			cos = (-mteV[0] / 
					 Math.sqrt((mteV[0]*mteV[0]) + (mteV[1]*mteV[1])));
			deg = Math.floor(180-(Math.acos(cos)*180/Math.PI));
			if (mY>=ecY) {deg = 360-deg;}
			
			if(e.shiftKey){deg = Math.floor(deg/15)*15;}
			
			rotatingElement.style.transform = 'rotateZ('+deg+'deg)';
			callback( deg );
			return false;
		}
		document.onmouseup = function(e){
			document.onmousemove = null;
			document.querySelector('html').style.cursor = 'default';
			input.style.cursor = 'pointer';
		}
	};
};
window.AngleInput = AngleInput;