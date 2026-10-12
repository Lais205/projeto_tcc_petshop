import os

from flask import abort, send_from_directory


FRONTEND_DIST = os.path.abspath(
    os.path.join(os.path.dirname(__file__), '..', 'dist')
)


def serve_frontend(path='index.html'):
    if not os.path.isfile(os.path.join(FRONTEND_DIST, 'index.html')):
        abort(503, description='Frontend não compilado. Execute npm run build.')

    requested_file = os.path.join(FRONTEND_DIST, path)
    if path != 'index.html':
        if not os.path.isfile(requested_file):
            abort(404)
        return send_from_directory(FRONTEND_DIST, path)

    return send_from_directory(FRONTEND_DIST, 'index.html')
