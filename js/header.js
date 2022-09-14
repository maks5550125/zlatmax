// HEADER

// Переменные для выделения .header__navigation-item при наведении

const $headerCataloglist = document.querySelectorAll('header__level-3 .header__navigation-item');
const $headerCatalogDropDownLists = document.querySelectorAll('.header__level-3-drop-down-list');
const $headerCatalogTitles = document.querySelectorAll('.header__catalog-title');

// Переменные для адоптива размеров, меньше 768px

const $contentInHeaderLevel1 = document.querySelector('.header__level-1 .content')
const $headerAbout = $contentInHeaderLevel1.querySelector('.header__about');
let $headerAboutItems = $headerAbout.querySelectorAll('.header__about-item');
const $headerBurgerMenu = $contentInHeaderLevel1.querySelector('.header__burger-menu');
const $headerPersonalArea = $contentInHeaderLevel1.querySelector('.header__personal-area');
const $headerLevel2RightSide = document.querySelector('.header__level-2-right-side');
const $headerLevel2RightSideContainer = $headerLevel2RightSide.querySelector('.header__level-2-right-side-container');
const $headerCity = $headerLevel2RightSideContainer.querySelector('.header__city');
const $headerBurgerMenuCatalog = $headerBurgerMenu.querySelector('.header__burger-menu-catalog');
const $headerHeaderBurgerNavigationList = $headerBurgerMenuCatalog.querySelector('.header__burger-menu-catalog .header__havigation-list');
const $headerBurgerCatalogItems = $headerHeaderBurgerNavigationList.querySelectorAll('.header__navigation-item');
const $headerBurgerButton = document.querySelector('.header__burger-button');
const $headerCallIcon = $headerLevel2RightSide.querySelector('.header__call-icon');
const $headerCallBody = $headerLevel2RightSide.querySelector('.header__call-body');

$headerAboutItems =  [$headerBurgerMenuCatalog, ...$headerAboutItems];

//Выделение .header__navigation-item при наведении

function showDropDownList($button, $dropDownList, $mainItem) {
    window.addEventListener('resize', () => {
        if (document.documentElement <= 768) {
            $button.addEventListener('mouseover', () => {
                $dropDownList.classList.add('shown');
                for (let $item of $headerCataloglist) {
                    if ($item.classList.contains('_active')) {
                        $item.classList.remove('_active');
                    }
                }
            });
            
            $button.addEventListener('mouseout', () => {
                $dropDownList.classList.remove('shown');

                $mainItem.classList.add('_active');
            });
            
            $dropDownList.addEventListener('mouseover', () => {
                $dropDownList.classList.add('shown');

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
            });
            
            $dropDownList.addEventListener('mouseout', () => {
                $dropDownList.classList.remove('shown');

                for (let $item of $headerCataloglist) {
                    if ($item.classList.contains('_active')) {
                        $item.classList.remove('_active');
                    }
                }

                $mainItem.classList.add('_active');
            });
        } else {
            if (document.documentElement <= 768) {
                $button.removeEventListener('mouseover', () => {
                    $dropDownList.classList.add('shown');
                    for (let $item of $headerCataloglist) {
                        if ($item.classList.contains('_active')) {
                            $item.classList.remove('_active');
                        }
                    }
                });
                
                $button.removeEventListener('mouseout', () => {
                    $dropDownList.classList.remove('shown');

                    $mainItem.classList.add('_active');
                });
                
                $dropDownList.removeEventListener('mouseover', () => {
                    $dropDownList.classList.add('shown');

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
                });
                
                $dropDownList.removeEventListener('mouseout', () => {
                    $dropDownList.classList.remove('shown');

                    for (let $item of $headerCataloglist) {
                        if ($item.classList.contains('_active')) {
                            $item.classList.remove('_active');
                        }
                    }

                    $mainItem.classList.add('_active');
                });
            }
        }
    });
}

marginCorrectionForCatalogTitle()
window.addEventListener('resize', marginCorrectionForCatalogTitle)

function marginCorrectionForCatalogTitle() {
    for ($title of $headerCatalogTitles) {
        $title.style.marginBottom = `${76 - $title.clientHeight}px`
    }
}

// Адоптив размеров, меньше 768px

$headerBurgerMenu.style.height = `${document.documentElement.scrollHeight - 160}px`

adoptiveLessThan768()

function adoptiveLessThan768() {
    for (let i = 1; i < $headerAboutItems.length; i++) {
        $headerAbout.prepend($headerAboutItems[i]);
    }

    $headerBurgerMenu.append($headerAbout);

    $headerLevel2RightSide.prepend($headerPersonalArea);

    $headerLevel2RightSideContainer.append($headerCity);
    $contentInHeaderLevel1.prepend($headerLevel2RightSideContainer);

    activateMenu($headerBurgerButton, $headerBurgerMenu, $headerAboutItems);
    activateMenu($headerBurgerMenuCatalog, $headerHeaderBurgerNavigationList, $headerBurgerCatalogItems);

    $headerHeaderBurgerNavigationList.classList.add('_header_buger-navigation-menu');

    $headerCallIcon.addEventListener('click', () => {
        $headerCallBody.classList.toggle('_shown');
    });

    document.documentElement.addEventListener('click', (event) => {
        if ((!event.target.closest('.header__call-body')) && (!event.target.classList.contains('header__call-icon'))) {
            $headerCallBody.classList.remove('_shown');
        }
    });
}

function activateMenu($button, $menu, $items) {
    $menu.classList.add('_header_buger-navigation-menu');

    let rigthArrow = document.createElement('div');
    rigthArrow.classList.add('right-arrow');

    if (!$button.closest('.header__burger-button')) {
        $menu.before(rigthArrow);
    }

    for (let $item of $items) {
        $item.classList.add('_header_buger-menu-item');
    }

    $button.addEventListener('click', (event) => {
        console.log('test')
        if (event.target.closest('.header__burger-button')) {
            $menu.classList.toggle('_shown');
        } else {
            if (!$menu.classList.contains('_shown')) {
                $menu.classList.add('_shown');
            }
        }
    });

    document.documentElement.addEventListener('click', (event) => {
        console.log(!event.target.closest('.header__burger'))
        if (!event.target.closest('.header__burger')) {
            $menu.classList.remove('_shown');
        }
    })
}