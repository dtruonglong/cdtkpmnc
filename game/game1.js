'use strict';

var resultElem = {},
    currentStatus = {},
    selectedWord = '',
    numberOfTries = 0,
    numberOfFound = 0,
    totalRights = 7;

function randomNumber(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}

function check() {
    var currentValue = this.textContent,
        found = false;

    for (var index = 0, length = selectedWord.length; index < length; index++) {
        if (selectedWord[index] == currentValue) {
            document.getElementsByTagName('input')[index].value = currentValue;
            found = true;
            numberOfFound++;
        }
    }

    if (numberOfFound == selectedWord.length) {
             
            const info = getUrlParameter('info').split('_')
            const username = info[0]
            const id_group = info[1]

            fetch('http://localhost:3000/api/voucher/get-voucher', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json, text/plain, */*',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    "id_group": id_group,
                    "username": username
                })
            }).then(res => res.json())
                .then(res => {
                    alert('Bạn nhận được voucher giảm ' + res.result.code +' % từ cửa hàng!')
                });
       


        resultElem.textContent = 'Congratulations !!!';
        return disableButtons(document.getElementsByTagName('button'));
    }

    this.disabled = true;

    if (found === false) {

        numberOfTries++;
        currentStatus.src = 'img/status_' + numberOfTries + '.gif';

        var resultText = 'Tried ' + numberOfTries + ' times.'
        resultText += '<br />';
        resultText += 'You have ' + (totalRights - numberOfTries) + ' remaining.';
        resultElem.innerHTML = resultText;

        if (numberOfTries == totalRights) {
            disableButtons(document.getElementsByTagName('button'));

            const info = getUrlParameter('info').split('_')
            
            alert('Over game! Bạn không lấy được voucher nào!')
                
        }
    }
}

function disableButtons(buttons) {
    for (var index = 0, length = buttons.length; index < length; index++) {
        buttons[index].disabled = true;
    }
}

function initElement() {
    resultElem = document.getElementById('results');
    currentStatus = document.getElementById('current-status');

    var alphabet = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
    var words = ['MEO'];
    var position = randomNumber(0, words.length);
    selectedWord = words[position].toUpperCase();

    var inputFragment = document.createDocumentFragment();
    for (var index = 0, length = selectedWord.length; index < length; index++) {
        var newInput = document.createElement('input');
        newInput.type = 'text';
        newInput.maxLength = 1;
        newInput.readOnly = true;
        inputFragment.appendChild(newInput);
    }
    document.getElementById('inputs').appendChild(inputFragment);

    var buttonFragment = document.createDocumentFragment();
    for (var index = 0; index < alphabet.length; index++) {
        var newButton = document.createElement('button');
        newButton.textContent = alphabet[index];
        newButton.addEventListener('click', check);
        buttonFragment.appendChild(newButton);
    }
    document.getElementById('buttons').appendChild(buttonFragment);
}

function init() {
    initElement();
}

function getUrlParameter(sParam) {
    var sPageURL = window.location.search.substring(1),
        sURLVariables = sPageURL.split('&'),
        sParameterName,
        i;

    for (i = 0; i < sURLVariables.length; i++) {
        sParameterName = sURLVariables[i].split('=');

        if (sParameterName[0] === sParam) {
            return sParameterName[1] === undefined ? true : decodeURIComponent(sParameterName[1]);
        }
    }
    return false;
};

window.addEventListener('DOMContentLoaded', init);