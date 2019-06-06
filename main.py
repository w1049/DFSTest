#coding:utf8
from flask import Flask, request, render_template
from json import JSONEncoder
import time

app = Flask("DFS Test")

@app.route("/", methods=["GET"])
def home() -> str:
    return render_template("dfs.html")

@app.route("/old/", methods=["GET"])
def old() -> str:
    return render_template("old.html")

@app.route("/json", methods=["GET", "POST"])
def json() -> str:
    with open('./json/list.txt', 'r') as f:
        if request.form['jsonId'] not in f.read().splitlines():
            return encode_json({
                'code': 1,
                'message': '"' + request.form['jsonId'] + '"文件不存在!'
            })
    with open('./json/' + request.form['jsonId'] + '.json', 'r') as f:
        tmpjson = f.read()
        return '{"code":0,' + tmpjson[1:]

@app.route("/getlist", methods=["GET", "POST"])
def getlist() -> str:
    with open('./json/list.txt', 'r') as f:
        return encode_json({
            'list': f.read()
        })

def encode_json(obj):
    return JSONEncoder().encode(obj)

def main() -> None:
    app.run(host='0.0.0.0', port=8080)

if __name__ == "__main__":
    main()