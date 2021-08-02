const hbs = require("hbs");

// CUSTOM HELPERS

// function below: add the ternary operator functionnality to .hbs files
// usage : {{ternary true "yay" "nay "}} => prints yay
// usage : {{ternary NaN "yay" "nay "}} => prints nay
hbs.registerHelper("ternary", (test, yes, no) => (test ? yes : no));

// add comparison operator feature to hbs templates
/* 

USAGE =>

{{#compare 1 10 operator="<"}}
awesome, 1 is less thant 10 !!!
{{/compare}}

*/

hbs.registerHelper("compare", function(lvalue, rvalue, options) {
  if (arguments.length < 3)
    throw new Error("Handlerbars Helper 'compare' needs 2 parameters");

  var operator = options.hash.operator || "==";

  var operators = {
    "==": function(l, r) {
      return l == r;
    },
    "===": function(l, r) {
      return l === r;
    },
    "!=": function(l, r) {
      return l != r;
    },
    "<": function(l, r) {
      return l < r;
    },
    ">": function(l, r) {
      return l > r;
    },
    "<=": function(l, r) {
      return l <= r;
    },
    ">=": function(l, r) {
      return l >= r;
    },
    typeof: function(l, r) {
      return typeof l == r;
    }
  };

  if (!operators[operator])
    throw new Error(
      "Handlerbars Helper 'compare' doesn't know the operator " + operator
    );

  var result = operators[operator](lvalue, rvalue);

  if (result) {
    return options.fn(this);
  } else {
    return options.inverse(this);
  }
});


hbs.registerHelper("displayPrice", num => {
  let count = num
  const priceRating = document.querySelector('.priceRating')
  

  for(let i = 0; i < 4; i ++){
    const priceImg = document.createElement('img');
    priceImg.src = '/images/euro.svg'
    
    if(count <= 0) priceImg.style.opacity = ".4"
    
    count--
    priceRating.appendChild(priceImg);
  }
  
  return priceRating 
}) 


hbs.registerHelper("formatFoodType", stringArray => {

  const x = stringArray.map(string => (string.name.charAt(0).toUpperCase() + string.name.slice(1)).split('_').join(' '))

  return x.slice(0, 4).join(' - ')

})
