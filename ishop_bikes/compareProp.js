function comparePrice(a,b){
        if ( a.price < b.price )  return -1;
        if ( a.price > b.price )  return 1;
        return 0;  
}

function compareScore(a,b){
        if ( a.score > b.score )  return -1;
        if ( a.score < b.score )  return 1;
        return 0;  
}

function compareSales(a,b){
        if ( a.sales > b.sales )  return -1;
        if ( a.sales < b.sales )  return 1;
        return 0;  
}
export {comparePrice, compareSales, compareScore};