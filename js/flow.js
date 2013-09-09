/*Función que guarda la edad y sexo seleccionado por el experimentador*/
function storeParticipantData() {
  "use strict";
  var age = document.forms.input.edad.value;
  if(age === null || age === "") {
    alert("Introduzca la edad.");
    return;
  } else if(isNaN(age)){
    alert("En el campo edad solo se pueden introducir digitos.");
    return;
  }
  age = parseInt(age,10);
  var sex = document.input.sexo.options[document.input.sexo.selectedIndex].value;
  experiment.storeInfo(age, sex);
  preScreensFlow("instructions");
}
/**************************************************************************
***************************************************************************
************************Experiment Functions*******************************
***************************************************************************
**************************************************************************/

/*Flujo fase de entrenamiento*/
function trainingFlow(state) {
  "use strict";
  switch(state){
    case 0:
      /*Ocultar instrucciones mostrar paneles flujo entrenamiento*/
      hideDisplay(["screen"]);
      showDisplay(["experiment"]);
      document.body.style.backgroundColor="SteelBlue";
      trainingFlow(1);
    break;
    case 1:
      /*Mostrar al participante la pregunta*/
      var textPanel1 = 'Este paciente sufre una crisis del Síndrome de Lindsay';
      var source = 'pictures/' + experiment.phases[experiment.getCurrentPhase()][experiment.getCurrentTrial()].name + '.JPG';
      insertImages(['faceImage'],[source]);
      var textPanel2 = '';
      var type = experiment.phases[experiment.getCurrentPhase()][experiment.getCurrentTrial()].type;
      if(type === 'a' || type === "b") {
        textPanel2 = 'Se le administró el Batatrim';
        insertImages(['medicineImage'],['pictures/Batatrim.jpg']);
      } else {
        textPanel2 = 'No se le administró el Batatrim';
        insertImages(['medicineImage'],['pictures/white.jpg']);
      }
      var textPanel3 = '¿Crees que superará la crisis?';
      /*Insertar textos*/
      injectText(['loc_panel1_text','loc_panel2_text','loc_panel3_text'],[textPanel1,textPanel2,textPanel3]);
      /*Mostrar Elementos*/
      showDisplay(['loc_panel1_text','imagePanel1','loc_panel2_text','imagePanel2','loc_panel3_text','buttons']);
      break;
    case 2:
      /*Ocultar los botones*/
      hideDisplay(['buttons']);
      if(experiment.phases[experiment.getCurrentPhase()][experiment.getCurrentTrial()].type === 'a' || experiment.phases[experiment.getCurrentPhase()][experiment.getCurrentTrial()].type === 'c') {
        textPanel3 = "El paciente <span style='color: green; font-weight: bold;'>sí</span> ha superado la crisis.";
      } else {
        textPanel3 = "El paciente <span style='color: red; font-weight: bold;'>no</span> ha superado la crisis.";
      }
      injectText(['loc_panel3_text'],[textPanel3]);
      setTimeout("trainingFlow(3)", 3000);
      break;
    case 3:
      /*Se comprueba si hay más ensayos*/
      experiment.addCurrentTrial();
      //if(experiment.getCurrentTrial() === 1) {
      if(experiment.getCurrentTrial() === experiment.phases[experiment.getCurrentPhase()].length) {
        /*Fin del entrenamiento vamos a la pantalla de la pregunta*/
        experiment.addCurrentPhase();
        experiment.setCurrentTrial(0);
        if (experiment.orden[0] === 'reconocimiento') {
          //Pasamos al test de reconocimiento
          preRecoTest();
        } else if(experiment.orden[0] === 'slider') {
          //Pasamos a la pregunta
          preQuestion();
        }
      } else {
        hideDisplay(['loc_panel1_text','imagePanel1','loc_panel2_text','imagePanel2','loc_panel3_text','buttons']);
        setTimeout("trainingFlow(1)", 1000);
      }
      break;
  }
}
function responseTraining(value) {
  "use strict";
  if(value === 0) {
    removeFocus(['buttonNo']);
  } else {
    removeFocus(['buttonYes']);
  }
  experiment.phases[experiment.getCurrentPhase()][experiment.getCurrentTrial()].response = value;
  trainingFlow(2);
}
/***************************************************************************************************
****************************FIN CÓDIGO TRAINING FLOW************************************************
***************************************************************************************************/
function saveSliderResponse() {
  "use strict";
  /*Se oculta el div question*/
  hideDisplay(['question']);
  /*Guardamos el valor de la respuesta*/
  experiment.responsesSlider.push(experiment.getResponse());
  /*Comprobación del orden para determinar el flujo de la aplicación*/
  /*Si el flujo es slider,reconocimiento. Debemos de ir al test de reconocimiento*/
  /*Si el flujo es reconocimiento,slider. Debemos de ir al test de memoria*/
  if (experiment.orden[0] === 'slider') {
    /*Vamos al test de reconocimiento*/
    preRecoTest();
  } else {
    /*Vamos al test de memoria*/
    preMemoryTest();
  }
}
/*****************************************************************************************************
***********************************CÓDIGO TEST DE RECONOCIMIENTO**************************************
*****************************************************************************************************/
function recogniseFlow(state) {
  "use strict";
  switch(state){
    case 0:
      document.body.style.backgroundColor="SteelBlue";
      hideDisplay(['screen','loc_panel1_text','imagePanel1','panel2','loc_panel3_text','buttons']);
      showDisplay(['experiment']);
      var question = '¿Es ésta persona uno de los pacientes que has visto anteriormente?';
      injectText(['loc_panel3_text'],[question]);
      var elementYes = document.getElementById('buttonYes');
      var elementNo = document.getElementById('buttonNo');
      elementYes.setAttribute('onclick','recogniseResponse(1)');
      elementNo.setAttribute('onclick','recogniseResponse(0)');
      recogniseFlow(1);
      break;
    case 1:
      var source = 'pictures/' + experiment.phases[experiment.getCurrentPhase()][experiment.getCurrentTrial()].name + '.JPG';
      insertImages(['faceImage'],[source]);
      showDisplay(['imagePanel1','buttons','loc_panel3_text']);
      break;
    case 2:
      hideDisplay(['imagePanel1','buttons','loc_panel3_text']);
      experiment.addCurrentTrial();
      if(experiment.getCurrentTrial() ===  experiment.phases[experiment.getCurrentPhase()].length) {
        /*Fin de la fase de reconocimiento*/
        experiment.addCurrentPhase();
        experiment.setCurrentTrial(0);
        if(experiment.orden[0] === 'slider') {
          /*Va al test de memoria*/
          preMemoryTest();
        } else {
          /*Va a la pregunta*/
          preQuestion();
        }
      } else {
        setTimeout('recogniseFlow(1)',1000);
      }
      break;
  }
}
function recogniseResponse(value) {
  "use strict";
  var type = experiment.phases[experiment.getCurrentPhase()][experiment.getCurrentTrial()].type;
  if(value === 1 && (type === 'a' || type === 'b' || type === 'c' || type === 'd')){
    experiment.phases[experiment.getCurrentPhase()][experiment.getCurrentTrial()].response = 1;
  } else if(value === 0 && type === '') {
    experiment.phases[experiment.getCurrentPhase()][experiment.getCurrentTrial()].response = 1;
  } else {
    experiment.phases[experiment.getCurrentPhase()][experiment.getCurrentTrial()].response = 0;
  }
  removeFocus(['buttonNo','buttonYes']);
  recogniseFlow(2);
}
/*************************************************************************************************
*******************************************MEMORY SCREEN******************************************
*************************************************************************************************/
function memoryFlow(state) {
  "use strict";
  switch(state){
    case 0:
      document.body.style.backgroundColor="SteelBlue";
      /*Se eliminan los nodos hijos de experiment*/
      var list = document.getElementById('experiment');
      for (var i = 0; i < list.childNodes.length; i++) {
        list.removeChild(list.childNodes[i]);
      }
      var content = estructura();
      var texto = 'Haz click en un botón u otro en función de la opción que elijas y después haz click en el botón CONTINUAR.';
      injectText(['experiment','loc_memory_information'],[content,texto]);
      hideDisplay(['screen']);
      showDisplay(['experiment']);
      disabledButtons(['buttonMemoryContinue']);
      hideMemoryElements();
      memoryFlow(1);
    break;
    case 1:
      var source = 'pictures/' + experiment.phases[experiment.getCurrentPhase()][experiment.getCurrentTrial()].name + '.JPG';
      insertImages(['faceImage'],[source]);
      showMemoryElements();
    break;
    case 2:
      /*Selected buttons and remove focus to buttons*/
      if(experiment.activeButtonLine1 == 1 && experiment.activeButtonLine2 == 3)
      {
          experiment.phases[experiment.getCurrentPhase()][experiment.getCurrentTrial()].response = "a";
          removeFocus(['buttonMemoryPanel2Yes','buttonMemoryPanel3Yes']);
      }
      else if(experiment.activeButtonLine1 == 1 && experiment.activeButtonLine2 == 4)
      {
          experiment.phases[experiment.getCurrentPhase()][experiment.getCurrentTrial()].response = "b";
          removeFocus(['buttonMemoryPanel2Yes','buttonMemoryPanel3No']);
      }
      else if(experiment.activeButtonLine1 == 2 && experiment.activeButtonLine2 == 3)
      {
          experiment.phases[experiment.getCurrentPhase()][experiment.getCurrentTrial()].response = "c";
          removeFocus(['buttonMemoryPanel2No','buttonMemoryPanel3Yes']);
      }
      else if(experiment.activeButtonLine1 == 2 && experiment.activeButtonLine2 == 4)
      {
          experiment.phases[experiment.getCurrentPhase()][experiment.getCurrentTrial()].response = "d";
          removeFocus(['buttonMemoryPanel2No','buttonMemoryPanel3No']);
      }
      borderColor("buttonMemoryPanel2Yes","#a1a1a1");
      borderColor("buttonMemoryPanel2No","#a1a1a1");
      borderColor("buttonMemoryPanel3Yes","#a1a1a1");
      borderColor("buttonMemoryPanel3No","#a1a1a1");
      /*Reset variables*/
      experiment.clickInButtonsLine1 = false;
      experiment.clickInButtonsLine2 = false;
      experiment.activeButtonLine1 = 0;
      experiment.activeButtonLine2 = 0;
      /*Disable Button*/
      disabledButtons(['buttonMemoryContinue']);
      memoryFlow(3);
    break;
    case 3:
      hideMemoryElements();
      experiment.addCurrentTrial();
      if(experiment.getCurrentTrial() ===  experiment.phases[experiment.getCurrentPhase()].length) {
        /*Fin de la fase de memoria*/
        hideDisplay(['experiment']);
        document.body.style.backgroundColor="white";
        showDisplay(['screen','button_back']);
        postScreenFlow('send');
      } else {
        setTimeout('memoryFlow(1)',1000);
      }
    break;
  }
}
function responseMemoryTest(buttonId) {
  "use strict";
  switch(buttonId)
  {
      case 1:
          experiment.activeButtonLine1 = buttonId;
          if(experiment.clickInButtonsLine1 === false)
          {
              experiment.clickInButtonsLine1 = true;
              if(experiment.clickInButtonsLine2 === true)
              {
                  enabledButtons(['buttonMemoryContinue']);
              }
          }
          /*Activar y quitar foco*/
         borderColor("buttonMemoryPanel2Yes","#66FFFF");
         borderColor("buttonMemoryPanel2No","#a1a1a1");
      break;
      case 2:
          experiment.activeButtonLine1 = buttonId;
          if(experiment.clickInButtonsLine1 === false)
          {
              experiment.clickInButtonsLine1 = true;
              if(experiment.clickInButtonsLine2 === true)
              {
                  enabledButtons(['buttonMemoryContinue']);
              }
          }
          /*Activar y quitar foco*/
         borderColor("buttonMemoryPanel2No","#66FFFF");
         borderColor("buttonMemoryPanel2Yes","#a1a1a1");
      break;
      case 3:
          experiment.activeButtonLine2 = buttonId;
          if(experiment.clickInButtonsLine2 === false)
          {
              experiment.clickInButtonsLine2 = true;
              if(experiment.clickInButtonsLine1 === true)
              {
                  enabledButtons(['buttonMemoryContinue']);
              }
          }
          /*Activar y quitar foco*/
         borderColor("buttonMemoryPanel3Yes","#66FFFF");
         borderColor("buttonMemoryPanel3No","#a1a1a1");
      break;
      case 4:
          experiment.activeButtonLine2 = buttonId;
          if(experiment.clickInButtonsLine2 === false)
          {
              experiment.clickInButtonsLine2 = true;
              if(experiment.clickInButtonsLine1 === true)
              {
                  enabledButtons(['buttonMemoryContinue']);
              }
          }
          /*Activar y quitar foco*/
         borderColor("buttonMemoryPanel3No","#66FFFF");
         borderColor("buttonMemoryPanel3Yes","#a1a1a1");
      break;
  }
}
function hideMemoryElements() {
  "use strict";
  hideDisplay(['imagePanel1','buttonMemoryPanel2Yes','buttonMemoryPanel2No','buttonMemoryPanel3Yes','buttonMemoryPanel3No','buttonMemoryContinue','loc_memory_information']);
}
function showMemoryElements() {
  "use strict";
  showDisplay(['imagePanel1','buttonMemoryPanel2Yes','buttonMemoryPanel2No','buttonMemoryPanel3Yes','buttonMemoryPanel3No','buttonMemoryContinue','loc_memory_information']);
}
function estructura() {
  "use strict";
  var contenido = '<div id="memoryPanel1" class="panel">' +
  '<div class="imagePanel1" id="imagePanel1">' +
  '<img id="faceImage" class="faceImage">' +
  '</div></div>' +
  '<div id="memoryPanel2" class="panel">' +
  '<table id="buttonsMemoryPanel2" class="buttonsMemoryTestPanel2"><tr>' +
  '<th><button type="buttton"class="buttonsMemoryPanel2" id="buttonMemoryPanel2Yes" onclick="responseMemoryTest(1);">Se le administró el Batatrim <img src="pictures/iconobatatrim.png"></button></th>' +
  '<th><button type="button" class="buttonsMemoryPanel2" id="buttonMemoryPanel2No" onclick="responseMemoryTest(2);">No se le administró nada</button></th>' +
  '</tr></table></div>' +
  '<div id="memoryPanel3" class="panel">' +
  '<table id="buttonsMemoryPanel3" class="buttonsMemoryTestPanel3"><tr>' +
  '<th><button type="button"  class="buttonsMemoryPanel3" id="buttonMemoryPanel3Yes" onclick="responseMemoryTest(3);">Superó la crisis</button></th>' +
  '<th><button type="button"  class="buttonsMemoryPanel3" id="buttonMemoryPanel3No" onclick="responseMemoryTest(4);">No superó la crisis</button></th>' +
  '</tr></table></div>' +
  '<div id="memoryPanel4" class="memoryPanel4">' +
  '<span id="loc_memory_information" class="loc_memory_information"></span><br>' +
  '<button id="buttonMemoryContinue" class="buttonContinue" onclick="memoryFlow(2);">Continuar</button>' +
  '</div>';
  return contenido;
}
/**********************************************************************************************************
*************************************GUARDAR DATOS*********************************************************
**********************************************************************************************************/
function saveData() {
  "use strict";
  var data = "";
  var fecha = new Date();
  var navegador = browserDetect();
  var orden = 0;
  if(experiment.orden[0] === 'reconocimiento'){
    orden = 1;
  } else {
    orden = 2;
  }
  data = navegador + "," + stringDate() + "," + Math.floor((Math.random()*1000000)+1) + "," +
  orden + "," + experiment.getGroup() + "," + experiment.getSex() + "," + experiment.getAge() + ",";
  /*Juicio de efectividad*/
  data = data + experiment.responsesSlider[0] + "," ;
  /*Test de reconocimiento respuestas preguntas tipo a*/
  for (var i = 0; i < experiment.phases[1].length; i++) {
      if(experiment.phases[1][i].type === 'a') {
        data = data + experiment.phases[1][i].response + ",";
      }
  }
  /*Test de reconocimiento respuestas preguntas tipo b*/
  for (i = 0; i < experiment.phases[1].length; i++) {
      if(experiment.phases[1][i].type === 'b') {
        data = data + experiment.phases[1][i].response + ",";
      }
  }
  /*Test de reconocimiento respuestas preguntas tipo c*/
  for (i = 0; i < experiment.phases[1].length; i++) {
      if(experiment.phases[1][i].type === 'c') {
        data = data + experiment.phases[1][i].response + ",";
      }
  }
  /*Test de reconocimiento respuestas preguntas tipo d*/
  for (i = 0; i < experiment.phases[1].length; i++) {
      if(experiment.phases[1][i].type === 'd') {
        data = data + experiment.phases[1][i].response + ",";
      }
  }
  /*Test de reconocimiento respuestas a pacientes no vistos en el entrenamiento*/
  for (i = 0; i < experiment.phases[1].length; i++) {
    if(experiment.phases[1][i].type === ""){
      data = data + experiment.phases[1][i].response + ",";
    }
  }
  /*Tipo de celda en cada ensayo del entrenamiento*/
  for (i = 0; i < experiment.phases[0].length; i++) {
    data = data + experiment.phases[0][i].type + ",";
  }
  /*Tipo de celda en cada ensayo del test de reconocimiento*/
  for (i = 0; i < experiment.phases[1].length; i++) {
    if(experiment.phases[1][i].type === "") {
      data = data + 'X,';
    } else {
      data = data + experiment.phases[1][i].type + ",";
    }
  }
  /*Nombre del paciente aparecido en cada ensayo del entrenamiento*/
  for (i = 0; i < experiment.phases[0].length; i++) {
    data = data + experiment.phases[0][i].name + ",";
  }
  /*Nombre del paciente aparecido en cada ensayo del test de reconocimiento*/
  for (i = 0; i < experiment.phases[1].length; i++) {
    data = data + experiment.phases[1][i].name + ",";
  }
  /*Predicción hecha en cada ensayo del entrenamiento*/
  for (i = 0; i < experiment.phases[0].length; i++) {
    data = data + experiment.phases[0][i].response + ",";
  }
  /*Test de memoria respuestas preguntas tipo a*/
  for (i = 0; i < experiment.phases[2].length; i++) {
    if(experiment.phases[2][i].type === 'a') {
      data = data + experiment.phases[2][i].response + ",";
    }
  }
  /*Test de memoria respuestas preguntas tipo b*/
  for (i = 0; i < experiment.phases[2].length; i++) {
    if(experiment.phases[2][i].type === 'b') {
      data = data + experiment.phases[2][i].response + ",";
    }
  }
  /*Test de memoria respuestas preguntas tipo c*/
  for (i = 0; i < experiment.phases[2].length; i++) {
    if(experiment.phases[2][i].type === 'c') {
      data = data + experiment.phases[2][i].response + ",";
    }
  }
  /*Test de memoria respuestas preguntas tipo d*/
  for (i = 0; i < experiment.phases[2].length; i++) {
    if(experiment.phases[2][i].type === 'd') {
      data = data + experiment.phases[2][i].response + ",";
    }
  }
  /*Nombre del paciente aparecido en cada ensayo del test de memoria*/
  for (i = 0; i < experiment.phases[2].length; i++) {
    data = data + experiment.phases[2][i].name + ",";
  }
  /*Enviar datos*/
  if(experiment.getMode() === "online") {
    sendEmail(String(data));
  } else {
    sendBrowser(String(data));
  }
}