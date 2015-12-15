module.exports=function(io){
  var random = Math.floor(Math.random()*100);
  var usernames = [];
  io.sockets.on ('connect',function(socket) {
  	/*socket.on('msg', function(msg){
  		for(i=0;i<100;i++){
  			console.log(msg[i]);
  		}
  		console.log(msg);
  		//socket.emit('msg', { text: 'esto es una prueba' }); //a partir de aqui puedo empezar a emitir mensajes a los clientes
  	});*/
    io.sockets.emit('usuarios', usernames);

    socket.on("username", function(msg) {
      console.log("client="+msg);
      usernames.push(msg);
      socket.msg = msg;
    });

  	io.sockets.on('connection', function(socket) {
      socket.emit('numero', random);
  		socket.on("send", function(msg){
  			butacasOcupadas = msg;
  			//console.log(butacasOcupadas);
        //console.log(random);
        for(i=0;i<100;i++){
          if(butacasOcupadas[i]=="canvas"+random) {
            console.log(socket.msg + " gano");
            io.sockets.emit('ganador',socket.msg+" ha ganado");
            random = Math.floor(Math.random()*100);
          }
        }
  		});
  	});
  })
}
