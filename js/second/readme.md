commands to run this second

individual

docker build -t js_second .

docker run -d -p 9080:9080 js_second


with networking in another project

docker build -t js_second .

docker run -d -p 9080:9008 --name js_second --network two_apps js_second