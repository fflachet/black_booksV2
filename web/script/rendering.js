/* 
 * data rendering
 */

var table = null;
function createTableBooks(books){
    table = document.createElement("table");
    $(CONTENT).append(table);
    $(table).append(getHeaderLineForTableBook());
}

function getHeaderLineForTableBook(){
    
    // creation des balises
    var line = document.createElement("tr");
    var idBook = document.createElement("th");
    var titleBook = document.createElement("th");
    var authorName = document.createElement("th");
    
    //affectation des textes
    $(idBook).text("id");
    $(titleBook).text("titre");
    $(authorName).text("auteur");
    
    //insertion des th dans la ligne
    $(line).append(idBook);
    $(line).append(titleBook);
    $(line).append(authorName);
    
    return line;
}
