var A = [[1, -2, 1], [5, 0, -3]];
var B = [[1 / 3, 0, 2], [2, -3, -1]];
var C = [[3, 5], [0, -2], [-1, 1]];
var D = [[-1, 2, -2], [4, -3, -1]];
var Algebra_lineal = /** @class */ (function () {
    function Algebra_lineal() {
    }
    Algebra_lineal.prototype.multiplicarVectorMatrix = function (escalar, matrix) {
        var _this = this;
        return matrix.map(function (fila) { return _this.multiplicarVector(escalar, fila); });
    };
    Algebra_lineal.prototype.sumarMatrix = function (matrix1, matrix2) {
        var _this = this;
        var sumas = [[]];
        if (matrix1.length === matrix2.length) {
            sumas = matrix1.map(function (fila, index) { return _this.sumarVector(fila, matrix2[index]); });
        }
        else {
            throw "Los dos vectores no tienen el mismo tamaño ";
        }
        return sumas;
    };
    Algebra_lineal.prototype.sumarVector = function (vector1, vector2) {
        var sumas = [];
        if (vector1.length === vector2.length) {
            sumas = vector1.map(function (n, i) {
                var suma = vector2[i] + n;
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
    };
    Algebra_lineal.prototype.multiplicarVector = function (escalar, vector) {
        return vector.map(function (n) {
            if (!isNaN(Number(n))) {
                return n * escalar;
            }
            else {
                throw "El valor no es numerico";
            }
        });
    };
    Algebra_lineal.prototype.productoPunto = function (vector1, vector2) {
        var multipliaciones = [];
        if (vector1.length === vector2.length) {
            multipliaciones = vector1.map(function (n, i) {
                var multiplicar = n * vector2[i];
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
        return multipliaciones.reduce(function (a, b) { return a + b; });
    };
    Algebra_lineal.prototype.menor = function (matrix, fila, columna) {
        var nuevaMatriz2x2 = matrix.filter(function (filaVector, indexFila) { return indexFila !== (fila - 1); })
            .map(function (fila) { return fila.filter(function (n, i) { return i !== columna - 1; }); });
        return nuevaMatriz2x2;
    };
    Algebra_lineal.prototype.cofactor = function (matrix, fila, columna) {
        return Math.pow(-1, fila + columna) * this.determinante(this.menor(matrix, fila, columna));
    };
    Algebra_lineal.prototype.determinante = function (nuevaMatriz2x2) {
        var primerIndice = 0;
        var segundoIndice = 1;
        return nuevaMatriz2x2[0][primerIndice] * nuevaMatriz2x2[1][segundoIndice] - nuevaMatriz2x2[1][primerIndice] * nuevaMatriz2x2[0][segundoIndice];
    };
    Algebra_lineal.prototype.productoCruz_2X3 = function (vector1, vector2) {
        var matrix = [
            vector1,
            vector2
        ];
        var vector3 = [];
        for (var index = 1; index <= 3; index++) {
            var nuevaMatriz2x2 = this.menor(matrix, 0, index);
            vector3.push(this.cofactor(nuevaMatriz2x2, 0, index));
        }
        return vector3;
    };
    return Algebra_lineal;
}());
