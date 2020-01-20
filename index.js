//setup express
const express = require('express')
const app = express()

// tell your app to use the module
app.use(express.json());
app.use(express.urlencoded({
    extended: true
}));

//setup react
// this line below, sets a layout look to your express project
const reactEngine = require('express-react-views').createEngine();
app.engine('jsx', reactEngine);

// this tells express where to look for the view files
app.set('views', __dirname + '/views');

// this line sets react to be the default view engine
app.set('view engine', 'jsx');

//setup jsonfile
const jsonfile = require('jsonfile');
const file = 'data.json'

// Set up method-override for PUT and DELETE forms
const methodOverride = require('method-override')
app.use(methodOverride('_method'));

//display create form page
app.get('/recipes/new', (request, response) =>{
        response.render("create")
})
//for create form page
app.post('/recipes', (request, response) =>{
    jsonfile.readFile(file, (err, obj)=>{
        let newRecipes = request.body;
        let recipesList = obj.recipes;
        recipesList.push(newRecipes);
        jsonfile.writeFile(file, obj, (err) =>{
            console.log(err);
            response.redirect("/recipes")
        })
    })
})
//create edit form page
app.get('/recipes/:id/edit', (request, response)=>{
    jsonfile.readFile(file, (err, obj) => {
        let data = {recipesArray : obj.recipes};
        response.render("edit", data);
    })
})

//for editing recipes based on id
app.put('/recipes', (request, response) => {
    console.log(request.body)
    jsonfile.readFile(file, (err, obj) => {
        let recipes = request.body
        recipes.id = parseInt(recipes.id);
        obj.recipes[recipes.id - 1] = recipes
        jsonfile.writeFile('data.json', obj, (err) => {
            console.error(err)
            response.redirect("/recipes")
        })
    })
})

// attempt for app delete
// app.delete('/recipes', (request, response) => {
//     console.log(request.body)
//     jsonfile.readFile(file, (err, obj) => {
//         // let deleteTarget = obj.pokemon[0]
//         obj.recipes.splice(0 ,1)
//         jsonfile.writeFile('recipes.json', obj, (err) => {
//             console.error(err)
//             response.send("wow deletes!")
//         })
//     })
// })

//show all recipes
app.get('/recipes', (request, response) => {
    jsonfile.readFile(file, (err, obj) => {
        let data = {recipesArray : obj.recipes};
        response.render("home", data);
    })
});


//show a specific recipe
app.get('/recipes/:id', (request, response) => {

  // get json from specified file
  jsonfile.readFile(file, (err, obj) => {

    // check to make sure the file was properly read
    if( err ){

      console.log("error with json read file:",err);
      response.status(503).send("error reading filee");
      return;
    }
    // obj is the object from the pokedex json file
    // extract input data from request
    let inputId = parseInt( request.params.id );
    console.log(inputId)
    var recipes;

    // find pokemon by id from the pokedex json file
    for( let i=0; i<obj.recipes.length; i++ ){

      let currentRecipes = obj.recipes[i];

      if( currentRecipes.id === inputId ){
        recipes = currentRecipes;
      }
    }

    if (recipes === undefined) {

      // send 404 back
      response.status(404);
      response.send("not found1");
    } else {

      response.send(recipes);
    }
  });
});

app.listen(3000)
console.log("listening to port 3000")