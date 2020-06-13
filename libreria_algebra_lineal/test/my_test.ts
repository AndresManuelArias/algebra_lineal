import { assertEquals } from "https://deno.land/std/testing/asserts.ts";
import {Algebra_lineal} from "../Algebra_lineal.ts"
console.log(Algebra_lineal)
let algebra_lineal = new Algebra_lineal();

interface DataDeterminantes {
    sistema:number[][]
    determinante:number;
}
let dataDeterminantes:DataDeterminantes[] = [
    {sistema:[[7,-1],[8,12]],determinante:92},
    {sistema:[[-4,-2],[-7,5]],determinante:-34},
    {sistema:[[1/2,-2],[3/4,4]],determinante:7/2},
    {sistema:[[5,-3],[6,4]],determinante:38},
]
dataDeterminantes.forEach((data,index)=>{
    Deno.test(`solo  determinante ${index}`, () => {
        assertEquals( algebra_lineal.determinante(data.sistema), data.determinante);
    });
})

interface dataTestSistema {
    sistemaDatos:number[][];
    dataTest:DataTest[],
    determinante:number
}

interface DataTest {
    fila:number;
    columna:number;
    respuestaMenor:number[][];
    respuestaDeterminante:number;
    respuestaCofactor:number;
}

let dataPruebas:dataTestSistema[] = [
    {sistemaDatos:[[5,-2,4],[6,7,-3],[3,0,2]],
        dataTest: [
            {fila:3,columna:1,respuestaMenor:[[-2,4],[7,-3]],respuestaDeterminante:-22,respuestaCofactor:-22},
            {fila:3,columna:3,respuestaMenor:[[5,-2],[6,7]],respuestaDeterminante:47,respuestaCofactor:47}
        ],
        determinante:28
    },
    {sistemaDatos:[[10,-2,0],[5,-4,7],[3,1,-1]],
        dataTest: [
            {fila:2,columna:3,respuestaMenor:[[10,-2],[3,1]],respuestaDeterminante:16,respuestaCofactor:-16},
            {fila:3,columna:3,respuestaMenor:[[10,-2],[5,-4]],respuestaDeterminante:-30,respuestaCofactor:-30}
        ],
        determinante:-82
    },
]
dataPruebas.forEach((testsistemaDatos,indexMatrix)=>{
    testsistemaDatos.dataTest.forEach((data, index) => {
        Deno.test(`matrix ${indexMatrix} menor prueba ${index}`, () => {
            assertEquals( algebra_lineal.menor(testsistemaDatos.sistemaDatos,data.fila,data.columna), data.respuestaMenor);
        });
        Deno.test(`matrix ${indexMatrix} determinante ${index}`, () => {
            assertEquals( algebra_lineal.determinante(data.respuestaMenor), data.respuestaDeterminante);
        });
        Deno.test(`matrix ${indexMatrix} cofactor ${index}`, () => {
            assertEquals( algebra_lineal.cofactor(testsistemaDatos.sistemaDatos,data.fila,data.columna), data.respuestaCofactor);
        });
    });
    Deno.test(`determinante toda la matrix matrix ${indexMatrix}`, () => {
        assertEquals( algebra_lineal.determinante_Laplace(testsistemaDatos.sistemaDatos), testsistemaDatos.determinante);
    });
})
//regla de cramer
interface SistemaCramer {
    sistema:number[][];
    determinanteN:number;
    dataTest:dataTestCramer[]
    cramer:number[]
}
interface dataTestCramer {
    columna:number;
    determinanteMatrix:number[][];
    determinanteN:number;
}
let sistemasCrame:SistemaCramer[] = [
    {sistema:[[2,1,-2,1],[3,-2,1,0],[1,3,-1,2]],
    dataTest:[
        {columna:0,determinanteMatrix:[[1,1,-2],[0,-2,1],[2,3,-1]],determinanteN:-7},
        {columna:1,determinanteMatrix:[[2,1,-2],[3,0,1],[1,2,-1]],determinanteN:-12},
        {columna:2,determinanteMatrix:[[2,1,1],[3,-2,0],[1,3,2]],determinanteN:-3}

    ] ,determinanteN:-20,
    cramer:[7/20,3/5,3/20]
    },
    {sistema:[[5,-2,-2],[-3,7,-22]],
        dataTest:[
            {columna:0,determinanteMatrix:[[-2,-2],[-22,7]],determinanteN:-58},
            {columna:1,determinanteMatrix:[[5,-2],[-3,-22]],determinanteN:-116}
    
        ] ,determinanteN:29,
        cramer:[-2,-4]
        },
]
sistemasCrame.forEach((datos,indexSistema)=>{
    let mapsistema = datos.sistema.map((a,i)=>a.filter((b,d)=>d!= a.length-1))
    datos.dataTest.forEach((tData,index_fila)=>{
        Deno.test(`cambiar columna sistema index ${indexSistema} fila ${index_fila}`, () => {
            assertEquals( algebra_lineal.cambiarColumnaPorEstosDatos(mapsistema,datos.sistema,tData.columna), tData.determinanteMatrix);
        });
        Deno.test(`determinante index ${indexSistema} fila ${index_fila}`, () => {
            assertEquals( algebra_lineal.determinante_Laplace(tData.determinanteMatrix), tData.determinanteN);
        });
    })
    Deno.test(`sistema index ${indexSistema} determinante toda la matrix matrix regla de cramer`, () => {
        assertEquals( algebra_lineal.determinante_Laplace(mapsistema), datos.determinanteN);
    }); 
    Deno.test(`sistema index ${indexSistema} cramer resultado`, () => {
        assertEquals( algebra_lineal.metodo_de_cramer(datos.sistema), datos.cramer);
    }); 
    
})






// Deno.test("1. cofactor 3,1 ", () => {
//   assertEquals( algebra_lineal.cofactor(sistemaDatos,3,1), -22);
// });
// Deno.test("1. cofactor 3,3", () => {
//     assertEquals( algebra_lineal.cofactor(sistemaDatos,3,3), 47);
// });

// Deno.test("1. determinante_Laplace", () => {
//     assertEquals( algebra_lineal.determinante_Laplace(sistemaDatos), 28);
// });

