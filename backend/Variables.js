const fs = require("fs");

const operaciones = async () => {
    try {
        await.fs.promises.writeFile(filename, "escribiendo con promesas")
    };
    let = contenido = await fs.promises.readFile(filename, "utf-8");
    console.log(contenido)

    await fs.promises.appendFile(filename, "/")
}
    