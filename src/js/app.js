//import * as flsFunctions from "./modules/functions.js";
//flsFunctions.thisTest();

// 'use strict';

//mask phone number
let wrapper = document.querySelector('.wrapper');
let phone_number = document.querySelector('.preview-screen__input');
let phone_form_number = document.querySelector('.contact__phone-input');
let maskOptions = {
  mask: '+{7}(000)000 0000',
  lazy: false,
};

IMask(phone_form_number, maskOptions);
IMask(phone_number, maskOptions);

// burger

let header_menu = document.querySelector('.header__info');
let burger_icon = document.querySelector('.header__burger');
burger_icon.addEventListener('click', function (e) {
  header_menu.classList.toggle('_active');
  burger_icon.classList.toggle('_active');
});

// =========================================================

ibg;

function ibg() {
  let ibg = document.querySelectorAll('._ibg');
  for (var i = 0; i < ibg.length; i++) {
    if (ibg[i].querySelector('img')) {
      ibg[i].style.backgroundImage =
        'url(' + ibg[i].querySelector('img').getAttribute('src') + ')';
    }
  }
}

ibg();

// =========================================================

// smooth scroll
// data-goto=".main-slider"

// const menuLinks = document.querySelectorAll('.menu__link[data-goto]');
// if (menuLinks.length > 0) {
//   menuLinks.forEach((menuLink) => {
//     menuLink.addEventListener('click', onMenuLinkClick);
//   });

//   function onMenuLinkClick(e) {
//     const menuLink = e.target;
//     if (menuLink.dataset.goto && document.querySelector(menuLink.dataset.goto)) {
//       const gotoBlock = document.querySelector(menuLink.dataset.goto);
//       const gotoBlockValue =
//         gotoBlock.getBoundingClientRect().top + pageYOffset - document.querySelector('header').offsetHeight;

//       if (burger_icon.classList.contains('_active')) {
//         document.body.classList.remove('_lock');
//         burger_icon.classList.remove('_active');
//         header_menu.classList.remove('_active');
//       }

//       window.scrollTo({
//         top: gotoBlockValue,
//         behavior: 'smooth',
//       });
//       e.preventDefault();
//     }
//   }
// }

// =========================================================

// Dynamic Adaptive
// data-da=".menu__body,767,1"

function DynamicAdapt(type) {
  this.type = type;
}

DynamicAdapt.prototype.init = function () {
  const _this = this;
  // ???????????? ????????????????
  this.??bjects = [];
  this.daClassname = '_dynamic_adapt_';
  // ???????????? DOM-??????????????????
  this.nodes = document.querySelectorAll('[data-da]');

  // ???????????????????? ??bjects ????????????????
  for (let i = 0; i < this.nodes.length; i++) {
    const node = this.nodes[i];
    const data = node.dataset.da.trim();
    const dataArray = data.split(',');
    const ??bject = {};
    ??bject.element = node;
    ??bject.parent = node.parentNode;
    ??bject.destination = document.querySelector(dataArray[0].trim());
    ??bject.breakpoint = dataArray[1] ? dataArray[1].trim() : '767';
    ??bject.place = dataArray[2] ? dataArray[2].trim() : 'last';
    ??bject.index = this.indexInParent(??bject.parent, ??bject.element);
    this.??bjects.push(??bject);
  }

  this.arraySort(this.??bjects);

  // ???????????? ???????????????????? ??????????-????????????????
  this.mediaQueries = Array.prototype.map.call(
    this.??bjects,
    function (item) {
      return (
        '(' +
        this.type +
        '-width: ' +
        item.breakpoint +
        'px),' +
        item.breakpoint
      );
    },
    this
  );
  this.mediaQueries = Array.prototype.filter.call(
    this.mediaQueries,
    function (item, index, self) {
      return Array.prototype.indexOf.call(self, item) === index;
    }
  );

  // ?????????????????????? ?????????????????? ???? ??????????-????????????
  // ?? ?????????? ?????????????????????? ?????? ???????????? ??????????????
  for (let i = 0; i < this.mediaQueries.length; i++) {
    const media = this.mediaQueries[i];
    const mediaSplit = String.prototype.split.call(media, ',');
    const matchMedia = window.matchMedia(mediaSplit[0]);
    const mediaBreakpoint = mediaSplit[1];

    // ???????????? ???????????????? ?? ???????????????????? ????????????????????????
    const ??bjectsFilter = Array.prototype.filter.call(
      this.??bjects,
      function (item) {
        return item.breakpoint === mediaBreakpoint;
      }
    );
    matchMedia.addListener(function () {
      _this.mediaHandler(matchMedia, ??bjectsFilter);
    });
    this.mediaHandler(matchMedia, ??bjectsFilter);
  }
};

