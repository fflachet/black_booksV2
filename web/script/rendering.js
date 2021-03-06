/* 
 * mets en forme dans la vue les données reçues
 * certaines fonctions sont appelées au succes des requetes ajax(ici une liste de données)
 * les appels sont effectués dans consulting_request
 */

var table = null;

/**
 * cette methode fabrique le rendu(<table>) et l'insere dans la zone prévue (div id="content")
 * l'algorithme est découpée en 3 parties
 */
function createTableBooks(books) {
    $(CONTENT).empty();
    table = document.createElement("table");
    $(CONTENT).append(table);
    $(table).append(getHeaderLineForTableBook());
    generateContentForTableBook(books);
    // mise en forme via l'application des classes css
    $(table).addClass("col-xs-10 col-xs-offset-1 books");

}

/**
 * pour chaque livre de la liste la fonction va créer une ligne et l'affecter à la table
 * 
 * @param {type} books liste des livres (objets reçus via la requete ajax)
 */
function generateContentForTableBook(books) {
    $.each(books, function () {
        $(table).append(getLineForTableBook(this));
    });
}

/**
 * retourne une ligne correspondante à la ligne
 * @param {type} book un objet de type book
 * @returns {Element}
 */
function getLineForTableBook(book) {
    //création des balises
    var line = document.createElement("tr");
    var cellId = document.createElement("td");
    var cellTitle = document.createElement("td");
    var cellAuthorName = document.createElement("td");

    //insertion des td dans la ligne et affectation des textes
    $(line).append($(cellId).text(book.id));
    $(line).append($(cellTitle).text(book.title));
    $(line).append($(cellAuthorName).text(book.authorFirstName + " " + book.authorName));
    $(line).click(function () {
        getCopiesFromBook(book.id);
        currentBook = book;
    });
    return line;
}

/**
 * creation de la ligne d'en-tete de notre table
 * elle retourne la ligne afin qu'elle y soit insérée
 */
function getHeaderLineForTableBook() {

    //création des balises
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

/*COPIES*/

function createTableCopies(copies) {
    if (listOfStates === null) {
        getStates();
    }
    if (listOfStatus === null) {
        getStatus();
    }
    table = document.createElement("table");
    $(CONTENT).empty();
    $(CONTENT).append(table);
    $(table).append(getHeaderLineForTableCopies());
    $(table).append(getEmptyLineForTableCopy());
    generateContentForTableCopies(copies);
    $(table).addClass("col-xs-10 col-xs-offset-1 books");
}

function generateContentForTableCopies(copies) {
    $.each(copies, function () {
        $(table).append(getLineForTableCopy(this));
    });
}

function getSelect(list, selectedId) {
    var select = document.createElement("select");
    $.each(list, function () {
        var opt = document.createElement("option");
        $(opt).val(this.id).text(this.name);
        if (selectedId !== null) {
            if (this.id === selectedId) {
                $(opt).attr("selected", "selected");
            }
        }
        $(select).append(opt);
    });
    return select;
}

function getLineForTableCopy(copy) {
    var line = document.createElement("tr");
    var cellId = document.createElement("td");
    var cellState = document.createElement("td");
    var cellStatus = document.createElement("td");
    var cellPrice = document.createElement("td");
    var cellCtrl = document.createElement("td");

    $(cellId).text(copy.id);
    $(line).append(cellId);

    var selectState = getSelect(listOfStates, copy.state.id);
    $(selectState).change(function () {
        updateStateOfCopy(copy.id, $(this).val());
    });
    $(cellState).append(selectState);
    $(line).append(cellState);

    var selectStatus = getSelect(listOfStatus, copy.status.id);
    $(selectStatus).change(function () {
        updateStatusOfCopy(copy.id, $(this).val());
    });
    $(cellStatus).append(selectStatus);
    $(line).append(cellStatus);

    var inputNb = document.createElement("input");
    $(inputNb).attr({type: "decimal"}).val(copy.price);
    $(inputNb).change(function () {
        updatePriceOfCopy(copy.id, $(this).val());
    });
    $(cellPrice).append(inputNb);
    $(line).append(cellPrice);

    $(cellCtrl).text(copy.ctrl);
    $(line).append(cellCtrl);

    return line;
}
function getEmptyLineForTableCopy() {
    var line = document.createElement("tr");
    var cellId = document.createElement("td");
    var cellState = document.createElement("td");
    var cellStatus = document.createElement("td");
    var cellPrice = document.createElement("td");
    var cellCtrl = document.createElement("td");

    $(cellId).text("");
    $(line).append(cellId);

    var selectState = getSelect(listOfStates,null);
    $(selectState).change(function () {
//        updateStateOfCopy(copy.id, $(this).val());
    });
    $(cellState).append(selectState);
    $(line).append(cellState);

    var selectStatus = getSelect(listOfStatus,null);
    $(selectStatus).change(function () {
//        updateStatusOfCopy(copy.id, $(this).val());
    });
    $(cellStatus).append(selectStatus);
    $(line).append(cellStatus);

    var inputNb = document.createElement("input");
    $(inputNb).attr({type: "decimal"});
    $(inputNb).change(function () {
//        updatePriceOfCopy(copy.id, $(this).val());
    });
    $(cellPrice).append(inputNb);
    $(line).append(cellPrice);
    
    var button = document.createElement("button");
    $(button).click(function(){
        var copy = {
            "state" : $(selectState).val(),
            "status" : $(selectStatus).val(),
            "price" : $(inputNb).val()
        };
        addCopy(copy); 
    });
    $(cellCtrl).append($(button).text("ajouter"));
    $(line).append(cellCtrl);

    return line;
}

function getHeaderLineForTableCopies() {
    var line = document.createElement("tr");
    var cellId = document.createElement("th");
    var cellState = document.createElement("th");
    var cellStatus = document.createElement("th");
    var cellPrice = document.createElement("th");
    var cellCtrl = document.createElement("th");

    $(cellId).text("id").addClass("col-xs-1");
    $(line).append(cellId);
    $(cellState).text("etat").addClass("col-xs-3");
    $(line).append(cellState);
    $(cellStatus).text("status").addClass("col-xs-3");
    $(line).append(cellStatus);
    $(cellPrice).text("prix").addClass("col-xs-3");
    $(line).append(cellPrice);
    $(cellCtrl).text("action").addClass("col-xs-3");
    $(line).append(cellCtrl);

    return line;
}

