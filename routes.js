const userList = ['Jett', 'Reyna', 'Yoru', 'Raze']

const requestHandler = (request, response) => {
    if (request.url === '/') {
        response.setHeader('Content-Type', 'text/html')
        response.write('<html>')
        response.write('<head><title>Greetings!</title></head>')
        response.write('<body><h1>Hello from My User Node.js Server!</h1>')
        response.write('<p>Add a new user</p>')
        response.write('<form action="/create-user" method="POST">')
        response.write('<input type="text" name="username">')
        response.write('<button type="submit">Create User</button></input>')
        response.write('</form></body>')
        response.write('</html>')
        return response.end()
    }
    if (request.url === '/users') {
        response.setHeader('Content-Type', 'text/html')
        response.write('<html>')
        response.write('<head><title>List of Users!</title></head>')
        response.write('<body><h1>Here are the current list of users!</h1>')
        response.write('<ul>')
        userList.forEach(user => {
            response.write('<li>' + user + '</li>')
        })
        response.write('</ul>')
        response.write('</body>')
        response.write('</html>')
        return response.end()
    }
    if (request.url === '/create-user' && request.method === 'POST') {
        const body = []
        request.on('data', (chunk) => {
            body.push(chunk)
        })

        return request.on('end', () => {
            const parseBody = Buffer.concat(body).toString()
            const newUser = parseBody.split('=')[1]
            console.log(newUser)
            userList.push(newUser)
            response.statusCode = 302
            response.setHeader('Location', '/users')
            return response.end()
        })
    }
    response.setHeader('Content-Type', 'text/html')
    response.write('<html>')
    response.write('<head><title>Page Not Found</title></head>')
    response.write('<body><h1>Page Not Found!</h1>')
    response.write('</body>')
    response.write('</html>')
    return response.end()
}

module.exports.handler = requestHandler