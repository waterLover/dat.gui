
// Only works on the last one
var NumberController = function() {

	this.type = "number";
    
    Controller.apply(this, arguments);
    
    var _this = this;
    
    var isClicked = false;
    var isDragged = false;
    var y, py, initialValue, inc;
    
    py = y = 0;
    inc = initialValue = this.object[this.propertyName];
    
    var min, max;
    (arguments[2] != null) ? min = arguments[2] : min = null;
    (arguments[3] != null) ? max = arguments[3] : max = null;
    
    var amt;
    (arguments[4] != null) ? amt = arguments[4] : amt = (max - min) * .01;
    if(amt == 0) amt = 1;
    
    var button = document.createElement('input');
    button.setAttribute('id', this.propertyName);
    button.setAttribute('type', this.type);
    button.setAttribute('value', inc);
    this.domElement.appendChild(button);
    
    var slider = document.createElement('input');
    slider.setAttribute('id', this.propertyName + "-slider");
    slider.setAttribute('type', 'range');
    slider.setAttribute('value', inc);
    if(min != null && max != null) {
        slider.setAttribute('min', min);
        slider.setAttribute('max', max);
    }
    slider.setAttribute('step', amt);
    this.domElement.appendChild(slider);
    
    button.addEventListener('mousedown', function(e) {
        isClicked = true;
    }, false);
    button.addEventListener('keyup', function(e) {
        var val = parseFloat(this.value);
        if(isNaN(val)) {
            inc = initialValue;
        } else {
            inc = val;
        }
        updateValue(inc);
    }, false);
    slider.addEventListener('mousedown', function(e) {
        isDragged = true;
    }, false);
    document.addEventListener('mouseup', function(e) {
        isClicked = false;
        isDragged = false;
    }, false);
    document.addEventListener('mousemove', function(e) {
        if(isClicked) {
            e.preventDefault();
            py = y;
            y  = e.offsetY;
            var dy = y - py;
            if(dy < 0) {
                if(max != null)
                    (inc >= max) ? inc = max : inc+=amt;
                else
                    inc++;
            } else if(dy > 0) {
            
                if(min != null)
                    (inc <= min) ? inc = min : inc-=amt;
                else
                    inc--;
            }
        } else if(isDragged) {
            if(inc != slider.value) inc = slider.value;
        }
        updateValue(inc);
    }, false);
    
    function updateValue(val) {
        if(inc != val) inc = val;
        button.value = val;
        slider.value = val;
        _this.setValue(val);
    }
    
    this.__defineSetter__("position", function(val) {
        inc = val;
        updateValue(val);
        // possibly push to an array here so that
        // we have a record of "defined" / "presets"
        // ????
    });
};

NumberController.prototype = new Controller();
NumberController.prototype.constructor = NumberController;
