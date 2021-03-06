var i = 0;
var lookahead = "";
var token = "";
var tipo_token = "";
var resultado = "";

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


      if(token == "RECEITA")
         tipo_token = "T_RECEITA           ";
      else
      if(token == "DE")
         tipo_token = "T_DE                ";
      else
      if(token == "INGREDIENTES")
         tipo_token = "T_INGREDIENTES      ";
      else
      if(token == "PROCEDIMENTOS")
         tipo_token = "T_PROCEDIMENTOS     ";
      else
      if(token == "FARINHA")
         tipo_token = "T_FARINHA           ";
      else
      if(token == "OVOS")
         tipo_token = "T_OVOS              ";
      else
      if(token == "MANTEIGA")
         tipo_token = "T_MANTEIGA          ";
      else
      if(token == "LEITE")
         tipo_token = "T_LEITE             ";
      else
      if(token == "SAL")
         tipo_token = "T_SAL               ";
      else
      if(token == "ACUCAR")
         tipo_token = "T_ACUCAR            ";
      else
      if(token == "CANELA")
         tipo_token = "T_CANELA            ";
      else
      if(token == "FERMENTO")
         tipo_token = "T_FERMENTO          ";
      else
      if(token == "NESCAU")
         tipo_token = "T_NESCAU            ";
      else
      if(token == "LEITEMOCA")
         tipo_token = "T_LEITEMOCA         ";
      else
      if(token == "COLOCAR")
         tipo_token = "T_COLOCAR           ";
      else
      if(token == "BATER")
         tipo_token = "T_BATER             ";
      else
      if(token == "USAR")
         tipo_token = "T_USAR              ";
      else
      if(token == "ASSAR")
         tipo_token = "T_ASSAR             ";
      else
      if(token == "SERVIR")
         tipo_token = "T_SERVIR            ";
      else
      if(token == "NA")
         tipo_token = "T_NA                ";
      else
      if(token == "NO")
         tipo_token = "T_NO                ";
      else
      if(token == "TIGELA")
         tipo_token = "T_TIGELA            ";
      else
      if(token == "FORMA")
         tipo_token = "T_FORMA             ";
      else
      if(token == "LIQUIDIFICADOR")
         tipo_token = "T_LIQUIDIFICADOR    ";
      else
      if(token == "BATEDEIRA")
         tipo_token = "T_BATEDEIRA         ";
      else
      if(token == "FORNO")
         tipo_token = "T_FORNO             ";
      else
      if(token == "MINUTOS")
         tipo_token = "T_MINUTOS           ";
      else
      if(token == "POR")
         tipo_token = "T_POR               ";
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
            case ".": token = lookahead;
                      lookahead = move_lookahead();
                      tipo_token = "T_PONTO             ";
                      break;

            case ";": token = lookahead;
                      lookahead = move_lookahead();
                      tipo_token = "T_PONTO_VIRGULA     ";
                      break;

            case ":": token = lookahead;
                      lookahead = move_lookahead();
                      tipo_token = "T_DOIS_PONTOS       ";
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

//-- <servir> ::= servir --//
function Servir()
{
   if(tipo_token == "T_SERVIR            ")
   {
      BuscaProximoToken();
   } else resultado = resultado + "<br>procedimento 'servir' esperado";
}

//-- <assar> ::= assar por <numero> minutos --//
function Assar()
{
   if(tipo_token == "T_ASSAR             ")
   {
      BuscaProximoToken();
      if(tipo_token == "T_POR               ")
      {
         BuscaProximoToken();
         if(tipo_token == "T_NUMERO            ")
         {
            BuscaProximoToken();
            if(tipo_token == "T_MINUTOS           ")
            {
               BuscaProximoToken();
            } else resultado = resultado + "<br>expressao 'minutos' esperada";
         } else resultado = resultado + "<br>numero esperado";
      } else resultado = resultado + "<br>expressao 'por' esperada";
   } else resultado = resultado + "<br>procedimento 'assar' esperado";
}

//-- <usar> ::= usar liquidificador | usar batedeira | usar forno --//
function Usar()
{
   if(tipo_token == "T_USAR              ")
   {
      BuscaProximoToken();
      if(tipo_token == "T_LIQUIDIFICADOR    " ||
         tipo_token == "T_BATEDEIRA         " ||
         tipo_token == "T_FORNO             ")
      {
         BuscaProximoToken();
      } else resultado = resultado + "<br>equipamento a usar esperado";
   } else resultado = resultado + "<br>procedimento 'usar' esperado";
}

//-- <bater> ::= bater <numero> minutos --//
function Bater()
{
   if(tipo_token == "T_BATER             ")
   {
      BuscaProximoToken();
      if(tipo_token == "T_NUMERO            ")
      {
         BuscaProximoToken();
         if(tipo_token == "T_MINUTOS           ")
         {
            BuscaProximoToken();
         } else resultado = resultado + "<br>expressao 'minutos' esperada";
      } else resultado = resultado + "<br>numero esperado";
   } else resultado = resultado + "<br>procedimento 'bater' esperado";
}

