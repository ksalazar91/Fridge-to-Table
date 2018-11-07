
// most use vegetables. This array is use to search the api ingridients array and get only the vegetables 
// from the api.
var commonVegetables = ['artichoke','eggplant','asparagus','sprouts','beans','chickpeas','garbanzos', 
                       'lentils','lima','peas','broccoli','brussels', 'cabbage','kohlrabi', 
                       'cauliflower','celery','endive','fiddleheads','fennel','chard','collard', 
                       'kale','spinach','quinoa','anise','basil','caraway','cilantro','chamomile', 
                       'dill','fennel','lavender','lemon','marjoram','oregano','parsley','rosemary', 
                       'sage','thyme','lettuce','arugula','mushroom','chives','garlic','leek',
                        'onion','shallot','scallion','pepper','jalapeño','habanero','paprika', 
                        'carrot','celeriac','daikon','ginger','parsnip','rutabaga','turnip', 
                        'radish','sweetcorn','squash','zucchini','cucumber','pumpkin','tomato',
                         'tubers','jicama','artichoke','potato','quandong','sunchokes','sweet', 
                         'potato','yam','corn','ginger'
];

var pluralCommonVegetables = [];

function pluralVegetables(){
    for(var i = 0; i<commonVegetables.length; i++){
        pluralCommonVegetables[i] = commonVegetables[i] + "s";
    }
}

pluralVegetables();

// is an array that is going to holds an object
var completeRecipe = [];

// variable controls the minimun ingridiants we want to have on a search
var ingredientCount = 3;
var offset = 0;




//----------------------------------------------------------------------------------------------------------
// code bellow is only use to test the methods
//-----------------------------------------------------------------------------------------------------------
//value is obtain from the user. This array will be use to find how many ingridients match  the recipe
var genSearch = ["chicken", "carot", "eggplan", "oion", "peper", "tomaso"];

// value is obtain from the user if they want a specific ingridient chicken, beef, seafood, or vegetables.
var mainIngredient = "meat"; 

//offset the results 
var fromOffset = 0;

var numOfResults = 5;


//----------------------------------------------------------------------------------------------------------


//keyword indicate if is chicken, beef, seafood or vegetable . 
//if the user is doing a advance search pass the main ingredient
// else pass "all"
function apiCall(keyWord, searchIngredients){


    var queryURL = "https://api.edamam.com/search?q="+ keyWord +
                   "&app_id=17487a38&app_key=3fd9c70aefdd3c029f018cb69009d471&to=1000&from="+ offset +""
    ;
              
    $.ajax({
        url: queryURL,
        method: 'GET'
    }).then(function(response){

        var r = response.hits[0].recipe; 

        var obj = { primary: response.q,
                    name: r.label,
                    image: r.image,
                    ingredients: r.ingredientLines,
                    instructions: r.url
        }
        searchArray(searchIngredients, obj);        
      
    })

}// end apicall

//keyword indicate if is chicken, beef, seafood or vegetable . 
//if the user is doing a advance search pass the main ingredient
// else pass "all"
function apiTopChoice(keyWord, searchIngredients){


    var queryURL = "https://api.edamam.com/search?q="+ keyWord +
                   "&app_id=17487a38&app_key=3fd9c70aefdd3c029f018cb69009d471&to=1000&from="+ offset +""
    ;
              
    $.ajax({
        url: queryURL,
        method: 'GET'
    }).then(function(response){

        var r = response.hits[0].recipe; 

        var obj = { primary: response.q,
                    name: r.label,
                    image: r.image,
                    ingredients: r.ingredientLines,
                    instructions: r.url
        }
        searchArray(searchIngredients, obj);        
      
    })

}// end apicall

//------------------------------------------------------------------------------------
//array1 variable is the user input and the object contains the value of the api ingredients
function searchArray(array1, object){
   
    console.log(object);
    var tem = [];
    var temStr;
    var str;
    var k = 0;

    for(var i=0; i<object.ingredients.length; i++){

        temStr = format(object.ingredients[i]);

        for(var j=0; j<temStr.length; j++){

            if(commonVegetables.indexOf(temStr[j])  != -1 || pluralCommonVegetables.indexOf(temStr[j])  != -1){

                tem[k] = temStr[j];
                k++;
            }
           
        }
        
    } 
    
   var x = equalIngredients(array1, tem);
}

// this function makes sure the api ingredients split and push into an array
// x holds the value of the api ingredients 
function format(x){
    var y = x.split(" ");
    var z = [];

    for(var i = 0; i<y.length; i++){
       
        
            if(y[i].indexOf(",")  == -1){
                z.push(y[i]);
            // console.log(y[i]);
            }
            else {
            
                //console.log(y[i].substring(0, y[i].length-1));
                z.push(y[i].substring(0, y[i].length-1));
                
            }
        
    }
   // console.log(z);
    return z;
}


//finds out how many elements does the user input has that are equal to the api list
function equalIngredients(userArray, apiArray){
    console.log(apiArray);
    console.log(userArray);
    var x =-1;
    var e = 0;


        if(apiArray.length === 1 || apiArray.length === 2){
            x = 1;
        }

        else if(apiArray.length === 3 || apiArray.length === 4 ){
            e = count(userArray, apiArray);
            console.log(e);
            if(e >= 2 ){
                x = 1;
            }
        }

        else if(apiArray.length >= 5 ){

            e = count(userArray, apiArray);
            console.log(e);
            if(e >=3){
               x = 1;
            }
        }

        else{
            x = -1;
        }

   console.log(x);

    return x;
    
}

//function uses the length of the coutn arrry to  get how many ingredients are the same
function count(u, v){
    var count = [];
    for(var j = 0; j<u.length; j++){
        for(var k = 0; k<v.length; k++){
            if(u[j]===v[k] || u[j]+"s" === v[k]){
                count.push(u[j]);
            }

        }
    }
    console.log(count);
 return count.length;
}

//----------------------------------------------------------------------------------------------------
//general search will only give an array from the user which will be pass as useIinput 
//the user than will get 3 recipe for each of: chicken, meat, seafood, vegetables.
//The results will be append to an object base on how many vegetables does the recipe has and 
// and at least more then half matches the user input.
//-----------------------------------------------------------------------------------------------------
function generalSearch(userinput){
    var chickenCount = 0;
    var meatCount = 0;
    var seafoodCount = 0;
    var vegetableCount = 0;

    if(chickenCount !=3){
        //call api
        apiCall("chicken", userinput);

        //count+1;
    }
}


$('#submit-button').on("click",function(){

    var userInput = $('#input-search').val().trim();

    var userArray = userInput.split();

    console.log(userInput);
    generalSearch(userArray);

})

