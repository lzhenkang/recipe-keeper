var React = require('react');

class Home extends React.Component {
  render() {

    const recipesArray = this.props.recipesArray

    const recipesList = recipesArray.map( recipes => {
        return <li>{recipes.title}</li>
    });

    return (
      <html>
        <body>
          <div>
            <h1>home.jsx</h1>
            {recipesList}
          </div>
        </body>
      </html>
    );
  }
}

module.exports = Home;