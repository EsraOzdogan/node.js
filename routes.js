
var fs= require("fs");

const routeHandler = (request, response) => {

    if(request.url == '/'){   
        //fs.readFileSync bu satirin calismas ibittkten sonra alt satira gecer(asenkron)
        fs.readFile("index.html",(error,html) => {                    //readFile -- senkron. error index.html calistiktan sonra calisir ve html ciktisi istiyroum
            response.writeHead(200,{"Content-Type": "text/html"});
            response.write(html);     //htmli sayfaya yazdiricam
            response.end();  
        }) 
    }else if(request.url == "/blogs"){
        fs.readFile("blogs.html",(error,html) => {     
        response.writeHead(200,{"Content-Type": "text/html"});
        response.write(html);
        response.end();       
      }) 
    }else if(request.url == "/create" && request.method =="POST"){
        const data = [];
        request.on("data", (chunk) =>{
            console.log(chunk);    //buffer console yazdilir
            data.push(chunk);
        })
        request.on("end",() => {
            const result = Buffer.concat(data).toString();    //Buffer ceviriyoruz
            console.log(result)       //title='girilendeger'
            const parsedData = result.split("=")[1]          //dizi dönecek. 1. eleman htmldeki name yani title , 2. deger karsiliginda girilen deger  
            console.log(parsedData)       //title='girilendeger'


            fs.appendFile("blogs.txt",parsedData,err =>{         //blogs.txt dosyası yoksa olusturup "deneme" yazdirir, dosya varsa üzerine ekler
                if(err){
                    console.log(err);
                }else{
                    //bilgiyi dosyaya kaydettikten sonra kullaniciyi anadizine yönlendirme
                    //islemler bittikten sonra
                    response.statusCode = 302; 
                    response.setHeader( "Location","/");
                    response.end();
                }
            })
        }) 
    }
    else if(request.url == "/create"){
        fs.readFile("create.html",(error,html) => {     
        response.writeHead(200,{"Content-Type": "text/html"});
        response.write(html);
        response.end();       
      }) 
    }
    else{
        fs.readFile("404.html",(error,html) => {     
        response.writeHead(404,{"Content-Type": "text/html"});
        console.warn(   "error",error)
        response.write(html);
        response.end();  
    })  
    }

    
}

module.exports = routeHandler;  //diger sayfalarda erismek icin