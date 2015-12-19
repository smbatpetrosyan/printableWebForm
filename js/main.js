(function() {
    window.onload = function() {
        var inputs, element;
        inputs = document.getElementsByTagName('input');
        setEvents(inputs);
        element = document.querySelector('.print');
        element.onclick = function() {
            if (!isValid(inputs)) {
                window.alert('Լրացրեք բոլոր դաշտերը բացառությամբ ստորագրություն դաշտի։');
            } else {
                window.print();
            }
        };
        var getSelectedRegion = function() {
            var allRegions,
                selectedRegion;
            allRegions = document.getElementById('allRegions');
            selectedRegion = allRegions.options[allRegions.selectedIndex].value;
            return selectedRegion;
        }
        var getRegionById = function(region) {
            var address = dataJson.getAddress();
            document.getElementById('address').innerHTML = address[region];
        }
        var selectedRegion = document.querySelector('#allRegions');
        selectedRegion.onchange = function() {
            var region, city;
            region = getSelectedRegion();
            getRegionById(region);
            city = dataJson.getCity();
            document.getElementById('assign').value = city[region];
        };
    };
    var isValid = function(inputs) {
        var i, input;
        for(i = 0; i < inputs.length; i++) {
            input = inputs[i];
            validate(input);
            if (!input.value) {
                return false;
            }
        }
        return true;
    };
    var setEvents = function(inputs) {
        var i, input;
        for(i = 0; i < inputs.length; i++) {
            input = inputs[i];
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