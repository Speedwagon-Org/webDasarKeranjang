let shops = []
let count = 1
let totalPrices = document.getElementById('total-price');
for (let i = 1; i <= 5; i++) {
    shops.push({
        shopName: document.getElementById('shop-name-' + String(i)).innerHTML,
        shopCheck: document.getElementById('select-all-item-in-shop-' + String(i)),
        shopItems: [],
    });
    for (let j = 1; j <= 2; j++) {
        shops[i-1].shopItems.push({
            itemName: document.getElementById('item-title-' + String(count)).innerHTML,
            price: Number(document.getElementById('item-price-' + String(count)).innerHTML),
            itemChecked: document.getElementById('item-' + String(count) + '-check'),
            itemDeleted: false
        });
        count += 1;
    }
}

function selectItem(selectedItem = "Other") // Memilih Item
{
    let total = 0;
    let SelectAll = document.getElementById('All-Item-In-All-Shop');
    if (selectedItem == 'SelectAll' && SelectAll.checked == true) {
        for (let i = 0; i < shops.length; i++) {
            for (let j = 0; j < shops[i].shopItems.length; j++) {
                if (shops[i].shopItems[j].itemDeleted == false){
                    total += shops[i].shopItems[j].price;
                    shops[i].shopItems[j].itemChecked.checked = true;
                    console.log(shops[i].shopItems[j].itemName)
                }
            }
            shops[i].shopCheck.checked = true;
        }
    } 
    totalPrices.innerHTML = String(total);
    changeButton()
}

function changeButton() // Fungsi Mengubah Tombol ketika Total Harga lebih dari 0
{
    let checkoutButton = document.getElementById('checkout-button');
    if (Number(totalPrices.innerHTML) > 0) {
        checkoutButton.classList.add('btn-primary')
        checkoutButton.classList.remove('btn-secondary')
    } else {
        checkoutButton.classList.remove('btn-primary')
        checkoutButton.classList.add('btn-secondary')
    }
}