/*===========================
=            URL            =
===========================*/

function url(path = '') {
  let base_url;

  // Detect if running on localhost
  if (window.location.hostname === 'localhost') {
    base_url = 'http://localhost/git';
  } else {
    base_url = 'https://www.binghatti.com';
  }

  // Build the full URL
  if (path !== '') {
    base_url += '/' + path.replace(/^\/+/, ''); // remove leading slash if present
  }

  return base_url;
}


/*=====  End of URL  ======*/



/*========================================
=            Check Visibility            =
========================================*/

function onVisible(element, callback) {
    let observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                callback();
                observer.disconnect(); // Stop observing once the callback is triggered
            }
        });
    }, { threshold: 0.50 }); // Trigger when 75% of the element is visible

    document.querySelectorAll(element).forEach(el => observer.observe(el));
}

/*=====  End of Check Visibility  ======*/


/*==============================
=            Footer            =
==============================*/

onVisible('.main-footer', function() {

  // Add a delay before the image zooms in
  setTimeout(() => {
      $(".main-footer-bg").addClass("main-footer-bg-zoom-in"); // Zoom In after delay
      
      setTimeout(() => {
          $(".main-footer-bg").removeClass("main-footer-bg-zoom-in").addClass("main-footer-bg-zoom-out"); // Zoom Out after 6s
      }, 3000); // Keep delay before main-footer-bg-zoom-out starts
      
  }, 1000); // 1s delay before zoom starts

  // Text Animation
  setTimeout(() => {
      $(".footer-connect").addClass("active"); // Move Up & Scale Up
  }, 1000);

  setTimeout(() => {
      $(".footer-connect").addClass("fade-out"); // Scale Down & Fade Out
  }, 3500);

  setTimeout(function() {
    $('.main-footer').addClass('main-footer-active');
    // alert('ddd');
  }, 3500);

});

/*=====  End of Footer  ======*/


/*===================================
=            Mobile Menu            =
===================================*/

$(document).ready(function () {
  // Toggle menu on icon click
  $('.menu-icon').click(function (e) {
    e.stopPropagation(); // Prevent event from bubbling to document

    $(this).toggleClass('menu-active');

    if ($('.mobile-menu').hasClass("mobile-menu-active")) {
      // If menu is open, remove the class after 300ms
      setTimeout(function () {
        $('.mobile-menu').removeClass("mobile-menu-active");
      }, 300);
    } else {
      // If menu is closed, add the class instantly
      $('.mobile-menu').addClass("mobile-menu-active");
    }

    $('.mobile-menu').toggleClass("mobile-menu-active-li");
  });

  // Prevent clicks inside the menu from closing it
  $('.mobile-menu').click(function (e) {
    e.stopPropagation();
  });

  // Close menu when clicking anywhere outside
  $(document).click(function () {
    if ($('.mobile-menu').hasClass("mobile-menu-active")) {
      $('.menu-icon').removeClass('menu-active');
      $('.mobile-menu').removeClass("mobile-menu-active mobile-menu-active-li");
    }
  });
});


$(document).ready(function() {
    // When clicking a menu item with a submenu
    $(".main-menu ul li > a").click(function(event) {
        // Check if the clicked menu item has a submenu
        if ($(this).next("ul").length) {
            event.preventDefault(); // Prevent default link behavior

            // Close other open submenus (Optional: Remove if you want multiple open)
            $(this).parent().siblings().find("ul").slideUp();

            // Toggle the clicked submenu
            $(this).next("ul").slideToggle();
        }
    });
});

$(document).ready(function () {
    let prevScrollpos = $(window).scrollTop();
    let navbar = $(".main-header");

    // Ensure the navbar is visible on page load
    if (prevScrollpos <= 0) {
        navbar.addClass("main-header-action").css("top", "0");
    }

    $(window).on("scroll", function () {
        let currentScrollPos = $(window).scrollTop();

        // If at the top of the page, show navbar
        if (currentScrollPos <= 0) {
            navbar.addClass("main-header-action").css("top", "0");
        }
        // If scrolling down, hide navbar
        else if (prevScrollpos < currentScrollPos) {
            navbar.removeClass("main-header-action").css("top", "-150px");
        }
        // If scrolling up, show navbar
        else {
            navbar.addClass("main-header-action").css("top", "0");
        }

        prevScrollpos = currentScrollPos;
    });
});

/*=====  End of Mobile Menu  ======*/


/*====================================
=            Search Popup            =
====================================*/

$(document).ready(function() {
    // When clicking a menu item with a submenu
    $(".search-icon").click(function() {
        $('.search-pop-up').slideDown(500)
    });

    $(".search-pop-up").click(function() {
        $('.search-pop-up').slideUp(500)
    });

});

/*=====  End of Search Popup  ======*/


/*==================================
=            Call Popup            =
==================================*/

$(document).ready(function() {
    // Open the call popup
    $('.open-call-popup').click(function(e){
        e.preventDefault(); // ✅ Prevent href from triggering navigation
        $('.call-popup').slideDown(300);
    });

    // Close the call popup
    $('.call-popup .xmark').click(function(){
        $('.call-popup').slideUp(300);
    });
});

$(document).ready(function() {

  // Open the call popup
  $('.open-call-popup-for-lead').click(function(e){
    e.preventDefault(); // ✅ Prevent href from triggering navigation
    $('.call-popup').slideDown(300);
    $('.call-popup').addClass('lead-in-popup');
  });

  // Show popup automatically on page load
  setTimeout(function() {
    $('.call-popup').slideDown(300);
    $('.call-popup').addClass('lead-in-popup');
  }, 500); // 0.5s after page load

    // Close the call popup
    $('.call-popup .xmark').click(function(){
        $('.call-popup').slideUp(300);
        $('.call-popup').removeClass('lead-in-popup');
    });
});

