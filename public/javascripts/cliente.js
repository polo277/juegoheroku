$(document).ready(function(){

    //var socket=io.connect('192.168.1.213:3000');//Establezco un socket con el servidor en este caso como es la misma máquina localhost
    var socket=io.connect();

    var butacasLibres = [];
    var butacasOcupadas = [];

	socket.on('connect',function(){
		console.log("client connect");
        $("#sala").hide();
	});
    socket.on('ganador', function(data) {
        alert(data);
        location.reload();
    });
    $("#user").append("User: <input id='username' type='text'/><a id='login' href='#'> login</a>");
    $("#login").click(function() {
        if($("#username").val() != "") {
            socket.emit('username', $("#username").val());
            $("#user").hide();
            $("#sala").show();
        } else {
            alert("no has metido ningun nombre");
        }
    });
	$("#sala").click(function() {
        socket.emit("send",butacasOcupadas);
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
                            }
                        }
                        
                    } else if(butacasLibres[j] === this.id && butacasOcupadas[j] === this.id) {
                        var elemento = document.getElementById(this.id);
                        if(elemento && elemento.getContext) {
                            var contexto = elemento.getContext('2d');
                            if(contexto){
                                    contexto.fillStyle = 'rgb(128,255,0)';
                                    contexto.fillRect(0,0,50,50);
                                    butacasOcupadas[j] = "";
                            }
                        }
                    } else {
                        console.log("error");
                    }
                }
            }
        });
    };

})
