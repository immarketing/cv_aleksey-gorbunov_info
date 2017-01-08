/**
 * Created by AVGorbunov on 19.02.2016.
 */

function testFunction() {

}

function getCVProjectsData() {
    "use strict";
    var car = [{type: "Fiat", model: "500", color: "white"}]
        ;

}

$(document).ready(function () {
    $('#cv_navbar').on('activate.bs.scrollspy', function () {
        var currentItem = $(".nav li.active > a").text();
        console.log("Сейчас вы находитесь - " + currentItem);
    });
    $('body').each(function () {
        var $spy = $(this).scrollspy('refresh')
    });
    // Add smooth scrolling to all links in navbar + footer link
    $(".navbar a, footer a[href='#myPage']").on('click', function (event) {

        // Prevent default anchor click behavior
        event.preventDefault();

        // Store hash
        var hash = this.hash;

        // Using jQuery's animate() method to add smooth page scroll
        // The optional number (900) specifies the number of milliseconds it takes to scroll to the specified area
        $('html, body').animate({
            scrollTop: $(hash).offset().top
        }, 900, function () {

            // Add hash (#) to URL when done scrolling (default click behavior)
            window.location.hash = hash;
        });
    });
    //$("#compList > button").addClass("btn btn-default btn-sm");
});

$(document).ready(function () {
    $("#txtPlaceholder").on("hide.bs.collapse", function () {
        $("#txtOpener").html('<span class="glyphicon glyphicon-collapse-down"></span> Показать');
    });
    $("#txtPlaceholder").on("show.bs.collapse", function () {
        $("#txtOpener").html('<span class="glyphicon glyphicon-collapse-up"></span> Скрыть');
    });
});

$(document).ready(function () {
    $('[data-toggle="popover"]').popover();
});


$(window).scroll(function () {
    $(".slideanim").each(function () {
        var pos = $(this).offset().top;

        var winTop = $(window).scrollTop();
        if (pos < winTop + 600) {
            $(this).addClass("slide");
        }
    });
});