/*=====  End of Call Popup  ======*/


/*=============================================
=             Terms and Conditions            =
=============================================*/

$(document).ready(function() {
    // Open the call popup
    $('.open-terms-and-conditions').click(function(e){
        e.preventDefault(); // ✅ Prevent href from triggering navigation
        $('.terms-and-conditions').slideDown(300);
        $.get( url() + "/terms-and-conditions", function( data ) {
          $( ".terms-and-conditions-result" ).html( data );
        });
    });

    // Close the call popup
    $('.terms-and-conditions .xmark').click(function(){
        $('.terms-and-conditions').slideUp(300);
    });
});

/*=====  End of  Terms and Conditions  ======*/


/*=================================================================
=            Add/Remove Class Based on Scroll Position            =
=================================================================*/

$(document).ready(function () {
    function toggleActiveClass() {
        $(".main-header").toggleClass("main-header-logo", $(window).scrollTop() > 200);
    }

    // ✅ Check on page load
    toggleActiveClass();

    // ✅ Detect scroll changes
    $(window).on("scroll", toggleActiveClass);
});

/*=====  End of Add/Remove Class Based on Scroll Position  ======*/

/*====================================
=            Country Code            =
====================================*/

// const select = document.querySelector('.country_code');

// function updateSelectedText() {
//   const selected = select.options[select.selectedIndex];
//   if (selected.value) {
//     // Reset all option texts first
//     for (let i = 0; i < select.options.length; i++) {
//       const fullText = select.options[i].getAttribute('data-full') || select.options[i].text;
//       select.options[i].text = fullText;
//     }

//     const original = selected.text;
//     const match = original.match(/\(\+?[0-9]+\)/);
//     if (match) {
//       selected.setAttribute('data-full', original); // backup full text
//       selected.text = match[0].replace(/[()]/g, '');
//     }
//   }
// }

// select.addEventListener('change', updateSelectedText);

const select = document.querySelector('.country_code');

if (select) { // check if select exists
    select.addEventListener('change', updateSelectedText);
    updateSelectedText(); // call once on page load
}

function updateSelectedText() {
  const selected = select.options[select.selectedIndex];
  
  if (selected && selected.value) {
    // Reset all option texts first
    for (let i = 0; i < select.options.length; i++) {
      const fullText = select.options[i].getAttribute('data-full') || select.options[i].text;
      select.options[i].text = fullText;
    }

    const original = selected.text;
    const match = original.match(/\(\+?[0-9]+\)/);
    
    if (match) {
      selected.setAttribute('data-full', original); // backup full text
      selected.text = match[0].replace(/[()]/g, ''); // remove brackets
    }
  }
}


/*=====  End of Country Code  ======*/

/*=========================================
=            Video Call Action            =
=========================================*/

$('.video-call-click').click(function(){
    $('.call-popup').fadeOut(500)
    $('.video-call').fadeIn(500)
})

/*=====  End of Video Call Action  ======*/

/*===============================================
=            Country Code Formatting            =
===============================================*/

function initCountryCodeFormatter(selector) {
  const select = document.querySelector(selector);

  function updateSelectedText() {
    if (!select) return;

    const selected = select.options[select.selectedIndex];
    if (selected && selected.value) {
      for (let i = 0; i < select.options.length; i++) {
        const fullText = select.options[i].getAttribute('data-full') || select.options[i].text;
        select.options[i].text = fullText;
      }

      const match = selected.text.match(/\(\+?[0-9]+\)/);
      if (match) {
        selected.setAttribute('data-full', selected.text);
        selected.text = match[0].replace(/[()]/g, '');
      }
    } else {
      for (let i = 0; i < select.options.length; i++) {
        const fullText = select.options[i].getAttribute('data-full');
        if (fullText) {
          select.options[i].text = fullText;
        }
      }
    }
  }

  if (select) {
    select.addEventListener('change', updateSelectedText);
    updateSelectedText(); // Run once on page load
  }
}

// Initialize
$(document).ready(function () {
  initCountryCodeFormatter('.lead_country_code');
  initCountryCodeFormatter('.bvcm_lead_two_country_code');
});

/*=====  End of Country Code Formatting  ======*/


/*=================================
=            Lead Form            =
=================================*/

$('.lead-popup-close').click(function() {
    $('.lead-popup-message').fadeOut(500);
});

