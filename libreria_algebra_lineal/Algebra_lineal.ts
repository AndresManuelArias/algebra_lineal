let A:number[][]=[[1, -2, 1 ],[ 5 , 0, -3 ]];
let B:number[][]=[[1/3, 0, 2 ],[ 2 , -3, -1 ]] ;
let C:number[][]=[[3, 5 ],[ 0, -2 ],[ -1 ,1 ]];
let D:number[][]=[[-1, 2, -2 ],[ 4 , -3, -1 ] ]  
class Algebra_lineal {
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
    sumarVector(vector1:number[],vector2:number[]):number[]{
        let sumas:number[]= [];
        if(vector1.length === vector2.length){          
            sumas = vector1.map((n:number,i)=>{
                let suma= vector2[i]+n;
                if(!isNaN(Number(suma)) ){
                    return suma;
                }else{
                    throw "El valor no es numerico";      
                }
            })    
        }else {
            throw "Los dos vectores no tienen el mismo tamaño ";
        }
        return sumas;
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
    cofactor(matrix:number[][],fila:number,columna:number):number{
       return Math.pow(-1, fila+columna) *this.determinante(this.menor(matrix,fila,columna))
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
    //  sumarMatriz(Matriz1:number[][],Matriz2:number[][]):number[][]{
    //     if(Matriz1.length  ==  Matriz2.length && Matriz1[Matriz1.length-1].length == Matriz2[Matriz2.length-1].length ){

    //     }
    //  }
}