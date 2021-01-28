"use strict";

document.addEventListener('DOMContentLoaded', function () {

    // AOS

    AOS.init({
        disable: function () {
            let maxWidth = 768;
            return window.innerWidth < maxWidth;
        },
    });

    // Burger menu

    let burger = document.querySelector('.burger');
    let nav = document.querySelector('.nav');
    let body = document.querySelector('body');

    burger.addEventListener('click', () => {
        nav.classList.toggle('nav--active');
        burger.classList.toggle('burger--active');
        body.classList.toggle('no-scroll');
    })

    // Slider

    let servicesSwiper = new Swiper('.services-slider', {
        navigation: {
            nextEl: '.services-slider__swipe',
            // prevEl: '.swiper-button-prev',
        },
        freeMode: true,
        watchOverflow: false,
        slidesPerView: 1.2,
        spaceBetween: 12,
        observer: true,
        observeParents: true,
        pagination: {
            el: '.swiper-pagination',
        },
        breakpoints: {

            500: {
                slidesPerView: 1.6,
                
            },

            767: {
                slidesPerView: 2.2,
                spaceBetween: 16,
            },

            991: {
                watchOverflow: true,
                slidesPerView: 3,
                spaceBetween: 16,
            },
        }
    })

    let coachesSwiper = new Swiper('.coaches-slider', {

        spaceBetween: 16,

        pagination: {
            el: '.coaches-slider__pagination',
            type: 'bullets',
            clickable: true
        },
       
        
        navigation: {
            nextEl: '.coaches-slider__next',
            prevEl: '.coaches-slider__prev',
        },
        slidesPerView: 1.3,
        observer: true,
        observeParents: true,
        breakpoints: {


            500: {
                slidesPerView: 1.8,
                pagination: {
                    el: '.coaches-slider__pagination',
                    type: 'bullets',
                },
            },

            767: {
                slidesPerView: 1.3,
                pagination: {
                    el: '.coaches-slider__pagination',
                    type: 'fraction',
                    clickable: false,
                    renderFraction: function (currentClass, totalClass) {
                        return '<span class="' + currentClass + '"></span>' +
                            ' of ' +
                            '<span class="' + totalClass + '"></span>';
                    },
                },
            },

            1140: {
                slidesPerView: 2,
                pagination: {
                    el: '.coaches-slider__pagination',
                    type: 'fraction',
                    clickable: false,
                    renderFraction: function (currentClass, totalClass) {
                        return '<span class="' + currentClass + '"></span>' +
                            ' of ' +
                            '<span class="' + totalClass + '"></span>';
                    },
                },
            },
        }
    })


    window.addEventListener('resize', () => {

        coachesSwiper.pagination.destroy();
        coachesSwiper.pagination.init();
        coachesSwiper.pagination.render();
        coachesSwiper.pagination.update();
    })


});

window.addEventListener('load', AOS.refresh)