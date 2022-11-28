class helpers {

    sumPrices(prices){
        prices.reduce = [].reduce;
        return prices.reduce(function(a, b) {
            return a + b;
        });
    }
    
    
}
    
module.exports = new helpers();