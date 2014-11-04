from flask import Flask
<% if (package.enableI18n) { %>from flask.ext.babel import Babel
<% } %>from lemon import Lemon

app = Flask(__name__)
lemon = Lemon(
    app,
    app_view='<%= package.appView %>',
    view_path='<%= package.appName %>/<%= package.viewPath %>')
<% if (package.enableI18n) { %>
babel = Babel(app)
<% } %>
