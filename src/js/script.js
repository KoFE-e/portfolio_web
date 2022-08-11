const hamburger = document.querySelector('.hamburger'),
      menu = document.querySelector('.menu'),
      closeElem = document.querySelector('.menu__close');

hamburger.addEventListener('click', () => {
    menu.classList.add('active');
});

closeElem.addEventListener('click', () => {
    menu.classList.remove('active');
});

const counters = document.querySelectorAll('.skills__ratings-counter'),
      lines = document.querySelectorAll('.skills__ratings-line span');

counters.forEach( (item, i) => {
    lines[i].style.width = item.innerHTML;
});

var inputs = document.querySelectorAll('input, textarea');
var countinputs = 0;
var validation = true;

$(document).ready(function(){
    $('#contacts-form').validate({
        rules: {
            name: {
                required: true,
                minlength: 2
            },
            email: {
                required: true,
                email: true
            },
            text: {
                required: true,
                minlength: 10
            },
            check: "required"
        },
        messages: {
            name: {
                required: "Пожалуйста, введите свое имя",
                minlength: jQuery.validator.format("Введите не менее {0}-ух символов")
            },
            email: {
                required: "Пожалуйста, введите свою почту",
                email: "Неправильно введен адрес почты"
            },
            text: {
                required: "Пожалуйста, введите сообщение",
                minlength: jQuery.validator.format("Введите не менее {0}-и символов")
            },
            check: "Пожалуйста, поставьте галочку, если Вы согласны с политикой конфиденциальности"
        }
    });

    $('form').submit(function(e) {
        e.preventDefault();
        inputs = document.querySelectorAll('input, textarea');
        inputs.forEach(item => {
            if(item.classList.contains('valid')) {
                countinputs++;
            };
        });
        validation = countinputs == 4;
        if (validation) {
            $.ajax({
                type: "POST",
                url: "php/mailer/smart.php",
                data: $(this).serialize()
            }).done(function() {
                $(this).find("input").val("");
                $('form').trigger('reset');
                validation = true;
            });
        };
        countinputs = 0;
        return false;
    });
});