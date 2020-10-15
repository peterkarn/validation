(function ($) {

  'use strict';

  var waitForFinalEvent = (function () {
    var timers = {};
    return function (callback, ms, uniqueId) {
      if (!uniqueId) {
        uniqueId = "Don't call this twice without a uniqueId";
      }
      if (timers[uniqueId]) {
        clearTimeout(timers[uniqueId]);
      }
      timers[uniqueId] = setTimeout(callback, ms);
    };
  })();

  let lang = $('html').attr('lang');
  if (lang === 'ru-RU') lang = 'ru';

  let no_result_message = '';
  switch (lang) {
    case 'en':
      no_result_message = 'No results found';
      break;
    default:
      no_result_message = 'Нет результатов';
  }

  // Fanycbox gallery
  function fancybox() {
    $('[data-fancybox]').fancybox({
      lang: lang,
    });
    $('[data-fancybox*="slider-"]').fancybox({
      lang: lang,
      loop: true,
      infobar: false,
      buttons: [
        "zoom",
        "fullScreen",
        "close",
      ],
    });
  }

  // Footer
  function footer() {
    if ($("#bottom").length) {
      var height = Math.round(document.getElementById('bottom').offsetHeight);
      $(".wrapper .content").css('padding-bottom', height);
      $("#bottom").css('margin-top', -height);
    }
    $('a[href^="#ci-navbar"]').on('click', function (e) {
      e.preventDefault();
    })
  }

  // Footer auto on resize
  function footerAuto() {
    $(window).on('resize', function () {
      waitForFinalEvent(function () {
        footer();
      }, 100, "footer");
    });
  }

  // Goods order form
  function goodsOrderForm() {
    $(".modal-dismiss").on('click', function () {
      $(this).closest('.modal').modal('hide');
      setTimeout(function () {
        $('#order-submit').modal('show');
      }, 400);
      return false;
    });
    $(".modal-dismiss a[data-toggle='modal-alt']").click(function () {
      var href = $(this).attr('href');
      $(this).closest('.modal').modal('hide');
      setTimeout(function () {
        $(href).modal('show');
      }, 400);
      return false;
    })
  }

  // Mask
  function mask() {
    let phone_placeholder = '';
    let code_placeholder = '';
    switch (lang) {
      case 'en':
        phone_placeholder = 'Your phone';
        code_placeholder = 'Enter the code from SMS';
        break;
      default:
        phone_placeholder = 'Ваш телефон';
        code_placeholder = 'Введите код из СМС';
    }
    $('.phone-mask').mask('+0 (000) 000-00-00', {
      placeholder: phone_placeholder
    });
    $('.code-mask').mask('000000', {
      placeholder: code_placeholder
    });
    
  }
  
// phone input validation  
var inputEl = document.getElementById('phone');
var goodKey = '0123456789+ ';

var checkInputTel = function(e) {
  var key = (typeof e.which == "number") ? e.which : e.keyCode;
  var start = this.selectionStart,
    end = this.selectionEnd;

  var filtered = this.value.split('').filter(filterInput);
  this.value = filtered.join("");

  /* Prevents moving the pointer for a bad character */
  var move = (filterInput(String.fromCharCode(key)) || (key == 0 || key == 8)) ? 0 : 1;
  this.setSelectionRange(start - move, end - move);
}

var filterInput = function(val) {
  return (goodKey.indexOf(val) > -1);
}

inputEl.addEventListener('input', checkInputTel);

$("#phone").attr('maxlength', '12');

  // Navbar collapse in header
  function navbarCollapse() {
    $('#top').on('show.bs.collapse', '.collapse', function () {
      $('#top').find('.collapse.in').collapse('hide');
    });
  }

  // Scroll to target
  function passwordVisible() {
    $(".password-input").each(function () {
      $('.pi-btn', $(this)).click(function (e) {
        e.preventDefault();
        if ($((this).closest('.password-input')).hasClass('visible')) {
          $((this).closest('.password-input')).removeClass('visible');
          $("input", $((this).closest('.input-group'))).attr('type', 'password');
        } else {
          $((this).closest('.password-input')).addClass('visible');
          $("input", $((this).closest('.input-group'))).attr('type', 'text');
        }
      });
    });
  }

  // Scroll to target
  function scrollToTarget() {
    $('.scroll-to-target').on('click', function () {
      var target = $(this).attr('href');
      $('html, body').animate({
        scrollTop: $(target).offset().top
      }, 700);
      return false;
    });
  }

  // Scroll to top
  function scrollToTop() {
    if ($('#back-to-top').length) {
      var scrollTrigger = 100,
        backToTop = function () {
          var scrollTop = $(window).scrollTop();
          if (scrollTop > scrollTrigger) {
            $('#back-to-top').addClass('show');
          } else {
            $('#back-to-top').removeClass('show');
          }
        };
      backToTop();
      $(window).on('scroll', function () {
        backToTop();
      });
      $('#back-to-top').on('click', function (e) {
        e.preventDefault();
        $('html,body').animate({
          scrollTop: 0
        }, 400);
      });
    }
  }

  // Select2
  function select2init() {
    if ($('.select2:not(.select2--search)').length > 0) {
      $('.select2').select2({
        minimumResultsForSearch: -1,
        width: '100%',
        language: lang
      });
    }

    if ($('.select2.select2--search').length > 0) {
      $('.select2.select2--search').select2({
        width: '100%',
        language: {
          "noResults": function () {
            return no_result_message;
          }
        },
        escapeMarkup: function (markup) {
          return markup;
        }
      });
    }

    if ($('.select-language').length > 0) {
      $('.select-language').select2({
        minimumResultsForSearch: -1,
        width: '100%',
        language: lang,
      });
      $('.select-language').on('change', function () {
        var url = $(this).val(); // get selected value
        if (url) { // require a URL
          window.location = url; // redirect
        }
        return false;
      });
    }
  }

  // Select2
  function select2reinit(container) {
    if ($('.select2:not(.select2--search)', container).length > 0) {
      $('.select2', container).select2({
        minimumResultsForSearch: -1,
        width: '100%',
        language: lang
      });
    }

    if ($('.select2.select2--search', container).length > 0) {
      $('.select2.select2--search', container).select2({
        width: '100%',
        language: {
          "noResults": function () {
            return no_result_message;
          }
        },
        escapeMarkup: function (markup) {
          return markup;
        }
      });
    }

    if ($('.select-language', container).length > 0) {
      $('.select-language', container).select2({
        minimumResultsForSearch: -1,
        width: '100%',
        language: lang,
      });
      $('.select-language', container).on('change', function () {
        var url = $(this).val(); // get selected value
        if (url) { // require a URL
          window.location = url; // redirect
        }
        return false;
      });
    }
  }

  // Table style
  function tableStyle() {
    if ($(".content").length) {
      $(".content").addClass('content-with-tables');
    }
  }

  // Tooltip and popover
  function tooltip() {
    $("[data-toggle='tooltip']").tooltip();
    $("[data-toggle='popover']").popover();

    $('#copy-profile-link').tooltip({
      trigger: 'manual',
      placement: 'bottom',
      animation: true,
    });

    let tooltip_message = '';

    function setTooltip(message) {
      $('#copy-profile-link')
        .attr('data-original-title', message)
        .tooltip('show');
    }

    function hideTooltip() {
      $('#copy-profile-link').tooltip('hide');
    }

    // Clipboard

    var clipboard = new ClipboardJS('#copy-profile-link');

    clipboard.on('success', function (e) {
      switch (lang) {
        case 'en':
          tooltip_message = 'Copied';
          break;
        default:
          tooltip_message = 'Скопировано';
      }

      setTooltip(tooltip_message);
      setTimeout(hideTooltip, 1000);
    });

    clipboard.on('error', function (e) {
      switch (lang) {
        case 'en':
          tooltip_message = 'Failed to copy';
          break;
        default:
          tooltip_message = 'Не удалось скопировать';
      }
      setTooltip(tooltip_message);
      setTimeout(hideTooltip, 1000);
    });


  }

  // Object fill polyfill
  function objectFill() {
    objectFitImages(null, {
      watchMQ: true
    });
  }

  // mainN navbar
  function mainNavbar() {
    $('.main-navbar .dropdown-l1 > a').on('click', function (e) {
      e.preventDefault();
      $(this).closest('li').siblings().removeClass('open');
      $('.main-navbar .dropdown-l2').removeClass('open');
      if ($(this).closest('li').hasClass('open')) {
        $(this).closest('li').removeClass('open');
      } else {
        $(this).closest('li').addClass('open');
      }
    });
    $('.main-navbar .dropdown-l2 > a > .caret').on('click', function (e) {
      e.preventDefault();
      $(this).closest('li').siblings().removeClass('open');
      if ($(this).closest('li').hasClass('open')) {
        $(this).closest('li').removeClass('open');
      } else {
        $(this).closest('li').addClass('open');
      }
    });
    $('.main-navbar .dropdown-l3 > a > .caret').on('click', function (e) {
      e.preventDefault();
      $(this).closest('li').siblings().removeClass('open');
      if ($(this).closest('li').hasClass('open')) {
        $(this).closest('li').removeClass('open');
      } else {
        $(this).closest('li').addClass('open');
      }
    });
    $('body').on('click', function (e) {
      if (!$('.navbar-nav').is(e.target) &&
        $('.navbar-nav').has(e.target).length === 0 &&
        $('.navbar-nav .open').has(e.target).length === 0
      ) {
        $('.navbar-nav .dropdown.show-more').removeClass('open');
        $('.navbar-nav .dropdown-l1').removeClass('open');
        $('.navbar-nav .dropdown-l2').removeClass('open');
        $('.navbar-nav .dropdown-l3').removeClass('open');
      }
    });
  }

  // Catalog navbar
  function catalogNavbar() {
    $('.catalog-navbar .dropdown-l1 > a > .caret').on('click', function (e) {
      e.preventDefault();
      $(this).closest('li').siblings().removeClass('open');
      $('.catalog-navbar .dropdown-l2').removeClass('open');
      if ($(this).closest('li').hasClass('open')) {
        $(this).closest('li').removeClass('open');
      } else {
        $(this).closest('li').addClass('open');
      }
    });
    $('.catalog-navbar .dropdown-l2 > a > .caret').on('click', function (e) {
      e.preventDefault();
      $(this).closest('li').siblings().removeClass('open');
      if ($(this).closest('li').hasClass('open')) {
        $(this).closest('li').removeClass('open');
      } else {
        $(this).closest('li').addClass('open');
      }
    });
  }

  // news slider
  function sliderNews() {
    $('.news-slider .slick-slider-alt').each(function () {
      $(this).slick({
        slidesToShow: 5,
        slidesToScroll: 1,
        arrows: false,
        autoplay: true,
        autoplaySpeed: 5000,
        dots: false,
        responsive: [{
            breakpoint: 1200,
            settings: {
              slidesToShow: 4,
              slidesToScroll: 1,
            }
          },
          {
            breakpoint: 768,
            settings: {
              slidesToShow: 3,
              slidesToScroll: 1,
            }
          },
          {
            breakpoint: 576,
            settings: {
              slidesToShow: 2,
              slidesToScroll: 1,
            }
          }
        ]
      });

      $('.ss-controls .slick-switches .ss-switch.prev', $(this).closest(".news-slider")).click(function () {
        $('.slick-slider-alt', $(this).closest('.news-slider')).slick('slickPrev');
      });

      $('.ss-controls .slick-switches .ss-switch.next', $(this).closest(".news-slider")).click(function () {
        $('.slick-slider-alt', $(this).closest('.news-slider')).slick('slickNext');
      });

      var numItems = $('.ss-item', $(this)).length;
      if (numItems > 5 && window.innerWidth >= 1200 || numItems > 4 && (window.innerWidth >= 768 && window.innerWidth <= 1199) || numItems > 3 && (window.innerWidth >= 576 && window.innerWidth <= 767) || numItems > 2 && window.innerWidth <= 575) {
        $('.ss-controls', $(this).closest('.news-slider')).css('display', '');
      }

      var currentSlider = $(this);

      $(window).on('resize', function () {
        waitForFinalEvent(function () {
          var numItems = $('.ss-item', currentSlider).length;
          if (numItems > 5 && window.innerWidth >= 1200 || numItems > 4 && (window.innerWidth >= 768 && window.innerWidth <= 1199) || numItems > 3 && (window.innerWidth >= 576 && window.innerWidth <= 767) || numItems > 2 && window.innerWidth <= 575) {
            $('.ss-controls', currentSlider.closest('.news-slider')).css('display', '');
          } else {
            $('.ss-controls', currentSlider.closest('.news-slider')).css('display', 'none');
          };
        }, 100, "slider_news");
      });
    });
  };

  // photogallery slider
  function sliderPhotogallery() {
    $('.photogallery .photogallery__slider .slick-slider-alt').each(function () {
      $(this).slick({
        slidesToShow: 3,
        slidesToScroll: 1,
        arrows: false,
        autoplay: true,
        autoplaySpeed: 5000,
        dots: false,
        responsive: [{
          breakpoint: 576,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 1,
          }
        }]
      });

      $('.ss-controls .slick-switches .ss-switch.prev', $(this).closest(".photogallery")).click(function () {
        $('.slick-slider-alt', $(this).closest('.photogallery')).slick('slickPrev');
      });

      $('.ss-controls .slick-switches .ss-switch.next', $(this).closest(".photogallery")).click(function () {
        $('.slick-slider-alt', $(this).closest('.photogallery')).slick('slickNext');
      });

      var numItems = $('.ss-item', $(this)).length;
      if (numItems > 3 && window.innerWidth >= 576 || numItems > 2 && window.innerWidth <= 575) {
        $('.ss-controls', $(this).closest('.photogallery')).css('display', '');
      }

      var currentSlider = $(this);

      $(window).on('resize', function () {
        waitForFinalEvent(function () {
          var numItems = $('.ss-item', currentSlider).length;
          if (numItems > 3 && window.innerWidth >= 576 || numItems > 2 && window.innerWidth <= 575) {
            $('.ss-controls', currentSlider.closest('.photogallery')).css('display', '');
          } else {
            $('.ss-controls', currentSlider.closest('.photogallery')).css('display', 'none');
          };
        }, 100, "photogallery");
      });
    });
  };

  function fixCollapse() {
    $('[data-toggle="collapse"]:not(.lk__edit__head)').on('click', function () {
      $('.collapse.in').collapse("hide");
    });
  }

  // Header block
  function stickyHeader() {
    if ($(".page-header").length) {
      $(".page-header").sticky({
        topSpacing: 0,
      });
    }
  }

  function showCategories() {
    $('.categories__item__btn-more').on('click', function () {
      var _this = $(this);

      if (!_this.hasClass('show')) {
        _this.closest('.categories').find('.categories__item').removeClass('open');
        _this.closest('.categories').find('.categories__item__btn-more').removeClass('show');

        switch (lang) {
          case 'en':
            _this.closest('.categories').find('.categories__item__btn-more').text('more +');
            _this.text('hide -').addClass('show');
            break;
          default:
            _this.closest('.categories').find('.categories__item__btn-more').text('еще +');
            _this.text('скрыть').addClass('show');
        }
        _this.closest('.categories__item').addClass('open');
      } else {
        switch (lang) {
          case 'en':
            _this.text('more +').removeClass('show');
            break;
          default:
            _this.text('еще +').removeClass('show');
        }
        _this.closest('.categories__item').removeClass('open');
      }
    });
  }

  function pageForm() {
    function pageFormItit() {
      let min_height = '';
      if ($('.breadcrumb-block').length && $('.header-block').length) {
        min_height = $(window).height() - $('#top').height() - $('#bottom').height() - $('.breadcrumb-block').height() - $('.header-block').height() - 40 + 'px';
      } else {
        min_height = $(window).height() - $('#top').height() - $('#bottom').height() + 'px';
      }
      $('#height-page-form-js').css('min-height', min_height);
    }
    pageFormItit();

    $(window).on('resize', function () {
      waitForFinalEvent(function () {
        pageFormItit();
      }, 100, "pageForm");
    });
  }

  function showDescription() {
    $('.card-item__description__btn').on('click', function () {
      var _this = $(this);
      if (_this.hasClass('show')) {
        _this.removeClass('show').text('Читать полностью')
          .closest('.card-item__description').find('.card-item__description__hidden').hide(300);
      } else {
        _this.addClass('show').text('Скрыть')
          .closest('.card-item__description').find('.card-item__description__hidden').show(300);
      }
    });
  }

  function showPriceList() {
    $('.card-item__price-list__btn').on('click', function () {
      var _this = $(this);
      if (_this.hasClass('show')) {
        _this.removeClass('show').text('Еще +')
          .closest('.card-item__price-list').find('.card-item__price-list__hidden').hide(300);
      } else {
        _this.addClass('show').text('Скрыть')
          .closest('.card-item__price-list').find('.card-item__price-list__hidden').show(300);
      }
    });
  }

  // Sticky block
  function stickyBlock() {
    function stickyBlockInit() {
      if ($(window).width() >= 992) {
        if ($("#profile-page-navbar").length) {
          var topScroll = $('#top').height() + 15;
          var stickyBottomOffset = $('#bottom').height() + 15;
          $("#profile-page-navbar").sticky({
            topSpacing: topScroll,
            bottomSpacing: stickyBottomOffset,
          });

          $(document).scroll(function () {
            if ($(document).scrollTop() > $('.profile-page').offset().top) {
              $('.profile-page-navbar-card').show(300);
            } else {
              $('.profile-page-navbar-card').hide(300);
            }
          });

        }
      } else {
        $("#profile-page-navbar").unstick();
      }
    }
    stickyBlockInit();

    $(window).on('resize', function () {
      waitForFinalEvent(function () {
        stickyBlockInit();
      }, 100, "profile-page-navbar");
    });
  }

  function scrollSpy() {
    var section = document.querySelectorAll(".scroll-link");
    var sections = {};
    var i = 0;

    function scrollSpyOffset() {
      Array.prototype.forEach.call(section, function (e) {
        sections[e.id] = e.offsetTop - $('#top').height() / 3;
      });
    }
    scrollSpyOffset();

    $(window).on('resize', function () {
      waitForFinalEvent(function () {
        scrollSpyOffset();
      }, 100, "scrollSpy-offset");
    });

    function scrollSpyonscroll() {
      var scrollPosition = document.documentElement.scrollTop || document.body.scrollTop;

      for (i in sections) {
        if (sections[i] <= scrollPosition) {
          $('#profile-page-navbar li.active').removeClass('active');
          $('a[href*=' + i + ']').parent('li').addClass('active');
        }
      }
    }
    scrollSpyonscroll();

    window.onscroll = function () {
      waitForFinalEvent(function () {
        scrollSpyonscroll();
      }, 10, "scrollSpy-scroll");
    };
  }

  function showMore() {
    $('.show-more-btn').on('click', function () {
      var _this = $(this);
      if (_this.hasClass('show')) {
        _this.removeClass('show').text('Читать далее')
          .closest('.show-more-block').find('.show-more-text').hide(300);
      } else {
        _this.addClass('show').text('Скрыть')
          .closest('.show-more-block').find('.show-more-text').show(300);
      }
    });
  }

  function mobileNavbar() {
    $('#main-navbar-block').on('show.bs.collapse', function () {
      var heightNavbar = $(window).height() - $(".page-header").height();

      $('body').addClass('main-navbar-open');
      if (window.innerWidth < 576) {
        $("#main-navbar-block .navbar-block").css('height', heightNavbar);
      }

      $(window).on('resize', function () {
        waitForFinalEvent(function () {
          if (window.innerWidth < 576) {
            var heightNavbar = $(window).height() - $(".page-header").height();
            $("#main-navbar-block .navbar-block").css('height', heightNavbar);
          } else {
            $("#main-navbar-block .navbar-block").css('height', 'auto');
          }
        }, 100, "height-navbar");
      });
    });

    $('#main-navbar-block').on('hide.bs.collapse', function () {
      $('body').removeClass('main-navbar-open');

      $(".navbar-block.navbar-block--first").removeClass('hide-menu');
      $(".navbar-block.navbar-block--second").removeClass('show-menu');
    });

    $('#mobile-select-city').on('click', function () {
      $(".navbar-block.navbar-block--first").addClass('hide-menu');
      $(".navbar-block.navbar-block--second").addClass('show-menu');
    });

    $('#mobile-select-city-back-btn').on('click', function () {
      $(".navbar-block.navbar-block--first").removeClass('hide-menu');
      $(".navbar-block.navbar-block--second").removeClass('show-menu');
    });

    $('.mobile-select-city-search-clear').on('click', function (e) {
      $('.mobile-select-city-search-input').val('');
      e.preventDefault();
    });

    $('.mobile-select-city-search-input').focusin(function () {
      $('.mobile-select-city-search-clear').css('opacity', 1);
    }).focusout(function () {
      $('.mobile-select-city-search-clear').css('opacity', 0);
    });
  }

  function loadPhoto() {
    function myFunc(input) {
      var files = input.files || input.currentTarget.files;
      var reader = [];

      for (var i in files) {

        if (files.hasOwnProperty(i)) {
          reader[i] = new FileReader();
          reader[i].readAsDataURL(input.files[i]);

          (function () {
            reader[i].onload = function (e) {
              $('.lk__edit__photos').prepend('<div class="lk__edit__photos__img of-cover flex-img"><img src="' + e.target.result + '" alt=""></div>');
            };
          })();
        }

      }
    }

    function myFuncMain(input) {
      var files = input.files || input.currentTarget.files;
      var reader = [];

      for (var i in files) {

        if (files.hasOwnProperty(i)) {
          reader[i] = new FileReader();
          reader[i].readAsDataURL(input.files[i]);

          (function () {
            reader[i].onload = function (e) {
              $('.lk__img-js img').attr('src', e.target.result);
            };
          })();
        }

      }
    }

    $(".lk__edit__photos input").change(function () {
      myFunc(this);
    });
    $(".lk__load-img input").change(function () {
      myFuncMain(this);
    });
  }

  function editData() {
    $('.edit-data-js-btn').on('click', function () {
      if (!$('.edit-data-js-data').hasClass('hidden')) {
        $('.edit-data-js-data').addClass('hidden');
        $('.edit-data-js-form').removeClass('hidden');
      } else {
        $('.edit-data-js-data').removeClass('hidden');
        $('.edit-data-js-form').addClass('hidden');
      }
      return false;
    });
  }

  function closeProfileNavbar() {
    if (window.innerWidth < 992) {
      $('#profile-page-navbar .catalog-navbar li a').on('click', function () {
        $('#catalog-navbar-block').collapse('hide');
      });
    }
  }

  function loadMoreBlog() {
    let action = '/ajax/load-blog';
    let container = $('.blog__items');
    let button = $('#load-more-blog');
    let loader = $('#loader-blog');
    button.on('click', function () {
      let offset = $('.blog__item').length;
      let limit = button.data('limit');
      let keyword = button.data('keyword');

      loader.removeClass('hidden');
      $.ajax({
        url: action,
        type: 'post',
        dataType: "json",
        data: {
          'offset': offset,
          'limit': limit,
          'lang': lang,
          'keyword': keyword,
        },
        success: function (data) {
          container.append(data.html);
          if (!data.showMore) {
            button.addClass('hidden');
          }
          loader.addClass('hidden');
        },
        error: function (errorThrown) {
          console.log(errorThrown);
        }
      });
    })
  }

  function loadMoreReview() {
    let action = '/ajax/load-review';
    let container = $('.reviews__list');
    let button = $('#load-more-review');
    let loader = $('#loader-review');
    button.on('click', function () {
      let offset = $('.reviews__item').length;
      let limit = button.data('limit');
      loader.removeClass('hidden');
      $.ajax({
        url: action,
        type: 'post',
        dataType: "json",
        data: {
          'offset': offset,
          'limit': limit,
          'lang': lang,
        },
        success: function (data) {
          container.append(data.html);
          if (!data.showMore) {
            button.addClass('hidden');
          }
          loader.addClass('hidden');
        },
        error: function (errorThrown) {
          console.log(errorThrown);
        }
      });
    })
  }

  function loadMoreService() {
    let action = '/ajax/load-service';
    let container = $('.service__items');
    let button = $('#load-more-service');
    let loader = $('#loader-service');
    button.on('click', function () {
      let offset = $('.service__item').length;
      let limit = button.data('limit');
      let category_id = button.data('category-id');
      let keyword = button.data('keyword');
      loader.removeClass('hidden');
      $.ajax({
        url: action,
        type: 'post',
        dataType: "json",
        data: {
          'offset': offset,
          'limit': limit,
          'category_id': category_id,
          'keyword': keyword,
          'lang': lang,
        },
        success: function (data) {
          container.append(data.html);
          if (!data.showMore) {
            button.addClass('hidden');
          }
          loader.addClass('hidden');
        },
        error: function (errorThrown) {
          console.log(errorThrown);
        }
      });
    })
  }

  function formShield() {
    $('.shield-start').focus(function () {
      $('.shield').val(14);
    });
  }

  function makeTimer() {
    let end_time = $('.sms-timer').data('end');
    let now_time = new Date();
    now_time = (Date.parse(now_time) / 1000);
    let time_left = end_time - now_time;

    if (time_left < 0) {
      time_left = 0;
    }

    if (time_left === 0) {
      $('.sms-note').addClass('hidden');
      $('.sms-message').removeClass('hidden');
    } else {
      var days = Math.floor(time_left / 86400);
      var hours = Math.floor((time_left - (days * 86400)) / 3600);
      var minutes = Math.floor((time_left - (days * 86400) - (hours * 3600)) / 60);
      var seconds = Math.floor((time_left - (days * 86400) - (hours * 3600) - (minutes * 60)));

      if (hours < "10") {
        hours = "0" + hours;
      }
      if (minutes < "10") {
        minutes = "0" + minutes;
      }
      if (seconds < "10") {
        seconds = "0" + seconds;
      }

      $(".sms-timer .st-minute").html(minutes);
      $(".sms-timer .st-second").html(seconds);
    }
  }

  let interval = null;

  function phoneTimer() {
    if ($('.sms-timer').length) {
      let end_time = $('.sms-timer').data('end');
      let now_time = new Date();
      now_time = (Date.parse(now_time) / 1000);
      let time_left = end_time - now_time;
      if (time_left > 0) {
        $('.sms-note').removeClass('hidden');
        $('.sms-message').addClass('hidden');
        if (interval !== null) {
          clearInterval(interval);
        }
        interval = setInterval(function () {
          makeTimer();
        }, 1000);
      }
    }
  }

  function resendSMS() {
    $('.sms-message').on('click', function (e) {
      let action = $(this).attr('href');
      let status = $(this).data('status');
      e.preventDefault();
      $.ajax({
        url: action,
        type: 'post',
        dataType: "json",
        data: {
          'status': status,
          'lang': lang,
        },
        success: function (data) {
          $('.sms-timer').data('end', data.end_time);
          $('.sms-timer').attr('data-end', data.end_time);
          phoneTimer();
          $('.sms-alert').html('<div class="alert ' + data.alert_type + ' alert-dismissible" role="alert">\n' +
            '                        <button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button>\n' +
            '                        ' + data.alert_message + '\n' +
            '                    \n</div>');
        },
        error: function (errorThrown) {
          let message = '';
          switch (lang) {
            case 'en':
              message = 'Error! Something went wrong. Please, contact the Administrator if the error occurs again. ';
              break;
            default:
              message = 'Произошла ошибка! Пожалуйста, свяжитесь с Администратором, если ошибка возникнет вновь.';
          }
          $('.sms-alert').html('<div class="alert alert-danger alert-dismissible" role="alert">\n' +
            '                        <button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button>\n' +
            '                        ' + message + '\n' +
            '                    \n</div>')
        }
      });
    })
  }

  function userServices() {
    $('.add-service-form').each(function () {
      let category = $('#user-service-category', $(this));
      let group = $('#user-service-group', $(this));
      let service = $('#userservice-service_id', $(this));
      let price = $('#userservice-price', $(this));
      let price_type = $('#userservice-type', $(this));
      let button = $('.add-service-button', $(this));
      let group_error = $('.no-group-error', $(this));
      let service_error = $('.no-service-error', $(this));
      category.on('change', function () {
        let action = '/ajax/load-groups';
        let category_id = $(this).val();
        $.ajax({
          url: action,
          type: 'post',
          dataType: "json",
          data: {
            'category_id': category_id,
            'lang': lang,
          },
          success: function (data) {
            group.html(data.html);
            service.html("<option value=''></option>");
            group.val('');
            service.val('');
            if (group.find('option').length > 1) {
              group.parents('.form-group').removeClass('hidden');
              group_error.addClass('hidden');
            } else {
              group.parents('.form-group').addClass('hidden');
              group_error.removeClass('hidden');
            }
            service.parents('.form-group').addClass('hidden');
            price.parents('.form-group').addClass('hidden');
            price_type.parents('.form-group').addClass('hidden');
            service_error.addClass('hidden');
            button.addClass('hidden');
          },
          error: function (errorThrown) {
            console.log(errorThrown);
          }
        });
      });

      group.on('change', function () {
        let action = '/ajax/load-services';
        let group_id = $(this).val();
        $.ajax({
          url: action,
          type: 'post',
          dataType: "json",
          data: {
            'group_id': group_id,
            'lang': lang,
          },
          success: function (data) {
            service.html(data.html);
            service.val('');
            if (service.find('option').length > 1) {
              service.parents('.form-group').removeClass('hidden');
              service_error.addClass('hidden');
            } else {
              service.parents('.form-group').addClass('hidden');
              service_error.removeClass('hidden');
            }
            price.parents('.form-group').addClass('hidden');
            price_type.parents('.form-group').addClass('hidden');
            group_error.addClass('hidden');
            button.addClass('hidden');
          },
          error: function (errorThrown) {
            console.log(errorThrown);
          }
        });
      });

      service.on('change', function () {
        if (service.find('option').length > 1) {
          price.parents('.form-group').removeClass('hidden');
          price_type.parents('.form-group').removeClass('hidden');
          button.removeClass('hidden');
        } else {
          price.parents('.form-group').addClass('hidden');
          price_type.parents('.form-group').addClass('hidden');
          button.addClass('hidden');
        }
      })
    });
  }

  function addServiceForm() {
    $('.add-service-form').each(function () {
      let form = $(this);
      let submit_button = $('#add-service-form-submit');
      let category_input = $('#user-service-category', form);
      let group_input = $('#user-service-group', form);
      let service_input = $('#userservice-service_id', form);
      let price_input = $('#userservice-price', form);
      let type_input = $('#userservice-type', form);
      let response = $('.add-service-response');
      let user_services = $('.user-services-data');
      let delete_message = user_services.data('delete_message');
      let edit_message = user_services.data('edit_message');
      let add_service_message = user_services.data('add_service_message');
      let add_group_message = user_services.data('add_group_message');
      let add_category_message = user_services.data('add_category_message');
      let price_type_message = user_services.data('price_type_message');

      let category = $('#user-service-category', $(this));
      let group = $('#user-service-group', $(this));
      let service = $('#userservice-service_id', $(this));
      let price = $('#userservice-price', $(this));
      let price_type = $('#userservice-type', $(this));
      let button = $('.add-service-button', $(this));
      let group_error = $('.no-group-error', $(this));
      let service_error = $('.no-service-error', $(this));

      // category_input.on('change', function() {
      //   submit_button.attr('disabled', true);
      // });
      //
      // group_input.on('change', function() {
      //   submit_button.attr('disabled', true);
      // });
      //
      // service_input.on('change', function() {
      //   let submit_active = service_input.val();
      //   if (submit_active) {
      //     submit_button.removeAttr('disabled');
      //   }
      // });

      submit_button.on('click', function (e) {
        e.preventDefault();
        let action = form.attr('action');
        let service_id = service_input.val();
        let price = price_input.val();
        let type = 0;
        if (form.find('#userservice-type').is(':checked')) {
          type = 1;
        }

        if (!form.find('.has-error').length) {
          $.ajax({
            url: action,
            type: 'post',
            dataType: "json",
            data: {
              'service_id': service_id,
              'price': price,
              'type': type,
              'lang': lang,
            },
            success: function (data) {

              // $('.add-service-form-first').remove();
              // $('.add-service-modal-btn').removeClass('hidden');
              // $('.first-service-text').addClass('hidden');
              // $('.extra-alert-image').removeClass('hidden');
              if ($('.add-service-form-first').length) {
                window.location = window.location.href + '?status=complete';
                // location.reload();
              } else {
                response.append(data.response);

                let success = data.success;

                let category_id = data.category_id;
                let category_title = data.category_title;
                let group_id = data.group_id;
                let group_title = data.group_title;
                let service_id = data.service_id;
                let service_title = data.service_title;

                if (success) {
                  let category_block = user_services.find('.user-services-category[data-category="' + category_id + '"]');

                  if (!category_block.length) {
                    var addedBlock = user_services.find('.user-services-add-category') || user_services;
                    addedBlock.before('<div class="lk__services m-t-40 user-services-block">\n' +
                      '<div class="lk__services__category user-services-category" data-category="' + category_id + '">\n' +
                      '<div class="d-flex justify-content-between aling-items-start w-100">\n' +
                      '<div class="title-4 clr-text-alt flex-grow">' + category_title + '</div>\n' +
                      '<div class="flex-static">\n' +
                      '<div class="lk__services__delete link user-services-delete-category"><span class="hidden-md-down">' + delete_message + '</span></div>\n' +
                      '</div>\n' +
                      '</div>\n' +
                      '<div class="user-services_group_block"></div>' +
                      '</div>\n' +
                      '<a href="#add-service-modal" data-toggle="modal" data-group-id="' + group_id + '" class="btn btn-sm btn-default user-services-add-group m-t-20">' + add_group_message + '</a>\n' +
                      '</div>\n');
                  }

                  if (!category.length) {
                    user_services.append('<a href="#add-service-modal" data-toggle="modal" class="btn btn-sm btn-primary user-services-add-category flex-static m-t-40">\n' +
                      '                            <div class="small-icon">\n' +
                      '                                <div class="si-text">' + add_category_message + '</div>\n' +
                      '                                <div class="si-img" style="background-image: url(/images/icons/plus.svg)"></div>\n' +
                      '                            </div>\n' +
                      '                        </a>');
                  }

                  category_block = user_services.find('.user-services-category[data-category="' + category_id + '"]');

                  let group_block = category_block.find('.user-services-group[data-group="' + group_id + '"]');

                  if (!group_block.length) {
                    category_block.find('.user-services_group_block').append('<div class="lk__services__group user-services-group" data-group="' + group_id + '">\n' +
                      '<div class="d-flex justify-content-between aling-items-start w-100">\n' +
                      '<div class="lk__services__group__title title-5 clr-text-alt flex-grow">' + group_title + '</div>\n' +
                      '<div class="flex-static">\n' +
                      '<div class="lk__services__delete link user-services-delete-group"><span class="hidden-md-down">' + delete_message + '</span></div>\n' +
                      '</div>\n' +
                      '</div>\n' +
                      '<div class="user-services_service_block m-t-15"></div>\n' +
                      '</div>');
                  }

                  group_block = category_block.find('.user-services-group[data-group="' + group_id + '"');

                  let service_block = group_block.find('.user-services-service[data-group="' + service_id + '"]');

                  if (!service_block.length) {
                    let service_price = data.service_price;
                    group_block.find('.user-services_service_block').append('<div class="lk__services__item user-services-service" data-service="' + service_id + '">\n' +
                      '<div class="f-row justify-content-between user-services-service-inner">\n' +
                      '<div class="f-col-9 f-col-md-8">\n' +
                      '<div class="lk__services__item__text title-5 clr-text-alt d-flex align-items-start justify-content-between w-100">\n' +
                      '<div class="flex-wrap">' + service_title + '</div>\n' +
                      '<div class="flex-grow border">&nbsp;</div>\n' +
                      '<div class="flex-static">' + service_price + '</div>\n' +
                      '</div>\n' +
                      '</div>\n' +
                      '<div class="f-col-3">\n' +
                      '<div class="d-flex align-items-center justify-content-end w-100">\n' +
                      '<div class="lk__services__edit link user-services-edit-service"><span class="hidden-md-down">' + edit_message + '</span></div>\n' +
                      '<div class="lk__services__delete link user-services-delete-service"><span class="hidden-md-down">' + delete_message + '</span></div>\n' +
                      '</div>\n' +
                      '</div>\n' +
                      '</div>\n' +
                      '</div>');
                  }

                  if (group_block.find('.user-services-service').length <= 1) {
                    group_block.append('<a href="#add-service-modal" data-toggle="modal" data-category-id="' + category_id + '" data-group-id="' + group_id + '" class="link link-a d-inline-block user-services-add-service m-t-15">' + add_service_message + '+</a>')
                  }

                  let button = $('.user-services-delete-category');
                  button.off('click');
                  button = $('.user-services-delete-group');
                  button.off('click');
                  button = $('.user-services-delete-service');
                  button.off('click');
                  button = $('.user-services-edit-service');
                  button.off('click');
                  deleteUserServicesCategory();
                  deleteUserServicesGroup();
                  deleteUserServicesService();
                  editUserServicesService();
                }

                resetServiceForm();
                $('#add-service-modal').modal('hide');
              }
            },
            error: function (errorThrown) {
              console.log(errorThrown);
              resetServiceForm();
              $('#add-service-modal').modal('hide');
            }
          });
        }

      });

      function resetServiceForm() {
        category_input.find('option:selected').prop("selected", false);
        category_input.val('');
        category_input.val(null).trigger('change.select2');
        group_input.html("<option value=''></option>");
        group_input.val('');
        service_input.html("<option value=''></option>");
        service_input.val('');
        price_input.val('');
        // submit_button.attr('disabled', true);

        group.parents('.form-group').addClass('hidden');
        service.parents('.form-group').addClass('hidden');
        price.parents('.form-group').addClass('hidden');
        price_type.parents('.form-group').addClass('hidden');
        service_error.addClass('hidden');
        group_error.addClass('hidden');
        button.addClass('hidden');
      }

      $('#add-service-modal').on('hidden.bs.modal', function () {
        resetServiceForm();
      });
    });


    $('.user-services-add-service').on('click', function () {
      let form = $('.add-service-form');
      let category = $('#user-service-category', form);
      let group = $('#user-service-group', form);
      let category_id = $(this).data('category-id');
      let group_id = $(this).data('group-id');
      $(category).val(category_id);
      $(category).trigger('change');
      setTimeout(updateGroup, 500);

      function updateGroup() {
        $(group).val(group_id);
        $(group).trigger('change');
      }
    });

    $('.user-services-add-group').on('click', function () {
      let form = $('.add-service-form');
      let category = $('#user-service-category', form);
      let category_id = $(this).data('category-id');
      $(category).val(category_id);
      $(category).trigger('change');
    });
  }

  function deleteUserServicesCategory() {
    let button = $('.user-services-delete-category');
    button.on('click', function () {
      let category = $(this).parents('.user-services-category');
      let service_ids = [];
      let action = '/ajax/delete-user-services-category';
      let response = $('.add-service-response');

      let services = category.find('.user-services-service');
      services.each(function () {
        let service_id = $(this).data('service');
        service_ids.push(service_id);
      });

      $.ajax({
        url: action,
        type: 'post',
        dataType: "json",
        data: {
          'service_ids': service_ids,
          'lang': lang,
        },
        success: function (data) {
          response.append(data.response);
          category.parents('.user-services-block').remove();
          if (!$('.user-services-category').length) {
            $('.user-services-add-category').remove();
          }
        },
        error: function (errorThrown) {
          console.log(errorThrown);
        }
      });

    });
  }

  function deleteUserServicesGroup() {
    let button = $('.user-services-delete-group');
    button.on('click', function () {
      let group = $(this).parents('.user-services-group');
      let category = $(this).parents('.user-services-category');
      let button = category.find('.user-services-add-group');
      let service_ids = [];
      let action = '/ajax/delete-user-services-group';
      let response = $('.add-service-response');

      let services = group.find('.user-services-service');
      services.each(function () {
        let service_id = $(this).data('service');
        service_ids.push(service_id);
      });

      $.ajax({
        url: action,
        type: 'post',
        dataType: "json",
        data: {
          'service_ids': service_ids,
          'lang': lang,
        },
        success: function (data) {
          response.html(data.response);
          group.remove();
          if (!category.find('.user-services-group').length) {
            category.parents('.user-services-block').remove();
            $('.user-services-add-category').remove();
          }
        },
        error: function (errorThrown) {
          console.log(errorThrown);
        }
      });

    });
  }

  function deleteUserServicesService() {
    let button = $('.user-services-delete-service');
    button.on('click', function () {
      let group = $(this).parents('.user-services-group');
      let category = $(this).parents('.user-services-category');
      let service = $(this).parents('.user-services-service');
      let service_id = service.data('service');
      let action = '/ajax/delete-user-services-service';
      let response = $('.add-service-response');

      $.ajax({
        url: action,
        type: 'post',
        dataType: "json",
        data: {
          'service_id': service_id,
          'lang': lang,
        },
        success: function (data) {
          response.html(data.response);
          service.remove();
          if (!group.find('.user-services-service').length) {
            group.remove();
          }
          if (!category.find('.user-services-group').length) {
            category.parents('.user-services-block').remove();
            $('.user-services-add-category').remove();
          }
        },
        error: function (errorThrown) {
          console.log(errorThrown);
        }
      });

    });
  }

  function editUserServicesService() {
    let button = $('.user-services-edit-service');
    let response = $('.add-service-response');

    button.on('click', function () {
      console.log('launched');
      let service = $(this).parents('.user-services-service');
      let group = $(this).parents('.user-services-group');
      let service_id = service.data('service');
      let group_id = group.data('group');
      let user_services = $('.user-services-data');
      let service_inner = service.find('.user-services-service-inner');
      let action = '/ajax/edit-user-services-service-form';

      $.ajax({
        url: action,
        type: 'post',
        dataType: "json",
        data: {
          'group_id': group_id,
          'service_id': service_id,
          'lang': lang,
        },
        success: function (data) {
          service_inner.addClass('hidden');
          service.append(data.form);
          select2reinit(service);
          let button_save = $('.user-services-save-service');
          let button_cancel = $('.user-services-cancel-service');
          button_save.on('click', function (e) {
            e.preventDefault();
            let form = $(this).parents('.user-services-service-inner-form');
            let action = '/ajax/save-user-services-service-form';
            let service_id_new = form.find('.user-services-edit-service').val();
            let price = form.find('.user-services-edit-price').val();
            let type = 0;
            if (form.find('.user-services-edit-type').is(':checked')) {
              type = 1;
            }

            $.ajax({
              url: action,
              type: 'post',
              dataType: "json",
              data: {
                'service_id': service_id,
                'service_id_new': service_id_new,
                'price': price,
                'type': type,
                'lang': lang,
              },
              success: function (data) {
                let success = data.success;

                if (success) {
                  response.html(data.response);
                  form.remove();
                  service_inner.removeClass('hidden');
                  service.data('service', data.service_id_new);
                  service.attr('data-service', data.service_id_new);
                  service_inner.find('.lk__services__item__text > div:first-of-type').html(data.service_title);
                  service_inner.find('.lk__services__item__text > div:last-of-type').html(data.service_price);
                } else {
                  response.html(data.response);
                  form.remove();
                  service_inner.removeClass('hidden');
                }
              },
              error: function (errorThrown) {
                console.log(errorThrown);
              }
            });

          });
          button_cancel.on('click', function () {
            let form = $(this).parents('.user-services-service-inner-form');
            form.remove();
            service_inner.removeClass('hidden');
          })


        },
        error: function (errorThrown) {
          console.log(errorThrown);
        }
      });

    });
  }

  function checkNumeric(number) {
    let numberRegex = /^[+-]?\d+(\.\d+)?([eE][+-]?\d+)?$/;
    return numberRegex.test(number);
  }

  function firebaseSMS() {

    if ($("#phoneFirebaseNumber").length) {

      var flash = $('.flash-block');

      // Your web app's Firebase configuration
      var firebaseConfig = {
        apiKey: "AIzaSyDbWsX7oKe5grGvNNZWdCpuiH8GZOJkX2A",
        authDomain: "homiefix-77ef1.firebaseapp.com",
        databaseURL: "https://homiefix-77ef1.firebaseio.com",
        projectId: "homiefix-77ef1",
        storageBucket: "homiefix-77ef1.appspot.com",
        messagingSenderId: "177821429470",
        appId: "1:177821429470:web:665708f6a8eef315899c4f"
      };

      let restore_password = false;

      if ($('#phoneFirebasePasswordRestore').length) {
        restore_password = true;
      }

      // Initialize Firebase
      firebase.initializeApp(firebaseConfig);

      // Create a Recaptcha verifier instance globally
      // Calls submitPhoneNumberAuth() when the captcha is verified
      window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier(
        "recaptcha-container", {
          size: "invisible",
          callback: function (response) {}
        }
      );

      window.confirmationResult = null;

      $(document).ready(function () {
        submitPhoneNumberAuth();
      });

      $('#send-code').on('click', function (e) {
        e.preventDefault();
        submitPhoneNumberAuth();
      });
      $('#confirm-code').on('click', function (e) {
        e.preventDefault();
        submitPhoneNumberAuthCode();
      });

      // This function runs when the 'send-code' is clicked
      // Takes the value from the 'phoneNumber' input and sends SMS to that phone number
      function submitPhoneNumberAuth() {
        var phoneNumber = $("#phoneFirebaseNumber").val();

        var appVerifier = window.recaptchaVerifier;
        firebase
          .auth()
          .signInWithPhoneNumber(phoneNumber, appVerifier)
          .then(function (confirmationResult) {
            window.confirmationResult = confirmationResult;
            $.ajax({
              url: '/ajax/send-firebase-sms',
              type: 'post',
              dataType: "json",
              data: {
                'lang': lang,
                'success': true,
              },
              success: function (data) {
                flash.html(data.response);
                // $('#confirmFirebaseCode').focus();
              },
              error: function (errorThrown) {
                console.log(errorThrown);
              }
            });
          })
          .catch(function (error) {
            console.log(error);
            window.confirmationResult = null;
            $.ajax({
              url: '/ajax/send-firebase-sms',
              type: 'post',
              dataType: "json",
              data: {
                'lang': lang,
                'success': false,
              },
              success: function (data) {
                flash.html(data.response);
              },
              error: function (errorThrown) {
                console.log(errorThrown);
              }
            });
          });
      }

      // This function runs when the 'confirm-code' button is clicked
      // Takes the value from the 'code' input and submits the code to verify the phone number
      // Return a user object if the authentication was successful, and auth is complete
      function submitPhoneNumberAuthCode() {
        var code = $("#confirmFirebaseCode").val();

        if (confirmationResult !== null) {
          confirmationResult
            .confirm(code)
            .then(function (result) {
              var user = result.user;
              $.ajax({
                url: '/ajax/confirm-firebase-sms',
                type: 'post',
                dataType: "json",
                data: {
                  'lang': lang,
                  'success': true,
                  'restore_password': restore_password,
                },
                success: function (data) {
                  flash.html(data.response);
                },
                error: function (errorThrown) {
                  console.log(errorThrown);
                }
              });
            })
            .catch(function (error) {
              console.log(error);
              $.ajax({
                url: '/ajax/confirm-firebase-sms',
                type: 'post',
                dataType: "json",
                data: {
                  'lang': lang,
                  'success': false,
                  'restore_password': false,
                },
                success: function (data) {
                  flash.html(data.response);
                },
                error: function (errorThrown) {
                  console.log(errorThrown);
                }
              });
            });
        }
      }

      // firebase.auth().onAuthStateChanged(function(user) {
      //     if (user) {
      //         console.log("USER LOGGED IN");
      //     } else {
      //         // No user is signed in.
      //         console.log("USER NOT LOGGED IN");
      //     }
      // });
    }
  }

  function autoUploadImage() {
    $('#user-image').on('change', function () {
      let form = document.getElementById("user-change-form");
      $('#user-change-form').find('button[type="submit"]').addClass('disabled');
      $.ajax({
        url: '/ajax/auto-upload-image',
        type: 'post',
        data: new FormData(form),
        processData: false,
        contentType: false,
        success: function (data) {
          if (data) {
            $('#user-change-form').find('button[type="submit"]').removeClass('disabled');
          }
        },
        error: function (errorThrown) {
          console.log(errorThrown);
        }
      });
    })
  }

  function revealPhone() {
    $('.profile-page, .service__items').on('click', '.reveal-phone-btn', function (e) {
      e.preventDefault();
      let button = $(this);
      let card = $(this).parents('.card-item');
      let phone_block = $('.reveal-phone', card);
      let user_id = card.data('user-id');
      $.ajax({
        url: '/ajax/reveal-phone',
        type: 'post',
        dataType: "json",
        data: {
          'user_id': user_id,
          'lang': lang,
        },
        success: function (data) {
          phone_block.html(data.phone);
          if (button.hasClass('btn')) {
            button.after(data.response)
          }
          button.hide();
        },
        error: function (errorThrown) {
          console.log(errorThrown);
        }
      });
    })
  }

  function cookies() {
    let block = $('.cookies-block');
    let height = block.outerHeight();
    let close = $('#accept-cookie');
    block.css('bottom', -height);
    block.addClass('show');
    block.animate({
      'bottom': 0
    }, 1000);
    close.on('click', function (e) {
      e.preventDefault();
      $.get('/ajax/accept-cookie');
      block.animate({
        'bottom': -height
      }, 1000, function () {
        block.removeClass('show');
      });
    })
  }

  function languageSelectFix() {
    $('input[id^="user-lang-"]').each(function () {
      let val = $(this).val();
      let checked = $(this).prop('checked');
      $('#user-languages').find('input[value=' + val + ']').prop('checked', checked);
    });
    $('input[id^="user-lang-"]').on('change', function () {
      let val = $(this).val();
      let checked = $(this).prop('checked');
      console.log($('#user-languages').find('input[value=' + val + ']'));
      $('#user-languages').find('input[value=' + val + ']').prop('checked', checked);
    });
  }

  function extraAlertClose() {
    $('.extra-alert__close').on('click', function () {
      $(this).parents('.extra-alert').hide();
    })
  }

  function restoreUserScroll() {

    $('.service__items').on('click', '.service__item a', function (e) {
      e.preventDefault();

      var scroll = $(document).scrollTop();
      $.cookie('pageScroll', scroll, {
        expires: 1,
        path: '/'
      });

      window.location = $(this).attr('href');
    });

    $('#return-back-button').on('click', function (e) {
      e.preventDefault();

      var link = $(this).attr('href');

      $.cookie("actionScroll", 'scroll', {
        expires: 1,
        path: '/'
      });
      $.cookie("link", link, {
        expires: 1,
        path: '/'
      });

      window.location = $(this).attr('href');
    });
  }

  function loadPageScroll() {
    if ($.cookie("link") && $.cookie("actionScroll") == 'scroll') {
      $.removeCookie("actionScroll", {
        expires: 1,
        path: '/'
      });
      if (window.location.href === $.cookie("link")) {
        // triggerAjax(+$.cookie('pageScroll'));
        var scroll = +$.cookie('pageScroll'),
          i = 1;

        while ((scroll + $(window).height()) > $(document).height()) {
          let action = '/ajax/load-service';
          let container = $('.service__items');
          let button = $('#load-more-service');
          let loader = $('#loader-service');
          let offset = $('.service__item').length;
          let limit = button.data('limit');
          let category_id = button.data('category-id');
          let keyword = button.data('keyword');
          loader.removeClass('hidden');
          $.ajax({
            url: action,
            type: 'post',
            async: false,
            dataType: "json",
            data: {
              'offset': offset,
              'limit': limit,
              'category_id': category_id,
              'keyword': keyword,
              'lang': lang,
            },
            success: function (data) {
              container.append(data.html);
              if (!data.showMore) {
                button.addClass('hidden');
              }
              loader.addClass('hidden');
            },
            error: function (errorThrown) {
              console.log(errorThrown);
            }
          });
        }
        $('html, body').animate({
          scrollTop: +$.cookie('pageScroll')
        }, 300);
      }
    }

    // function triggerAjax(scroll) {
    //
    //   console.log(`Scroll: ${$.cookie('pageScroll')}`);
    //   console.log(`Высота экрана: ${$(window).height()}`);
    //   console.log(`Высота документа: ${$(document).height()}`);
    //   var i = 1;
    //   if ( (scroll + $(window).height()) > $(document).height() ) {
    //     console.log(i++);
    //
    //     let action = '/ajax/load-service';
    //     let container = $('.service__items');
    //     let button = $('#load-more-service');
    //     let loader = $('#loader-service');
    //     button.on('click', function () {
    //       let offset = $('.service__item').length;
    //       let limit = button.data('limit');
    //       let category_id = button.data('category-id');
    //       let keyword = button.data('keyword');
    //       loader.removeClass('hidden');
    //       $.ajax({
    //         url: action,
    //         type: 'post',
    //         dataType: "json",
    //         data: {
    //           'offset': offset,
    //           'limit': limit,
    //           'category_id': category_id,
    //           'keyword' : keyword,
    //           'lang': lang,
    //         },
    //         success: function (data) {
    //           container.append(data.html);
    //           if(!data.showMore) {
    //             button.addClass('hidden');
    //           }
    //           loader.addClass('hidden');
    //
    //
    //           triggerAjax(scroll);
    //         },
    //         error: function(errorThrown){
    //           console.log(errorThrown);
    //         }
    //       });
    //     })
    //   } else {
    //
    //     $('html, body').animate({
    //       scrollTop: +$.cookie('pageScroll')
    //     }, 300);
    //   }
    // }
  }

  function validatePhone() {
    var iTel = document.querySelector(".intl-tel"),
      _iTel = $('.intl-tel');

    if (_iTel.length) {
      var iTelInit = window.intlTelInput(iTel, {
        nationalMode: true,
        initialCountry: "auto",
        geoIpLookup: function (callback) {
          $.get('https://ipinfo.io', function () {}, "jsonp").always(function (resp) {
            var countryCode = (resp && resp.country) ? resp.country : "";
            callback(countryCode);
          });
        },
        formatOnDisplay: false,
        utilsScript: "/vendor/intl-tel-input-master/js/utils.js"
      });

      $('.intl-tel').focus();

      // var handleChange = function() {
      //   iTelInit.getNumber();
      // };
      //
      // iTel.addEventListener('change', handleChange);
      // iTel.addEventListener('keyup', handleChange);

      _iTel.closest('form').on('submit', function () {
        $(".js-validate-phone").val(iTelInit.getNumber());
      });
    }

  }

  function placeHolderFileInput() {
    if ($('.file-drop-zone-title').length) {
      switch (lang) {
        case 'en':
          $('.file-drop-zone-title').text('Add image');
          break;
        default:
          $('.file-drop-zone-title').text('Добавить изображение');
      }
    }
  }

  function cursorSelect2() {
    var placeholder;
    if ($('.select2.select2--search').length > 0) {
      $('.select2.select2--search').siblings('.select2').on('click', function () {
        switch (lang) {
          case 'en':
            placeholder = 'Search';
            break;
          default:
            placeholder = 'Поиск';
        }
        $('.select2-search__field').focus().attr('placeholder', placeholder);
      });
    }
  }


  $(document).ready(function () {
    fancybox();
    footer();
    footerAuto();
    goodsOrderForm();
    mask();
    navbarCollapse();
    passwordVisible();
    select2init();
    scrollToTarget();
    scrollToTop();
    tableStyle();
    tooltip();
    objectFill();
    sliderPhotogallery();
    mainNavbar();
    catalogNavbar();
    sliderNews();
    fixCollapse();
    stickyHeader();
    showCategories();
    pageForm();
    showDescription();
    showPriceList();
    stickyBlock();
    scrollSpy();
    showMore();
    mobileNavbar();
    loadPhoto();
    editData();
    closeProfileNavbar();
    loadMoreBlog();
    loadMoreReview();
    loadMoreService();
    formShield();
    phoneTimer();
    // resendSMS();
    userServices();
    addServiceForm();
    deleteUserServicesCategory();
    deleteUserServicesGroup();
    deleteUserServicesService();
    editUserServicesService();
    autoUploadImage();
    revealPhone();
    firebaseSMS();
    cookies();
    languageSelectFix();
    extraAlertClose();
    restoreUserScroll();
    loadPageScroll();
    validatePhone();
    cursorSelect2();

    setTimeout(placeHolderFileInput, 100);
  });

  if (typeof CKEDITOR !== 'undefined') {
    CKEDITOR.env.isCompatible = true;
  }

})(jQuery);
