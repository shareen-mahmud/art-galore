$(document).ready(function () {

    // full height sidebar functionality
    function sideBar() {
        var selectorClick = $('.navbar-toggle');
        var selectorParent = $('.navbar-default');

        if(selectorClick.attr('aria-expanded') == 'true') {
            selectorParent.removeClass('expanded');
            selectorParent.nextAll().removeClass('hidden-xs');
        } else {
            selectorParent.addClass('expanded');
            selectorParent.nextAll().addClass('hidden-xs');
        }
    };

    // call full height sidebar functionality inside mobile navigation toggle button
    $('body').on('click', '.navbar-toggle', function() {
        sideBar();
        // set down arrow for all icon at the time of closing expanded navbar
        $('#navbar').find('.arrow').text('keyboard_arrow_down');
    });

    // set down arrow for all icon clicking anywhere
    $(document).click(function (event) {
        var clickover = $(event.target);
        var $navbar = $('#navbar');
        var _opened = $navbar.hasClass('in');
        if (_opened === true && !clickover.hasClass('navbar-toggle')) {
            $('#navbar').find('.arrow').text('keyboard_arrow_down');
        }

    });

    // hide expanded navbar by clicking on the navbar-control & logo when navbar is expanded
    $('body').on('click', '.navbar-control, .navbar-brand', function() {
        if($('#navbar').attr('aria-expanded') == 'true') {
            // remove full height sidebar functionality
            $('#navbar').collapse('hide');
            $('.navbar-default').removeClass('expanded');
            $('.navbar-default').nextAll().removeClass('hidden-xs');
        }
    });

    // hide expanded notification by clicking outside
    $(document).click(function (event) {
        var clickoverNotification = $(event.target);
        var $notificationBar = $('#notification');
        var elem_not = $('#notification > .nav');
        var _openedNotification = $notificationBar.hasClass('in');
        if (_openedNotification === true && !clickoverNotification.hasClass('notification-toggle') && !elem_not.is(event.target) && elem_not.has(event.target).length === 0) {
            $notificationBar.collapse('hide');
        }
    });

    // hide expanded notification by clicking at Dropdown, Grid View Control and Btn-Select
    $('body').on('click', '.dropdown, .grid-view-control, .btn-select .dropdown-toggle', function() {
        var $notificationBar = $('#notification');
        var _openedNotification = $notificationBar.hasClass('in');
        if (_openedNotification === true)
            $notificationBar.collapse('hide');
    });

    // event for clicking at notification-toggle
    $('body').on('click', '.notification-toggle', function() {
        // remove unread status from notification icon
        $(this).find('.unread-notification').hide();
    });

    // set Notification Box's max-height related to viewport height for enable scrolling at small device
    function setNotificationHeight() {
        var bodyHeight = $(window).height();
        $('.navbar-fixed-top .navbar-collapse').css('max-height', bodyHeight - 50);
    };

    setNotificationHeight();

    $(window).resize(function() {
        setNotificationHeight();
    });


    // remove unread status from notification items
    $('body').on('click', '.notification-collapse li', function() {
        $(this).find('.notification-pointer').hide();
    });

    // change dropdown arrow of nav when click on other dropdown nav
    $('body').on('click', '#navbar .navbar-nav .dropdown-toggle', function() {
        if ($(this).children('.arrow').length) {
            $(this).parents('#navbar').find('.arrow').text('keyboard_arrow_down');

            if($(this).parent().hasClass('open'))
                $(this).children('.arrow').text('keyboard_arrow_down');
            else
                $(this).children('.arrow').text('keyboard_arrow_up');
        }
    });

    // display tooltip
    $('[data-toggle="tooltip"]').tooltip();

    // appearing title & description of photos at hover
    $('.photograph-link').on('mouseenter',function(){
        $(this).find('.overlay').addClass('overlay-visible');
    });
    $('.photograph-link').on('mouseleave',function(){
        $(this).find('.overlay').removeClass('overlay-visible');
    });

    // make dropdown button as selected dropdown option
    $('body').on('click' , '.btn-select .dropdown-menu a', function() {
        $(this).parents('.dropdown-menu').find('a').removeClass('active');
        $(this).addClass('active');
        var selected = $(this).text();
        $(this).parents('.btn-select').find('.selected-text').text(selected);
    });
});