$(document).ready(function () {

  var $_GET = (function () {
    var urlParams = new URLSearchParams(window.location.search);
    var params = {};
    urlParams.forEach(function (value, key) {
      params[key] = value;
    });
    return params;
  })();

  function validateName() {
    $('.lead_name').nextAll('.error').remove();
    let lead_name = $('.lead_name').val().trim();
    let lead_name_pattern = /^[A-Za-z\s]+$/;

    if (lead_name === '') {
      $('.lead_name').after('<div class="error">Name is required.</div>');
      return false;
    } else if (!lead_name_pattern.test(lead_name)) {
      $('.lead_name').after('<div class="error">Only alphabets and spaces are allowed.</div>');
      return false;
    } else if (lead_name.length > 30) {
      $('.lead_name').after('<div class="error">Maximum 30 characters allowed for name.</div>');
      return false;
    }

    return true;
  }

  function validateMobile() {
    $('.lead_with_country_code').nextAll('.error').remove();
    let lead_mobile = $('.lead_mobile').val().trim();

    if (lead_mobile === '') {
      $('.lead_with_country_code').after('<div class="error mobile-error">Mobile number is required.</div>');
      return false;
    } else if (!/^[0-9]+$/.test(lead_mobile)) {
      $('.lead_with_country_code').after('<div class="error mobile-error">Only numbers are allowed.</div>');
      return false;
    } else if (lead_mobile.length < 6) {
      $('.lead_with_country_code').after('<div class="error mobile-error">Minimum 6 digits required for mobile number.</div>');
      return false;
    } else if (lead_mobile.length > 15) {
      $('.lead_with_country_code').after('<div class="error mobile-error">Maximum 15 digits allowed for mobile number.</div>');
      return false;
    }

    return true;
  }

  function validateEmail() {
    $('.lead_email').nextAll('.error').remove();
    let lead_email = $('.lead_email').val().trim();

    let lead_email_specialCharPattern = /^[a-zA-Z0-9@._\-+]+$/;
    let lead_email_formatPattern = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;

    if (lead_email === '') {
      $('.lead_email').after('<div class="error">Email is required.</div>');
      return false;
    } else if (!lead_email_specialCharPattern.test(lead_email)) {
      $('.lead_email').after('<div class="error">Email contains invalid special characters.</div>');
      return false;
    } else if (!lead_email_formatPattern.test(lead_email)) {
      $('.lead_email').after('<div class="error">Invalid email format.</div>');
      return false;
    } else if (lead_email.length > 50) {
      $('.lead_email').after('<div class="error">Maximum 50 characters allowed for email.</div>');
      return false;
    }

    return true;
  }

  function validateLeadForm() {
    $('.error').remove();
    let isValid = true;

    if (!validateName()) isValid = false;
    if (!validateMobile()) isValid = false;
    if (!validateEmail()) isValid = false;

    let lead_countryCode = $('.lead_country_code').val();
    // let lead_conditions = $('.lead_conditions').is(':checked');

    if (!lead_countryCode) {
      $('.lead_country_code').after('<div class="error mobile-error">Please select a country.</div>');
      isValid = false;
    }

    // if (!lead_conditions) {
    //   $('.conditions-error').remove();
    //   $('.lead_conditions_box').after('<div class="error conditions-error">You must accept the terms & conditions.</div>');
    //   isValid = false;
    // }

    return isValid;
  }

  $('.lead_name').on('keyup blur', validateName);
  $('.lead_mobile').on('keyup blur', validateMobile);
  $('.lead_email').on('keyup blur', validateEmail);

  // $('.lead_conditions').on('change', function () {
  //   $('.conditions-error').remove();
  //   if (!$(this).is(':checked')) {
  //     $('.lead_conditions_box').after('<div class="error conditions-error">You must accept the terms & conditions.</div>');
  //   }
  // });

  $('.lead_submit').click(function () {
    if (!validateLeadForm()) return;

    $('.lead_submit')
      .attr('disabled', true)
      .html('<img src="assets/img/load-36_128.gif" alt="" style="width: 20px;"> Submitting...');

    grecaptcha.ready(function () {
      grecaptcha.execute('6LcGEQgqAAAAAP_hHyvKi8kU6oxxyRLXg69BdrTz', { action: 'submit' }).then(function (token) {

        var formData = {
          name: $('.lead_name').val(),
          email: $('.lead_email').val(),
          mobile_number: $('.lead_country_code').val() + $('.lead_mobile').val(),
          contact_number: $('.lead_country_code').val(),
          terms_and_conditions: $('.lead_conditions').is(':checked') ? 'yes' : 'no',
          other_communications: $('.lead_other_communications').is(':checked') ? 'yes' : 'no',
          recaptcha_token: token,

          source_name: $_GET.source_name || '',
          campaign_name: $_GET.campaign_name || '',
          campaign_id: $_GET.campaign_id || '',
          adset_name: $_GET.adset_name || '',
          adset_id: $_GET.adset_id || '',
          campaign_lead_id: $_GET.campaign_lead_id || '',
          platform: $_GET.platform || '',
          country_name: $_GET.country_name || '',
          address: $_GET.address || '',
          details: $_GET.details || '',
          visited_url: $_GET.visited_url || '',
          registered_date: $_GET.registered_date || '',
          utm_source: $_GET.utm_source || '',
          utm_medium: $_GET.utm_medium || '',
          utm_campaign: $_GET.utm_campaign || '',
          utm_term: $_GET.utm_term || '',
          utm_content: $_GET.utm_content || '',
          lead_page: window.location.href || '',
        };

        $.ajax({
          url: 'https://www.binghatti.com/files/lead_gen_api',
          type: 'POST',
          data: formData,
          success: function (response) {
            try {
              var jsonResponse = typeof response === 'string' ? JSON.parse(response) : response;
              if (jsonResponse.code === 200 && jsonResponse.message === 'Success') {
                $('.lead-popup-message').fadeIn(500);
                let params = new URLSearchParams(window.location.search);
                params.set('submitted', 'true');
                let updatedUrl = window.location.pathname + '?' + params.toString();
                window.history.replaceState(null, null, updatedUrl);

                $('.lead_name, .lead_email, .lead_mobile').val('');
                $('.lead_country_code').val('971').trigger('change');
                $('.lead_conditions').prop('checked', false);
                $('.lead_other_communications').prop('checked', false);
              } else {
                alert('CRM Error 400');
              }
            } catch (e) {
              alert('Invalid response format');
            }
            $('.lead_submit').attr('disabled', false).html('MEET OUR BRAND AMBASSADOR');
          },
          error: function () {
            alert('An error occurred while submitting the form.');
            $('.lead_submit').attr('disabled', false).html('MEET OUR BRAND AMBASSADOR');
          }
        });
      });
    });
  });
});


