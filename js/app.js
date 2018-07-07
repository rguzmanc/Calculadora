var Calculadora = (function(){
  var numeroActual = 0;
  var resultado = 0;
  var empezarNumero = false;
  var operador = '';

  function actualizarPantalla(nuevoValor)
  {
      document.getElementById("display").innerHTML = nuevoValor;
  }
  function evaluar()
  {
    if(operador=='' && empezarNumero)
      resultado=numeroActual;
    else
      resultado = eval( resultado   + operador + numeroActual );

    actualizarPantalla(resultado);
    numeroActual=resultado;
  }

  return{
    agregarDigito: function(digito){
      if(empezarNumero)
      {
        numeroActual = 0;
        empezarNumero = false;
      }

      if(numeroActual.toString().length < 8  )
      {
        if(numeroActual==0)
        {
          numeroActual=digito;
        }
        else {
          numeroActual = parseInt(numeroActual.toString() + digito.toString());
        }
      }
      actualizarPantalla(numeroActual);
    },
    borrarMemoria: function(){
      resultado = 0;
      numeroActual = 0;
      actualizarPantalla(0);
      operador = '';
    },
    sumar: function(){
      evaluar();
      empezarNumero = true;
      operador = '+';
      actualizarPantalla('');
    },
    restar: function(){
      evaluar();
      empezarNumero = true;
      operador = '-';
      actualizarPantalla('');
    },
    multiplicar: function(){
      evaluar();
      empezarNumero = true;
      operador = '*';
      actualizarPantalla('');
    },
    dividir: function(){
      evaluar();
      empezarNumero = true;
      operador = '/';
      actualizarPantalla('');
    },
    negativo: function()
    {
      numeroActual = numeroActual*-1;
      actualizarPantalla(numeroActual);
    },
    resultado: function(){
      evaluar();
      empezarNumero = true;
      operador = '';
    }
  }
});

function teclaPresionada()
{
  this.style.padding = "2px";
  console.log("Presionado");
}

function teclaSuelta()
{
  this.style.padding = "0px";
  console.log("Presionado");
}

var cal = Calculadora();

var teclas = document.getElementsByClassName('tecla');

for(var i = 0; i < teclas.length; i++) {
  (function(index) {
    teclas[index].addEventListener("click", function() {
      var idTecla = teclas[index].id;
      console.log(idTecla);
      switch (idTecla) {
        case "por":
          cal.multiplicar();
        break;
        case "menos":
          cal.restar();
        break;
        case "igual":
          cal.resultado();
        break;
        case "mas":
          cal.sumar();
        break;
        case "dividido":
          cal.dividir();
        break;
        case "on":
          cal.borrarMemoria();
        break;
        case "sign":
          cal.negativo();
        break;
        case "raiz":

        break;
        case "punto":

        break;
        default:
          cal.agregarDigito(idTecla);
        break;
      }

    });

    teclas[index].onmousedown= teclaPresionada;
    teclas[index].onmouseup= teclaSuelta;
  })(i);
}
