// import { Algebra_lineal } from "./Algebra_lineal.js";
// let algebra_lineal = new Algebra_lineal();
function convertirDeterminante2X2(nuevaMatriz2x2) {
    let primerIndice = 0;
    let segundoIndice = 1;
    return `${nuevaMatriz2x2[0][primerIndice]}*${nuevaMatriz2x2[1][segundoIndice]}-${nuevaMatriz2x2[1][primerIndice]}*${nuevaMatriz2x2[0][segundoIndice]}= ${nuevaMatriz2x2[0][primerIndice] * nuevaMatriz2x2[1][segundoIndice]}-${nuevaMatriz2x2[1][primerIndice] * nuevaMatriz2x2[0][segundoIndice]} = ${nuevaMatriz2x2[0][primerIndice] * nuevaMatriz2x2[1][segundoIndice] - nuevaMatriz2x2[1][primerIndice] * nuevaMatriz2x2[0][segundoIndice]}`;
}
function convertir_a_matrix(nuevaMatriz2x2) {
    return `left lline matrix{ ${nuevaMatriz2x2.map((fila) => fila.join("#")).join("##")}}right rline`;
}
function convertir_laplace(vector, fila) {
    return vector[fila].map((columna, indexC) => {
        return ` ${columna}* (${algebra_lineal.signoCofactorSegunFilaColumna(fila + 1, indexC + 1)}*${algebra_lineal.cofactorSinsigno(vector, fila + 1, indexC + 1)})`;
    }).join("+") + `= ${algebra_lineal.determinante_Laplace(vector, fila)}`;
}