/*=====  End of Lead Form  ======*/


/*=============================================
=            Lead from Call Button            =
=============================================*/

$(document).ready(function () {
  var lead_from_call_GET = (function () {
    var urlParams = new URLSearchParams(window.location.search);
    var params = {};
    urlParams.forEach(function (value, key) {
      params[key] = value;
    });
    return params;
  })();

  function validate_lead_from_call_name() {
    $('.lead_from_call_name').nextAll('.error').remove();
    let lead_from_call_name = $('.lead_from_call_name').val().trim();
    let lead_from_call_name_pattern = /^[A-Za-z\s]+$/;

    if (lead_from_call_name === '') {
      $('.lead_from_call_name').after('<div class="error">Name is required.</div>');
      return false;
    } else if (!lead_from_call_name_pattern.test(lead_from_call_name)) {
      $('.lead_from_call_name').after('<div class="error">Only alphabets and spaces are allowed.</div>');
      return false;
    } else if (lead_from_call_name.length > 30) {
      $('.lead_from_call_name').after('<div class="error">Maximum 30 characters allowed for name.</div>');
      return false;
    }

    return true;
  }

  function validate_lead_from_call_mobile() {
    $('.lead_from_call_with_country_code').nextAll('.error').remove();
    let lead_from_call_mobile = $('.lead_from_call_mobile').val().trim();

    if (lead_from_call_mobile === '') {
      $('.lead_from_call_with_country_code').after('<div class="error mobile-error">Mobile number is required.</div>');
      return false;
    } else if (!/^[0-9]+$/.test(lead_from_call_mobile)) {
      $('.lead_from_call_with_country_code').after('<div class="error mobile-error">Only numbers are allowed.</div>');
      return false;
    } else if (lead_from_call_mobile.length < 6) {
      $('.lead_from_call_with_country_code').after('<div class="error mobile-error">Minimum 6 digits required for mobile number.</div>');
      return false;
    } else if (lead_from_call_mobile.length > 15) {
      $('.lead_from_call_with_country_code').after('<div class="error mobile-error">Maximum 15 digits allowed for mobile number.</div>');
      return false;
    }

    return true;
  }

  function validate_lead_from_call_email() {
    $('.lead_from_call_email').nextAll('.error').remove();
    let lead_from_call_email = $('.lead_from_call_email').val().trim();
    let lead_from_call_email_specialCharPattern = /^[a-zA-Z0-9@._\-+]+$/;
    let lead_from_call_email_formatPattern = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;

    if (lead_from_call_email === '') {
      $('.lead_from_call_email').after('<div class="error">Email is required.</div>');
      return false;
    } else if (!lead_from_call_email_specialCharPattern.test(lead_from_call_email)) {
      $('.lead_from_call_email').after('<div class="error">Email contains invalid special characters.</div>');
      return false;
    } else if (!lead_from_call_email_formatPattern.test(lead_from_call_email)) {
      $('.lead_from_call_email').after('<div class="error">Invalid email format.</div>');
      return false;
    } else if (lead_from_call_email.length > 50) {
      $('.lead_from_call_email').after('<div class="error">Maximum 50 characters allowed for email.</div>');
      return false;
    }

    return true;
  }

  function validate_lead_from_call_form() {
    $('.error').remove();
    let lead_from_call_isValid = true;

    if (!validate_lead_from_call_name()) lead_from_call_isValid = false;
    if (!validate_lead_from_call_mobile()) lead_from_call_isValid = false;
    if (!validate_lead_from_call_email()) lead_from_call_isValid = false;

    let lead_from_call_countryCode = $('.lead_from_call_country_code').val();
    // let lead_from_call_conditions = $('.lead_from_call_conditions').is(':checked');

    if (!lead_from_call_countryCode) {
      $('.lead_from_call_country_code').after('<div class="error mobile-error">Please select a country.</div>');
      lead_from_call_isValid = false;
    }

    // if (!lead_from_call_conditions) {
    //   $('.conditions-error').remove();
    //   $('.lead_from_call_conditions_box').after('<div class="error conditions-error">You must accept the terms & conditions.</div>');
    //   lead_from_call_isValid = false;
    // }

    return lead_from_call_isValid;
  }

  $('.lead_from_call_name').on('keyup blur', validate_lead_from_call_name);
  $('.lead_from_call_mobile').on('keyup blur', validate_lead_from_call_mobile);
  $('.lead_from_call_email').on('keyup blur', validate_lead_from_call_email);

  // $('.lead_from_call_conditions').on('change', function () {
  //   $('.conditions-error').remove();
  //   if (!$(this).is(':checked')) {
  //     $('.lead_from_call_conditions_box').after('<div class="error conditions-error">You must accept the terms & conditions.</div>');
  //   }
  // });

  $('.lead_from_call_submit').click(function () {
    if (!validate_lead_from_call_form()) return;

    $('.lead_from_call_submit')
      .attr('disabled', true)
      .html('<img src="assets/img/load-36_128.gif" alt="" style="width: 20px;"> Submitting...');

    var lead_from_call_data = {
      name: $('.lead_from_call_name').val(),
      email: $('.lead_from_call_email').val(),
      mobile_number: $('.lead_from_call_country_code').val() + $('.lead_from_call_mobile').val(),
      contact_number: $('.lead_from_call_country_code').val(),
      terms_and_conditions: $('.lead_from_call_conditions').is(':checked') ? 'yes' : 'no',
      other_communications: $('.lead_from_call_other_communications').is(':checked') ? 'yes' : 'no',

      source_name: lead_from_call_GET.source_name || '',
      campaign_name: lead_from_call_GET.campaign_name || '',
      campaign_id: lead_from_call_GET.campaign_id || '',
      adset_name: lead_from_call_GET.adset_name || '',
      adset_id: lead_from_call_GET.adset_id || '',
      campaign_lead_id: lead_from_call_GET.campaign_lead_id || '',
      platform: lead_from_call_GET.platform || '',
      country_name: lead_from_call_GET.country_name || '',
      address: lead_from_call_GET.address || '',
      details: lead_from_call_GET.details || '',
      visited_url: lead_from_call_GET.visited_url || '',
      registered_date: lead_from_call_GET.registered_date || '',
      utm_source: lead_from_call_GET.utm_source || '',
      utm_medium: lead_from_call_GET.utm_medium || '',
      utm_campaign: lead_from_call_GET.utm_campaign || '',
      utm_term: lead_from_call_GET.utm_term || '',
      utm_content: lead_from_call_GET.utm_content || '',
      lead_page: window.location.href || '',
    };

    $.ajax({
      url: 'https://www.binghatti.com/files/lead_gen_api',
      type: 'POST',
      data: lead_from_call_data,
      success: function (response) {
        try {
          var lead_from_call_response = typeof response === 'string' ? JSON.parse(response) : response;
          if (lead_from_call_response.code === 200 && lead_from_call_response.message === 'Success') {

            $('.call-popup').fadeOut(0);
            $('.lead-popup-message').fadeIn(500);

            let params = new URLSearchParams(window.location.search);
            params.set('submitted', 'true');
            let updatedUrl = window.location.pathname + '?' + params.toString();
            window.history.replaceState(null, null, updatedUrl);

            $('.call-popup').removeClass('lead-in-popup');
            $('.lead_from_call_name, .lead_from_call_email, .lead_from_call_mobile').val('');
            $('.lead_from_call_country_code').val('971').trigger('change');
            $('.lead_from_call_conditions').prop('checked', false);
            $('.lead_from_call_other_communications').prop('checked', false);
            
          } else {
            alert('CRM Error 400');
          }
        } catch (e) {
          alert('Invalid response format');
        }
        $('.lead_from_call_submit').attr('disabled', false).html('MEET OUR BRAND AMBASSADOR');
      },
      error: function () {
        alert('An error occurred while submitting the form.');
        $('.lead_from_call_submit').attr('disabled', false).html('MEET OUR BRAND AMBASSADOR');
      }
    });
  });
});

