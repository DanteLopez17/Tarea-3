class Tarea {
  constructor(id, titulo, completada = false) {
    this.id = id;
    this.titulo = titulo;
    this.completada = completada;
  }

  toggleEstado() {
    this.completada = !this.completada;
  }
}

class GestorTareas {
  constructor() {
    this.tareas = [];
  }

  agregarTarea(titulo) {
    const nuevaTarea = new Tarea(this.tareas.length + 1, titulo, false);

    this.tareas.push(nuevaTarea);
  }

  listarTareas() {
    console.log("\n=== LISTADO DE TAREAS ===");

    this.tareas.forEach((tarea) => {
      console.log(
        `[${tarea.completada ? "✓" : " "}] ID: ${tarea.id} - ${tarea.titulo}`,
      );
    });
  }

  buscarPorTitulo(titulo) {
    return this.tareas.find(
      (tarea) => tarea.titulo.toLowerCase() === titulo.toLowerCase(),
    );
  }

  listarCompletadas() {
    return this.tareas.filter((tarea) => tarea.completada);
  }
}

// Simulación de carga de tareas
function cargarTareas() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        new Tarea(1, "Estudiar JavaScript", true),
        new Tarea(2, "Practicar clases", false),
        new Tarea(3, "Completar tarea 3", true),
      ]);
    }, 2000);
  });
}

// Simulación para Promise.all
function cargarUsuarios() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(["Juan", "María", "Pedro"]);
    }, 1500);
  });
}

// Flujo principal
async function iniciarAplicacion() {
  try {
    const gestor = new GestorTareas();

    console.log("Cargando datos...");

    const [tareas, usuarios] = await Promise.all([
      cargarTareas(),
      cargarUsuarios(),
    ]);

    gestor.tareas = tareas;

    console.log("Tareas cargadas correctamente");
    console.log("Usuarios cargados:", usuarios);

    gestor.listarTareas();

    console.log("\n=== AGREGANDO NUEVA TAREA ===");
    gestor.agregarTarea("Subir tarea a GitHub");

    gestor.listarTareas();

    console.log("\n=== TAREAS COMPLETADAS ===");
    const completadas = gestor.listarCompletadas();

    completadas.forEach((tarea) => {
      console.log(`${tarea.id} - ${tarea.titulo}`);
    });

    console.log("\n=== TITULOS DE TAREAS ===");

    const titulos = gestor.tareas.map((tarea) => tarea.titulo);

    console.log(titulos);
  } catch (error) {
    console.error("Error:", error);
  }
}

iniciarAplicacion();
