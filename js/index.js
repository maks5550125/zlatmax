// HEADER

//Выделение .header__navigation-item при наведении и адоптив

const $headerCataloglist = document.querySelectorAll('.header__level-3 .header__navigation-item');
const $headerCatalogDropDownLists = document.querySelectorAll('.header__level-3-drop-down-list');
const $headerCatalogTitles = document.querySelectorAll('.header__catalog-title');

class Listener {
    constructor($target, func, event) {
        this.#$target = $target;
        this.#func = func;
        this.#event = event;
    }

    #$target;
    #func;
    #event;

    addListener() {
        this.#$target.addEventListener(this.#event, this.#func);
    }

    removeListener() {
        this.#$target.removeEventListener(this.#event, this.#func);
    }
}

class Listeners {
    constructor() {
        this.#listeners = [];
    }

    #listeners;

    addNewListener($target, func, event) {
        this.#listeners.push(new Listener($target, func, event));
        this.#listeners.at(-1).addListener();
    }

    removeNewListener() {
        this.#listeners.at(-1).removeListener();
        this.#listeners.pop();
    }
}

let buttonDropDownListMouseoverListeners = new Listeners();
let buttonDropDownListMouseoutListeners = new Listeners();
let dropDownListMouseoverListeners = new Listeners();
let dropDownListMouseoutListeners = new Listeners();
let dropDownListResizeListeners = new Listeners();

function activationDropDownList($button, $dropDownList, $mainItem) {
    let downListStatus = 'less';

    if (document.documentElement.clientWidth > 768) {
        showDropDownList($button, $dropDownList, $mainItem);

        dropDownListResizeListeners.addNewListener(window, () => {
            if (document.documentElement.clientWidth <= 768) {
                hideDropDownList($button, $dropDownList, $mainItem);

                dropDownListResizeListeners.removeNewListener();
            }
        }, 'resize');
    }

    window.addEventListener('resize', dropDownListOnClickButton = () => {
        if (document.documentElement.clientWidth > 768) {
            if  (downListStatus !== 'more') {

                showDropDownList($button, $dropDownList, $mainItem);
                
                downListStatus = 'more';
            }
        } else if (downListStatus === 'more') {
            hideDropDownList($button, $dropDownList, $mainItem);

            downListStatus = 'less';
        }
    });
}

function showDropDownList($button, $dropDownList, $mainItem) {
    buttonDropDownListMouseoverListeners.addNewListener($button, () => {
        $dropDownList.classList.add('_shown');

        addClassActive($headerCataloglist);
    }, 'mouseover');
                
    buttonDropDownListMouseoutListeners.addNewListener($button, () => {
        $dropDownList.classList.remove('_shown');

        $mainItem.classList.add('_active');
    }, 'mouseout');
    
    dropDownListMouseoverListeners.addNewListener($dropDownList, () => {
        $dropDownList.classList.add('_shown');

        addClassActive($headerCataloglist);

        for (let i = 0; i < $headerCatalogDropDownLists.length; i++) {
            if ($dropDownList === $headerCatalogDropDownLists[i]) {
                $headerCataloglist[i].classList.add('_active')
            }
        }
    }, 'mouseover');

    dropDownListMouseoutListeners.addNewListener($dropDownList, () => {
        $dropDownList.classList.remove('_shown');

        addClassActive($headerCataloglist);

        $mainItem.classList.add('_active');
    }, 'mouseout');
}

function addClassActive($list) {
    $list.forEach($item => {
        if ($item.classList.contains('_active')) {
            $item.classList.remove('_active');
        }
    });
}

function hideDropDownList($button, $dropDownList, $mainItem) {
    buttonDropDownListMouseoverListeners.removeNewListener();
            
    buttonDropDownListMouseoutListeners.removeNewListener();

    dropDownListMouseoverListeners.removeNewListener();
    
    dropDownListMouseoutListeners.removeNewListener();
}

marginCorrectionForCatalogTitle()
window.addEventListener('resize', marginCorrectionForCatalogTitle)

function marginCorrectionForCatalogTitle() {
    $headerCatalogTitles.forEach($title => {
        $title.style.marginBottom = `${76 - $title.clientHeight}px`;
    })
}

// Создание всплывающего окна для headerCallBody

const $headerCallIcon = document.querySelector('.header__call-icon');
const $headerCallBody = document.querySelector('.header__call-body');

