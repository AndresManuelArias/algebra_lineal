function sum(a, b) {
    return a + b;
}
function multiplicaVertores(vector1, vector2) {
    return vector1.map(function (number_, indice) { return number_ * vector2[indice]; }).reduce(sum);
}
function modulo(vector) {
    return vector.map(function (number_) { return Math.pow(number_, 2); }).reduce(sum);
}
function multiplicaNumeroConVector(numero, vector) {
    return vector.map(function (number_) { return number_ * numero; });
}
function proyeccion(u, v) {
    return multiplicaNumeroConVector(multiplicaVertores(u, v) / modulo(v), v);
}
// 
