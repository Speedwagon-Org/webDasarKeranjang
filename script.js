// Initialazation
let shops = []
let count = 1
let totalPrices = document.getElementById('total-price');
let totalInCart = document.getElementById('total-item-in-cart');

for (let i = 1; i <= 5; i++) {
    shops.push({
        shopID: i,
        shopName: document.getElementById('shop-name-' + String(i)).innerHTML,
        shopCheck: document.getElementById('select-all-item-in-shop-' + String(i)),
        shopItems: [],
        shopAvailable: true,
        shopVisibility: document.getElementById('shop-' + String(i)).style
    });
    for (let j = 1; j <= 2; j++) {
        shops[i - 1].shopItems.push({
            itemID : count-1,
            itemName: document.getElementById('item-title-' + String(count)).innerHTML,
            itemPrice: Number(document.getElementById('item-price-' + String(count)).innerHTML),
            itemChecked: document.getElementById('item-' + String(count) + '-check'),
            itemDeleted: false,
            itemVisibility: document.getElementById('item-' + String(count)).style,
            itemQuantity:  Number(document.getElementById('item-quantity-value-' + String(count)).value)
        });
        count += 1;
        totalInCart.innerHTML = String(Number(totalInCart.innerHTML) + 1)
    }
}

localStorage.setItem('Store Cart', JSON.stringify(shops))
selectItem()

// Add, Edit, Decrese quantity button
function addQuantity(item)
{
    for (let i = 0; i < 5; i++) {
        for (let j = 0; j < 2; j++) {
            if(shops[i].shopItems[j].itemID == item-1)
            {
                shops[i].shopItems[j].itemQuantity = Number(shops[i].shopItems[j].itemQuantity) + 1
                document.getElementById('item-quantity-value-' + String(item)).value =  String(shops[i].shopItems[j].itemQuantity)
            }
        }
    }
    localStorage.setItem('Store Cart', JSON.stringify(shops))
    selectItem()
}

function decQuantity(item)
{
    for (let i = 0; i < 5; i++) {
        for (let j = 0; j < 2; j++) {
            if(shops[i].shopItems[j].itemID == item-1)
            {
                if (shops[i].shopItems[j].itemQuantity > 1)
                {
                    shops[i].shopItems[j].itemQuantity = Number(shops[i].shopItems[j].itemQuantity) - 1
                    document.getElementById('item-quantity-value-' + String(item)).value =  String(shops[i].shopItems[j].itemQuantity)
                }
            }
        }
    }
    localStorage.setItem('Store Cart', JSON.stringify(shops))
    selectItem()
}

function changeQuantity(item)
{
    for (let i = 0; i < 5; i++) {
        for (let j = 0; j < 2; j++) {
            if(shops[i].shopItems[j].itemID == item-1)
            {
                if (Number(document.getElementById('item-quantity-value-' + String(item)).value) > 1)
                {
                    shops[i].shopItems[j].itemQuantity = Number(document.getElementById('item-quantity-value-' + String(item)).value)
                } else 
                {
                    document.getElementById('item-quantity-value-' + String(item)).value = 1
                    shops[i].shopItems[j].itemQuantity = 1
                }
            }
        }
    }
    localStorage.setItem('Store Cart', JSON.stringify(shops))
    selectItem()
}

// Delete Item
function deleteItem(itemDeleted = 0) {
    itemDeleted -= 1
    for (let i = 0; i < shops.length; i++) {
        for (let j = 0; j < shops[i].shopItems.length; j++) {
            if (shops[i].shopItems[j].itemID == itemDeleted) {
                shops[i].shopItems[j].itemVisibility.display = 'none';
                shops[i].shopItems.splice(j,1)
            }
        }
    }

    for (let i = 0; i < shops.length; i++) {
        if (shops[i].shopItems.length == 0) {
            shops[i].shopVisibility.display = 'none';
            console.log('Shops of index ' + String(i) + ' has been deleted')
            shops.splice(i,1);
        }
    }
    totalInCart.innerHTML = String(Number(totalInCart.innerHTML) - 1)
    localStorage.setItem('Store Cart', JSON.stringify(shops))
    selectItem()
}

// Check Cheked or Unchecked Item also Count Item that checked
function selectItem(selectedItem = "Other", selectedShop = "")
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
            if (shops[i].shopName == selectedShop && shops[i].shopCheck.checked == true) {
                for (let j = 0; j < shops[i].shopItems.length; j++) {
                    if (shops[i].shopItems[j].itemDeleted == false) {
                        shops[i].shopItems[j].itemChecked.checked = true;
                    }
                }
                break;
            } else if (shops[i].shopName == selectedShop && shops[i].shopCheck.checked == false){
                for (let j = 0; j < shops[i].shopItems.length; j++) {
                    if (shops[i].shopItems[j].itemDeleted == false) {
                        shops[i].shopItems[j].itemChecked.checked = false;
                    }
                }
                break;
            }
        }
    } else 
    {
        for (let i = 0; i < shops.length; i++) {
            for (let j = 0; j < shops[i].shopItems.length; j++)
            {
                if (shops[i].shopItems[j].itemChecked.checked == false) {
                    document.getElementById('All-Item-In-All-Shop').checked = false
                    shops[i].shopCheck.checked = false
                }
            }
        }
    }

    // Count Any Checked or Uncheked Item in Cart
    for (let i = 0; i < shops.length; i++) {
        for (let j = 0; j < shops[i].shopItems.length; j++) {
            if (shops[i].shopItems[j].itemDeleted == false && shops[i].shopItems[j].itemChecked.checked == true) {
                total += (shops[i].shopItems[j].itemPrice * shops[i].shopItems[j].itemQuantity);

                // Create Detail Checkout List
                let li = document.createElement('li');
                li.appendChild(document.createTextNode(String(shops[i].shopItems[j].itemName).slice(0,20) + " - " + String(new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(shops[i].shopItems[j].itemPrice)) + " x " + String(shops[i].shopItems[j].itemQuantity)));
                listItemSelected.appendChild(li);
            }
        }
    }
    totalPrices.innerHTML = String(new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(total))
    if (total > 0) {
        document.getElementById('checkout-button').classList.remove('btn-secondary');
        document.getElementById('checkout-button').classList.add('btn-primary');
    } else {
        document.getElementById('checkout-button').classList.remove('btn-primary');
        document.getElementById('checkout-button').classList.add('btn-secondary');
    }

    if (shops.length == 0)
    {
        document.getElementById('cart-empty').style.display = 'block';
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