$headerCataloglist[0].classList.add('_active');

for (let i = 0; i < $headerCataloglist.length; i++) {
    showDropDownList($headerCataloglist[i], $headerCatalogDropDownLists[i], $headerCataloglist[0]);
}