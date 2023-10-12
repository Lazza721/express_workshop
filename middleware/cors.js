module.exports = (req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*"); 
    // Permitimos que todos tengan acceso, no importa desde qué dispositivo envíen la petición.
    // Si quisieras restringir a un grupo seleccionado, deberías especificar los orígenes en lugar de "*".
  
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept, Authorization"
    );
  
    // Definimos los encabezados de origen, solicitud, tipo de contenido, aceptación y autorización.
  
    if (req.method === 'OPTIONS') {
      // Si el método de solicitud es OPTIONS, configuramos los métodos HTTP permitidos.
      res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET");
      return res.status(200).json({});
    }
    next();
  }
  