let selledProducts = document.querySelector('#selled_products');
let amountOfMoney = document.querySelector('#amount_of_money');
let rankingsSection = document.querySelector('#rankings');
/**FUnciones que describen el comportamiento del programa */
class vendedor {
    /**La clase vendedor asigna el nombre de un vendedor y los productos que este vendio. */
    constructor(nam, prod) {
        this.nam = nam;
        this.prod = prod;
    }
    get names() {
        return this.nam;
    }
    get products() {
        return this.prod;
    }
    set names(n) {
        this.nam = n;
    }
    set products(p) {
        this.prod = p;
    }
}

function generateProducts(numberOfProducts) {
    /**Esta función genera valores aleatorios para la cantidad de items vendidos */
    let container = new Array(numberOfProducts);
    for (let i = 0; i < numberOfProducts; i++) {
        container[i] = Math.round(Math.random() * 100);
    }
    /**Para N productos se puede crear una lista de los strings y otra del array, finalmente se crea un nuevo elemento del map por cada elemento compuesto de los valores y los strings. */
    const productsMap = new Map([['aqua', container[0]], ['emocion', container[1]], ['alegria', container[2]], ['frescura', container[3]]]);
    return productsMap;
}
function calculateSales(productsArray) {
    /**Esta funcion calcular el dinero obtenido por cada item y el total. Almacenandolos en un map de facil accseso */
    aquaValue = productsArray.get('aqua') * 200;
    emocionValue = productsArray.get('emocion') * 180;
    alegriaValue = productsArray.get('alegria') * 160;
    frescuraValue = productsArray.get('frescura') * 150;
    totalValue = aquaValue + emocionValue + alegriaValue + frescuraValue;
    const gananciasMap = new Map([['aqua', aquaValue], ['emocion', emocionValue], ['alegria', alegriaValue], ['frescura', frescuraValue], ['total', totalValue]]);
    return gananciasMap;
}
let juana = new vendedor('juana', generateProducts(4));
let pedro = new vendedor('pedro', generateProducts(4));
/**Funciones que modifican el DOM */
function hideElse() {
    /**esta función esconde el boton de vender y muestra el menu principal */
    initialContainer = document.querySelector("#initial_container");
    mainContainer = document.querySelector("#main_container");
    initialContainer.style.display = "none";
    mainContainer.style.display = "flex";
    mainContainer.style.flexDirection = "column";


}
/**PRIMERA PARTE*/
function showProductosVendidos() {
    /**Esta función muestra la primera sección y esconde lo demás */
    let tables = document.getElementById('items_table');
    selledProducts.style.display = 'flex';
    amountOfMoney.style.display = 'none';
    rankingsSection.style.display = 'none';
    tables.style.display = 'none';
}
function showJuanaSales() {
    /**Muestra la cantidad de items vendidos por juana al seleccionarla en el dropdown menu */
    let tables = document.getElementById('items_table');
    tables.style.display = 'table';
    let elementsMap = juana.products;
    let elementsArray = [elementsMap.get('aqua'), elementsMap.get('emocion'), elementsMap.get('alegria'), elementsMap.get('frescura')]
    let total = 0;
    for (let i = 0; i < 4; i++) {
        total += parseInt(elementsArray[i]);
        document.getElementsByClassName("number_of_items")[i].innerHTML = elementsArray[i];
    }
    document.getElementsByClassName("number_of_items")[4].innerHTML = total;
}

