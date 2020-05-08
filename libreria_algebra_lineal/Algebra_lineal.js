var Algebra_lineal = /** @class */ (function () {
    function Algebra_lineal() {
    }
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
        var _loop_1 = function (index) {
            debugger;
            var primerIndice = 0;
            var segundoIndice = 1;
            var nuevaMatriz2x2 = matrix.map(function (fila) { return fila.filter(function (n, i) { return i !== index - 1; }); });
            vector3.push(Math.pow(-1, index) * -1 * this_1.determinante(nuevaMatriz2x2));
        };
        var this_1 = this;
        for (var index = 1; index <= vector1.length; index++) {
            _loop_1(index);
        }
        return vector3;
    };
    return Algebra_lineal;
}());
