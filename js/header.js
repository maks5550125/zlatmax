const $headerCataloglist = document.querySelectorAll('.header__navigation-item');

const $headerCatalogDropDownLists = document.querySelectorAll('.header__level-3-drop-down-list');

const $headerCatalogTitles = document.querySelectorAll('.header__catalog-title');

function showDropDownList($button, $dropDownList, $mainItem) {
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
}

marginCorrectionForCatalogTitle()
window.addEventListener('resize', marginCorrectionForCatalogTitle)

function marginCorrectionForCatalogTitle() {
    for ($title of $headerCatalogTitles) {
        $title.style.marginBottom = `${76 - $title.clientHeight}px`

        console.log($title.style.marginBottom)
    }
}


