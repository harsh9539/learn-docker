commands to run this first 

individual

docker build -t js_first .

docker run -d -p 8080:8090 js_first


with networking in another project

docker build -t js_first .

docker run -d -p 8090:8080 -e SERVER_URL=http://js_second:9080 --name js_first --network two_apps js_first