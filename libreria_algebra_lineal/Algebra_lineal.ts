let A:number[][]=[[1, -2, 1 ],[ 5 , 0, -3 ]];
let B:number[][]=[[1/3, 0, 2 ],[ 2 , -3, -1 ]] ;
let C:number[][]=[[3, 5 ],[ 0, -2 ],[ -1 ,1 ]];
let D:number[][]=[[-1, 2, -2 ],[ 4 , -3, -1 ] ]  
let prueba;
export class Algebra_lineal {
    multiplicarVectorMatrix(escalar:number,matrix:number[][]):number[][]{
        return matrix.map((fila:number[])=>this.multiplicarVector(escalar,fila))    
    }
    sumarMatrix(matrix1:number[][],matrix2:number[][]):number[][]{
        let sumas:number[][]= [[]];
        if(matrix1.length === matrix2.length){ 
            sumas =matrix1.map((fila:number[],index:number)=> this.sumarVector(fila,matrix2[index]))
        }else {
            throw "Los dos vectores no tienen el mismo tamaño ";
        }
        return sumas;
    }
    restarVector(...vectores:number[][]):number[]{
        return  vectores.reduce((previosValue,curenvalue)=> aritmetica(previosValue,curenvalue,(n1:number,n2:number)=>n1-n2) )
    }
    sumarVector(...vectores:number[][]):number[]{
        return  vectores.reduce((previosValue,curenvalue)=> aritmetica(previosValue,curenvalue,(n1:number,n2:number)=>n1+n2) )
    }
    multiplicarVector(escalar:number,vector:number[]):number[]{
        return vector.map((n:number)=>{
                if(!isNaN(Number(n)) ){
                    return n*escalar;
                }else{
                    throw "El valor no es numerico";      
                }
            })    
    }
    productoEscalar(...vectores:number[][]):number{
        return  vectores
        .reduce((previosValue,curenvalue)=> aritmetica(previosValue,curenvalue,(n1:number,n2:number)=>n1*n2) )
        .reduce((a,b)=>a+b)
    }
    diviPrueba(...vectores:number[][]):number[]{
        return  vectores
        .reduce((previosValue,curenvalue)=> aritmetica(previosValue,curenvalue,(n1:number,n2:number)=>n1/n2) )
    }   
    productoPunto(vector1:number[],vector2:number[]):number{
        let multipliaciones:number[]= [];
        if(vector1.length === vector2.length){          
            multipliaciones = vector1.map((n:number,i)=>{
                let multiplicar= n*vector2[i];
                if(!isNaN(Number(multiplicar)) ){
                    return multiplicar;
                }else{
                    throw "El valor no es numerico";      
                }
            })
              
        }else {
            throw "Los dos vectores no tienen el mismo tamaño ";
        }
        return multipliaciones.reduce((a,b)=>a+b);
    }
    menor(matrix:number[][],fila:number,columna:number):number[][]{
        let nuevaMatriz2x2:number[][]=matrix.filter(function (filaVector, indexFila) { return indexFila !== (fila-1); })
        .map(function (fila) { return fila.filter(function (n, i) { return i !== columna - 1; }); })
        return nuevaMatriz2x2;
    }
    cofactorSinsigno(matrix:number[][],fila:number,columna:number):number{
       return this.determinante(this.menor(matrix,fila,columna))
    }
    cofactor(matrix:number[][],fila:number,columna:number):number{
       return this.signoCofactorSegunFilaColumna(fila,columna)*this.cofactorSinsigno(matrix,fila,columna)
    }
    signoCofactorSegunFilaColumna(fila:number,columna:number){
        return Math.pow(-1, fila+columna)
    }
    determinante(nuevaMatriz2x2:number[][]):number{
        let primerIndice:number=0;
        let segundoIndice:number= 1;
        return nuevaMatriz2x2[0][primerIndice]*nuevaMatriz2x2[1][segundoIndice]-nuevaMatriz2x2[1][primerIndice]*nuevaMatriz2x2[0][segundoIndice];
    }

    productoCruz_2X3(vector1:number[],vector2:number[]):number[]{
        let matrix:number[][]=[
            vector1,
            vector2
        ]
        let vector3:number[]=[];
        for(let index = 1; index <= 3; index++){
            let nuevaMatriz2x2:number[][]=this.menor(matrix,0,index)
            vector3.push(this.cofactor(nuevaMatriz2x2,0,index))   
        }
        return vector3;
    }
    quitarColumnaResultado(sistemaDatos:number[][]){
        return sistemaDatos.map(a => a.filter((b,i)=> i != a.length-1))
    }
    agararColumnaResultado(sistemaDatos:number[][]){
        return sistemaDatos.map(a => a.filter((b,i)=> i == a.length-1))
    }
    metodo_de_cramer(sistemaDatos:number[][]):number[]{
        debugger
        let determinante_sistemaMatrix:number[][] = this.quitarColumnaResultado(sistemaDatos)
        let determinante_sistema:number =this.determinante_Laplace(determinante_sistemaMatrix)

        let determinantesMatrix:number[] = [];
        for (let index = 0; index < determinante_sistemaMatrix[0].length; index++) {
            let nuevaMatrix:number[][] = this.cambiarColumnaPorEstosDatos(determinante_sistemaMatrix,sistemaDatos,index)
            // console.log("nuevaMatrix",nuevaMatrix)
            let determinanter:number =this.determinante_Laplace(nuevaMatrix)
            determinantesMatrix.push(determinanter);   
        }
        return determinantesMatrix.map((number)=> number/determinante_sistema)
    }
    determinante_Laplace(vector:number[][],fila:number=1):number{
        return vector.length >2? vector[fila-1]
        .map((dato,indexColumna)=>  this.cofactor(vector,fila,indexColumna+1)*dato)
        .reduce((a,b)=>a+b):this.determinante(vector)
    }
    cambiarColumnaPorEstosDatos(matrix:number[][],cambiarPor:number[][],columna_index:number):number[][]{
        return matrix
            .map((fila,indexFila) => fila.map((dato,indexColumna)=> indexColumna == columna_index?cambiarPor[indexFila][cambiarPor[indexFila].length-1]:dato))          
    }
}
function aritmetica(vector1:number[],vector2:number[],accion:(n1:number,n2:number)=>number){
    let vector3:number[]= [];
    if(vector1.length === vector2.length){          
        vector3 = vector1.map((n:number,i)=>{
            let acumulado= accion(n,vector2[i]);
            if(!isNaN(Number(acumulado)) ){
                return acumulado;
            }else{
                throw "El valor no es numerico";      
            }
        })    
    }else {
        throw "Los dos vectores no tienen el mismo tamaño ";
    }
    return vector3;
}
//Método de Cramer 


