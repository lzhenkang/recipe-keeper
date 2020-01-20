var React = require('react');

class create extends React.Component {
  render() {
    return (
      <html>
        <body>
          <div>
            <h1>create.jsx</h1>
            <form method="POST" action="/recipes" >
            <div>ID: </div>
            <input type = "text" name="id"/><br/>
            <div>Title: </div>
            <input type = "text" name="title"/><br/>
            <div>Ingredients: </div>
            <input type = "text" name="ingredients"/><br/>
            <div>Instructions: </div>
            <input type = "text" name="instructions"/><br/>
            <input type="submit" value="Submit"/>
            </form>
          </div>
        </body>
      </html>
    );
  }
}

module.exports = create;