function showPedroSales() {
    /**Muestra la cantidad de items vendidos por pedro al seleccionarlo en el dropdown menu */
    let tables = document.getElementById('items_table');
    tables.style.display = 'table';
    elementsMap = pedro.products;
    elementsArray = [elementsMap.get('aqua'), elementsMap.get('emocion'), elementsMap.get('alegria'), elementsMap.get('frescura')]
    let total = 0;
    for (let i = 0; i < 4; i++) {
        total += parseInt(elementsArray[i]);
        document.getElementsByClassName("number_of_items")[i].innerHTML = elementsArray[i];
    }
    document.getElementsByClassName("number_of_items")[4].innerHTML = total;
}
/**SEGUNDA PARTE */
function showVentasPorVendedor() {
    /**Muestra la segunda sección y esconde lo demás */
    table = document.getElementById('items_table_selled');
    selledProducts.style.display = 'none';
    amountOfMoney.style.display = 'grid';
    rankingsSection.style.display = 'none';
    table.style.display = 'table';
    rankingSort();
    selledTableValues();
}
function rankingSort() {
    /**Esta función muestra el ganador según la cantidad de ventas. Finalmente muestra los porcentajes y la barra de progreso según el porcentaje */
    let winnerText = document.getElementsByClassName('ranking_name')[0];
    let looserText = document.getElementsByClassName('ranking_name')[1];
    let winner = document.getElementsByClassName('ranking_value')[0];
    let looser = document.getElementsByClassName('ranking_value')[1];
    const juanaSales = calculateSales(juana.products);
    const pedroSales = calculateSales(pedro.products);
    const juanaTotal = parseInt(juanaSales.get('total'));
    const pedroTotal = parseInt(pedroSales.get('total'));
    const totalSales = juanaTotal + pedroTotal;
    let juanaPercentage = Math.round(100 * (juanaTotal / totalSales));
    let pedroPercentage = Math.round(100 * (pedroTotal / totalSales));
    juanaPercentage = juanaPercentage.toString();
    pedroPercentage = pedroPercentage.toString();
    console.log(typeof (juanaTotal));
    console.log(pedroTotal);
    selledProducts.style.display = 'none';
    amountOfMoney.style.display = 'grid';
    rankingsSection.style.display = 'none';

    if (juanaTotal > pedroTotal) {
        winnerText.innerHTML = '#1 juana';
        looserText.innerHTML = '#2 Pedro';
        winner.innerHTML = juanaPercentage + "%";
        looser.innerHTML = pedroPercentage + "%";
        move1(juanaPercentage);
        move2(pedroPercentage);
        /** 
        winner.style.width = juanaPercentage+"%";
        looser.style.width = pedroPercentage+"%";
        */
    }
    else if (pedroTotal > juanaTotal) {
        winnerText.innerHTML = '#1 Pedro';
        looserText.innerHTML = '#2 Juana';
        winner.innerHTML = pedroPercentage + "%";
        looser.innerHTML = juanaPercentage + "%";
        move1(pedroPercentage);
        move2(juanaPercentage);
        /** 
        winner.style.width = pedroPercentage+"%";
        looser.style.width = juanaPercentage+"%";
        */
    }
    else {
        winnerText.innerHTML = 'juana-empate';
        looserText.innerHTML = 'Pedro-empate';
        winner.innerHTML = pedroPercentage + "%";
        looser.innerHTML = juanaPercentage + "%";
        move1(pedroPercentage);
        move2(juanaPercentage);
        /** 
        winner.style.width = pedroPercentage+"%";
        looser.style.width = juanaPercentage+"%";
        */
    }

}
/**Variables for the progress bar animation */
let yop = 0;
let yop2 = 0;
function move1(value1) {
    /**This function animates the winner progress bar adding 1% of width for each iteration */
    if (yop == 0) {
        yop = 1;
        let winner = document.getElementsByClassName('ranking_value')[0];
        let width = 1;
        var id = setInterval(frame, 10);
        function frame() {
            if (width >= value1) {
                clearInterval(id);
                yop = 0;
            } else {
                width++;
                winner.style.width = width + "%";
            }
        }
    }
}
function move2(value1) {
    /**This function animates the looser progress bar adding 1% of width for each iteration */

    if (yop2 == 0) {
        yop2 = 1;
        let looser = document.getElementsByClassName('ranking_value')[1];
        let width = 1;
        var id = setInterval(frame, 10);
        function frame() {
            if (width >= value1) {
                clearInterval(id);
                yop2 = 0;
            } else {
                width++;
                looser.style.width = width + "%";
            }
        }
    }
}
function selledTableValues() {
    /**Esta función muestra los valores vendidos de cada producto por vendedor en la tabla */
    const juanaSales = calculateSales(juana.products);
    const pedroSales = calculateSales(pedro.products);
    let juanaArray = [juanaSales.get('aqua'), juanaSales.get('emocion'), juanaSales.get('alegria'), juanaSales.get('frescura')];
    let pedroArray = [pedroSales.get('aqua'), pedroSales.get('emocion'), pedroSales.get('alegria'), pedroSales.get('frescura')];
    let total = 0;
    for (let i = 0; i < 4; i++) {
        document.getElementsByClassName("number_of_items_juana")[i].innerHTML = juanaArray[i] + "$";
        document.getElementsByClassName("number_of_items_pedro")[i].innerHTML = pedroArray[i] + "$";

    }
    document.getElementsByClassName("number_of_items_juana")[4].innerHTML = juanaSales.get('total') + "$";
    document.getElementsByClassName("number_of_items_pedro")[4].innerHTML = pedroSales.get('total') + "$";
}
/**TERCERA PARTE */
function showRanking() {
    /**Muestra el ranking y esconde lo demás */
    selledProducts.style.display = 'none';
    amountOfMoney.style.display = 'none';
    rankingsSection.style.display = 'grid';
    rankingOrder();
}
function rankingOrder() {
    /**Esta función muestra el ganador según la cantidad de ventas que tuvo. */
    let winner = document.getElementById('winner');
    const juanaSales = calculateSales(juana.products);
    const pedroSales = calculateSales(pedro.products);
    const juanaTotal = parseInt(juanaSales.get('total'));
    const pedroTotal = parseInt(pedroSales.get('total'));
    if (juanaTotal > pedroTotal) {
        winner.innerHTML = "#1 Juana";
    }
    else if (pedroTotal > juanaTotal) {
        winner.innerHTML = "#1 Pedro";
    }
    else {
        winner.innerHTML = "Juana y Pedro son los ganadores";
    }
}
