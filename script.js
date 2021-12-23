let itemPrices = [];
let totalPrices = document.getElementById('total-price');
for (let i = 1; i<=10;i++)
{
    itemPrices.push(Number(document.getElementById('item-price-'+String(i)).innerHTML));
}

function sum (listNumber)
{
    let total = 0;
    for (let i = 0; i < listNumber.length; i++)
    {
        total += listNumber[i];
    }
    console.log(total)
    return total;
}
function selectItem(selectedItem)
{
    let allItemInAllShop = document.getElementById('All-Item-In-All-Shop');
    if (selectedItem == 'allItemInAllShop' && allItemInAllShop.checked == true)
    {
        totalPrices.innerHTML = String(sum(itemPrices));
        
    } 
    else if (selectedItem == 'allItemInAllShop' && allItemInAllShop.checked == false)
    {
        totalPrices.innerHTML = String(0);
    }
    switch(selectItem)
    {
        
    }
}