DynamicAdapt.prototype.mediaHandler = function (matchMedia, ??bjects) {
  if (matchMedia.matches) {
    for (let i = 0; i < ??bjects.length; i++) {
      const ??bject = ??bjects[i];
      ??bject.index = this.indexInParent(??bject.parent, ??bject.element);
      this.moveTo(??bject.place, ??bject.element, ??bject.destination);
    }
  } else {
    for (let i = 0; i < ??bjects.length; i++) {
      const ??bject = ??bjects[i];
      if (??bject.element.classList.contains(this.daClassname)) {
        this.moveBack(??bject.parent, ??bject.element, ??bject.index);
      }
    }
  }
};

// ?????????????? ??????????????????????
DynamicAdapt.prototype.moveTo = function (place, element, destination) {
  element.classList.add(this.daClassname);
  if (place === 'last' || place >= destination.children.length) {
    destination.insertAdjacentElement('beforeend', element);
    return;
  }
  if (place === 'first') {
    destination.insertAdjacentElement('afterbegin', element);
    return;
  }
  destination.children[place].insertAdjacentElement('beforebegin', element);
};

// ?????????????? ????????????????
DynamicAdapt.prototype.moveBack = function (parent, element, index) {
  element.classList.remove(this.daClassname);
  if (parent.children[index] !== undefined) {
    parent.children[index].insertAdjacentElement('beforebegin', element);
  } else {
    parent.insertAdjacentElement('beforeend', element);
  }
};

// ?????????????? ?????????????????? ?????????????? ???????????? ????????????????
DynamicAdapt.prototype.indexInParent = function (parent, element) {
  const array = Array.prototype.slice.call(parent.children);
  return Array.prototype.indexOf.call(array, element);
};

// ?????????????? ???????????????????? ?????????????? ???? breakpoint ?? place
// ???? ?????????????????????? ?????? this.type = min
// ???? ???????????????? ?????? this.type = max
DynamicAdapt.prototype.arraySort = function (arr) {
  if (this.type === 'min') {
    Array.prototype.sort.call(arr, function (a, b) {
      if (a.breakpoint === b.breakpoint) {
        if (a.place === b.place) {
          return 0;
        }

        if (a.place === 'first' || b.place === 'last') {
          return -1;
        }

        if (a.place === 'last' || b.place === 'first') {
          return 1;
        }

        return a.place - b.place;
      }

      return a.breakpoint - b.breakpoint;
    });
  } else {
    Array.prototype.sort.call(arr, function (a, b) {
      if (a.breakpoint === b.breakpoint) {
        if (a.place === b.place) {
          return 0;
        }

        if (a.place === 'first' || b.place === 'last') {
          return 1;
        }

        if (a.place === 'last' || b.place === 'first') {
          return -1;
        }

        return b.place - a.place;
      }

      return b.breakpoint - a.breakpoint;
    });
    return;
  }
};

const da = new DynamicAdapt('max');
da.init();

// =========================================================

//Spoilers
// const spollersArray = document.querySelectorAll('[data-spollers]');
// if (spollersArray.length > 0) {
//   //?????????????????? ?????????????? ??????????????????
//   const spollersRegular = Array.from(spollersArray).filter(function (item, index, self) {
//     return !item.dataset.spollers.split(',')[0];
//   });

//   //?????????????????????????? ?????????????? ??????????????????
//   if (spollersRegular.length > 0) {
//     initSpollers(spollersRegular);
//   }

//   //?????????????????? ?????????????????? ?? ?????????? ??????????????????
//   const spollersMedia = Array.from(spollersArray).filter(function (item, index, self) {
//     return item.dataset.spollers.split(',')[0];
//   });

//   //?????????????????????????? ?????????????????? ?? ?????????? ??????????????????
//   if (spollersMedia.length > 0) {
//     const breakpointsArray = [];
//     spollersMedia.forEach((item) => {
//       const params = item.dataset.spollers;
//       const breakpoint = {};
//       const paramsArray = params.split(',');
//       breakpoint.value = paramsArray[0];
//       breakpoint.type = paramsArray[1] ? paramsArray[1].trim() : 'max';
//       breakpoint.item = item;
//       breakpointsArray.push(breakpoint);
//     });

