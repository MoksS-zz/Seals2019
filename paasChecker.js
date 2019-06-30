var passChecker = (function() {
  var i18n = {
    reliable: 'надёжный',
    unreliable: 'ненадёжный',
    publicWarn:
      '— данная комбинация часто встречается в публичных списках паролей',
    sec1: 'секунда',
    sec2: 'секунды',
    sec3: 'секунд',
    min1: 'минута',
    min2: 'минуты',
    min3: 'минут',
    hour1: 'час',
    hour2: 'часа',
    hour3: 'часов',
    day1: 'день',
    day2: 'дня',
    day3: 'дней',
    year1: 'год',
    year2: 'года',
    year3: 'лет',
    infinity: 'бесконечность'
  };

  var reasonElem,
    publicWarnElem,
    checkerBlock,
    resultBlock,
    durationElem,
    timeMsgElem;
  var getNodes = function() {
    reasonElem = document.getElementById('check-reason');
    publicWarnElem = document.getElementById('pass-warn-msg');
    resultBlock = document.getElementById('passResult');
    durationElem = document.getElementById('resStr');
    checkerBlock = document.querySelector('.input-text');
    timeMsgElem = document.querySelector('.pass-checker_info__time');
  };

  var setReliableStyle = function() {
    reasonElem.innerHTML = i18n.reliable;
    reasonElem.style.color = '#00c600';
    timeMsgElem.style.color = '#00c600';
  };
  var setUnreliableStyle = function() {
    reasonElem.innerHTML = i18n.unreliable;
    reasonElem.style.color = '#c60000';
    timeMsgElem.style.color = '#c60000';
  };

  var decOfNum = function(number, titles) {
    var cases = [2, 0, 1, 1, 1, 2];
    return titles[
      number % 100 > 4 && number % 100 < 20
        ? 2
        : cases[number % 10 < 5 ? number % 10 : 5]
    ];
  };

  var timer;
  var debounce = function(pass) {
    if (timer) {
      clearTimeout(timer);
    }
    var doCheck = function() {
      getNodes();
      if (pass) {
        resultBlock.style.display = 'block';
        setUnreliableStyle();

        /*
1. английские буквы маленькие - 26
2. английские буквы большие - 26
3. русские буквы маленькие - 33
4. русские буквы большие - 33
5. цифры - 10
6. набор символов 1 - 18
7. набор символов 2 - 15
*/
        var A = [
          '!',
          '@',
          '#',
          '$',
          '%',
          '^',
          '&',
          '*',
          '( ',
          ')',
          '-',
          '_',
          '=',
          '+',
          '§'
        ];
        var B = [
          '`',
          '~',
          '[',
          ']',
          '{',
          '}',
          ';',
          ':',
          "'",
          '"',
          ',',
          '.',
          '/',
          '<',
          '>',
          '?',
          '\\',
          '|'
        ];

        var points = 0;
        var l = pass.length;
        if (/[a-z]/.test(pass)) {
          points += 26;
        }
        if (/[A-Z]/.test(pass)) {
          points += 26;
        }

        if (/[\u0410-\u042F]/.test(pass)) {
          points += 33;
        }
        if (/[\u0430-\u044F]/.test(pass)) {
          points += 33;
        }
        /*
                pattern = new RegExp('/[А-Я]/ug');
                if (pattern.test(pass)) {
                    points += 33;
                }
                pattern = new RegExp('/[А-Я]/ug');
                if (pattern.test(pass)) {
                    points += 33;
                }
                */
        if (/[0-9]/.test(pass)) {
          points += 10;
        }
        for (var k = 0; k < A.length; k++) {
          if (pass.indexOf(A[k], 0) != -1) {
            points += 18;
            break;
          }
        }
        for (k = 0; k < B.length; k++) {
          if (pass.indexOf(B[k], 0) != -1) {
            points += 12;
            break;
          }
        }

        var combinations = Math.pow(points, l);
        var time = combinations / 4000000000;
        var dim = [i18n.sec1, i18n.sec2, i18n.sec3];

        var color = '#fee3ea';
        if (time > 1000) {
          time = time / 60;
          dim = [i18n.min1, i18n.min2, i18n.min3];
          color = '#ffcfab';
        }
        if (time > 1000) {
          time = time / 60;
          dim = [i18n.hour1, i18n.hour2, i18n.hour3];
          color = '#feeaa1';
        }
        if (time > 10000) {
          time = time / 24;
          dim = [i18n.day1, i18n.day2, i18n.day3];
          color = '#dff09f';
        }
        if (time > 10000) {
          time = time / 365;
          dim = [i18n.year1, i18n.year2, i18n.year3];

          color = '#9de694';
          setReliableStyle();
        }
        if (time > 1) {
          time = Math.round(time);
        }
        if (time < 1) {
          time = 0;
        }

        var str = decOfNum(Math.round(time), dim);
        if (time === Infinity) {
          durationElem.innerHTML = i18n.infinity;
        } else {
          durationElem.innerHTML = '' + time + ' ' + str;
        }
        checkerBlock.style.borderColor = color;
      } else {
        resultBlock.style.display = 'none';
        checkerBlock.style.borderColor = '#ffffff';
      }
    };
    timer = setTimeout(doCheck, 500);
  };

  return {
    check: function(pass) {
      debounce(pass);
    }
  };
})();
