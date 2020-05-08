class Algebra_lineal {
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
            debugger;
            let nuevaMatriz2x2:number[][]=matrix.map((fila)=>fila.filter((n,i)=>i!==index-1))
            vector3.push(Math.pow(-1, index)*-1*this.determinante(nuevaMatriz2x2));
   
        }
        return vector3;
    }
    //  sumarMatriz(Matriz1:number[][],Matriz2:number[][]):number[][]{
    //     if(Matriz1.length  ==  Matriz2.length && Matriz1[Matriz1.length-1].length == Matriz2[Matriz2.length-1].length ){

    //     }
    //  }
}