//     //???????????????? ???????????????????? ??????????????????????
//     let mediaQueries = breakpointsArray.map(function (item) {
//       return '(' + item.type + '-width: ' + item.value + 'px),' + item.value + ',' + item.type;
//     });
//     mediaQueries = mediaQueries.filter(function (item, index, self) {
//       return self.indexOf(item) === index;
//     });

//     //???????????????? ?? ???????????? ????????????????????????
//     mediaQueries.forEach((breakpoint) => {
//       const paramsArray = breakpoint.split(',');
//       const mediaBreakpoint = paramsArray[1];
//       const mediaType = paramsArray[2];
//       const matchMedia = window.matchMedia(paramsArray[0]);

//       //?????????????? ?? ?????????????? ??????????????????
//       const spollersArray = breakpointsArray.filter(function (item) {
//         if (item.value === mediaBreakpoint && item.type === mediaType) {
//           return true;
//         }
//       });

//       //??????????????
//       matchMedia.addEventListener('change', () => {
//         initSpollers(spollersArray, matchMedia);
//       });
//       initSpollers(spollersArray, matchMedia);
//     });
//   }

//   //??????????????????????????
//   function initSpollers(spollersArray, matchMedia = false) {
//     spollersArray.forEach((spollersBlock) => {
//       spollersBlock = matchMedia ? spollersBlock.item : spollersBlock;
//       if (matchMedia.matches || !matchMedia) {
//         spollersBlock.classList.add('_init');
//         initSpollerBody(spollersBlock);
//         spollersBlock.addEventListener('click', setSpollerAction);
//       } else {
//         spollersBlock.classList.remove('_init');
//         initSpollerBody(spollersBlock, false);
//         spollersBlock.removeEventListener('click', setSpollerAction);
//       }
//     });
//   }
//   //???????????? ?? ??????????????????
//   function initSpollerBody(spollersBlock, hideSpollerBody = true) {
//     const spollerTitles = spollersBlock.querySelectorAll('[data-spoller]');

//     if (spollerTitles.length > 0) {
//       spollerTitles.forEach((spollerTitle) => {
//         if (hideSpollerBody) {
//           spollerTitle.removeAttribute('tabindex');
//           if (!spollerTitle.classList.contains('_active')) {
//             spollerTitle.nextElementSibling.hidden = true;
//           }
//         } else {
//           spollerTitle.setAttribute('tabindex', '-1');
//           spollerTitle.nextElementSibling.hidden = false;
//         }
//       });
//     }
//   }
//   function setSpollerAction(e) {
//     const el = e.target;
//     if (el.hasAttribute('data-spoller') || el.closest('[data-spoller]')) {
//       const spollerTitle = el.hasAttribute('data-spoller') ? el : el.closest('[data-spoller]');
//       const spollersBlock = spollerTitle.closest('[data-spollers]');
//       const oneSpoller = spollersBlock.hasAttribute('data-one-spoller') ? true : false;
//       if (!spollersBlock.querySelectorAll('._slide').length) {
//         if (oneSpoller && !spollerTitle.classList.contains('_active')) {
//           hideSpollersBody(spollersBlock);
//         }
//         spollerTitle.classList.toggle('_active');
//         _slideToggle(spollerTitle.nextElementSibling, 500);
//       }
//       e.preventDefault();
//     }
//   }
//   function hideSpollersBody(spollersBlock) {
//     const spollerActiveTitle = spollersBlock.querySelector('[data-spoller]._active');
//     if (spollerActiveTitle) {
//       spollerActiveTitle.classList.remove('_active');
//       _slideUp(spollerActiveTitle.nextElementSibling, 500);
//     }
//   }
// }

// let _slideUp = (target, duration = 500) => {
//   if (!target.classList.contains('_slide')) {
//     target.classList.add('_slide');
//     target.style.transitionProperty = 'height, margin, padding';
//     target.style.transitionDuration = duration + 'ms';
//     target.style.height = target.offsetHeight + 'px';
//     target.offsetHeight;
//     target.style.overflow = 'hidden';
//     target.style.height = 0;
//     target.style.paddingTop = 0;
//     target.style.paddingBottom = 0;
//     target.style.marginTop = 0;
//     target.style.marginBottom = 0;

