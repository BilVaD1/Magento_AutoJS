class helpers {

    sumPrices(prices){
        prices.reduce = [].reduce;
        return prices.reduce(function(a, b) {
            return a + b;
        });
    }
    
    determineOrder (arr) {
        if(arr.length < 2){
           return 'not enough items';
        };
        let ascending = null;
        let nextArr = arr.slice(1);
        for(var i = 0; i < nextArr.length; i++) {
           if(nextArr[i] === arr[i]){
              continue;
           }else if(ascending === null) {
              ascending = nextArr[i] > arr[i];
           }else if (ascending !== nextArr[i] > arr[i]){
              return 'unsorted';
           };
        }
        if(ascending === null){
           return 'all items are equal';
        };
        return ascending ? 'ascending' : 'descending';
    };
    
}
    
module.exports = new helpers();