// HEADER

// Переменные для выделения .header__navigation-item при наведении

const $headerCataloglist = document.querySelectorAll('.header__level-3 .header__navigation-item');
const $headerCatalogDropDownLists = document.querySelectorAll('.header__level-3-drop-down-list');
const $headerCatalogTitles = document.querySelectorAll('.header__catalog-title');

let buttonDropDownListMouseoverListeners = [];
let buttonDropDownListMouseoutListeners = [];
let dropDownListMouseoverListeners = [];
let dropDownListMouseoutListeners = [];

// Переменные и классы для адоптива размеров, меньше 768px

const $contentInHeaderLevel1 = document.querySelector('.header__level-1 .content');
const $headerAbout = $contentInHeaderLevel1.querySelector('.header__about');
let $headerAboutItems = $headerAbout.querySelectorAll('.header__about-item');
const $headerBurgerMenu = $contentInHeaderLevel1.querySelector('.header__burger-menu');
const $headerPersonalArea = $contentInHeaderLevel1.querySelector('.header__personal-area');
const $headerLevel2RightSide = document.querySelector('.header__level-2-right-side');
const $headerLevel2RightSideContainer = $headerLevel2RightSide.querySelector('.header__level-2-right-side-container');
const $headerCity = $headerLevel2RightSideContainer.querySelector('.header__city');
const $headerBurgerMenuCatalog = $headerBurgerMenu.querySelector('.header__burger-menu-catalog');
const $headerBurgerNavigationList = $headerBurgerMenuCatalog.querySelector('.header__burger-menu-catalog .header__havigation-list');
const $headerBurgerCatalogItems = $headerBurgerNavigationList.querySelectorAll('.header__navigation-item');
const $headerBurgerButton = document.querySelector('.header__burger-button');
const $headerCallIcon = $headerLevel2RightSide.querySelector('.header__call-icon');
const $headerCallBody = $headerLevel2RightSide.querySelector('.header__call-body');

$headerAboutItems =  [$headerBurgerMenuCatalog, ...$headerAboutItems];

let hideCallBody;
let switchCallBody;
let hideBurgerMenuForButtonGoBack;

let documentElementListeners = [];
let buttonElementListeners = [];

class Listener {
    constructor($target, func, event) {
        this.$target = $target;
        this.func = func;
        this.event = event;
    }

    addListener() {
        this.$target.addEventListener(this.event, this.func);
    }

    removeListener() {
        this.$target.removeEventListener(this.event, this.func);
    }
}

//Выделение .header__navigation-item при наведении

function showDropDownList($button, $dropDownList, $mainItem) {
    let downListStatus = '';

    window.addEventListener('resize', dropDownListOnClickButton = () => {
        if (document.documentElement.clientWidth > 768) {
            if  (downListStatus !== 'more') {

                buttonDropDownListMouseoverListeners.push(new Listener($button, () => {
                    $dropDownList.classList.add('_shown');
                    for (let $item of $headerCataloglist) {
                        if ($item.classList.contains('_active')) {
                            $item.classList.remove('_active');
                        }
                    }
                }, 'mouseover'));
                buttonDropDownListMouseoverListeners[buttonDropDownListMouseoverListeners.length - 1].addListener();
                            
                buttonDropDownListMouseoutListeners.push(new Listener($button, () => {
                    $dropDownList.classList.remove('_shown');

                    $mainItem.classList.add('_active');
                }, 'mouseout'));
                buttonDropDownListMouseoutListeners[buttonDropDownListMouseoutListeners.length - 1].addListener();
                
                dropDownListMouseoverListeners.push(new Listener($dropDownList, () => {
                    $dropDownList.classList.add('_shown');

                    for (let $item of $headerCataloglist) {
                        if ($item.classList.contains('_active')) {
                            $item.classList.remove('_active');
                        }
                    }

                    for (let i = 0; i < $headerCatalogDropDownLists.length; i++) {
                        if ($dropDownList === $headerCatalogDropDownLists[i]) {
                            $headerCataloglist[i].classList.add('_active')
                        }
                    }
                }, 'mouseover'));
                dropDownListMouseoverListeners[dropDownListMouseoverListeners.length - 1].addListener();

                dropDownListMouseoutListeners.push(new Listener($dropDownList, () => {
                    $dropDownList.classList.remove('_shown');

                    for (let $item of $headerCataloglist) {
                        if ($item.classList.contains('_active')) {
                            $item.classList.remove('_active');
                        }
                    }

                    $mainItem.classList.add('_active');
                }, 'mouseout'));
                dropDownListMouseoutListeners[dropDownListMouseoutListeners.length - 1].addListener();

                downListStatus = 'more';
            }
        } else if (downListStatus === 'more') {
            buttonDropDownListMouseoverListeners[buttonDropDownListMouseoverListeners.length - 1].removeListener();
            buttonDropDownListMouseoverListeners.pop();
            
            buttonDropDownListMouseoutListeners[buttonDropDownListMouseoutListeners.length - 1].removeListener();
            buttonDropDownListMouseoutListeners.pop();

            dropDownListMouseoverListeners[dropDownListMouseoverListeners.length - 1].removeListener();
            dropDownListMouseoverListeners.pop();
            
            dropDownListMouseoutListeners[dropDownListMouseoutListeners.length - 1].removeListener();
            dropDownListMouseoutListeners.pop();

            downListStatus = 'less';
        }
    });
}

