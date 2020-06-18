let A = [[1, -2, 1], [5, 0, -3]];
let B = [[1 / 3, 0, 2], [2, -3, -1]];
let C = [[3, 5], [0, -2], [-1, 1]];
let D = [[-1, 2, -2], [4, -3, -1]];
let prueba;
export class Algebra_lineal {
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
    restarVector(...vectores) {
        return aritmetica((vector1, vector2) => vector1.map((n1, i) => n1 - vector2[i]), vectores);
    }
    sumarVector(...vectores) {
        debugger
        let numbero = [1, 2, 3];
        return aritmetica((vector1, vector2) => {debugger;
           return  vector1.map((n1, i) => n1 + vector2[i])
            }, vectores);
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
    productoEscalar(vector1, vector2) {
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
    cofactorSinsigno(matrix, fila, columna) {
        return this.determinante(this.menor(matrix, fila, columna));
    }
    cofactor(matrix, fila, columna) {
        return this.signoCofactorSegunFilaColumna(fila, columna) * this.cofactorSinsigno(matrix, fila, columna);
    }
    signoCofactorSegunFilaColumna(fila, columna) {
        return Math.pow(-1, fila + columna);
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
    quitarColumnaResultado(sistemaDatos) {
        return sistemaDatos.map(a => a.filter((b, i) => i != a.length - 1));
    }
    agararColumnaResultado(sistemaDatos) {
        return sistemaDatos.map(a => a.filter((b, i) => i == a.length - 1));
    }
    metodo_de_cramer(sistemaDatos) {
        debugger;
        let determinante_sistemaMatrix = this.quitarColumnaResultado(sistemaDatos);
        let determinante_sistema = this.determinante_Laplace(determinante_sistemaMatrix);
        let determinantesMatrix = [];
        for (let index = 0; index < determinante_sistemaMatrix[0].length; index++) {
            let nuevaMatrix = this.cambiarColumnaPorEstosDatos(determinante_sistemaMatrix, sistemaDatos, index);
            // console.log("nuevaMatrix",nuevaMatrix)
            let determinanter = this.determinante_Laplace(nuevaMatrix);
            determinantesMatrix.push(determinanter);
        }
        return determinantesMatrix.map((number) => number / determinante_sistema);
    }
    determinante_Laplace(vector, fila = 1) {
        return vector.length > 2 ? vector[fila - 1]
            .map((dato, indexColumna) => this.cofactor(vector, fila, indexColumna + 1) * dato)
            .reduce((a, b) => a + b) : this.determinante(vector);
    }
    cambiarColumnaPorEstosDatos(matrix, cambiarPor, columna_index) {
        return matrix
            .map((fila, indexFila) => fila.map((dato, indexColumna) => indexColumna == columna_index ? cambiarPor[indexFila][cambiarPor[indexFila].length - 1] : dato));
    }
}
function aritmetica(accion, ...vectores) {
    let vector3 = [];
    if (vectores.every((vector1) => vector1.length === vectores[0].length)) {
        debugger
        vector3 = vectores.reduce((previos, current) => {
            debugger
            let acumulado = accion(previos, current);
            console.log("acumulado", acumulado);
            return acumulado;

            if (acumulado.every((a) => !isNaN(Number(a)))) {
                return acumulado;
            }
            else {
                throw "El valor no es numerico";
            }
        });
    }
    else {
        throw "Los dos vectores no tienen el mismo tamaño ";
    }
    return vector3;
}
//Método de Cramer 