/*=====  End of Lead from Call Button  ======*/



/*==========================================
=            Video Call Meeting            =
==========================================*/

// Generate time slots
// function generateTimeSlots(selectedDate) {
//   const slotContainer = document.getElementById('bvcm_time_slots');
//   slotContainer.innerHTML = '';

//   const startHour = 9;
//   const endHour = 19;
//   const endMinute = 30;

//   for (let hour = startHour; hour <= endHour; hour++) {
//     for (let minute = 0; minute <= 30; minute += 30) {
//       if (hour === endHour && minute > endMinute) continue;

//       let displayHour = hour;
//       let ampm = 'AM';
//       if (hour >= 12) {
//         ampm = 'PM';
//         if (hour > 12) displayHour = hour - 12;
//       }
//       const displayTime = `${displayHour}:${minute === 0 ? '00' : minute} ${ampm}`;
//       const valueTime = `${hour < 10 ? '0'+hour : hour}:${minute === 0 ? '00' : minute}`;

//       const button = document.createElement('div');
//       button.className = 'bvcm_time_slot';
//       button.dataset.time = valueTime;
//       button.innerText = displayTime;
//       slotContainer.appendChild(button);
//     }
//   }
// }

function generateTimeSlots(selectedDate) {
  const slotContainer = document.getElementById('bvcm_time_slots');
  slotContainer.innerHTML = '';

  const startHour = 9;
  const endHour = 19;
  const endMinute = 30;

  const now = new Date();
  const selected = new Date(selectedDate);
  const isToday = now.toDateString() === selected.toDateString();

  // Get current time + 2 hours
  const minTime = new Date(now.getTime() + 2 * 60 * 60 * 1000);

  for (let hour = startHour; hour <= endHour; hour++) {
    for (let minute of [0, 30]) {
      if (hour === endHour && minute > endMinute) continue;

      const slotTime = new Date(selected);
      slotTime.setHours(hour, minute, 0, 0);

      // Skip slots earlier than minTime if selected date is today
      if (isToday && slotTime < minTime) continue;

      let displayHour = hour;
      let ampm = 'AM';
      if (hour >= 12) {
        ampm = 'PM';
        if (hour > 12) displayHour = hour - 12;
      }

      const displayTime = `${displayHour}:${minute === 0 ? '00' : minute} ${ampm}`;
      const valueTime = `${hour < 10 ? '0' + hour : hour}:${minute === 0 ? '00' : minute}`;

      const button = document.createElement('div');
      button.className = 'bvcm_time_slot';
      button.dataset.time = valueTime;
      button.innerText = displayTime;
      slotContainer.appendChild(button);
    }
  }
}


// Highlight selected time slot
$(document).on('click', '.bvcm_time_slot', function() {
  $('.bvcm_time_slot').removeClass('selected');
  $(this).addClass('selected');
});

// Highlight selected meeting type
$('.bvcm_lead_two_meet_type').click(function(e) {
  e.preventDefault();
  $('.bvcm_lead_two_meet_type').removeClass('selected');
  $(this).addClass('selected');
});

