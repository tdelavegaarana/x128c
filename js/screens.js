/*Función que contiene todas las pantallas del experimento excepto las que tiene que ver con el 
flujo de ensayos. Es decir contiene la información de las pantallas que preceden y proceden */
function screens (id) {
  // body...
  "use strict";
  var encabezado = '';
  var texto = '';
  switch(id){
    /*PRE SCREENS*/
    case 'configure':
      encabezado = 'Configuración del experimento';
      texto = '<form name="configure">' +
      '<strong>Grupo</strong>: ' +
      '<select name="grupo">' +
      '<option value="1">1</option>' +
      '<option value="2">2</option>' +
      '</select>'+
      '</form>';
      break;
    case 'participantData':
      encabezado = 'Información participante';
      texto = '<form name="input">' +
      '<strong>Edad</strong>:<input id="edad" name="edad" maxlength="2"/>' +
      '<strong>Sexo</strong>:<select name="sexo"><option value="masculino">Hombre</option>' +
      '<option value="femenino">Mujer</option></select>' +
      '</form>' +
      '<p id="warning_message"></p>';
      break;
    case 'init':
      encabezado = experiment.getExperimentName();
      texto = '(Software para psicologia Experimental)<br>' +
      'Versión 1.0, Español, ' + experiment.getYear() + '<br>' +
      '<a href="#">http://www.labpsico.com</a><br>' +
      '<a href="#" onclick="hideAndShowReferences()">Créditos, Copyright y Artículos en los ' +
      'que se describe este programa</a>' +
      '<p id="references"></p>';
      break;
    case 'ethic':
      encabezado = 'TU PARTICIPACIÓN ES VOLUNTARIA Y ANÓNIMA';
      texto = 'Antes de nada queremos agradecer tu participación ' +
      'en este experimento, ya que sin la colaboración de personas ' +
      'como tú no sería posible esta investigación.<br>Debes saber ' +
      'que en esta tarea no hay respuestas buenas ni malas. Lo que ' +
      'queremos estudiar son los mecanismos psicológicos básicos que ' +
      'se dan en todas las personas. Para ello, necesitamos que, si '+
      'deseas participar, lo hagas con el mayor interés. No tienes que ' +
      'identificarte, y los datos que nos aportes se unirán a los ' +
      'del total del grupo y serán analizados estadísticamente. Tu ' +
      'participación es voluntaria y anónima.<br>Si tras haber leído ' +
      'el mensaje deseas continuar, pulsa en el botón \'Continuar\'.';
      break;
    case 'instructions':
      encabezado = 'Instrucciones';
      texto = 'Imagina que eres un médico que trabaja en la sección de ' +
      'urgencias de un hospital. Eres especialista en una enfermedad muy rara y peligrosa ' +
      'llamada "Síndrome de Lindsay". Este síndrome produce una crisis que hay que ' +
      'tratar muy rápido en urgencias.<br>Se acaba de descubrir una nueva medicina ' +
      'llamada Batatrim que está aún en fase experimental, por lo que todavía no ' +
      'se ha comprobado claramente su efectividad tratando estas crisis. Por ello, se está ' +
      'poniendo a prueba en algunos pacientes que sufren las crisis. Ten en cuenta que el Batatrim ' +
      'puede funcionar en unos casos y no funcionar en otros casos.<br><br>' +
      'A continuación, te vamos a presentar una serie de fichas médicas de pacientes que ' +
      'sufren una crisis del Síndrome de Lindsay. En cada ficha verás primero ' +
      'si al paciente le han administrado el Batatrim o no, y te pediremos que indiques si ' +
      'crees que superará la crisis. A continuación observarás si efectivamente ' +
      'el paciente superó la crisis. Tu objetivo es averiguar hasta qué punto es ' +
      'efectivo el Batatrim. Cuando hayas observado a un buen número de pacientes te ' +
      'haremos algunas preguntas.';
      break;
    /*POST SCREENS*/
    case 'send':
      encabezado = 'Enviar datos';
      texto = 'A continuación podrás enviar los resultados para ' +
      'que se incluyan en nuestro estudio, los datos que nos aportes se ' +
      'unirán a los del grupo y serán analizados estadísticamente. ' +
      'Para hacerlo haz click en el botón "Enviar". Si por alguna razón ' +
      'no deseas enviarnóslos haz click en el botón "Cancelar".';
      break;
    case 'end':
      encabezado = experiment.getCode();
      texto = 'Gracias por participar. Para ver las ' +
      'referencias del experimento y una explicación de los objetivos ' +
      'del mismo, haz click en el botón "Explicación" o en el botón "Referencias".';
      break;
    case 'references':
      encabezado = 'Referencias';
      texto = 'Software de psicología experimental.<br>' +
      'Versión 1.0, Español, ' + experiment.getYear() + '.<br>' +
      '<a href="http://www.labpsico.com" target="_blank">' +
      'http://www.labpsico.com</a><br>' + insertCopyright();
      break;
    case 'explanation':
      encabezado = 'Explicación';
      texto = 'Antes de nada queremos darte las gracias por tu colaboración en ' +
      'este experimento. Nuestra labor de investigación sería imposible ' +
      'si no fuera por la participación voluntaria de personas como tú ' +
      'que deciden dedicarnos parte de su tiempo. Suponemos que ahora ' +
      'que has terminado el experimento te gustaria recibir una explicación ' +
      'sobre lo que tratabamos de estudiar.<br> En este experimento ...<br>' +
      'Para saber más:<br>Si estás interesado en saber más acerca de la ' +
      'psicología del aprendizaje, te recomendamos que consultes alguno ' +
      'de los libros de texto, como por ejemplo, Domjan, M. (2003). ' +
      'Principios de aprendizaje y conducta. (5ª Edición). Madrid: ' +
      'Thomsom-Paraninfo.<br>' + insertCopyright();
      break;
  }
  return [encabezado, texto];
}
function preScreensFlow (id) {
  // body...
  "use strict";
  var lista = screens(id);
  switch(id) {
    case 'configure':
      hideVisibility(new Array('button_back'));
      /*Asignar evento onclick*/
      document.getElementById('button_continue').setAttribute('onclick','experiment.storeConfiguration();preScreensFlow("init");');
      break;
    case 'init':
      /*ocultar botón*/
      hideVisibility(new Array('button_back'));
      /*Asignar evento onclick*/
      document.getElementById('button_continue').setAttribute('onclick','preScreensFlow("ethic")');
      /*Cambiar estilo, por si retroceden.*/
      document.getElementById("information_article").style.textAlign = "center";
      break;
    case 'ethic':
      /*Cambiar estilo*/
      document.getElementById("information_article").style.textAlign = "justify";
      /*Buttons*/
      showVisibility(new Array('button_back'));
      /*Asignar evento onclick*/
      document.getElementById('button_continue').setAttribute('onclick','preScreensFlow("participantData")');
      document.getElementById('button_back').setAttribute('onclick','preScreensFlow("init")');
      break;
    case 'participantData':
      /*Asignar evento onclick*/
      document.getElementById('button_continue').setAttribute('onclick','storeParticipantData()');
      document.getElementById('button_back').setAttribute('onclick','preScreensFlow("ethic")');
      break;
    case 'instructions':
      /*Asignar eventos onclick*/
      document.getElementById('button_continue').setAttribute('onclick','experiment.randomLoad();trainingFlow(0)');
      document.getElementById('button_back').setAttribute('onclick','preScreensFlow("participantData")');
      break;
  }
  /*Quitar foco de los botones*/
  document.getElementById('button_back').blur();
  document.getElementById('button_continue').blur();
  /*Inyectar texto*/
  document.getElementById('encabezado').innerHTML = lista[0];
  document.getElementById('information_span').innerHTML = lista[1];
}
function postScreenFlow (id) {
  // body...
  "use strict";
  var lista = screens(id);
  switch(id) {
    case 'send':
      /*Insertar el texto de los botones*/
      document.getElementById('button_continue').innerHTML = 'Enviar';
      document.getElementById('button_back').innerHTML = 'Cancelar';
      /*Asignar evento onclick a los botones*/
      document.getElementById('button_continue').setAttribute('onclick','saveData();postScreenFlow("end")');
      showVisibility(new Array('button_back'));
      document.getElementById('button_back').setAttribute('onclick','postScreenFlow("end")');
      break;
    case 'end':
      /*Insertar texto en los botones*/
      document.getElementById('button_back').innerHTML = 'Explicación';
      document.getElementById('button_continue').innerHTML = 'Referencias';
      /*Asignar valor onclick*/
      document.getElementById('button_continue').setAttribute('onclick','postScreenFlow("references")');
      document.getElementById('button_back').setAttribute('onclick','postScreenFlow("explanation")');
      break;
    case 'references':
      hideVisibility(new Array('button_continue'));
      showVisibility(new Array('button_back'));
      document.getElementById('button_back').setAttribute('onclick','postScreenFlow("explanation")');
      break;
    case 'explanation':
      hideVisibility(new Array('button_back'));
      showVisibility(new Array('button_continue'));
      document.getElementById('button_continue').setAttribute('onclick','postScreenFlow("references")');
      break;
  }
  /*Quitar foco de los botones*/
  document.getElementById('button_back').blur();
  document.getElementById('button_continue').blur();
  /*Inyectar texto*/
  document.getElementById('encabezado').innerHTML = lista[0];
  document.getElementById('information_span').innerHTML = lista[1];
}
/*Función que inserta el copyright en un párrafo*/
function insertCopyright() {
  "use strict";
  var copy = '&copy;' + insertDevelopers() + experiment.getYear() + '. Estás ' +
  'autorizado a utilizar este programa con fines de investigación ' +
  'o docencia, con o sin modificaciones, con la única condición de ' +
  'que cites a los autores, el nombre del programa y la página web ' +
  'donde puede descargarse. Se prohibe expresamente la publicación ' +
  'de este programa en otros sitios o medios, así como cualquier ' +
  'utilización comercial del mismo sin el permiso explícito de los ' +
  'autores.';
  return copy;
}
/*Función que inserta los desarrolladores en un párrafo*/
function insertDevelopers() {
  "use strict";
  var longitud = experiment.developers.length;
  var cadena = "";
  if(longitud === 1) {
    cadena = experiment.developers[0] + " ";
  } else {
    for(var i=0;i<longitud;i++) {
      if(i < longitud-2) {
        cadena = cadena + experiment.developers[i] + ", ";
      } else if(i < longitud-1) {
        cadena = cadena + experiment.developers[i];
      } else {
        if(experiment.getLanguage() === "es")
        {
          cadena = cadena + " y " + experiment.developers[i] + " ";
        }
        else if(experiment.getLanguage() === "en")
        {
          cadena = cadena + " and " + experiment.developers[i] + " ";
        }
      }
    }
  }
  return cadena;
}
/************************************************************************************************
******************************SLIDER SCREEN******************************************************
************************************************************************************************/
/*Pantalla previa a la pregunta del slider*/
function preQuestion() {
  "use strict";
  document.body.style.backgroundColor = "white";
  /*Ocultar pantalla de ensayos y pantalla de preguntas*/
  hideDisplay(['experiment','button_back']);
  showDisplay(['screen']);
  var encabezado = '';
  var texto = 'Ya has terminado de observar fichas médicas de pacientes. Ahora te vamos a pedir ' +
  'que respondas algunas preguntas.';
  hideVisibility(['button_back']);
  document.getElementById('button_continue').setAttribute('onclick','sliderQuestion()');
  removeFocus(['button_continue']);
  /*Inyectar texto*/
  document.getElementById('encabezado').innerHTML = encabezado;
  document.getElementById('information_span').innerHTML = texto;
}
function sliderQuestion() {
  "use strict";
  removeFocus(['button_continue']);
  showDisplay(['question']);
  var questionAndSlider = '¿Hasta qué punto crees que el Batatrim es efectivo para curar las crísis ' +
  'del Síndrome de Lindsay?<br>0: Nada efectivo.<br>50: Bastante efectivo.<br>100: Perfectamente ' +
  'efectivo.';
  var encabezado = '';
  var info = 'Haz click en la escala móvil de arriba y verás que aparece un cursor. ' +
  'Puedes arrastrar este cursor a cualquier punto de la escala. Una vez estés contento/a con ' +
  'tu respuesta, haz click en el botón de continuar.';
  /*Inyectar texto*/
  document.getElementById('encabezado').innerHTML = encabezado;
  document.getElementById('information_span').innerHTML = questionAndSlider;
  document.getElementById('question').innerHTML = sliderHtml();
  document.getElementById('loc_question_info').innerHTML = info;
  createSlider();
  hideVisibility(['button_continue','button_back']);
  hideDisplay(['loc_value_slide']);
  document.getElementById('knob').style.background = "#CCC";
  /*Función onclick*/
  document.getElementById('button_continue').setAttribute('onclick','saveSliderResponse()');
}
function sliderHtml() {
  "use strict";
  var code = '<div id="containerTable"><table id="sliderTable"><tr>' +
  '<td class="cell_value_left"><strong><span class="loc_min_value" id="loc_min_value">0</span></strong></td>' +
  '<td class="cslider_middle"><strong><span id="loc_middle_value" class="loc_middle_value"></span></strong></td>' +
  '<td class="cell_value_right"><strong><span class="loc_max_value" id="loc_max_value">100</span></strong></td></tr>'  +
  '<tr><td class="cell_value_left"></td><td class="cslider">' +
  '<div id="slider" class="slider"><div id="knob" class="knob"></div></div>' +
  '</td><td class="cell_value_right"></td></tr></table></div>' +
  '<div class="valueSlide"><p id="loc_value_slide" class="loc_value_slide"></p>' +
  '<p><span class="loc_question_info" id="loc_question_info"></span></p></div>';
  return code;
}
/***********************************************************************************************
*************************************SCREEN MEMORY TEST*****************************************
***********************************************************************************************/
function preMemoryTest() {
  "use strict";
  if(experiment.orden[1] === 'reconocimiento') {
    document.body.style.backgroundColor = "white";
    hideDisplay(['experiment','button_back']);
    showDisplay(['screen']);
  } else {
    hideDisplay(['question']);
  }
  removeFocus(['button_continue']);
  var encabezado = '';
  var texto = 'A continuación observarás, uno a uno, algunos de los pacientes cuya ficha ' +
  'médica has tenido la oportunidad de estudiar. Para cada uno de estos pacientes: <br>' +
  '- Tendrás que recordar si se le administró el Batatrim, o si por el contrario no se le administró nada.<br>' +
  '- Tendrás que recordar si superó la crisis o no.';
  document.getElementById('button_continue').setAttribute('onclick','memoryFlow(0)');
  document.getElementById('encabezado').innerHTML = encabezado;
  document.getElementById('information_span').innerHTML = texto;
}
/************************************************************************************************
************************************SCREEN RECO TEST*********************************************
************************************************************************************************/
function preRecoTest() {
  "use strict";
  /*Se comprueba el orden de ejecución*/
  if (experiment.orden[0] === 'reconocimiento') {
    document.body.style.backgroundColor = "white";
    hideDisplay(['experiment','button_back']);
    showDisplay(['screen']);
  } else {
    hideDisplay(['question']);
  }
  removeFocus(['button_continue']);
  var encabezado = '';
  var texto = 'A continuación vas a ver fotos de varias personas, presentadas siempre de una en una. ' +
  'En cada ocasión deberás indicar si se trata de un paciente cuya ficha médica observaste previamente ' +
  'o si por el contrario se trata de una persona nueva que no ha aparecido antes.';
  document.getElementById('button_continue').setAttribute('onclick','recogniseFlow(0)');
  document.getElementById('encabezado').innerHTML = encabezado;
  document.getElementById('information_span').innerHTML = texto;
}