let headerCallStatus;

let hideCallBody;
let switchCallBody;

callBodyActivationByButton();
window.addEventListener('resize', callBodyActivationByButton);

function callBodyActivationByButton() {
    if (document.documentElement.clientWidth <= 910) {
        if (headerCallStatus !== 'less') {
            $headerCallIcon.addEventListener('click', switchCallBody = () => {
                $headerCallBody.classList.toggle('_shown');
            });
        
            document.documentElement.addEventListener('click', hideCallBody = (event) => {
                if ((!event.target.closest('.header__call-body')) && (!event.target.classList.contains('header__call-icon'))) {
                    $headerCallBody.classList.remove('_shown');
                }
            });

            headerCallStatus = 'less';
        }
    } else {
        if (headerCallStatus === 'less') {
            document.documentElement.removeEventListener('click', hideCallBody);

            $headerCallIcon.removeEventListener('click', switchCallBody);

            headerCallStatus = 'more';
        }
    }
}

// Адоптив размеров, меньше 768px

const $body = document.querySelector('body');
const $contentInHeaderLevel1 = document.querySelector('.header__level-1 .content');
const $headerAbout = $contentInHeaderLevel1.querySelector('.header__about');
let $headerAboutItems = $headerAbout.querySelectorAll('.header__about-item');
const $headerBurgerMenu = $contentInHeaderLevel1.querySelector('.header__burger-menu');
const $headerBurgerAbout = $headerBurgerMenu.querySelector('.header__burger-about');
const $headerBurgerLastLists = $headerBurgerMenu.querySelectorAll('.header__bugrer-last-list');
const $headerPersonalArea = $contentInHeaderLevel1.querySelector('.header__personal-area');
const $headerLevel2RightSide = document.querySelector('.header__level-2-right-side');
const $headerLevel2RightSideContainer = $headerLevel2RightSide.querySelector('.header__level-2-right-side-container');
const $headerCity = $headerLevel2RightSideContainer.querySelector('.header__city');
const $headerBurgerMenuCatalog = $headerBurgerMenu.querySelector('.header__burger-menu-catalog');
const $headerBurgerNavigationList = $headerBurgerMenu.querySelector('.header__navigation-list');
const $headerBurgerCatalogItems = $headerBurgerNavigationList.querySelectorAll('.header__navigation-item');
const $headerBurgerButton = document.querySelector('.header__burger-button');

$headerAboutItems =  [$headerBurgerMenuCatalog, ...$headerAboutItems];

let hideBurgerMenuForButtonGoBack;

let documentElementListeners = new Listeners();
let buttonElementListeners = new Listeners();

if (document.documentElement.clientWidth <= 768) {
    adoptiveLessThan768();
}

window.addEventListener('resize', () => {
    if (document.documentElement.clientWidth <= 768) {
        if ($headerPersonalArea.closest('.header__level-1')) {
            adoptiveLessThan768();
        }
    } else if ($headerPersonalArea.closest('.header__level-2-right-side')) {
        adoptiveMoreThan768();
    }
})

function adoptiveLessThan768() {
    for (let i = 1; i < $headerAboutItems.length; i++) {
        $headerAbout.prepend($headerAboutItems[i]);
    }

    $headerBurgerAbout.append($headerAbout);

    $headerLevel2RightSide.prepend($headerPersonalArea);

    $headerLevel2RightSideContainer.append($headerCity);
    $contentInHeaderLevel1.prepend($headerLevel2RightSideContainer);

    activateMenu($headerBurgerButton, $headerBurgerAbout, $headerAboutItems);
    activateMenu($headerBurgerMenuCatalog, $headerBurgerNavigationList, $headerBurgerCatalogItems, $headerBurgerMenu);
    for (let i = 0; i < $headerBurgerCatalogItems.length; i++) {
        activateMenu($headerBurgerCatalogItems[i], $headerBurgerLastLists[i], $headerBurgerLastLists[i].querySelectorAll('.header__bugrer-last-item'), $headerBurgerNavigationList);
    }

    $headerBurgerNavigationList.classList.add('_header_buger-navigation-menu');
    setTimeout(() => $headerBurgerNavigationList.style.transitionDuration = '300ms', 700);
}

