import { Algebra_lineal } from "./Algebra_lineal.js"
import * as conversor from "./conversor_a_matema.js";
let algebra_lineal = new Algebra_lineal();
let  sistema = [[1,2,4,35000],[4,4,1,34000],[2,3,4,42000]];
/*
    {{1,2,4},{4,4,1},{2,3,4}};
    X = { {35000,2,4},{34000,4,1},{42000,3,4}}
    Y = { {1,35000,4},{4,34000,1},{2,42000,4}}
    Z = { {1,2,35000},{4,4,34000},{2,3,42000}}
    {{1*3000,2*4000,4*6000},{4*3000,4*4000,1*6000},{2*3000,3*4000,4*6000}};
*/ 
let textoD = `${convertir_a_matrix(sistema)} newline\n`
let S = algebra_lineal.quitarColumnaResultado(sistema)
let columnaResultados = algebra_lineal.agararColumnaResultado(sistema)
textoD += `S  =${convertir_a_matrix(S)} newline\n` 
for (let index = 0; index < S.length; index++) {
    let A =  algebra_lineal.menor(S,3,index+1);
    textoD += `S_{ 3${index+1} } = ${convertir_a_matrix(A)} = ${convertirDeterminante2X2(A)} newline\n \n`
}
textoD += `abs{S} = ${convertir_laplace(S,2)} newline\n`

let cordenadas = [{letra:"X",indice:0},{letra:"Y",indice:1},{letra:"Z",indice:2}]
cordenadas.forEach((dato)=>{
    let remplazarResultadoAcolumna = algebra_lineal.cambiarColumnaPorEstosDatos(S,columnaResultados,dato.indice)
    textoD += `${dato.letra}  =${convertir_a_matrix(remplazarResultadoAcolumna)} newline\n` 
    textoD += `abs{${dato.letra}}= ${dato.letra}_{31} * S_{31} + ${dato.letra}_{32} * S_{32} + ${dato.letra}_{33} * S_{33} newline\n`
    for (let index = 0; index < remplazarResultadoAcolumna.length; index++) {
        let A =  algebra_lineal.menor(remplazarResultadoAcolumna,3,index+1);
        textoD += `${dato.letra}_{ 3${index+1} } = ${convertir_a_matrix(A)} = ${convertirDeterminante2X2(A)} newline\n`
    }
    textoD += `abs{${dato.letra}} = ${convertir_laplace(remplazarResultadoAcolumna,2)} newline\n`
    textoD += ` color green { ${dato.letra.toLocaleLowerCase()} = {${algebra_lineal.determinante_Laplace(remplazarResultadoAcolumna)}} over {${algebra_lineal.determinante_Laplace(S)}} } newline \n`
})
