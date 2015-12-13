module.exports=function(io){
   
  io.sockets.on ('connect',function(socket) {
  	/*socket.on('msg', function(msg){
  		for(i=0;i<100;i++){
  			console.log(msg[i]);
  		}
  		console.log(msg);
  		//socket.emit('msg', { text: 'esto es una prueba' }); //a partir de aqui puedo empezar a emitir mensajes a los clientes
  	});*/
  	var butacasOcupadas = [];
    var usernames = [];
    random = "canvas"+Math.floor(Math.random()*9+1);

    socket.on("username", function(msg) {
      console.log("client="+msg);
      usernames.push(msg);
      socket.msg = msg;
    });

  	io.sockets.on('connection', function(socket) {
  		socket.on("send", function(msg){
  			butacasOcupadas = msg;
  			console.log(butacasOcupadas);
        console.log(random);
        for(i=0;i<9;i++){
          if(butacasOcupadas[i]==random) {
            console.log(socket.msg + " gano");
            io.sockets.emit('ganador',socket.msg+" ha ganado");
          }
        }
  		});
  	});
  })
}
