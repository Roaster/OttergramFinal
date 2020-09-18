var DETAIL_IMAGE_SELECTOR = '[data-image-role="target"]';
var DETAIL_TITLE_SELECTOR = '[data-image-role="title"]';
var DETAIL_FRAME_SELECTOR = '[data-image-role="frame"';
var THUMBNAIL_LINK_SELECTOR = '[data-image-role="trigger"]';
var BUTTON_SELECTOR = '[data-button="nav"]';
var HIDDEN_DETAIL_CLASS = 'hidden-detail';
var TINY_EFFECT_CLASS = 'is-tiny';
var PREV_BUTTON = '[data-button="nav-prev"]';
var NEXT_BUTTON = '[data-button="nav-next"]';
var ESC_KEY = 27;


function setDetails(imageUrl, titleText, oNum) {
    'use strict';
    var detailImage = document.querySelector(DETAIL_IMAGE_SELECTOR);
    detailImage.setAttribute('src', imageUrl);

    var detailTitle = document.querySelector(DETAIL_TITLE_SELECTOR);
    detailTitle.textContent = titleText;


}

function imageFromThumb(thumbnail) {
    'use strict';
    return thumbnail.getAttribute('data-image-url');
}

function titleFromThumb(thumbnail) {
    'use strict';
    return thumbnail.getAttribute('data-image-title');
}

function setDetailsFromThumb(thumbnail) {
    'use strict';
    setDetails(imageFromThumb(thumbnail), titleFromThumb(thumbnail));
}

function addThumbClickHandler(thumb) {
    'use strict';
    thumb.addEventListener('click', function (event) {
        event.preventDefault();
        setDetailsFromThumb(thumb);
        showDetails();
    });
}

function getThumbnailsArray() {
    'use strict';
    var thumbnails = document.querySelectorAll(THUMBNAIL_LINK_SELECTOR);
    var thumbnailArray = [].slice.call(thumbnails);
    return thumbnailArray;
}

function getNextButton() {
    var nextBtn = document.querySelector(NEXT_BUTTON);
    return nextBtn;
}

function getPrevButton() {
    var prevBtn = document.querySelector(PREV_BUTTON);
    return prevBtn;
}

function hideDetails() {
    'use strict';
    document.body.classList.add(HIDDEN_DETAIL_CLASS);
}

function addKeyPressHandler() {
    document.body.addEventListener('keyup', function (event) {
        'use strict';
        event.preventDefault();
        if (event.keyCode === ESC_KEY) {
            hideDetails();
        }
    });
}

function showDetails() {
    'use strict';
    var frame = document.querySelector(DETAIL_FRAME_SELECTOR);
    document.body.classList.remove(HIDDEN_DETAIL_CLASS);
    frame.classList.add(TINY_EFFECT_CLASS);
    setTimeout(function () {
        frame.classList.remove(TINY_EFFECT_CLASS);
    }, 50);

}

//Add an event listener to the Next button.
//On click set detail to next image
function addNextBtnListner(btn) {
    btn.addEventListener('click', function (event) {
        event.preventDefault();
        setNext();
    });
}

//Add an event listener to the Previous button
function addPrevBtnListner(btn) {
    btn.addEventListener('click', function (event) {
        event.preventDefault();
        setPrev();
    });
}

//Determines which thumnail index/oNum the detail image currently is
function currentThumb() {
    var dImage = document.querySelector(DETAIL_IMAGE_SELECTOR);
    return dImage.getAttribute("oNum");
}

//Set the detail image to be the next thumbnail image based on current detail
//Use added attribute oNum to keep track of place in thumbnail list
function setNext() {
    var thumbnails = getThumbnailsArray();
    var currentOtter = currentThumb();
    var detailImage = document.querySelector(DETAIL_IMAGE_SELECTOR);
    if (currentOtter == "4") {
        setDetailsFromThumb(thumbnails[0]);
        detailImage.setAttribute('oNum', '0');
    } else {
        setDetailsFromThumb(thumbnails[++currentOtter]);
        detailImage.setAttribute('oNum', currentOtter);
    }
}

//Set the detail to be the previous thumbnail image based on current detail
function setPrev() {
    var thumbnails = getThumbnailsArray();
    var currentOtter = currentThumb();
    var detailImage = document.querySelector(DETAIL_IMAGE_SELECTOR);
    if (currentOtter == "0") {
        setDetailsFromThumb(thumbnails[4]);
        detailImage.setAttribute('oNum', '4');
    } else {
        setDetailsFromThumb(thumbnails[--currentOtter]);
        detailImage.setAttribute('oNum', currentOtter);
    }
}

//Run all our functions to start Ottergram
function initializeEvents() {
    'use strict';
    var thumbnails = getThumbnailsArray();
    thumbnails.forEach(addThumbClickHandler);
    var nextButton = getNextButton();
    var prevButton = getPrevButton();
    addNextBtnListner(nextButton);
    addPrevBtnListner(prevButton);
    addKeyPressHandler();
}

initializeEvents();