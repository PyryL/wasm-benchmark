
const client = {
  connect: async () => { },
  query: async (_sql, _values) => { },
  end: () => { },
}

module.exports = {
  Client: (_connStr) => client
}