function activateMenu($button, $menu, $items) {
    $menu.classList.add('_header_buger-navigation-menu');
    setTimeout(() => $menu.style.transitionDuration = '300ms', 700);
    $menu.style.height = `${document.documentElement.clientHeight - 160}px`;
    window.addEventListener('resize', () => {
        $menu.style.height = `${document.documentElement.clientHeight - 160}px`;
    });


    if (!$button.classList.contains('header__burger-button')) {
        let headerBurgerGoBack = document.createElement('button');
        headerBurgerGoBack.setAttribute('type', 'button');
        headerBurgerGoBack.classList.add('_header_buger-menu-item', 'header__burger-go-back');
        headerBurgerGoBack.textContent = 'Назад';
        $menu.prepend(headerBurgerGoBack);
    }

    let rigthArrow = document.createElement('div');
    rigthArrow.classList.add('right-arrow');

    if (!$button.closest('.header__burger-button')) {
        if (!$button.lastElementChild.classList.contains('right-arrow')) {
            $button.append(rigthArrow);
        }
    }

    $items.forEach($item => $item.classList.add('_header_buger-menu-item'));

    buttonElementListeners.addNewListener($button, (event) => {
        if (event.target.closest('.header__burger-button')) {
            if ($menu.classList.contains('_shown')) {
                $menu.classList.remove('_shown');

                if ($button.classList.contains('header__burger-button')) {
                    $body.classList.remove('_scroll-lock');
                }
            } else {
                $menu.classList.add('_shown');

                if ($button.classList.contains('header__burger-button')) {
                    $body.classList.add('_scroll-lock');
                }
            }
        } else {
            if (!$menu.classList.contains('_shown')) {
                if (!event.target.closest('.header__burger-go-back')) {
                    $menu.classList.add('_shown');

                    if ($button.classList.contains('header__burger-button')) {
                        $body.classList.add('_scroll-lock');
                    }
                }
            }
        }        
    }, 'click');

    documentElementListeners.addNewListener(document.documentElement, (event) => {
        if (!event.target.closest('.header__burger')) {
            $menu.classList.remove('_shown');

            if ($button.classList.contains('header__burger-button')) {
                $body.classList.remove('_scroll-lock');
            }
        }

        if (!$button.classList.contains('header__burger-button')) {
            if (event.target.classList.contains('header__burger-button')) {
                $menu.classList.remove('_shown');

                if ($button.classList.contains('header__burger-button')) {
                    $body.classList.remove('_scroll-lock');
                }
            }
        }
    }, 'click');

    if ($menu.querySelector('.header__burger-go-back')) {
        $menu.querySelector('.header__burger-go-back').addEventListener('click', hideBurgerMenuForButtonGoBack = () => {
            $menu.classList.remove('_shown');
        });
    }
}

function adoptiveMoreThan768() {
    $headerBurgerNavigationList.classList.remove('_header_buger-navigation-menu');
    $headerBurgerNavigationList.style.transitionDuration = '0ms';

    disableMenu($headerBurgerButton, $headerBurgerAbout, $headerAboutItems);
    disableMenu($headerBurgerMenuCatalog, $headerBurgerNavigationList, $headerBurgerCatalogItems);
    for (let i = 0; i < $headerBurgerCatalogItems.length; i++) {
        disableMenu($headerBurgerCatalogItems[i], $headerBurgerLastLists[i], $headerBurgerLastLists[i].querySelectorAll('.header__bugrer-last-item'));
    }

    $headerLevel2RightSide.prepend($headerLevel2RightSideContainer);
    $headerLevel2RightSideContainer.prepend($headerCity);

    $contentInHeaderLevel1.prepend($headerAbout);
    $headerAbout.after($headerPersonalArea);
}

function disableMenu($button, $menu, $items) {
    if ($menu.querySelector('.header__burger-go-back')) {
        $menu.querySelector('.header__burger-go-back').removeEventListener('click', hideBurgerMenuForButtonGoBack);
    }

    buttonElementListeners.removeNewListener();

    documentElementListeners.removeNewListener();

    $items.forEach($item => $item.classList.remove('_header_buger-menu-item'));

    if (!$button.closest('.header__burger-button')) {
        $button.lastElementChild.remove();
    }
    if ($menu.querySelector('.header__burger-go-back')) {
        $menu.querySelector('.header__burger-go-back').remove();
    }

    $menu.classList.remove('_header_buger-navigation-menu');
    $menu.style.transitionDuration = '0ms';
}
