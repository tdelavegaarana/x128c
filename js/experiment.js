function experiment () {
  // body...
  this.code = "";
  this.experimentName = "";
  this.year = String("2013");
  this.developers = new Array("Tomás de la Vega");
  /*mode value(online,offline)*/
  this.mode = String("online");
  /*config screen values: true or false*/
  this.configScreen = true;
  /*Lenguaje por defecto del experimento, se puede cambiar en función del grupo.*/
  this.language = String("es");
  this.groupNumber = 2;
  /*Balanceo*/
  this.group = null;
  /*Datos a recoger*/
  this.sex = null;
  this.age = null;
  /*Variables para recoger la pulsación de la barra
  espaciadora durante los ensayos*/
  this.pressedKey = false;
  this.activeKey = true;
  /********************/
  this.currentTrial = 0;
  this.idTimeInstructions = 0;
  this.timeInstructions = 0;
  /*Variable que recoge el valor seleccionado en las preguntas con el slider*/
  this.response = 0;
  /*Lista de fases.Entrenamiento,reconocimiento y memoria.*/
  this.phases = [[],[],[]];
  this.numberOfTrialsPerPhase = [40,16,8];
  this.currentPhase = 0;
  this.responsesSlider = [];
  this.orden = ['reconocimiento','slider'];
  /*Variables Test de Memoria*/
  this.clickInButtonsLine1 = false;
  this.clickInButtonsLine2 = false;
  this.activeButtonLine1 = 0;
  this.activeButtonLine2 = 0;
  this.entry = false;
  /*Get*/
  this.getCode = function(){return this.code;};
  this.getExperimentName = function(){return this.experimentName;};
  this.getYear = function(){return this.year;};
  this.getMode = function(){return this.mode;};
  this.getConfigScreen = function(){return this.configScreen;};
  this.getGroup = function(){return this.group;};
  this.getGroupNumber = function(){return this.groupNumber;};
  this.getSex = function(){return this.sex;};
  this.getAge = function(){return this.age;};
  this.getLanguage = function(){return this.language;};
  this.getCurrentTrial = function(){return this.currentTrial;};
  this.getCurrentPhase = function(){return this.currentPhase;};
  this.getCurrentContigency = function(){return this.contingency[this.currentPhase];};
  this.getTimeInstructions = function(){return this.timeInstructions;};
  this.getIdTimeInstructions = function(){return this.idTimeInstructions;};
  this.getNumberOfTrialsPerPhase = function(){return this.numberOfTrialsPerPhase[this.currentPhase];};
  this.getResponse = function(){return this.response;};
  /*Set*/
  this.setCode = function(code){this.code = code;};
  this.setExperimentName = function(name){this.experimentName = name;};
  this.setYear = function(year){this.year = year;};
  this.setMode = function(mode){this.mode = mode;};
  this.setConfigScreen = function(value){this.configScreen = value;};
  this.setGroup = function(group){this.group = group;};
  this.setSex = function(sex){this.sex = sex;};
  this.setAge = function(age){this.age = age;};
  this.setLanguage = function(language){this.language = language;};
  this.setTimeInstructions = function(seconds){this.timeInstructions = seconds;};
  this.setIdTimeInstructions = function(id){this.idTimeInstructions = id;};
  this.setCurrentTrial = function(currentTrial){this.currentTrial = currentTrial;};
  this.setCurrentPhase = function(currentPhase){this.currentPhase = currentPhase;};
  this.setResponse = function(value){this.response = value;};
  /*other functions*/
  this.addTrial = function(response,outcome){
      this.phases[this.currentPhase].push(new trial(response,outcome));
  };
  this.addCurrentTrial = function(){this.currentTrial++;};
  this.addCurrentPhase = function() {this.currentPhase++;};
  this.addCurrentQuestion = function(){this.currentQuestion++;};
  this.addTimeInstructions = function(){this.timeInstructions++;};
  this.generateGroup = function(){this.group = Math.floor((Math.random()*experiment.getGroupNumber())+1);};
  /*Función que configura el experimento*/
  this.init = function() {
      if(this.configScreen === true) {
          preScreensFlow('configure');
      } else {
        experiment.generateGroup();
        preScreensFlow('init');
      }
      this.availableResolution();
      this.randomOrden();
  };
  this.storeConfiguration = function() {
    var index = document.configure.grupo.selectedIndex;
    var value = document.configure.grupo.options[index].value;
    experiment.setGroup(value);
  };
  this.storeInfo = function(age, sex) {
    this.setAge(age);
    this.setSex(sex);
  };
  this.availableResolution = function() {
    "use strict";
    var width = screen.availWidth;
    var height = screen.availHeight;
    var resolution = String(Math.round(height*0.60)) + 'px';
    document.getElementById('information_article').style.height = resolution;
    if(experiment.getLanguage() === "es")
    {
      alert("Para correr el experimento en pantalla completa pulsa la tecla F11.");
    }
    else if(experiment.getLanguage() === "en")
    {
      alert("To run the experiment in full screen press F11.");
    }
  };
  this.randomOrden = function() {
    fisherYates(this.orden);
  };
  this.randomLoad = function() {
    var lista;
    if(this.group === "1") {
      lista = [15,5,15,5];
    } else {
      lista = [10,10,10,10];
    }
    var listTypeA = [];
    var listTypeB = [];
    var listTypeC = [];
    var listTypeD = [];
    var name = "";
    var arrayNames = ["Lucrecia","Amparo","Lola","Macarena","Sofía","Patricia","Lourdes","Elena",
    "Paula","Miriam","Lucía","Marta","Natividad","Isabel","Cristina","Ana","Aurora","Begoña",
    "Claudia","Daniela","Emma","Gabriela","Idoia","Julia","Arturo","Fernando","Daniel","Eduardo",
    "Germán","Ignacio","Manolo","Matías","Pablo","Bernardo","Enrique","Roberto","Carlos",
    "Carmelo","Samuel","Yago","Vicente","Miguel","Antonio","David","Edgar","Jaime","Luís","Ramón"];
    fisherYates(arrayNames);
    /*Training patients*/
    for(var i=0;i<lista[0];i++)
    {
        name = arrayNames.pop();
        this.phases[0].push(new trial("a",0,name));
        listTypeA.push(new trial("a",0,name));
    }
    for(i=0;i<lista[1];i++)
    {
        name = arrayNames.pop();
        this.phases[0].push(new trial("b",0,name));
        listTypeB.push(new trial("b",0,name));
    }
    for(i=0;i<lista[2];i++)
    {
        name = arrayNames.pop();
        this.phases[0].push(new trial("c",0,name));
        listTypeC.push(new trial("c",0,name));
    }
    for(i=0;i<lista[3];i++)
    {
        name = arrayNames.pop();
        this.phases[0].push(new trial("d",0,name));
        listTypeD.push(new trial("d",0,name));
    }
    /*Random list types*/
    fisherYates(listTypeA);
    fisherYates(listTypeB);
    fisherYates(listTypeC);
    fisherYates(listTypeD);
    /*Test de memoria phase[2],test de reconocimiento phase[1]*/
    /*Patients type a*/
    for(i=0;i<2;i++)
    {
        this.phases[2].push(listTypeA.pop());
        this.phases[1].push(listTypeA.pop());
    }
    /*Patients type b*/
    for(i=0;i<2;i++)
    {
        this.phases[2].push(listTypeB.pop());
        this.phases[1].push(listTypeB.pop());
    }
    /*Patients type c*/
    for(i=0;i<2;i++)
    {
        this.phases[2].push(listTypeC.pop());
        this.phases[1].push(listTypeC.pop());
    }
    /*Patients type d*/
    for(i=0;i<2;i++)
    {
        this.phases[2].push(listTypeD.pop());
        this.phases[1].push(listTypeD.pop());
    }
    /*Fase de reconocimiento pacientes no vistos*/
    for(i = 0; i < 8; i++) {
      name = arrayNames.pop();
      this.phases[1].push(new trial("",0,name));
    }
    /*Random lists*/
    for(i = 0; i < this.phases.length; i++) {
      fisherYates(this.phases[i]);
    }
    /*Free memory*/
    i = null;
    arrayNames = null;
    lista = null;
    listTypeA = null;
    listTypeB = null;
    listTypeC = null;
    listTypeD = null;
    name = null;
  };
}
function trial (type, response, name){
  this.type = type;
  this.response = response;
  this.name = name;
}
var experiment = new experiment();