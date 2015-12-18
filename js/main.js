function alertname() {
    var ci, ty;
    ci = document.getElementById("multiselect");
    ty = ci.options[ci.selectedIndex].value;
    return ty;
}
function selectedRegion2(region) {
    var addresse = dataJson.getAddresse();
    document.getElementById("addresse").innerHTML = addresse[region];
}
function selectedRegion() {
    var region, city = dataJson.getCity();
    region = alertname();
    document.getElementById("address").value = city[region];
    selectedRegion2(region);
}
(function() {
    window.onload = function() {
        var inputs = document.getElementsByTagName('input');
        setEvents(inputs);
        var element = document.querySelector('.print');
        element.onclick = function() {
            if (!isValid(inputs)) {
                window.alert('Լրացրեք բոլոր դաշտերը բացառությամբ ստորագրություն դաշտի։');
            } else {
                window.print();
            }
        };
    };
    var isValid = function(inputs) {
        for(var i = 0; i < inputs.length; i++) {
            var input = inputs[i];
            validate(input);
            if (!input.value) {
                return false;
            }
        }
        return true;
    };
    var setEvents = function(inputs) {
        for(var i = 0; i < inputs.length; i++) {
            var input = inputs[i];
            input.onkeyup = function(event) {
                validate(event.target);
            };
            input.onkeydown = function(event) {
                validate(event.target);
            };
            input.onchange = function(event) {
                validate(event.target);
            };
            input.onfocus = function(event) {
                validate(event.target);
            };
        }
    };
    var validate = function(element) {
        element.style.color = 'black';
        if (!element.value) {
            element.style.color = 'red';
        }
    };
})();