flatpickr("#bvcm_appointment_calendar", {
  inline: true,
  dateFormat: "Y-m-d",
  minDate: "today",
  maxDate: new Date().fp_incr(120),
  disable: [
    function(date) {
      return (date.getDay() === 0 || date.getDay() === 6);
    }
  ],
  disableMobile: true,

  onChange: function(selectedDates, dateStr, instance) {
    $('#bvcm_appointment_date').val(dateStr);
    generateTimeSlots(dateStr);
    removeTodayHighlight(selectedDates[0]);
  }
});

// ✨ Helper function
function removeTodayHighlight(selectedDate) {
  const today = new Date();

  // If user selected today, keep highlight
  if (
    selectedDate.getFullYear() === today.getFullYear() &&
    selectedDate.getMonth() === today.getMonth() &&
    selectedDate.getDate() === today.getDate()
  ) {
    // User selected today — do nothing
    return;
  }

  // User selected different date — remove today's highlight
  const todayCell = document.querySelector('.flatpickr-day.today');
  if (todayCell) {
    todayCell.classList.remove('today');
  }
}



// Initial Time Slots
generateTimeSlots(new Date());

// Validate and Submit
$('.bvcm_lead_two_submit').click(function(e) {
  
  e.preventDefault();
  $('.error').remove();

  var isValid = true;

  var bvcm_leadName = $('.bvcm_lead_two_name').val().trim();
  var bvcm_leadMobile = $('.bvcm_lead_two_mobile').val().trim();
  var bvcm_leadEmail = $('.bvcm_lead_two_email').val().trim();
  var bvcm_leadCountryCode = $('.bvcm_lead_two_country_code').val().trim();
  var bvcm_meetType = $('.bvcm_lead_two_meet_type.selected').attr('data-type');
  var bvcm_selectedDate = $('#bvcm_appointment_date').val().trim();
  var bvcm_selectedTime = $('.bvcm_time_slot.selected').data('time');

  var namePattern = /^[A-Za-z\s]+$/;
  if (bvcm_leadName === '' || !namePattern.test(bvcm_leadName)) {
    $('.bvcm_lead_two_name').after('<div class="error">Please enter a valid name</div>');
    isValid = false;
  }
  if (bvcm_leadMobile.length < 6 || bvcm_leadMobile.length > 15 || isNaN(bvcm_leadMobile)) {
    $('.bvcm_with_country').after('<div class="error mobile-error">Please enter a valid mobile number</div>');
    isValid = false;
  }
  var emailPattern = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
  if (!emailPattern.test(bvcm_leadEmail)) {
    $('.bvcm_lead_two_email').after('<div class="error">Please enter a valid email</div>');
    isValid = false;
  }
  if (bvcm_leadCountryCode === '') {
    $('.bvcm_lead_two_country_code').after('<div class="error">Please select a country code</div>');
    isValid = false;
  }
  if (typeof bvcm_meetType === 'undefined') {
    $('.bvcm_lead_two_meet_type').parent().last().after('<div class="error">Please select a meeting type</div>');
    isValid = false;
  }
  if (bvcm_selectedDate === '') {
    $('#bvcm_appointment_calendar').after('<div class="error">Please select a date</div>');
    isValid = false;
  }
  if (typeof bvcm_selectedTime === 'undefined') {
    $('#bvcm_time_slots').after('<div class="error">Please select a time slot</div>');
    isValid = false;
  }

  if (isValid) {

    $('.bvcm_lead_two_submit').prop('disabled', true).text('PROCESSING...');

    var bvcm_formData = {
      name: bvcm_leadName,
      mobile_number: bvcm_leadMobile,
      email: bvcm_leadEmail,
      country_code: bvcm_leadCountryCode,
      meet_type: bvcm_meetType,
      meeting_date: bvcm_selectedDate,
      meeting_time: bvcm_selectedTime
    };

    var formData = {
      name: bvcm_leadName,
      mobile_number: bvcm_leadCountryCode + bvcm_leadMobile,
      email: bvcm_leadEmail,
      contact_number: bvcm_leadCountryCode,
      details: `Meeting Type: ${bvcm_meetType}, Meeting Date: ${bvcm_selectedDate}, Meeting Time: ${bvcm_selectedTime}`,
    };

    $.ajax({
      url: 'https://www.binghatti.com/files/lead_gen_api',
      type: 'POST',
      data: formData,
      success: function (response) {
        try {
          var jsonResponse = typeof response === 'string' ? JSON.parse(response) : response;
          if (jsonResponse.code === 200 && jsonResponse.message === 'Success') {
            console.log('Lead submitted successfully')
          } else {
            alert('CRM Error 400');
          }
        } catch (e) {
          alert('Invalid response format');
        }
      },
      error: function () {
        alert('An error occurred while submitting the form.');
      }
    });

    $.ajax({
      url: url() + '/files/video-call',
      type: 'POST',
      data: { data: bvcm_formData },
      success: function (response) {
        try {
          var jsonResponse = typeof response === 'string' ? JSON.parse(response) : response;

          if (jsonResponse.code === 200 && jsonResponse.message === "Success") {
            let params = new URLSearchParams(window.location.search);
            params.set('submitted', 'true');
            let updatedUrl = window.location.pathname + '?' + params.toString();
            window.history.replaceState(null, null, updatedUrl);

            $('.video-call').fadeOut(0);
            $('.lead-popup-message').fadeIn(500);
            
            // Clear form fields
            $('.bvcm_lead_two_name').val('');
            $('.bvcm_lead_two_mobile').val('');
            $('.bvcm_lead_two_email').val('');
            $('.bvcm_lead_two_country_code').val('971');
            $('.bvcm_lead_two_meet_type').removeClass('selected');
            $('.bvcm_time_slot').removeClass('selected');
          } else {
            alert('Error from CRM!');
          }
        } catch (e) {
          alert('Invalid server response.');
        }
      },
      error: function () {
        alert('An error occurred. Please try again.');
      },
      complete: function () {
        $('.bvcm_lead_two_submit').prop('disabled', false).text('CONFIRM NOW');
      }
    });

  }
});

