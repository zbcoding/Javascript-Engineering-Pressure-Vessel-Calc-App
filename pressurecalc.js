//<SCRIPT language=javascript type=text/javascript>  
//assumes default will always be cylinder
//document.getElementById('geo').selectedIndex = 0;
    
var shape = "cylinder"
var cylH = document.getElementById('geo');
cylH.selectedIndex = 0;

function showHide() {

    if (shape == "cylinder") {
    shape = "sphere";
    document.getElementById("cylButton").style.visibility="collapse";
    document.getElementById("cylVonMises").style.visibility="collapse";
    document.getElementById("sphereButton").style.visibility="visible";
    document.getElementById("axialStress").style.visibility="collapse";
    //drawing
    document.getElementById("sphereT").style.visibility="visible";
    document.getElementById("cylT").style.visibility="hidden";
    }
    else if (shape=="sphere")
        {   
            shape = "cylinder";
            document.getElementById("sphereButton").style.visibility="collapse";
            document.getElementById("cylButton").style.visibility="visible";
            document.getElementById("cylVonMises").style.visibility="visible";
            document.getElementById("axialStress").style.visibility="visible";
            //drawing
            document.getElementById("sphereT").style.visibility="hidden";
            document.getElementById("cylT").style.visibility="visible";
        }
    else
        {
        //nothing    
        }
}        
    
function compute(f) {
 
//var currentTime = new Date();
 
var or = parseFloat(f.outr.value);
var ir = parseFloat(f.innr.value);
var op = parseFloat(f.outp.value);
var ip = parseFloat(f.inp.value);
var radius = parseFloat(f.r.value);
    
var p1 = parseFloat(f.p.selectedIndex) + 1.;
    
var convLength = [0.001, 0.01, 1, 0.0254, (12*0.0254)];
var convPressure = [1000000, 1000, 1, 1/0.000145037738007, 1000*(1/0.000145037738007), 1000000*(1/0.000145037738007) ];
var convAnswer = [1/1000000, 1/1000, 1, 0.000145037738007, 0.000000145037738007, 0.000000000145037738007 ];
    
 
var cr = convLength[parseFloat(f.ropt.selectedIndex) ] ;
var cir = convLength[parseFloat(f.innro.selectedIndex)];
var cor = convLength[parseFloat(f.outro.selectedIndex)];
console.log(cor);
var cip = convPressure[parseFloat(f.innpo.selectedIndex)];
var cop = convPressure[parseFloat(f.outpo.selectedIndex)];
var cuanswer = convAnswer[parseFloat(f.answerUnits.selectedIndex)];

//converts values to meter and Pa before doing calculations
//convAnswer converts from meter, Pa to desired pressure units after calculations
    
console.log(or);
console.log(ir);
console.log(op);
console.log(ip);
console.log(radius);
    
var or = cor*or;
var ir = cir*ir;
var op = cop*op;
var ip = cip*ip;
var radius = cr*radius;

console.log(or);
console.log(ir);
console.log(op);
console.log(ip);
console.log(radius);  
 
if(ir > or) 
    {
     alert("Error - Inner radius cannot be larger than outer radius"); 
     return "Error"
    } 
    
if(or <=0 || ir <=0) 
    {
     alert("Error - Radius must be a positive value"); 
     return "Error"
    }   
if(radius > or || radius < ir)
    {
     alert("Error - Radius entered is not between inner and outer radius")
     return "Error"
    }
    
/*
//comment out after testing
f.r.value = radius.toPrecision(p1);      
f.outr.value= or.toPrecision(p1);
f.innr.value= ir.toPrecision(p1);
f.outp.value = op.toPrecision(p1);
f.inp.value = ip.toPrecision(p1);
//
*/                

var astress, cstress, rstress, vonmises;
    
f.astress.value= astress = (cuanswer*((ip*Math.pow(ir,2) - op*Math.pow(or,2) )/(Math.pow(or,2) - Math.pow(ir,2))  )          ).toPrecision(p1) ;    

f.cstress.value = cstress = (cuanswer*(((ip*Math.pow(ir,2) - op*Math.pow(or,2) ) / (Math.pow(or,2) - Math.pow(ir,2))) - ((Math.pow(ir,2)*Math.pow(or,2) * (op - ip) ) / (Math.pow(radius,2) * (Math.pow(or,2) - Math.pow(ir,2))))  )     ).toPrecision(p1);

f.rstress.value = rstress = (cuanswer*(((ip*Math.pow(ir,2) - op*Math.pow(or,2) ) / (Math.pow(or,2) - Math.pow(ir,2))) + ((Math.pow(ir,2)*Math.pow(or,2) * (op - ip) ) / (Math.pow(radius,2) * (Math.pow(or,2) - Math.pow(ir,2))))   )   ).toPrecision(p1); 
    
 if( isNaN(astress) || isNaN(cstress)  || isNaN(rstress) )  {
//check
     
        f.astress.value = "Error";
        f.cstress.value = "Error";
        f.rstress.value = "Error";
        f.vstress.value = "Error";
        return Error;
 } 


var cylstress = [astress, cstress, rstress];
var pcs = cylstress.sort(); //principal Cyl. stresses
console.log(pcs);
    
f.vstress.value = vonmises = (  Math.sqrt((Math.pow((pcs[0] - pcs[1]),2) + Math.pow((pcs[1]-pcs[2]),2) + Math.pow((pcs[2]-pcs[0]),2))/2)  ).toPrecision(p1);
} 
    
