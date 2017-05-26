window.onload = function(){
	var magnifier = new Magnifier();
	magnifier.init();
};

function Magnifier() {
	this.oDiv = document.getElementById('div1');
	this.oSpan = this.oDiv.getElementsByTagName('span')[0];
	this.oDiv2 = document.getElementById('div2');
	this.oImg = this.oDiv2.getElementsByTagName('img')[0];
};

Magnifier.prototype.init = function() {
	var _this = this;
	this.oDiv.onmouseover = function() {
		_this.oSpan.style.display = 'block';
		_this.oDiv2.style.display = 'block';
	};

	this.oDiv.onmouseout = function() {
		_this.oSpan.style.display = 'none';
		_this.oDiv2.style.display = 'none';
	};
	
	this.oDiv.onmousemove = function(ev) {
		_this.fnMove(ev);
	};
};

Magnifier.prototype.fnMove = function(ev) {
	var ev = ev || window.event;
	var l = ev.clientX - this.oDiv.offsetLeft - this.oSpan.offsetWidth/2;
	var t = ev.clientY - this.oDiv.offsetTop - this.oSpan.offsetHeight/2;

	if (l < 0) {
		l = 0;
	} else if (l > this.oDiv.offsetWidth - this.oSpan.offsetWidth) {
		l = this.oDiv.offsetWidth - this.oSpan.offsetWidth;
	}
	if (t < 0) {
		t = 0;
	} else if (t > this.oDiv.offsetHeight - this.oSpan.offsetHeight) {
		t = this.oDiv.offsetHeight - this.oSpan.offsetHeight;
	}

	this.oSpan.style.left = l + 'px';
	this.oSpan.style.top = t + 'px';

	var scaleX = l / (this.oDiv.offsetWidth - this.oSpan.offsetWidth);
	var scaleY = t / (this.oDiv.offsetHeight - this.oSpan.offsetHeight);
	var imgLeft = scaleX * (this.oImg.offsetWidth - this.oDiv2.offsetWidth);
	var imgTop = scaleY * (this.oImg.offsetHeight - this.oDiv2.offsetHeight);

	this.oImg.style.left = -imgLeft + 'px';
	this.oImg.style.top = -imgTop + 'px';
};