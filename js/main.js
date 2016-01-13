(function() {
    window.onload = function() {
        var inputs, element,
            selectedRegion,
            declarer,
            checkPassportSeria,
            location,
            date, code,
            regionSelectVisible,
            inputDay,
            selectDay,
            inputMonth,
            selectMonth,
            dayAndMonth,
            message;
        inputs = document.getElementsByTagName('input');
        setEvents(inputs);
        printButton = document.querySelector('.print');
        message = document.getElementsByClassName('message');
        printButton.onclick = function() {
            if (!(isValid(inputs) && passportValidation() && checkSpace(document.getElementById('declarer').value) && regionValidation())) {
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
            document.getElementById('address').innerHTML = address[region].street + ', ' + address[region].postIndex + ', ' + address[region].location;
        };
        selectedRegion = document.querySelector('#allRegions');
        var regionValidation = function() {
            if (!selectedRegion.value) {
                return false;
            } else {
                return true;
            }
        };
        selectedRegion.onchange = function() {
            var region, city;
            region = getSelectedRegion();
            getRegionById(region);
            city = dataJson.getAddress();
            document.getElementById('assign').innerHTML = city[region].recipient + '</br>' + city[region].name;
        };
        declarer = document.getElementById('declarer');
        declarer.onkeyup = function() {
            var value = document.getElementById('declarer').value;
            if (value) {
                document.getElementById('userName').innerHTML = '<b>' + value + '</b>';
            } else {
                document.getElementById('userName').innerHTML = '<b>' + 'ԱՐՄԻՆԵ ԳՐԻԳՈՐՅԱՆ' + '</b>';
            }
            checkSpace(value);
        };
        var checkSpace = function(value) {
            value = value.trim();
            var space = value.split(' ');
            if (value && space.length !== 3) {
                declarer.style.borderColor = 'red';
                declarer.style.color = '#a94442';
                declarer.style.backgroundColor = '#f2dede';
                message[0].style.visibility = 'visible';
                return false;
            } else {
                declarer.style.borderColor = 'black';
                declarer.style.color = 'black';
                declarer.style.backgroundColor = '#f0f0f0';
                message[0].style.visibility = 'hidden';
                return true;
            }
        };
        checkPassportSeria = document.getElementById('seria');
        checkPassportSeria.onkeyup = function() {
            passportValidation();
        };
        var passportValidation = function() {
            var regExp,
                value,
                inputValue;
            regExp = /^[A-Z]{2}[0-9]{7}$/;
            value = checkPassportSeria.value;
            value = value.trim();
            inputValue = regExp.exec(value);
            if (value && inputValue == null) {
                checkPassportSeria.style.borderColor = 'red';
                checkPassportSeria.style.color = '#a94442';
                checkPassportSeria.style.backgroundColor = '#f2dede';
                message[1].style.visibility = 'visible';
                return false;
            } else {
                checkPassportSeria.style.borderColor = 'black';
                checkPassportSeria.style.color = 'black';
                checkPassportSeria.style.backgroundColor = '#f0f0f0';
                message[1].style.visibility = 'hidden';
                return true;
            }
        };
        location = document.getElementById('location');
        location.onkeyup = function() {
            if (location.value) {
                document.getElementById('userAddress').innerHTML = location.value;
                location.style.borderColor = 'black';
            } else {
                document.getElementById('userAddress').innerHTML = 'ԵՐԵՎԱՆ, ԳԱՐԵԳԻՆ ՆժԴԵՀԻ 20/14';
                location.style.borderColor = 'red';
            }
        };
        date = document.getElementById('date');
        date.onclick = function() {
            date.type = 'date';
            if (!date.value) {
                date.style.borderColor = 'red';
            }
        };
        date.onblur = function() {
            date.readOnly = false;
            date.type = 'text';
            if (date.value.length !== 10) {
                date.value = '';
                date.style.backgroundColor = '#f0f0f0';
            }
        };
        date.onchange = function() {
            date.readOnly = false;
            var dateValue,
                dateMonth;
            date.type = 'text';
            dateValue = date.value.split('-');
            dateMonth = dateValue[1];
            date.style.borderColor = 'black';
            date.value = dateValue[2] + '.' + dateMonth + '.' + dateValue[0];
        };
        date.onkeydown = function() {
            date.readOnly = true;
        };
        code = document.getElementById('code');
        code.onkeyup = function() {
            var regExp,
                value;
            regExp = /^[0-9]{3}$/;
            code.value = code.value.trim();
            value = regExp.exec(code.value);
            if (code.value && value == null) {
                code.style.borderColor = 'red';
                code.style.color = '#a94442';
                code.style.backgroundColor = '#f2dede';
                message[2].style.visibility = 'visible';
            } else {
                code.style.borderColor = 'black';
                code.style.color = 'black';
                code.style.backgroundColor = '#f0f0f0';
                message[2].style.visibility = 'hidden';
            }
        };
        regionSelectVisible = document.getElementById('assign');
        regionSelectVisible.onclick = function() {
            selectedRegion.style.display = 'flex';
            regionSelectVisible.style.display = 'none';
        };
        selectedRegion.onclick = function() {
            selectedRegion.style.display = 'none';
            regionSelectVisible.style.display = 'flex';
        };
        dayAndMonth = document.getElementById('current-date');
        dayAndMonth.onclick = function() {
            dayAndMonth.type = 'date';
            if (!dayAndMonth.value) {
                dayAndMonth.style.borderColor = 'red';
            }
        };
        dayAndMonth.onkeydown = function() {
            dayAndMonth.readOnly = true;
        };
        dayAndMonth.onblur = function() {
            dayAndMonth.type = 'text';
            dayAndMonth.readOnly = false;
        };
        dayAndMonth.onchange = function() {
            dayAndMonth.readOnly = false;
            var dateValue,
                dateMonth,
                monthObj,
                i;
            dayAndMonth.type = 'text';
            dateValue = dayAndMonth.value.split('-');
            dateMonth = parseInt(dateValue[1], 10);
            dayAndMonth.style.borderColor = 'black';
            monthObj = ['հունվար', 'փետրվար', 'մարտ', 'ապրիլ', 'մայիս', 'հունիս', 'հուլիս', 'օգոստոս', 'սեկտեմբեր', 'հոկտոմբեր', 'նոյեմբեր', 'դեկտեմբեր'];
            for (i in monthObj) {
                i = parseInt(i, 10);
                if ((i + 1) == dateMonth) {
                    dateMonth = monthObj[i];
                }
            }
            dayAndMonth.value = '«' + dateValue[2] + '»' + ' ' + dateMonth + ' ' + dateValue[0] + 'թ․';
        };
    }
    var isValid = function(inputs) {
        var i, input, inputsLength = inputs.length;
        for (i = 0; i < inputsLength; i++) {
            input = inputs[i];
            if (!input.value) {
                return false;
            }
        }
        return true;
    };
    var setEvents = function(inputs) {
        var i, input, inputsLength = inputs.length;
        for (i = 0; i < inputsLength; i++) {
            input = inputs[i];
            if (!input.value) {
                input.style.borderColor = 'red';
            }
        }
    };
})();
