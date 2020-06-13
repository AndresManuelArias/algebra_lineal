"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Algebra_lineal = void 0;
let A = [[1, -2, 1], [5, 0, -3]];
let B = [[1 / 3, 0, 2], [2, -3, -1]];
let C = [[3, 5], [0, -2], [-1, 1]];
let D = [[-1, 2, -2], [4, -3, -1]];
let prueba;
class Algebra_lineal {
    multiplicarVectorMatrix(escalar, matrix) {
        return matrix.map((fila) => this.multiplicarVector(escalar, fila));
    }
    sumarMatrix(matrix1, matrix2) {
        let sumas = [[]];
        if (matrix1.length === matrix2.length) {
            sumas = matrix1.map((fila, index) => this.sumarVector(fila, matrix2[index]));
        }
        else {
            throw "Los dos vectores no tienen el mismo tamaño ";
        }
        return sumas;
    }
    sumarVector(vector1, vector2) {
        let sumas = [];
        if (vector1.length === vector2.length) {
            sumas = vector1.map((n, i) => {
                let suma = vector2[i] + n;
                if (!isNaN(Number(suma))) {
                    return suma;
                }
                else {
                    throw "El valor no es numerico";
                }
            });
        }
        else {
            throw "Los dos vectores no tienen el mismo tamaño ";
        }
        return sumas;
    }
    multiplicarVector(escalar, vector) {
        return vector.map((n) => {
            if (!isNaN(Number(n))) {
                return n * escalar;
            }
            else {
                throw "El valor no es numerico";
            }
        });
    }
    productoPunto(vector1, vector2) {
        let multipliaciones = [];
        if (vector1.length === vector2.length) {
            multipliaciones = vector1.map((n, i) => {
                let multiplicar = n * vector2[i];
                if (!isNaN(Number(multiplicar))) {
                    return multiplicar;
                }
                else {
                    throw "El valor no es numerico";
                }
            });
        }
        else {
            throw "Los dos vectores no tienen el mismo tamaño ";
        }
        return multipliaciones.reduce((a, b) => a + b);
    }
    menor(matrix, fila, columna) {
        let nuevaMatriz2x2 = matrix.filter(function (filaVector, indexFila) { return indexFila !== (fila - 1); })
            .map(function (fila) { return fila.filter(function (n, i) { return i !== columna - 1; }); });
        return nuevaMatriz2x2;
    }
    cofactor(matrix, fila, columna) {
        return Math.pow(-1, fila + columna) * this.determinante(this.menor(matrix, fila, columna));
    }
    determinante(nuevaMatriz2x2) {
        let primerIndice = 0;
        let segundoIndice = 1;
        return nuevaMatriz2x2[0][primerIndice] * nuevaMatriz2x2[1][segundoIndice] - nuevaMatriz2x2[1][primerIndice] * nuevaMatriz2x2[0][segundoIndice];
    }
    productoCruz_2X3(vector1, vector2) {
        let matrix = [
            vector1,
            vector2
        ];
        let vector3 = [];
        for (let index = 1; index <= 3; index++) {
            let nuevaMatriz2x2 = this.menor(matrix, 0, index);
            vector3.push(this.cofactor(nuevaMatriz2x2, 0, index));
        }
        return vector3;
    }
    //  sumarMatriz(Matriz1:number[][],Matriz2:number[][]):number[][]{
    //     if(Matriz1.length  ==  Matriz2.length && Matriz1[Matriz1.length-1].length == Matriz2[Matriz2.length-1].length ){
    //     }
    //  }
    metodo_de_cramer(sistemaDatos) {
        // sistemaDatos = [[4,5,5],[-4,-10,-7]]
        let determinante_sistemaMatrix = sistemaDatos.map(a => a.filter((b, i) => i != a.length - 1));
        let determinante_sistema = this.determinante(determinante_sistemaMatrix);
        let determinanteXMatrix = sistemaDatos.map(a => [a[a.length - 1], a[1]]);
        let determinanteYMatrix = sistemaDatos.map(a => [a[0], a[a.length - 1]]);
        let determinanteX = this.determinante(determinanteXMatrix);
        let determinanteY = this.determinante(determinanteYMatrix);
        let valorx = determinanteX / determinante_sistema;
        let valory = determinanteY / determinante_sistema;
        return [valorx, valory];
    }
    ddterminante_Laplace(vector) {
        return vector[vector.length - 1]
            .map((dato, indexColumna) => this.cofactor(vector, vector.length, indexColumna + 1) * dato)
            .reduce((a, b) => a + b);
    }
}
exports.Algebra_lineal = Algebra_lineal;
//Método de Cramer 
