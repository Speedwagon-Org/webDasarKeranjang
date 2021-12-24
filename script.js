let shops = []
let count = 1
let totalPrices = document.getElementById('total-price');
let totalInCart = document.getElementById('total-item-in-cart');
for (let i = 1; i <= 5; i++) {
    shops.push({
        shopName: document.getElementById('shop-name-' + String(i)).innerHTML,
        shopCheck: document.getElementById('select-all-item-in-shop-' + String(i)),
        shopItems: [],
        shopAvailable: true,
        shopVisibility: document.getElementById('shop-' + String(i)).style
    });
    for (let j = 1; j <= 2; j++) {
        shops[i - 1].shopItems.push({
            itemName: document.getElementById('item-title-' + String(count)).innerHTML,
            itemPrice: Number(document.getElementById('item-price-' + String(count)).innerHTML),
            itemChecked: document.getElementById('item-' + String(count) + '-check'),
            itemDeleted: false,
            itemVisibility: document.getElementById('item-' + String(count)).style
        });
        count += 1;
        totalInCart.innerHTML = String(Number(totalInCart.innerHTML) + 1)
    }
}

function deleteItem(itemDeleted = 0) {
    let tmp = 0
    for (let i = 0; i < shops.length; i++) {
        for (let j = 0; j < shops[i].shopItems.length; j++) {
            if (tmp + 1 == itemDeleted) {
                shops[i].shopItems[j].itemDeleted = true;
                shops[i].shopItems[j].itemVisibility.display = 'none';
                shops[i].shopItems[j].itemChecked.checked = false;
            }
            tmp++;
        }
    }

    for (let i = 0; i < shops.length; i++) {
        let countDeletedItem = 0
        for (let j = 0; j < shops[i].shopItems.length; j++) {
            if (shops[i].shopItems[j].itemDeleted == true) {
                countDeletedItem++;
            }
        }
        if (countDeletedItem == 2) {
            shops[i].shopVisibility.display = 'none';
        }
    }
    totalInCart.innerHTML = String(Number(totalInCart.innerHTML) - 1)
    selectItem()
}

function selectItem(selectedItem = "Other") // Memilih Item
{
    let listItemSelected = document.getElementById('list-of-selected-item');
    listItemSelected.innerHTML = "";
    let allItem = document.getElementById('All-Item-In-All-Shop').checked;
    let total = 0;
    // Check and Unchecked Handler
    if (allItem == true && selectedItem == 'AllItem') {
        for (let i = 0; i < shops.length; i++) {
            for (let j = 0; j < shops[i].shopItems.length; j++) {
                shops[i].shopCheck.checked = true;
                if (shops[i].shopItems[j].itemDeleted == false) {
                    shops[i].shopItems[j].itemChecked.checked = true;
                }
            }
        }
    } else if (allItem == false && selectedItem == 'AllItem') {
        for (let i = 0; i < shops.length; i++) {
            for (let j = 0; j < shops[i].shopItems.length; j++) {
                shops[i].shopCheck.checked = false;
                shops[i].shopItems[j].itemChecked.checked = false;
            }
        }
    } else if (selectedItem == 'Shops') {
        for (let i = 0; i < shops.length; i++) {
            if (shops[i].shopCheck.checked == true && shops[i].shopAvailable == true) {
                for (let j = 0; j < shops[i].shopItems.length; j++) {
                    if (shops[i].shopItems[j].itemDeleted == false) {
                        shops[i].shopItems[j].itemChecked.checked = true;
                    }
                }
            } else if (shops[i].shopCheck.checked == false && shops[i].shopAvailable == true){
                for (let j = 0; j < shops[i].shopItems.length; j++) {
                    if (shops[i].shopItems[j].itemDeleted == false) {
                        shops[i].shopItems[j].itemChecked.checked = false;
                    }
                }
            }
            break;
        }
    }

    // Count Any Checked or Uncheked Item in Cart
    for (let i = 0; i < shops.length; i++) {
        for (let j = 0; j < shops[i].shopItems.length; j++) {
            if (shops[i].shopItems[j].itemDeleted == false && shops[i].shopItems[j].itemChecked.checked == true) {
                total += shops[i].shopItems[j].itemPrice;

                // Create Detail Checkout List
                let li = document.createElement('li');
                li.appendChild(document.createTextNode(String(shops[i].shopItems[j].itemName) + " - " + String(shops[i].shopItems[j].itemPrice)));
                listItemSelected.appendChild(li);
            }
        }
    }
    totalPrices.innerHTML = String(total)
    if (total > 0) {
        document.getElementById('checkout-button').classList.remove('btn-secondary');
        document.getElementById('checkout-button').classList.add('btn-primary');
    } else {
        document.getElementById('checkout-button').classList.remove('btn-primary');
        document.getElementById('checkout-button').classList.add('btn-secondary');
    }
}

function changeButton() // Fungsi Mengubah Tombol ketika Total Harga lebih dari 0
{
    let checkoutButton = document.getElementById('checkout-button');
    if (Number(totalPrices.innerHTML) > 0) {
        checkoutButton.classList.add('btn-primary');
        checkoutButton.classList.remove('btn-secondary');
    } else {
        checkoutButton.classList.remove('btn-primary');
        checkoutButton.classList.add('btn-secondary');
    }
}

function restartPage() {
    window.location.reload()
}