var i = 0;
var lookahead = "";
var token = "";
var tipo_token = "";

function Numero(str)
{
   var checknum = parseInt(str);
   return !isNaN(checknum);
}

function Letra(str)
{
   switch(str)
   {
      case "A":
      case "B":
      case "C":
      case "D":
      case "E":
      case "F":
      case "G":
      case "H":
      case "I":
      case "J":
      case "K":
      case "L":
      case "M":
      case "N":
      case "O":
      case "P":
      case "Q":
      case "R":
      case "S":
      case "T":
      case "U":
      case "V":
      case "W":
      case "X":
      case "Y":
      case "Z": return (true);
                break;
      default: return (false);
   }
}

function move_lookahead()
{
   i = i + 1;

   if(i - 1 == document.frmEditor.Texto.value.length)
   {
      return "#";
   }
   else
   {
      return document.frmEditor.Texto.value.substr(i - 1, 1).toUpperCase();
   }
}

function BuscaProximoToken()
{
   token = "";

   while(lookahead == " " || lookahead.charCodeAt(0) == 10 || lookahead.charCodeAt(0) == 13 || lookahead.charCodeAt(0) == 9)
      lookahead = move_lookahead();

   if(Letra(lookahead))
   {
      token = lookahead;
      lookahead = move_lookahead();

      while(Letra(lookahead) || Numero(lookahead) || lookahead == "_")
      {
         token = token + lookahead;
         lookahead = move_lookahead();
      }
      
      if(token == "VARIAVEIS")
         tipo_token = "T_VARIAVEIS         ";
      else
      if(token == "INICIO")
         tipo_token = "T_INICIO            ";
      else
      if(token == "FIM")
         tipo_token = "T_FIM               ";
      else
      if(token == "ESCREVA")
         tipo_token = "T_ESCREVA           ";
      else
         tipo_token = "T_ID                ";
   }
   else
   {
      if(Numero(lookahead))
      {
         token = "";
         while(Numero(lookahead))
         {
            token = token + lookahead;
            lookahead = move_lookahead();
         }
      
         tipo_token = "T_NUMERO            ";
      }
      else
      {
         switch(lookahead)
         {
            case ",": token = lookahead;
                      lookahead = move_lookahead();
                      tipo_token = "T_VIRGULA           ";
                      break;

            case ";": token = lookahead;
                      lookahead = move_lookahead();
                      tipo_token = "T_PONTO_VIRGULA     ";
                      break;

            case "+": token = lookahead;
                      lookahead = move_lookahead();
                      tipo_token = "T_MAIS              ";
                      break;

            case "-": token = lookahead;
                      lookahead = move_lookahead();
                      tipo_token = "T_MENOS             ";
                      break;

            case "*": token = lookahead;
                      lookahead = move_lookahead();
                      tipo_token = "T_VEZES             ";
                      break;

            case "/": token = lookahead;
                      lookahead = move_lookahead();
                      tipo_token = "T_SOBRE             ";
                      break;

            case "(": token = lookahead;
                      lookahead = move_lookahead();
                      tipo_token = "T_ABREPAR           ";
                      break;

            case ")": token = lookahead;
                      lookahead = move_lookahead();
                      tipo_token = "T_FECHAPAR          ";
                      break;

            case ":": token = lookahead;
                      lookahead = move_lookahead();
                      if(lookahead == "=")
                      {
                         token = token + lookahead;
                         lookahead = move_lookahead();
                         tipo_token = "T_ATRIBUICAO        ";
                      }
                      else
                         tipo_token = "T_DOIS_PONTOS       ";
                      break;

            case "=": token = lookahead;
                      lookahead = move_lookahead();
                      tipo_token = "T_IGUAL             ";
                      break;

            case "<": token = lookahead;
                      lookahead = move_lookahead();
                      if(lookahead == "=")
                      {
                         token = token + lookahead;
                         lookahead = move_lookahead();
                         tipo_token = "T_MENOR_IGUAL       ";
                      }
                      else
                      if(lookahead == ">")
                      {
                         token = token + lookahead;
                         lookahead = move_lookahead();
                         tipo_token = "T_DIFERENTE         ";
                      }
                      else
                         tipo_token = "T_MENOR             ";
                      break;

            case ">": token = lookahead;
                      lookahead = move_lookahead();
                      if(lookahead == "=")
                      {
                         token = token + lookahead;
                         lookahead = move_lookahead();
                         tipo_token = "T_MAIOR_IGUAL       ";
                      }
                      else
                         tipo_token = "T_MAIOR             ";
                      break;

            case "#": token = lookahead;
                      lookahead = move_lookahead();
                      tipo_token = "T_FIM_FONTE         ";
                      break;

            default: token = lookahead;
                     lookahead = move_lookahead();
                     while(lookahead != " " && lookahead != "#" && lookahead.charCodeAt(0) != 10 && lookahead.charCodeAt(0) != 13 && lookahead.charCodeAt(0) != 9)
                     {
                        token = token + lookahead;
                        lookahead = move_lookahead();
                     }
                     tipo_token = "T_ERRO_LEXICO       ";
         }
      }
   }
}

function Analisa()
{
   var resultado = "";

   i = 0;

   lookahead = move_lookahead();
   BuscaProximoToken();
   while(tipo_token != "T_FIM_FONTE         ")
   {
      resultado = resultado + "<br>Token encontrado: " + tipo_token + " -> '" + token + "'";
      BuscaProximoToken();
   }
   resultado = resultado + "<br>Token encontrado: " + tipo_token + " -> '" + token + "'";

   //document.write("Resultado da an�lise:<BR><PRE>" + resultado + "</PRE>");      
   document.getElementById('resultado').innerHTML = resultado;
}