//-- <colocar> ::= colocar <ingrediente> na tigela | colocar <ingrediente> na forma --//
//--            | colocar <ingrediente> no liquidificador  --//
//--            | colocar <ingrediente> na batedeira | colocar <ingrediente> no forno --//
function Colocar()
{
   if(tipo_token == "T_COLOCAR           ")
   {
      BuscaProximoToken();
      Ingrediente();
      switch(tipo_token)
      {
         case "T_NA                ": BuscaProximoToken();
                                      if(tipo_token == "T_TIGELA            " || tipo_token == "T_FORMA             " ||
                                         tipo_token == "T_BATEDEIRA         ")
                                      {
                                         BuscaProximoToken();
                                      } else resultado = resultado + "<br>espressao de onde colocar esperada";
                                      break;

         case "T_NO                ": BuscaProximoToken();
                                      if(tipo_token == "T_LIQUIDIFICADOR    " || tipo_token == "T_FORNO             ")
                                      {
                                         BuscaProximoToken();
                                      } else resultado = resultado + "<br>espressao de onde colocar esperada";
                                      break;

         default: resultado = resultado + "<br>espressoes 'no' ou 'na' esperadas";
      }
   } else resultado = resultado + "<br>procedimento 'colocar' esperado";
}

//-- <procedimento> ::= <colocar> | <bater> | <usar> | <assar> | <servir> --//
function Procedimento()
{
   switch(tipo_token)
   {
      case "T_COLOCAR           ": Colocar(); break;
      case "T_BATER             ": Bater(); break;
      case "T_USAR              ": Usar(); break;
      case "T_ASSAR             ": Assar(); break;
      case "T_SERVIR            ": Servir(); break;
      default: resultado = resultado + "<br>procedimento esperado";
   }
}

//-- <procedimentos> ::= <procedimento> ; <procedimentos> | <procedimento> --//
function Procedimentos()
{
   Procedimento();
   if(tipo_token == "T_PONTO_VIRGULA     ")
   {
      BuscaProximoToken();
      if(tipo_token != "T_FIM_FONTE         ")
         Procedimentos();
   }
}

//-- <ingrediente> ::= farinha | ovos | manteiga | leite | sal | acucar --//
//--                  | canela | fermento | nescau | leitemoca --//
function Ingrediente()
{
   if(tipo_token == "T_FARINHA           " || tipo_token == "T_OVOS              " ||
      tipo_token == "T_MANTEIGA          " || tipo_token == "T_LEITE             " ||
      tipo_token == "T_SAL               " || tipo_token == "T_ACUCAR            " ||
      tipo_token == "T_CANELA            " || tipo_token == "T_FERMENTO          " ||
      tipo_token == "T_NESCAU            " || tipo_token == "T_LEITEMOCA         ")
   {
      BuscaProximoToken();
   }
   else resultado = resultado + "<br>ingrediente esperado";
}

//-- <ingredientes> ::= <ingrediente> . <ingredientes> | <ingrediente> --//
function Ingredientes()
{
   Ingrediente();
   if(tipo_token == "T_PONTO             ")
   {
      BuscaProximoToken();
      Ingredientes();
   }
}

//-- <programa> ::= receita de <id> : ingredientes <ingrediente> procedimento <procedimentos> --//
function Programa()
{
   if(tipo_token == "T_RECEITA           ")
   {
      BuscaProximoToken();
      if(tipo_token == "T_DE                ")
      {
         BuscaProximoToken();
         if(tipo_token == "T_ID                ")
         {
            BuscaProximoToken();
            if(tipo_token == "T_DOIS_PONTOS       ")
            {
               BuscaProximoToken();
               if(tipo_token == "T_INGREDIENTES      ")
               {
                  BuscaProximoToken();
                  Ingredientes();
                  if(tipo_token == "T_PROCEDIMENTOS     ")
                  {
                     BuscaProximoToken();
                     Procedimentos();
                  } else resultado = resultado + "<br>expressao 'procedimentos' esperada";
               } else resultado = resultado + "<br>expressao 'ingredientes' esperada";
            } else resultado = resultado + "<br>dois-pontos ':' esperados";
         } else resultado = resultado + "<br>ID da receita esperado";
      } else resultado = resultado + "<br>inicializacao da receita esperada";
   } else resultado = resultado + "<br>inicializacao da receita esperada";
}

function Analisa()
{
   i = 0;
   resultado = "";

   lookahead = move_lookahead();
   BuscaProximoToken();

   Programa();

   if(resultado == "")
   {
      resultado = '<div style="color:green">Nenhum erro encontrado!</div>';
   }
   else
   {
      resultado = '<div style="color:red">' +resultado+'</div>';
   }

   document.getElementById('resultado').innerHTML = resultado;
}