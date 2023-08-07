const form = document.getElementById("calcule");
const chart = document.getElementById("myChart");
let myChart;

const getInformation = async (cambio) =>{
    try{
        const valores = await fetch(`https://mindicador.cl/api/${cambio}`);
        const resultados = await valores.json();
        return resultados.serie; 
    } catch (error){
        alert(error.message);
    }
};
        
const totalCalculate = (valor, datos) =>{
    const valorMoneda = datos[0].valor;
    const total = valor / valorMoneda;
    return Math.round(total * 100)/100;
};

const showTotal = (total) => {
    document.getElementById("totally").innerHTML = total;
};

const getDates = (datos) => {
    return datos.map((item) => new Date(item.fecha).toLocaleDateString("en-US"));
};

const getValues = (datos) => {
    return datos.map((item) => item.valor);
};

const deleteGraphics = () => {
    if (myChart) {
        myChart.destroy();
    };
};

const showGraphic = (datos, valor) =>{
    const total = totalCalculate(valor, datos);
   
    showTotal(total);
    
    const values = getValues(datos);
    const labels = getDates(datos);
    
    const datasets = [
        {
            label: "Moneda",
            borderColor: "rgb(23, 32, 42)",
            data: values,
        },
    ];
    const config ={
        type: "line",
        data: {labels, datasets},
    };
    
    
    deleteGraphics();
    
    chart.style.backgroundColor= "white";
    chart.style.borderRadius= "10px"
    
    myChart = new Chart(chart.config);
};
    

const calculateValue = async(valor, cambio) => {
    const datos = await getInformation(cambio);
    showGraphic(datos, valor);
};


form.addEventListener("submit", async(event)=> {
    event.preventDefault();
    
    const valor = form.elements["valor"].value;
    const cambio = form.elements["cambio"].value;
    
    if(!valor){
        alert("Ingrese datos");
        return;
    }
    if(!cambio){
        alert("Ingrese datos");
        return;
    }

    await calculateValue(valor, cambio);
});

