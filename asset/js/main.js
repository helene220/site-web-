// fonction segText() premier bouton de votre futur site web, essayer son fonctionnement en chargeant un fichier ------------------------------------------------------------------------

// Fonction pour lire le fichier qu'on a choisi
document.getElementById("fileInput").addEventListener("change", function(event){
    let file = event.target.files[0];
    if (!file) return;
    let reader = new FileReader();
    reader.onload = function(e){
        document.getElementById("fileDisplayArea").innerText = e.target.result;
    };
    reader.readAsText(file);
});

// On stocke les tokens et les lignes pour les réutiliser
let global_var_lines = [];
let global_var_tokens = [];

function segText() {
    if (document.getElementById('fileDisplayArea').innerHTML==""){
        //alert("Il faut d'abord charger un fichier .txt !"); //autre possibilitÃ©
        document.getElementById('logger3').innerHTML="Il faut d'abord charger un fichier .txt !";
    } else {
        if (document.getElementById("delimID").value === "") {
            document.getElementById("logger3").innerHTML = '<span class="errorlog">Aucun dÃ©limiteur donnÃ© !</span>';
        } else {
            document.getElementById('logger3').innerHTML="";

            let text = document.getElementById("fileDisplayArea").innerText;
            let delim = document.getElementById("delimID").value;
            let display = document.getElementById("page-analysis");
       
            let regex_delim = new RegExp(
                "["
                + delim.replace("-", "\\-") // le tiret n'est pas Ã  la fin : il faut l'Ã©chapper, sinon erreur sur l'expression rÃ©guliÃ¨re
                        .replace("[", "\\[")
                        .replace("]", "\\]") // Ã  changer sinon regex fautive, exemple : [()[]{}] doit Ãªtre [()\[\]{}], on doit "Ã©chapper" les crochets, sinon on a un symbole ] qui arrive trop tÃ´t.
                + "\\s" // on ajoute tous les symboles d'espacement (retour Ã  la ligne, etc)
                + "]+" // on ajoute le + au cas oÃ¹ plusieurs dÃ©limiteurs sont prÃ©sents : Ã©vite les tokens vides
            );
       
            let tokens = text.split(regex_delim);
            tokens = tokens.filter(x => x.trim() != ""); // on s'assure de ne garder que des tokens "non vides"
            let lines = text.split(/\r?\n/g);
            lines = lines.filter(line => line.trim() != "");
       
            global_var_tokens = tokens; // dÃ©commenter pour vÃ©rifier l'Ã©tat des tokens dans la console dÃ©veloppeurs sur le navigateur
            global_var_lines = lines;
            display.innerHTML = tokens.join(" | ");
        }
    }
}

// Dictionnaire de mot pour calculer la fréquence avec une boucle pour compter
function dictionnaire(){
    if (global_var_tokens.length == 0){
        alert("Fais la segmentation avant !");
        return;
    }

    let dico = {};
    for (let i = 0; i < global_var_tokens.length; i++){
        let mot = global_var_tokens[i].toLowerCase();

        if (dico[mot]){
            dico[mot]++;
        } else {
            dico[mot] = 1;
        }
    }

    let resultat = "Dico :";
    for (let mot in dico){
        resultat += mot + ":" + dico[mot] + "<br>";
    }
    document.getElementById("page-analysis").innerHTML = resultat;
}

// La fonction kujuj on fait en sorte d'ajouter uj à chaque mot 
function kujuj() {

     if (global_var_tokens.length == 0){
        alert("Fais la segmentation avant !");
        return;
    }

    let resultat = "";
    for (let i = 0; i < global_var_tokens.length; i++){
        resultat += global_var_tokens[i] + "uj ";      
    }

    document.getElementById("page-analysis").innerHTML = resultat;

}

// Fonction pour calculer le nombre de phrase dans un texte
function nbPhrases() {

    let text = document.getElementById("fileDisplayArea").innerText;

    let phrase = text.split(/[.!?]/);
    let compteur = 0;
    
    for (let i = 0; i < phrase.length; i++){
        if (phrase[i].trim() != ""){
            compteur++;
        }
    }

    document.getElementById("page-analysis").innerHTML = compteur;
}