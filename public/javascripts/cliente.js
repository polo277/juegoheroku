$(document).ready(function(){

    //var socket=io.connect('10.10.2.213:3000');//Establezco un socket con el servidor en este caso como es la misma máquina localhost
    //var socket=io.connect('192.168.1.213:3000');
    var socket=io.connect();

    var butacasLibres = [];
    var butacasOcupadas = [];
    var random;
    var pasa = false;
    //var usuarios = [];


    /*socket.on('usuarios', function(data){ 
        usuarios = data;
        for(i=0;i<usuarios.length;i++){
            console.log(usuarios[i]);
        }
    });

    for(i=0;i<usuarios.length;i++){
        console.log(usuarios[i]);
    }*/

	socket.on('connect',function(){
		console.log("client connect");
        $("#sala").hide();
        $("#dist").hide();
	});

    socket.on('numero', function(data){
        console.log(data);
        random = data;
    });

    socket.on('ganador', function(data) {
        alert(data);
        location.reload();
    });

    $("#user").append("User: <input id='username' type='text'/><a id='login' href='#'> login</a>");
    $("#login").click(function() {
        if($("#username").val() != "") {
            /*if(usuarios[i] != $("#username").val()) {
                console.log(usuarios[i]+"-"+$("#username").val())
                pasa=true;
            } else {
                pasa=false;
            }
            if(pasa==true) {*/
                socket.emit('username', $("#username").val());
                $("#user").hide();
                $("#sala").show();
                $("#dist").show();
            /*} else {
                alert("ese nombre ya esta ocupado");
            }*/
        } else {
            alert("no has metido ningun nombre");
        }
    });
     
    /*socket.on('random', funtion(data) {
        var random=parseint(data/10);
    });*/

	$("#sala").click(function() {
        socket.emit("send",butacasOcupadas);
        console.log("canvas"+random);
        /*r=Math.floor(random/10);
        console.log(x);
        if(x>5){
            console.log("muy lejos");
        } else if(x>3||x<5) {
            console.log("caliente");
        } else if(x>1||x<3) {
            console.log("estas casi casi");
        } else if(x=0) {
            console.log("te estas quemando");
        }*/
    });

	for(i=0;i<100;i++){
        butacasLibres[i] = "canvas"+i;
        if(butacasOcupadas[i] != butacasLibres[i]) {
            $("#sala").append("<canvas id='canvas"+i+"' height=50 width=50 style='border: 1px solid black'></canvas>"); 
            var elemento = document.getElementById("canvas"+i);
            if(elemento && elemento.getContext) {
                var contexto = elemento.getContext('2d');
                if(contexto){
                        contexto.fillStyle = 'rgb(128,255,0)';
                        contexto.fillRect(0,0,50,50);
                }
            }
        } else if(butacasOcupadas[i] == butacasLibres[i]) {
            $("#sala").append("<canvas id='canvas"+i+"' height=50 width=50 style='border: 1px solid black'></canvas>"); 
            var elemento = document.getElementById("canvas"+i);
            if(elemento && elemento.getContext) {
                var contexto = elemento.getContext('2d');
                if(contexto){
                        contexto.fillStyle = 'rgb(255,128,0)';
                        contexto.fillRect(0,0,50,50);
                }
            }
        }
            /*socket.on('connect',function(){
                butaca=butacasLibres;
                socket.emit('msg',butaca);
            });*/
        $("#canvas"+i).click(function(){
            for(j=0;j<100;j++){
                if("canvas"+j === this.id) {
                    console.log(butacasLibres[j]+" "+butacasOcupadas[j]);
                    if(butacasLibres[j] === this.id && butacasOcupadas[j] !== this.id) {
                        var elemento = document.getElementById(this.id);
                        if(elemento && elemento.getContext) {
                            var contexto = elemento.getContext('2d');
                            if(contexto){
                                    contexto.fillStyle = 'rgb(255,128,0)';
                                    contexto.fillRect(0,0,50,50);
                                    butacasOcupadas[j] = this.id;
                                    //Math.floor(random/10);
                                    x=Math.floor(j/10)-Math.floor(random/10);
                                    decimales=(Math.floor(j/10)-(j/10))-(Math.floor(random/10)-(random/10));
                                    y=decimales.toFixed(1);
                                    //console.log(x);
                                    //console.log(y);
                                    if(x>=6 || x<=-6 || y>=0.6 || y<=-0.6){
                                        $("#dist").append("muy lejos<br/>"); 
                                        //console.log("muy lejos");
                                    } else if(x>=4 && x<6 || x<=-4 && x>-6 || y>=0.4 && y<0.6 || y<=-0.4 && y>-0.6) {
                                        $("#dist").append("te estas acercando<br/>");
                                        //console.log("te estas acercando");
                                    } else if(x>=2 && x<4 || x<=-2 && x>-4 || y>=0.2 && y<0.4 || y<=-0.2 && y>-0.4) {
                                        $("#dist").append("caliente<br/>");
                                        //console.log("caliente");
                                    } else if(x=>1 && x<2 || x<=-1 && x>-2 || y>=0.1 && y<0.2 || y<=-0.1 && y>-0.2) {
                                        $("#dist").append("te estas quemando<br/>");
                                        //console.log("te estas quemando");
                                    }
                            }
                        }
                        
                    } /*else if(butacasLibres[j] === this.id && butacasOcupadas[j] === this.id) {
                        var elemento = document.getElementById(this.id);
                        if(elemento && elemento.getContext) {
                            var contexto = elemento.getContext('2d');
                            if(contexto){
                                    contexto.fillStyle = 'rgb(128,255,0)';
                                    contexto.fillRect(0,0,50,50);
                                    butacasOcupadas[j] = "";
                            }
                        }
                    }*/ else {
                        console.log("error");
                    }
                }
            }
        });
    };

})
