function sendEmail(data) {
  "use strict";
    if (window.XMLHttpRequest) { // code for IE7+, Firefox, Chrome, Opera, Safari
        xmlhttp = new XMLHttpRequest();
    } else { // code for IE6, IE5
        xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
    }
    xmlhttp.open("POST", "Datasent.asp", true);
    xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xmlhttp.send("data="+data);
}
function stringDate() {
  "use strict";
  var fecha = new Date();
  return(String(fecha.getDate() + "/" + (fecha.getMonth()+1) + "/" + fecha.getFullYear() +
  "-" + fecha.getHours() + ":" + fecha.getMinutes() + ":" + fecha.getSeconds()));
}
function sendBrowser(data) {
  "use strict";
  if(typeof(Storage)!=="undefined") {
      // Yes! localStorage and sessionStorage support!
      var id = "";
      id = experiment.getCode() + stringDate();
      localStorage.setItem(id,data);
    } else {
      // Sorry! No web storage support..
    }
}
/*
 * Dectect browser 
 */
function browserDetect()
{
  "use strict";
  if(navigator.userAgent.toLowerCase().indexOf('chrome') !=-1)
  {
    return 'Chrome';
  }
  if (navigator.userAgent.indexOf('MSIE') !=-1)
  {
        return 'Internet Explorer';
  }
  if (navigator.userAgent.indexOf('Firefox') !=-1)
  {
        return 'Firefox';
  }
  if (navigator.userAgent.indexOf('Safari') !=-1)
  {
    return 'Safari';
  }
  else
  {
    return 'Navegador desconocido';
  }
}
function fisherYates (myArray) {
  "use strict";
  var i = myArray.length, j, tempi, tempj;
  if ( i === 0 ) return false;
  while ( --i ) {
     j = Math.floor( Math.random() * ( i + 1 ) );
     tempi = myArray[i];
     tempj = myArray[j];
     myArray[i] = tempj;
     myArray[j] = tempi;
   }
}
/*Information about style.visibility and style.display*/
/*Hiding an element can be done by setting the display property to "none" or
the visibility property to "hidden". However, notice that these two methods
produce different results:
visibility:hidden hides an element, but it will still take up the same space
as before. The element will be hidden, but still affect the layout.
display:none hides an element, and it will not take up any space. The element
will be hidden, and the page will be displayed as if the element is not there*/
/*Hide and show elements*/
function hideVisibility(elementsList) {
  "use strict";
  for (var i=0;i<elementsList.length;i++) {
    document.getElementById(elementsList[i]).style.visibility = "hidden";
  }
}
function showVisibility(elementsList) {
  "use strict";
  for (var i=0;i<elementsList.length;i++) {
    document.getElementById(elementsList[i]).style.visibility = "visible";
  }
}
/*Hide and show messages*/
function hideDisplay(elementsList) {
  "use strict";
  for (var i=0;i<elementsList.length;i++) {
    document.getElementById(elementsList[i]).style.display = "none";
  }
}
function showDisplay(elementsList) {
  "use strict";
  for (var i=0;i<elementsList.length;i++) {
    document.getElementById(elementsList[i]).style.display = "block";
  }
}
/*Insert text*/
function injectText(idList,textList) {
  "use strict";
  for (var i=0;i<idList.length;i++) {
    document.getElementById(idList[i]).innerHTML = textList[i];
  }
}
/*Insert images*/
function insertImages(idList,sourceList) {
  "use strict";
  for (var i=0;i<idList.length;i++) {
    document.getElementById(idList[i]).src = sourceList[i];
  }
}
/*Focus remove*/
function removeFocus(idList) {
  "use strict";
  for(var i=0;i<idList.length;i++) {
    document.getElementById(idList[i]).blur();
  }
}
/*activar desactivar botones*/
function enabledButtons(idList) {
  "use strict";
  for(var i=0;i<idList.length;i++) {
    var button = document.getElementById(idList[i]);
    button.disabled = false;
  }
}
function disabledButtons(idList) {
  "use strict";
  for(var i=0;i<idList.length;i++) {
    var button = document.getElementById(idList[i]);
    button.disabled = true;
  }
}
function borderColor(id,color)
{
  document.getElementById(id).style.borderColor=color;
}
function createSlider() {
  "use strict";
  jQuery.noConflict();
  var slider = $('slider');
  new Slider(slider, slider.getElement('.knob'), {
    range: [0,100],
    steps: 100,
    onChange: function(value){
      document.getElementById('knob').style.background = "blue";
      if(experiment.getLanguage() === "en")
        document.getElementById('loc_value_slide').innerHTML = 'Response: ' + value;
      else
        document.getElementById('loc_value_slide').innerHTML = 'Respuesta: ' + value;
      showVisibility(['button_continue']);
      showDisplay(['loc_value_slide']);
      experiment.setResponse(value);
    }
  });
}