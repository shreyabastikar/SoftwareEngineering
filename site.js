var site = (function() {
    var self = this;
    this.calorieValue = [new calories("Pizza",200), new calories("Burger",100), new calories("Desserts",150), new calories("Green Leafy Vegetables",25), new calories("Vegetables",30), new calories("Fries", 170)];
    this.gifts = ko.observableArray();
    this.calorieMap = ko.observableArray([new calories("Pizza",200), new calories("Burger",100), new calories("Desserts",150), new calories("Green Leafy Vegetables",25), new calories("Vegetables",30), new calories("Fries", 170)]);
    
    this.totalCalories = ko.computed(function() {
	var mapofcalorie = self.calorieMap();
	var total = 0;
	for(var j=0; j<self.gifts().length; j++){
		for(var i=0; i<mapofcalorie.length; i++) {
			if(self.gifts()[j].gname()===mapofcalorie[i].foodname)
				total+=mapofcalorie[i].calorie;
		}
	}
	return total;
    });

    

    this.addGift = function() {
	var giftsarr = self.gifts();

	var newGift = new arrayOfGifts("Enter food name", 0);
	
	giftsarr.push(newGift);
        self.gifts(giftsarr);
    };
 
    this.removeGift = function(gift) {
        self.gifts.remove(gift);
    };
 
    this.save = function(form) {
        alert("Could now transmit to server: " + ko.utils.stringifyJson(self.gifts));
        // To actually transmit to server as a regular form post, write this: ko.utils.postJson($("form")[0], self.gifts);
    };

	

    function arrayOfGifts(giftname, giftprice) {
	var self1=this;
        this.gname = ko.observable(giftname);
        this.price = ko.observable(giftprice);
	this.calculatedValue = ko.computed(function(){
		var foodname = self1.gname();
		var quantity = self1.price();	
	    	for(var i=0;i<self.calorieValue.length;i++){
			if(self.calorieValue[i].foodname === foodname) {
				var calorieMaps = self.calorieMap();
				
				var calorie = quantity * self.calorieValue[i].calorie;
				calorieMaps[i].calorie = calorie;
				self.calorieMap(calorieMaps);
				
				return quantity * self.calorieValue[i].calorie;	
			}		
		}
		return 0;
	});
	
    }

    function calories(gname, calorie) {
	this.foodname = gname;
	this.calorie = calorie;
    }
    
	
});
 