$('.video-call .xmark').click(function(){
    $('.video-call').fadeOut(500)
})

/*=====  End of Video Call Meeting  ======*/

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 0,  // Adjust offset as needed
                behavior: 'smooth'
            });
        }
    });
});





















(function ($) {
  const SESSION_URL = '../files/assets_session';
  let pendingAssetUrl = null;
  let preOpenedWin = null;

  // Detect iOS/iPadOS Safari
  const UA = navigator.userAgent;
  const IS_IOS = /iP(hone|ad|od)/.test(navigator.platform) ||
                 (/Macintosh/.test(UA) && 'ontouchend' in document);
  const IS_SAFARI = /^((?!chrome|android).)*safari/i.test(UA);
  const IS_IOS_SAFARI = IS_IOS && IS_SAFARI;

  function openDownload() {
    if (!pendingAssetUrl) return;

    if (IS_IOS_SAFARI) {
      // Same-tab nav is most reliable on iOS Safari
      window.location.assign(pendingAssetUrl);
      pendingAssetUrl = null;
      return;
    }

    // Non-iOS: use pre-opened tab if available
    if (preOpenedWin && !preOpenedWin.closed) {
      preOpenedWin.location.href = pendingAssetUrl;
      preOpenedWin = null;
      pendingAssetUrl = null;
      return;
    }

    // Fallback new tab (desktop/Android)
    window.open(pendingAssetUrl, '_blank');
    pendingAssetUrl = null;
  }

  // Click on gated asset link
  $(document).on('click', '.project-details-tab-box [data-assets-url]', function (e) {
    e.preventDefault();
    pendingAssetUrl = $(this).data('assets-url');

    // Only pre-open for NON-iOS Safari (iOS will use same-tab)
    if (!IS_IOS_SAFARI) {
      preOpenedWin = window.open('', '_blank');
    }

    // 1) Check 24h session
    $.ajax({
      url: SESSION_URL,
      method: 'GET',
      data: { check: 1 },
      dataType: 'json',
      cache: false
    })
    .done(function (res) {
      if (res && res.status === 'success') {
        openDownload();
      } else {
        // Not unlocked -> close pre-opened tab (if any) & show form
        if (preOpenedWin && !preOpenedWin.closed) { preOpenedWin.close(); preOpenedWin = null; }
        $('.call-popup').slideDown(300).addClass('lead-in-popup');
      }
    })
    .fail(function () {
      if (preOpenedWin && !preOpenedWin.closed) { preOpenedWin.close(); preOpenedWin = null; }
      $('.call-popup').slideDown(300).addClass('lead-in-popup');
    });
  });

  // Hook your "lead success" UI
  const originalFadeIn = $.fn.fadeIn;
  $.fn.fadeIn = function () {
    if (this.hasClass('lead-popup-message') && pendingAssetUrl) {
      // 2) Set 24h session, then download
      $.ajax({
        url: SESSION_URL,
        method: 'GET',
        data: { set: 1 },
        dataType: 'json',
        cache: false
      })
      .always(function () {
        // For non-iOS, pre-open right before navigating (optional)
        if (!IS_IOS_SAFARI) { preOpenedWin = window.open('', '_blank'); }
        openDownload();
        $('.call-popup').removeClass('lead-in-popup').hide();
      });
    }
    return originalFadeIn.apply(this, arguments);
  };
})(jQuery);













// (function ($) {
//   const SESSION_URL = '../files/assets_session'; // adjust if needed
//   let pendingAssetUrl = null;
//   let opening = false; // simple guard to avoid double opens

//   function openPending() {
//     if (!pendingAssetUrl || opening) return;
//     opening = true;
//     window.open(pendingAssetUrl, '_blank');
//     pendingAssetUrl = null;
//     setTimeout(() => { opening = false; }, 500);
//   }

//   // Click on any gated asset link
//   $(document).on('click', '.project-details-tab-box a[data-assets-url]', function (e) {
//     e.preventDefault();
//     pendingAssetUrl = $(this).data('assets-url');

//     // 1) Check 24h session via PHP (GET ?check=1)
//     $.ajax({
//       url: SESSION_URL,
//       method: 'GET',
//       data: { check: 1 },
//       dataType: 'json',
//       cache: false
//     })
//     .done(function (res) {
//       if (res && res.status === 'success') {
//         // Session valid -> open directly
//         openPending();
//       } else {
//         // Not unlocked -> show your existing lead popup/form
//         $('.call-popup').slideDown(300).addClass('lead-in-popup');
//       }
//     })
//     .fail(function () {
//       // If check fails, show popup as fallback
//       $('.call-popup').slideDown(300).addClass('lead-in-popup');
//     });
//   });

//   // Patch jQuery fadeIn to detect your existing "lead success" UI
//   const originalFadeIn = $.fn.fadeIn;
//   $.fn.fadeIn = function () {
//     // When your success message appears, treat it as a successful lead
//     if (this.hasClass('lead-popup-message') && pendingAssetUrl) {
//       // 2) Set 24h session via PHP (GET ?set=1), then open file
//       $.ajax({
//         url: SESSION_URL,
//         method: 'GET',
//         data: { set: 1 },
//         dataType: 'json',
//         cache: false
//       })
//       .always(function () {
//         openPending();
//         // optional: hide popup
//         $('.call-popup').removeClass('lead-in-popup').hide();
//       });
//     }
//     return originalFadeIn.apply(this, arguments);
//   };