//     window.setTimeout(() => {
//       target.hidden = true;
//       target.style.removeProperty('height');
//       target.style.removeProperty('padding-top');
//       target.style.removeProperty('padding-bottom');
//       target.style.removeProperty('margin-top');
//       target.style.removeProperty('margin-bottom');
//       target.style.removeProperty('overflow');
//       target.style.removeProperty('transition-duration');
//       target.style.removeProperty('transition-property');
//       target.classList.remove('_slide');
//     }, duration);
//   }
// };

// let _slideDown = (target, duration = 500) => {
//   if (!target.classList.contains('_slide')) {
//     target.classList.add('_slide');
//     if (target.hidden) {
//       target.hidden = false;
//     }
//     let height = target.offsetHeight;
//     target.style.overflow = 'hidden';
//     target.style.height = 0;
//     target.style.paddingTop = 0;
//     target.style.paddingBottom = 0;
//     target.style.marginTop = 0;
//     target.style.marginBottom = 0;
//     target.offsetHeight;
//     target.style.transitionProperty = 'height, margin, padding';
//     target.style.transitionDuration = duration + 'ms';
//     target.style.height = height + 'px';
//     target.style.removeProperty('padding-top');
//     target.style.removeProperty('padding-bottom');
//     target.style.removeProperty('margin-top');
//     target.style.removeProperty('margin-bottom');

//     window.setTimeout(() => {
//       target.style.removeProperty('height');
//       target.style.removeProperty('overflow');
//       target.style.removeProperty('transition-duration');
//       target.style.removeProperty('transition-property');
//       target.classList.remove('_slide');
//     }, duration);
//   }
// };

// let _slideToggle = (target, duration = 500) => {
//   if (target.hidden) {
//     return _slideDown(target, duration);
//   } else {
//     return _slideUp(target, duration);
//   }
// };

// ?????? ???????????????? ?????????????? data-spollers
// ?????? ?????????????????? ???????????????? ?????????????? data-spoller
// ??????????: data-spollers="992,max (or min)"

// ???????? ?????????? ???????????????????? ???????????? ???????? ?????????????? ?? ?????????? - ?????????????????? ?????????????? data-one-spoller

// ?????? ???????????????? ?????????????????????? ?????????? _init:
// ?????? ?????????????????? ?????????????????????? ?????????? _active

//popup
// for popup link add class popup-link
// for popup close icon add class close-popup
// add lock-padding class to fixed objects

// popup will close if click anywhere but not on content
// if we use image add -> vertical align top

// Popup will have class 'open'
// const popupLinks = document.querySelectorAll('.popup-link');
// const body = document.querySelector('body');
// const lockPadding = document.querySelectorAll('.lock-padding');

// let unlock = true;
// const timeout = 800; //also like transition animation in styles (For non multi-click on popup button)

// if (popupLinks.length > 0) {
//   for (let index = 0; index < popupLinks.length; index++) {
//     const popupLink = popupLinks[index];

//     popupLink.addEventListener('click', function (e) {
//       const popupName = popupLink.getAttribute('href').replace('#', '');
//       const curentPopup = document.getElementById(popupName);

//       popupOpen(curentPopup);
//       e.preventDefault();
//     });
//   }
// }

// const popupCloseIcon = document.querySelectorAll('.close-popup');
// if (popupCloseIcon.length > 0) {
//   for (let index = 0; index < popupCloseIcon.length; index++) {
//     const el = popupCloseIcon[index];
//     el.addEventListener('click', function (e) {
//       popupClose(el.closest('.popup'));
//       e.preventDefault();
//     });
//   }
// }

// function popupOpen(curentPopup) {
//   if (curentPopup && unlock) {
//     const popupActive = document.querySelector('.popup.open');
//     if (popupActive) {
//       popupClose(popupActive, false);
//     } else {
//       bodyLock();
//     }
//     curentPopup.classList.add('open');
//     curentPopup.addEventListener('click', function (e) {
//       if (!e.target.closest('.popup__content')) {
//         popupClose(e.target.closest('.popup'));
//       }
//     });
//   }
// }

// function popupClose(popupActive, doUnlock = true) {
//   if (unlock) {
//     popupActive.classList.remove('open');
//     if (doUnlock) {
//       bodyUnlock();
//     }
//   }
// }

// function bodyLock() {
//   const lockPaddingValue =
//     window.innerWidth - document.querySelector('.wrapper').offsetWidth + 'px';

//   if (lockPadding.length > 0) {
//     for (let index = 0; index < lockPadding.length; index++) {
//       const el = lockPadding[index];
//       el.style.paddingRight = lockPaddingValue;
//     }
//   }

