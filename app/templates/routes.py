from <%= package.appName %>.app import app
from <%= package.appName %>.app import lemon

with app.app_context():
    route = lemon.add_route
