import chalk from "chalk";
import fs from 'fs';

function trataErro(erro){
    throw new Error(chalk.red(erro.code,"Não há arquivo no caminho..."));
}

async function pegaArquivo(caminhodoArquivo){
    const encoding = "utf-8";
    try{
        const texto = await fs.promises.readFile(caminhodoArquivo,encoding);
        return extraiLinks(texto);   
    }
    catch(erro){
        trataErro(erro)
    }

}

function extraiLinks(texto){
    const regex = /\[([^\]]*)\]\((https?:\/\/[^$#\s].[^\s]*)\)/gm
/*     const linksExtraidos = regex.exec(texto); */
    const arrayResultado = [];


    let temp;
    while((temp = regex.exec(texto)) !=null){
    arrayResultado.push({ [temp[1]] : [temp[2]]})
}
return arrayResultado.length === 0 ? "Não há links" : arrayResultado;
}


/* pegaArquivo('./Arquivo/text.md')*/
export default pegaArquivo;