marginCorrectionForCatalogTitle()
window.addEventListener('resize', marginCorrectionForCatalogTitle)

function marginCorrectionForCatalogTitle() {
    for ($title of $headerCatalogTitles) {
        $title.style.marginBottom = `${76 - $title.clientHeight}px`;
    }
}

// Адоптив размеров, меньше 768px

$headerBurgerMenu.style.height = `${document.documentElement.scrollHeight - 160}px`

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

    $headerBurgerMenu.append($headerAbout);

    $headerLevel2RightSide.prepend($headerPersonalArea);

    $headerLevel2RightSideContainer.append($headerCity);
    $contentInHeaderLevel1.prepend($headerLevel2RightSideContainer);

    activateMenu($headerBurgerButton, $headerBurgerMenu, $headerAboutItems);
    activateMenu($headerBurgerMenuCatalog, $headerBurgerNavigationList, $headerBurgerCatalogItems);
    for (let $item of $headerBurgerCatalogItems) {
        activateMenu($item, $item.querySelector('.header__bugrer-last-list'), $item.querySelectorAll('.header__bugrer-last-item'));
    }

    $headerBurgerNavigationList.classList.add('_header_buger-navigation-menu');

    $headerCallIcon.addEventListener('click', switchCallBody = () => {
        $headerCallBody.classList.toggle('_shown');
    });

    hideCallBody = (event) => {
        if ((!event.target.closest('.header__call-body')) && (!event.target.classList.contains('header__call-icon'))) {
            $headerCallBody.classList.remove('_shown');
        }
    }

    document.documentElement.addEventListener('click', hideCallBody);
}

function activateMenu($button, $menu, $items) {
    $menu.classList.add('_header_buger-navigation-menu');

    let headerBurgerGoBack = document.createElement('button');
    headerBurgerGoBack.setAttribute('type', 'button');
    headerBurgerGoBack.classList.add('_header_buger-menu-item', 'header__burger-go-back');
    headerBurgerGoBack.textContent = 'Назад';
    $menu.prepend(headerBurgerGoBack)

    let rigthArrow = document.createElement('div');
    rigthArrow.classList.add('right-arrow');

    if (!$button.closest('.header__burger-button')) {
        $menu.before(rigthArrow);
    }

    for (let $item of $items) {
        $item.classList.add('_header_buger-menu-item');
    }

    buttonElementListeners.push(new Listener($button, (event) => {
        if (event.target.closest('.header__burger-button')) {
            $menu.classList.toggle('_shown');
        } else {
            if (!$menu.classList.contains('_shown')) {
                if (!event.target.closest('.header__burger-go-back')) {
                    $menu.classList.add('_shown');
                }
            }
        }        
    }, 'click'));
    buttonElementListeners[buttonElementListeners.length - 1].addListener();

    documentElementListeners.push(new Listener(document.documentElement, (event) => {
        if (!event.target.closest('.header__burger')) {
            $menu.classList.remove('_shown');
        }

        if (!$button.classList.contains('header__burger-button')) {
            if (event.target.classList.contains('header__burger-button')) {
                $menu.classList.remove('_shown');
            }
        }
    }, 'click'));
    documentElementListeners[documentElementListeners.length - 1].addListener();

    $menu.firstElementChild.addEventListener('click', hideBurgerMenuForButtonGoBack = () => {
        $menu.classList.remove('_shown');
    });
}

function adoptiveMoreThan768() {
    document.documentElement.removeEventListener('click', hideCallBody);

    $headerCallIcon.removeEventListener('click', switchCallBody);

    $headerBurgerNavigationList.classList.remove('_header_buger-navigation-menu');

    disableMenu($headerBurgerButton, $headerBurgerMenu, $headerAboutItems);
    disableMenu($headerBurgerMenuCatalog, $headerBurgerNavigationList, $headerBurgerCatalogItems);
    for (let $item of $headerBurgerCatalogItems) {
        disableMenu($item, $item.querySelector('.header__bugrer-last-list'), $item.querySelectorAll('.header__bugrer-last-item'));
    }

    $headerLevel2RightSide.prepend($headerLevel2RightSideContainer);
    $headerLevel2RightSideContainer.prepend($headerCity);

    $contentInHeaderLevel1.prepend($headerAbout);
    $headerAbout.after($headerPersonalArea);
}

function disableMenu($button, $menu, $items) {
    $menu.firstElementChild.removeEventListener('click', hideBurgerMenuForButtonGoBack);

    buttonElementListeners[buttonElementListeners.length - 1].removeListener();
    buttonElementListeners.pop();

    documentElementListeners[documentElementListeners.length - 1].removeListener();
    documentElementListeners.pop();

    for (let $item of $items) {
        $item.classList.remove('_header_buger-menu-item');
    }

    if (!$button.closest('.header__burger-button')) {
        $menu.previousElementSibling.remove();
    }

    $menu.firstElementChild.remove();

    $menu.classList.remove('_header_buger-navigation-menu');
}