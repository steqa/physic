import logging
from flask import Flask, send_from_directory
import threading
import webbrowser
import time
import os


app = Flask(__name__)

log = logging.getLogger('werkzeug')
log.setLevel(logging.WARNING)

site_folder = "."

@app.route('/')
def index():
    return send_from_directory(site_folder, 'main-page.html')

@app.route('/<path:path>')
def static_files(path):
    return send_from_directory(site_folder, path)

def run_server():
    app.run(host='0.0.0.0', port=8000)
    
def open_browser():
    webbrowser.open('http://127.0.0.1:8000')

if __name__ == "__main__":
    server_thread = threading.Thread(target=run_server)
    server_thread.start()

    time.sleep(1)
    open_browser()
    print("Программа запущена. Перейдите по http://127.0.0.1:8000 и ожидайте, пока запустится сервер.")

    try:
        while True:
            pass 
    except KeyboardInterrupt:
        print("Программа завершает работу...")
        os._exit(0)
