function sum(a:number,b:number):number{
    return a+b;
}
function multiplicaVertores(vector1:number[],vector2:number[]):number{
   return vector1.map((number_:number,indice:number)=>number_*vector2[indice]).reduce(sum);

}
function modulo(vector:number[]){
    return vector.map((number_:number)=>Math.pow(number_,2)).reduce(sum)
}
function multiplicaNumeroConVector(numero:number,vector:number[]):number[]{
    return vector.map((number_:number)=>number_*numero)
}
function proyeccion(u:number[],v:number[]):number[]{
  return  multiplicaNumeroConVector(multiplicaVertores(u,v)/modulo(v),v)
}
// 