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

    $('.modal__close').on('click', function() {
        $('.overlay, #thanks').fadeOut('slow');
    });

    $('form').submit(function(e) {
        e.preventDefault();
        inputs = document.querySelectorAll('input, textarea');
        inputs.forEach(item => {
            if(item.classList.contains('valid')) {
                countinputs++;
            };
        });
        validation = countinputs == inputs.length;
        if (validation) {
            $.ajax({
                type: "POST",
                url: "php/mailer/to_me.php",
                data: $(this).serialize()
            }).done(function() {
                $(this).find("input").val("");
                $('form').trigger('reset');
                $('.overlay, #thanks').fadeIn('slow');
                validation = true;
            });
            $.ajax({
                type: "POST",
                url: "php/mailer/to_users.php",
                data: $(this).serialize()
            });
        };
        countinputs = 0;
        return false;
    });

    // scroll_icon
    $(window).scroll(function() {
        if ($(this).scrollTop() > 800) {
            $('.pageup').fadeIn();
        } else {
            $('.pageup').fadeOut();
        }
    });

    $("a[href^='#up']").click(function() {
        const _href = $(this).attr("href");
        $("html, body").animate({scrollTop: $(_href).offset().top+"px"});
        return false;
    });
});