function computeSphere(f) {
 
//var currentTime = new Date();
 
var or = parseFloat(f.outr.value);
var ir = parseFloat(f.innr.value);
var op = parseFloat(f.outp.value);
var ip = parseFloat(f.inp.value);
var radius = parseFloat(f.r.value);
var p1 = parseFloat(f.precision.selectedIndex) + 1.;
    
var convLength = [0.001, 0.01, 1, 0.0254, (12*0.0254)];
var convPressure = [1000000, 1000, 1, 1/0.000145037738007, 1000*(1/0.000145037738007), 1000000*(1/0.000145037738007) ];
var convAnswer = [1/1000000, 1/1000, 1, 0.000145037738007, 0.000000145037738007, 0.000000000145037738007 ];
    
 
var cr = convLength[parseFloat(f.ropt.selectedIndex) ] ;
var cir = convLength[parseFloat(f.innro.selectedIndex)];
var cor = convLength[parseFloat(f.outro.selectedIndex)];
console.log(cor);
var cip = convPressure[parseFloat(f.innpo.selectedIndex)];
var cop = convPressure[parseFloat(f.outpo.selectedIndex)];
var cuanswer = convAnswer[parseFloat(f.answerUnits.selectedIndex)];

//converts values to meter and Pa before doing calculations
//convAnswer converts from meter, Pa to desired pressure units after calculations
    
console.log(or);
console.log(ir);
console.log(op);
console.log(ip);
console.log(radius);
    
var or = cor*or;
var ir = cir*ir;
var op = cop*op;
var ip = cip*ip;
var radius = cr*radius;

console.log(or);
console.log(ir);
console.log(op);
console.log(ip);
console.log(radius);  
    
 if(ir > or) 
    {
     alert("Error - Inner radius cannot be larger than outer radius"); 
     return "Error"
    }   
    
if(or <=0 || ir <=0) 
    {
     alert("Error - Radius must be a positive value"); 
     return "Error"
    }   
    
if(radius > or || radius < ir)
    {
     alert("Error - Radius entered is not between inner and outer radius")
     return "Error"
    }
/*
//comment out after testing
f.r.value = radius.toPrecision(p1);      
f.outr.value= or.toPrecision(p1);
f.innr.value= ir.toPrecision(p1);
f.outp.value = op.toPrecision(p1);
f.inp.value = ip.toPrecision(p1);
//
*/                

var astress, cstress, rstress, vonmises;
    
f.astress.value= astress = "-----" ;    
f.rstress.value = rstress = (cuanswer*(  ((op*Math.pow(or,3)) / Math.pow(radius,3)) * ((Math.pow(radius,3)-Math.pow(ir,3))/(Math.pow(ir,3)-Math.pow(or,3)))     + ((ip*Math.pow(ir,3))/(Math.pow(radius,3))) * ((Math.pow(or,3)-Math.pow(radius,3))/(Math.pow(ir,3)-Math.pow(or,3))))     ).toPrecision(p1);
f.cstress.value = cstress = (cuanswer*(  ((op*Math.pow(or,3)) / (2*Math.pow(radius,3))) * ((2*Math.pow(radius,3)+Math.pow(ir,3))/(Math.pow(ir,3)-Math.pow(or,3)))     - ((ip*Math.pow(ir,3))/(2*Math.pow(radius,3))) * ((2*Math.pow(radius,3)+Math.pow(or,3))/(Math.pow(ir,3)-Math.pow(or,3)))    )         ).toPrecision(p1); 
    
 if( isNaN(cstress) || isNaN(rstress) )  {
//check
     
        f.astress.value = "Error";
        f.cstress.value = "Error";
        f.rstress.value = "Error";
        f.vstress.value = "Error";
        return Error;
 } 


var cylstress = [astress, cstress, rstress];
var pcs = cylstress.sort(); //principal Cyl. stresses
console.log(pcs);
    
f.vstress.value = vonmises = "-----";
} 

//</SCRIPT>