// })(jQuery);































// working fine window

// (function ($) {
//   const SESSION_URL = '../files/assets_session';
//   let pendingAssetUrl = null;
//   let preOpenedWin = null;

//   function finalizeOpen() {
//     if (!pendingAssetUrl) return;

//     if (preOpenedWin && !preOpenedWin.closed) {
//       preOpenedWin.location.href = pendingAssetUrl;
//       preOpenedWin = null;
//       pendingAssetUrl = null;
//       return;
//     }

//     // Only one open action
//     window.open(pendingAssetUrl, '_blank');
//     pendingAssetUrl = null;
//   }

//   // Click on gated asset link
//   $(document).on('click', '.project-details-tab-box a[data-assets-url]', function (e) {
//     e.preventDefault();
//     pendingAssetUrl = $(this).data('assets-url');

//     // 1) Check 24h session
//     $.ajax({
//       url: SESSION_URL,
//       method: 'GET',
//       data: { check: 1 },
//       dataType: 'json',
//       cache: false
//     })
//     .done(function (res) {
//       if (res && res.status === 'success') {
//         // Valid: Pre-open so iOS Safari won’t block
//         preOpenedWin = window.open('', '_blank');
//         finalizeOpen();
//       } else {
//         // Not valid: show popup without pre-opening
//         $('.call-popup').slideDown(300).addClass('lead-in-popup');
//       }
//     })
//     .fail(function () {
//       $('.call-popup').slideDown(300).addClass('lead-in-popup');
//     });
//   });

//   // Patch jQuery fadeIn for lead success
//   const originalFadeIn = $.fn.fadeIn;
//   $.fn.fadeIn = function () {
//     if (this.hasClass('lead-popup-message') && pendingAssetUrl) {
//       // Set session, then open file
//       $.ajax({
//         url: SESSION_URL,
//         method: 'GET',
//         data: { set: 1 },
//         dataType: 'json',
//         cache: false
//       })
//       .always(function () {
//         // Pre-open only now, since this is the first user action
//         preOpenedWin = window.open('', '_blank');
//         finalizeOpen();
//         $('.call-popup').removeClass('lead-in-popup').hide();
//       });
//     }
//     return originalFadeIn.apply(this, arguments);
//   };

// })(jQuery);



// ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++





// Working In Safari

// (function ($) {
//   const SESSION_URL = '../files/assets_session'; // adjust if needed
//   let pendingAssetUrl = null;
//   let preOpenedWin = null;

//   function finalizeOpen() {
//     if (!pendingAssetUrl) return;

//     // If a tab was pre-opened and not blocked, use it
//     if (preOpenedWin && !preOpenedWin.closed) {
//       preOpenedWin.location.href = pendingAssetUrl;
//       preOpenedWin = null;
//       pendingAssetUrl = null;
//       return;
//     }

//     // Fallback: synthetic link click (sometimes passes on iOS)
//     const a = document.createElement('a');
//     a.href = pendingAssetUrl;
//     a.target = '_blank';
//     a.rel = 'noopener';
//     document.body.appendChild(a);
//     a.click();
//     a.remove();

//     // Final fallback: same-tab navigation
//     setTimeout(function () {
//       if (pendingAssetUrl) {
//         window.location.assign(pendingAssetUrl);
//         pendingAssetUrl = null;
//       }
//     }, 250);
//   }

//   // Click on any gated asset link
//   $(document).on('click', '.project-details-tab-box a[data-assets-url]', function (e) {
//     e.preventDefault();
//     pendingAssetUrl = $(this).data('assets-url');

//     // PRE-OPEN a tab synchronously to satisfy iOS Safari
//     // If blocked, this will be null and we’ll use fallbacks later.
//     preOpenedWin = window.open('', '_blank');

//     // 1) Check 24h session via PHP (GET ?check=1)
//     $.ajax({
//       url: SESSION_URL,
//       method: 'GET',
//       data: { check: 1 },
//       dataType: 'json',
//       cache: false
//     })
//     .done(function (res) {
//       if (res && res.status === 'success') {
//         // Session valid -> go ahead
//         finalizeOpen();
//       } else {
//         // Not unlocked -> show your existing lead popup/form
//         // If we pre-opened a tab, close it to avoid a blank tab lingering
//         if (preOpenedWin && !preOpenedWin.closed) {
//           preOpenedWin.close();
//           preOpenedWin = null;
//         }
//         $('.call-popup').slideDown(300).addClass('lead-in-popup');
//       }
//     })
//     .fail(function () {
//       if (preOpenedWin && !preOpenedWin.closed) {
//         preOpenedWin.close();
//         preOpenedWin = null;
//       }
//       $('.call-popup').slideDown(300).addClass('lead-in-popup');
//     });
//   });

//   // Patch jQuery fadeIn to detect your existing "lead success" UI
//   const originalFadeIn = $.fn.fadeIn;
//   $.fn.fadeIn = function () {
//     // When your success message appears, treat it as a successful lead
//     if (this.hasClass('lead-popup-message') && pendingAssetUrl) {
//       // 2) Set 24h session via PHP (GET ?set=1), then open file
//       $.ajax({
//         url: SESSION_URL,
//         method: 'GET',
//         data: { set: 1 },
//         dataType: 'json',
//         cache: false
//       })
//       .always(function () {
//         finalizeOpen();
//         // optional: hide popup
//         $('.call-popup').removeClass('lead-in-popup').hide();
//       });
//     }
//     return originalFadeIn.apply(this, arguments);
//   };

// })(jQuery);