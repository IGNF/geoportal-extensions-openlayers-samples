var fs = require('fs');
var path = require('path');
var spawnSync = require('child_process').spawnSync;
var yargs = require('yargs');

// liste des widgets
var widgets = require('./widgets.json');

const argv = yargs
    .usage("Usage: $0 [options]")
    .example("$0 -p path/to/project/ -t path/to/target", "Extraction des doclets de la jsdoc")
    .option("path", {
        alias: "p",
        description: "Chemin vers le répertoire racine",
        type: "string",
        nargs: 1,
        demandOption: false,
    })
    .option("target", {
        alias: "t",
        description: "Chemin vers le répertoire des resultats",
        type: "string",
        nargs: 1,
        demandOption: false,
    })
    .help()
    .alias("help", "h")
    .epilog("Pour plus d'informations...")
    .argv;

console.log("✔ options", argv);

// par defaut, le script est executé via npm, 
// donc à la racine du projet
var root = path.resolve(process.cwd());

if (argv.path) {
    if (!fs.existsSync(argv.path)) {
        console.log("✘ le répertoire n'existe pas !?");
        process.exit(1);
    }
    root = argv.path;
}

// par defaut, le script est executé via npm, 
// donc à la racine du projet
var target = path.join(root, "build", "tmp");

if (argv.target) {
    if (!fs.existsSync(argv.target)) {
        console.log("✘ le répertoire 'target' n'existe pas !?");
        process.exit(1);
    }
    target = argv.target;
}

// nettoyage du répertoire temporaire
if (fs.existsSync(target)) {
    console.log("---");
    const files = fs.readdirSync(target);
    for (var k = 0; k < files.length; k++) {
        const file_name_tmp = files[k];
        const file_path_tmp = path.resolve(target, file_name_tmp);
        if (file_path_tmp.includes(".doclet.json")) {
            fs.unlinkSync(file_path_tmp);
            console.log("   ✔ doclet supprimé", file_name_tmp);
        }
    }
}

// boucle principale des doclets
console.log("---")
for (const lib in widgets) {
    if (Object.hasOwnProperty.call(widgets, lib)) {
        console.log("# process LIBRARY", lib);
        var regex = new RegExp("^(leaflet|openlayers|itowns)$");
        if (!regex.test(lib)) {
            continue;
        }
        const files = widgets[lib];
        for (var i = 0; i < files.length; i++) {
            // fichier source
            const file = files[i];
            const file_path = path.join(root, file);
            const file_name = path.basename(file_path, ".js");
            console.log("   - process", file_path);
            
            // creation du fichier doclet complet
            const file_doclet = path.join(target, lib.concat("-tmp-", file_name.toLowerCase(), ".doclet.json"));
            var out = fs.openSync(file_doclet, 'w');
            
            // execution de la jsdoc
            var jsdoc = path.join("node_modules", ".bin", "jsdoc");
            spawnSync(jsdoc, ['-X', file_path], {
                cwd: root,
                stdio: ['inherit', out, 'inherit']
            });
            
            // fermeture du fichier
            fs.closeSync(out);

            // fin du process
            console.log("   ✔ process", file_name);

        }
    }
}

// boucle principale de creation des options
console.log("---");
const doclets = fs.readdirSync(target);
doclets.forEach(doclet => {
    if (!doclet.includes(".doclet.json")) {
        return;
    }
    const file_name_doclet = path.basename(doclet);
    const file_path_doclet = path.resolve(target, doclet);
    const file_name_opts = file_name_doclet.replace("-tmp", "");
    const file_path_opts = path.join(target, file_name_opts);
    
    console.log("   ✔ process doclet", file_name_opts);

    // loading json !
    const data = require(file_path_doclet);
    // process 
    data.forEach(obj => {
        var opts = {};
        if (obj.kind === "class") {
            console.log("   -- found class", obj.name);
            var callback = function (element, index, array) {
                element.value = null;
                element.section = false;
                if (element.name === "options") {
                    element.section = true;
                    return;
                }
                var previous = array[index-1];
                if (previous.name !== "options" && element.name.includes(previous.name)) {
                    previous.section = true;
                    return;
                }
            };
            // FIXME tri à faire par sections !
            var compare = function (a, b) {
                // Use toUpperCase() to ignore character casing
                const nameA = a.name.toUpperCase();
                const nameB = b.name.toUpperCase();
              
                let comparison = 0;
                if (nameA > nameB) {
                  comparison = 1;
                } else if (nameA < nameB) {
                  comparison = -1;
                }
                return comparison;
            };

            // obj.params.sort(compare);
            obj.params.forEach(callback);

            opts = {
                name : obj.name.toLowerCase(),
                auto : true,
                params : obj.params,
                examples : obj.examples
            }
            // archive de la recherche
            var out = fs.openSync(file_path_opts, 'w');
            fs.writeSync(out, JSON.stringify(opts));
            fs.closeSync(out);
        }
    });
    // clean
    fs.unlinkSync(file_path_doclet);
});

process.exit(0);