//   body.style.paddingRight = lockPaddingValue;
//   body.classList.add('lock');

//   unlock = false;
//   setTimeout(function () {
//     unlock = true;
//   }, timeout);
// }

// function bodyUnlock() {
//   setTimeout(function () {
//     if (lockPadding.length > 0) {
//       for (let index = 0; index < lockPadding.length; index++) {
//         const el = lockPadding[index];
//         el.style.paddingRight = '0px';
//       }
//     }

//     body.style.paddingRight = '0px';
//     body.classList.remove('lock');
//   }, timeout);

//   unlock = false;
//   setTimeout(function () {
//     unlock = true;
//   }, timeout);
// }

// document.addEventListener('keydown', function (e) {
//   if (e.which === 27) {
//     const popupActive = document.querySelector('.popup.open');
//     popupClose(popupActive);
//   }
// });

// Animation to show elements

//class for all animated items: _anim-items
//If you need to delay the animation, you can set the delay in css or with setTimeout
// For animated item will add class _active
// _anim-no-hide if emelemt have this class, element won't won't fade for animation
// const animItems = document.querySelectorAll('._anim-items');

// if (animItems.length > 0) {
//   window.addEventListener('scroll', animOnScroll);

//   function animOnScroll() {
//     for (let index = 0; index < animItems.length; index++) {
//       const animItem = animItems[index];
//       const animItemHeight = animItem.offsetHeight;
//       const animItemOffset = offset(animItem).top;
//       const animStart = 4;

//       let animItemPoint = window.innerHeight - animItemHeight / animStart;

//       if (animItemHeight > window.innerHeight) {
//         animItemPoint = window.innerHeight - animItemHeight / animStart;
//       }

//       if (
//         pageYOffset > animItemOffset - animItemPoint &&
//         pageYOffset < animItemOffset + animItemHeight
//       ) {
//         animItem.classList.add('_active');
//       } else {
//         if (!animItem.classList.contains('_anim-no-hide')) {
//           animItem.classList.remove('_active');
//         }
//       }
//     }
//   }

//   function offset(el) {
//     const rect = el.getBoundingClientRect(),
//       scrollLeft = window.pageXOffset || document.documentElement.scrollLeft,
//       scrollTop = window.pageYOffset || document.documentElement.scrollTop;
//     return { top: rect.top + scrollTop, left: rect.left + scrollLeft };
//   }

//   //Right now animation start type:
//   // animOnScroll();

//   //Delay start animation type:
//   setTimeout(() => {
//     animOnScroll();
//   }, 1000);
// }

//slider things
const pageSlider = new Swiper('.main', {
  wrapperClass: 'main__wrapper',
  slideClass: 'screen',

  direction: 'vertical',
  slidesPerView: 'auto',
  parallax: true,

  keyboard: {
    enabled: true,
    onlyInViewport: true,
    pageUpDown: true,
  },
  mousewheel: {
    sensitivity: 1,
  },

  watchOverflow: true,

  speed: 1800,
  observer: true,
  observeParents: true,
  observeSlideChildren: true,

  pagination: {
    el: '.pagination',
    type: 'progressbar',
  },
});

window.addEventListener('resize', () => {
  if (window.innerHeight <= 460) {
    pageSlider.params.freeMode.enabled = true;
  } else {
    pageSlider.params.freeMode.enabled = false;
  }
});

const benefitsSlider = new Swiper('.benefits__slider', {
  speed: 1800,

  autoplay: {
    delay: 7000,
  },

  navigation: {
    nextEl: '.benefits__next',
    prevEl: '.benefits__prev',
  },
  breakpoints: {
    320: {
      spaceBetween: 10,
      slidesPerView: '1',
    },

    480: {
      spaceBetween: 10,
      slidesPerView: '2',
    },
    768: {
      spaceBetween: 10,
      slidesPerView: '3',
    },
    1024: {
      spaceBetween: 16,
      slidesPerView: '4',
    },
    1200: {
      spaceBetween: 30,
      slidesPerView: '4',
    },
  },
});

const teamSlider = new Swiper('.team__slider', {
  speed: 1800,

  initialSlide: 2,

  breakpoints: {
    320: {
      slidesPerView: '1',
      spaceBetween: 10,
    },
    481: {
      slidesPerView: '2',
      spaceBetween: 10,
    },
    768: {
      slidesPerView: '3',
      spaceBetween: 20,
    },
  },
});
