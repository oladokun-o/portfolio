$(document).ready(function () {
    $("form").submit(function (event) {
        event.preventDefault();
        $(this).find('input,textarea,button').attr('disabled', true);
        $(this).find('button').html('<div class="spinner-border spinner-border-sm text-light" role="status"></div> Sending..')
        var formData = {
            'first name': $("#fname").val(),
            'last name': $("#lname").val(),
            phone: $("#phone").val(),
            email: $("#email").val(),
            subject: $("#subject").val(),
            message: $("#message").val()
        };

        $.ajax({
        type: "POST",
        url: "https://script.google.com/macros/s/AKfycbyR21h8msnjRiacTY7XPzLr6CJaLttRSj_kBqmkILMagv_2wH8BcwpIonP93As_469QMg/exec",
        data: formData,
        dataType: "json",
        encode: true,
        }).done(function (data) {            
            if (data.result === 'success') {
                $('form').find('.msg').html('<div class="alert alert-success">Message sent!</div>');
                $('form').find('input,textarea').val('');
                $('form').find('input,textarea,button').attr('disabled', false);
                $('form').find('button').html('<i class="icon-check text-success"></i> Sent!');
                setTimeout(() => {
                    $('form').find('.msg').html('');
                    $('form').find('button').html('Send Message');    
                }, 1500);
            } else if (data.result === 'error') {
                $('form').find('.msg').html('<div class="alert alert-danger">An error occured, please try again later.</div>')			
                $('form').find('input,textarea,button').attr('disabled', false);
                $('form').find('button').html('Send Message');
                setTimeout(() => {
                    $('form').find('.msg').html('');
                }, 3000);
            }
        })
    });
});